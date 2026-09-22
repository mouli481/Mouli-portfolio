import asyncio
import re
from collections.abc import AsyncIterator

from backend.data.profile import PROFILE

_SENTENCE_BOUNDARY = re.compile(r"(?<=[.!?])\s+")
_SECTION_PATTERN = re.compile(r"^\[(?P<title>[^\]]+)\]\n(?P<body>.+)$", re.DOTALL)
MAX_SECTIONS = 2
SENTENCES_PER_SECTION = 2


def _parse_sections(context_block: str) -> list[tuple[str, str]]:
    sections: list[tuple[str, str]] = []
    for raw in context_block.split("\n\n"):
        match = _SECTION_PATTERN.match(raw.strip())
        if match:
            sections.append((match.group("title"), match.group("body").strip()))
    return sections


def _summarize(body: str) -> str:
    sentences = _SENTENCE_BOUNDARY.split(body)
    return " ".join(sentences[:SENTENCES_PER_SECTION])


class MockChatProvider:
    async def stream_completion(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        user_message = messages[-1]["content"] if messages else ""
        system_message = messages[0]["content"] if messages else ""
        context_block = system_message.split("Context:\n", 1)[-1].strip()

        response = self._compose_response(user_message, context_block)
        for word in response.split(" "):
            yield f"{word} "
            await asyncio.sleep(0.015)

    def _compose_response(self, user_message: str, context_block: str) -> str:
        if not user_message.strip():
            return (
                f"Hi, I'm the AI assistant for {PROFILE.name}'s portfolio. "
                "Ask me about his experience, projects or skills."
            )

        sections = _parse_sections(context_block)[:MAX_SECTIONS]
        if not sections:
            return (
                f"I don't have information about that in {PROFILE.name}'s portfolio. "
                "I can only answer questions about his experience, projects and skills, "
                "so try asking about one of those."
            )

        bullets = "\n".join(f"- **{title}:** {_summarize(body)}" for title, body in sections)
        return (
            f"Here's what I found in {PROFILE.name}'s portfolio:\n\n{bullets}\n\n"
            "Ask a follow-up question if you'd like more detail."
        )
