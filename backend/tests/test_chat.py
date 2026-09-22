import json

from fastapi.testclient import TestClient


def _parse_sse_events(body: str) -> list[dict[str, object]]:
    events: list[dict[str, object]] = []
    for block in body.split("\n\n"):
        data_lines = [
            line[len("data:") :].strip() for line in block.split("\n") if line.startswith("data:")
        ]
        if data_lines:
            events.append(json.loads("\n".join(data_lines)))
    return events


def test_chat_streams_ag_ui_events_in_mock_mode(client: TestClient) -> None:
    response = client.post(
        "/api/py/chat",
        json={"message": "Tell me about your experience with FastAPI.", "history": []},
        headers={"x-forwarded-for": "10.0.1.1"},
    )

    assert response.status_code == 200
    body = response.text
    assert '"type": "RUN_STARTED"' in body
    assert '"type": "RETRIEVAL"' in body
    assert '"type": "TEXT_MESSAGE_CONTENT"' in body
    assert '"type": "SOURCES"' in body
    assert '"type": "RUN_FINISHED"' in body


def test_chat_retrieval_event_is_ranked_and_marks_selected(client: TestClient) -> None:
    response = client.post(
        "/api/py/chat",
        json={"message": "Tell me about the K-Fabrik project.", "history": []},
        headers={"x-forwarded-for": "10.0.1.4"},
    )

    events = _parse_sse_events(response.text)
    retrieval_events = [event for event in events if event["type"] == "RETRIEVAL"]
    assert len(retrieval_events) == 1

    candidates = retrieval_events[0]["candidates"]
    assert isinstance(candidates, list)
    assert len(candidates) > 0
    assert all(0 <= candidate["relevance"] <= 100 for candidate in candidates)

    scores = [candidate["relevance"] for candidate in candidates]
    assert scores == sorted(scores, reverse=True)

    selected = [candidate for candidate in candidates if candidate["selected"]]
    assert len(selected) == min(4, len(candidates))
    assert selected[0]["relevance"] == 100


def test_chat_rejects_empty_message(client: TestClient) -> None:
    response = client.post(
        "/api/py/chat",
        json={"message": "", "history": []},
        headers={"x-forwarded-for": "10.0.1.2"},
    )

    assert response.status_code == 422


def test_chat_is_rate_limited(client: TestClient) -> None:
    headers = {"x-forwarded-for": "10.0.1.3"}
    payload = {"message": "What are your skills?", "history": []}

    for _ in range(10):
        response = client.post("/api/py/chat", json=payload, headers=headers)
        assert response.status_code == 200

    limited_response = client.post("/api/py/chat", json=payload, headers=headers)

    assert limited_response.status_code == 429
