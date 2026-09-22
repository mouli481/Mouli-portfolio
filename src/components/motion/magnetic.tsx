"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PULL_STRENGTH = 0.3;

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 250, damping: 15, mass: 0.3 });
  const y = useSpring(offsetY, { stiffness: 250, damping: 15, mass: 0.3 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    offsetX.set((event.clientX - (bounds.left + bounds.width / 2)) * PULL_STRENGTH);
    offsetY.set((event.clientY - (bounds.top + bounds.height / 2)) * PULL_STRENGTH);
  };

  const handleLeave = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      className={className ?? "inline-block"}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
