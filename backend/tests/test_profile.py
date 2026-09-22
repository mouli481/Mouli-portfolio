from fastapi.testclient import TestClient


def test_get_profile_returns_expected_fields(client: TestClient) -> None:
    response = client.get("/api/py/profile")

    assert response.status_code == 200
    body = response.json()
    assert body["name"] == "Mouli V"
    assert body["email"] == "mouli.v598@gmail.com"
    assert "education" in body
    assert len(body["education"]) == 1


def test_get_profile_includes_story_and_values(client: TestClient) -> None:
    body = client.get("/api/py/profile").json()

    assert len(body["bio"]) >= 3
    assert len(body["values"]) >= 3
    assert len(body["focus_areas"]) >= 3
    assert body["roles"]
