import asyncio
from collections.abc import AsyncIterator

from backend.data.profile import PROFILE


class MockChatProvider:
    async def stream_completion(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        user_message = messages[-1]["content"] if messages else ""
        system_message = messages[0]["content"] if messages else ""
        context_block = system_message.split("Context:\n", 1)[-1].strip()

        response = self._compose_response(user_message, context_block)
        for word in response.split(" "):
            yield f"{word} "
            await asyncio.sleep(0.02)

    def _compose_response(self, user_message: str, context_block: str) -> str:
        if not user_message.strip():
            return (
                f"Hi, I'm the AI assistant for {PROFILE.name}'s portfolio. "
                "Ask me about their experience, projects or skills."
            )

        if context_block and "No relevant context" not in context_block:
            first_section = context_block.split("\n\n", 1)[0]
            snippet = first_section.split("\n", 1)[-1].strip()
            return (
                f"Based on {PROFILE.name}'s portfolio: {snippet} "
                "Ask a follow-up question if you'd like more detail."
            )

        return (
            f"I don't have specific information about that in {PROFILE.name}'s "
            "portfolio yet. Try asking about their experience, projects or "
            "technical skills instead."
        )
