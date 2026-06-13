import { motion, useScroll, useTransform } from "framer-motion";
import ProjectsSection from "./Project";
import HeroSection from "./Hero";
import TechStack from "./Techstack";
import ContactSection from "./Contact";
import StatsSection from "../features/stats/StatsSection";
import PosterBackground from "../components/InteractiveBackground";
import AboutMe from "../features/about/AboutMe";
import Timeline from "../features/about/Timeline";

// ── Section wrapper — keeps layout static to avoid scroll jitters ──
function SectionReveal({ children, id, style = {} }) {
  return (
    <section
      id={id}
      style={{
        borderTop: "1px solid rgba(244,237,216,0.06)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        color: "var(--cream)",
        background: "var(--charcoal)",
        // NO overflow: hidden here — it kills Lenis
      }}
    >
      {/* Global poster background */}
      <PosterBackground />

      {/* Main content — z-index above background */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <HeroSection />

        {/* ── ABOUT ── */}
        <SectionReveal id="about">
          <AboutMe />
        </SectionReveal>

        {/* ── TECH STACK ── */}
        <SectionReveal id="tech-stack">
          <TechStack />
        </SectionReveal>

        {/* ── STATS ── */}
        <SectionReveal
          id="stats"
          style={{ borderTop: "1px solid rgba(244,237,216,0.06)" }}
        >
          <StatsSection />
        </SectionReveal>

        {/* ── PROJECTS ── */}
        <SectionReveal id="projects">
          <ProjectsSection />
        </SectionReveal>

        {/* ── TIMELINE ── */}
        <Timeline />

        {/* ── CONTACT ── */}
        <ContactSection />

      </div>
    </div>
  );
}