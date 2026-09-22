from backend.schemas.project import ArchitectureEdge, ArchitectureNode, ImpactMetric, ProjectDetail

BINDER = ProjectDetail(
    slug="binder-b2b-procurement",
    title="Binder — B2B Procurement Platform",
    category="frontend",
    summary=(
        "B2B procurement platform built remotely for a Saudi Arabia based company, "
        "with a type-safe Next.js frontend over a GraphQL API."
    ),
    company="Binder-sa",
    period="2023 — 2024",
    role="Frontend Engineer",
    tech_stack=["Next.js", "TypeScript", "Redux Toolkit", "GraphQL"],
    featured=True,
    problem=(
        "The procurement platform needed a maintainable, type-safe frontend that "
        "could handle complex, multi-step procurement workflows and stay consistent "
        "as the product and team grew."
    ),
    solution=(
        "Built and maintained core frontend features in Next.js and TypeScript, "
        "using Redux Toolkit for predictable state across procurement workflows and "
        "a typed GraphQL layer for data fetching."
    ),
    highlights=[
        "Multi-step procurement flows modelled with Redux Toolkit",
        "Typed GraphQL data layer shared across features",
        "Component-driven Next.js frontend written in TypeScript",
        "Fully remote collaboration with a Saudi Arabia based product team",
    ],
    architecture_nodes=[
        ArchitectureNode(id="client", label="Next.js Frontend", x=130, y=200),
        ArchitectureNode(id="store", label="Redux Toolkit", x=400, y=200),
        ArchitectureNode(id="api", label="GraphQL API", x=670, y=200),
    ],
    architecture_edges=[
        ArchitectureEdge(source="client", target="store", label="dispatch"),
        ArchitectureEdge(source="store", target="api", label="query / mutate"),
    ],
    impact_metrics=[
        ImpactMetric(label="Work model", value="Fully remote"),
        ImpactMetric(label="Domain", value="B2B procurement"),
    ],
)
