from fastapi.testclient import TestClient


def test_chat_streams_ag_ui_events_in_mock_mode(client: TestClient) -> None:
    response = client.post(
        "/api/py/chat",
        json={"message": "Tell me about your experience with FastAPI.", "history": []},
        headers={"x-forwarded-for": "10.0.1.1"},
    )

    assert response.status_code == 200
    body = response.text
    assert '"type": "RUN_STARTED"' in body
    assert '"type": "TEXT_MESSAGE_CONTENT"' in body
    assert '"type": "SOURCES"' in body
    assert '"type": "RUN_FINISHED"' in body


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
