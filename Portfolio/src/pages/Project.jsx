import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp, lineDraw } from "../hooks/useScrollAnimation";

// ─── Project data ─────────────────────────────────────────
const projectsData = [
  {
    id: "00",
    title: "ReviewFlow AI",
    subtitle: "AI-Powered Review Generation for B2C Businesses",
    description: "Production‑grade SaaS platform enabling businesses to collect authentic Google reviews via QR codes. Features dynamic business‑defined tags, Groq LLM for natural review generation, token‑optimised prompts, QR deferred linking, multi‑location analytics dashboard, and admin portal. Built mobile‑first with PWA support.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "ShadCN UI", "MongoDB", "Redis", "Groq (LLM)", "NextAuth", "Vercel"],
    github: "https://github.com/Shivwhoo/ReviewFlowAI",
    live: "https://github.com/Shivwhoo/ReviewFlow",
    status: "IN DEVELOPMENT",
    accentBg: "var(--violet)",
    image: "/reviewflow-preview.png",
    confession: "The AI sometimes writes reviews that sound too human – we call it 'feature, not bug'."
},
{
    id: "01",
    title: "Autism Care Connect",
    subtitle: "Full‑Stack Platform for Autism & Specially‑Abled Treatment Centers",
    description: "End‑to‑end platform for autism therapy centers – bridges parents and therapists with Google Calendar appointment booking, parent dashboard for session tracking, milestone charts, behavior logs, and therapist notes. Built with accessibility first: voice reading (Web Speech API), dark mode, high contrast, and text size controls. Integrates Razorpay for token payments and Resend for automated email confirmations. Designed with calming pastel UI, soft shadows, and rounded cards – no sensory overload.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion", "Google Calendar API", "Razorpay", "Resend", "JWT", "Web Speech API", "Cloudinary"],
    github: "https://github.com/Shivwhoo/Special-Smile-An-autism-webpage-",
    live: "https://special-smile-an-autism-webpage.vercel.app/",
    status: "COMPLETED",
    accentBg: "var(--pastel-blue)",
    image: "/autism-care-preview.png",
    confession: "Parents cried seeing the milestone chart – we didn't plan for that, but we'll take it."
},
  {
    id: "02",
    title: "Pingster",
    subtitle: "Real-Time Comms Matrix",
    description: "High-performance full-stack chat app. Secure 1-on-1 tunnels, group clusters, live typing, multimedia. Socket.io architecture with a cyberpunk-inspired UX.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Redux", "Cloudinary"],
    github: "https://github.com/Shivwhoo/Pingster",
    live: "https://pingster-opal.vercel.app/",
    status: "DEPLOYED",
    accentBg: "var(--vermilion)",
    image: "/image1.png",
    confession: "I copy-pasted this Socket.io auth logic from a 2022 forum.",
  },
  {
    id: "03",
    title: "EdTraining - An interview assesstment",
    subtitle: "Growth & Learning Platform",
    description: "Production-grade edtech platform: dynamic consultation flows, Razorpay-powered payments, robust validation, and a scalable MERN architecture for student onboarding.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Razorpay", "Tailwind"],
    github: "https://github.com/Shivwhoo/EdTraining",
    live: "https://ed-training.vercel.app/",
    status: "DEPLOYED",
    accentBg: "var(--acid)",
    image: "/image.png",
    confession: "The database validation relies heavily on good vibes.",
  },
  {
    id: "04",
    title: "Blogify",
    subtitle: "Blog Application",
    description: "Full-stack blogging ecosystem — rich-text creation, editing, and interaction. Optimised for speed and SEO. Clean UI with a powerful backend CMS.",
    tech: ["React", "Node.js", "Express", "Tailwind CSS"],
    github: "https://github.com/Shivwhoo/Blogify-React-Node.js",
    live: null,
    status: "LOCAL",
    accentBg: "var(--cream)",
    confession: "Actually built this during a boring college lecture.",
  },
  {
    id: "05",
    title: "Portfolio",
    subtitle: "Personal Brand Engine",
    description: "The very site you're reading. Punk silkscreen aesthetic meets SWE portfolio — letterpress stamps, sticker badges, zine scroll. Built at 2am, shipped by morning.",
    tech: ["React", "Vite", "Framer Motion", "GSAP"],
    github: "https://github.com/Shivwhoo/Portfolio",
    live: "https://portfolio-silk-three-85.vercel.app/",
    status: "LIVE",
    accentBg: "var(--vermilion)",
    confession: "This portfolio was written at 3:00 AM with zero regrets.",
  },
];

