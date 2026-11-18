"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToId } from "@/components/motion/SmoothScroll";
import type Lenis from "lenis";

/** PCDC-style fixed "Go to Top" control */
export default function GoToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 480);
  });

  const goTop = () => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else scrollToId("home", 0);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Go to top"
          onClick={goTop}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="fixed right-4 md:right-6 bottom-28 z-40 flex flex-col items-center gap-1 rounded-full bg-slate-900/90 border border-cyan-400/30 px-3 py-3 text-cyan-200 shadow-lg shadow-cyan-500/15 backdrop-blur-md hover:border-cyan-300/60 hover:text-white transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
          <span
            className="hidden md:block text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ writingMode: "vertical-rl" }}
          >
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
