import type { Skill } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { SKILL_CATEGORY_COLORS, SKILL_CATEGORY_LABELS } from "@/features/skills/categories";

interface SkillDetailPanelProps {
  skill: Skill | null;
  skills: Skill[];
}

export function SkillDetailPanel({ skill, skills }: SkillDetailPanelProps) {
  if (!skill) {
    return (
      <aside
        className="glass-card flex flex-col justify-center gap-3 rounded-3xl p-6"
        aria-live="polite"
      >
        <p className="text-lg font-semibold">Explore the constellation</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Hover or tab to any skill to light up the tools I use alongside it. Node size reflects how
          deeply I work with each one.
        </p>
      </aside>
    );
  }

  const related = skills.filter((candidate) => skill.related_skill_ids.includes(candidate.id));

  return (
    <aside className="glass-card flex flex-col gap-4 rounded-3xl p-6" aria-live="polite">
      <span
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: SKILL_CATEGORY_COLORS[skill.category] }}
      >
        {SKILL_CATEGORY_LABELS[skill.category]}
      </span>
      <p className="text-3xl font-semibold tracking-tight">{skill.name}</p>
      <div>
        <div className="text-muted-foreground flex justify-between text-sm">
          <span>Proficiency</span>
          <span className="text-foreground font-medium">{skill.proficiency}%</span>
        </div>
        <div className="bg-foreground/10 mt-2 h-2 overflow-hidden rounded-full">
          <div
            className="from-primary to-accent h-full origin-left rounded-full bg-gradient-to-r"
            style={{ transform: `scaleX(${skill.proficiency / 100})` }}
          />
        </div>
      </div>
      {related.length > 0 ? (
        <div>
          <p className="text-muted-foreground text-sm">Often paired with</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {related.map((item) => (
              <li key={item.id}>
                <Badge className="text-foreground">{item.name}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