// ─── Ink Splatter Constant Motion Overlay ─────────────────
function InkSplatter() {
  const [pos, setPos] = useState({ x: 30, y: 70 });
  const [radius, setRadius] = useState(3.5);

  useEffect(() => {
    let start = null;
    let animId;
    const animateSplatter = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const x = 50 + Math.sin(progress / 1800) * 35;
      const y = 50 + Math.cos(progress / 2200) * 35;
      const r = 2.5 + Math.sin(progress / 900) * 1.2;
      setPos({ x, y });
      setRadius(r);
      animId = requestAnimationFrame(animateSplatter);
    };
    animId = requestAnimationFrame(animateSplatter);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        opacity: 0.09,
      }}
      aria-hidden="true"
    >
      <circle cx={`${pos.x}%`} cy={`${pos.y}%`} r={radius} fill="var(--vermilion)" />
      <circle cx={`${pos.x - 5}%`} cy={`${pos.y + 7}%`} r={radius * 0.4} fill="var(--vermilion)" />
      <circle cx={`${pos.x + 8}%`} cy={`${pos.y - 5}%`} r={radius * 0.3} fill="var(--vermilion)" />
    </svg>
  );
}

// ─── Poster Card ──────────────────────────────────────────
function PosterCard({ project, index, eyesOffset, globalNuke }) {
  const isLight = project.accentBg === "var(--cream)";
  const textOnAccent = "var(--ink)";
  const [isCrumpled, setIsCrumpled] = useState(false);
  const [isRipped, setIsRipped] = useState(false);

  useEffect(() => {
    if (globalNuke) {
      setIsCrumpled(false);
      setIsRipped(false);
    }
  }, [globalNuke]);

  return (
    <motion.div
      animate={
        isCrumpled
          ? { scale: 0.78, rotate: -3, filter: "contrast(1.4) brightness(0.95)" }
          : { scale: 1, rotate: 0, filter: "none" }
      }
      transition={{ type: "spring", stiffness: 320, damping: 14 }}
      style={{
        flex: "0 0 300px",
        width: "300px",
        height: "480px",
        background: "var(--charcoal-2)",
        border: "2.5px solid var(--ink)",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        boxShadow: isCrumpled ? "2px 2px 0 var(--ink)" : "4px 4px 0 var(--ink)",
        scrollSnapAlign: "center",
        transition: "box-shadow 0.2s, clip-path 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        clipPath: isCrumpled
          ? "polygon(0% 12%, 18% 3%, 38% 18%, 52% 8%, 78% 19%, 92% 2%, 100% 18%, 95% 38%, 100% 62%, 94% 82%, 100% 92%, 82% 100%, 62% 92%, 48% 99%, 18% 88%, 2% 98%, 8% 72%, 1% 48%, 10% 28%)"
          : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      {/* Dynamic drifting ink splatter */}
      <InkSplatter />

      {/* Accent header */}
      <div style={{ background: project.accentBg, padding: "1rem 1.25rem 0.75rem", borderBottom: "2px solid var(--ink)", position: "relative", flexShrink: 0 }}>
        {/* Collage Eyes following mouse */}
        <div style={{ display: "flex", gap: "4px", position: "absolute", right: "2.2rem", top: "0.5rem" }}>
          {[0, 1].map((eIdx) => (
            <div key={eIdx} style={{ width: "12px", height: "12px", background: "#fcfbf5", borderRadius: "50%", border: "1px solid var(--ink)", position: "relative", overflow: "hidden" }}>
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  background: "var(--ink)",
                  borderRadius: "50%",
                  position: "absolute",
                  left: `calc(50% - 2px + ${eyesOffset.x}px)`,
                  top: `calc(50% - 2px + ${eyesOffset.y}px)`,
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "5rem", lineHeight: 1, color: "rgba(10,10,10,0.12)", position: "absolute", right: "0.75rem", top: "-0.5rem", letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none" }}>
          {project.id}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: textOnAccent, opacity: 0.7, marginBottom: "0.3rem" }}>
          ◆ {project.status}
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1, color: textOnAccent, margin: 0 }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: textOnAccent, opacity: 0.6, marginTop: "0.2rem" }}>
          {project.subtitle}
        </p>
      </div>

      {/* Image / Confession Body */}
      <div style={{ height: "130px", flexShrink: 0, overflow: "hidden", borderBottom: "1.5px solid var(--ink)", background: "var(--ink)", position: "relative" }}>
        {isRipped ? (
          <div style={{
            width: "100%",
            height: "100%",
            background: "var(--acid)",
            color: "var(--ink)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 800,
            textTransform: "uppercase",
            boxSizing: "border-box",
            lineHeight: 1.4,
          }}>
            <span style={{ color: "var(--vermilion)", fontSize: "0.55rem", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>[ CONFESSION ]</span>
            "{project.confession}"
          </div>
        ) : project.image ? (
          <>
            <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: 0.75, filter: "contrast(1.1)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, ${project.accentBg}30)`, mixBlendMode: "multiply" }} />
          </>
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3rem", color: "rgba(244,237,216,0.04)", textTransform: "uppercase", letterSpacing: "-0.05em" }}>
              {project.title}
            </span>
          </div>
        )}

        {/* Paper Tear Corner Badge */}
        <button
          onClick={() => setIsRipped(!isRipped)}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "30px",
            height: "30px",
            background: isRipped ? "transparent" : "var(--cream)",
            border: "none",
            clipPath: isRipped ? "none" : "polygon(100% 0, 0 0, 100% 100%)",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            padding: "2px",
            boxShadow: "-1px 1px 2px rgba(0,0,0,0.3)",
          }}
          title="Tear open card secret"
        >
          {!isRipped && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "var(--ink)", fontWeight: 900 }}>RIP</span>}
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflow: "hidden" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", lineHeight: 1.7, color: "rgba(244,237,216,0.6)", flexShrink: 0 }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto" }}>
          {project.tech.map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 7px", background: "rgba(255,213,0,0.08)", border: "1px solid rgba(255,213,0,0.3)", color: "var(--acid)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ borderTop: "1.5px solid rgba(244,237,216,0.1)", padding: "0.75rem 1.25rem", display: "flex", gap: "1rem", flexShrink: 0, background: "rgba(10,10,10,0.3)", zIndex: 10 }}>
        <a href={project.github} target="_blank" rel="noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cream)", textDecoration: "none", opacity: 0.6, transition: "opacity 0.15s, color 0.15s", borderBottom: "1px solid transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = "var(--vermilion)"; e.currentTarget.style.borderBottomColor = "var(--vermilion)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.color = "var(--cream)"; e.currentTarget.style.borderBottomColor = "transparent"; }}
        >Source</a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--acid)", textDecoration: "none", opacity: 0.8, transition: "opacity 0.15s", borderBottom: "1px solid transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.borderBottomColor = "var(--acid)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.borderBottomColor = "transparent"; }}
          >↗ Live</a>
        )}

        {/* Crumple trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsCrumpled(true);
            setTimeout(() => setIsCrumpled(false), 800);
          }}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            color: isCrumpled ? "var(--vermilion)" : "rgba(244,237,216,0.35)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: 0,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--vermilion)"; }}
          onMouseLeave={(e) => { if (!isCrumpled) e.currentTarget.style.color = "rgba(244,237,216,0.35)"; }}
        >
          <span>[ CRUMPLE ]</span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────
const Projects = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Global Nuke states
  const [isNuked, setIsNuked] = useState(false);
  const [eyesOffset, setEyesOffset] = useState({ x: 0, y: 0 });

  // 1. Mouse following eyes logic
  useEffect(() => {
    const handleMouse = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setEyesOffset({ x: dx * 4, y: dy * 4 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const triggerNuke = () => {
    setIsNuked(true);
    setTimeout(() => {
      setIsNuked(false);
    }, 1200);
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const BtnStyle = (active) => ({
    width: "44px",
    height: "44px",
    background: active ? "var(--vermilion)" : "transparent",
    border: `2px solid ${active ? "var(--vermilion)" : "rgba(244,237,216,0.2)"}`,
    color: active ? "var(--cream)" : "rgba(244,237,216,0.2)",
    cursor: active ? "pointer" : "default",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-mono)",
    fontSize: "1.1rem",
    transition: "all 0.2s",
  });

  return (
    <div style={{ padding: "3.5rem 0", position: "relative" }}>
      {/* Header */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", marginBottom: "2rem" }}>
        <motion.div {...slideUp}>
          <span className="section-label" style={{ marginBottom: "1rem", display: "inline-flex" }}>The Zine</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3rem, 9vw, 7rem)", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 0.9, color: "var(--cream)" }}>
              Featured<br /><span style={{ color: "var(--vermilion)" }}>Projects</span>
            </h2>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "center" }}>
              {/* Nuke Button */}
              <button
                onClick={triggerNuke}
                style={{
                  padding: "0.75rem 1rem",
                  background: isNuked ? "var(--ink)" : "var(--vermilion)",
                  color: isNuked ? "var(--vermilion)" : "var(--cream)",
                  border: "2px solid var(--ink)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 900,
                  fontSize: "0.68rem",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  boxShadow: "3px 3px 0 var(--ink)",
                  marginRight: "1rem",
                  transition: "all 0.15s",
                }}
              >
                {isNuked ? "CRITICAL METRIC RESET..." : "[ NUKE ALL ]"}
              </button>

              <button onClick={() => scrollBy(-1)} disabled={!canScrollLeft} aria-label="Scroll left" style={BtnStyle(canScrollLeft)}>←</button>
              <button onClick={() => scrollBy(1)} disabled={!canScrollRight} aria-label="Scroll right" style={BtnStyle(canScrollRight)}>→</button>
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(244,237,216,0.3)", letterSpacing: "0.1em", marginTop: "0.5rem" }}>
            Scroll or drag through the zine · Rip corner to reveal card confessions
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        {...lineDraw}
        style={{ ...lineDraw.style, height: "2px", background: "var(--vermilion)", transformOrigin: "left", maxWidth: "1100px", margin: "0 auto 2.5rem", padding: "0 2rem" }}
      />

      {/* Drag scroll track with optional global NUKE shake filter */}
      <motion.div
        ref={scrollRef}
        animate={isNuked ? {
          x: [0, -12, 12, -8, 8, -4, 4, 0],
          y: [0, 8, -8, 4, -4, 2, -2, 0],
          filter: ["contrast(300%) blur(2px) hue-rotate(90deg)", "contrast(100%) blur(0) hue-rotate(0deg)"]
        } : {}}
        transition={{ duration: 1 }}
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          overflowY: "visible",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          padding: "1rem 2rem 2rem",
          paddingLeft: "max(2rem, calc((100vw - 1100px) / 2 + 2rem))",
          cursor: "grab",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          el.style.cursor = "grabbing";
          const startX = e.pageX - el.offsetLeft;
          const scrollLeft = el.scrollLeft;
          const onMove = (me) => { el.scrollLeft = scrollLeft - (me.pageX - el.offsetLeft - startX); };
          const onUp = () => { el.style.cursor = "grab"; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }}
      >
        {projectsData.map((project, i) => (
          <PosterCard
            key={project.id}
            project={project}
            index={i}
            eyesOffset={eyesOffset}
            globalNuke={isNuked}
          />
        ))}
        <div style={{ flex: "0 0 2rem" }} />
      </motion.div>
    </div>
  );
};

export default Projects;
