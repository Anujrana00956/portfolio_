"use client";

import { TbBrandReactNative } from "react-icons/tb";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
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
  SiNextdotjs,
} from "react-icons/si";
import { FaMobileAlt, FaLaptopCode, FaCloud, FaCube } from "react-icons/fa";
import { Code, Zap, Globe } from "lucide-react";
import { easeOut } from "@/lib/motion";

type Skill = {
  name: string;
  icon: React.ComponentType<{ color?: string; className?: string }>;
  color: string;
};

type Category = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  shadow: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    title: "Mobile App Development",
    description: "High-performance cross-platform apps using Flutter & Dart.",
    icon: FaMobileAlt,
    gradient: "from-cyan-500 to-blue-600",
    shadow: "rgba(59, 130, 246, 0.55)",
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
      { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
    ],
  },
  {
    title: "Frontend Web Development",
    description: "Modern responsive UI with React, Next.js & TypeScript.",
    icon: FaLaptopCode,
    gradient: "from-pink-500 to-purple-600",
    shadow: "rgba(217, 70, 239, 0.5)",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend & Databases",
    description: "Server logic, REST APIs & scalable data stores.",
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
    description: "Creating intuitive, beautiful and accessible experiences.",
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
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    ],
  },
];

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.04, type: "spring", stiffness: 140 },
  }),
};

function SkillCard3D({
  cat,
  index,
  featured,
}: {
  cat: Category;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [14, -14]), {
    stiffness: 180,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-16, 16]), {
    stiffness: 180,
    damping: 18,
  });
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: easeOut }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        mx.set(nx);
        my.set(ny);
        setMousePos({ x: nx * 100, y: ny * 100 });
        setHovered(true);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
        setHovered(false);
      }}
      className={`relative group ${featured ? "md:col-span-2 lg:col-span-1" : ""}`}
    >
      <motion.div
        className={`relative rounded-3xl p-[2px] bg-gradient-to-br ${cat.gradient} h-full`}
        animate={{
          scale: hovered ? 1.035 : 1,
          boxShadow: hovered
            ? `0 25px 60px ${cat.shadow}`
            : "0 8px 24px rgba(0,0,0,0.25)",
        }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <div
          className="relative bg-gray-900/90 backdrop-blur-2xl rounded-3xl h-full p-6 md:p-7 flex flex-col overflow-hidden"
          style={{ transform: "translateZ(28px)" }}
        >
          <motion.div
            className="pointer-events-none absolute w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-45"
            style={{
              left: glowX,
              top: glowY,
              x: "-50%",
              y: "-50%",
              background: cat.shadow,
            }}
          />
          {hovered && (
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.22), transparent 55%)`,
              }}
            />
          )}

          <div className="flex items-start gap-4 mb-5 relative z-10">
            <motion.div
              animate={
                hovered
                  ? { rotateY: [0, 22, -22, 0], scale: [1, 1.08, 1] }
                  : { rotateY: 0, scale: 1 }
              }
              transition={{
                duration: 4.5,
                repeat: hovered ? Infinity : 0,
                ease: "easeInOut",
              }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${cat.gradient} relative shadow-lg`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0 blur-xl rounded-2xl opacity-60"
                style={{ background: cat.shadow }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              />
              <cat.icon className="text-3xl text-white relative z-10" />
            </motion.div>
            <div>
              {featured && (
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-1">
                  Primary stack
                </span>
              )}
              <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                {cat.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-auto relative z-10">
            {cat.skills.map((s, idx) => (
              <motion.div
                key={s.name}
                variants={badgeVariants}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{
                  scale: 1.12,
                  boxShadow: `0 0 18px ${cat.shadow}`,
                }}
              >
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm cursor-default"
                >
                  <s.icon color={s.color} className="text-base" />
                  {s.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-28 bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950 text-white overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(34,211,238,0.12) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(168,85,247,0.12) 0%, transparent 45%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative container mx-auto px-6 z-10">
        <div className="text-center mb-14 md:mb-16">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-300/80 mb-3"
            data-animate="apple-rise"
          >
            Toolkit
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
            data-animate="apple-scale"
          >
            Technical Skills & Expertise
          </h2>
          <p
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto"
            data-animate="fade-up"
          >
            Combining design intuition with robust engineering — building apps
            that are as elegant as they are powerful.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8"
          style={{ perspective: 1400 }}
        >
          {categories.map((cat, i) => (
            <SkillCard3D
              key={cat.title}
              cat={cat}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
