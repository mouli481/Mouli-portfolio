import json
from collections.abc import AsyncIterator

import httpx

GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"


def _to_gemini_contents(
    messages: list[dict[str, str]],
) -> tuple[str | None, list[dict[str, object]]]:
    system_instruction: str | None = None
    contents: list[dict[str, object]] = []
    for message in messages:
        if message["role"] == "system":
            system_instruction = message["content"]
            continue
        role = "model" if message["role"] == "assistant" else "user"
        contents.append({"role": role, "parts": [{"text": message["content"]}]})
    return system_instruction, contents


class GeminiChatProvider:
    def __init__(self, api_key: str, model: str) -> None:
        self._api_key = api_key
        self._model = model

    async def stream_completion(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        system_instruction, contents = _to_gemini_contents(messages)
        payload: dict[str, object] = {
            "contents": contents,
            "generationConfig": {"temperature": 0.4, "maxOutputTokens": 600},
        }
        if system_instruction:
            payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}

        url = f"{GEMINI_BASE_URL}/{self._model}:streamGenerateContent"
        params = {"alt": "sse", "key": self._api_key}

        async with (
            httpx.AsyncClient(timeout=30.0) as client,
            client.stream("POST", url, params=params, json=payload) as response,
        ):
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.startswith("data:"):
                    continue
                data = line[len("data:") :].strip()
                if not data:
                    continue
                parsed = json.loads(data)
                candidates = parsed.get("candidates", [])
                if not candidates:
                    continue
                parts = candidates[0].get("content", {}).get("parts", [])
                for part in parts:
                    text = part.get("text")
                    if text:
                        yield text
