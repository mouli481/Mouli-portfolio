export interface ProcessStep {
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Understand the knowledge",
    description:
      "Map the sources, their formats and how fresh they need to be, then design chunking around how people will actually ask questions.",
  },
  {
    title: "Get retrieval right first",
    description:
      "Tune ranking with PostgreSQL and pgvector before touching prompts. If the right context isn't retrieved, no model can fix it.",
  },
  {
    title: "Orchestrate with agents",
    description:
      "Model multi-step work as LangGraph graphs with explicit tools and state, and move long-running tasks to Celery and Redis.",
  },
  {
    title: "Stream the experience",
    description:
      "Stream tokens, tool calls and sources to a Next.js interface over the AG-UI protocol so users see progress, not spinners.",
  },
  {
    title: "Ship, observe, iterate",
    description:
      "Typed contracts, automated tests and CI on every change, then real usage feeds the next round of retrieval and prompt tuning.",
  },
];
