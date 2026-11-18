"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Phone,
  Download,
} from "lucide-react";
import { profile } from "@/config";
import { easeSmooth } from "@/lib/motion";
import { scrollToId } from "@/components/motion/SmoothScroll";
import type Lenis from "lenis";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Github,
    href: profile.socials.github,
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: profile.socials.linkedin,
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: `mailto:${profile.email.address}`,
    label: "Email",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    text: profile.email.address,
    href: `mailto:${profile.email.address}`,
  },
  {
    icon: Phone,
    label: "Phone",
    text: profile.phone.number,
    href: `tel:${profile.phone.number.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    text: profile.location.name,
    href: `https://maps.google.com/?q=${encodeURIComponent(profile.location.name)}`,
  },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    scrollToId(id, 80);
    window.history.replaceState(null, "", href);
  };

  return (
    <footer className="relative overflow-hidden text-white bg-slate-950 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute bottom-0 right-1/5 h-80 w-80 rounded-full bg-violet-500/12 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-8">
        <motion.div
          initial={false}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 28, filter: "blur(8px)" }
          }
          transition={{ duration: 0.85, ease: easeSmooth }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 md:pb-14 border-b border-white/10"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-cyan-300/80 mb-3">
              {profile.title}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Flutter & React products with clean architecture, polished UI, and
              store-ready releases — based in {profile.location.name}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleHashClick(e, "#contact")}
              data-magnetic="18"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-[filter]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-md hover:border-cyan-400/40 hover:text-cyan-200 transition-colors"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-400 backdrop-blur-md hover:text-white hover:border-white/25 transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
              Top
            </button>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 py-12 md:py-14">
          <motion.div
            initial={false}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(6px)" }
            }
            transition={{ duration: 0.8, delay: inView ? 0.08 : 0, ease: easeSmooth }}
          >
            <h3 className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-500 mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleHashClick(e, link.href)}
                    className="group inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(6px)" }
            }
            transition={{ duration: 0.8, delay: inView ? 0.14 : 0, ease: easeSmooth }}
          >
            <h3 className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-500 mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <a
                    href={info.href}
                    target={info.label === "Location" ? "_blank" : undefined}
                    rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3 text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-300/80 backdrop-blur-md group-hover:border-cyan-400/40 group-hover:text-cyan-200 transition-colors">
                      <info.icon className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-slate-500 mb-0.5">
                        {info.label}
                      </span>
                      <span className="text-sm leading-snug break-all">{info.text}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(6px)" }
            }
            transition={{ duration: 0.8, delay: inView ? 0.2 : 0, ease: easeSmooth }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-500 mb-5">
              Connect
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Open to freelance, full-time, and collaboration — drop a message anytime.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  data-magnetic="16"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-md hover:border-cyan-400/40 hover:text-cyan-100 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 12, filter: "blur(4px)" }
          }
          transition={{ duration: 0.7, delay: inView ? 0.24 : 0, ease: easeSmooth }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 text-xs text-slate-500"
        >
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-slate-600">
            Built with Next.js · Flutter & React portfolio
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
