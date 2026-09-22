from backend.core.config import Settings
from backend.services.chat.providers.base import ChatProvider
from backend.services.chat.providers.gemini import GeminiChatProvider
from backend.services.chat.providers.groq import GroqChatProvider
from backend.services.chat.providers.mock import MockChatProvider


def get_chat_provider(settings: Settings) -> ChatProvider:
    if settings.llm_provider == "groq" and settings.groq_api_key:
        return GroqChatProvider(settings.groq_api_key, settings.groq_model)
    if settings.llm_provider == "gemini" and settings.gemini_api_key:
        return GeminiChatProvider(settings.gemini_api_key, settings.gemini_model)
    return MockChatProvider()
