"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import { easeOut } from "@/lib/motion";

function GlassSculpture() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto h-[320px] w-full max-w-[420px] sm:h-[400px] md:h-[460px] perspective-[1400px]"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-[8%] rounded-[40%] bg-violet-500/30 blur-3xl"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-[15%] rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Back glass slab */}
      <motion.div
        className="absolute left-[12%] top-[8%] h-[78%] w-[58%] rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/15 via-violet-400/10 to-cyan-400/5 backdrop-blur-xl shadow-[0_0_60px_rgba(139,92,246,0.35)]"
        style={{ transform: "translateZ(20px) rotateY(-18deg)" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,transparent_40%,transparent_60%,rgba(167,139,250,0.25)_100%)]" />
        <div className="absolute left-[18%] top-[12%] h-[70%] w-[10%] rounded-full bg-white/10 blur-[1px]" />
        <div className="absolute left-[38%] top-[18%] h-[55%] w-[8%] rounded-full bg-cyan-200/15" />
        <div className="absolute left-[58%] top-[22%] h-[48%] w-[8%] rounded-full bg-violet-200/15" />
      </motion.div>

      {/* Front glass slab */}
      <motion.div
        className="absolute right-[6%] top-[16%] h-[72%] w-[52%] rounded-[1.75rem] border border-white/25 bg-gradient-to-br from-white/20 via-fuchsia-400/10 to-transparent backdrop-blur-2xl shadow-[0_20px_80px_rgba(6,182,212,0.25)]"
        style={{ transform: "translateZ(60px) rotateY(12deg)" }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <div className="absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.45)_0%,transparent_35%,rgba(34,211,238,0.2)_100%)]" />
        {/* Circuit-like paths */}
        <svg className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] opacity-70" viewBox="0 0 120 200" fill="none">
          <path
            d="M20 20 C20 80, 100 60, 100 140"
            stroke="url(#g1)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M40 30 C40 90, 80 70, 80 160"
            stroke="url(#g2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="20" cy="20" r="4" fill="#a78bfa" />
          <circle cx="100" cy="140" r="5" fill="#22d3ee" />
          <circle cx="80" cy="160" r="4" fill="#f0abfc" />
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#c4b5fd" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#67e8f9" />
              <stop offset="1" stopColor="#e879f9" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating chip */}
      <motion.div
        className="absolute bottom-[12%] left-[8%] z-10 rounded-2xl border border-white/20 bg-black/50 px-4 py-3 backdrop-blur-md shadow-xl"
        style={{ transform: "translateZ(90px)" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">Stack</p>
        <p className="text-sm font-semibold text-white">Flutter · React</p>
      </motion.div>
    </motion.div>
  );
}

const blocks = [
  {
    eyebrow: "PRODUCT CRAFT",
    title: "Apps that feel native on every screen",
    copy: "From polished Flutter mobile releases to responsive React experiences — clean architecture, store-ready delivery, and motion that feels intentional.",
    cta: "Get Started",
    href: "#contact",
  },
  {
    eyebrow: "TEAM LEADERSHIP",
    title: "Shipping faster with a focused mobile squad",
    copy: "As Senior Mobile App Developer at Nessfi, I lead feature planning, mentor developers, and keep quality high from design handoff to App Store and Play Store.",
    cta: "View Journey",
    href: "#experience",
  },
];

function SpotlightBlock({
  block,
  reverse,
  index,
}: {
  block: (typeof blocks)[number];
  reverse?: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="space-y-6 md:space-y-7 max-w-xl">
        <motion.p
          className="text-xs md:text-sm font-semibold tracking-[0.28em] uppercase text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          {block.eyebrow}
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
        >
          {block.title}
        </motion.h2>

        <motion.p
          className="text-slate-300 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, delay: 0.18, ease: easeOut }}
        >
          {block.copy}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, delay: 0.28, ease: easeOut }}
        >
          <a
            href={block.href}
            data-magnetic="26"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b5a] via-[#ff5a4a] to-[#e84535] px-7 py-3.5 text-sm md:text-base font-semibold text-white shadow-[0_12px_40px_rgba(255,90,74,0.35)] hover:brightness-110 transition-[filter,transform]"
          >
            {block.cta}
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <motion.div
        style={{ y: visualY, scale: visualScale }}
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
        transition={{ duration: 0.85, delay: 0.15 + index * 0.05, ease: easeOut }}
      >
        <GlassSculpture />
      </motion.div>
    </div>
  );
}

/** PCDC-style dark split feature with glass visual + coral CTA */
export default function FeatureSpotlight() {
  return (
    <section className="relative overflow-hidden bg-black text-white py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[90px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 space-y-24 md:space-y-32">
        {blocks.map((block, i) => (
          <SpotlightBlock
            key={block.eyebrow}
            block={block}
            reverse={i % 2 === 1}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
