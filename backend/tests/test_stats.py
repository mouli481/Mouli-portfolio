from fastapi.testclient import TestClient


def test_get_stats_matches_data_layer(client: TestClient) -> None:
    response = client.get("/api/py/stats")

    assert response.status_code == 200
    body = response.json()
    assert body["years_experience"] == 4.5
    assert body["projects_shipped"] == 4
    assert body["agents_migrated"] == 30
