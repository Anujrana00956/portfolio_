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
  { label: "Home", href: "#", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolling, setIsScrolling] = useState(false);
  const { scrollY } = useScroll();

  // Change navbar background on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Detect active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      let currentSection = "Home";

      for (const section of sections) {
        if (!section) continue;
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection =
              section.charAt(0).toUpperCase() + section.slice(1);
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  // Smooth scroll
  const handleSmoothScroll = (
    e: React.MouseEvent,
    href: string,
    closeMenu = false
  ) => {
    e.preventDefault();
    if (closeMenu) setIsOpen(false);

    setIsScrolling(true);

    if (href === "#" || href === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("Home");
      setTimeout(() => setIsScrolling(false), 500);
      return;
    }

    const sectionId = href.startsWith("#") ? href.substring(1) : href;
    const target = document.getElementById(sectionId);

    if (target) {
      const rect = target.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const navbar = document.querySelector("header");
      const navbarHeight = navbar ? navbar.clientHeight : 0;

      const targetPosition = rect.top + scrollTop - navbarHeight - 10;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });

      setActiveSection(
        sectionId.charAt(0).toUpperCase() + sectionId.slice(1)
      );
    }

    // Fix: wait for scroll to finish
    setTimeout(() => setIsScrolling(false), 600);
  };

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-slate-900/80 shadow-lg border-b border-cyan-500/20"
          : "backdrop-blur-md bg-slate-900/60"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <NavbarLogo className="w-10 h-10" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((item) => {
              const isActive =
                activeSection.toLowerCase() === item.label.toLowerCase();
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={clsx(
                    "flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300",
                    "text-slate-200 hover:text-white hover:bg-cyan-600/30 hover:scale-105",
                    isActive &&
                      "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-xl transform scale-105"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-slate-100 hover:text-white hover:bg-cyan-400/20 transition-colors duration-300"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="md:hidden flex flex-col space-y-2 pb-4 pointer-events-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((item) => {
                const isActive =
                  activeSection.toLowerCase() === item.label.toLowerCase();
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href, true)}
                    className={clsx(
                      "flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      "text-slate-200 hover:text-white hover:bg-cyan-600/20 hover:scale-105",
                      isActive &&
                        "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-xl transform scale-105"
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
