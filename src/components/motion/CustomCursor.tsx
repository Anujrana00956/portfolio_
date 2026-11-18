"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Glowing dual-ring cursor — desktop only */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 280, damping: 28 });
  const sy = useSpring(y, { stiffness: 280, damping: 28 });
  const ox = useSpring(x, { stiffness: 120, damping: 22 });
  const oy = useSpring(y, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [data-magnetic], input, textarea"));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            hovering ? "h-10 w-10 opacity-90" : "h-3 w-3 opacity-100"
          }`}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ox, y: oy, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className={`rounded-full border border-cyan-300/60 transition-all duration-300 ${
            hovering ? "h-16 w-16 border-violet-400/70" : "h-9 w-9"
          }`}
        />
      </motion.div>
    </>
  );
}
