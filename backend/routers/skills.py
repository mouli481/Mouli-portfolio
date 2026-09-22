from fastapi import APIRouter, Depends

from backend.repositories.portfolio import PortfolioRepository, get_repository
from backend.schemas.skill import Skill

router = APIRouter(tags=["skills"])


@router.get("/skills", response_model=list[Skill])
async def list_skills(
    repository: PortfolioRepository = Depends(get_repository),
) -> list[Skill]:
    return await repository.list_skills()
