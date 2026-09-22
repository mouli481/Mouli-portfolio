import json
import uuid
from collections.abc import AsyncIterator

from backend.core.config import Settings
from backend.core.logging import get_logger
from backend.schemas.chat import ChatRequest, ChatSource, RetrievalCandidate
from backend.services.chat.prompt import build_messages
from backend.services.chat.provider_factory import get_chat_provider
from backend.services.chat.retriever import ScoredChunk, get_retriever

logger = get_logger("chat")

CONTEXT_CHUNK_COUNT = 4
CANDIDATE_POOL_SIZE = 8


def _sse(event_type: str, **payload: object) -> str:
    data = json.dumps({"type": event_type, **payload})
    return f"data: {data}\n\n"


def _to_candidates(
    scored_chunks: list[ScoredChunk], selected_ids: set[str]
) -> list[RetrievalCandidate]:
    top_score = max((scored.score for scored in scored_chunks), default=0.0) or 1.0
    return [
        RetrievalCandidate(
            id=scored.chunk.id,
            title=scored.chunk.title,
            section=scored.chunk.section,
            relevance=round(min(scored.score / top_score, 1.0) * 100),
            selected=scored.chunk.id in selected_ids,
        )
        for scored in scored_chunks
    ]


async def stream_chat_response(request: ChatRequest, settings: Settings) -> AsyncIterator[str]:
    run_id = uuid.uuid4().hex
    yield _sse("RUN_STARTED", runId=run_id)

    try:
        retriever = get_retriever()
        candidate_chunks = retriever.search(
            request.message, top_k=CANDIDATE_POOL_SIZE, project_slug=request.project_slug
        )
        context_chunks = candidate_chunks[:CONTEXT_CHUNK_COUNT]
        selected_ids = {scored.chunk.id for scored in context_chunks}

        yield _sse(
            "RETRIEVAL",
            candidates=[
                candidate.model_dump()
                for candidate in _to_candidates(candidate_chunks, selected_ids)
            ],
        )

        messages = build_messages(
            message=request.message,
            history=request.history,
            context_chunks=context_chunks,
        )

        provider = get_chat_provider(settings)
        async for delta in provider.stream_completion(messages):
            yield _sse("TEXT_MESSAGE_CONTENT", delta=delta)

        sources = [
            ChatSource(
                title=scored.chunk.title,
                section=scored.chunk.section,
                snippet=scored.chunk.content[:180],
            ).model_dump()
            for scored in context_chunks
        ]
        yield _sse("SOURCES", sources=sources)
        yield _sse("RUN_FINISHED", runId=run_id)
    except Exception:
        logger.exception("Chat run %s failed", run_id)
        yield _sse("RUN_ERROR", message="The assistant hit an error. Please try again.")
