from fastapi import APIRouter, Depends

from backend.repositories.portfolio import PortfolioRepository, get_repository
from backend.schemas.stats import Stats

router = APIRouter(tags=["stats"])


@router.get("/stats", response_model=Stats)
async def get_stats(
    repository: PortfolioRepository = Depends(get_repository),
) -> Stats:
    return await repository.get_stats()
