import { describe, expect, it } from "vitest";
import type { Skill } from "@/types/api";
import { buildConstellationLayout, relatedSkillIds } from "./constellation-layout";

const skills: Skill[] = [
  {
    id: "python",
    name: "Python",
    category: "languages",
    proficiency: 95,
    related_skill_ids: ["fastapi"],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    proficiency: 93,
    related_skill_ids: ["python", "ghost"],
  },
  { id: "react", name: "React", category: "frontend", proficiency: 90, related_skill_ids: [] },
];

describe("buildConstellationLayout", () => {
  it("positions every skill and one cluster per category", () => {
    const layout = buildConstellationLayout(skills);

    expect(layout.nodes).toHaveLength(3);
    expect(layout.clusters).toHaveLength(3);
  });

  it("deduplicates symmetric links and ignores unknown skills", () => {
    const layout = buildConstellationLayout(skills);

    expect(layout.links).toHaveLength(1);
    expect(layout.links[0]?.id).toBe("fastapi::python");
  });
});

describe("relatedSkillIds", () => {
  it("includes the skill itself and its direct neighbours", () => {
    const layout = buildConstellationLayout(skills);

    expect([...relatedSkillIds("python", layout.links)].sort()).toEqual(["fastapi", "python"]);
    expect([...relatedSkillIds("react", layout.links)]).toEqual(["react"]);
  });
});
