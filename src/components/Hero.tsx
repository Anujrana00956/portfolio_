"use client";

import { useState, useEffect, useMemo } from "react";
import {
  motion,
  TargetAndTransition,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ChevronDown,
  Code,
  Layers,
  Award,
  GitBranch,
} from "lucide-react";
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiAndroid,
  SiIos,
  SiGit,
} from "react-icons/si";
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};
const techStack = [
  { name: "Flutter", icon: SiFlutter },
  { name: "Dart", icon: SiDart },
  { name: "Firebase", icon: SiFirebase },
  { name: "Android", icon: SiAndroid },
  { name: "iOS", icon: SiIos },
  { name: "Git", icon: SiGit },
];

const stats = [
  { number: "15+", label: "Flutter Projects", icon: Code },
  { number: "2+", label: "Years Experience", icon: Award },
  { number: "8+", label: "Tech Tools Used", icon: Layers },
  { number: "30+", label: "GitHub Contributions", icon: GitBranch },
];

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const { scrollY } = useScroll();

  const titles = useMemo(
    () => [
      "Flutter Developer",
      "Mobile App Engineer",
      "UI/UX Enthusiast",
      "Creative Technologist",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const backgroundY = useTransform(scrollY, [0, 400], [0, 100]);
  const textY = useTransform(scrollY, [0, 400], [0, 50]);

  // Variants
  const fadeSlide: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" },
    }),
  };

  const floatAnimation: TargetAndTransition = {
    y: [0, -20, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  };

  const morphingColors = {
    background: [
    "radial-gradient(circle at 25% 30%, #0ea5e9 0%, transparent 60%)",
    "radial-gradient(circle at 70% 70%, #6366f1 0%, transparent 60%)",
    // "radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 60%)",
    // "radial-gradient(circle at 30% 80%, #8b5cf6 0%, transparent 60%)",
    "radial-gradient(circle at 80% 20%, #22d3ee 0%, transparent 60%)",
  ],
  transition: {
    duration: 12,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },


  };

  const scrollToNext = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Animated Background */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <motion.div
          className="absolute inset-0"
          animate={morphingColors}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={floatAnimation}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -20, 0], transition: { duration: 5, repeat: Infinity } }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-16 text-center"
        style={{ y: textY }}
      >
        {/* Intro */}
        <motion.span
          className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600/30 to-violet-600/30 rounded-full text-cyan-100 border border-cyan-400/40 shadow-lg backdrop-blur-md mb-6"
          variants={fadeSlide}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          👋 Hi, I’m <strong className="text-cyan-300">Anuj Rana</strong>
        </motion.span>

        {/* Dynamic Titles */}
        <div className="relative flex justify-center h-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitle}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              initial={{ y: 80, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -80, opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {titles[currentTitle]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.h2
          className="text-xl md:text-2xl text-slate-200 mt-6 mb-8"
          variants={fadeSlide}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          Crafting smooth, performant{" "}
          <span className="text-cyan-300 font-semibold">mobile experiences</span> with Flutter.
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          variants={fadeSlide}
          custom={2}
          initial="hidden"
          animate="visible"
        >
          👋 Hi, I'm Anuj Rana — a passionate Flutter Developer with a strong focus on designing,
          developing, and deploying high-performance mobile applications that provide seamless user
          experiences.
          <br /><br />
          I specialize in Flutter & Dart and have hands-on experience integrating Firebase and RESTful APIs.
          My dedication to clean UI/UX and responsive design has consistently led to improved app
          performance and increased user engagement.
          <br /><br />
          🌱 I’m always eager to explore new technologies within the mobile ecosystem and thrive in
          environments where innovation and growth are encouraged. 📬 Let’s connect! I’m open to
          networking, sharing knowledge, and discovering new opportunities in mobile app development.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-14"
          variants={fadeSlide}
          custom={3}
          initial="hidden"
          animate="visible"
        >
          <Button
            onClick={() =>
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-300/30"
          >
            <Mail className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Let’s Collaborate
          </Button>

          <a href="/assets/resume_anuj_rana.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="border-2 border-cyan-400/40 text-cyan-100 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5 animate-bounce" /> Download Resume
            </Button>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeSlide}
          custom={4}
        >
          {[
            { icon: Github, href: "https://github.com/anujrana-dev", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/anujrana", label: "LinkedIn" },
            { icon: Mail, href: "mailto:anujrana.dev@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              whileHover={{
                scale: 1.2,
                rotate: 8,
                boxShadow: "0 0 25px rgba(34,211,238,0.4)",
              }}
              className="p-4 rounded-full bg-slate-800/40 border border-slate-700/40 hover:border-cyan-400/50 transition-all duration-300"
            >
              <Icon className="h-6 w-6 text-cyan-200" />
            </motion.a>
          ))}
        </motion.div>
            {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map(({ number, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              variants={scaleIn}
              custom={i}
              whileHover={{
                scale: 1.1,
                y: -6,
                boxShadow: "0 0 30px rgba(56,189,248,0.5)",
              }}
              className="p-6 rounded-2xl border border-cyan-400/40 bg-slate-900/50 backdrop-blur-md shadow-lg"
            >
              <Icon className="h-10 w-10 text-cyan-300 mx-auto mb-4" />
              <h4 className="text-3xl font-bold text-white">{number}</h4>
              <p className="text-slate-300">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          className="flex flex-wrap justify-center gap-5 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {techStack.map(({ name, icon: Icon }, i) => (
            <motion.div
              key={name}
              variants={scaleIn}
              custom={i}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                y: -5,
                boxShadow: "0 0 30px rgba(139,92,246,0.5)",
              }}
              className="flex items-center gap-3 px-6 py-4 rounded-xl border border-cyan-300/40 backdrop-blur-md bg-slate-800/40 transition-all duration-500"
            >
              <Icon className="text-3xl text-cyan-300" />
              <span className="text-slate-100 font-medium">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="mt-10 text-cyan-300 hover:text-cyan-200 transition-all duration-300"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={40} className="mx-auto" />
        </motion.button>
      </motion.div>
    </section>
  );
}
