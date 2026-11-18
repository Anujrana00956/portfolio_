"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { profile } from "@/config";
import { easeSmooth } from "@/lib/motion";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const emailLink = `mailto:${profile.email.address}`;
  const phoneLink = `tel:${profile.phone.number.replace(/\s+/g, "")}`;
  const mapLink = `https://maps.google.com/?q=${encodeURIComponent(
    profile.location.name
  )}`;

  const contactChannels = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email.address,
      href: emailLink,
      hint: "Best for project briefs",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone.number,
      href: phoneLink,
      hint: "Mon–Fri · IST",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location.name,
      href: mapLink,
      hint: "Open to remote",
    },
  ];

  const socials = [
    { icon: Github, href: profile.socials.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  ];

  const validate = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in name, email, and message.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("access_key", "86b0a064-8ce7-47d2-8b06-4a5b1e345379");
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject || "Portfolio inquiry");
      data.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData(emptyForm);
        window.setTimeout(() => setIsSubmitted(false), 4500);
      } else {
        setError("Couldn't send your message. Please try again.");
      }
    } catch {
      setError("Something went wrong. Email me directly instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name: string) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 backdrop-blur-md ${
      focused === name
        ? "border-cyan-400/50 ring-2 ring-cyan-400/15 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]"
        : "border-white/10 hover:border-white/20"
    }`;

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden bg-slate-950"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-cyan-500/12 blur-[110px]" />
        <div className="absolute bottom-0 left-1/5 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-2xl mb-12 md:mb-16"
          initial={false}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 32, filter: "blur(8px)" }
          }
          transition={{ duration: 0.9, ease: easeSmooth }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-300/80 mb-3">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Let&apos;s build something
            <span className="block text-slate-400">worth shipping</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Tell me about your product, timeline, or idea — I usually reply within
            a day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — channels */}
          <motion.aside
            className="lg:col-span-5 space-y-8"
            initial={false}
            animate={
              inView
                ? { opacity: 1, x: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -28, filter: "blur(8px)" }
            }
            transition={{ duration: 0.9, delay: inView ? 0.08 : 0, ease: easeSmooth }}
          >
            <ul className="space-y-3">
              {contactChannels.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.label === "Location" ? "_blank" : undefined}
                    rel={
                      item.label === "Location" ? "noopener noreferrer" : undefined
                    }
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-md transition-colors hover:border-cyan-400/35 hover:bg-cyan-500/[0.06]"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 text-cyan-200 group-hover:from-cyan-500/30 group-hover:to-violet-500/30 transition-colors">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {item.label}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:text-cyan-300" />
                      </span>
                      <span className="block text-sm md:text-[15px] font-medium text-white truncate">
                        {item.value}
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        {item.hint}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.06] px-4 py-3.5 backdrop-blur-md">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Clock className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Fast response</p>
                <p className="text-xs text-emerald-300/80">Usually within 24 hours</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
                Also find me on
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic="14"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md hover:border-cyan-400/40 hover:text-cyan-100 transition-colors"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </a>
                ))}
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md hover:border-cyan-400/40 hover:text-cyan-100 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Right — form */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={false}
            animate={
              inView
                ? { opacity: 1, x: 0, filter: "blur(0px)" }
                : { opacity: 0, x: 28, filter: "blur(8px)" }
            }
            transition={{ duration: 0.9, delay: inView ? 0.12 : 0, ease: easeSmooth }}
          >
            <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-cyan-400/25 via-transparent to-violet-400/20 opacity-70 blur-[1px]" />
            <div className="relative rounded-[1.7rem] border border-white/10 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 md:p-9 overflow-hidden">
              <div className="absolute -top-20 -right-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-12 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      Send a message
                    </h3>
                    <p className="text-sm text-slate-400">
                      Share a few details — I&apos;ll get back soon.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
                    <Send className="h-4 w-4" />
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                      transition={{ duration: 0.5, ease: easeSmooth }}
                      className="flex flex-col items-center justify-center text-center py-16 px-4"
                    >
                      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                        <CheckCircle className="h-7 w-7" />
                      </span>
                      <h4 className="text-xl font-bold text-white mb-2">
                        Message sent
                      </h4>
                      <p className="text-sm text-slate-400 max-w-sm">
                        Thanks for reaching out — I&apos;ll reply to your inbox shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-medium text-slate-400 mb-2"
                          >
                            Name <span className="text-cyan-400">*</span>
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            placeholder="Your name"
                            className={fieldClass("name")}
                            autoComplete="name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-medium text-slate-400 mb-2"
                          >
                            Email <span className="text-cyan-400">*</span>
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            placeholder="you@company.com"
                            className={fieldClass("email")}
                            autoComplete="email"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-xs font-medium text-slate-400 mb-2"
                        >
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocused("subject")}
                          onBlur={() => setFocused(null)}
                          placeholder="Project inquiry, collaboration…"
                          className={fieldClass("subject")}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-medium text-slate-400 mb-2"
                        >
                          Message <span className="text-cyan-400">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          placeholder="A short note about what you're building…"
                          className={`${fieldClass("message")} resize-none min-h-[140px]`}
                        />
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(4px)" }}
                            className="flex items-center gap-2 text-sm text-rose-300"
                          >
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          data-magnetic="16"
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 transition-[filter]"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.span
                                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send message
                            </>
                          )}
                        </motion.button>
                        <a
                          href={emailLink}
                          className="text-sm text-slate-400 hover:text-cyan-200 transition-colors sm:ml-1"
                        >
                          Or email {profile.email.address}
                        </a>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
