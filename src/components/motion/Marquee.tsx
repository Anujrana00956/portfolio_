"use client";

import { motion } from "framer-motion";

const items = [
  "Flutter",
  "React",
  "Dart",
  "TypeScript",
  "Firebase",
  "Next.js",
  "UI/UX",
  "Mobile Apps",
  "REST APIs",
  "App Store",
  "Play Store",
];

export default function Marquee() {
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-slate-950/80 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-slate-400"
          >
            {item}
            <span className="ml-10 text-cyan-400/70">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
