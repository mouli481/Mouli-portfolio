import ast
import io
import sys
import tokenize
from pathlib import Path

EXCLUDED_DIRS = {".venv", "node_modules", ".next", ".git", "__pycache__"}


def iter_python_files(root: Path) -> list[Path]:
    files: list[Path] = []
    for path in root.rglob("*.py"):
        if any(part in EXCLUDED_DIRS for part in path.parts):
            continue
        files.append(path)
    return files


def find_comment_lines(source: str) -> list[int]:
    lines: list[int] = []
    tokens = tokenize.generate_tokens(io.StringIO(source).readline)
    for token in tokens:
        if token.type == tokenize.COMMENT:
            lines.append(token.start[0])
    return lines


def find_docstring_lines(source: str, path: Path) -> list[int]:
    tree = ast.parse(source, filename=str(path))
    lines: list[int] = []

    def check_body(body: list[ast.stmt]) -> None:
        if not body:
            return
        first = body[0]
        if (
            isinstance(first, ast.Expr)
            and isinstance(first.value, ast.Constant)
            and isinstance(first.value.value, str)
        ):
            lines.append(first.lineno)

    check_body(tree.body)
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef | ast.AsyncFunctionDef | ast.ClassDef):
            check_body(node.body)

    return lines


def main() -> int:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    violations: list[str] = []

    for path in iter_python_files(root):
        source = path.read_text(encoding="utf-8")
        for line in find_comment_lines(source):
            violations.append(f"{path}:{line}: comment found")
        for line in find_docstring_lines(source, path):
            violations.append(f"{path}:{line}: docstring found")

    if violations:
        print("\n".join(sorted(violations)))
        print(f"\n{len(violations)} comment/docstring violation(s) found.")
        return 1

    print("No comments or docstrings found in Python files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
