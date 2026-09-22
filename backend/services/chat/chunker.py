from dataclasses import dataclass

from backend.data.experience import EXPERIENCE
from backend.data.profile import PROFILE
from backend.data.projects import PROJECTS
from backend.data.skills import SKILLS


@dataclass(frozen=True)
class Chunk:
    id: str
    title: str
    section: str
    content: str
    project_slug: str | None = None


def _profile_chunks() -> list[Chunk]:
    education_lines = ", ".join(
        f"{item.degree} in {item.field} from {item.institution} ({item.year})"
        for item in PROFILE.education
    )
    return [
        Chunk(
            id="profile-summary",
            title="Profile",
            section="profile",
            content=(
                f"{PROFILE.name} is a {PROFILE.title} based in {PROFILE.location} "
                f"with {PROFILE.years_experience} years of experience. {PROFILE.summary}"
            ),
        ),
        Chunk(
            id="profile-education",
            title="Education",
            section="profile",
            content=f"{PROFILE.name}'s education: {education_lines}.",
        ),
        Chunk(
            id="profile-story",
            title="Career story",
            section="profile",
            content=f"{PROFILE.name}'s career story: {' '.join(PROFILE.bio)}",
        ),
        Chunk(
            id="profile-contact",
            title="Contact details",
            section="profile",
            content=(
                f"Contact {PROFILE.name} by email at {PROFILE.email} or by phone at "
                f"{PROFILE.phone}. {PROFILE.name} is based in {PROFILE.location}. "
                f"Currently: {PROFILE.currently}"
            ),
        ),
        Chunk(
            id="profile-focus",
            title="What I do",
            section="profile",
            content=f"{PROFILE.name} focuses on: "
            + " ".join(f"{area.title}: {area.description}" for area in PROFILE.focus_areas),
        ),
        Chunk(
            id="profile-values",
            title="Working values",
            section="profile",
            content=f"{PROFILE.name}'s working values: "
            + " ".join(f"{value.title}: {value.description}" for value in PROFILE.values),
        ),
    ]


def _experience_chunks() -> list[Chunk]:
    chunks: list[Chunk] = []
    for item in EXPERIENCE:
        end = "Present" if item.is_current else (item.end_date or "")
        achievements = " ".join(item.achievements)
        tech = ", ".join(item.tech_stack)
        chunks.append(
            Chunk(
                id=f"experience-{item.id}",
                title=f"{item.role} at {item.company}",
                section="experience",
                content=(
                    f"{item.role} at {item.company} ({item.start_date} to {end}), "
                    f"{item.location}. {item.summary} {achievements} "
                    f"Technologies used: {tech}."
                ),
            )
        )
    return chunks


def _project_chunks() -> list[Chunk]:
    chunks: list[Chunk] = []
    for project in PROJECTS:
        tech = ", ".join(project.tech_stack)
        metrics = "; ".join(f"{m.label}: {m.value}" for m in project.impact_metrics)
        chunks.append(
            Chunk(
                id=f"project-{project.slug}-overview",
                title=project.title,
                section="projects",
                project_slug=project.slug,
                content=(
                    f"{project.title} is a {project.category} project built at "
                    f"{project.company} ({project.period}) where the role was "
                    f"{project.role}. Problem: {project.problem} "
                    f"Solution: {project.solution} Technologies: {tech}."
                ),
            )
        )
        chunks.append(
            Chunk(
                id=f"project-{project.slug}-highlights",
                title=f"{project.title} highlights",
                section="projects",
                project_slug=project.slug,
                content=f"Highlights of {project.title}: {'; '.join(project.highlights)}.",
            )
        )
        if metrics:
            chunks.append(
                Chunk(
                    id=f"project-{project.slug}-impact",
                    title=f"{project.title} impact",
                    section="projects",
                    project_slug=project.slug,
                    content=f"Impact of {project.title}: {metrics}.",
                )
            )
    return chunks


def _skill_chunks() -> list[Chunk]:
    by_category: dict[str, list[str]] = {}
    for skill in SKILLS:
        by_category.setdefault(skill.category, []).append(skill.name)
    return [
        Chunk(
            id=f"skills-{category}",
            title=f"Skills: {category}",
            section="skills",
            content=f"{PROFILE.name}'s {category} skills: {', '.join(names)}.",
        )
        for category, names in by_category.items()
    ]


def build_corpus() -> list[Chunk]:
    return [*_profile_chunks(), *_experience_chunks(), *_project_chunks(), *_skill_chunks()]
