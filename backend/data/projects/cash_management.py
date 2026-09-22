from backend.schemas.project import ArchitectureEdge, ArchitectureNode, ImpactMetric, ProjectDetail

CASH_MANAGEMENT = ProjectDetail(
    slug="cash-management-dcs",
    title="Cash Management / DCS",
    category="frontend",
    summary=(
        "Micro-frontend cash management system delivered for FlyDubai while at " "ITC Infotech."
    ),
    company="ITC Infotech",
    period="Feb 2024 — May 2024",
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
        "Cash Management / DCS system as part of the ITC Infotech team."
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
