import pytest
from fastapi.testclient import TestClient

from backend.core.config import get_settings
from backend.main import create_app


@pytest.fixture
def client() -> TestClient:
    get_settings.cache_clear()
    app = create_app()
    return TestClient(app)
