"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NeuralNetwork } from "@/features/home/hero-scene/neural-network";

export function NeuralField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      {
        threshold: 0,
      }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_8%,black_60%)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <NeuralNetwork />
      </Canvas>
    </motion.div>
  );
}
