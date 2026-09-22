import type { Skill } from "@/types/api";
import { Container } from "@/components/ui/container";
import { ProficiencyRing } from "@/components/ui/proficiency-ring";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import {
  SKILL_CATEGORY_COLORS,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_ORDER,
} from "@/features/skills/categories";

export function SkillGroups({ skills }: { skills: Skill[] }) {
  const groups = SKILL_CATEGORY_ORDER.map((category) => ({
    category,
    skills: skills
      .filter((skill) => skill.category === category)
      .sort((first, second) => second.proficiency - first.proficiency),
  })).filter((group) => group.skills.length > 0);

  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow="By category"
        title="The full toolkit"
        description="Grouped by where they sit in the stack, ordered by how much I use them day to day."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.06}>
            <SpotlightCard tilt={false} className="h-full p-6">
              <h3 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: SKILL_CATEGORY_COLORS[group.category] }}
                />
                {SKILL_CATEGORY_LABELS[group.category]}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {group.skills.map((skill) => (
                  <li key={skill.id} className="flex items-center gap-3">
                    <ProficiencyRing
                      value={skill.proficiency}
                      color={SKILL_CATEGORY_COLORS[skill.category]}
                    />
                    <span className="font-medium">{skill.name}</span>
                    <span className="sr-only">{skill.proficiency}% proficiency</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
