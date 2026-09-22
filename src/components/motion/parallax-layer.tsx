"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed: number;
  className?: string;
}

export function ParallaxLayer({ children, speed, className }: ParallaxLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * speed));

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
