from fastapi.testclient import TestClient

VALID_PAYLOAD = {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Let's work together",
    "message": "Hi Mouli, I'd love to discuss an opportunity with you.",
}


def test_submit_contact_form_succeeds(client: TestClient) -> None:
    response = client.post(
        "/api/py/contact",
        json=VALID_PAYLOAD,
        headers={"x-forwarded-for": "10.0.0.1"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True


def test_submit_contact_form_rejects_short_message(client: TestClient) -> None:
    payload = {**VALID_PAYLOAD, "message": "too short"}

    response = client.post(
        "/api/py/contact",
        json=payload,
        headers={"x-forwarded-for": "10.0.0.2"},
    )

    assert response.status_code == 422


def test_submit_contact_form_rejects_invalid_email(client: TestClient) -> None:
    payload = {**VALID_PAYLOAD, "email": "not-an-email"}

    response = client.post(
        "/api/py/contact",
        json=payload,
        headers={"x-forwarded-for": "10.0.0.3"},
    )

    assert response.status_code == 422


def test_submit_contact_form_is_rate_limited(client: TestClient) -> None:
    headers = {"x-forwarded-for": "10.0.0.4"}

    for _ in range(3):
        response = client.post("/api/py/contact", json=VALID_PAYLOAD, headers=headers)
        assert response.status_code == 200

    limited_response = client.post("/api/py/contact", json=VALID_PAYLOAD, headers=headers)

    assert limited_response.status_code == 429
