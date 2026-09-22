from typing import Literal

from pydantic import BaseModel

ProjectCategory = Literal["genai", "full-stack", "frontend", "cloud"]


class ImpactMetric(BaseModel):
    label: str
    value: str


class ArchitectureNode(BaseModel):
    id: str
    label: str
    x: float
    y: float


class ArchitectureEdge(BaseModel):
    source: str
    target: str
    label: str | None = None


class ProjectSummary(BaseModel):
    slug: str
    title: str
    category: ProjectCategory
    summary: str
    tech_stack: list[str]
    featured: bool


class ProjectDetail(ProjectSummary):
    problem: str
    solution: str
    architecture_nodes: list[ArchitectureNode]
    architecture_edges: list[ArchitectureEdge]
    impact_metrics: list[ImpactMetric]
