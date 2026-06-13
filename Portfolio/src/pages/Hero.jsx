import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Stagger letter reveal ────────────────────────────────
const LetterStamp = ({ text, delay = 0, className = "" }) => {
  const letters = text.split("");
  return (
    <span
      style={{
        display: "inline-flex",
        flexWrap: "nowrap",
        overflow: "hidden",
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, rotate: (Math.random() - 0.5) * 6, scale: 1.2 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{
            duration: 0.35,
            delay: delay + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={className}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// ─── Typewriter role cycler ───────────────────────────────
const roles = ["ENGINEER", "BUILDER", "PROBLEM SOLVER", "DEVELOPER"];

function TypewriterRoles() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <span style={{ display: "inline-block", minWidth: "220px" }}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={roles[idx]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ display: "inline-block", color: "var(--vermilion)" }}
          >
            {roles[idx]}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "var(--acid)",
                marginLeft: "3px",
                verticalAlign: "middle",
                animation: "cursor-blink 1s step-end infinite",
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// ─── Spinning stamp badge ─────────────────────────────────
function SpinBadge() {
  const radius = 38;
  const text = "  AVAILABLE FOR HIRE · OPEN TO WORK · ";
  const chars = text.split("");
  const total = chars.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        top: "1.5rem",
        right: "1.5rem",
        width: "100px",
        height: "100px",
        zIndex: 20,
      }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <path
            id="circle-text-path"
            d={`M 50,50 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        {/* Badge circle */}
        <circle cx="50" cy="50" r="46" fill="var(--vermilion)" stroke="var(--ink)" strokeWidth="2" />
        {/* Inner dot */}
        <circle cx="50" cy="50" r="6" fill="var(--cream)" />
        {/* Circular text */}
        <text
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9.5px",
            letterSpacing: "1.5px",
            fill: "var(--cream)",
            fontWeight: 600,
          }}
        >
          <textPath href="#circle-text-path">{text}</textPath>
        </text>
      </motion.svg>
    </motion.div>
  );
}

// ─── Living Stamp Widget ──────────────────────────────────
function LivingStamp() {
  const [stdDev, setStdDev] = useState(0.8);
  const [footprints, setFootprints] = useState([]);
  const [isSlammed, setIsSlammed] = useState(false);

  useEffect(() => {
    let start = null;
    let animId;
    const animateBleed = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const val = 0.9 + Math.sin(progress / 700) * 0.6; // Oscillate stdDeviation
      setStdDev(val);
      animId = requestAnimationFrame(animateBleed);
    };
    animId = requestAnimationFrame(animateBleed);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSlam = () => {
    setIsSlammed(true);
    setTimeout(() => setIsSlammed(false), 200);

    const words = ["BUILT", "SHIPS", "SWE", "2AM", "PUNK", "SHIVAM"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const angle = (Math.random() - 0.5) * 40;
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = 50 + Math.random() * 25; // spawn below the stamp

    const newFootprint = {
      id: Date.now(),
      text: randomWord,
      rotate: angle,
      x: offsetX,
      y: offsetY,
    };
    setFootprints((prev) => [...prev, newFootprint]);
  };

  return (
    <div style={{ position: "absolute", right: "8%", top: "18%", zIndex: 10, width: "100px", height: "100px" }}>
      {/* Dynamic ink bleed filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="living-stamp-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={stdDev} result="blur" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="contrast" />
          </filter>
        </defs>
      </svg>

      {/* Footprints (Spawned stamped words) */}
      <AnimatePresence>
        {footprints.map((fp) => (
          <motion.div
            key={fp.id}
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              opacity: { duration: 0.15 },
              scale: { type: "spring", stiffness: 300, damping: 12 },
              exit: { duration: 1.2 }
            }}
            style={{
              position: "absolute",
              left: `calc(50% + ${fp.x}px)`,
              top: `calc(50% + ${fp.y}px)`,
              transform: `translate(-50%, -50%) rotate(${fp.rotate}deg)`,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "1.1rem",
              color: "var(--vermilion)",
              border: "2px solid var(--vermilion)",
              padding: "1px 6px",
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              pointerEvents: "none",
              background: "rgba(20,20,20,0.85)",
              borderRadius: "1px",
              whiteSpace: "nowrap",
            }}
          >
            {fp.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main rotating stamp body */}
      <motion.div
        animate={isSlammed ? { scale: [1, 0.78, 1], rotate: "+=15deg" } : { rotate: 360 }}
        transition={
          isSlammed
            ? { duration: 0.25, ease: "easeInOut" }
            : { duration: 720, repeat: Infinity, ease: "linear" }
        }
        onMouseEnter={handleSlam}
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
          filter: "url(#living-stamp-filter)",
          position: "relative",
          willChange: "transform",
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--vermilion)" strokeWidth="3.5" strokeDasharray="3 2" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--vermilion)" strokeWidth="1.5" />
          <path d="M 24,50 Q 50,55 76,50" fill="none" stroke="var(--vermilion)" strokeWidth="2" />
          
          <text
            x="50"
            y="44"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "10px",
              fill: "var(--vermilion)",
              letterSpacing: "0.5px",
            }}
          >
            SHIVAM K.
          </text>
          <text
            x="50"
            y="62"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "7.5px",
              fill: "var(--vermilion)",
              letterSpacing: "1px",
            }}
          >
            EST. 2026
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Hero Section ──────────────────────────────────────────
const HeroSection = () => {
  const [screams, setScreams] = useState([]);
  const [stamps, setStamps] = useState([]);
  const [liquidFreq, setLiquidFreq] = useState(0.015);

  useEffect(() => {
    let animId;
    let start = null;
    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      // slow liquid morph oscillation
      setLiquidFreq(0.014 + Math.sin(progress / 1800) * 0.003);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const triggerStamp = () => {
      const words = ["DESTROY", "ANARCHY", "RISE", "SHIPS", "LOUD", "BUILD", "RAW", "2AM", "PUNK"];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const newStamp = {
        id: Date.now() + Math.random(),
        text: randomWord,
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 15,
        rotate: (Math.random() - 0.5) * 35,
      };
      setStamps((prev) => [...prev, newStamp]);
    };

    let t1 = setTimeout(() => {
      triggerStamp();
      t2 = setInterval(triggerStamp, 2500);
    }, 1250);

    let t2;
    return () => {
      clearTimeout(t1);
      if (t2) clearInterval(t2);
    };
  }, []);

  const triggerScream = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const heroEl = document.getElementById("home");
    if (heroEl) {
      const heroRect = heroEl.getBoundingClientRect();
      const relativeX = x - heroRect.left;
      const relativeY = y - heroRect.top;
      
      const screamsList = ["AARRGGHH!!", "SHIIIPSS!!", "DESTROY!!", "RAAAHH!!", "ANARCHY!!", "LOUD!!", "CODEEE!!", "WORKKK!!"];
      const text = screamsList[Math.floor(Math.random() * screamsList.length)];
      
      const newScream = {
        id: Date.now() + Math.random(),
        text,
        x: relativeX,
        y: relativeY,
        rotate: (Math.random() - 0.5) * 24,
        scale: 0.9 + Math.random() * 0.4,
      };
      setScreams((prev) => [...prev, newScream]);
    }
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Visual ASCII screams container */}
      <AnimatePresence>
        {screams.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0.5, opacity: 0, y: 0 }}
            animate={{ 
              scale: s.scale * 1.5, 
              opacity: [0, 1, 1, 0], 
              y: -80,
              rotate: s.rotate 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onAnimationComplete={() => {
              setScreams((prev) => prev.filter((item) => item.id !== s.id));
            }}
            style={{
              position: "absolute",
              left: s.x - 100,
              top: s.y - 40,
              width: "200px",
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "1.8rem",
              color: "var(--acid)",
              textShadow: "3px 3px 0px var(--ink), -1px -1px 0px var(--ink)",
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            {s.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background stamps printed by the pendulum */}
      <AnimatePresence>
        {stamps.map((stamp) => (
          <motion.div
            key={stamp.id}
            initial={{ scale: 1.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.18 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ 
              scale: { type: "spring", stiffness: 350, damping: 10 },
              opacity: { duration: 0.15 },
              exit: { duration: 1.5 }
            }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setStamps((prev) => prev.filter((item) => item.id !== stamp.id));
              }, 4000);
            }}
            style={{
              position: "absolute",
              left: `calc(25% + ${stamp.x}px)`,
              top: `calc(220px + ${stamp.y}px)`,
              transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg)`,
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "2rem",
              color: "var(--vermilion)",
              border: "3px dashed var(--vermilion)",
              padding: "2px 10px",
              background: "transparent",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {stamp.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Swinging Pendulum Arm */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "25%",
        width: "2px",
        height: "220px",
        background: "var(--vermilion)",
        transformOrigin: "top center",
        animation: "pendulum-swing 5s ease-in-out infinite",
        zIndex: 1,
        pointerEvents: "none",
      }}>
        <div style={{ position: "absolute", inset: 0, width: "100%", background: "var(--vermilion)" }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "-18px",
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "var(--charcoal)",
          border: "4px solid var(--vermilion)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--acid)",
            boxShadow: "0 0 6px var(--acid)",
            animation: "cursor-blink 1.25s step-end infinite",
          }} />
        </div>
      </div>

      {/* Spinning badge — top right */}
      <SpinBadge />

      {/* Vermilion color block — top right hero decoration */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "45%",
          background: "var(--vermilion)",
          clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 85%, 5% 20%)",
          opacity: 0.12,
          zIndex: 0,
          animation: "breath 6s ease-in-out infinite",
        }}
      />

      {/* Left dark stripe */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "6px",
          height: "100%",
          background: "var(--vermilion)",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Living Stamp hovering near name */}
        <LivingStamp />

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <span className="section-label">
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--vermilion)",
                display: "inline-block",
                animation: "breath 2s ease-in-out infinite",
              }}
            />
            Portfolio — 2026
          </span>
        </motion.div>

        {/* Name — SHIVAM */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textTransform: "uppercase",
            lineHeight: 0.88,
            fontSize: "clamp(4.5rem, 14vw, 13rem)",
            letterSpacing: "-0.03em",
            color: "var(--cream)",
            marginBottom: "0",
            filter: "url(#liquid-name-blob)",
          }}
          aria-label="Shivam Kishore"
        >
          <div style={{ display: "block" }}>
            <LetterStamp text="SHIVAM" delay={0.5} />
          </div>

          {/* KISHORE — vermilion */}
          <div style={{ display: "block", marginTop: "-0.05em" }}>
            <LetterStamp
              text="KISHORE"
              delay={0.8}
              className=""
            />
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-block",
                width: "clamp(24px, 4vw, 60px)",
                height: "clamp(6px, 1.2vw, 14px)",
                background: "var(--vermilion)",
                marginLeft: "clamp(6px, 1vw, 16px)",
                verticalAlign: "middle",
                transformOrigin: "left center",
              }}
            />
          </div>
        </h1>

        {/* Role typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.4 }}
          style={{
            marginTop: "2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.85rem, 2vw, 1.2rem)",
            letterSpacing: "0.12em",
            color: "var(--off-white)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "var(--vermilion)", opacity: 0.6 }}>›</span>
          <TypewriterRoles />
        </motion.div>

        {/* Descriptor line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          style={{
            marginTop: "1.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
            color: "rgba(244,237,216,0.45)",
            letterSpacing: "0.06em",
            maxWidth: "520px",
            lineHeight: 1.7,
          }}
        >
          DEVELOPER @ EdMentor · B.Tech CS @ IIIT Dharwad · MERN Stack · Competitive Programmer<br />
          <span style={{ color: "rgba(228,64,28,0.6)" }}>300+ DSA</span> · LeetCode 1446 · Hackathon 4th
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.875rem",
            alignItems: "center",
          }}
        >
          {/* Primary — view work */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              triggerScream(e);
              const target = document.querySelector("#projects");
              if (target) {
                if (window.lenis) {
                  window.lenis.scrollTo(target, { offset: -80 });
                } else {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <button className="btn-poster">
              <span>View Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "relative", zIndex: 1 }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </a>

          {/* Resume hover group */}
          <div style={{ position: "relative" }} className="resume-group">
            <button
              className="btn-vermilion"
              style={{ position: "relative" }}
              onClick={(e) => {
                triggerScream(e);
                window.open("/Shivam%20Kishore%20CV-MAY.pdf", "_blank");
              }}
            >
              <span>Resume</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M3 6l4 4 4-4M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Contact */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              triggerScream(e);
              const target = document.querySelector("#contact");
              if (target) {
                if (window.lenis) {
                  window.lenis.scrollTo(target, { offset: -80 });
                } else {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.5rem",
                background: "transparent",
                color: "var(--cream)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "1.5px solid rgba(244,237,216,0.25)",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--vermilion)";
                e.currentTarget.style.color = "var(--vermilion)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(244,237,216,0.25)";
                e.currentTarget.style.color = "var(--cream)";
              }}
            >
              Contact
            </button>
          </a>
        </motion.div>

        {/* Social links row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.5 }}
          style={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            borderTop: "1px solid rgba(244,237,216,0.08)",
            paddingTop: "1.5rem",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(244,237,216,0.3)", textTransform: "uppercase" }}>
            Find me:
          </span>
          {[
            { label: "GitHub", href: "https://github.com/Shivwhoo" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/shivam-kishore-103556329/" },
            { label: "LeetCode", href: "https://leetcode.com/" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "rgba(244,237,216,0.4)",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.15s",
                borderBottom: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--vermilion)";
                e.currentTarget.style.borderBottomColor = "var(--vermilion)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(244,237,216,0.4)";
                e.currentTarget.style.borderBottomColor = "transparent";
              }}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            color: "rgba(244,237,216,0.25)",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--vermilion), transparent)",
          }}
        />
      </motion.div>

      {/* Liquid morphing SVG filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="liquid-name-blob">
            <feTurbulence type="fractalNoise" baseFrequency={`${liquidFreq} ${liquidFreq * 0.8}`} numOctaves="3" result="noise" seed="5" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default HeroSection;
