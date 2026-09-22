from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    environment: Literal["development", "production", "test"] = "development"
    api_prefix: str = "/api/py"

    allowed_origins: str = "http://localhost:3000"

    llm_provider: Literal["groq", "gemini", "mock"] = "mock"
    groq_api_key: str | None = None
    gemini_api_key: str | None = None
    groq_model: str = "llama-3.3-70b-versatile"
    gemini_model: str = "gemini-2.0-flash"

    resend_api_key: str | None = None
    contact_to_email: str = "mouli.v598@gmail.com"

    upstash_redis_rest_url: str | None = None
    upstash_redis_rest_token: str | None = None

    chat_rate_limit_per_minute: int = 10
    contact_rate_limit_per_minute: int = 3

    next_public_site_url: str = "http://localhost:3000"

    @property
    def allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    @property
    def has_redis_rate_limiting(self) -> bool:
        return bool(self.upstash_redis_rest_url and self.upstash_redis_rest_token)

    @property
    def has_email_delivery(self) -> bool:
        return bool(self.resend_api_key)


@lru_cache
def get_settings() -> Settings:
    return Settings()
