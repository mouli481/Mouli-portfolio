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

CASH_MANAGEMENT = ProjectDetail(
    slug="cash-management-dcs",
    title="Cash Management / DCS",
    category="frontend",
    summary=(
        "Micro-frontend cash management system delivered for FlyDubai while at "
        "Onward Technologies."
    ),
    company="Onward Technologies",
    period="2021 — 2023",
    role="Senior Software Engineer",
    tech_stack=["Micro Frontends", "TypeScript", "JavaScript"],
    featured=False,
    problem=(
        "FlyDubai needed a cash management system composed of independently "
        "deployable frontend modules that separate teams could own and ship on "
        "their own schedules."
    ),
    solution=(
        "Contributed to the micro-frontend architecture and implementation of the "
        "Cash Management / DCS system as part of the Onward Technologies team."
    ),
    highlights=[
        "Independently deployable micro frontends owned by separate teams",
        "A shell application composing feature modules at runtime",
    ],
    architecture_nodes=[
        ArchitectureNode(id="shell", label="Shell App", x=150, y=200),
        ArchitectureNode(id="cash", label="Cash Module", x=420, y=110),
        ArchitectureNode(id="reports", label="Reporting Module", x=420, y=290),
        ArchitectureNode(id="ui", label="Shared UI Kit", x=680, y=200),
    ],
    architecture_edges=[
        ArchitectureEdge(source="shell", target="cash", label="mounts"),
        ArchitectureEdge(source="shell", target="reports", label="mounts"),
        ArchitectureEdge(source="cash", target="ui", label="uses"),
        ArchitectureEdge(source="reports", target="ui", label="uses"),
    ],
    impact_metrics=[
        ImpactMetric(label="Client", value="FlyDubai"),
        ImpactMetric(label="Architecture", value="Micro frontends"),
    ],
)
