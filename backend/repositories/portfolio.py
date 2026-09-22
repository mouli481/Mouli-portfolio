from functools import lru_cache
from typing import Protocol

from backend.data.experience import EXPERIENCE
from backend.data.profile import PROFILE
from backend.data.projects import PROJECTS
from backend.data.skills import SKILLS
from backend.data.stats import STATS
from backend.schemas.experience import ExperienceItem
from backend.schemas.profile import Profile
from backend.schemas.project import ProjectCategory, ProjectDetail, ProjectSummary
from backend.schemas.skill import Skill
from backend.schemas.stats import Stats


class PortfolioRepository(Protocol):
    async def get_profile(self) -> Profile: ...

    async def list_experience(self) -> list[ExperienceItem]: ...

    async def list_projects(self, category: ProjectCategory | None) -> list[ProjectSummary]: ...

    async def get_project(self, slug: str) -> ProjectDetail | None: ...

    async def list_skills(self) -> list[Skill]: ...

    async def get_stats(self) -> Stats: ...


class MockPortfolioRepository:
    async def get_profile(self) -> Profile:
        return PROFILE

    async def list_experience(self) -> list[ExperienceItem]:
        return EXPERIENCE

    async def list_projects(self, category: ProjectCategory | None) -> list[ProjectSummary]:
        if category is None:
            return [ProjectSummary(**project.model_dump()) for project in PROJECTS]
        return [
            ProjectSummary(**project.model_dump())
            for project in PROJECTS
            if project.category == category
        ]

    async def get_project(self, slug: str) -> ProjectDetail | None:
        for project in PROJECTS:
            if project.slug == slug:
                return project
        return None

    async def list_skills(self) -> list[Skill]:
        return SKILLS

    async def get_stats(self) -> Stats:
        return STATS


@lru_cache
def get_repository() -> PortfolioRepository:
    return MockPortfolioRepository()
