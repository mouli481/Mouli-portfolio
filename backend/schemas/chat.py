from typing import Literal

from pydantic import BaseModel, Field

ChatRole = Literal["user", "assistant"]


class ChatMessage(BaseModel):
    role: ChatRole
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[ChatMessage] = Field(default_factory=list, max_length=20)
    project_slug: str | None = None


class ChatSource(BaseModel):
    title: str
    section: str
    snippet: str


class RetrievalCandidate(BaseModel):
    id: str
    title: str
    section: str
    relevance: int
    selected: bool
