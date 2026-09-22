from backend.schemas.project import ArchitectureEdge, ArchitectureNode, ImpactMetric, ProjectDetail

K_FABRIK = ProjectDetail(
    slug="k-fabrik",
    title="K-Fabrik — Enterprise RAG Chat Platform",
    category="genai",
    summary=(
        "Enterprise-grade Retrieval-Augmented Generation platform that lets teams "
        "query internal knowledge and run multi-step agent workflows through one "
        "conversational interface."
    ),
    company="ITC Infotech",
    period="2024 — Present",
    role="Senior Software Engineer",
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
        "Enterprise teams needed a single conversational entry point into scattered "
        "internal knowledge and multi-step workflows, while 30+ existing AI agents "
        "were locked into a Streamlit front end that could not scale to production "
        "traffic or support a modern, collaborative agent experience."
    ),
    solution=(
        "Re-architected the platform around a FastAPI, LangChain and LangGraph "
        "backend, using the AG-UI protocol and CopilotKit to drive a streaming, "
        "tool-using chat experience in Next.js. Celery and Redis handle asynchronous "
        "agent execution, and PostgreSQL with pgvector powers retrieval over the "
        "knowledge base. All 30+ agents moved from Streamlit to this FastAPI + "
        "Next.js architecture, and core infrastructure moved from Azure to both AWS "
        "and GCP."
    ),
    highlights=[
        "Agent responses streamed to the browser with the AG-UI protocol and CopilotKit",
        "LangGraph workflows orchestrating multi-step, tool-using agents",
        "pgvector retrieval over enterprise knowledge stored in PostgreSQL",
        "Celery and Redis workers for long-running agent tasks",
        "30+ agents migrated from Streamlit to FastAPI and Next.js",
        "Infrastructure migrated from Azure to AWS and to GCP",
    ],
    architecture_nodes=[
        ArchitectureNode(id="client", label="Next.js Client", x=100, y=200),
        ArchitectureNode(id="api", label="FastAPI Gateway", x=300, y=200),
        ArchitectureNode(id="agents", label="LangGraph Agents", x=500, y=110),
        ArchitectureNode(id="queue", label="Celery + Redis", x=500, y=290),
        ArchitectureNode(id="llm", label="LLM Providers", x=700, y=110),
        ArchitectureNode(id="db", label="Postgres + pgvector", x=700, y=290),
    ],
    architecture_edges=[
        ArchitectureEdge(source="client", target="api", label="AG-UI stream"),
        ArchitectureEdge(source="api", target="agents", label="invoke"),
        ArchitectureEdge(source="api", target="queue", label="enqueue"),
        ArchitectureEdge(source="agents", target="llm", label="completion"),
        ArchitectureEdge(source="agents", target="db", label="retrieve"),
        ArchitectureEdge(source="queue", target="db", label="persist"),
    ],
    impact_metrics=[
        ImpactMetric(label="AI agents migrated", value="30+"),
        ImpactMetric(label="Frontend rewrite", value="Streamlit → Next.js"),
        ImpactMetric(label="Cloud migration", value="Azure → AWS & GCP"),
    ],
)
