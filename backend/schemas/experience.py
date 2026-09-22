from pydantic import BaseModel


class ExperienceItem(BaseModel):
    id: str
    company: str
    role: str
    location: str
    start_date: str
    end_date: str | None
    is_current: bool
    summary: str
    achievements: list[str]
    tech_stack: list[str]
