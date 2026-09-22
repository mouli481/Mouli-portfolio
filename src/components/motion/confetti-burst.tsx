"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const COLORS = ["var(--primary)", "var(--accent)", "#22c55e", "#f472b6", "#a78bfa"];
const PIECE_COUNT = 48;

interface Piece {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  delay: number;
  size: number;
}

function createPieces(): Piece[] {
  return Array.from({ length: PIECE_COUNT }, (_, id) => {
    const angle = (id / PIECE_COUNT) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 120 + Math.random() * 180;
    return {
      id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 60,
      rotate: Math.random() * 720 - 360,
      color: COLORS[id % COLORS.length] ?? "var(--primary)",
      delay: Math.random() * 0.15,
      size: 6 + Math.random() * 6,
    };
  });
}

export function ConfettiBurst() {
  const prefersReducedMotion = useReducedMotion();
  const pieces = useMemo(createPieces, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute rounded-[2px]"
          style={{ width: piece.size, height: piece.size * 0.45, backgroundColor: piece.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: piece.x, y: piece.y + 140, opacity: 0, rotate: piece.rotate, scale: 1 }}
          transition={{ duration: 1.6, delay: piece.delay, ease: [0.2, 0.8, 0.4, 1] }}
        />
      ))}
    </div>
  );
}
