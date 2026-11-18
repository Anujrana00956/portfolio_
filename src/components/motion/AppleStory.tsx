"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Smartphone, Monitor, Zap } from "lucide-react";
import { easeAppleOut } from "@/lib/motion";

/**
 * Apple-style sticky story — content is visible as soon as the section pins,
 * then scroll enhances devices/secondary lines (always readable).
 */
export default function AppleStory() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start tracking when section enters viewport (not only when pinned)
    offset: ["start 80%", "end end"],
  });

  // Headline: already readable early; slight settle on scroll
  const headlineY = useTransform(scrollYProgress, [0, 0.25], [24, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.3], [0.96, 1]);

  // Supporting copy fades in while staying readable (never below 0.85 once shown)
  const line2Opacity = useTransform(scrollYProgress, [0.08, 0.22, 1], [0.35, 1, 1]);
  const line2Y = useTransform(scrollYProgress, [0.08, 0.28], [20, 0]);

  const line3Opacity = useTransform(scrollYProgress, [0.18, 0.32, 1], [0.25, 1, 1]);
  const line3Y = useTransform(scrollYProgress, [0.18, 0.36], [16, 0]);

  // Devices grow in — start partially visible so section never feels empty
  const deviceScale = useTransform(scrollYProgress, [0.15, 0.55], [0.85, 1]);
  const deviceOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1], [0.45, 1, 1]);
  const deviceY = useTransform(scrollYProgress, [0.15, 0.5], [40, 0]);
  const glow = useTransform(scrollYProgress, [0.1, 0.5], [0.25, 0.55]);

  return (
    <section
      ref={ref}
      className="relative h-[200vh] bg-slate-950 text-white"
      aria-label="Product story"
    >
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: glow }}
        >
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-cyan-500/30 blur-[120px]" />
          <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 h-[320px] w-[320px] rounded-full bg-violet-500/25 blur-[100px]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-4xl text-center space-y-5 md:space-y-6">
          {/* Always mounts visible — entrance once, then scroll polish */}
          <motion.h2
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(8px)" }
            }
            transition={{ duration: 0.9, ease: easeAppleOut }}
            style={{ y: headlineY, scale: headlineScale }}
            className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.08] text-white"
          >
            Designed to feel
            <span className="block bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
              effortless.
            </span>
          </motion.h2>

          <motion.p
            style={{ opacity: line2Opacity, y: line2Y }}
            className="text-lg sm:text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto leading-relaxed"
          >
            Every screen, motion, and interaction is tuned for clarity —
            the way great products should feel.
          </motion.p>

          <motion.p
            style={{ opacity: line3Opacity, y: line3Y }}
            className="text-base md:text-lg text-slate-200 max-w-xl mx-auto"
          >
            Flutter on mobile. React on the web. One craft standard.
          </motion.p>
        </div>

        <motion.div
          style={{
            scale: deviceScale,
            opacity: deviceOpacity,
            y: deviceY,
          }}
          className="relative z-10 mt-8 md:mt-10 flex items-end justify-center gap-4 md:gap-8"
        >
          <div className="relative w-[100px] sm:w-[120px] md:w-[140px]">
            <div className="rounded-[1.5rem] border-[3px] border-slate-500 bg-slate-950 p-1.5 shadow-2xl shadow-cyan-500/25">
              <div className="aspect-[9/19] rounded-[1.15rem] overflow-hidden bg-gradient-to-b from-cyan-500/45 via-slate-900 to-violet-600/35 p-3 flex flex-col gap-2">
                <div className="h-2 w-10 mx-auto rounded-full bg-white/40 mt-3" />
                <div className="h-16 rounded-xl bg-white/20 border border-white/25" />
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-10 rounded-lg bg-white/15" />
                  <div className="h-10 rounded-lg bg-white/15" />
                </div>
                <div className="flex-1 rounded-xl bg-white/10" />
                <div className="h-7 rounded-full bg-white/90" />
              </div>
            </div>
            <p className="mt-2 text-[10px] text-cyan-100 flex items-center justify-center gap-1">
              <Smartphone className="h-3 w-3" /> Mobile
            </p>
          </div>

          <div className="relative w-[200px] sm:w-[260px] md:w-[320px] mb-2">
            <div className="rounded-t-xl border border-slate-500 bg-slate-800 p-1.5 pb-0 shadow-2xl shadow-violet-500/20">
              <div className="flex gap-1 mb-1 px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="aspect-[16/10] rounded-t-md overflow-hidden bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/35 to-cyan-500/25" />
                <div className="relative h-full p-3 flex gap-2">
                  <div className="w-1/4 rounded-md bg-white/10 space-y-1.5 p-1.5">
                    <div className="h-1.5 w-8 rounded bg-white/30" />
                    <div className="h-4 rounded bg-white/15" />
                    <div className="h-4 rounded bg-white/10" />
                  </div>
                  <div className="flex-1 rounded-md bg-white/8 p-2 space-y-2">
                    <div className="flex gap-1.5">
                      <div className="h-8 flex-1 rounded bg-white/15" />
                      <div className="h-8 flex-1 rounded bg-white/12" />
                    </div>
                    <div className="h-16 rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto h-2.5 w-[108%] -translate-x-[4%] rounded-b-lg bg-gradient-to-b from-slate-600 to-slate-800" />
            <p className="mt-2 text-[10px] text-violet-100 flex items-center justify-center gap-1">
              <Monitor className="h-3 w-3" /> Web
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-slate-300">
          <Zap className="h-3.5 w-3.5 text-cyan-300" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
