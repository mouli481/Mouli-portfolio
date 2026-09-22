from backend.services.chat.chunker import Chunk
from backend.services.chat.retriever import BM25Retriever, tokenize


def test_tokenize_lowercases_and_splits() -> None:
    tokens = tokenize("FastAPI + LangGraph, RAG!")

    assert "fastapi" in tokens
    assert "langgraph" in tokens
    assert "rag" in tokens


def test_bm25_ranks_relevant_chunk_first() -> None:
    chunks = [
        Chunk(
            id="a",
            title="Python",
            section="skills",
            content="Mouli is skilled in Python and FastAPI.",
        ),
        Chunk(
            id="b",
            title="Frontend",
            section="skills",
            content="Mouli builds interfaces with Next.js and React.",
        ),
    ]
    retriever = BM25Retriever(chunks)

    results = retriever.search("Tell me about FastAPI experience", top_k=2)

    assert results
    assert results[0].chunk.id == "a"


def test_bm25_boosts_matching_project_slug() -> None:
    chunks = [
        Chunk(
            id="a",
            title="K-Fabrik",
            section="projects",
            project_slug="k-fabrik",
            content="RAG platform",
        ),
        Chunk(
            id="b",
            title="Binder",
            section="projects",
            project_slug="binder",
            content="RAG platform",
        ),
    ]
    retriever = BM25Retriever(chunks)

    results = retriever.search("RAG platform", top_k=2, project_slug="binder")

    assert results[0].chunk.id == "b"


def test_bm25_returns_empty_for_no_match() -> None:
    chunks = [Chunk(id="a", title="Python", section="skills", content="Mouli knows Python.")]
    retriever = BM25Retriever(chunks)

    results = retriever.search("zzz nonexistent term qqq")

    assert results == []
