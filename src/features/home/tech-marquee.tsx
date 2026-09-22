import type { Skill } from "@/types/api";
import { Marquee } from "@/components/motion/marquee";

function SkillChip({ name }: { name: string }) {
  return (
    <span className="glass-card text-foreground/90 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
      <span className="from-primary to-accent h-1.5 w-1.5 rounded-full bg-gradient-to-r" />
      {name}
    </span>
  );
}

export function TechMarquee({ skills }: { skills: Skill[] }) {
  const midpoint = Math.ceil(skills.length / 2);
  const firstRow = skills.slice(0, midpoint);
  const secondRow = skills.slice(midpoint);

  return (
    <section aria-label="Technologies I work with" className="flex flex-col gap-4 py-16">
      <Marquee
        label="Technologies, first row"
        items={firstRow.map((skill) => (
          <SkillChip key={skill.id} name={skill.name} />
        ))}
      />
      <Marquee
        label="Technologies, second row"
        reverse
        items={secondRow.map((skill) => (
          <SkillChip key={skill.id} name={skill.name} />
        ))}
      />
    </section>
  );
}
