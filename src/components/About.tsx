"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Code, Target } from "lucide-react";

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
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const iconFloat: Variants = {
    animate: { y: [0, -6, 0], rotate: [0, 3, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
  };

  // Animated background gradients
const backgroundGradients = [
  "linear-gradient(to bottom right, #fef3c7, #d8b4fe)", // peach/purple
  "linear-gradient(to bottom right, #e0f2fe, #f0e7ff)", // light blue/purple
];

  // Corresponding text colors for readability
  const textColors = ["#1e293b", "#4b1d6f", "#065f46", "#1e293b"]; // dark blue, purple, green, dark blue

  return (
    <motion.section
      id="about"
      className="py-20 relative overflow-hidden"
      initial={{ background: backgroundGradients[0], color: textColors[0] }}
      animate={{
        background: backgroundGradients,
        color: textColors,
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4" ref={ref}>
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInUp}
          >
            About <span className="text-blue-600">Me</span>
          </motion.h2>
          <motion.div
            className="mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            variants={fadeInUp}
          />
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/your-picture.jpg"
            alt="Your Name"
            className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover shadow-2xl border-4 border-blue-100 hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left Description */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <motion.h3 className="text-2xl md:text-3xl font-semibold">
              Dedicated Flutter Developer
            </motion.h3>
            <motion.p className="text-lg leading-relaxed">
              I am a passionate Flutter Developer with expertise in creating beautiful and performant cross-platform mobile applications. I completed my Master's in Computer Applications from Chandigarh University in 2024.
            </motion.p>
            <motion.p className="text-lg leading-relaxed">
              Since graduation, I have been building Flutter apps that deliver smooth user experiences while maintaining clean, scalable code.
            </motion.p>
            <motion.p className="text-lg leading-relaxed">
              I continuously explore new Flutter packages, state management techniques, and integrate best practices in UI/UX and app performance.
            </motion.p>
          </motion.div>

          {/* Right Cards */}
          <motion.div className="space-y-6">
            {[
              {
                icon: <GraduationCap className="h-6 w-6 text-blue-500 mr-3" />,
                title: "Education",
                subtitle: "Master's in Computer Applications",
                description: "Chandigarh University, 2024",
                border: "border-l-blue-500",
              },
              {
                icon: <Code className="h-6 w-6 text-green-500 mr-3" />,
                title: "Current Role",
                subtitle: "Flutter Developer",
                description: "Cross-Platform Mobile Apps",
                border: "border-l-green-500",
              },
              {
                icon: <Target className="h-6 w-6 text-purple-500 mr-3" />,
                title: "Focus Areas",
                subtitle: "Mobile App Performance & UI/UX",
                description: "Flutter, State Management & DevOps",
                border: "border-l-purple-500",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <Card className={`border-l-4 ${card.border} bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <motion.div variants={iconFloat} animate="animate">
                        {card.icon}
                      </motion.div>
                      <h4 className="font-semibold">{card.title}</h4>
                    </div>
                    <p className="font-medium">{card.subtitle}</p>
                    <p className="text-sm">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
