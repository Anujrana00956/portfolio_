"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  GraduationCap,
  Code2,
  Sparkles,
  MapPin,
  Rocket,
  HeartHandshake,
  Linkedin,
  Github,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Users,
  Languages,
  Briefcase,
  Target,
  Clock3,
} from "lucide-react";
import { SiFlutter, SiReact, SiFirebase, SiDart, SiFigma } from "react-icons/si";
import { profile } from "@/config";
import { easeSmooth } from "@/lib/motion";

const highlights = [
  {
    icon: GraduationCap,
    label: "Education",
    title: "MCA · Computer Science",
    detail: "Govt. PG College Dharamshala (HPTU) · 2022—2024",
    accent: "from-sky-400 to-blue-500",
  },
  {
    icon: Code2,
    label: "Current role",
    title: "Senior Mobile App Developer",
    detail: "Leading the mobile team at Nessfi Tech · Oct 2026 — Present",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    icon: Rocket,
    label: "Focus",
    title: "UI/UX · Performance",
    detail: "Flutter, React, Firebase, REST — smooth store-ready apps",
    accent: "from-cyan-400 to-emerald-400",
  },
];

const facts = [
  { label: "Experience", value: "2+ years", icon: Clock3 },
  { label: "Apps shipped", value: "15+", icon: Sparkles },
  { label: "Stack", value: "Flutter · React", icon: Code2 },
  { label: "Team", value: "Lead mobile", icon: Users },
];

const strengths = [
  {
    icon: Target,
    title: "Product-minded shipping",
    copy: "I translate business goals into clear mobile/web experiences — not just screens.",
  },
  {
    icon: Users,
    title: "Team leadership",
    copy: "Mentor developers, review architecture, and keep delivery predictable under deadlines.",
  },
  {
    icon: Briefcase,
    title: "End-to-end ownership",
    copy: "From Figma handoff to App Store / Play Store — APIs, auth, CI, and polish.",
  },
  {
    icon: Languages,
    title: "Clear communication",
    copy: "Comfortable with clients and stakeholders; English & Hindi for day-to-day work.",
  },
];

const orbitIcons = [
  { Icon: SiFlutter, color: "#54C5F8", angle: 0 },
  { Icon: SiReact, color: "#61DAFB", angle: 72 },
  { Icon: SiDart, color: "#0175C2", angle: 144 },
  { Icon: SiFirebase, color: "#FFCA28", angle: 216 },
  { Icon: SiFigma, color: "#F24E1E", angle: 288 },
];

function TiltPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), {
    stiffness: 160,
    damping: 18,
  });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto w-[260px] h-[320px] md:w-[300px] md:h-[380px] perspective-[1400px]"
    >
      <div
        className="absolute -inset-6 rounded-[2.5rem] bg-cyan-400/20 blur-3xl"
        style={{ transform: "translateZ(-30px)" }}
      />

      <motion.div
        className="absolute inset-[-18%] rounded-full border border-dashed border-cyan-400/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{ transform: "translateZ(20px)" }}
      >
        {orbitIcons.map(({ Icon, color, angle }) => (
          <span
            key={angle}
            className="absolute left-1/2 top-1/2 h-10 w-10 -ml-5 -mt-5 rounded-xl bg-slate-900/95 border border-cyan-400/20 flex items-center justify-center shadow-lg shadow-cyan-500/10"
            style={{
              transform: `rotate(${angle}deg) translateY(-150px) rotate(-${angle}deg)`,
            }}
          >
            <Icon color={color} className="text-lg" />
          </span>
        ))}
      </motion.div>

      <div
        className="absolute inset-0 rounded-[2rem] overflow-hidden border border-cyan-400/25 shadow-2xl shadow-cyan-500/25 bg-slate-900"
        style={{ transform: "translateZ(48px)" }}
      >
        <Image
          src="/assets/about_desktop.jpg"
          alt="Anuj Rana"
          fill
          className="object-cover object-top"
          sizes="300px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-bold text-lg">{profile.name}</p>
          <p className="text-cyan-300 text-sm flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {profile.location.name}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute -right-3 top-8 z-10 rounded-2xl px-3 py-2 bg-slate-950/80 backdrop-blur-md border border-cyan-400/30 text-xs font-semibold text-cyan-100 shadow-lg"
        style={{ transform: "translateZ(90px)" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Available for work
      </motion.div>

      <motion.div
        className="absolute -left-4 bottom-16 z-10 rounded-2xl px-3 py-2 bg-slate-950/80 backdrop-blur-md border border-violet-400/30 text-xs font-semibold text-violet-100"
        style={{ transform: "translateZ(70px)" }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        Team lead · Mobile
      </motion.div>
    </motion.div>
  );
}

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: profile.socials.linkedin,
    color: "hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 hover:text-[#5B9FFF]",
  },
  {
    icon: Github,
    label: "GitHub",
    href: profile.socials.github,
    color: "hover:bg-white/15 hover:border-white/40",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${profile.email.address}`,
    color: "hover:bg-cyan-500/15 hover:border-cyan-400/40 hover:text-cyan-300",
  },
  {
    icon: Phone,
    label: "Call",
    href: `tel:${profile.phone.number}`,
    color: "hover:bg-emerald-500/15 hover:border-emerald-400/40 hover:text-emerald-300",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.12 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(34,211,238,0.25), transparent 35%), radial-gradient(circle at 85% 70%, rgba(168,85,247,0.22), transparent 40%)",
            backgroundSize: "160% 160%",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.75, ease: easeSmooth }}
          >
            <TiltPortrait />
            <motion.div
              className="mt-8 rounded-2xl border border-cyan-400/20 bg-white/[0.03] p-4 text-sm text-slate-300 space-y-2"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.25, duration: 0.55 }}
            >
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-300" />
                <a href={`mailto:${profile.email.address}`} className="hover:text-cyan-200">
                  {profile.email.address}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-300" />
                <a href={`tel:${profile.phone.number}`} className="hover:text-cyan-200">
                  {profile.phone.number}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-300" />
                {profile.location.name}
              </p>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-300/90 mb-3"
                data-animate="apple-rise"
              >
                About me
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white"
                data-animate="apple-scale"
              >
                Building products people
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  actually enjoy using
                </span>
              </h2>

              <motion.div
                className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.15, duration: 0.65, ease: easeSmooth }}
              >
                <p>
                  I&apos;m <span className="text-white font-semibold">{profile.name}</span> — a
                  Senior Mobile App Developer with 2+ years shipping high-performance Flutter
                  and React apps. I care about clean UI, solid architecture, Firebase + REST
                  integrations, and experiences that feel fast on every device.
                </p>
                <p className="text-slate-400 text-sm md:text-base">
                  At <span className="text-cyan-200">Nessfi Tech (Mohali)</span>, I lead the
                  mobile team — architecture decisions, mentoring, and end-to-end delivery for
                  store releases. Earlier at Development Logics (Dharamshala), I built production
                  Flutter UIs and sharpened my craft through hands-on training.
                </p>
                <p className="text-slate-400 text-sm md:text-base">
                  Outside feature work, I obsess over accessibility, reusable components, and
                  motion that guides users instead of distracting them. Open to freelance and
                  full-time collaborations on mobile and web products.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.22, duration: 0.55 }}
            >
              {facts.map((f) => (
                <motion.div
                  key={f.label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-xl border border-cyan-400/15 bg-white/[0.04] px-3 py-3 text-center"
                >
                  <f.icon className="h-4 w-4 text-cyan-300 mx-auto mb-1.5" />
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
                    {f.label}
                  </p>
                  <p className="text-sm font-semibold text-cyan-100">{f.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              {socials.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200 transition-all ${color}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {href.startsWith("http") && (
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  )}
                </a>
              ))}
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.32 }}
            >
              {[
                { icon: Sparkles, text: "15+ apps shipped" },
                { icon: HeartHandshake, text: "Open to collaborate" },
                { icon: MapPin, text: "Based in Mohali" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200"
                >
                  <Icon className="h-4 w-4 text-cyan-300" />
                  {text}
                </span>
              ))}
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, rotateX: -28, y: 28 }}
                  animate={
                    inView
                      ? { opacity: 1, rotateX: 0, y: 0 }
                      : { opacity: 0, rotateX: -20, y: 20 }
                  }
                  transition={{
                    delay: 0.35 + i * 0.1,
                    duration: 0.7,
                    ease: easeSmooth,
                  }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/30 to-violet-500/20 overflow-hidden"
                  style={{ transformStyle: "preserve-3d", perspective: 800 }}
                >
                  <div className="relative h-full rounded-2xl bg-slate-950/95 p-4 backdrop-blur-xl">
                    <div
                      className={`mb-3 inline-flex p-2.5 rounded-xl bg-gradient-to-br ${item.accent}`}
                    >
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">
                      {item.label}
                    </p>
                    <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What I bring */}
            <div>
              <motion.h3
                className="text-lg font-semibold text-white mb-4"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: 0.4 }}
              >
                What I bring to a team
              </motion.h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {strengths.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.55, ease: easeSmooth }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-cyan-400/25 transition-colors"
                  >
                    <div className="mb-2 inline-flex p-2 rounded-lg bg-cyan-500/15 text-cyan-300">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{s.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{s.copy}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
