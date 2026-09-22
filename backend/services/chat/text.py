import re

_TOKEN_PATTERN = re.compile(r"[a-z0-9]+(?:[.+#-][a-z0-9]+)*")
_COMPOUND_SEPARATORS = re.compile(r"[.+#-]")

STOPWORDS = frozenset(
    {
        "a",
        "about",
        "an",
        "and",
        "are",
        "as",
        "at",
        "be",
        "by",
        "can",
        "could",
        "did",
        "do",
        "does",
        "for",
        "from",
        "has",
        "have",
        "he",
        "his",
        "how",
        "i",
        "if",
        "in",
        "is",
        "it",
        "its",
        "me",
        "my",
        "of",
        "on",
        "or",
        "our",
        "please",
        "she",
        "so",
        "tell",
        "that",
        "the",
        "their",
        "them",
        "there",
        "they",
        "this",
        "to",
        "was",
        "we",
        "were",
        "what",
        "when",
        "where",
        "which",
        "who",
        "why",
        "will",
        "with",
        "would",
        "you",
        "your",
    }
)


def tokenize(text: str) -> list[str]:
    tokens: list[str] = []
    for token in _TOKEN_PATTERN.findall(text.lower()):
        if token in STOPWORDS:
            continue
        tokens.append(token)
        parts = [part for part in _COMPOUND_SEPARATORS.split(token) if part]
        if len(parts) > 1:
            tokens.extend(part for part in parts if part not in STOPWORDS)
            tokens.append("".join(parts))
    return tokens
