from backend.schemas.project import ArchitectureEdge, ArchitectureNode, ImpactMetric, ProjectDetail

CAT_FLEET = ProjectDetail(
    slug="cat-fleet-management",
    title="CAT Fleet Management",
    category="cloud",
    summary=(
        "Enterprise fleet management application delivered for Caterpillar while "
        "at Onward Technologies."
    ),
    company="Onward Technologies",
    period="2021 — 2023",
    role="Senior Software Engineer",
    tech_stack=["AWS", "Docker", "Kubernetes", "Terraform"],
    featured=False,
    problem=(
        "Caterpillar needed a reliable fleet management system to help operations "
        "teams track and manage vehicles and equipment at scale."
    ),
    solution=(
        "Contributed as a Senior Software Engineer on the Onward Technologies team "
        "that built and operated the CAT Fleet Management application."
    ),
    highlights=[
        "Enterprise application delivered for a global equipment manufacturer",
        "Worked inside a large, multi-team delivery organisation",
    ],
    architecture_nodes=[
        ArchitectureNode(id="client", label="Web Client", x=130, y=200),
        ArchitectureNode(id="api", label="Application Backend", x=400, y=200),
        ArchitectureNode(id="infra", label="Cloud Infrastructure", x=670, y=200),
    ],
    architecture_edges=[
        ArchitectureEdge(source="client", target="api", label="requests"),
        ArchitectureEdge(source="api", target="infra", label="runs on"),
    ],
    impact_metrics=[
        ImpactMetric(label="Client", value="Caterpillar"),
        ImpactMetric(label="Domain", value="Fleet management"),
    ],
)
