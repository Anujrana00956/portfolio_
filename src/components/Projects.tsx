"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface IconProps {
  className?: string;
}

// Icon components as SVGs
const ExternalLink = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const Code2 = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const ChevronLeft = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRight = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const User = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CheckCircle = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Sparkles = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const ArrowRight = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const Layers = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const X = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
    status: string;
    category: string;
    gradient: string;
    roles: string[];
    responsibilities: string[];
    appStoreUrl?: string;
    playStoreUrl?: string;
}

export default function Projects() {
  const ref = useRef(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects: Project[] = [
    {
      title: "Amity Staffing",
      description:
        "Amity Staffing is a dedicated mobile app designed for hospice nurses to simplify their daily workflow. It allows users to manage job assignments, track attendance, and maintain visit documentation with ease. The app includes an intuitive calendar for scheduling, along with profile and support features to keep everything organized. By reducing manual work and improving efficiency, Amity Staffing helps nurses focus more on delivering quality patient care.",
      image: "/assets/images/amity_stafing.png",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Git",
        "GitHub",
        "REST APIs",
        "JSON",
        "Google APIs",
      ],
      liveUrl: "https://www.amitystaffing.com",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Mobile App – Flutter Development",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      roles: ["Flutter Developer", "UI/UX Designer", "API Integrator"],
      responsibilities: [
        "Developed a Flutter app with dynamic landing page rendering via REST APIs",
        "Integrated Firebase for real-time data management and authentication",
        "Implemented responsive UI for Android and iOS platforms using Flutter widgets",
        "Handled API calls to automate content updates and data retrieval",
        "Optimized performance and UI consistency across multiple devices",
      ],
      appStoreUrl: "https://apps.apple.com/in/app/amity-staffing/id1600065815",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.osp.staffonboarding",
    },
    {
      title: "AirmyMd",
      description:
        "airmyMD is a healthcare management app that helps patients and doctors connect seamlessly. Users can book appointments, store medical records, and manage payments all in one place. Doctors can track appointments, view patient history, and handle billing efficiently. It’s designed to make healthcare simpler, faster, and more accessible for everyone.",
      image: "/assets/images/airmy_md.png",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Git",
        "GitHub",
        "REST APIs",
        "JSON",
        "Google APIs",
      ],
      liveUrl: "https://airmymd.com",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Mobile App – Flutter Development",
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      roles: [
        "Flutter Developer",
        "UI/UX Engineer",
        "API Integration Specialist",
      ],
      responsibilities: [
        "Developed a Flutter mobile app for healthcare documentation and billing",
        "Integrated Firebase Authentication and Firestore for secure data storage",
        "Implemented Stripe payment integration for subscription and billing",
        "Designed intuitive, responsive UI for seamless nurse and admin usage",
        "Managed push notifications and app state synchronization",
      ],
      appStoreUrl: "https://apps.apple.com/in/app/airmymd/id1228248677",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.airmymd.app",
    },
    {
      title: "AirmyMD:AMM Pass Scanner",
      description:
        "airmyMD: AMM Pass Scanner is a secure mobile tool for verified first responders and EMTs. It scans encrypted AMM Pass QR codes to instantly access critical patient health data during emergencies. The app ensures quick and accurate decision-making when every second matters. Data access is restricted to licensed personnel for complete security.",
      image: "/assets/images/amm_pass.png",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Git",
        "GitHub",
        "REST APIs",
        "JSON",
        "Google APIs",
      ],
      liveUrl: "https://airmymd.com",
      githubUrl: "https://github.com/abhishek-mehta-dev/DocuAI-Pro",
      featured: true,
      status: "Live",
      category: "Mobile App – Flutter Development",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      roles: ["Flutter Developer", "AI Integrator", "Frontend Engineer"],
      responsibilities: [
        "Built a Flutter app integrating AI chat capabilities with document uploads",
        "Implemented Firebase Authentication and Cloud Firestore for data handling",
        "Integrated PayPal APIs for subscription management",
        "Designed a ChatGPT-like responsive interface for mobile users",
        "Optimized the app for cross-platform performance and accessibility",
      ],
      appStoreUrl:
        "https://apps.apple.com/in/app/airmymd-amm-pass-scanner/id6742197065",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.ammpass.live",
    },
    {
      title: "CMDIYOGSHALA",
      description:
        "C.M Di Yogshala (CMDY) is a government initiative by the Punjab administration to promote yoga and meditation across the state. The app connects citizens with certified yoga instructors offering free classes in their local areas. Users can register individually or as groups, schedule sessions, and track attendance seamlessly. CMDY aims to improve both physical and mental well-being while building a mindful, connected community through the daily practice of yoga.",
      image: "/assets/images/cm_di_yogshala.png",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Git",
        "GitHub",
        "REST APIs",
        "JSON",
        "Google APIs",
      ],
      liveUrl: "https://cmdiyogshala.punjab.gov.in",
      githubUrl: "https://github.com/abhishek-mehta-dev/stripe_connect",
      featured: true,
      status: "Live",
      category: "Mobile App – Flutter Development",
      gradient: "from-orange-400 via-amber-500 to-yellow-500",
      roles: [
        "Flutter Developer",
        "Payment Integration Engineer",
        "UI Designer",
      ],
      responsibilities: [
        "Developed a Flutter app for vendor onboarding and payment tracking",
        "Integrated Stripe Connect APIs for secure multi-vendor transactions",
        "Implemented Firebase Cloud Firestore for storing vendor and transaction data",
        "Built responsive layouts compatible with Android and iOS devices",
        "Optimized UI performance and API response handling",
      ],
      appStoreUrl: "https://apps.apple.com/in/app/cm-di-yogshala/id6479694915",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.cmdapp.cmdiyogshala",
    },
    {
      title: "TruGroser – Multi-Vendor Grocery App",
      description:
        "TruGroser is a grocery delivery app designed for smooth and reliable online shopping. It helps users order daily essentials and groceries with fast doorstep delivery. With an easy interface and organized categories, it makes bulk and retail grocery management effortless. TruGroser ensures quality, convenience, and timely service for every order.",
      image: "/assets/images/trugroser.png",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Git",
        "GitHub",
        "REST APIs",
        "JSON",
        "Google APIs",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/abhishek-mehta-dev/stripe_connect",
      featured: true,
      status: "Live",
      category: "Mobile App – Flutter Development",
      gradient: "from-orange-400 via-amber-500 to-yellow-500",
      roles: ["Flutter Developer", "API Integrator", "UI/UX Specialist"],
      responsibilities: [
        "Built responsive cross-platform UI for customers and vendors",
        "Integrated Firebase Authentication, Firestore, and Stripe APIs",
        "Implemented product listing, cart management, and order tracking",
        "Optimized API handling for smooth real-time interactions",
        "Enhanced UI/UX with material design and responsive layouts",
      ],
      appStoreUrl: "https://apps.apple.com/in/app/trugroser/id6738053808",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.trugroser.app",
    },
    {
      title: "VentSpace – Community Sharing App",
      description:
        "VentSpace is a mental wellness app designed to give people a safe and judgment-free space to express their feelings. It allows users to vent through text, audio, or video posts—anonymously or openly—and connect with others who share similar experiences. With dedicated groups and mental health categories, it helps users find relatable communities and supportive conversations. The app also offers access to licensed therapists and educational content, empowering users to understand and improve their mental well-being anytime, anywhere.",
      image: "/assets/images/vent_space.png",
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "Git",
        "GitHub",
        "REST APIs",
        "JSON",
        "Google APIs",
      ],
      liveUrl: "https://ventspaceapp.com",
      githubUrl: "https://github.com/abhishek-mehta-dev/stripe_connect",
      featured: true,
      status: "Live",
      category: "Mobile App – Flutter Development",
      gradient: "from-orange-400 via-amber-500 to-yellow-500",
      roles: [
        "Flutter Developer",
        "UI/UX Engineer",
        "Cross-Platform Specialist",
      ],
      responsibilities: [
        "Developed community-driven Flutter app with real-time updates using Firebase",
        "Implemented anonymous login and secure user management",
        "Designed responsive, accessible, and modern UI for Android and iOS",
        "Handled API integrations for notifications and data retrieval",
        "Ensured performance optimization and smooth cross-platform experience",
      ],
      appStoreUrl: "https://apps.apple.com/us/app/ventspace/id1514627232",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.application.ventspace",
    },
  ];

  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const currentProjectData = projects[currentProject];

  const getStatusConfig = (status: string) => {
    const configs: {[key: string]: {bg: string, text: string, border: string, glow: string}} = {
      Live: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-400",
        border: "border-emerald-500/50",
        glow: "shadow-emerald-500/20",
      },
      Development: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/50",
        glow: "shadow-amber-500/20",
      },
      Completed: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/50",
        glow: "shadow-blue-500/20",
      },
    };
    return configs[status] || configs.Completed;
  };

  const statusConfig = getStatusConfig(currentProjectData.status);

  // Animation variants for better performance
  const cardVariants = {
    enter: { opacity: 0, x: 50, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.98 },
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Optimized background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Simplified floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          {/* Optimized Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300 font-medium">
                Featured Work
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Projects That
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Define Excellence
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Crafting digital experiences with cutting-edge technology and
              innovative solutions
            </p>
          </motion.div>

          {/* Main Project Carousel */}
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 group shadow-xl"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={nextProject}
              className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 group shadow-xl"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Project Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="relative"
              >
                {/* Enhanced Card Design */}
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  {/* Subtle gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${currentProjectData.gradient} opacity-[0.04] pointer-events-none`}
                  />

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />

                  {/* Featured Badge
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-full border border-yellow-400/40 shadow-xl">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-yellow-100 tracking-wide">
                      FEATURED
                    </span>
                  </div> */}

                  {/* Status Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 ${statusConfig.bg} backdrop-blur-xl rounded-full border ${statusConfig.border} shadow-xl ${statusConfig.glow}`}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-red-500" // <-- set red color
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span
                        className={`text-xs font-bold ${statusConfig.text} tracking-wide`}
                      >
                        {currentProjectData.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                 {/* Main Content Grid */}
<div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
 {/* Image Section */}
<div className="relative rounded-2xl overflow-hidden group flex flex-col">
  {/* Image with enhanced hover */}
  <div className="relative w-full h-[380px] md:h-[300px] rounded-2xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950">
      <Image
        src={currentProjectData.image || "/placeholder.svg"}
        alt={currentProjectData.title}
        layout="fill"
        objectFit="cover"
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
      />
    </div>

    {/* Category badge */}
    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">
      <Layers className="h-4 w-4 text-blue-400" />
      <span className="text-sm font-semibold text-white">
        {currentProjectData.category}
      </span>
    </div>
  </div>

  {/* Stats + Buttons below image */}
  <div className="mt-6 space-y-6">
    {/* Example Stats */}
   {(currentProjectData.appStoreUrl || currentProjectData.playStoreUrl) && (
        <div className="grid grid-cols-2 gap-3">
          {currentProjectData.appStoreUrl && (
            <motion.a
              href={currentProjectData.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-black/60 backdrop-blur-sm rounded-xl font-bold text-white text-xs border border-white/20 hover:bg-black/80 hover:border-white/30 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>App Store</span>
            </motion.a>
          )}
          {currentProjectData.playStoreUrl && (
            <motion.a
              href={currentProjectData.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-black/60 backdrop-blur-sm rounded-xl font-bold text-white text-xs border border-white/20 hover:bg-black/80 hover:border-white/30 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <span>Play Store</span>
            </motion.a>
          )}
        </div>
      )}

    {/* Live Demo + App Store Buttons (unchanged) */}
    <motion.a
      href={currentProjectData.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r ${currentProjectData.gradient} rounded-xl font-bold text-white text-sm hover:shadow-2xl transition-all group relative overflow-hidden`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <ExternalLink className="h-4 w-4 relative z-10" />
      <span className="relative z-10">Live Demo</span>
    </motion.a>

    
  </div>
</div>


  {/* Details Section */}
  <div className="flex flex-col justify-between">
    <div>
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
        {currentProjectData.title}
      </h3>
      <p className="text-gray-300 text-base leading-relaxed mb-4 text-justify">
        {currentProjectData.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-3 mb-5">
        {currentProjectData.technologies.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1.5 text-xs font-medium text-gray-100 bg-gray-800/40 
              border border-gray-700 rounded-lg cursor-default
              shadow-[2px_2px_6px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)]
              transform transition-all duration-300 
              hover:scale-105 hover:shadow-[4px_4px_15px_rgba(0,0,0,0.6),-4px_-4px_10px_rgba(255,255,255,0.1)] 
              hover:bg-gray-700/50"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* View Roles Button */}
    <motion.button
      onClick={() => setIsDialogOpen(true)}
      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl font-bold text-white text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
    >
      <User className="h-4 w-4" />
      View Roles & Responsibilities
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
    </motion.button>
  </div>
</div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Page Indicators */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <span className="text-gray-400 font-medium text-sm">
                {currentProject + 1} / {projects.length}
              </span>
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentProject(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentProject
                        ? "w-8 bg-blue-500"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Code2 className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300 font-medium text-sm">
                More Projects Coming Soon
              </span>
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDialogOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 backdrop-blur-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {currentProjectData.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Roles and responsibilities in this project
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                    aria-label="Close dialog"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Roles Section */}
                <div className="mb-8">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    My Roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProjectData.roles.map((role, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 bg-gradient-to-r ${currentProjectData.gradient} rounded-xl text-white text-sm font-bold shadow-lg`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities Section */}
                <div className="mb-8">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Key Responsibilities
                  </h4>
                  <div className="space-y-3">
                    {currentProjectData.responsibilities.map((resp, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm leading-relaxed">
                          {resp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Section */}
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-purple-400" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProjectData.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}