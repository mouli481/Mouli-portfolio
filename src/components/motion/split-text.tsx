"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className, delay = 0, stagger = 0.035 }: SplitTextProps) {
  const words = text.split(" ");
  let characterIndex = 0;

  return (
    <span className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {word.split("").map((character) => {
              const index = characterIndex;
              characterIndex += 1;
              return (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.6em", rotateX: -60 }}
                  animate={{ opacity: 1, y: "0em", rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: delay + index * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {character}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        ))}
      </span>
    </span>
  );
}
