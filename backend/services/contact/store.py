from datetime import UTC, datetime
from functools import lru_cache

from pydantic import BaseModel

from backend.schemas.contact import ContactRequest


class ContactRecord(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    received_at: datetime


class InMemoryContactStore:
    def __init__(self) -> None:
        self._records: list[ContactRecord] = []

    def add(self, request: ContactRequest) -> ContactRecord:
        record = ContactRecord(
            name=request.name,
            email=request.email,
            subject=request.subject,
            message=request.message,
            received_at=datetime.now(UTC),
        )
        self._records.append(record)
        return record

    def list_all(self) -> list[ContactRecord]:
        return list(self._records)


@lru_cache
def get_contact_store() -> InMemoryContactStore:
    return InMemoryContactStore()
