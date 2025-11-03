"use client";

import {
  motion,
  useInView,
  TargetAndTransition,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Code,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const experiences = [
    {
      title: "Flutter Developer",
      company: "Nessifi Tech. Pvt. Ltd.",
      location: "Mohali, Punjab",
      period: "2024 — Present",
      description:
        "Designed scalable mobile solutions aligning technical architecture with business goals. Optimized app performance by resolving inefficiencies and streamlining Agile-based development. Built reusable Flutter components and delivered projects on time and within budget.",
      technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "Agile", "OOP"],
      gradient: "from-cyan-500 to-blue-500",
      side: "left",
      icon: Briefcase,
    },
    {
      title: "Junior Flutter Developer",
      company: "Development Logics Tech. Pvt. Ltd.",
      location: "Dharamshala, Himachal Pradesh",
      period: "2023 — 2024",
      description:
        "Developed and architected responsive Flutter UIs for smooth user experiences. Integrated REST APIs, maintained codebase with Git, and followed structured documentation and mobile best practices for scalable app delivery.",
      technologies: ["Flutter", "Dart", "Git", "API Integration", "UI/UX"],
      gradient: "from-indigo-500 to-purple-500",
      side: "right",
      icon: Briefcase,
    },
    {
      title: "Flutter Development Training",
      company: "Development Logics Tech. Pvt. Ltd.",
      location: "Dharamshala, Himachal Pradesh",
      period: "2023 — 2024",
      description:
        "Completed hands-on Flutter training covering UI design, API integration, and state management, gaining a strong foundation in mobile development principles and team workflows.",
      technologies: ["Flutter", "Dart", "State Management", "REST APIs"],
      gradient: "from-pink-500 to-rose-400",
      side: "left",
      icon: GraduationCap,
    },
  ];

  const pulse: TargetAndTransition = {
    scale: [1, 1.15, 1],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  const tiltEffect = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (rect.height / 2 - (e.clientY - rect.top)) / 25;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden text-white"
    >
      {/* Background Glow Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Section Header */}
      <motion.div
        className="text-center mb-14 sm:mb-16 md:mb-20 relative z-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">
          Professional Journey
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          From training to professional expertise — shaping ideas into mobile excellence.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8" ref={ref}>
        {/* Central Line (hidden on small screens) */}
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full"
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="space-y-20 sm:space-y-24">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className={`relative flex flex-col md:flex-row items-center ${
                exp.side === "left"
                  ? "md:justify-start md:text-left"
                  : "md:justify-end md:text-left"
              }`}
              initial={{ opacity: 0, x: exp.side === "left" ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.3, duration: 0.8, type: "spring" }}
            >
              {/* Timeline Node */}
              <motion.div
                className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${exp.gradient} shadow-lg border-4 border-gray-900 z-20`}
                animate={pulse}
              />

              {/* Card */}
              <motion.div
                onMouseMove={tiltEffect}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
                className={`relative w-full md:w-[45%] bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-cyan-500/30 transition-all duration-500 group`}
              >
                {/* Gradient Reflection */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-20 blur-2xl`}
                  transition={{ duration: 0.4 }}
                />

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-3 sm:mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${exp.gradient} shadow-lg`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <exp.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold">{exp.title}</h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm px-3 py-1 bg-white/10 text-white border border-white/10"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {exp.period}
                  </Badge>
                </div>

                {/* Company + Location */}
                <div className="flex flex-wrap items-center gap-2 mb-2 text-gray-400 text-sm">
                  <span className="font-medium text-cyan-400">{exp.company}</span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-3 h-3" /> {exp.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-5 sm:mb-6">
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {exp.technologies.map((tech, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        boxShadow: `0 0 10px rgba(255,255,255,0.2)`,
                      }}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm text-gray-200 border border-white/10 backdrop-blur-sm cursor-pointer transition"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>

                {/* Sparkles */}
                <motion.div
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-20 sm:mt-24 text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg border border-white/10"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(59,130,246,0.5)",
          }}
        >
          <Briefcase className="w-5 h-5 text-yellow-300" />
          <span className="font-semibold text-sm sm:text-lg text-white">
            Let’s Build the Future with Flutter
          </span>
          <Code className="w-5 h-5 text-yellow-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
