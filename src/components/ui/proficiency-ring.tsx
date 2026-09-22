"use client";

import { motion } from "motion/react";

interface ProficiencyRingProps {
  value: number;
  color: string;
  size?: number;
}

const STROKE_WIDTH = 4;

export function ProficiencyRing({ value, color, size = 44 }: ProficiencyRingProps) {
  const radius = (size - STROKE_WIDTH) / 2;
  const center = size / 2;

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={STROKE_WIDTH}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="absolute text-[10px] font-semibold tabular-nums">{value}</span>
    </span>
  );
}
