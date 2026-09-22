"use client";

import { motion } from "motion/react";

const DIGITS = ["4", "0", "4"];

export function NotFoundGlyph() {
  return (
    <div aria-hidden="true" className="relative flex items-center gap-2 select-none">
      {DIGITS.map((digit, index) => (
        <motion.span
          key={index}
          className="text-gradient text-[7rem] leading-none font-bold tracking-tighter sm:text-[10rem]"
          initial={{ opacity: 0, y: 40, rotate: index === 1 ? -20 : 0 }}
          animate={{ opacity: 1, y: [0, -12, 0], rotate: index === 1 ? [-8, 8, -8] : 0 }}
          transition={{
            opacity: { duration: 0.5, delay: index * 0.12 },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {digit}
        </motion.span>
      ))}
      <div className="bg-primary/30 absolute inset-x-0 -bottom-6 mx-auto h-6 w-2/3 rounded-full blur-2xl" />
    </div>
  );
}
