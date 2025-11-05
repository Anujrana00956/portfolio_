"use client";

import { animate, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Code,
  Globe,
  Send,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { profile } from "@/config";

interface Particle {
  id: number;
  left: string;
  top: string;
  y: number[];
  opacity: number[];
  scale: number[];
  duration: number;
  delay: number;
}

export default function Footer() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      y: [0, -Math.random() * 40 - 10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1],
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const quickLinks = [
    { name: "About", href: "#about", icon: Star },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Globe },
    { name: "Contact", href: "#contact", icon: Send },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Anujrana00956", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/anujrana0754/", label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email.address}`, label: "Email" },
  ];

  const contactInfo = [
    { icon: Mail, text: profile.email.address, href: `mailto:${profile.email.address}` },
    { icon: Phone, text: profile.phone.number, href: `tel:${profile.phone.number}` },
    { icon: MapPin, text: profile.location.name, href: `https://maps.google.com/?q=${encodeURIComponent(profile.location.name)}` },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const heartBeat = {
    animate: { scale: [1, 1.2, 1], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
  };

  return (
    <footer className="relative overflow-hidden text-white bg-slate-900">
      {/* Subtle Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 opacity-20"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2.5 h-2.5 bg-white/30 rounded-full shadow-sm"
          style={{ left: p.left, top: p.top }}
          animate={{ y: p.y, opacity: p.opacity, scale: p.scale }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, repeatType: "loop" }}
        />
      ))}

      {/* 3D Shapes */}
      <motion.div
        className="absolute w-20 h-20 bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl opacity-70"
        style={{ perspective: 600 }}
        animate={{ rotateY: [0, 360], rotateX: [0, 360], x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full opacity-70"
        style={{ perspective: 600 }}
        animate={{ rotateY: [0, -360], rotateX: [0, -360], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        {/* Logo & Scroll Top */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold cursor-pointer" onClick={scrollToTop}>Anuj Rana</h2>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 mt-2 text-slate-400 hover:text-white transition"
          >
            <ArrowUp size={18} /> Back to top
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/30 backdrop-blur-md text-slate-200 hover:text-white hover:scale-105 transition"
                whileHover={{ rotateX: 5, rotateY: 5 }}
              >
                <link.icon size={18} /> {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <div className="flex flex-col gap-2">
            {contactInfo.map((info) => (
              <motion.a
                key={info.text}
                href={info.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/30 backdrop-blur-md text-slate-200 hover:text-white hover:scale-105 transition"
                whileHover={{ rotateX: 5, rotateY: 5 }}
              >
                <info.icon size={18} /> {info.text}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-lg font-semibold mb-3">Social</h3>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                whileHover={{ scale: 1.2, rotateY: 180 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.2 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm flex flex-col md:flex-row justify-center items-center gap-2"
        variants={heartBeat}
        animate="animate"
      >
        <span>Made with</span> <Heart size={16} className="text-red-500" /> <span>by Anuj Rana</span>
      </motion.div>
    </footer>
  );
}
