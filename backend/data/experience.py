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
            "Building K-Fabrik, an enterprise RAG-based AI chat platform, and "
            "leading the migration of 30+ AI agents from Streamlit to a "
            "FastAPI and Next.js stack."
        ),
        achievements=[
            "Architected an enterprise RAG chat platform using FastAPI, LangChain, "
            "LangGraph, the AG-UI protocol and CopilotKit.",
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
            "Delivered enterprise applications for Caterpillar and FlyDubai, "
            "including a fleet management system and a micro-frontend cash "
            "management platform."
        ),
        achievements=[
            "Contributed to CAT Fleet Management, an enterprise fleet tracking "
            "application built for Caterpillar.",
            "Contributed to Cash Management / DCS, a micro-frontend platform "
            "built for FlyDubai.",
        ],
        tech_stack=["JavaScript", "TypeScript", "Micro Frontends"],
    ),
]
