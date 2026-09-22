"use client";

import { motion, useInView } from "motion/react";
import { useId, useMemo, useRef } from "react";
import type { ArchitectureEdge, ArchitectureNode } from "@/types/api";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  NODE_HEIGHT,
  NODE_WIDTH,
  buildDiagramGeometry,
} from "@/features/projects/architecture-geometry";

interface ArchitectureDiagramProps {
  title: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

function describe(nodes: ArchitectureNode[], edges: ArchitectureEdge[]): string {
  const labels = new Map(nodes.map((node) => [node.id, node.label]));
  return edges
    .map(
      (edge) =>
        `${labels.get(edge.source) ?? edge.source} ${edge.label ?? "connects to"} ${labels.get(edge.target) ?? edge.target}`
    )
    .join(", ");
}

export function ArchitectureDiagram({ title, nodes, edges }: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const idPrefix = useId().replace(/:/g, "");
  const geometry = useMemo(() => buildDiagramGeometry(nodes, edges), [nodes, edges]);

  return (
    <div ref={containerRef} className="glass-card overflow-x-auto rounded-3xl p-4 sm:p-8">
      <svg
        role="img"
        aria-label={`${title} architecture diagram: ${describe(nodes, edges)}`}
        viewBox={geometry.viewBox}
        className="mx-auto h-auto w-full max-w-5xl min-w-[640px]"
      >
        <defs>
          <linearGradient id={`${idPrefix}-edge`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        {geometry.edges.map((edge, index) => (
          <g key={edge.id}>
            <path
              id={`${idPrefix}-${edge.id}`}
              d={edge.path}
              fill="none"
              stroke="var(--border)"
              strokeWidth={2}
            />
            <motion.path
              d={edge.path}
              fill="none"
              stroke={`url(#${idPrefix}-edge)`}
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ duration: 1.1, delay: 0.3 + index * 0.15, ease: "easeInOut" }}
            />
            {isInView && !prefersReducedMotion
              ? [0, 1].map((particle) => (
                  <circle key={particle} r={3.5} fill="var(--accent)">
                    <animateMotion
                      dur="2.4s"
                      begin={`${1.2 + index * 0.2 + particle * 1.2}s`}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#${idPrefix}-${edge.id}`} />
                    </animateMotion>
                  </circle>
                ))
              : null}
          </g>
        ))}

        {geometry.nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
          >
            <rect
              x={node.cx - NODE_WIDTH / 2}
              y={node.cy - NODE_HEIGHT / 2}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx={14}
              fill="var(--surface)"
              stroke="var(--primary)"
              strokeOpacity={0.5}
            />
            <text
              x={node.cx}
              y={node.cy + 5}
              textAnchor="middle"
              className="fill-foreground text-[14px] font-medium"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {geometry.edges.map((edge) =>
          edge.label ? (
            <text
              key={`${edge.id}-label`}
              x={edge.labelX}
              y={edge.labelY}
              textAnchor="middle"
              stroke="var(--surface)"
              strokeWidth={5}
              paintOrder="stroke"
              strokeLinejoin="round"
              className="fill-muted-foreground text-[12px]"
            >
              {edge.label}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}
