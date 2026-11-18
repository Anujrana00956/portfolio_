"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/config";

const items = [
  {
    label: "Linkedin",
    href: profile.socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "Github",
    href: profile.socials.github,
    icon: Github,
  },
  {
    label: "Email",
    href: `mailto:${profile.email.address}`,
    icon: Mail,
  },
];

/** Fixed vertical social rail — dark cyan theme to match the site */
export default function VerticalSocialRail() {
  return (
    <aside
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-full md:flex flex-col items-center justify-center pl-2 lg:pl-3"
      aria-label="Social links"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-8 lg:gap-10 py-7 px-1.5 rounded-full bg-slate-950/85 backdrop-blur-xl text-slate-200 shadow-[0_8px_40px_rgba(6,182,212,0.15)] border border-cyan-400/25">
        {items.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.1, duration: 0.45 }}
            whileHover={{ scale: 1.05, color: "#67e8f9" }}
            className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            aria-label={item.label}
          >
            <item.icon className="h-3.5 w-3.5 shrink-0 text-cyan-400/80" />
            <span className="text-[11px] lg:text-xs font-semibold tracking-[0.2em] uppercase">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
    </aside>
  );
}
