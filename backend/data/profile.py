from backend.schemas.profile import EducationItem, Profile, SocialLink

PROFILE = Profile(
    name="Mouli V",
    title="Python Full Stack Developer | Generative AI & RAG",
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
)
