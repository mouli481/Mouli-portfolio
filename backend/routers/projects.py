from fastapi import APIRouter, Depends

from backend.core.errors import NotFoundError
from backend.repositories.portfolio import PortfolioRepository, get_repository
from backend.schemas.project import ProjectCategory, ProjectDetail, ProjectSummary

router = APIRouter(tags=["projects"])


@router.get("/projects", response_model=list[ProjectSummary])
async def list_projects(
    category: ProjectCategory | None = None,
    repository: PortfolioRepository = Depends(get_repository),
) -> list[ProjectSummary]:
    return await repository.list_projects(category)


@router.get("/projects/{slug}", response_model=ProjectDetail)
async def get_project(
    slug: str,
    repository: PortfolioRepository = Depends(get_repository),
) -> ProjectDetail:
    project = await repository.get_project(slug)
    if project is None:
        raise NotFoundError(f"No project found with slug '{slug}'.")
    return project
