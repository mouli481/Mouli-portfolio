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


class Profile(BaseModel):
    name: str
    title: str
    location: str
    email: str
    phone: str
    summary: str
    years_experience: float
    education: list[EducationItem]
    social_links: list[SocialLink]
