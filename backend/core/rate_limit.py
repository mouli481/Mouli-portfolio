import time
from collections import defaultdict
from typing import Protocol

import httpx

from backend.core.config import Settings


class RateLimiter(Protocol):
    async def is_allowed(self, key: str, limit_per_minute: int) -> bool: ...


class InMemoryRateLimiter:
    def __init__(self) -> None:
        self._hits: dict[str, list[float]] = defaultdict(list)

    async def is_allowed(self, key: str, limit_per_minute: int) -> bool:
        now = time.monotonic()
        window_start = now - 60.0
        hits = [hit for hit in self._hits[key] if hit > window_start]
        if len(hits) >= limit_per_minute:
            self._hits[key] = hits
            return False
        hits.append(now)
        self._hits[key] = hits
        return True


class UpstashRateLimiter:
    def __init__(self, rest_url: str, rest_token: str) -> None:
        self._rest_url = rest_url.rstrip("/")
        self._rest_token = rest_token

    async def is_allowed(self, key: str, limit_per_minute: int) -> bool:
        window_key = f"ratelimit:{key}:{int(time.time() // 60)}"
        async with httpx.AsyncClient(timeout=3.0) as client:
            response = await client.post(
                f"{self._rest_url}/pipeline",
                headers={"Authorization": f"Bearer {self._rest_token}"},
                json=[["INCR", window_key], ["EXPIRE", window_key, "60"]],
            )
            response.raise_for_status()
            results = response.json()
            current_count = int(results[0]["result"])
            return current_count <= limit_per_minute


_in_memory_limiter = InMemoryRateLimiter()


def get_rate_limiter(settings: Settings) -> RateLimiter:
    if settings.has_redis_rate_limiting:
        assert settings.upstash_redis_rest_url is not None
        assert settings.upstash_redis_rest_token is not None
        return UpstashRateLimiter(
            settings.upstash_redis_rest_url, settings.upstash_redis_rest_token
        )
    return _in_memory_limiter
