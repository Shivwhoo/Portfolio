import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { slideUp, lineDraw } from "../hooks/useScrollAnimation";

// ─── Tech data ────────────────────────────────────────────
const skills = [
  // ── Languages ──────────────────────────────────────────
  { name: "C++",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",        cat: "Lang" },
  { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",              cat: "Lang" },
  { name: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",     cat: "Lang" },
  { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",     cat: "Lang" },

  // ── Frontend ───────────────────────────────────────────
  { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",               cat: "Frontend" },
  { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",             cat: "Frontend", invert: true },
  { name: "Tailwind",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",   cat: "Frontend" },
  { name: "Framer",      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/framer.svg",                            cat: "Frontend", invert: true },
  { name: "Redux",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",               cat: "Frontend" },
  { name: "Vite",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",             cat: "Frontend" },
  { name: "HTML5",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",               cat: "Frontend" },
  { name: "CSS3",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",                 cat: "Frontend" },

  // ── Backend ────────────────────────────────────────────
  { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",             cat: "Backend" },
  { name: "Express",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",           cat: "Backend", invert: true },
  { name: "Socket.io",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",  cat: "Backend" },
  { name: "GSAP",        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/greensock.svg",                        cat: "Backend", invert: true },
  { name: "JWT",         icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/jsonwebtokens.svg",                    cat: "Backend", invert: true },
  { name: "Razorpay",    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/razorpay.svg",                         cat: "Backend", invert: true },

  // ── DB / Cloud / Tools ─────────────────────────────────
  { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",           cat: "DB/Cloud" },
  { name: "Redis",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",               cat: "DB/Cloud" },
  { name: "MySQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",               cat: "DB/Cloud" },
  { name: "Cloudinary",  icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/cloudinary.svg",                       cat: "DB/Cloud", invert: true },
  { name: "Vercel",      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/vercel.svg",                           cat: "DB/Cloud", invert: true },
  { name: "Resend",      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/resend.svg",                           cat: "DB/Cloud", invert: true },
  { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                   cat: "DB/Cloud" },
  { name: "GitHub",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",             cat: "DB/Cloud", invert: true },
];

const ACCENTS = ["var(--vermilion)", "var(--acid)", "var(--cream)"];

// ─── Dot-stamp effect ─────────────────────────────────────
function DotStamp({ x, y, id, onDone }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0.7, scale: 0.5 }}
      animate={{ opacity: 0, scale: 2.5 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      onAnimationComplete={onDone}
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: 60,
        height: 60,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage:
          "radial-gradient(circle, var(--ink) 1.5px, transparent 1.5px)",
        backgroundSize: "8px 8px",
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
}

// ─── Single magnetic badge ────────────────────────────────
function MagneticBadge({ skill, index, cursorRef, sectionRef, onStamp }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const badgeRef = useRef(null);

  // Spring-controlled translate & rotate
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRot = useMotionValue(0);

  const springCfg = { stiffness: 160, damping: 22, mass: 0.6 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);
  const rot = useSpring(rawRot, { stiffness: 120, damping: 20, mass: 0.5 });

  // Hover state
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(false);

  // Magnetic pull: runs on each rAF tick driven by parent
  const updateMagnet = useCallback(() => {
    if (!badgeRef.current || !sectionRef.current) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const rect = badgeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cursor.x - cx;
    const dy = cursor.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Influence radius: 280px; max pull: 4px
    const MAX_PULL = 4;
    const RADIUS = 280;
    const strength = Math.max(0, 1 - dist / RADIUS);

    rawX.set(dx * strength * (MAX_PULL / Math.max(dist, 1)) * Math.min(dist, RADIUS));
    rawY.set(dy * strength * (MAX_PULL / Math.max(dist, 1)) * Math.min(dist, RADIUS));
    rawRot.set(dx * strength * 0.04); // gentle tilt toward cursor
  }, [cursorRef, sectionRef, rawX, rawY, rawRot]);

  // Listen for section-level rAF updates
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handler = () => updateMagnet();
    el.addEventListener("_magneticTick", handler);
    return () => el.removeEventListener("_magneticTick", handler);
  }, [updateMagnet, sectionRef]);

  const handleMouseEnter = () => {
    setHovered(true);
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
    rawRot.set(0);
  };

  const handleClick = (e) => {
    onStamp(e.clientX, e.clientY);
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x,
        y: hovered
          ? useSpring(useMotionValue(-4), springCfg) // lift on hover handled below
          : y,
        rotate: rot,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.875rem 1rem",
        background: "var(--cream)",
        color: "var(--ink)",
        border: "2.5px solid var(--ink)",
        outline: `1.5px solid ${accent}`,
        outlineOffset: "2px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 0 0 2px var(--vermilion), 4px 6px 0 var(--ink)"
          : "2px 3px 0 var(--ink)",
        willChange: "transform",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Category tag */}
      <span
        style={{
          position: "absolute",
          top: "-9px",
          left: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.48rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          background: accent,
          color: "var(--ink)",
          padding: "1px 5px",
          fontWeight: 700,
          zIndex: 5,
        }}
      >
        {skill.cat}
      </span>

      {/* Ink ripple on hover */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key="ripple"
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "var(--vermilion)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <img
        src={skill.icon}
        alt={skill.name}
        style={{
          width: "36px",
          height: "36px",
          objectFit: "contain",
          filter: skill.invert ? "invert(1)" : "none",
          pointerEvents: "none",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink)",
          fontWeight: 600,
          whiteSpace: "nowrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─── Lifted-badge wrapper that separates hover-y cleanly ──
function BadgeWrapper({ skill, index, cursorRef, sectionRef, onStamp }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const badgeRef = useRef(null);

  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const rawRot = useMotionValue(0);

  const springCfg = { stiffness: 160, damping: 22, mass: 0.6 };
  const x   = useSpring(rawX,   springCfg);
  const y   = useSpring(rawY,   { stiffness: 160, damping: 22, mass: 0.6 });
  const rot = useSpring(rawRot, { stiffness: 120, damping: 20, mass: 0.5 });

  const [hovered, setHovered]   = useState(false);
  const [ripple,  setRipple]    = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  // Drive magnetic pull from section events
  const updateMagnet = useCallback(() => {
    if (!badgeRef.current || !sectionRef.current) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const rect  = badgeRef.current.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = cursor.x - cx;
    const dy    = cursor.y - cy;
    const dist  = Math.sqrt(dx * dx + dy * dy);

    const MAX_PULL = 4;
    const RADIUS   = 260;
    const norm     = Math.max(dist, 1);
    const strength = Math.max(0, 1 - dist / RADIUS);

    rawX.set((dx / norm) * strength * Math.min(dist, RADIUS) * (MAX_PULL / RADIUS));
    rawY.set((dy / norm) * strength * Math.min(dist, RADIUS) * (MAX_PULL / RADIUS));
    rawRot.set((dx / norm) * strength * 3); // max ±3deg tilt
  }, [cursorRef, sectionRef, rawX, rawY, rawRot]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = () => updateMagnet();
    el.addEventListener("_magneticTick", handler);
    return () => el.removeEventListener("_magneticTick", handler);
  }, [updateMagnet, sectionRef]);

  const handleMouseEnter = () => {
    setHovered(true);
    setRipple(true);
    setRippleKey(k => k + 1);
    rawY.set(-4); // lift
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRipple(false);
    rawX.set(0);
    rawY.set(0);
    rawRot.set(0);
  };

  const handleClick = (e) => {
    onStamp(e.clientX, e.clientY);
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.038, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x,
        y,
        rotate: rot,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.875rem 1rem",
        background: "var(--cream)",
        color: "var(--ink)",
        border: "2.5px solid var(--ink)",
        outline: `1.5px solid ${accent}`,
        outlineOffset: "2px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 0 0 2px var(--vermilion), 4px 6px 0 var(--ink)"
          : "2px 3px 0 var(--ink)",
        willChange: "transform",
        transition: "box-shadow 0.25s ease",
      }}
    >
      {/* Category tag */}
      <span
        style={{
          position: "absolute",
          top: "-9px",
          left: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.48rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          background: accent,
          color: "var(--ink)",
          padding: "1px 5px",
          fontWeight: 700,
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        {skill.cat}
      </span>

      {/* Ink ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={`ripple-${rippleKey}`}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "var(--vermilion)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <img
        src={skill.icon}
        alt={skill.name}
        style={{
          width: "36px",
          height: "36px",
          objectFit: "contain",
          filter: skill.invert ? "invert(1)" : "none",
          pointerEvents: "none",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink)",
          fontWeight: 600,
          whiteSpace: "nowrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─── Tech Stack Section ───────────────────────────────────
const TechStack = () => {
  const sectionRef = useRef(null);
  const cursorRef  = useRef({ x: 0, y: 0 });
  const rafRef     = useRef(null);
  const insideRef  = useRef(false);

  const [stamps,   setStamps]   = useState([]);
  const [stampId,  setStampId]  = useState(0);
  const [tickerHovered, setTickerHovered] = useState(false);

  // Drive a shared rAF tick while cursor is inside section
  const startTick = useCallback(() => {
    if (rafRef.current) return;
    const tick = () => {
      if (!insideRef.current) {
        rafRef.current = null;
        return;
      }
      sectionRef.current?.dispatchEvent(new Event("_magneticTick"));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopTick = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    cursorRef.current = { x: e.clientX, y: e.clientY };
    if (!insideRef.current) {
      insideRef.current = true;
      startTick();
    }
  }, [startTick]);

  const handleMouseLeave = useCallback(() => {
    insideRef.current = false;
    stopTick();
  }, [stopTick]);

  useEffect(() => () => stopTick(), [stopTick]);

  const handleStamp = useCallback((cx, cy) => {
    const id = stampId;
    setStampId(p => p + 1);
    setStamps(prev => [...prev, { id, x: cx, y: cy }]);
  }, [stampId]);

  const removeStamp = useCallback((id) => {
    setStamps(prev => prev.filter(s => s.id !== id));
  }, []);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ padding: "3.5rem 2rem", position: "relative" }}
    >
      {/* Dot stamps portal (fixed, above everything) */}
      <AnimatePresence>
        {stamps.map(s => (
          <DotStamp
            key={s.id}
            id={s.id}
            x={s.x}
            y={s.y}
            onDone={() => removeStamp(s.id)}
          />
        ))}
      </AnimatePresence>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div {...slideUp} style={{ marginBottom: "2.5rem" }}>
          <span className="section-label" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            The Arsenal
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(3rem, 9vw, 7rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                color: "var(--cream)",
              }}
            >
              Tech<br />
              <span style={{ color: "var(--vermilion)" }}>Stack</span>
            </h2>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(4rem, 12vw, 10rem)",
                color: "rgba(244,237,216,0.04)",
                lineHeight: 1,
                userSelect: "none",
                letterSpacing: "-0.05em",
              }}
            >
              {String(skills.length).padStart(2, "0")}
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(244,237,216,0.35)", letterSpacing: "0.1em", marginTop: "1rem" }}>
            Hover to attract · Click to stamp · Magnetic spring physics
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          {...lineDraw}
          style={{ ...lineDraw.style, height: "2px", background: "var(--vermilion)", transformOrigin: "left", marginBottom: "2rem" }}
        />

        {/* Badge grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            minHeight: "220px",
          }}
        >
          {skills.map((skill, i) => (
            <BadgeWrapper
              key={skill.name}
              skill={skill}
              index={i}
              cursorRef={cursorRef}
              sectionRef={sectionRef}
              onStamp={handleStamp}
            />
          ))}
        </div>

        {/* Hacker Ticker Bar — quieter */}
        <div
          style={{
            marginTop: "3rem",
            borderTop: "1px solid rgba(244,237,216,0.07)",
            paddingTop: "0.75rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
            position: "relative",
            cursor: "default",
          }}
          onMouseEnter={() => setTickerHovered(true)}
          onMouseLeave={() => setTickerHovered(false)}
        >
          <AnimatePresence mode="wait">
            {tickerHovered ? (
              <motion.span
                key="halt"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--vermilion)",
                }}
              >
                [ SYS: MAGNETIC FIELD ACTIVE. BADGES ALIGNED. ]
              </motion.span>
            ) : (
              <motion.div
                key="scroll"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 22, repeat: Infinity }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "rgba(244,237,216,0.22)",
                }}
              >
                {/* Doubled for seamless loop */}
                SYSTEM SCAN ACTIVE&nbsp;·&nbsp;PORT 1977 OPEN&nbsp;·&nbsp;MERN STACK VERIFIED&nbsp;·&nbsp;CORE ALIVE&nbsp;·&nbsp;MAGNETIC FIELD ENGAGED&nbsp;·&nbsp;ALL BADGES RESPONDING&nbsp;·&nbsp;
                SYSTEM SCAN ACTIVE&nbsp;·&nbsp;PORT 1977 OPEN&nbsp;·&nbsp;MERN STACK VERIFIED&nbsp;·&nbsp;CORE ALIVE&nbsp;·&nbsp;MAGNETIC FIELD ENGAGED&nbsp;·&nbsp;ALL BADGES RESPONDING&nbsp;·&nbsp;
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom categories */}
        <motion.div
          {...slideUp}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: "1.5rem",
            borderTop: "1px solid rgba(244,237,216,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {["Languages", "Frontend", "Backend", "DB / Cloud & Tools"].map((cat) => (
            <span
              key={cat}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,237,216,0.25)" }}
            >
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;
