import json
import uuid
from collections.abc import AsyncIterator

from backend.core.config import Settings
from backend.core.logging import get_logger
from backend.schemas.chat import ChatRequest, ChatSource
from backend.services.chat.prompt import build_messages
from backend.services.chat.provider_factory import get_chat_provider
from backend.services.chat.retriever import get_retriever

logger = get_logger("chat")


def _sse(event_type: str, **payload: object) -> str:
    data = json.dumps({"type": event_type, **payload})
    return f"data: {data}\n\n"


async def stream_chat_response(request: ChatRequest, settings: Settings) -> AsyncIterator[str]:
    run_id = uuid.uuid4().hex
    yield _sse("RUN_STARTED", runId=run_id)

    try:
        retriever = get_retriever()
        scored_chunks = retriever.search(
            request.message, top_k=4, project_slug=request.project_slug
        )
        messages = build_messages(
            message=request.message,
            history=request.history,
            context_chunks=scored_chunks,
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
            for scored in scored_chunks
        ]
        yield _sse("SOURCES", sources=sources)
        yield _sse("RUN_FINISHED", runId=run_id)
    except Exception:
        logger.exception("Chat run %s failed", run_id)
        yield _sse("RUN_ERROR", message="The assistant hit an error. Please try again.")
