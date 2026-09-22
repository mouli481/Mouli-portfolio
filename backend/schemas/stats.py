from pydantic import BaseModel


class Stats(BaseModel):
    years_experience: float
    projects_shipped: int
    agents_migrated: int
    technologies_used: int
