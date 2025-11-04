"use client";

import { motion, useInView, Variants } from "framer-motion";
import { TbBrandReactNative } from "react-icons/tb";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Code, Target, Database, Smartphone, Figma } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const iconFloat: Variants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 10, -5, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const cards = [
    {
      icon: <GraduationCap className="h-6 w-6 text-blue-400" />,
      title: "Master of Computer Applications",
      subtitle: "Computer Science",
      description: "Govt. PG College Dharamshala (HPTU, Hamirpur) | 2022 — 2024",
      extra: "Full-stack development, database management, Java & Python experience.",
      border: "border-l-blue-400",
    },
    {
      icon: <Code className="h-6 w-6 text-purple-400" />,
      title: "Current Role",
      subtitle: "Flutter Developer",
      description: "Cross-platform mobile apps",
      extra: "Delivering high-performance, scalable apps with clean, maintainable code.",
      border: "border-l-purple-400",
    },
    {
      icon: <Target className="h-6 w-6 text-pink-400" />,
      title: "Focus Areas",
      subtitle: "UI/UX & Performance",
      description: "Flutter, Dart, Firebase, RESTful APIs",
      extra: "Improving app responsiveness, engagement, and seamless user experiences.",
      border: "border-l-pink-400",
    },
  ];

  const techStack = [
    { name: "Flutter", icon: Smartphone },
    { name: "Dart", icon: Code },
    { name: "Firebase", icon: Database },
    { name: "Figma", icon: Figma },
    { name: "React", icon: TbBrandReactNative },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gray-900 text-gray-100">
      {/* Background animated blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-gradient-to-r from-blue-700 via-purple-800 to-pink-700 rounded-full opacity-30 blur-3xl"
          animate={{ x: [0, 300, 0], y: [0, 200, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-gradient-to-r from-purple-800 via-pink-700 to-yellow-600 rounded-full opacity-25 blur-2xl"
          animate={{ x: [0, -300, 0], y: [0, -150, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative container mx-auto px-4" ref={ref}>
        {/* Title */}
        <motion.div
          className="text-center mb-12 relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            variants={fadeInUp}
          >
            About <span className="text-blue-400">Me</span>
          </motion.h2>
          <motion.div
            className="mx-auto w-28 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
            variants={fadeInUp}
          />
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="flex justify-center mb-12 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/assets/Media.jpeg"
            alt="Anuj Rana"
            className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover shadow-2xl border-4 border-blue-600 hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left Description */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <motion.h3 className="text-2xl md:text-3xl font-semibold text-white">
              👋 Hi, I'm Anuj Rana
            </motion.h3>
            <motion.p className="text-lg leading-relaxed text-gray-200">
              I am a passionate Flutter Developer with over 2 years of experience designing, developing, and deploying high-performance mobile applications. I specialize in Flutter & Dart, with hands-on experience integrating Firebase and RESTful APIs. My focus on clean UI/UX and responsive design ensures seamless user experiences and improved app performance.
            </motion.p>
            <motion.p className="text-lg leading-relaxed text-gray-200">
              🌱 I continuously explore new technologies within the mobile ecosystem, thrive in innovative environments, and enjoy collaborating with teams to deliver impactful mobile solutions. 📬 I’m open to networking, sharing knowledge, and discovering exciting opportunities in mobile app development.
            </motion.p>

            {/* Tech Stack Inline */}
            <motion.div className="flex flex-wrap justify-start gap-4 mt-4">
              {techStack.map(({ name, icon: Icon }, i) => (
                <motion.div
                  key={name}
                  whileHover={{
                    scale: 1.15,
                    rotateY: 20,
                    rotateX: 10,
                    y: -5,
                    boxShadow: "0 20px 50px rgba(139,92,246,0.5)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-purple-500/30 backdrop-blur-lg bg-gray-800/60 cursor-pointer transition-all"
                >
                  <Icon className="text-xl md:text-2xl text-purple-400" />
                  <span className="text-white font-medium text-sm md:text-base">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Cards */}
          <motion.div className="space-y-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                whileHover={{
                  scale: 1.06,
                  y: -8,
                  rotate: [0, 1, -1, 0],
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 },
                }}
              >
                <Card className={`border-l-4 ${card.border} bg-gray-800/70 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3 gap-3">
                      <motion.div
                        variants={iconFloat}
                        animate="animate"
                        className="text-2xl"
                      >
                        {card.icon}
                      </motion.div>
                      <h4 className="font-semibold text-lg text-white">{card.title}</h4>
                    </div>
                    <p className="font-medium text-gray-200">{card.subtitle}</p>
                    <p className="text-sm mb-2 text-gray-300">{card.description}</p>
                    <p className="text-xs text-gray-400">{card.extra}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
