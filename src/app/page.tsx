import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AIChatBot from "@/components/AIChatBot";
import Marquee from "@/components/motion/Marquee";
import ProjectStrip from "@/components/motion/ProjectStrip";
import SectionBand from "@/components/motion/SectionBand";
import ImpactStrip from "@/components/motion/ImpactStrip";
import FeatureSpotlight from "@/components/motion/FeatureSpotlight";
import GrowthInsight from "@/components/motion/GrowthInsight";
import WorkProcess from "@/components/motion/WorkProcess";
import VerticalSocialRail from "@/components/motion/VerticalSocialRail";
import GoToTop from "@/components/motion/GoToTop";
import PageMotion from "@/components/motion/PageMotion";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CustomCursor from "@/components/motion/CustomCursor";
import MouseSpotlight from "@/components/motion/MouseSpotlight";
import SmoothScroll from "@/components/motion/SmoothScroll";
import HashScroll from "@/components/HashScroll";

/** Single-page portfolio with smooth scroll */
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <SmoothScroll />
      <HashScroll />
      <ScrollProgress />
      <MouseSpotlight />
      <CustomCursor />
      <PageMotion />
      <VerticalSocialRail />
      <GoToTop />
      <Hero />
      <Marquee />
      <About />
      <ImpactStrip />
      <WorkProcess />
      <Skills />
      <Experience />
      <FeatureSpotlight />
      <GrowthInsight />
      <ProjectStrip />
      <Projects />
      <SectionBand />
      <Contact />
      <AIChatBot />
    </div>
  );
}
