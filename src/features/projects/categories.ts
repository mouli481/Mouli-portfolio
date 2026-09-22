import type { ProjectCategory, ProjectCategoryFilter } from "@/types/project";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  genai: "GenAI",
  "full-stack": "Full Stack",
  frontend: "Frontend",
  cloud: "Cloud",
};

export const CATEGORY_FILTERS: { value: ProjectCategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "genai", label: CATEGORY_LABELS.genai },
  { value: "full-stack", label: CATEGORY_LABELS["full-stack"] },
  { value: "frontend", label: CATEGORY_LABELS.frontend },
  { value: "cloud", label: CATEGORY_LABELS.cloud },
];

export const CATEGORY_ACCENTS: Record<ProjectCategory, string> = {
  genai: "from-primary/30 via-primary/5 to-transparent",
  "full-stack": "from-accent/30 via-accent/5 to-transparent",
  frontend: "from-sky-400/25 via-sky-400/5 to-transparent",
  cloud: "from-emerald-400/25 via-emerald-400/5 to-transparent",
};
