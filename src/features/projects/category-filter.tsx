"use client";

import { motion } from "motion/react";
import type { ProjectCategoryFilter } from "@/types/project";
import { CATEGORY_FILTERS } from "@/features/projects/categories";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  value: ProjectCategoryFilter;
  counts: Record<ProjectCategoryFilter, number>;
  onChange: (value: ProjectCategoryFilter) => void;
}

export function CategoryFilter({ value, counts, onChange }: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="glass-card inline-flex flex-wrap gap-1 rounded-full p-1.5"
    >
      {CATEGORY_FILTERS.map((filter) => {
        const isActive = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter.value)}
            className={cn(
              "focus-ring relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="category-filter-pill"
                className="bg-primary absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className="relative">
              {filter.label}
              <span className="ml-1.5 opacity-70">{counts[filter.value]}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
