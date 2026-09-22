"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  color: "primary" | "accent";
}

const PARTICLE_COUNT = 70;

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    angle: Math.random() * Math.PI * 2,
    distance: 140 + Math.random() * 260,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.5,
    color: Math.random() < 0.75 ? "primary" : "accent",
  }));
}

export function IntroParticles({ phase }: { phase: "converge" | "burst" }) {
  const particles = useMemo(createParticles, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {particles.map((particle) => {
        const x = Math.cos(particle.angle) * particle.distance;
        const y = Math.sin(particle.angle) * particle.distance;
        return (
          <motion.span
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color === "primary" ? "var(--primary)" : "var(--accent)",
            }}
            initial={{ x, y, opacity: 0 }}
            animate={
              phase === "converge"
                ? { x: 0, y: 0, opacity: [0, 1, 0.6] }
                : { x, y: y - 40, opacity: 0 }
            }
            transition={{
              duration: phase === "converge" ? 1.1 : 0.8,
              delay: phase === "converge" ? particle.delay : particle.delay * 0.3,
              ease: phase === "converge" ? [0.22, 1, 0.36, 1] : "easeIn",
            }}
          />
        );
      })}
    </div>
  );
}
