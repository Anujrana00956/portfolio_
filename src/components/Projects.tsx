"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

// Icon components as SVGs
const ExternalLink = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Github = ({ className }:any) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Star = ({ className }:any) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const Code2 = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ChevronLeft = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const User = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckCircle = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Sparkles = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ArrowRight = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Layers = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const X = ({ className }:any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Projects() {
  const ref = useRef(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "Automated Landing Page System with Low-Code Workflow Integration",
      description:
        "Built a Node.js server integrated with Bubble.io workflows to capture automation data and render dynamic Webflow landing pages. Delivered a seamless API-driven system to generate and update lead-specific pages automatically.",
      image: "/assets/images/neuropage.png",
      technologies: [
        "Node.js",
        "Express.js",
        "Bubble.io",
        "Webflow",
        "REST API",
        "PM2",
      ],
      liveUrl:
        "https://nuro-page-template.webflow.io/landing-page?leadId=1759236061391x708764271528853000",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Automation & Full-Stack",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      roles: ["Full-Stack Developer", "Automation Engineer"],
      responsibilities: [
        "Developed a Node.js webhook server to capture and process automation data via Bubble.io API connector",
        "Integrated Node.js APIs into Bubble.io backend workflows to receive automation-triggered lead data",
        "Created APIs to serve processed lead data to Webflow for dynamic page rendering",
        "Implemented Webflow dynamic components and symbols to build scalable landing pages",
        "Developed an API to send generated landing page URLs back to Bubble.io for record keeping",
        "Automated workflows between Node.js, Bubble.io, and Webflow for seamless data-driven page creation",
      ],
    },
    {
      title: "DAHN – Hospice Nurse Documentation Support App",
      description:
        "Full-stack Hospice Nurse Documentation application built with MERN stack featuring user authentication, payment integration, and admin dashboard.",
      image: "/assets/images/dahnai.png",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Stripe API",
      ],
      liveUrl: "https://www.dahn.ai",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Full-Stack",
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      roles: ["Full-Stack Developer", "DevOps Engineer"],
      responsibilities: [
        "Built a role-based healthcare web application with Next.js, Node.js, Express.js, and MongoDB",
        "Implemented patient notes system with create, draft, update, and soft-delete features",
        "Integrated Stripe for subscription billing and automated renewals via cron jobs",
        "Developed role-based access control (RBAC) for Admins, Agencies, and Nurses",
        "Added video upload functionality and automated invoice generation",
        "Managed server deployments, monitoring, and scaling on AWS EC2 using PM2",
      ],
    },
    {
      title: "DocuAI Pro",
      description:
        "An AI-powered document chatbot with Retrieval-Augmented Generation (RAG). Features include OAuth authentication, PayPal subscription management, and a ChatGPT-like UI.",
      image: "/assets/images/docuaipro.jpeg",
      technologies: [
        "FastAPI",
        "Next.js",
        "PostgreSQL",
        "PayPal",
        "PyMuPDF",
        "FAISS",
        "LangChain",
        "Hugging Face",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/abhishek-mehta-dev/DocuAI-Pro",
      featured: true,
      status: "Development",
      category: "Fullstack",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      roles: ["AI Engineer", "Backend Developer", "Frontend Developer"],
      responsibilities: [
        "Architected RAG system using LangChain and FAISS for document processing",
        "Built FastAPI backend with efficient document parsing using PyMuPDF",
        "Integrated Hugging Face models for natural language understanding",
        "Developed Next.js frontend with ChatGPT-like conversational interface",
        "Implemented OAuth authentication and PayPal subscription system",
        "Optimized vector search and retrieval for large document collections",
      ],
    },
    {
      title: "Stripe Connect Integration",
      description:
        "Full-featured Stripe Connect application built with Next.js, enabling seamless onboarding, account management, and secure payment flows for multi-vendor platforms.",
      image: "/assets/images/stripe_connect.png",
      technologies: [
        "Next.js",
        "React",
        "Stripe Connect",
        "Node.js",
        "MongoDB",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/abhishek-mehta-dev/stripe_connect",
      featured: true,
      status: "Completed",
      category: "Full-Stack",
      gradient: "from-orange-400 via-amber-500 to-yellow-500",
      roles: [
        "Payment Integration Specialist",
        "Full-Stack Developer",
        "API Developer",
      ],
      responsibilities: [
        "Implemented complete Stripe Connect integration for multi-vendor payments",
        "Built secure onboarding flow for vendor account creation and verification",
        "Developed dashboard for payment management and analytics",
        "Designed responsive frontend using Next.js and React",
        "Integrated MongoDB for storing vendor and transaction data",
      ],
    },
  ];

  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const currentProjectData = projects[currentProject];

  const getStatusConfig = (status:any) => {
    const configs = {
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentProjectData.gradient} opacity-[0.04] pointer-events-none`} />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />

                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-full border border-yellow-400/40 shadow-xl">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-yellow-100 tracking-wide">
                      FEATURED
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className={`flex items-center gap-2 px-4 py-2 ${statusConfig.bg} backdrop-blur-xl rounded-full border ${statusConfig.border} shadow-xl ${statusConfig.glow}`}>
                      <motion.div
                        className={`w-2 h-2 rounded-full ${statusConfig.text.replace("text-", "bg-")}`}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className={`text-xs font-bold ${statusConfig.text} tracking-wide`}>
                        {currentProjectData.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    {/* Image Section */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden group">
                      {/* Image with enhanced hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950">
                        <img
                          src={currentProjectData.image || "/placeholder.svg"}
                          alt={currentProjectData.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        />
                      </div>
                      
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${currentProjectData.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Category badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">
                        <Layers className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-semibold text-white">
                          {currentProjectData.category}
                        </span>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                          {currentProjectData.title}
                        </h3>

                        <p className="text-gray-300 text-base leading-relaxed mb-6">
                          {currentProjectData.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {currentProjectData.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <motion.a
                            href={currentProjectData.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${currentProjectData.gradient} rounded-xl font-bold text-white text-sm hover:shadow-2xl transition-all group relative overflow-hidden`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                          >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <ExternalLink className="h-4 w-4 relative z-10" />
                            <span className="relative z-10">Live Demo</span>
                          </motion.a>

                          <motion.a
                            href={currentProjectData.githubUrl === "#" ? "/oops" : currentProjectData.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-bold text-white text-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </motion.a>
                        </div>

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
                        <span className="text-gray-300 text-sm leading-relaxed">{resp}</span>
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