from fastapi import APIRouter, Depends

from backend.repositories.portfolio import PortfolioRepository, get_repository
from backend.schemas.experience import ExperienceItem

router = APIRouter(tags=["experience"])


@router.get("/experience", response_model=list[ExperienceItem])
async def list_experience(
    repository: PortfolioRepository = Depends(get_repository),
) -> list[ExperienceItem]:
    return await repository.list_experience()
