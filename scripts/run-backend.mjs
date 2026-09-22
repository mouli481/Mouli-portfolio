import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { platform } from "node:os";
import { join } from "node:path";

const WATCHED_DIRECTORIES = ["backend", "api"];
const RESTART_DEBOUNCE_MS = 300;

const isWindows = platform() === "win32";
const venvPython = isWindows
  ? join(".venv", "Scripts", "python.exe")
  : join(".venv", "bin", "python");
const pythonCommand = existsSync(venvPython) ? venvPython : "python3";
const uvicornArgs = ["-m", "uvicorn", "api.index:app", "--port", "8000"];

let server = null;
let restartTimer = null;
let shuttingDown = false;

function startServer() {
  server = spawn(pythonCommand, uvicornArgs, { stdio: "inherit" });
  server.on("exit", (code) => {
    if (shuttingDown) {
      process.exit(code ?? 0);
    }
  });
}

function restartServer(changedFile) {
  console.log(`[api] ${changedFile} changed, restarting server...`);
  const previous = server;
  server = null;
  if (previous && previous.exitCode === null) {
    previous.once("exit", startServer);
    previous.kill();
  } else {
    startServer();
  }
}

function scheduleRestart(changedFile) {
  if (restartTimer) {
    clearTimeout(restartTimer);
  }
  restartTimer = setTimeout(() => restartServer(changedFile), RESTART_DEBOUNCE_MS);
}

for (const directory of WATCHED_DIRECTORIES) {
  watch(directory, { recursive: true }, (_event, filename) => {
    if (filename && filename.endsWith(".py") && !filename.includes("__pycache__")) {
      scheduleRestart(join(directory, filename));
    }
  });
}

function shutdown() {
  shuttingDown = true;
  if (server && server.exitCode === null) {
    server.kill();
  } else {
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
