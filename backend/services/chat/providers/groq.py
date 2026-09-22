import json
from collections.abc import AsyncIterator

import httpx

GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"


class GroqChatProvider:
    def __init__(self, api_key: str, model: str) -> None:
        self._api_key = api_key
        self._model = model

    async def stream_completion(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        payload = {
            "model": self._model,
            "messages": messages,
            "stream": True,
            "temperature": 0.4,
            "max_tokens": 600,
        }
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }

        async with (
            httpx.AsyncClient(timeout=30.0) as client,
            client.stream("POST", GROQ_ENDPOINT, json=payload, headers=headers) as response,
        ):
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.startswith("data:"):
                    continue
                data = line[len("data:") :].strip()
                if data == "[DONE]":
                    break
                parsed = json.loads(data)
                choices = parsed.get("choices", [])
                if not choices:
                    continue
                delta = choices[0].get("delta", {})
                content = delta.get("content")
                if content:
                    yield content
