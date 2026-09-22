import type { CoreValue } from "@/types/api";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export function ValuesGrid({ values }: { values: CoreValue[] }) {
  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow="How I work"
        title="Principles I bring to every codebase"
        description="The habits that shape how I design systems and how I collaborate with teams."
      />
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {values.map((value, index) => (
          <Reveal as="li" key={value.title} delay={index * 0.08}>
            <SpotlightCard className="flex h-full gap-5 p-7">
              <span className="from-primary/20 to-accent/20 text-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br">
                <Icon name={value.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>
    </Container>
  );
}
