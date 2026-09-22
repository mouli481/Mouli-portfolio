import math
from collections import Counter
from dataclasses import dataclass
from functools import lru_cache

from backend.services.chat.chunker import Chunk, build_corpus
from backend.services.chat.text import tokenize

TITLE_WEIGHT = 2

__all__ = ["BM25Retriever", "ScoredChunk", "get_retriever", "tokenize"]


def _document_tokens(chunk: Chunk) -> list[str]:
    return tokenize(chunk.title) * TITLE_WEIGHT + tokenize(chunk.content)


@dataclass(frozen=True)
class ScoredChunk:
    chunk: Chunk
    score: float


class BM25Retriever:
    def __init__(self, chunks: list[Chunk], *, k1: float = 1.5, b: float = 0.75) -> None:
        self._chunks = chunks
        self._k1 = k1
        self._b = b
        self._tokenized = [_document_tokens(chunk) for chunk in chunks]
        self._doc_lengths = [len(tokens) for tokens in self._tokenized]
        self._avg_doc_length = (
            sum(self._doc_lengths) / len(self._doc_lengths) if self._doc_lengths else 0.0
        )
        self._term_frequencies = [Counter(tokens) for tokens in self._tokenized]
        self._doc_count = len(chunks)
        self._doc_frequency = self._compute_document_frequency()

    def _compute_document_frequency(self) -> dict[str, int]:
        frequency: dict[str, int] = {}
        for tokens in self._tokenized:
            for term in set(tokens):
                frequency[term] = frequency.get(term, 0) + 1
        return frequency

    def _idf(self, term: str) -> float:
        doc_frequency = self._doc_frequency.get(term, 0)
        return math.log(1 + (self._doc_count - doc_frequency + 0.5) / (doc_frequency + 0.5))

    def search(
        self,
        query: str,
        *,
        top_k: int = 4,
        project_slug: str | None = None,
    ) -> list[ScoredChunk]:
        query_terms = tokenize(query)
        if not query_terms or self._doc_count == 0:
            return []

        scores: list[float] = [0.0] * self._doc_count
        for index in range(self._doc_count):
            doc_length = self._doc_lengths[index]
            term_frequencies = self._term_frequencies[index]
            score = 0.0
            for term in query_terms:
                if term not in term_frequencies:
                    continue
                frequency = term_frequencies[term]
                numerator = frequency * (self._k1 + 1)
                denominator = frequency + self._k1 * (
                    1 - self._b + self._b * doc_length / (self._avg_doc_length or 1)
                )
                score += self._idf(term) * (numerator / denominator)
            if project_slug and self._chunks[index].project_slug == project_slug:
                score *= 1.5
            scores[index] = score

        ranked = sorted(
            (ScoredChunk(chunk=self._chunks[i], score=scores[i]) for i in range(self._doc_count)),
            key=lambda scored: scored.score,
            reverse=True,
        )
        return [scored for scored in ranked if scored.score > 0][:top_k]


@lru_cache
def get_retriever() -> BM25Retriever:
    return BM25Retriever(build_corpus())
