"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Gauge, Layers, ShieldCheck } from "lucide-react";
import { easeAppleOut } from "@/lib/motion";

const pillars = [
  {
    icon: Smartphone,
    title: "Cross-platform apps",
    copy: "One codebase for iOS & Android with Flutter — native feel, faster shipping.",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    icon: Layers,
    title: "Modern web UIs",
    copy: "React & Next.js interfaces that stay fast, accessible, and easy to maintain.",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    icon: Gauge,
    title: "Performance first",
    copy: "Lean architecture, smooth motion, and measurable load-time wins.",
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Production ready",
    copy: "Store releases, Firebase backends, and CI-friendly delivery pipelines.",
    accent: "from-emerald-400 to-teal-500",
  },
];

/** PCDC-style value pillars with scrub reveal */
export default function ImpactStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mb-12 md:mb-16"
          initial={false}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 28, filter: "blur(8px)" }
          }
          transition={{ duration: 0.95, ease: easeAppleOut }}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-300/80 mb-3"
            data-animate="apple-rise"
          >
            How I help
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-4"
            data-animate="apple-scale"
          >
            Fueling product growth
            <span className="block text-slate-400">with craft & clarity</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            From idea to App Store — polished Flutter and React experiences built
            for real users and real deadlines.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={false}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 28, filter: "blur(6px)" }
              }
              transition={{
                delay: inView ? 0.08 + i * 0.1 : 0,
                duration: 0.85,
                ease: easeAppleOut,
              }}
              whileHover={{ y: -6, transition: { duration: 0.45 } }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 overflow-hidden"
            >
              <div
                className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${p.accent} opacity-0 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
              />
              <div
                className={`mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br ${p.accent} shadow-lg`}
              >
                <p.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
