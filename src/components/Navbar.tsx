"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  LayoutGroup,
} from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  FolderOpen,
  Mail,
} from "lucide-react";
import clsx from "clsx";
import NavbarLogo from "./NavbarLogo";
import { scrollToId } from "@/components/motion/SmoothScroll";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const updateActiveSection = useCallback(() => {
    const offset = 140;
    let current = "home";

    for (const link of navLinks) {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= offset) current = id;
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [updateActiveSection]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false
  ) => {
    e.preventDefault();
    if (closeMenu) setIsOpen(false);

    const id = href.replace("#", "");
    setActiveSection(id);
    scrollToId(id, 80);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-350",
        scrolled
          ? "backdrop-blur-2xl bg-slate-950/80 shadow-[0_8px_40px_rgba(6,182,212,0.12)] border-b border-cyan-400/20"
          : "backdrop-blur-md bg-gradient-to-b from-slate-950/70 to-transparent border-b border-transparent"
      )}
    >
      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent transition-opacity",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-3.5">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center relative z-50"
            aria-label="Home"
          >
            <NavbarLogo />
          </a>

          <LayoutGroup id="desktop-nav">
            <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-cyan-500/5 border border-cyan-400/20 shadow-inner shadow-cyan-500/5">
              {navLinks.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "relative flex items-center px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-slate-300 hover:text-cyan-200"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 shadow-lg shadow-cyan-500/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <item.icon
                        className={clsx(
                          "h-3.5 w-3.5",
                          isActive ? "text-white" : "text-cyan-400/70"
                        )}
                      />
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </nav>
          </LayoutGroup>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-500 shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all"
            >
              Hire me
            </a>
          </div>

          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden relative z-50 p-2.5 rounded-full text-cyan-100 hover:bg-cyan-500/15 border border-cyan-400/20 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-2 px-5 pt-24 pb-8 h-full overflow-y-auto">
              {navLinks.map((item, i) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, true)}
                    initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-semibold transition-all",
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25"
                        : "text-slate-200 bg-cyan-500/5 border border-cyan-400/10 hover:bg-cyan-500/10"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
