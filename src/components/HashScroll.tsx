"use client";

import { useEffect } from "react";
import { scrollToId } from "@/components/motion/SmoothScroll";

/** Smooth-scroll to hash anchors on load (e.g. /#projects) */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const t = window.setTimeout(() => scrollToId(hash, 80), 200);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
