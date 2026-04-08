"use client";
import { TbBrandReactNative } from "react-icons/tb";
import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiGit,
  SiGithubactions,
  SiFigma,
  SiTailwindcss,
  SiVercel,
  SiGooglecloud,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";
import { FaMobileAlt, FaLaptopCode, FaCloud, FaCube } from "react-icons/fa";
import { Sparkles, Code, Zap, Globe } from "lucide-react";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHovered(index);
  };

  const categories = [
    {
      title: "Mobile App Development",
      description: "High-performance cross-platform apps using Flutter & Dart.",
      icon: FaMobileAlt,
      gradient: "from-cyan-500 to-blue-600",
      shadow: "rgba(59, 130, 246, 0.5)",
      skills: [
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "Dart", icon: SiDart, color: "#0175C2" },
        { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
      ],
    },
    {
      title: "Frontend Web Development",
      description: "Modern responsive UI with HTML, CSS & JS ecosystem.",
      icon: FaLaptopCode,
      gradient: "from-pink-500 to-purple-600",
      shadow: "rgba(217, 70, 239, 0.5)",
      skills: [
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
      ],
    },
    {
      title: "Backend & Databases",
      description: "Server logic, REST / GraphQL APIs & scalable data stores.",
      icon: FaCloud,
      gradient: "from-orange-500 to-yellow-500",
      shadow: "rgba(249, 115, 22, 0.5)",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      ],
    },
    {
      title: "UI/UX & Design Tools",
      description: "Creating intuitive, beautiful and accessible user experiences.",
      icon: FaCube,
      gradient: "from-indigo-500 to-sky-600",
      shadow: "rgba(99, 102, 241, 0.5)",
      skills: [
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Responsive Design", icon: Globe, color: "#22D3EE" },
        { name: "Animations", icon: Zap, color: "#FACC15" },
      ],
    },
    {
      title: "Version Control & Deployment",
      description: "Efficient workflows & seamless production deployment.",
      icon: Code,
      gradient: "from-green-500 to-emerald-600",
      shadow: "rgba(34, 197, 94, 0.5)",
      skills: [
        { name: "Git", icon: SiGit, color: "#F1502F" },
        { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
      ],
    },
  ];

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <section
      id="skills"
      className="relative py-24 bg-slate-950 text-white overflow-hidden transition-colors duration-300"
    >
      {/* Floating background lights */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative container mx-auto px-6 z-10" ref={ref}>
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.h2
            className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            Technical Skills & Expertise
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Combining design intuition with robust engineering — building apps
            that are as elegant as they are powerful.
          </p>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className={`relative rounded-3xl p-[2px] bg-gradient-to-br ${cat.gradient} overflow-hidden group transition-all duration-500`}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                scale: hovered === i ? 1.03 : 1,
                boxShadow:
                  hovered === i
                    ? `0 0 40px ${cat.shadow}`
                    : "0 0 10px rgba(0,0,0,0.2)",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              {/* Dynamic reflective light */}
              {hovered === i && (
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(
                      circle at ${mousePos.x}px ${mousePos.y}px,
                      rgba(255,255,255,0.25),
                      transparent 60%
                    )`,
                  }}
                />
              )}

              {/* Inner card */}
              <div className="relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl h-full p-6 flex flex-col justify-between transition-all duration-500">
                <div className="flex items-center mb-4 space-x-4">
                  <motion.div
                    animate={{
                      rotateY: hovered === i ? [0, 20, -20, 0] : 0,
                    }}
                    transition={{
                      duration: 5,
                      repeat: hovered === i ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${cat.gradient} relative`}
                  >
                    <motion.div
                      className="absolute inset-0 blur-xl rounded-2xl opacity-60"
                      style={{
                        background: `linear-gradient(${cat.shadow}, transparent)`,
                      }}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                    <cat.icon className="text-3xl text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <motion.div className="flex flex-wrap gap-3 mt-3">
                  {cat.skills.map((s, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      custom={idx}
                      initial="hidden"
                      animate="visible"
                      whileHover={{
                        scale: 1.15,
                        boxShadow: `0 0 20px ${cat.shadow}`,
                      }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm cursor-pointer"
                      >
                        <s.icon color={s.color} />
                        {s.name}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Glow sparkles */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
