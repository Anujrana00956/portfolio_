"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { profile } from "@/config";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "Hi 👋",
  "Who is Anuj?",
  "What can you do?",
  "Skills?",
  "How to contact?",
];

const WELCOME =
  "Hey! Welcome 👋 I'm Anuj's AI assistant. I can help you explore this portfolio — about him, skills, experience, projects, or how to get in touch. What would you like to know?";

function answer(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings / small talk
  if (/^(hi|hello|hey|yo|hola|namaste|good\s*(morning|afternoon|evening))\b/.test(q)) {
    return "Hey there! 😊 Great to meet you. Want a quick intro to Anuj, his skills, or how to reach him?";
  }
  if (/how are you|how's it going|sup\b|what's up/.test(q)) {
    return "I'm doing great — thanks for asking! Ready to help whenever you are. What are you curious about today?";
  }
  if (/what can you do|help me|assist|options|menu/.test(q)) {
    return "I can tell you about Anuj, his Flutter & React skills, work experience, projects, resume, or contact details. Just ask in plain language — or tap a chip below.";
  }
  if (/thank|thanks|thx|appreciate/.test(q)) {
    return "You're welcome! Happy to help anytime. Need anything else — skills, experience, or contact?";
  }
  if (/bye|goodbye|see you|later|take care/.test(q)) {
    return "Take care! Feel free to come back anytime. Have a great day ✨";
  }
  if (/ok|okay|cool|nice|great|awesome|perfect|sounds good/.test(q)) {
    return "Awesome. If you want next, I can share his skills, experience, or the best way to contact him.";
  }
  if (/joke|funny|bored/.test(q)) {
    return "Why do Flutter developers stay calm? Because everything's already in a widget tree 😄 Want a real answer about Anuj's work next?";
  }
  if (/who are you|your name|are you (a )?bot|ai\b/.test(q)) {
    return "I'm a friendly portfolio assistant for Anuj Rana — here to guide visitors around his work. Not a replacement for him, but I know his highlights well!";
  }

  // About Anuj
  if (/who|about|anuj|yourself|intro|tell me about/.test(q)) {
    return `${profile.name} is a ${profile.title} at Nessfi Tech (${profile.location.name.split(",")[0]}) who leads the mobile team. He builds high-performance Flutter & React apps with clean UI/UX, Firebase, and REST APIs — 2+ years experience, 15+ shipped projects.`;
  }

  // Projects (no DAHN-specific push)
  if (/project|portfolio|case study|work samples|apps?\b/.test(q)) {
    return "Anuj has shipped 15+ apps across healthcare, staffing, commerce, wellness, and more. Scroll to the Projects section for cards, roles, and store links — or ask me about his skills / experience.";
  }

  if (/skill|tech|stack|flutter|react|tool|language/.test(q)) {
    return "Core stack: Flutter, Dart, React, Next.js, TypeScript, Firebase, Node.js, REST APIs, Tailwind, Figma, and Git. Open the Skills section to browse by Mobile, Frontend, Backend, and more.";
  }

  if (/experience|job|career|company|nessfi|journey|work history/.test(q)) {
    return "Currently Senior Mobile App Developer at Nessfi Tech (Mohali) since Oct 1, 2026 — leads the mobile team. Before that: Flutter & React Developer at Nessfi (2024–2026), then Junior Flutter Developer + training at Development Logics (Dharamshala).";
  }

  if (/contact|email|phone|hire|connect|mail|reach|whatsapp/.test(q)) {
    return `Easy! Email: ${profile.email.address} · Phone: ${profile.phone.number} · Location: ${profile.location.name}. You can also use the Contact form on this site — he usually replies within 24 hours.`;
  }

  if (/resume|cv|download/.test(q)) {
    return "You can download his resume from the Home section (Resume button) or the About section. Want the contact details too?";
  }

  if (/location|where|based|city|mohali|live/.test(q)) {
    return `Anuj is based in ${profile.location.name}. Open to remote and on-site collaboration.`;
  }

  if (/available|freelance|open to work|hiring|job offer/.test(q)) {
    return "Yes — he's open to collaborate on freelance and full-time opportunities. Best next step: email him or use the Contact form. I can share the details if you want.";
  }

  if (/linkedin|github|social/.test(q)) {
    return `LinkedIn: ${profile.socials.linkedin} · GitHub: ${profile.socials.github}. Also linked from the About section and the side social rail.`;
  }

  if (/lead|team|senior|manager/.test(q)) {
    return "As Senior Mobile App Developer at Nessfi, Anuj leads the mobile team — architecture, mentoring, and shipping store-ready Flutter releases.";
  }

  // Soft fallback with normal tone
  return "Hmm, I didn't catch that fully — but I'm here to help! Try asking about Anuj, his skills, experience, projects, or how to contact him. Or just say hi 👋";
}

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [welcomed, setWelcomed] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Open and greet on first visit
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("ai-greeted");

    const t = window.setTimeout(() => {
      setOpen(true);
      if (!seen) {
        setTyping(true);
        window.setTimeout(() => {
          setMessages([{ role: "bot", text: WELCOME }]);
          setTyping(false);
          setWelcomed(true);
          sessionStorage.setItem("ai-greeted", "1");
        }, reduced ? 200 : 700);
      } else {
        setMessages([
          {
            role: "bot",
            text: "Welcome back! Need anything — intro, skills, or contact?",
          },
        ]);
        setWelcomed(true);
      }
    }, reduced ? 400 : 1400);

    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: answer(trimmed) }]);
      setTyping(false);
    }, 480 + Math.random() * 420);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="w-[min(92vw,380px)] h-[min(70vh,520px)] rounded-3xl border border-cyan-400/20 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/15 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/20 via-violet-500/15 to-transparent">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white flex items-center gap-1">
                    Portfolio AI <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                  </p>
                  <p className="text-[11px] text-emerald-400">Online · here to help</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-slate-300 hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={`${m.role}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-br-md"
                        : "bg-white/8 border border-white/10 text-slate-200 rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-md px-3 py-2 flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {welcomed && (
              <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                {QUICK.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full border border-cyan-400/20 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-100 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <form
              className="p-3 border-t border-white/10 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Say hi or ask anything…"
                className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="rounded-xl px-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center"
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
        )}
        {open ? (
          <X className="h-6 w-6 relative z-10" />
        ) : (
          <MessageCircle className="h-6 w-6 relative z-10" />
        )}
      </motion.button>
    </div>
  );
}
