"use client";

import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Code,
  Star,
  ArrowRight,
  Sparkles,
  Layers,
  Eye,
  X,
  Send,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Globe,
  Play as PlayStore,
  Smartphone as AppStore,
} from "lucide-react";
import SmokeBackground from "./SmokeBackground";

interface Project {
  id: string;
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
  stats?: {
    downloads?: string;
    users?: string;
    rating?: number;
    year?: string;
  };
}

interface AIMessage {
  id: number;
  text: string;
  sender: "ai" | "user";
  isWelcome?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Amity Staffing",
    description:
      "A comprehensive mobile app designed for hospice nurses to manage job assignments, track attendance, and maintain visit documentation with ease.",
    image: "/assets/images/amity_stafing.png",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "Google APIs"],
    liveUrl: "https://www.amitystaffing.com",
    githubUrl: "#",
    featured: true,
    status: "Live",
    category: "Healthcare",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    roles: ["Flutter Developer", "UI/UX Designer", "API Integrator"],
    responsibilities: [
      "Developed Flutter app with dynamic landing page via REST APIs",
      "Integrated Firebase for real-time data management and authentication",
      "Implemented responsive UI for Android and iOS platforms",
      "Optimized performance across multiple devices",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/amity-staffing/id1600065815",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.osp.staffonboarding",
    stats: {
      downloads: "10K+",
      users: "5K+",
      rating: 4.8,
      year: "2023",
    },
  },
  {
    id: "2",
    title: "AirmyMD",
    description:
      "Healthcare management app connecting patients and doctors seamlessly for appointments, medical records, and payments.",
    image: "/assets/images/airmy_md.png",
    technologies: ["Flutter", "Dart", "Firebase", "Stripe", "REST APIs"],
    liveUrl: "https://airmymd.com",
    githubUrl: "#",
    featured: true,
    status: "Live",
    category: "Healthcare",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    roles: ["Flutter Developer", "UI/UX Engineer", "Payment Integration"],
    responsibilities: [
      "Developed healthcare documentation and billing app",
      "Integrated Firebase Authentication and Stripe payments",
      "Designed intuitive responsive UI for medical professionals",
      "Managed push notifications and data synchronization",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/airmymd/id1228248677",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.airmymd.app",
    stats: {
      downloads: "25K+",
      users: "15K+",
      rating: 4.9,
      year: "2022",
    },
  },
  {
    id: "3",
    title: "CMDI Yogshala",
    description:
      "Government initiative by Punjab administration to promote yoga and meditation across the state with certified instructors.",
    image: "/assets/images/cm_di_yogshala.png",
    technologies: ["Flutter", "Dart", "Firebase", "Government APIs"],
    liveUrl: "https://cmdiyogshala.punjab.gov.in",
    githubUrl: "#",
    featured: true,
    status: "Live",
    category: "Wellness",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    roles: ["Flutter Developer", "Government Integration", "UI Designer"],
    responsibilities: [
      "Built government wellness platform for Punjab citizens",
      "Integrated government APIs for user verification",
      "Implemented group session scheduling and tracking",
      "Designed accessible interface for diverse user base",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/cm-di-yogshala/id6479694915",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.cmdapp.cmdiyogshala",
    stats: {
      downloads: "100K+",
      users: "50K+",
      rating: 4.7,
      year: "2023",
    },
  },
  {
    id: "4",
    title: "VentSpace",
    description:
      "Mental wellness app providing safe space for emotional expression through text, audio, and video posts with community support.",
    image: "/assets/images/vent_space.png",
    technologies: ["Flutter", "Dart", "Firebase", "Real-time Database"],
    liveUrl: "https://ventspaceapp.com",
    githubUrl: "#",
    featured: true,
    status: "Live",
    category: "Wellness",
    gradient: "from-purple-400 via-pink-500 to-rose-600",
    roles: ["Flutter Developer", "Community Features", "Cross-Platform"],
    responsibilities: [
      "Developed community-driven mental wellness platform",
      "Implemented anonymous posting and real-time interactions",
      "Designed safe and accessible UI for mental health support",
      "Integrated therapist consultation features",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/ventspace/id1514627232",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.application.ventspace",
    stats: {
      downloads: "50K+",
      users: "30K+",
      rating: 4.6,
      year: "2022",
    },
  },
  {
    id: "5",
    title: "TruGrocer",
    description:
      "Multi-vendor grocery delivery platform offering seamless online shopping experience with fast doorstep delivery.",
    image: "/assets/images/trugroser.png",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Stripe Connect",
      "Maps API",
    ],
    liveUrl: "/coming-soon",
    githubUrl: "#",
    featured: false,
    status: "Live",
    category: "E-Commerce",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    roles: ["Flutter Developer", "E-Commerce Specialist", "API Integrator"],
    responsibilities: [
      "Built multi-vendor grocery platform with real-time inventory",
      "Integrated Stripe Connect for vendor payment management",
      "Implemented delivery tracking and maps integration",
      "Optimized performance for high-traffic scenarios",
    ],
    appStoreUrl: "https://apps.apple.com/in/app/trugroser/id6738053808",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.trugroser.app",
    stats: {
      downloads: "15K+",
      users: "8K+",
      rating: 4.5,
      year: "2023",
    },
  },
  {
    id: "6",
    title: "AMM Pass Scanner",
    description:
      "Secure QR code scanner for verified first responders to access critical patient health data during emergencies.",
    image: "/assets/images/amm_pass.png",
    technologies: ["Flutter", "Dart", "Firebase", "QR Scanner", "Encryption"],
    liveUrl: "https://airmymd.com",
    githubUrl: "#",
    featured: false,
    status: "Live",
    category: "Emergency Services",
    gradient: "from-red-400 via-pink-500 to-purple-600",
    roles: ["Flutter Developer", "Security Specialist", "AI Integrator"],
    responsibilities: [
      "Built secure emergency medical data access system",
      "Implemented encrypted QR code scanning technology",
      "Integrated AI-powered emergency response features",
      "Ensured HIPAA compliance and data security",
    ],
    appStoreUrl:
      "https://apps.apple.com/in/app/airmymd-amm-pass-scanner/id6742197065",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.ammpass.live",
    stats: {
      downloads: "5K+",
      users: "2K+",
      rating: 4.8,
      year: "2024",
    },
  },
];

const CATEGORIES = [
  "all",
  "Healthcare",
  "E-Commerce",
  "Wellness",
  "Emergency Services",
];

export default function Projects() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showAITip, setShowAITip] = useState(false);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 1,
      text: "👋 Hi! I'm your AI portfolio assistant! How can I help you today?",
      sender: "ai",
      isWelcome: true,
    },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const suggestions = [
    "Tell me about your Flutter projects",
    "What technologies do you use?",
    "How do you approach UI/UX?",
    "Show me healthcare projects",
  ];

  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setShowAITip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [aiMessages, isTyping]);

  const filteredProjects = useMemo(() => 
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter),
    [filter]
  );

  const selectedProject = useMemo(() => 
    PROJECTS.find(p => p.id === selectedProjectId),
    [selectedProjectId]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const handleAISend = (text?: string) => {
    const inputMsg = text || aiInput;
    if (!inputMsg.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now(),
      text: inputMsg,
      sender: "user",
    };

    setAiMessages((prev) => [...prev, userMessage]);
    setAiInput("");
    setIsTyping(true);
    setShowAITip(false);

    // Simulate AI response with portfolio knowledge
    setTimeout(() => {
      const input = inputMsg.toLowerCase();
      const aiResponse: AIMessage = {
        id: Date.now() + 1,
        text: "",
        sender: "ai",
      };

      if (input.includes("flutter") || input.includes("project")) {
        const featured = PROJECTS.filter(p => p.featured).map(p => p.title).join(", ");
        aiResponse.text = `I've developed ${PROJECTS.length}+ production Flutter apps. My featured work includes ${featured}.\n\nI specialize in building healthcare systems, e-commerce platforms, and wellness apps with Flutter, Firebase, and REST APIs.`;
      } else if (input.includes("healthcare")) {
        const healthcare = PROJECTS.filter(p => p.category === "Healthcare").map(p => p.title).join(", ");
        aiResponse.text = `I have extensive experience in Healthcare apps, including: ${healthcare}. These involve real-time data management, HIPAA compliance considerations, and complex job assignment logic.`;
      } else if (
        input.includes("technolog") ||
        input.includes("tech") ||
        input.includes("skill")
      ) {
        aiResponse.text =
          "My core tech stack includes:\n\n🎯 **Frontend**: Flutter, Dart, React\n⚙️ **Backend**: Firebase, Node.js, REST APIs\n🎨 **UI/UX**: Figma, Material Design, Human Interface Guidelines";
      } else if (
        input.includes("design") ||
        input.includes("ui") ||
        input.includes("ux")
      ) {
        aiResponse.text =
          "My UI/UX approach focuses on accessibility and intuitive navigation. I follow iOS Human Interface and Android Material Design guidelines to ensure a native feel across platforms.";
      } else if (
        input.includes("contact") ||
        input.includes("hire")
      ) {
        aiResponse.text =
          "I'm currently open to new opportunities! You can reach me via the contact form below or email me at anujrana.itx@gmail.com.";
      } else {
        aiResponse.text =
          "I can tell you about my Flutter projects, my tech stack, my design process, or my career experience. What would you like to know more about?";
      }

      setAiMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAISend(suggestion);
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen py-24 overflow-hidden bg-slate-950 transition-colors duration-300"
    >
      <SmokeBackground />
      
      {/* Background WebGL-style Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
          <pattern id="projects-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#projects-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="max-w-7xl mx-auto" style={{ y, opacity }}>
          {/* Header Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-bold tracking-widest text-blue-200 uppercase">
                Featured Portfolio
              </span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>

            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Crafting high-performance mobile solutions where functionality 
              meets exceptional design.
            </p>
          </motion.div>

          {/* Enhanced Filter System */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            layout
          >
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`relative px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-500 overflow-hidden border ${
                  filter === category
                    ? "text-white border-transparent"
                    : "text-gray-400 border-white/10 hover:border-blue-500/30 bg-white/5"
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {category === "all" ? "All Works" : category}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Dynamic Grid with Layout Animations */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -12 }}
                  className="group relative"
                >
                  <div className="h-full flex flex-col bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
                    {/* Visual Container */}
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60" />
                      
                      {/* Smoke Animation Overlay */}
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none mix-blend-screen">
                        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/firebolt55439/assets/refs/heads/main/noise.png')] animate-smoke" />
                      </div>

                      {/* Store Icons Overlay - Primary Position */}
                      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        {project.playStoreUrl && (
                          <motion.a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            title="Get on Google Play"
                          >
                            <PlayStore className="h-4 w-4" />
                          </motion.a>
                        )}
                        {project.appStoreUrl && (
                          <motion.a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            title="Download on App Store"
                          >
                            <AppStore className="h-4 w-4" />
                          </motion.a>
                        )}
                      </div>
                      
                      {/* Badges Row */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center pointer-events-none z-20">
                        {project.featured && (
                          <div className="flex items-center gap-2 px-3.5 py-2 bg-blue-600/90 text-white rounded-xl text-[10px] font-black shadow-2xl backdrop-blur-xl border border-blue-400/50">
                            <Star className="h-3 w-3 fill-current" />
                            FEATURED
                          </div>
                        )}

                        <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-500/90 text-white rounded-xl text-[10px] font-black shadow-2xl backdrop-blur-xl border border-emerald-400/50">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          {project.status.toUpperCase()}
                        </div>
                      </div>

                      {/* Interaction Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md bg-slate-950/40">
                        <motion.button
                          onClick={() => setSelectedProjectId(project.id)}
                          className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black flex items-center gap-2 shadow-2xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="h-5 w-5" />
                          Explore Case Study
                        </motion.button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                          <span className="text-[10px] font-black text-blue-100 uppercase tracking-tighter">
                            Growth: {project.stats?.downloads}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
                        {project.description}
                      </p>

                      <div className="mt-auto">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-[10px] font-bold tracking-wider"
                            >
                              {tech.toUpperCase()}
                            </span>
                          ))}
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <div className="flex items-center gap-4">
                            {project.playStoreUrl && (
                              <motion.a
                                href={project.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 text-emerald-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm"
                                whileHover={{ scale: 1.1, y: -2 }}
                                title="Google Play Store"
                              >
                                <PlayStore className="h-5 w-5" />
                              </motion.a>
                            )}
                            {project.appStoreUrl && (
                              <motion.a
                                href={project.appStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                                whileHover={{ scale: 1.1, y: -2 }}
                                title="Apple App Store"
                              >
                                <AppStore className="h-5 w-5" />
                              </motion.a>
                            )}
                          </div>
                          
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-slate-900 rounded-2xl hover:bg-blue-600 hover:text-white border-transparent transition-all duration-300 shadow-xl"
                            whileHover={{ scale: 1.1 }}
                          >
                            <ExternalLink className="h-5 w-5" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-32 p-16 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5 backdrop-blur-3xl rounded-[4rem] border border-white/5 text-center relative overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Looking for a <span className="text-blue-400">Mobile Architect?</span>
            </h3>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg font-medium">
              I specialize in turning complex ideas into seamless mobile experiences. 
              Let&apos;s build something that scales.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black flex items-center gap-3 shadow-2xl"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-6 w-6" />
                Explore Source Code
              </motion.button>
              <motion.button
                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black flex items-center gap-3 shadow-[0_20px_40px_rgba(37,99,235,0.3)]"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Collaborate
                <ArrowRight className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* AI Assistant - Enhanced Tap Experience */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {showAITip && !isAIChatOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white text-slate-950 px-6 py-4 rounded-[2rem] font-bold shadow-2xl border border-white/20 mb-2 relative backdrop-blur-xl"
            >
              <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-white rotate-45" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Ask me about my projects! 👋
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsAIChatOpen(true)}
          className="relative group p-6 bg-white text-slate-950 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden"
          whileHover={{ scale: 1.05, rotate: -3 }}
          whileTap={{ scale: 0.95, rotate: 3 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="relative z-10">
            <Sparkles className="h-8 w-8 text-blue-500 group-hover:animate-spin-slow" />
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute top-0 right-0 p-1">
             <div className="w-3 h-3 bg-blue-500 rounded-full blur-[2px] animate-pulse" />
          </div>
        </motion.button>
      </div>

      {/* AI Chat Modal - Professional Redesign */}
      <AnimatePresence>
        {isAIChatOpen && (
          <motion.div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[60] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAIChatOpen(false)}
          >
            <motion.div
              className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-2xl h-[85vh] max-h-[800px] flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                      <Cpu className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Anuj&apos;s AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active & Ready</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsAIChatOpen(false)}
                  className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* Chat Viewport */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
              >
                {aiMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex items-end gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {message.sender === "ai" && (
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-5 rounded-[1.5rem] text-[15px] font-medium leading-relaxed ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-500/20"
                          : "bg-white/5 text-gray-200 border border-white/10 rounded-bl-none"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.text}</div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-[1.5rem] rounded-bl-none">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-blue-500/40 rounded-full"
                            animate={{ scale: [1, 1.4, 1], backgroundColor: ["rgba(37,99,235,0.4)", "rgba(37,99,235,1)", "rgba(37,99,235,0.4)"] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Interaction Footer */}
              <div className="p-8 bg-white/[0.02] border-t border-white/5">
                {/* Suggestions */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 border border-white/10 rounded-xl text-[11px] font-black tracking-wide transition-all shadow-sm"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 relative group">
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAISend()}
                      placeholder="Ask me anything about my projects..."
                      className="w-full bg-slate-800 text-white placeholder-gray-500 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-blue-500/10 border border-white/10 transition-all font-medium shadow-inner"
                    />
                  </div>
                  <motion.button
                    onClick={() => handleAISend()}
                    disabled={isTyping || !aiInput.trim()}
                    className="p-5 bg-blue-600 text-white rounded-2xl disabled:opacity-50 shadow-xl shadow-blue-500/30 flex items-center justify-center"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProjectId && selectedProject && (
          <motion.div
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[70] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProjectId(null)}
          >
            <motion.div
              className="bg-slate-900 border border-white/10 rounded-[4rem] max-w-6xl w-full h-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_100px_200px_rgba(0,0,0,0.9)]"
              initial={{ scale: 0.95, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full overflow-y-auto scrollbar-hide p-8 sm:p-12">
                {/* Header/Hero within modal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <button
                      onClick={() => setSelectedProjectId(null)}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl transition-all font-bold border border-white/10"
                    >
                      <X className="h-5 w-5" />
                      Back to Gallery
                    </button>

                    <div className="space-y-4">
                      <span className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl">
                        {selectedProject.category}
                      </span>
                      <h2 className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tighter">
                        {selectedProject.title}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10">
                        <Star className="h-6 w-6 text-blue-500 fill-current" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">User Rating</span>
                          <span className="text-xl font-black text-white">{selectedProject.stats?.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10">
                        <TrendingUp className="h-6 w-6 text-emerald-400" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Growth</span>
                          <span className="text-xl font-black text-white">{selectedProject.stats?.downloads}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xl leading-relaxed font-medium">
                      {selectedProject.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-6 bg-blue-600 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-2xl text-lg"
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Globe className="h-6 w-6" />
                        Live Interface
                      </motion.a>
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 text-lg"
                        whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="h-6 w-6" />
                        Architecture
                      </motion.a>
                    </div>

                    {/* Store Buttons in Detail Modal */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {selectedProject.playStoreUrl && (
                        <motion.a
                          href={selectedProject.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-8 py-4 bg-[#00875f] text-white rounded-[1.5rem] font-bold shadow-xl"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PlayStore className="h-6 w-6" />
                          Google Play
                        </motion.a>
                      )}
                      {selectedProject.appStoreUrl && (
                        <motion.a
                          href={selectedProject.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-900 rounded-[1.5rem] font-bold shadow-xl"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <AppStore className="h-6 w-6" />
                          App Store
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Showcase Image */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="mt-24 space-y-24 pb-12">
                  <section>
                    <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 rounded-2xl">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      </div>
                      The Engineering Impact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedProject.responsibilities.map((resp, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group"
                        >
                          <div className="mt-1 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform shrink-0" />
                          <p className="text-gray-300 font-bold leading-relaxed">{resp}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
                      <div className="p-3 bg-purple-500/10 rounded-2xl">
                        <Layers className="h-8 w-8 text-purple-500" />
                      </div>
                      Core Infrastructure
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.technologies.map((tech, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -5, scale: 1.05 }}
                          className="px-8 py-5 bg-slate-950 border border-white/5 rounded-[2rem] flex items-center gap-4 hover:border-blue-500/50 transition-all shadow-xl"
                        >
                          <Code className="h-6 w-6 text-blue-400" />
                          <span className="text-white font-black tracking-wide text-lg">{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
