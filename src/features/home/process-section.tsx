"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { PROCESS_STEPS } from "@/features/home/process-steps";

gsap.registerPlugin(ScrollTrigger);

const PINNED_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }
    const media = gsap.matchMedia();
    media.add(PINNED_QUERY, () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]", section);
      const progress = section.querySelector<HTMLElement>("[data-process-progress]");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=64",
          end: `+=${steps.length * 55}%`,
          pin: true,
          scrub: 0.6,
        },
      });
      gsap.set(steps.slice(1), { autoAlpha: 0.18, y: 28 });
      if (progress) {
        timeline.fromTo(
          progress,
          { scaleY: 0.2 },
          { scaleY: 1, ease: "none", duration: steps.length },
          0
        );
      }
      steps.forEach((step, index) => {
        if (index > 0) {
          timeline.to(step, { autoAlpha: 1, y: 0, duration: 0.6 }, index - 0.4);
          timeline.to(steps[index - 1] ?? step, { autoAlpha: 0.45, duration: 0.6 }, index - 0.4);
        }
      });
    });
    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="py-16 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-0"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex gap-6">
          <div
            aria-hidden="true"
            className="bg-foreground/10 relative hidden w-1 overflow-hidden rounded-full lg:block"
          >
            <div
              data-process-progress
              className="from-primary to-accent absolute inset-0 origin-top bg-gradient-to-b"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow>How I build</Eyebrow>
            <h2
              id="process-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              From scattered knowledge to an AI people <span className="text-gradient">trust</span>
            </h2>
            <p className="text-muted-foreground text-lg text-pretty">
              The five-step approach behind K-Fabrik and the assistant on this site.
            </p>
          </div>
        </div>
        <ol className="flex flex-col gap-4">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              data-process-step
              className="glass-card flex gap-5 rounded-3xl p-6"
            >
              <span className="text-gradient text-3xl font-semibold tabular-nums">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
