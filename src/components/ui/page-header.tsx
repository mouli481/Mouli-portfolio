import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { PageHeaderAccent } from "@/components/ui/page-header-accent";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/motion/scramble-text";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <Container className="relative pt-20 pb-12 sm:pt-28 sm:pb-16">
      <PageHeaderAccent />
      <div className="relative flex max-w-3xl flex-col gap-5">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
          <ScrambleText text={title} />
        </h1>
        <Reveal delay={0.1}>
          <p className="text-muted-foreground text-lg text-pretty sm:text-xl">{description}</p>
        </Reveal>
        {children}
      </div>
    </Container>
  );
}
