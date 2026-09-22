import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { platform } from "node:os";
import { join } from "node:path";

const isWindows = platform() === "win32";
const venvPython = isWindows
  ? join(".venv", "Scripts", "python.exe")
  : join(".venv", "bin", "python");

const pythonCommand = existsSync(venvPython) ? venvPython : "python3";

const child = spawn(
  pythonCommand,
  ["-m", "uvicorn", "api.index:app", "--reload", "--port", "8000"],
  { stdio: "inherit" }
);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
