"use client";

import type { ReactNode } from "react";
import AIChatBot from "@/components/AIChatBot";
import VerticalSocialRail from "@/components/motion/VerticalSocialRail";
import GoToTop from "@/components/motion/GoToTop";
import PageMotion from "@/components/motion/PageMotion";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CustomCursor from "@/components/motion/CustomCursor";
import MouseSpotlight from "@/components/motion/MouseSpotlight";

/** Shared chrome for multi-page routes (/about, /work) */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <ScrollProgress />
      <MouseSpotlight />
      <CustomCursor />
      <PageMotion />
      <VerticalSocialRail />
      <GoToTop />
      {children}
      <AIChatBot />
    </div>
  );
}
