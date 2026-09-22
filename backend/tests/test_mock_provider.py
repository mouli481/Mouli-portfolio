import pytest

from backend.services.chat.providers.mock import MockChatProvider


@pytest.mark.asyncio
async def test_mock_provider_streams_nonempty_response() -> None:
    provider = MockChatProvider()
    messages = [
        {
            "role": "system",
            "content": "System prompt.\n\nContext:\nNo relevant context was found for this question.",
        },
        {"role": "user", "content": "What technologies do you use?"},
    ]

    chunks = [chunk async for chunk in provider.stream_completion(messages)]
    full_response = "".join(chunks)

    assert full_response.strip()
    assert len(chunks) > 1


@pytest.mark.asyncio
async def test_mock_provider_uses_context_when_available() -> None:
    provider = MockChatProvider()
    messages = [
        {
            "role": "system",
            "content": "System prompt.\n\nContext:\n[Python]\nMouli is highly skilled in Python.",
        },
        {"role": "user", "content": "What is your strongest language?"},
    ]

    chunks = [chunk async for chunk in provider.stream_completion(messages)]
    full_response = "".join(chunks)

    assert "Python" in full_response
