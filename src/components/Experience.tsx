"use client";

import {
  motion,
  useInView,
  TargetAndTransition,
  useScroll,
  useSpring,
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
      company: "Nessfi Tech. Pvt. Ltd.",
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

  // Scroll-based line animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathSpring = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-950 overflow-hidden text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-500/5 dark:text-cyan-400/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 360],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {i % 2 === 0 ? <Code size={120 + i * 20} /> : <Sparkles size={100 + i * 20} />}
          </motion.div>
        ))}
        
        {/* Animated circuit lines in background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.07]">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Background Glow Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.02) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />
      <motion.div
        className="absolute inset-0 z-0 dark:block hidden"
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 bg-clip-text text-transparent mb-3">
          Professional Journey
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          From training to professional expertise — shaping ideas into mobile excellence.
        </p>
      </motion.div>

      {/* Timeline with Professional Progress Beam */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8" ref={ref}>
        {/* Animated Progress Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] hidden md:block transform -translate-x-1/2 bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 origin-top shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ 
              height: "100%",
              scaleY: pathSpring 
            }}
          />
        </div>

        <div className="space-y-20 sm:space-y-24">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className={`relative flex flex-col md:flex-row items-center ${
                exp.side === "left"
                  ? "md:justify-start md:text-left"
                  : "md:justify-end md:text-left"
              }`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.21, 1.11, 0.81, 0.99], // Apple-like smooth spring/ease
              }}
            >
              {/* Timeline Node */}
              <motion.div
                className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${exp.gradient} shadow-lg border-4 border-white dark:border-gray-900 z-20`}
                animate={pulse}
              />

              {/* Card */}
              <motion.div
                onMouseMove={tiltEffect}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
                className={`relative w-full md:w-[45%] bg-white dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/30 transition-all duration-500 group z-10`}
              >
                {/* Gradient Reflection */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-20 blur-2xl`}
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
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">{exp.title}</h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {exp.period}
                  </Badge>
                </div>

                {/* Company + Location */}
                <div className="flex flex-wrap items-center gap-2 mb-2 text-slate-500 dark:text-gray-400 text-sm">
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{exp.company}</span>
                  <span className="flex items-center gap-1 text-slate-400 dark:text-gray-500">
                    <MapPin className="w-3 h-3" /> {exp.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base mb-5 sm:mb-6 font-medium">
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
                        boxShadow: `0 0 10px rgba(56,189,248,0.2)`,
                      }}
                      className="px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-xs sm:text-sm text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-white/10 backdrop-blur-sm cursor-pointer transition font-bold"
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
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-300" />
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg border border-white/10"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(59,130,246,0.5)",
          }}
        >
          <Briefcase className="w-5 h-5 text-white dark:text-yellow-300" />
          <span className="font-semibold text-sm sm:text-lg text-white">
            Let’s Build the Future with Flutter
          </span>
          <Code className="w-5 h-5 text-white dark:text-yellow-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
