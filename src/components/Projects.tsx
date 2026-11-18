"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { easeSmooth } from "@/lib/motion";

interface IconProps {
  className?: string;
}

const User = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckCircle = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const X = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowUpRight = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const ExternalLink = ({ className }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const AppStoreIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PlayStoreIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
  </svg>
);

interface Project {
  title: string;
  client: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  status: string;
  category: string;
  filter: string;
  accent: string;
  roles: string[];
  responsibilities: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
}

const projects: Project[] = [
  {
    title: "Expert Intelligence for Hospice Documentation",
    client: "DAHN",
    description:
      "DAHN is a secure, HIPAA-compliant Flutter app that helps hospice nurses create clear, professional visit notes in minutes. Powered by expert intelligence—not generative AI—it streamlines documentation so nurses can spend less time charting and more time caring.",
    image: "/assets/images/dahnai.png",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "HIPAA"],
    liveUrl: "https://getdahn.com/",
    status: "Live",
    category: "Healthcare · Flutter",
    filter: "Healthcare",
    accent: "from-rose-500 to-orange-400",
    roles: ["Flutter Developer", "UI/UX Designer", "API Integrator"],
    responsibilities: [
      "Built a HIPAA-conscious Flutter app for hospice visit documentation",
      "Implemented secure authentication and agency-based login flows",
      "Designed a fast note-building workflow guided by clinical expertise",
      "Integrated REST APIs for visit criteria, notes, and subscription access",
      "Shipped polished App Store and Play Store releases",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/dahn/id6739704826",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.dahn.live",
  },
  {
    title: "Modernizing Healthcare Staffing Operations",
    client: "Amity Staffing",
    description:
      "A dedicated mobile app for hospice nurses to manage job assignments, track attendance, and maintain visit documentation—reducing manual work so nurses can focus on patient care.",
    image: "/assets/images/amity_stafing.png",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs"],
    liveUrl: "https://www.amitystaffing.com",
    status: "Live",
    category: "Healthcare · Flutter",
    filter: "Healthcare",
    accent: "from-emerald-400 to-teal-500",
    roles: ["Flutter Developer", "UI/UX Designer", "API Integrator"],
    responsibilities: [
      "Developed Flutter app with dynamic content via REST APIs",
      "Integrated Firebase for auth and real-time data",
      "Built responsive UI for Android and iOS",
      "Optimized performance across devices",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/amity-staffing/id1600065815",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.osp.staffonboarding",
  },
  {
    title: "Connecting Patients and Doctors Seamlessly",
    client: "AirmyMd",
    description:
      "A healthcare management app for booking appointments, storing medical records, and managing payments—designed to make care simpler and more accessible.",
    image: "/assets/images/airmy_md.png",
    technologies: ["Flutter", "Dart", "Firebase", "Stripe"],
    liveUrl: "https://airmymd.com",
    status: "Live",
    category: "Healthcare · Flutter",
    filter: "Healthcare",
    accent: "from-blue-400 to-indigo-500",
    roles: ["Flutter Developer", "UI/UX Engineer"],
    responsibilities: [
      "Built healthcare documentation and billing flows",
      "Integrated Firebase Auth and Firestore",
      "Implemented Stripe payments",
      "Designed intuitive nurse and admin UI",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/airmymd/id1228248677",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.airmymd.app",
  },
  {
    title: "Emergency Access to Critical Patient Data",
    client: "AMM Pass Scanner",
    description:
      "A secure scanner for verified first responders and EMTs to read encrypted AMM Pass QR codes and instantly access critical patient health data.",
    image: "/assets/images/amm_pass.png",
    technologies: ["Flutter", "QR Scanning", "Firebase"],
    liveUrl: "https://airmymd.com",
    status: "Live",
    category: "Emergency · Flutter",
    filter: "Healthcare",
    accent: "from-violet-400 to-fuchsia-500",
    roles: ["Flutter Developer", "Security-Focused Engineer"],
    responsibilities: [
      "Built secure QR scanning for encrypted AMM Pass access",
      "Restricted access to licensed first responders",
      "Optimized for field use on Android and iOS",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/airmymd-amm-pass-scanner/id6742197065",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ammpass.live",
  },
  {
    title: "Statewide Yoga & Meditation Platform",
    client: "CM Di Yogshala",
    description:
      "A Punjab government initiative connecting citizens with certified yoga instructors for free local classes—with registration, scheduling, and attendance tracking.",
    image: "/assets/images/cm_di_yogshala.png",
    technologies: ["Flutter", "Firebase", "REST APIs"],
    liveUrl: "https://cmdiyogshala.punjab.gov.in",
    status: "Live",
    category: "GovTech · Flutter",
    filter: "GovTech",
    accent: "from-amber-400 to-orange-500",
    roles: ["Flutter Developer", "UI Designer"],
    responsibilities: [
      "Built citizen and instructor booking flows",
      "Integrated Firebase for auth and attendance",
      "Shipped statewide Android and iOS releases",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/cm-di-yogshala/id6479694915",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.cmdapp.cmdiyogshala",
  },
  {
    title: "Multi-Vendor Grocery Delivery",
    client: "TruGroser",
    description:
      "A grocery delivery app for everyday essentials with organized categories, cart flows, and reliable doorstep delivery.",
    image: "/assets/images/trugroser.png",
    technologies: ["Flutter", "Firebase", "Stripe"],
    liveUrl: "/coming-soon",
    status: "Live",
    category: "E-commerce · Flutter",
    filter: "Commerce",
    accent: "from-lime-400 to-emerald-500",
    roles: ["Flutter Developer", "API Integrator"],
    responsibilities: [
      "Built customer and vendor UI flows",
      "Integrated cart, orders, and payments",
      "Optimized real-time API handling",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/trugroser/id6738053808",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.trugroser.app",
  },
  {
    title: "Safe Space for Mental Wellness",
    client: "VentSpace",
    description:
      "A mental wellness community where people can vent through text, audio, or video—and connect with supportive groups and licensed therapists.",
    image: "/assets/images/vent_space.png",
    technologies: ["Flutter", "Firebase", "Realtime"],
    liveUrl: "https://ventspaceapp.com",
    status: "Live",
    category: "Mental Health · Flutter",
    filter: "Wellness",
    accent: "from-sky-400 to-cyan-500",
    roles: ["Flutter Developer", "UI/UX Engineer"],
    responsibilities: [
      "Built community app with Firebase realtime updates",
      "Implemented anonymous login",
      "Designed accessible modern UI",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/ventspace/id1514627232",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.application.ventspace",
  },
];

const filters = ["All", "Healthcare", "GovTech", "Commerce", "Wellness"];

function ProjectCard({
  project,
  index,
  onOpenRoles,
}: {
  project: Project;
  index: number;
  onOpenRoles: () => void;
}) {
  const ref = useRef(null);
  // Replay + reverse every time the card enters / leaves view
  const inView = useInView(ref, { once: false, amount: 0.28, margin: "-8% 0px" });
  const reversed = index % 2 === 1;
  const mediaX = reversed ? 48 : -48;
  const copyX = reversed ? -40 : 40;

  return (
    <motion.article
      ref={ref}
      className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center"
    >
      <motion.div
        className={`lg:col-span-7 group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 backdrop-blur-sm ${
          reversed ? "lg:order-2" : ""
        }`}
        initial={false}
        animate={
          inView
            ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 }
            : { opacity: 0, x: mediaX, y: 28, filter: "blur(10px)", scale: 0.97 }
        }
        transition={{ duration: 0.85, ease: easeSmooth }}
        whileHover={{ y: -4 }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.client}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur border border-white/15">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-white">{project.status}</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 backdrop-blur text-white text-xs font-semibold border border-white/15 hover:bg-black/90"
              >
                <AppStoreIcon className="h-4 w-4" />
                App Store
              </a>
            )}
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 backdrop-blur text-white text-xs font-semibold border border-white/15 hover:bg-black/90"
              >
                <PlayStoreIcon className="h-4 w-4" />
                Play Store
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`lg:col-span-5 space-y-4 ${reversed ? "lg:order-1" : ""}`}
        initial={false}
        animate={
          inView
            ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
            : { opacity: 0, x: copyX, y: 20, filter: "blur(8px)" }
        }
        transition={{ duration: 0.8, delay: inView ? 0.08 : 0, ease: easeSmooth }}
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400 mb-2">
            {String(index + 1).padStart(2, "0")} · {project.category}
          </p>
          <p className={`text-sm font-bold bg-gradient-to-r ${project.accent} bg-clip-text text-transparent mb-1`}>
            {project.client}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium text-slate-200 border border-white/10 bg-white/5 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${project.accent} text-white text-sm font-bold hover:opacity-90 transition-opacity`}
          >
            View project
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onOpenRoles}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            <User className="h-4 w-4" />
            Roles
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects({
  featured = false,
  limit,
}: {
  /** Home teaser — fewer cards + link to /work */
  featured?: boolean;
  limit?: number;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, amount: 0.4 });

  const filtered = useMemo(() => {
    const base =
      featured || activeFilter === "All"
        ? projects
        : projects.filter((p) => p.filter === activeFilter);
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [activeFilter, featured, limit]);

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[110px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={headerRef}
          className="max-w-3xl mb-10 md:mb-14"
          initial={false}
          animate={
            headerInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 36, filter: "blur(8px)" }
          }
          transition={{ duration: 0.9, ease: easeSmooth }}
        >
          <p className="text-sm font-semibold tracking-[0.22em] uppercase text-cyan-300/80 mb-3">
            {featured ? "Featured work" : "Case Studies"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {featured ? "Projects worth" : "Projects that solve real"}
            <span className="block text-slate-400">
              {featured ? "a closer look" : "business challenges"}
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {featured
              ? "A few highlights — open store links, or browse the full case studies on Work."
              : "Filter by category, open store links, or tap Roles for what I built."}
          </p>
        </motion.div>

        {!featured && (
          <div
            className="flex flex-wrap gap-2 mb-12 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-fit max-w-full"
            role="tablist"
            aria-label="Project filters"
          >
            {filters.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={featured ? "featured" : activeFilter}
            className="space-y-16 md:space-y-24"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: easeSmooth }}
          >
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.client}
                project={project}
                index={index}
                onOpenRoles={() => setActiveProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="bg-slate-950 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div>
                    <p className={`text-sm font-bold bg-gradient-to-r ${activeProject.accent} bg-clip-text text-transparent mb-1`}>
                      {activeProject.client}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Roles & responsibilities
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-lg"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-cyan-400" />
                    My roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.roles.map((role) => (
                      <span
                        key={role}
                        className={`px-3 py-1.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r ${activeProject.accent}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    Key responsibilities
                  </h4>
                  <div className="space-y-2">
                    {activeProject.responsibilities.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 text-sm font-bold hover:bg-slate-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit site
                  </a>
                  {activeProject.appStoreUrl && (
                    <a
                      href={activeProject.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5"
                    >
                      <AppStoreIcon className="h-4 w-4" />
                      App Store
                    </a>
                  )}
                  {activeProject.playStoreUrl && (
                    <a
                      href={activeProject.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5"
                    >
                      <PlayStoreIcon className="h-4 w-4" />
                      Play Store
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
