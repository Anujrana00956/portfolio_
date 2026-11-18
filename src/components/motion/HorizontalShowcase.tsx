"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const items = [
  {
    title: "DAHN",
    tag: "Healthcare AI Docs",
    image: "/assets/images/dahnai.png",
    href: "https://getdahn.com/",
    color: "from-rose-500/40 to-orange-400/20",
  },
  {
    title: "Amity Staffing",
    tag: "Hospice Workflow",
    image: "/assets/images/amity_stafing.png",
    href: "https://www.amitystaffing.com",
    color: "from-emerald-400/40 to-teal-500/20",
  },
  {
    title: "AirmyMd",
    tag: "Patient Care",
    image: "/assets/images/airmy_md.png",
    href: "https://airmymd.com",
    color: "from-blue-400/40 to-indigo-500/20",
  },
  {
    title: "VentSpace",
    tag: "Mental Wellness",
    image: "/assets/images/vent_space.png",
    href: "https://ventspaceapp.com",
    color: "from-sky-400/40 to-cyan-500/20",
  },
  {
    title: "TruGroser",
    tag: "E-commerce",
    image: "/assets/images/trugroser.png",
    href: "/coming-soon",
    color: "from-lime-400/40 to-emerald-500/20",
  },
];

/** Horizontal scroll runway — new motion language */
export default function HorizontalShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-slate-950">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-10 mb-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-300/80 mb-2">
            Scroll sideways
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Work in motion
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-8 pl-6 md:pl-10 w-max">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative w-[78vw] sm:w-[52vw] md:w-[38vw] lg:w-[28vw] aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shrink-0"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                sizes="40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-cyan-200/80 mb-2">
                  {item.tag}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{item.title}</h3>
                <span className="mt-3 inline-block text-sm text-white/70 group-hover:text-cyan-300 transition-colors">
                  Open project →
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
