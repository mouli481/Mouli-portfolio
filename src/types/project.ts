import type { ProjectSummary, Skill } from "@/types/api";

export type ProjectCategory = ProjectSummary["category"];

export type ProjectCategoryFilter = ProjectCategory | "all";

export type SkillCategory = Skill["category"];
