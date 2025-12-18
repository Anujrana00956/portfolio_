"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  User,
  AtSign,
  FileText,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const profile = {
  email: { address: "anujrana2392001@gmail.com" },
  phone: { number: "+91 8219935846" },
  location: { name: "Mohali, Punjab, India" },
};

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // 3D parallax lighting based on mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    springConfig
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      return () => element.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const emailLink = `mailto:${profile.email.address}`;
  const phoneLink = `tel:${profile.phone.number.replace(/\s+/g, "")}`;
  const mapLink = `https://maps.google.com/?q=${encodeURIComponent(
    profile.location.name
  )}`;

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email.address,
      href: emailLink,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone.number,
      href: phoneLink,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location.name,
      href: mapLink,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Anujrana00956",
      label: "GitHub",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/anujrana0754/",
      label: "LinkedIn",
      gradient: "from-blue-500 to-blue-700",
    },
  ];

  // Improved validation
  const validateForm = () => {
    if (!formData.firstName || !formData.email || !formData.message) {
      setError("Please fill all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("access_key", "86b0a064-8ce7-47d2-8b06-4a5b1e345379"); // Web3Forms key
      data.append("name", formData.firstName + " " + formData.lastName);
      data.append("email", formData.email);
      data.append("subject", formData.subject);
      data.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const resultData = await response.json();

      if (resultData.success) {
        setIsSubmitted(true);

        // Confetti animation
        const confetti = document.createElement("div");
        confetti.className =
          "fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50";
        for (let i = 0; i < 20; i++) {
          const piece = document.createElement("div");
          piece.className = "absolute w-2 h-2 rounded-full";
          piece.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
          piece.style.top = `${window.innerHeight}px`;
          piece.style.left = `${Math.random() * window.innerWidth}px`;
          confetti.appendChild(piece);
          piece.animate(
            [
              { transform: "translateY(0)", opacity: 1 },
              {
                transform: `translateY(-${window.innerHeight}px) rotate(${
                  Math.random() * 360
                }deg)`,
                opacity: 0,
              },
            ],
            { duration: 1500 + Math.random() * 1000, fill: "forwards" }
          );
        }
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setError("");
      }, 5000);
    }
  };

  // Real-time email validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-28 bg-slate-950 overflow-hidden"
    >
      {/* Background and sparkles */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(59,130,246,0.25), transparent 70%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.25), transparent 70%)",
          backgroundSize: "200% 200%",
          filter: "blur(80px)",
        }}
      />

      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-400/20 blur-md"
          style={{
            width: 10,
            height: 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let’s Build Something Great
          </h2>
          <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            Whether you have a bold new project, want to collaborate, or simply
            wish to say hi — I’m always open to connecting. Drop me a message
            below and let’s craft something meaningful together. 🚀
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="block"
              >
                <div className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden hover:border-slate-500/60">
                  <div className="relative flex items-center space-x-4">
                    <motion.div
                      className={`p-4 rounded-xl bg-gradient-to-br ${info.gradient}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <info.icon className="text-white h-6 w-6" />
                    </motion.div>
                    <div>
                      <p className="text-slate-400 text-sm">{info.label}</p>
                      <p className="text-white font-semibold text-lg">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <div className="pt-6">
              <h3 className="text-white font-semibold mb-4 text-lg">
                Connect on Socials
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotateY: 360 }}
                    transition={{ duration: 0.7 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${s.gradient} shadow-xl`}
                  >
                    <s.icon className="text-white h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl backdrop-blur-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Clock className="text-green-400 h-6 w-6" />
                </div>
                <div>
                  <p className="text-white font-semibold">Quick Response</p>
                  <p className="text-green-400 text-sm">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            style={{ rotateX, rotateY }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl"
          >
            <motion.div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative z-10 p-8">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mr-3 shadow-lg">
                  <Send className="text-white h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First/Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "firstName", label: "First Name" },
                    { name: "lastName", label: "Last Name" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="text-slate-400 text-sm mb-1 block">
                        {f.label}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-blue-400 h-4 w-4" />
                        <input
                          required={f.name === "firstName"}
                          name={f.name}
                          value={formData[f.name as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [f.name]: e.target.value,
                            })
                          }
                          className="w-full pl-9 pr-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-blue-500 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">
                    Email
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 text-blue-400 h-4 w-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-blue-500 text-white"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">
                    Subject
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-blue-400 h-4 w-4" />
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-blue-500 text-white"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">
                    Message
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-4 text-blue-400 h-4 w-4" />
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-blue-500 text-white resize-none"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center text-red-400 text-sm"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting || isSubmitted || !isEmailValid}
                  type="submit"
                  className="relative w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 opacity-0"
                    whileHover={{ opacity: 0.3, x: ["0%", "100%"] }}
                    transition={{ duration: 1 }}
                  />
                  <div className="flex items-center justify-center relative z-10">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="h-5 w-5 mr-2" />
                        </motion.div>
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" /> Send Message{" "}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
