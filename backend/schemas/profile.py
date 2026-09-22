from pydantic import BaseModel


class EducationItem(BaseModel):
    institution: str
    degree: str
    field: str
    year: int


class SocialLink(BaseModel):
    label: str
    url: str
    icon: str


class FocusArea(BaseModel):
    title: str
    description: str
    icon: str


class CoreValue(BaseModel):
    title: str
    description: str
    icon: str


class Profile(BaseModel):
    name: str
    title: str
    tagline: str
    roles: list[str]
    location: str
    email: str
    phone: str
    summary: str
    bio: list[str]
    currently: str
    years_experience: float
    education: list[EducationItem]
    social_links: list[SocialLink]
    focus_areas: list[FocusArea]
    values: list[CoreValue]
