"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export function ScrollHighlight({ paragraphs }: { paragraphs: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const totalWords = paragraphs.reduce((count, text) => count + text.split(" ").length, 0);
  let wordOffset = 0;

  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      {paragraphs.map((paragraph) => {
        const words = paragraph.split(" ");
        const startIndex = wordOffset;
        wordOffset += words.length;
        return (
          <p
            key={paragraph}
            className="text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl"
          >
            {prefersReducedMotion
              ? paragraph
              : words.map((word, index) => {
                  const position = (startIndex + index) / totalWords;
                  return (
                    <Word
                      key={`${word}-${index}`}
                      word={word}
                      progress={scrollYProgress}
                      range={[position, Math.min(1, position + 1 / totalWords)]}
                    />
                  );
                })}
          </p>
        );
      })}
    </div>
  );
}
