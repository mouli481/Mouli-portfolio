import type { Metadata } from "next";
import { getProfile, getProjects } from "@/lib/api/server";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectsExplorer } from "@/features/projects/projects-explorer";
import { CtaSection } from "@/features/home/cta-section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Mouli V's work: enterprise RAG platforms, AI assistants, B2B frontends, micro frontends and cloud systems.",
};

export default async function ProjectsPage() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Work I'm proud of"
        description="Filter by area to explore case studies across Generative AI, full stack, frontend and cloud. Every project has an architecture walkthrough and an AI you can ask about it."
      />
      <Container className="pb-12">
        <ProjectsExplorer initialProjects={projects} />
      </Container>
      <CtaSection email={profile.email} />
    </>
  );
}
