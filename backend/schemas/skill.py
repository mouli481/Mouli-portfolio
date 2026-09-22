from typing import Literal

from pydantic import BaseModel

SkillCategory = Literal[
    "languages",
    "ai-ml",
    "backend",
    "frontend",
    "data",
    "cloud-devops",
    "testing",
]


class Skill(BaseModel):
    id: str
    name: str
    category: SkillCategory
    proficiency: int
    related_skill_ids: list[str]
