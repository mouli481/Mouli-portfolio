from fastapi import APIRouter, Depends

from backend.core.config import Settings, get_settings
from backend.core.deps import get_client_identifier
from backend.core.errors import RateLimitError
from backend.core.rate_limit import RateLimiter, get_rate_limiter
from backend.schemas.contact import ContactRequest, ContactResponse
from backend.services.contact.mailer import get_mailer
from backend.services.contact.store import get_contact_store

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
    request: ContactRequest,
    client_id: str = Depends(get_client_identifier),
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    limiter: RateLimiter = get_rate_limiter(settings)
    allowed = await limiter.is_allowed(
        f"contact:{client_id}", settings.contact_rate_limit_per_minute
    )
    if not allowed:
        raise RateLimitError("Too many messages sent. Please try again in a minute.")

    store = get_contact_store()
    store.add(request)

    mailer = get_mailer(settings)
    await mailer.send_contact_notification(request)

    return ContactResponse(success=True, message="Thanks for reaching out! I'll reply soon.")
