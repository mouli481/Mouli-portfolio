from backend.schemas.project import ArchitectureEdge, ArchitectureNode, ImpactMetric, ProjectDetail

PROJECTS: list[ProjectDetail] = [
    ProjectDetail(
        slug="k-fabrik",
        title="K-Fabrik — Enterprise RAG Chat Platform",
        category="genai",
        summary=(
            "Enterprise-grade Retrieval-Augmented Generation platform that lets "
            "teams query internal knowledge and trigger multi-step agent "
            "workflows through a conversational interface."
        ),
        tech_stack=[
            "Python",
            "FastAPI",
            "LangChain",
            "LangGraph",
            "AG-UI Protocol",
            "CopilotKit",
            "Celery",
            "Redis",
            "PostgreSQL",
            "pgvector",
            "Next.js",
            "TypeScript",
        ],
        featured=True,
        problem=(
            "Enterprise teams needed a single conversational entry point into "
            "scattered internal knowledge and multi-step workflows, while 30+ "
            "existing AI agents were locked into a Streamlit front end that "
            "could not scale to production traffic or support a modern, "
            "collaborative agent UI."
        ),
        solution=(
            "Re-architected the platform around a FastAPI, LangChain and "
            "LangGraph backend, using the AG-UI protocol and CopilotKit to "
            "drive a streaming, tool-using chat experience in Next.js. Celery "
            "and Redis handle asynchronous agent execution, and PostgreSQL "
            "with pgvector powers retrieval over the knowledge base. All 30+ "
            "agents were migrated from Streamlit to this FastAPI + Next.js "
            "architecture, and core infrastructure was migrated from Azure to "
            "both AWS and GCP."
        ),
        architecture_nodes=[
            ArchitectureNode(id="client", label="Next.js Client", x=60, y=200),
            ArchitectureNode(id="api", label="FastAPI Gateway", x=260, y=200),
            ArchitectureNode(id="agents", label="LangGraph Agents", x=460, y=120),
            ArchitectureNode(id="queue", label="Celery + Redis", x=460, y=280),
            ArchitectureNode(id="db", label="PostgreSQL + pgvector", x=660, y=280),
            ArchitectureNode(id="llm", label="LLM Providers", x=660, y=120),
        ],
        architecture_edges=[
            ArchitectureEdge(source="client", target="api", label="AG-UI stream"),
            ArchitectureEdge(source="api", target="agents", label="invoke"),
            ArchitectureEdge(source="api", target="queue", label="enqueue"),
            ArchitectureEdge(source="agents", target="llm", label="completion"),
            ArchitectureEdge(source="queue", target="db", label="retrieve"),
            ArchitectureEdge(source="agents", target="db", label="retrieve"),
        ],
        impact_metrics=[
            ImpactMetric(label="AI agents migrated", value="30+"),
            ImpactMetric(label="Frontend rewrite", value="Streamlit → FastAPI + Next.js"),
            ImpactMetric(label="Cloud migration", value="Azure → AWS & GCP"),
        ],
    ),
    ProjectDetail(
        slug="binder-b2b-procurement",
        title="Binder — B2B Procurement Platform",
        category="frontend",
        summary=(
            "B2B procurement platform built remotely for a Saudi Arabia based "
            "company, with a type-safe frontend over a GraphQL API."
        ),
        tech_stack=["Next.js", "TypeScript", "Redux Toolkit", "GraphQL"],
        featured=True,
        problem=(
            "The procurement platform needed a maintainable, type-safe "
            "frontend that could handle complex, multi-step procurement "
            "workflows and stay consistent as the product and team scaled."
        ),
        solution=(
            "Built and maintained core frontend features in Next.js and "
            "TypeScript, using Redux Toolkit for predictable state across "
            "procurement workflows and a typed GraphQL layer for data "
            "fetching."
        ),
        architecture_nodes=[
            ArchitectureNode(id="client", label="Next.js Frontend", x=100, y=200),
            ArchitectureNode(id="store", label="Redux Toolkit Store", x=340, y=200),
            ArchitectureNode(id="api", label="GraphQL API", x=580, y=200),
        ],
        architecture_edges=[
            ArchitectureEdge(source="client", target="store", label="dispatch"),
            ArchitectureEdge(source="store", target="api", label="query / mutate"),
        ],
        impact_metrics=[],
    ),
    ProjectDetail(
        slug="cat-fleet-management",
        title="CAT Fleet Management",
        category="cloud",
        summary=(
            "Enterprise fleet management application delivered for Caterpillar "
            "while at Onward Technologies."
        ),
        tech_stack=["AWS", "Docker", "Kubernetes", "Terraform"],
        featured=False,
        problem=(
            "Caterpillar needed a reliable fleet management system to help "
            "operations teams track and manage vehicles and equipment at scale."
        ),
        solution=(
            "Contributed as a Senior Software Engineer on the Onward "
            "Technologies team that built and operated the CAT Fleet "
            "Management application."
        ),
        architecture_nodes=[
            ArchitectureNode(id="client", label="Web Client", x=100, y=200),
            ArchitectureNode(id="api", label="Application Backend", x=340, y=200),
            ArchitectureNode(id="infra", label="Cloud Infrastructure", x=580, y=200),
        ],
        architecture_edges=[
            ArchitectureEdge(source="client", target="api", label="requests"),
            ArchitectureEdge(source="api", target="infra", label="deploys on"),
        ],
        impact_metrics=[],
    ),
    ProjectDetail(
        slug="cash-management-dcs",
        title="Cash Management / DCS",
        category="frontend",
        summary=(
            "Micro-frontend cash management system delivered for FlyDubai "
            "while at Onward Technologies."
        ),
        tech_stack=["Micro Frontends", "TypeScript", "JavaScript"],
        featured=False,
        problem=(
            "FlyDubai needed a cash management system composed of "
            "independently deployable frontend modules that separate teams "
            "could own and ship on their own schedules."
        ),
        solution=(
            "Contributed to the micro-frontend architecture and "
            "implementation of the Cash Management / DCS system as part of "
            "the Onward Technologies team."
        ),
        architecture_nodes=[
            ArchitectureNode(id="shell", label="Shell App", x=100, y=200),
            ArchitectureNode(id="mfe1", label="Cash Module", x=340, y=120),
            ArchitectureNode(id="mfe2", label="Reporting Module", x=340, y=280),
        ],
        architecture_edges=[
            ArchitectureEdge(source="shell", target="mfe1", label="mounts"),
            ArchitectureEdge(source="shell", target="mfe2", label="mounts"),
        ],
        impact_metrics=[],
    ),
]
