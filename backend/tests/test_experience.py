from fastapi.testclient import TestClient


def test_list_experience_returns_three_roles(client: TestClient) -> None:
    response = client.get("/api/py/experience")

    assert response.status_code == 200
    body = response.json()
    assert len(body) == 3
    assert body[0]["company"] == "ITC Infotech"
    assert body[0]["is_current"] is True
