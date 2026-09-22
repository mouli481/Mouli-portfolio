import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/api/server";
import { CaseStudyHero } from "@/features/projects/case-study-hero";
import { CaseStudyBody } from "@/features/projects/case-study-body";
import { ProjectPager } from "@/features/projects/project-pager";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) {
    notFound();
  }

  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyBody project={project} />
      <ProjectPager projects={projects} currentSlug={project.slug} />
    </>
  );
}
