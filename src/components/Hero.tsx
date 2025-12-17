"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Download,
  ChevronDown,
  Code,
  Award,
  Layers,
  GitBranch,
} from "lucide-react";

export default function Hero() {
  const titles = useMemo(
    () => ["Flutter Developer", "Mobile App Engineer", "UI/UX Enthusiast"],
    []
  );
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [titles.length]);

  const scrollToNext = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { number: "15+", label: "Flutter Projects", icon: Code },
    { number: "2+", label: "Years Experience", icon: Award },
    { number: "8+", label: "Tech Tools Used", icon: Layers },
    { number: "30+", label: "GitHub Contributions", icon: GitBranch },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white px-6 md:px-12 pt-24">
      {/* Floating background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-500/20 rounded-full"
            style={{
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [`0%`, `${Math.random() * 15 - 7}%`, `0%`],
              x: [`0%`, `${Math.random() * 15 - 7}%`, `0%`],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 text-center max-w-5xl flex flex-col gap-10 min-h-[80vh] justify-center" id ='home'>
        {/* Greeting */}
        <motion.div
          className="inline-block px-8 py-4 bg-cyan-600/20 rounded-full text-cyan-100 font-semibold text-lg md:text-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          👋 Hi, I’m <span className="text-cyan-300">Anuj Rana</span>
        </motion.div>

        {/* Animated Titles */}
        <div className="relative h-32 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentTitle}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              initial={{ y: 100, opacity: 0, rotate: -5, skewY: 5 }}
              animate={{ y: 0, opacity: 1, rotate: 0, skewY: 0 }}
              exit={{ y: -100, opacity: 0, rotate: 5, skewY: -5 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {titles[currentTitle]}
            </motion.h1>
          </AnimatePresence>

          <motion.div
            className="h-1 w-40 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 mx-auto mt-4 rounded-full"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>

        {/* Short Description */}
        <motion.p
          className="text-slate-200 mt-2 text-lg md:text-2xl max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Crafting{" "}
          <span className="text-cyan-300 font-semibold">
            modern Flutter apps
          </span>{" "}
          with smooth UI/UX and professional design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                const yOffset = -80; // adjust offset (e.g., header height)
                const y =
                  contactSection.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="bg-cyan-600/80 hover:bg-cyan-500 px-10 py-5 rounded-full text-lg md:text-xl font-semibold shadow-lg transition-all duration-300"
          >
            <Mail className="mr-2 h-5 w-5 animate-bounce" /> Let’s Connect
          </Button>

          <a
            href="/assets/ANUJ RANA (1).pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="border-2 border-cyan-400 text-cyan-100 px-10 py-5 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 hover:bg-slate-800/50">
              <Download className="mr-2 h-5 w-5 animate-bounce" /> Resume
            </Button>
          </a>
        </motion.div>

        {/* Stats Section */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12">
          {stats.map(({ number, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              whileHover={{
                scale: 1.12,
                rotateY: 15,
                rotateX: 5,
                y: -5,
                boxShadow: "0 25px 50px rgba(56,189,248,0.5)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring" }}
              className="p-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/70 to-slate-800/70 backdrop-blur-lg shadow-xl flex flex-col items-center justify-center transition-all"
            >
              <Icon className="h-12 w-12 text-cyan-300 mb-4" />
              <h4 className="text-4xl md:text-5xl font-bold text-white">
                {number}
              </h4>
              <p className="text-slate-300 text-center mt-2 text-lg md:text-xl">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="text-cyan-300 hover:text-cyan-200 mt-12 transition-all duration-300"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={40} className="mx-auto" />
        </motion.button>
      </div>
    </section>
  );
}
