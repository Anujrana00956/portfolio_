"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, PenTool, Code2, Rocket } from "lucide-react";
import { easeOut } from "@/lib/motion";

const steps = [
  {
    n: "01",
    title: "Discover",
    copy: "Clarify goals, users, and constraints before a single screen ships.",
    icon: Lightbulb,
    accent: "from-amber-400 to-orange-500",
  },
  {
    n: "02",
    title: "Design",
    copy: "Map flows and UI that feel native on phone and desktop.",
    icon: PenTool,
    accent: "from-fuchsia-400 to-violet-500",
  },
  {
    n: "03",
    title: "Build",
    copy: "Flutter & React with clean architecture, APIs, and tests that stick.",
    icon: Code2,
    accent: "from-cyan-400 to-blue-500",
  },
  {
    n: "04",
    title: "Ship",
    copy: "Store releases, monitoring, and polish that survives real users.",
    icon: Rocket,
    accent: "from-emerald-400 to-teal-500",
  },
];

/** Modern process strip — bidirectional reveal */
export default function WorkProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.25, once: false });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <div className="absolute top-1/3 left-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-300/80 mb-3"
            data-animate="apple-rise"
          >
            How I work
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white"
            data-animate="apple-scale"
          >
            From idea to store
            <span className="block text-slate-400">in four clear steps</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" data-animate="stagger">
          {steps.map((step, i) => (
            <motion.article
              key={step.n}
              initial={false}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 40, filter: "blur(8px)" }
              }
              transition={{
                delay: inView ? i * 0.1 : 0,
                duration: 0.9,
                ease: easeOut,
              }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 overflow-hidden"
              data-animate-child
            >
              <div
                className={`absolute -top-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br ${step.accent} opacity-0 blur-2xl group-hover:opacity-35 transition-opacity duration-500`}
              />
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono text-slate-500">{step.n}</span>
                <span
                  className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${step.accent} shadow-lg`}
                >
                  <step.icon className="h-4 w-4 text-white" />
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
