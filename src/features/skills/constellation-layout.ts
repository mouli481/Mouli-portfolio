import type { Skill } from "@/types/api";
import type { SkillCategory } from "@/types/project";
import { SKILL_CATEGORY_ORDER } from "@/features/skills/categories";

export const CONSTELLATION_WIDTH = 960;
export const CONSTELLATION_HEIGHT = 640;

export interface PositionedSkill {
  skill: Skill;
  x: number;
  y: number;
}

export interface ClusterLabel {
  category: SkillCategory;
  x: number;
  y: number;
}

export interface ConstellationLink {
  id: string;
  source: PositionedSkill;
  target: PositionedSkill;
}

export interface ConstellationLayout {
  nodes: PositionedSkill[];
  links: ConstellationLink[];
  clusters: ClusterLabel[];
  viewBox: string;
}

const CENTER_X = CONSTELLATION_WIDTH / 2;
const CENTER_Y = CONSTELLATION_HEIGHT / 2;
const ORBIT_X = 330;
const ORBIT_Y = 235;
const VIEW_PADDING = 48;

export function buildConstellationLayout(skills: Skill[]): ConstellationLayout {
  const categories = SKILL_CATEGORY_ORDER.filter((category) =>
    skills.some((skill) => skill.category === category)
  );
  const nodes: PositionedSkill[] = [];
  const clusters: ClusterLabel[] = [];

  categories.forEach((category, categoryIndex) => {
    const angle = (categoryIndex / categories.length) * Math.PI * 2 - Math.PI / 2;
    const clusterX = CENTER_X + Math.cos(angle) * ORBIT_X;
    const clusterY = CENTER_Y + Math.sin(angle) * ORBIT_Y;
    const members = skills.filter((skill) => skill.category === category);
    const radius = 46 + members.length * 8;
    clusters.push({ category, x: clusterX, y: clusterY });

    members.forEach((skill, memberIndex) => {
      const memberAngle = (memberIndex / members.length) * Math.PI * 2 + angle;
      nodes.push({
        skill,
        x: clusterX + Math.cos(memberAngle) * radius,
        y: clusterY + Math.sin(memberAngle) * radius,
      });
    });
  });

  const byId = new Map(nodes.map((node) => [node.skill.id, node]));
  const seen = new Set<string>();
  const links: ConstellationLink[] = [];
  for (const node of nodes) {
    for (const relatedId of node.skill.related_skill_ids) {
      const target = byId.get(relatedId);
      const key = [node.skill.id, relatedId].sort().join("::");
      if (target && !seen.has(key)) {
        seen.add(key);
        links.push({ id: key, source: node, target });
      }
    }
  }

  return { nodes, links, clusters, viewBox: fitViewBox(nodes) };
}

function fitViewBox(nodes: PositionedSkill[]): string {
  if (nodes.length === 0) {
    return `0 0 ${CONSTELLATION_WIDTH} ${CONSTELLATION_HEIGHT}`;
  }
  const xs = nodes.map((node) => node.x);
  const ys = nodes.map((node) => node.y);
  const minX = Math.min(...xs) - VIEW_PADDING * 1.5;
  const minY = Math.min(...ys) - VIEW_PADDING;
  const width = Math.max(...xs) - minX + VIEW_PADDING * 1.5;
  const height = Math.max(...ys) - minY + VIEW_PADDING;
  return `${minX} ${minY} ${width} ${height}`;
}

export function relatedSkillIds(skillId: string, links: ConstellationLink[]): Set<string> {
  const related = new Set<string>([skillId]);
  for (const link of links) {
    if (link.source.skill.id === skillId) related.add(link.target.skill.id);
    if (link.target.skill.id === skillId) related.add(link.source.skill.id);
  }
  return related;
}
