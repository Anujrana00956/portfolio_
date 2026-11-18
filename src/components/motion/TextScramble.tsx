"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Props = {
  phrases: string[];
  className?: string;
  intervalMs?: number;
};

/** Cyber scramble title morph */
export default function TextScramble({
  phrases,
  className = "",
  intervalMs = 3400,
}: Props) {
  const [display, setDisplay] = useState(phrases[0] || "");
  const indexRef = useRef(0);
  const displayRef = useRef(phrases[0] || "");

  useEffect(() => {
    let raf = 0;
    let timeout = 0;
    let cancelled = false;

    const scrambleTo = (next: string) => {
      let frame = 0;
      const max = Math.max(displayRef.current.length, next.length);

      const tick = () => {
        if (cancelled) return;
        let out = "";
        for (let i = 0; i < max; i++) {
          if (i < Math.floor(frame / 2)) {
            out += next[i] ?? "";
          } else if (next[i]) {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        displayRef.current = out;
        setDisplay(out);

        if (Math.floor(frame / 2) < next.length) {
          frame++;
          raf = requestAnimationFrame(tick);
        } else {
          displayRef.current = next;
          setDisplay(next);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const loop = () => {
      timeout = window.setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % phrases.length;
        scrambleTo(phrases[indexRef.current]);
        loop();
      }, intervalMs);
    };

    loop();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [phrases, intervalMs]);

  return <span className={`inline-block ${className}`}>{display}</span>;
}
