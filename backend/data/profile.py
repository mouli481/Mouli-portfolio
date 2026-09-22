from backend.schemas.profile import CoreValue, EducationItem, FocusArea, Profile, SocialLink

PROFILE = Profile(
    name="Mouli V",
    title="Python Full Stack Developer | Generative AI & RAG",
    tagline="I build Generative AI and RAG systems that hold up in production.",
    roles=[
        "Python Full Stack Developer",
        "Generative AI Engineer",
        "RAG Systems Builder",
        "Next.js Engineer",
    ],
    location="Bengaluru, India",
    email="mouli.v598@gmail.com",
    phone="+91 8639598444",
    summary=(
        "Python Full Stack Developer with 4.5+ years of experience building "
        "production Generative AI and RAG systems. Currently architecting an "
        "enterprise-grade agentic chat platform on FastAPI, LangChain and "
        "LangGraph, with a background spanning full stack Next.js development "
        "and multi-cloud migrations across Azure, AWS and GCP."
    ),
    bio=[
        "I graduated in 2021 with a B.Tech in Computer Science from JNTU College "
        "of Engineering, Ananthapur, and went straight into enterprise software "
        "at Onward Technologies, building applications for Caterpillar and FlyDubai.",
        "Fleet management systems and micro frontends taught me how large products "
        "are really built: many teams, strict contracts, and code that has to keep "
        "working long after launch day.",
        "In 2023 I joined Binder remotely as a Frontend Engineer, shaping a B2B "
        "procurement platform with Next.js, TypeScript, Redux Toolkit and GraphQL.",
        "Since 2024 at ITC Infotech I have been deep in Generative AI: building "
        "K-Fabrik, an enterprise RAG chat platform on FastAPI, LangChain and "
        "LangGraph, migrating 30+ AI agents from Streamlit to FastAPI and Next.js, "
        "and moving workloads from Azure to AWS and GCP.",
        "Today I work where backend engineering, AI and frontend meet, and that "
        "is exactly where I like to be.",
    ],
    currently="Building agentic RAG experiences on K-Fabrik at ITC Infotech.",
    years_experience=4.5,
    education=[
        EducationItem(
            institution="JNTU College of Engineering, Ananthapur",
            degree="B.Tech",
            field="Computer Science and Engineering",
            year=2021,
        )
    ],
    social_links=[
        SocialLink(label="Email", url="mailto:mouli.v598@gmail.com", icon="mail"),
        SocialLink(label="Phone", url="tel:+918639598444", icon="phone"),
    ],
    focus_areas=[
        FocusArea(
            title="RAG & Knowledge Systems",
            description=(
                "Retrieval pipelines on PostgreSQL and pgvector, careful chunking and "
                "ranking, and grounded answers that cite their sources."
            ),
            icon="database",
        ),
        FocusArea(
            title="Agentic AI Workflows",
            description=(
                "Multi-step, tool-using agents with LangGraph, streamed to the browser "
                "through the AG-UI protocol and CopilotKit."
            ),
            icon="bot",
        ),
        FocusArea(
            title="Production APIs",
            description=(
                "Typed, testable FastAPI services with Pydantic, SQLAlchemy, and Celery "
                "and Redis for background work."
            ),
            icon="server",
        ),
        FocusArea(
            title="Modern Frontends",
            description=(
                "Next.js and TypeScript interfaces, from complex B2B workflows to "
                "real-time streaming chat experiences."
            ),
            icon="layout",
        ),
        FocusArea(
            title="Cloud & Migrations",
            description=(
                "Moving AI workloads across Azure, AWS and GCP with Docker, Kubernetes "
                "and Terraform."
            ),
            icon="cloud",
        ),
        FocusArea(
            title="Quality & Delivery",
            description=(
                "Pytest and Jest suites, strict typing and GitHub Actions pipelines that "
                "keep shipping safe."
            ),
            icon="shield",
        ),
    ],
    values=[
        CoreValue(
            title="Built for production",
            description=(
                "A demo is the easy part. I care about reliability, observability and "
                "what the system looks like on day one hundred."
            ),
            icon="rocket",
        ),
        CoreValue(
            title="Grounded AI",
            description=(
                "Answers should be traceable to real sources. Retrieval quality comes "
                "before prompt tricks."
            ),
            icon="target",
        ),
        CoreValue(
            title="Typed end to end",
            description=(
                "Pydantic on the server and TypeScript in the browser, so contracts "
                "break at build time instead of in front of users."
            ),
            icon="braces",
        ),
        CoreValue(
            title="Clarity over cleverness",
            description=(
                "Code the next engineer can read, change and trust without a meeting "
                "to explain it."
            ),
            icon="sparkles",
        ),
    ],
)
