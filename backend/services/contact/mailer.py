from typing import Protocol

import httpx

from backend.core.config import Settings
from backend.core.logging import get_logger
from backend.schemas.contact import ContactRequest

logger = get_logger("mailer")

RESEND_ENDPOINT = "https://api.resend.com/emails"


class Mailer(Protocol):
    async def send_contact_notification(self, request: ContactRequest) -> None: ...


class NullMailer:
    async def send_contact_notification(self, request: ContactRequest) -> None:
        logger.info("Contact message from %s stored in mock mode (no email sent).", request.email)


class ResendMailer:
    def __init__(self, api_key: str, to_email: str) -> None:
        self._api_key = api_key
        self._to_email = to_email

    async def send_contact_notification(self, request: ContactRequest) -> None:
        payload = {
            "from": "Portfolio Contact Form <onboarding@resend.dev>",
            "to": [self._to_email],
            "reply_to": request.email,
            "subject": f"Portfolio contact: {request.subject}",
            "text": f"From: {request.name} <{request.email}>\n\n{request.message}",
        }
        headers = {"Authorization": f"Bearer {self._api_key}"}
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(RESEND_ENDPOINT, json=payload, headers=headers)
            response.raise_for_status()


def get_mailer(settings: Settings) -> Mailer:
    if settings.has_email_delivery:
        assert settings.resend_api_key is not None
        return ResendMailer(settings.resend_api_key, settings.contact_to_email)
    return NullMailer()
