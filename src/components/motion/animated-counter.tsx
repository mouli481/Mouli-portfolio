"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }
    if (prefersReducedMotion) {
      setCurrent(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setCurrent,
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {current.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
