"use client";

import { useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
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
    [],
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
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent text-white px-6 md:px-12 pt-24 transition-colors duration-300"
    >
      {/* Floating background blobs - Subtle & Static Positioning */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-500/10 rounded-full blur-3xl"
            style={{
              width: `${200 + Math.random() * 200}px`,
              height: `${200 + Math.random() * 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 text-center max-w-5xl flex flex-col gap-10 min-h-[80vh] justify-center"
        id="home"
      >
        {/* Greeting */}
        <motion.div
          className="inline-block self-center px-8 py-4 bg-cyan-600/20 rounded-full text-cyan-100 font-semibold text-lg md:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          👋 Hi, I’m <span className="text-cyan-300">Anuj Rana</span>
        </motion.div>

        {/* Animated Titles */}
        <div className="relative h-24 md:h-32 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentTitle}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {titles[currentTitle]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Short Description */}
        <motion.p
          className="text-slate-200 mt-2 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Crafting{" "}
          <span className="text-cyan-300 font-semibold">
            modern Flutter apps
          </span>{" "}
          with smooth UI/UX and professional design.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
          <Button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                window.scrollTo({
                  top: contactSection.offsetTop - 80,
                  behavior: "smooth"
                });
              }
            }}
            className="bg-cyan-600/80 hover:bg-cyan-500 px-10 py-5 rounded-full text-lg md:text-xl font-semibold shadow-lg transition-all duration-300 text-white"
          >
            <Mail className="mr-2 h-5 w-5" /> Let’s Connect
          </Button>

          <a
            href="/assets/ANUJ RANA (1).pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-2 border-cyan-400 bg-slate-900/50 text-cyan-200 px-10 py-5 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 hover:bg-cyan-500 hover:text-slate-900"
            >
              <Download className="mr-2 h-5 w-5" /> Resume
            </Button>
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12">
          {stats.map(({ number, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-8 rounded-3xl border border-cyan-400/10 bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center transition-all hover:border-cyan-400/30"
            >
              <Icon className="h-10 w-10 text-cyan-300 mb-4" />
              <h4 className="text-3xl md:text-4xl font-bold text-white">
                {number}
              </h4>
              <p className="text-slate-400 text-center mt-2 text-sm md:text-base">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="text-cyan-300 hover:text-cyan-200 mt-12 self-center transition-all duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={40} />
        </motion.button>
      </div>
    </section>
  );
}
