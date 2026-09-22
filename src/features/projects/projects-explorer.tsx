"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { ProjectSummary } from "@/types/api";
import type { ProjectCategoryFilter } from "@/types/project";
import { fetchProjects } from "@/lib/api/client";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryFilter } from "@/features/projects/category-filter";
import { ProjectCard } from "@/features/projects/project-card";
import { cn } from "@/lib/utils";

function countByCategory(projects: ProjectSummary[]): Record<ProjectCategoryFilter, number> {
  const counts: Record<ProjectCategoryFilter, number> = {
    all: projects.length,
    genai: 0,
    "full-stack": 0,
    frontend: 0,
    cloud: 0,
  };
  for (const project of projects) {
    counts[project.category] += 1;
  }
  return counts;
}

export function ProjectsExplorer({ initialProjects }: { initialProjects: ProjectSummary[] }) {
  const [category, setCategory] = useState<ProjectCategoryFilter>("all");
  const counts = useMemo(() => countByCategory(initialProjects), [initialProjects]);

  const {
    data: projects = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["projects", category],
    queryFn: () => fetchProjects(category),
    initialData: category === "all" ? initialProjects : undefined,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CategoryFilter value={category} counts={counts} onChange={setCategory} />
        <p className="text-muted-foreground text-sm" aria-live="polite">
          {isFetching
            ? "Loading projects…"
            : `Showing ${projects.length} of ${counts.all} projects`}
        </p>
      </div>

      {isError ? (
        <p className="text-danger">Projects could not be loaded. Please try again.</p>
      ) : null}

      {projects.length === 0 && isFetching ? (
        <div className="grid gap-5 md:grid-cols-2">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      ) : (
        <LayoutGroup>
          <motion.ul layout className="grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {projects.map((project, index) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(index === 0 && projects.length > 2 && "md:col-span-2")}
                >
                  <ProjectCard
                    project={project}
                    size={index === 0 && projects.length > 2 ? "large" : "default"}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      )}
    </div>
  );
}
