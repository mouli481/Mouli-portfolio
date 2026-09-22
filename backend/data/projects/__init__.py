from backend.data.projects.binder import BINDER
from backend.data.projects.cash_management import CASH_MANAGEMENT
from backend.data.projects.k_fabrik import K_FABRIK
from backend.data.projects.onward import CAT_FLEET
from backend.data.projects.portfolio import AI_PORTFOLIO
from backend.schemas.project import ProjectDetail

PROJECTS: list[ProjectDetail] = [K_FABRIK, AI_PORTFOLIO, CASH_MANAGEMENT, BINDER, CAT_FLEET]

__all__ = ["PROJECTS"]
