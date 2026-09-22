import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";

export function CtaSection({ email }: { email: string }) {
  return (
    <Container className="py-24">
      <Reveal className="glass-card relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16">
        <div
          aria-hidden="true"
          className="bg-primary/30 absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="bg-accent/20 absolute -bottom-32 left-1/4 h-64 w-96 rounded-full blur-[100px]"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Have an AI product that needs to <span className="text-gradient">work for real</span>?
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            I&apos;m always happy to talk about RAG, agents, FastAPI or Next.js, whether it is a
            role, a project or just an interesting problem.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <ButtonLink href="/contact" size="lg">
                Start a conversation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href={`mailto:${email}`} variant="outline" size="lg">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {email}
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
