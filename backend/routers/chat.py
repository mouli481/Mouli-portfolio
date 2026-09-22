from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from backend.core.config import Settings, get_settings
from backend.core.deps import get_client_identifier
from backend.core.errors import RateLimitError
from backend.core.rate_limit import RateLimiter, get_rate_limiter
from backend.schemas.chat import ChatRequest
from backend.services.chat.orchestrator import stream_chat_response

router = APIRouter(tags=["chat"])


@router.post("/chat")
async def chat(
    request: ChatRequest,
    client_id: str = Depends(get_client_identifier),
    settings: Settings = Depends(get_settings),
) -> StreamingResponse:
    limiter: RateLimiter = get_rate_limiter(settings)
    allowed = await limiter.is_allowed(f"chat:{client_id}", settings.chat_rate_limit_per_minute)
    if not allowed:
        raise RateLimitError("You're sending messages too quickly. Please wait a moment.")

    return StreamingResponse(
        stream_chat_response(request, settings),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
