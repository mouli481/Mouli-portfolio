from fastapi.testclient import TestClient


def test_list_skills_returns_populated_list(client: TestClient) -> None:
    response = client.get("/api/py/skills")

    assert response.status_code == 200
    body = response.json()
    assert len(body) > 20
    ids = {skill["id"] for skill in body}
    assert "python" in ids
    assert "fastapi" in ids
    assert "langgraph" in ids
