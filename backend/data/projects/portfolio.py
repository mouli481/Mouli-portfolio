from backend.schemas.project import ArchitectureEdge, ArchitectureNode, ImpactMetric, ProjectDetail

AI_PORTFOLIO = ProjectDetail(
    slug="ai-portfolio",
    title="AI Portfolio with a RAG Assistant",
    category="full-stack",
    summary=(
        "This site: a Next.js and FastAPI portfolio with a built-in AI assistant that "
        "answers questions about my work using retrieval over my own profile."
    ),
    company="Personal project",
    period="2026",
    role="Designer & Developer",
    tech_stack=[
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "FastAPI",
        "Pydantic",
        "BM25",
        "Server-Sent Events",
        "Groq",
        "Gemini",
        "Vercel",
    ],
    featured=True,
    problem=(
        "A static CV cannot answer questions. I wanted a portfolio that visitors can "
        "talk to, that stays fast and accessible, and that deploys for free as a "
        "single project with zero required configuration."
    ),
    solution=(
        "A Next.js App Router frontend and a FastAPI backend deployed together on "
        "Vercel. The assistant chunks my profile, experience, projects and skills, "
        "ranks them with a pure-Python BM25 retriever, and streams grounded answers "
        "over Server-Sent Events using AG-UI style events, with Groq, Gemini or a "
        "deterministic mock responder behind one provider interface."
    ),
    highlights=[
        "Pure-Python BM25 retrieval with source citations, no heavy ML dependencies",
        "Provider-agnostic LLM client for Groq and Gemini with a mock fallback",
        "Streaming responses using AG-UI style SSE events",
        "Repository layer ready to swap mock data for Neon or Supabase Postgres",
        "Strict TypeScript, mypy --strict, and CI on every push",
    ],
    architecture_nodes=[
        ArchitectureNode(id="browser", label="Browser", x=100, y=200),
        ArchitectureNode(id="next", label="Next.js (RSC)", x=300, y=200),
        ArchitectureNode(id="api", label="FastAPI Function", x=500, y=200),
        ArchitectureNode(id="retriever", label="BM25 Retriever", x=700, y=110),
        ArchitectureNode(id="llm", label="Groq / Gemini", x=700, y=290),
    ],
    architecture_edges=[
        ArchitectureEdge(source="browser", target="next", label="request"),
        ArchitectureEdge(source="next", target="api", label="/api/py"),
        ArchitectureEdge(source="api", target="retriever", label="rank chunks"),
        ArchitectureEdge(source="api", target="llm", label="SSE stream"),
    ],
    impact_metrics=[
        ImpactMetric(label="API endpoints", value="9"),
        ImpactMetric(label="Env vars required", value="0"),
        ImpactMetric(label="Hosting", value="Free tier"),
    ],
)
