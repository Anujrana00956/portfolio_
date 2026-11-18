"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { easeOut } from "@/lib/motion";

const facts = [
  {
    value: 15,
    suffix: "+",
    label: "Production apps shipped across mobile & web",
  },
  {
    value: 2,
    suffix: "+",
    label: "Years building Flutter & React products",
  },
  {
    value: 100,
    suffix: "%",
    label: "Focus on store-ready quality and clean architecture",
  },
];

function CountUp({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 70, damping: 18 });
  const display = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (active) motionVal.set(value);
    else motionVal.set(0);
  }, [active, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (display.current) {
        display.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
    return () => unsub();
  }, [spring, suffix]);

  return <span ref={display}>0{suffix}</span>;
}

/** PCDC-style “Shape of Our Growth” insight section */
export default function GrowthInsight() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [48, -36]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 py-20 md:py-28 text-white"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-60"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(139,92,246,0.16),transparent_40%)]" />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <motion.p
              className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase text-cyan-300/80 mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              Developer intelligence
            </motion.p>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight leading-[1.1] mb-5 bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
            >
              The Shape of My Growth
            </motion.h2>

            <motion.p
              className="text-slate-200 text-base md:text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            >
              From hands-on Flutter training to leading a mobile team at Nessfi —
              building products people trust, with performance, polish, and
              clear delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.55, delay: 0.26, ease: easeOut }}
            >
              <a
                href="#contact"
                data-magnetic="24"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 py-3.5 text-sm md:text-base font-semibold text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-[filter]"
              >
                Get Started
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div style={{ y: cardY }} className="relative">
            <motion.div
              className="relative rounded-[1.75rem] md:rounded-[2rem] bg-slate-900/90 backdrop-blur-xl text-white p-6 sm:p-8 shadow-[0_30px_80px_rgba(6,182,212,0.12)] border border-cyan-400/20 overflow-hidden"
              initial={{ opacity: 0, x: 48, rotateY: -8 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 40, rotateY: -8 }}
              transition={{ duration: 0.75, delay: 0.18, ease: easeOut }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-semibold mb-6 relative z-10">
                Did you know this?
              </h3>

              <div className="space-y-3 relative z-10">
                {facts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                    transition={{
                      delay: 0.35 + i * 0.12,
                      duration: 0.5,
                      ease: easeOut,
                    }}
                    whileHover={{
                      y: -2,
                      backgroundColor: "rgba(255,255,255,0.06)",
                    }}
                    className="flex items-start gap-4 rounded-2xl bg-white/[0.03] border border-white/8 px-4 py-4 transition-colors"
                  >
                    <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        <CountUp
                          value={fact.value}
                          suffix={fact.suffix}
                          active={inView}
                        />
                      </p>
                      <p className="text-sm text-slate-400 mt-1 leading-snug">
                        {fact.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
