"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Smartphone,
  Monitor,
  Download,
} from "lucide-react";
import { profile } from "@/config";
import { easeSmooth } from "@/lib/motion";
import { scrollToId } from "@/components/motion/SmoothScroll";

const SLIDE_MS = 6500;

const slides = [
  {
    id: "01",
    headline: "Flutter & React products that feel effortless",
    subtitle:
      "Clean UI, solid architecture, and motion that guides — not distracts. Built for App Store and Play Store.",
    href: "#projects",
    cta: "View selected work",
    tag: "Product craft",
    phoneAccent: "from-cyan-400 to-blue-500",
    deskAccent: "from-violet-400 to-fuchsia-500",
    phoneLabel: "Mobile UI",
    desktopLabel: "Web dashboard",
  },
  {
    id: "02",
    headline: "Leading mobile delivery from idea to release",
    subtitle:
      "Senior Mobile App Developer at Nessfi — mentoring the team and shipping store-ready releases on schedule.",
    href: "#about",
    cta: "About Anuj",
    tag: "Team leadership",
    phoneAccent: "from-emerald-400 to-cyan-500",
    deskAccent: "from-sky-400 to-indigo-500",
    phoneLabel: "Team apps",
    desktopLabel: "Delivery board",
  },
  {
    id: "03",
    headline: "15+ apps across healthcare, govtech & commerce",
    subtitle:
      "From hospice documentation to statewide wellness platforms — products people actually use every day.",
    href: "#contact",
    cta: "Let's talk",
    tag: "Shipped impact",
    phoneAccent: "from-amber-400 to-orange-500",
    deskAccent: "from-rose-400 to-violet-500",
    phoneLabel: "Product screens",
    desktopLabel: "Analytics view",
  },
];

function useTilt3D(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 140,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 140,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return { ref, rx, ry, onMove, onLeave };
}

