"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Skill } from "@/types/api";
import { buildConstellationLayout, relatedSkillIds } from "@/features/skills/constellation-layout";
import { SKILL_CATEGORY_COLORS, SKILL_CATEGORY_LABELS } from "@/features/skills/categories";
import { SkillDetailPanel } from "@/features/skills/skill-detail-panel";

export function SkillConstellation({ skills }: { skills: Skill[] }) {
  const layout = useMemo(() => buildConstellationLayout(skills), [skills]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const highlighted = useMemo(
    () => (activeId ? relatedSkillIds(activeId, layout.links) : null),
    [activeId, layout.links]
  );
  const activeSkill = skills.find((skill) => skill.id === activeId) ?? null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="glass-card overflow-hidden rounded-3xl">
        <svg
          viewBox={layout.viewBox}
          className="h-auto w-full"
          role="group"
          aria-label="Skill constellation. Focus a skill to see related skills."
        >
          {layout.links.map((link) => {
            const isActive =
              highlighted?.has(link.source.skill.id) && highlighted.has(link.target.skill.id);
            return (
              <line
                key={link.id}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                stroke={isActive ? "var(--primary)" : "var(--border)"}
                strokeWidth={isActive ? 2 : 1}
                opacity={highlighted && !isActive ? 0.15 : 1}
                className="transition-[stroke,opacity] duration-300"
              />
            );
          })}

          {layout.clusters.map((cluster) => (
            <text
              key={cluster.category}
              x={cluster.x}
              y={cluster.y + 4}
              textAnchor="middle"
              className="text-[13px] font-semibold tracking-wider uppercase"
              fill={SKILL_CATEGORY_COLORS[cluster.category]}
              opacity={highlighted ? 0.35 : 0.9}
            >
              {SKILL_CATEGORY_LABELS[cluster.category]}
            </text>
          ))}

          {layout.nodes.map((node, index) => {
            const color = SKILL_CATEGORY_COLORS[node.skill.category];
            const isDimmed = highlighted !== null && !highlighted.has(node.skill.id);
            const radius = 5 + node.skill.proficiency / 20;
            return (
              <motion.g
                key={node.skill.id}
                tabIndex={0}
                role="button"
                aria-label={`${node.skill.name}, ${node.skill.proficiency}% proficiency`}
                aria-pressed={activeId === node.skill.id}
                onMouseEnter={() => setActiveId(node.skill.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(node.skill.id)}
                onBlur={() => setActiveId(null)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isDimmed ? 0.25 : 1, scale: 1 }}
                transition={{ duration: 0.4, delay: highlighted ? 0 : index * 0.02 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-[var(--ring)]"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius + 6}
                  fill={color}
                  opacity={0.15}
                  stroke="transparent"
                  strokeWidth={2}
                />
                <circle cx={node.x} cy={node.y} r={radius} fill={color} />
                <text
                  x={node.x}
                  y={node.y + radius + 16}
                  textAnchor="middle"
                  className="fill-foreground pointer-events-none text-[13px] font-medium"
                >
                  {node.skill.name}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <SkillDetailPanel skill={activeSkill} skills={skills} />
    </div>
  );
}
