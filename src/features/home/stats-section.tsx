import type { Stats } from "@/types/api";
import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";

interface StatItem {
  label: string;
  value: number;
  decimals: number;
  suffix: string;
}

function toStatItems(stats: Stats): StatItem[] {
  return [
    { label: "Years of experience", value: stats.years_experience, decimals: 1, suffix: "+" },
    { label: "AI agents migrated", value: stats.agents_migrated, decimals: 0, suffix: "+" },
    { label: "Projects featured", value: stats.projects_shipped, decimals: 0, suffix: "" },
    { label: "Technologies in use", value: stats.technologies_used, decimals: 0, suffix: "+" },
  ];
}

export function StatsSection({ stats }: { stats: Stats }) {
  return (
    <Container className="py-12">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {toStatItems(stats).map((item, index) => (
          <Reveal
            key={item.label}
            delay={index * 0.08}
            className="glass-card rounded-3xl p-6 sm:p-8"
          >
            <dt className="text-muted-foreground text-sm">{item.label}</dt>
            <dd className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              <AnimatedCounter value={item.value} decimals={item.decimals} suffix={item.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Container>
  );
}
