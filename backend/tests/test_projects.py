from fastapi.testclient import TestClient


def test_list_projects_returns_all_by_default(client: TestClient) -> None:
    response = client.get("/api/py/projects")

    assert response.status_code == 200
    assert len(response.json()) == 5


def test_list_projects_filters_by_category(client: TestClient) -> None:
    response = client.get("/api/py/projects", params={"category": "genai"})

    assert response.status_code == 200
    body = response.json()
    assert len(body) == 1
    assert body[0]["slug"] == "k-fabrik"


def test_get_project_by_slug(client: TestClient) -> None:
    response = client.get("/api/py/projects/k-fabrik")

    assert response.status_code == 200
    body = response.json()
    assert body["title"].startswith("K-Fabrik")
    assert len(body["architecture_nodes"]) > 0


def test_get_project_returns_404_for_unknown_slug(client: TestClient) -> None:
    response = client.get("/api/py/projects/does-not-exist")

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NotFoundError"


def test_every_architecture_edge_references_existing_nodes(client: TestClient) -> None:
    summaries = client.get("/api/py/projects").json()

    for summary in summaries:
        detail = client.get(f"/api/py/projects/{summary['slug']}").json()
        node_ids = {node["id"] for node in detail["architecture_nodes"]}
        for edge in detail["architecture_edges"]:
            assert edge["source"] in node_ids
            assert edge["target"] in node_ids
