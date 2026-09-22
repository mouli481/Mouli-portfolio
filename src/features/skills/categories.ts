import type { SkillCategory } from "@/types/project";

export const SKILL_CATEGORY_ORDER: SkillCategory[] = [
  "ai-ml",
  "backend",
  "languages",
  "data",
  "frontend",
  "cloud-devops",
  "testing",
];

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  "ai-ml": "AI & LLMs",
  backend: "Backend",
  languages: "Languages",
  data: "Data",
  frontend: "Frontend",
  "cloud-devops": "Cloud & DevOps",
  testing: "Testing",
};

export const SKILL_CATEGORY_COLORS: Record<SkillCategory, string> = {
  "ai-ml": "#3b82f6",
  backend: "#22d3ee",
  languages: "#a78bfa",
  data: "#34d399",
  frontend: "#f59e0b",
  "cloud-devops": "#f472b6",
  testing: "#94a3b8",
};
