from backend.data.profile import PROFILE
from backend.data.projects import PROJECTS
from backend.data.skills import SKILLS
from backend.schemas.stats import Stats

STATS = Stats(
    years_experience=PROFILE.years_experience,
    projects_shipped=len(PROJECTS),
    agents_migrated=30,
    technologies_used=len(SKILLS),
)
