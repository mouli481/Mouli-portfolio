import Image from "next/image";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import type { Profile } from "@/types/api";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function AboutIntro({ profile }: { profile: Profile }) {
  const education = profile.education[0];
  const facts = [
    { icon: MapPin, label: "Based in", value: profile.location },
    {
      icon: GraduationCap,
      label: "Studied",
      value: education ? `${education.degree}, ${education.field}` : "Computer Science",
    },
    { icon: Sparkles, label: "Right now", value: profile.currently },
  ];

  return (
    <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <Reveal className="glass-card relative overflow-hidden rounded-[2rem] p-2">
        <Image
          src="/images/mouli-portrait.webp"
          alt="Portrait of Mouli V"
          width={660}
          height={800}
          sizes="(min-width: 1024px) 480px, 90vw"
          className="h-auto w-full rounded-[1.6rem]"
        />
      </Reveal>
      <div className="flex flex-col gap-4">
        {facts.map((fact, index) => (
          <Reveal
            key={fact.label}
            delay={index * 0.1}
            className="glass-card flex gap-4 rounded-3xl p-6"
          >
            <span className="bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
              <fact.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-muted-foreground text-sm">{fact.label}</p>
              <p className="mt-1 text-lg font-medium">{fact.value}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
