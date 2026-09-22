from fastapi import APIRouter, Depends

from backend.repositories.portfolio import PortfolioRepository, get_repository
from backend.schemas.profile import Profile

router = APIRouter(tags=["profile"])


@router.get("/profile", response_model=Profile)
async def get_profile(
    repository: PortfolioRepository = Depends(get_repository),
) -> Profile:
    return await repository.get_profile()
