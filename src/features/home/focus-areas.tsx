import type { FocusArea } from "@/types/api";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export function FocusAreas({ areas }: { areas: FocusArea[] }) {
  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow="What I do"
        title={
          <>
            End to end, from <span className="text-gradient">retrieval</span> to the pixel
          </>
        }
        description="I work across the whole stack of an AI product, so the pieces actually fit together."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, index) => (
          <Reveal as="li" key={area.title} delay={index * 0.06}>
            <SpotlightCard className="h-full p-7">
              <span className="bg-primary/10 text-primary ring-primary/20 flex h-12 w-12 items-center justify-center rounded-2xl ring-1">
                <Icon name={area.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{area.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {area.description}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>
    </Container>
  );
}
