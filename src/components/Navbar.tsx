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
  Download,
} from "lucide-react";
import clsx from "clsx";
import NavbarLogo from "./NavbarLogo";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { profile } from "@/config";

const DESKTOP_NAV_PX = 1024;

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail },
];

type LenisController = { stop: () => void; start: () => void };

function getLenis() {
  return (window as Window & { __lenis?: LenisController }).__lenis;
}

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
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_NAV_PX) setIsOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false
  ) => {
    e.preventDefault();
    if (closeMenu) {
      getLenis()?.start();
      setIsOpen(false);
    }

    const id = href.replace("#", "");
    setActiveSection(id);
    scrollToId(id, 80);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <>
      <motion.header
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] w-full max-w-[100vw] transition-all duration-350",
          scrolled || isOpen
            ? "backdrop-blur-2xl bg-slate-950/80 shadow-[0_8px_40px_rgba(6,182,212,0.12)] border-b border-cyan-400/20"
            : "backdrop-blur-md bg-gradient-to-b from-slate-950/70 to-transparent border-b border-transparent"
        )}
      >
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent transition-opacity",
            scrolled || isOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8 pt-[env(safe-area-inset-top)]">
          <div className="flex min-h-16 items-center justify-between gap-3 py-2.5">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home", true)}
              className="relative z-[110] flex min-w-0 items-center"
              aria-label="Home"
            >
              <NavbarLogo />
            </a>

            <LayoutGroup id="desktop-nav">
              <nav
                className="hidden lg:flex min-w-0 items-center gap-0.5 rounded-full border border-cyan-400/20 bg-cyan-500/5 p-1 shadow-inner shadow-cyan-500/5"
                aria-label="Primary"
              >
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
                        "relative flex items-center whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-200 xl:px-3.5 xl:text-sm",
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
                            "hidden h-3.5 w-3.5 xl:block",
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

            <div className="hidden lg:flex shrink-0 items-center">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-cyan-500/25 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40"
              >
                Hire me
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="relative z-[110] inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 text-cyan-100 transition-colors hover:bg-cyan-500/15 lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col bg-slate-950/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav
              className="flex h-full flex-col gap-2 overflow-y-auto overscroll-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(env(safe-area-inset-top)+5.25rem)] sm:px-5"
              aria-label="Mobile"
            >
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
                      "flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-semibold transition-all",
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25"
                        : "border border-cyan-400/10 bg-cyan-500/5 text-slate-200 hover:bg-cyan-500/10"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="mt-3 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact", true)}
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/25"
                >
                  Hire me
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-cyan-400/25 bg-white/5 px-4 py-3 text-sm font-semibold text-cyan-100"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
