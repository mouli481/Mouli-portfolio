import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getProfile, getSkills } from "@/lib/api/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SkillConstellation } from "@/features/skills/skill-constellation";
import { SkillGroups } from "@/features/skills/skill-groups";
import { CtaSection } from "@/features/home/cta-section";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description:
    "Mouli V's technical toolkit: Python, FastAPI, LangChain, LangGraph, RAG, Next.js, TypeScript, PostgreSQL, pgvector and multi-cloud infrastructure.",
  path: "/skills",
});

export default async function SkillsPage() {
  const [skills, profile] = await Promise.all([getSkills(), getProfile()]);

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="A connected toolkit"
        description={`${skills.length} technologies across AI, backend, frontend, data and cloud. They are rarely used alone, so explore how they connect.`}
      />
      <Container>
        <SkillConstellation skills={skills} />
      </Container>
      <SkillGroups skills={skills} />
      <CtaSection email={profile.email} />
    </>
  );
}
