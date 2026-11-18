"use client";

import { useEffect, useState } from "react";

/** Soft spotlight that follows the pointer across the page */
export default function MouseSpotlight() {
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const move = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
      setOn(true);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500"
      style={{
        opacity: on ? 1 : 0,
        background: `radial-gradient(650px circle at ${pos.x}% ${pos.y}%, rgba(34,211,238,0.12), rgba(139,92,246,0.06) 35%, transparent 60%)`,
      }}
    />
  );
}
