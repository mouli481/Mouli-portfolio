"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const variants = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.99, y: 8 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transitionEnd: { filter: "none", transform: "none" },
  },
};

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
