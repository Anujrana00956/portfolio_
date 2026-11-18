"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Code,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { easeOut } from "@/lib/motion";

const experiences = [
  {
    title: "Senior Mobile App Developer",
    company: "Nessfi Tech. Pvt. Ltd.",
    location: "Mohali, Punjab",
    period: "Oct 1, 2026 — Present",
    description:
      "Leading the mobile team at Nessfi — driving architecture decisions, mentoring developers, and shipping production Flutter apps end-to-end. Own feature planning, code quality, and delivery across cross-platform releases.",
    technologies: [
      "Flutter",
      "Dart",
      "Team Leadership",
      "Architecture",
      "Firebase",
      "CI/CD",
    ],
    gradient: "from-emerald-500 to-cyan-500",
    side: "left" as const,
    icon: Briefcase,
  },
  {
    title: "Flutter & React Developer",
    company: "Nessfi Tech. Pvt. Ltd.",
    location: "Mohali, Punjab",
    period: "2024 — Sep 2026",
    description:
      "Designed scalable mobile and web solutions aligning technical architecture with business goals. Optimized app performance and delivered reusable Flutter and React components on time.",
    technologies: ["Flutter", "React", "Dart", "Firebase", "REST APIs", "Agile"],
    gradient: "from-cyan-500 to-blue-500",
    side: "right" as const,
    icon: Briefcase,
  },
  {
    title: "Junior Flutter Developer",
    company: "Development Logics Tech. Pvt. Ltd.",
    location: "Dharamshala, Himachal Pradesh",
    period: "2023 — 2024",
    description:
      "Built responsive Flutter UIs, integrated REST APIs, and followed mobile best practices for scalable app delivery.",
    technologies: ["Flutter", "Dart", "Git", "API Integration", "UI/UX"],
    gradient: "from-indigo-500 to-purple-500",
    side: "left" as const,
    icon: Briefcase,
  },
  {
    title: "Flutter Development Training",
    company: "Development Logics Tech. Pvt. Ltd.",
    location: "Dharamshala, Himachal Pradesh",
    period: "2023 — 2024",
    description:
      "Hands-on Flutter training covering UI design, API integration, and state management.",
    technologies: ["Flutter", "Dart", "State Management", "REST APIs"],
    gradient: "from-pink-500 to-rose-400",
    side: "right" as const,
    icon: GraduationCap,
  },
];

function JourneyCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const fromLeft = exp.side === "left";

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center ${
        fromLeft ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Timeline node */}
      <motion.div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 h-10 w-10 items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
      >
        <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
        <span
          className={`relative h-4 w-4 rounded-full bg-gradient-to-br ${exp.gradient} border-4 border-slate-950 shadow-lg shadow-cyan-500/40`}
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: fromLeft ? -72 : 72,
          y: 24,
          rotateY: fromLeft ? -18 : 18,
        }}
        animate={
          inView
            ? { opacity: 1, x: 0, y: 0, rotateY: 0 }
            : {
                opacity: 0,
                x: fromLeft ? -72 : 72,
                y: 24,
                rotateY: fromLeft ? -18 : 18,
              }
        }
        transition={{ duration: 0.7, delay: index * 0.08, ease: easeOut }}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        whileHover={{ y: -10, scale: 1.02 }}
        className={`relative w-full md:w-[45%] rounded-3xl p-[1px] bg-gradient-to-br ${exp.gradient} group cursor-default`}
      >
        <div className="relative rounded-3xl bg-slate-950/95 backdrop-blur-xl border border-white/10 p-6 sm:p-8 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500`}
          />

          <div className="flex flex-wrap items-center justify-between mb-3 sm:mb-4 gap-2 relative z-10">
            <div className="flex items-center gap-3">
              <motion.div
                className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${exp.gradient} shadow-lg`}
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
              >
                <exp.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {exp.title}
              </h3>
            </div>
            <Badge
              variant="secondary"
              className="text-xs sm:text-sm px-3 py-1 bg-white/10 text-white border border-white/10"
            >
              <Calendar className="w-3 h-3 mr-1" />
              {exp.period}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3 text-slate-400 text-sm relative z-10">
            <span className="font-medium text-cyan-300">{exp.company}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {exp.location}
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-5 relative z-10">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 relative z-10">
            {exp.technologies.map((tech, ti) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.35 + ti * 0.04 }}
                className="px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm text-slate-200 border border-white/10 group-hover:border-cyan-400/30 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="absolute bottom-3 right-3"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: false, amount: 0.1 });

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="text-center mb-14 sm:mb-16 md:mb-20 relative z-10 px-4">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-300/80 mb-3"
          data-animate="apple-rise"
        >
          Career path
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3"
          data-animate="apple-scale"
        >
          Professional Journey
        </h2>
        <p
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto"
          data-animate="fade-up"
        >
          From training to professional expertise — shaping ideas into polished products.
        </p>
      </div>

      <div ref={lineRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Animated center line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 origin-top"
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: easeOut }}
          />
        </div>

        <div className="space-y-14 sm:space-y-16 md:space-y-20">
          {experiences.map((exp, i) => (
            <JourneyCard key={exp.title} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <motion.div
        className="mt-20 sm:mt-24 text-center px-4"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="#contact"
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg shadow-cyan-500/25 border border-white/10 hover:scale-[1.03] transition-transform"
        >
          <Briefcase className="w-5 h-5 text-yellow-300" />
          <span className="font-semibold text-sm sm:text-lg text-white">
            Let&apos;s Build with Flutter & React
          </span>
          <Code className="w-5 h-5 text-yellow-300" />
        </a>
      </motion.div>
    </section>
  );
}
