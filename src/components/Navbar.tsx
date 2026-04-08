"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
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
import Link from "next/link";
import clsx from "clsx";
import NavbarLogo from "./NavbarLogo";

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

  // Navbar background change on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      for (const link of navLinks) {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler (safe for mobile)
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false
  ) => {
    e.preventDefault();
    if (closeMenu) setIsOpen(false);

    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const navbarHeight = 80;
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
       scrolled
  ? "backdrop-blur-xl bg-slate-900/80 shadow-lg border-b border-white/10"
  : "backdrop-blur-md bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <NavbarLogo />
          </Link>

          {/* Desktop Nav (Laptops+) */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={clsx(
                    "flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300",
                    "text-slate-300 hover:text-white hover:bg-white/10 hover:scale-105",
                    isActive &&
                      "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-xl scale-105"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile / Tablet Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-3 rounded-full text-slate-100 hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="lg:hidden flex flex-col space-y-2 pb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {navLinks.map((item) => {
                const isActive =
                  activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) =>
                      handleSmoothScroll(e, item.href, true)
                    }
                    className={clsx(
                      "flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      "text-slate-600 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20",
                      isActive &&
                        "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-xl"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </a>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
