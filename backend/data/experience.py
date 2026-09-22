from backend.schemas.experience import ExperienceItem

EXPERIENCE: list[ExperienceItem] = [
    ExperienceItem(
        id="itc-infotech",
        company="ITC Infotech",
        role="Senior Software Engineer",
        location="Bengaluru, India",
        start_date="2024-02",
        end_date=None,
        is_current=True,
        summary=(
            "Joined in February 2024 on Cash Management / DCS, a micro-frontend "
            "platform for FlyDubai, then moved in May 2024 onto K-Fabrik, an "
            "enterprise RAG-based AI chat platform, leading the migration of 30+ "
            "AI agents from Streamlit to a FastAPI and Next.js stack."
        ),
        achievements=[
            "Feb 2024 — May 2024: contributed to Cash Management / DCS, a "
            "micro-frontend platform built for FlyDubai.",
            "May 2024 — Present: architected K-Fabrik, an enterprise RAG chat "
            "platform, using FastAPI, LangChain, LangGraph, the AG-UI protocol "
            "and CopilotKit.",
            "Migrated 30+ AI agents from Streamlit to a FastAPI + Next.js architecture.",
            "Led cloud migrations from Azure to AWS and from Azure to GCP.",
            "Built asynchronous agent workflows with Celery and Redis, backed by "
            "PostgreSQL with pgvector for retrieval.",
        ],
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
    ),
    ExperienceItem(
        id="binder-sa",
        company="Binder-sa",
        role="Frontend Engineer",
        location="Remote, Saudi Arabia",
        start_date="2023-07",
        end_date="2024-02",
        is_current=False,
        summary=(
            "Built core frontend features for Binder, a B2B procurement platform, "
            "remotely for a Saudi Arabia based company."
        ),
        achievements=[
            "Developed and maintained frontend features for a B2B procurement platform.",
            "Used Redux Toolkit to manage complex, multi-step procurement workflows.",
            "Integrated a GraphQL API with typed queries across the application.",
        ],
        tech_stack=["Next.js", "TypeScript", "Redux Toolkit", "GraphQL"],
    ),
    ExperienceItem(
        id="onward-technologies",
        company="Onward Technologies",
        role="Senior Software Engineer",
        location="India",
        start_date="2021-11",
        end_date="2023-05",
        is_current=False,
        summary=(
            "Delivered CAT Fleet Management, an enterprise fleet tracking "
            "application built for Caterpillar."
        ),
        achievements=[
            "Contributed to CAT Fleet Management, an enterprise fleet tracking "
            "application built for Caterpillar.",
        ],
        tech_stack=["AWS", "Docker", "Kubernetes", "Terraform"],
    ),
]
