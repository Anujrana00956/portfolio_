"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  scale?: number;
  /** If true, play once; if false, reverse + replay on scroll */
  once?: boolean;
};

/**
 * Apple-style section reveal with blur — bidirectional by default.
 */
export default function Reveal({
  children,
  className = "",
  y = 40,
  delay = 0,
  duration = 1.05,
  scale = 0.98,
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, scale, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power4.out",
          immediateRender: true,
          onComplete: () => {
            el.style.willChange = "auto";
          },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
            onEnter: () => {
              el.style.willChange = "transform, opacity, filter";
            },
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, scale, once]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
