"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

const MAX_TILT_DEGREES = 6;

export function SpotlightCard({ children, className, tilt = true }: SpotlightCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 200, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [MAX_TILT_DEGREES, -MAX_TILT_DEGREES]);
  const rotateY = useTransform(springX, [0, 1], [-MAX_TILT_DEGREES, MAX_TILT_DEGREES]);
  const spotlight = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${Number(x) * 100}% ${Number(y) * 100}%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)`
  );

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const enableTilt = tilt && !prefersReducedMotion;

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={enableTilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn("glass-card group relative overflow-hidden rounded-3xl", className)}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
