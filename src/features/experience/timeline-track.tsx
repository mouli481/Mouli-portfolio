"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

export function TimelineTrack({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={containerRef} className="relative">
      <svg
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[15px] h-[calc(100%-1rem)] w-[3px] md:left-[211px]"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="100"
          stroke="var(--border)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 1 0 L 1 100"
          stroke="url(#timeline-gradient)"
          strokeWidth="3"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
      {children}
    </div>
  );
}
