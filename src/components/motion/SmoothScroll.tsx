"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Site-wide Lenis smooth scrolling, synced with GSAP ScrollTrigger.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Expose for nav smooth-scroll helpers
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}

/** Smooth scroll to an element id (uses Lenis when available) */
export function scrollToId(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = (window as Window & { __lenis?: Lenis }).__lenis;

  if (lenis) {
    lenis.scrollTo(el, { offset: -offset, duration: 1.25 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
