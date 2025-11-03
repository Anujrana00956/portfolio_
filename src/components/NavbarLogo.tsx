"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const NavbarLogo = () => {
  return (
    <motion.div
      className="flex items-center gap-2 sm:gap-3 cursor-pointer group relative"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-400/30 rounded-xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-80 -z-10"
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Icon container */}
      <motion.div
        className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl shadow-lg sm:shadow-xl"
        whileHover={{
          rotate: [0, -5, 5, 0],
          scale: 1.1,
        }}
        transition={{
          rotate: { duration: 0.6, ease: "easeInOut" },
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      >
        {/* Code Icon */}
        <motion.div
          whileHover={{
            scale: [1, 1.2, 1],
            rotateY: 360,
          }}
          transition={{
            scale: { duration: 0.4, ease: "easeInOut" },
            rotateY: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <Code2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white drop-shadow-lg" />
        </motion.div>

        {/* Inner glow */}
        <motion.div
          className="absolute inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-lg"
          initial={{ opacity: 0.2 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Text Logo */}
      <motion.div className="relative overflow-hidden">
        <motion.span
          className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 tracking-tight"
          whileHover={{
            scale: 1.05,
            backgroundPosition: "200% center",
            textShadow: "0 2px 15px rgba(255, 165, 0, 0.35)",
          }}
          style={{ backgroundSize: "200% auto" }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          Anuj Rana
        </motion.span>

        {/* Smooth hover underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-70 hidden sm:block"
          style={{
            top: `${20 + i * 15}%`,
            right: `${-10 + i * 6}%`,
          }}
          animate={{
            y: [-10, -25, -10],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default NavbarLogo;
