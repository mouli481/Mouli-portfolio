from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.config import get_settings
from backend.core.errors import register_exception_handlers
from backend.core.logging import configure_logging
from backend.routers import chat, contact, experience, health, profile, projects, skills, stats


def create_app() -> FastAPI:
    configure_logging()
    settings = get_settings()

    app = FastAPI(
        title="Mouli V Portfolio API",
        version="0.1.0",
        openapi_url=f"{settings.api_prefix}/openapi.json",
        docs_url=f"{settings.api_prefix}/docs",
        redoc_url=f"{settings.api_prefix}/redoc",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(app)

    api_router = APIRouter(prefix=settings.api_prefix)
    api_router.include_router(health.router)
    api_router.include_router(profile.router)
    api_router.include_router(experience.router)
    api_router.include_router(projects.router)
    api_router.include_router(skills.router)
    api_router.include_router(stats.router)
    api_router.include_router(chat.router)
    api_router.include_router(contact.router)

    app.include_router(api_router)

    return app


app = create_app()
