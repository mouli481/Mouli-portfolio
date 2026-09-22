from collections.abc import AsyncIterator
from typing import Protocol


class ChatProvider(Protocol):
    def stream_completion(self, messages: list[dict[str, str]]) -> AsyncIterator[str]: ...
