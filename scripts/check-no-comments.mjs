import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { spawnSync } from "node:child_process";
import ts from "typescript";

const EXCLUDED_DIRS = new Set([
  ".venv",
  "node_modules",
  ".next",
  ".git",
  "__pycache__",
  "playwright-report",
  "test-results",
]);

const TS_EXTENSIONS = new Set([".ts", ".tsx"]);
const EXCLUDED_FILES = new Set(["next-env.d.ts"]);

function collectFiles(root, extensions) {
  const results = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (EXCLUDED_DIRS.has(entry) || EXCLUDED_FILES.has(entry)) continue;
      const fullPath = join(dir, entry);
      const stats = statSync(fullPath);
      if (stats.isDirectory()) {
        walk(fullPath);
      } else if (extensions.has(extname(entry))) {
        results.push(fullPath);
      }
    }
  };
  walk(root);
  return results;
}

function findCommentViolations(filePath) {
  const source = readFileSync(filePath, "utf-8");
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    false,
    filePath.endsWith(".tsx") ? ts.LanguageVariant.JSX : ts.LanguageVariant.Standard,
    source
  );

  const violations = [];
  let token = scanner.scan();
  while (token !== ts.SyntaxKind.EndOfFileToken) {
    if (
      token === ts.SyntaxKind.SingleLineCommentTrivia ||
      token === ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      const start = scanner.getTokenPos();
      const line = source.slice(0, start).split("\n").length;
      violations.push(`${filePath}:${line}: comment found`);
    }
    token = scanner.scan();
  }
  return violations;
}

function checkTypeScriptFiles(root) {
  const files = collectFiles(root, TS_EXTENSIONS);
  return files.flatMap(findCommentViolations);
}

function checkPythonFiles(root) {
  const venvPython =
    process.platform === "win32"
      ? join(".venv", "Scripts", "python.exe")
      : join(".venv", "bin", "python");
  const pythonCommand = statSync(venvPython, { throwIfNoEntry: false }) ? venvPython : "python3";
  const result = spawnSync(pythonCommand, ["scripts/check_no_comments.py", root], {
    encoding: "utf-8",
  });
  if (result.status !== 0) {
    return (result.stdout || result.stderr || "Python comment check failed.")
      .split("\n")
      .filter((line) => line.includes(": comment found") || line.includes(": docstring found"));
  }
  return [];
}

const root = process.cwd();
const violations = [...checkTypeScriptFiles(root), ...checkPythonFiles(root)];

if (violations.length > 0) {
  console.error(violations.join("\n"));
  console.error(`\n${violations.length} comment violation(s) found.`);
  process.exit(1);
}

console.log("No comments found in TypeScript or Python source files.");
