"use client";

import { motion } from "framer-motion";

const projects = [
  "DAHN",
  "Amity Staffing",
  "AirmyMd",
  "AMM Pass Scanner",
  "CM Di Yogshala",
  "TruGroser",
  "VentSpace",
];

/** PCDC-style infinite project strip */
export default function ProjectStrip() {
  const row = [...projects, ...projects, ...projects];

  return (
    <section className="relative py-10 bg-slate-950 overflow-hidden border-y border-white/5">
      <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-slate-500 mb-6">
        Selected work
      </p>
      <motion.div
        className="flex w-max gap-8 md:gap-14 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500 opacity-80 hover:opacity-100 transition-opacity"
          >
            {name}
            <span className="mx-6 md:mx-10 text-cyan-400/40">—</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
