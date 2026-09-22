from backend.data.projects.binder import BINDER
from backend.data.projects.k_fabrik import K_FABRIK
from backend.data.projects.onward import CASH_MANAGEMENT, CAT_FLEET
from backend.data.projects.portfolio import AI_PORTFOLIO
from backend.schemas.project import ProjectDetail

PROJECTS: list[ProjectDetail] = [K_FABRIK, AI_PORTFOLIO, BINDER, CAT_FLEET, CASH_MANAGEMENT]

__all__ = ["PROJECTS"]
