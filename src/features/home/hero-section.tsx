import { ArrowRight, MessageSquare } from "lucide-react";
import type { Profile } from "@/types/api";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { HeroBackdrop } from "@/features/home/hero-scene/hero-backdrop";
import { HeroPortrait } from "@/features/home/hero-portrait";
import { RoleRotator } from "@/features/home/role-rotator";

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section aria-label="Introduction" className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-16 py-16 lg:grid-cols-[1.25fr_1fr] lg:py-20">
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <span className="glass-card text-muted-foreground inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
              </span>
              {profile.currently}
            </span>
          </Reveal>

          <h1 className="text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl">
            <SplitText text={`Hi, I'm ${profile.name.split(" ")[0] ?? profile.name}.`} />
            <span className="text-gradient mt-2 block pb-2">I build AI that ships.</span>
          </h1>

          <Reveal delay={0.5}>
            <p className="text-muted-foreground text-xl sm:text-2xl">
              <RoleRotator roles={profile.roles} />
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-muted-foreground max-w-xl text-lg text-pretty">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.7} className="flex flex-wrap gap-4">
            <Magnetic>
              <ButtonLink href="/projects" size="lg">
                Explore my work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/ai-lab" variant="outline" size="lg">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Ask my AI assistant
              </ButtonLink>
            </Magnetic>
          </Reveal>
        </div>

        <ParallaxLayer speed={0.12}>
          <Reveal delay={0.3}>
            <HeroPortrait />
          </Reveal>
        </ParallaxLayer>
      </Container>
    </section>
  );
}