function PhoneScreen({ accent }: { accent: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${accent}`}>
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="relative h-full p-3 flex flex-col gap-2">
        <div className="mt-5 h-2 w-16 rounded-full bg-white/40 self-center" />
        <div className="mt-2 h-20 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-14 rounded-xl bg-white/12 border border-white/15" />
          <div className="h-14 rounded-xl bg-white/12 border border-white/15" />
        </div>
        <div className="flex-1 rounded-2xl bg-white/10 border border-white/15 p-2 space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-white/35" />
          <div className="h-2 w-1/2 rounded-full bg-white/25" />
          <div className="h-8 rounded-lg bg-white/15 mt-2" />
          <div className="h-8 rounded-lg bg-white/10" />
        </div>
        <div className="h-9 rounded-full bg-white/90 mb-1" />
      </div>
    </div>
  );
}

function DesktopScreen({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 bg-slate-900">
      <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${accent}`} />
      <div className="relative h-full p-3 flex gap-2">
        <div className="w-1/4 rounded-lg bg-white/8 border border-white/10 p-2 space-y-2">
          <div className="h-2 w-10 rounded-full bg-white/30" />
          <div className="h-6 rounded-md bg-white/10" />
          <div className="h-6 rounded-md bg-white/8" />
          <div className="h-6 rounded-md bg-white/8" />
        </div>
        <div className="flex-1 rounded-lg bg-white/6 border border-white/10 p-2 space-y-2">
          <div className="flex gap-2">
            <div className="h-12 flex-1 rounded-lg bg-white/12" />
            <div className="h-12 flex-1 rounded-lg bg-white/10" />
            <div className="h-12 flex-1 rounded-lg bg-white/10" />
          </div>
          <div className="h-24 rounded-lg bg-white/8 border border-white/10" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded-md bg-white/10" />
            <div className="h-10 rounded-md bg-white/10" />
            <div className="h-10 rounded-md bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup({ accent, label }: { accent: string; label: string }) {
  const tilt = useTilt3D(10);

  return (
    <motion.div
      className="relative z-20 w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px]"
      initial={{ opacity: 0, y: 40, rotateY: -24, rotateX: 8, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, rotateY: -12, rotateX: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, rotateY: -28, scale: 0.92, filter: "blur(8px)" }}
      transition={{ duration: 1.05, ease: easeSmooth }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <motion.div
        ref={tilt.ref}
        style={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute -inset-5 rounded-[2.2rem] bg-cyan-400/25 blur-2xl opacity-80" />
        <div
          className="relative rounded-[1.75rem] border-[3px] border-slate-500/80 bg-slate-950 p-1.5 shadow-[0_35px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(34,211,238,0.15)]"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="absolute top-2.5 left-1/2 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-slate-950" />
          <div className="relative aspect-[9/19] overflow-hidden rounded-[1.35rem] bg-slate-900">
            <PhoneScreen accent={accent} />
          </div>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-medium text-cyan-200/85">
          <Smartphone className="h-3 w-3" />
          {label}
        </p>
      </motion.div>
    </motion.div>
  );
}

function LaptopMockup({ accent, label }: { accent: string; label: string }) {
  const tilt = useTilt3D(8);

  return (
    <motion.div
      className="relative z-10 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px]"
      initial={{ opacity: 0, y: 48, x: 32, rotateY: 18, scale: 0.92, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, x: 0, rotateY: 8, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 24, x: 20, rotateY: 16, scale: 0.94, filter: "blur(8px)" }}
      transition={{ duration: 1.1, delay: 0.1, ease: easeSmooth }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <motion.div
        ref={tilt.ref}
        style={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
      >
        <div className="absolute -inset-8 rounded-3xl bg-violet-500/20 blur-3xl" />
        <div
          className="relative rounded-t-xl border border-slate-500/70 bg-slate-800 p-2 pb-0 shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
          style={{ transform: "translateZ(24px)" }}
        >
          <div className="mb-1.5 flex items-center gap-1.5 px-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 h-4 flex-1 rounded-md bg-slate-700/80" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-md bg-slate-900">
            <DesktopScreen accent={accent} />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>
        <div className="relative mx-auto h-3 w-[108%] -translate-x-[4%] rounded-b-xl bg-gradient-to-b from-slate-600 to-slate-800">
          <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b bg-slate-500/60" />
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-medium text-violet-200/85">
          <Monitor className="h-3 w-3" />
          {label}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDir(index > active || (active === slides.length - 1 && index === 0) ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const next = useCallback(() => {
    setDir(1);
    setActive((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setActive((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [active, next]);

  const slide = slides[active];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, -16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 md:px-10 lg:px-16 pt-24 md:pt-28 pb-10 md:pl-16 lg:pl-20">
        <div className="flex items-center justify-between gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: easeSmooth }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new projects
          </motion.div>
          <div className="flex gap-2 md:hidden">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg border border-cyan-400/20 bg-white/5"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-lg border border-cyan-400/20 bg-white/5"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-6 items-center py-4">
          <div className="max-w-xl relative">
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: easeSmooth }}
              className="text-[11px] font-semibold tracking-[0.28em] uppercase text-cyan-300/90 mb-3"
            >
              {profile.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.95, delay: 0.05, ease: easeSmooth }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-5"
            >
              <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </motion.h1>

            <div className="relative min-h-[160px] sm:min-h-[150px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={slide.id}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 24, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: dir * -18, filter: "blur(8px)" }}
                  transition={{ duration: 0.75, ease: easeSmooth }}
                >
                  <span className="inline-block mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-violet-300/90">
                    {slide.tag}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-semibold text-white leading-snug mb-3">
                    {slide.headline}
                  </h2>
                  <p className="text-base md:text-lg text-slate-300 max-w-md leading-relaxed">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: easeSmooth }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href={slide.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(slide.href.replace("#", ""), 80);
                }}
                data-magnetic="20"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-[filter]"
              >
                {slide.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 hover:border-cyan-400/40 hover:text-cyan-200 transition-colors backdrop-blur-md"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </motion.div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="h-9 w-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:border-cyan-400/40 hover:text-cyan-200 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="h-9 w-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:border-cyan-400/40 hover:text-cyan-200 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Show ${s.tag}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-8 bg-gradient-to-r from-cyan-400 to-violet-400"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-500">
                0{active + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          <div
            className="relative flex items-end justify-center lg:justify-end min-h-[300px] sm:min-h-[360px] md:min-h-[400px]"
            style={{ perspective: 1400 }}
          >
            <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/15 blur-3xl" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={slide.id + "-devices"}
                className="relative flex items-end gap-2 sm:gap-4 md:gap-5"
                style={{ transformStyle: "preserve-3d" }}
              >
                <PhoneMockup accent={slide.phoneAccent} label={slide.phoneLabel} />
                <div className="mb-5 sm:mb-7">
                  <LaptopMockup accent={slide.deskAccent} label={slide.desktopLabel} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToId("about", 80)}
          aria-label="Scroll to about"
          className="self-center text-white/40 hover:text-cyan-200 transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={26} />
        </motion.button>
      </div>
    </section>
  );
}
