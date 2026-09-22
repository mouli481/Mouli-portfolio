from backend.data.profile import PROFILE
from backend.schemas.chat import ChatMessage
from backend.services.chat.retriever import ScoredChunk

SYSTEM_PROMPT = (
    f"You are the AI assistant embedded in {PROFILE.name}'s portfolio website. "
    f"You answer questions about {PROFILE.name}'s background, work experience, "
    "projects and technical skills using only the context provided below. "
    "If the answer is not present in the context, say you don't have that "
    "information rather than guessing or inventing facts. Politely decline "
    "any request that is unrelated to this portfolio or that asks for harmful "
    "content. Keep answers concise, friendly and specific."
)


def build_context_block(chunks: list[ScoredChunk]) -> str:
    if not chunks:
        return "No relevant context was found for this question."
    sections = [f"[{scored.chunk.title}]\n{scored.chunk.content}" for scored in chunks]
    return "\n\n".join(sections)


def build_messages(
    *,
    message: str,
    history: list[ChatMessage],
    context_chunks: list[ScoredChunk],
) -> list[dict[str, str]]:
    context_block = build_context_block(context_chunks)
    system_content = f"{SYSTEM_PROMPT}\n\nContext:\n{context_block}"

    messages: list[dict[str, str]] = [{"role": "system", "content": system_content}]
    for entry in history[-6:]:
        messages.append({"role": entry.role, "content": entry.content})
    messages.append({"role": "user", "content": message})
    return messages
