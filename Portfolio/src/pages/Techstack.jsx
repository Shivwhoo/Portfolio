import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp, lineDraw } from "../hooks/useScrollAnimation";

// ─── Tech data ────────────────────────────────────────────
const skills = [
  { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",  cat: "Lang" },
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",        cat: "Lang" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", cat: "Lang" },
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",           cat: "Frontend" },
  { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", cat: "Frontend" },
  { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",           cat: "Frontend" },
  { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",             cat: "Frontend" },
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",         cat: "Backend" },
  { name: "Express",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",       cat: "Backend", invert: true },
  { name: "Socket.io",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg", cat: "Backend" },
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",       cat: "DB/Cloud" },
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",           cat: "DB/Cloud" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",               cat: "DB/Cloud" },
  { name: "GitHub",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",         cat: "DB/Cloud", invert: true },
  { name: "Cloudinary", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/cloudinary.svg",                    cat: "DB/Cloud", invert: true },
];

const ACCENTS = ["var(--vermilion)", "var(--acid)", "var(--cream)"];
const ROTS = [-8, 5, -3, 7, -6, 4, -9, 6, -4, 8, -5, 3, -7, 6, -2];

// ─── Single sticker ───────────────────────────────────────
function StickerBadge({ skill, index, offsetX, offsetY, kickBadge }) {
  const rot = ROTS[index % ROTS.length];
  const accent = ACCENTS[index % ACCENTS.length];
  const delay = index * 0.04;

  const [isSlapped, setIsSlapped] = useState(false);
  const [isPeeling, setIsPeeling] = useState(false);
  const [isFallen, setIsFallen] = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSlapped(true);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isFallen) return;
    setIsPeeling(true);

    // Give physical kick away from mouse (chaotic vector push)
    const forceX = (Math.random() - 0.5) * 35;
    const forceY = -25 - Math.random() * 20;
    kickBadge(index, forceX, forceY);

    // Continuous hover for 1 second triggers fall off
    hoverTimer.current = setTimeout(() => {
      setIsFallen(true);
      setIsPeeling(false);
      // Respawn after 1.5 seconds
      setTimeout(() => {
        setIsFallen(false);
      }, 1500);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setIsPeeling(false);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={
        isFallen
          ? { y: 400, opacity: 0, rotate: rot + 12, scale: 0.9, pointerEvents: "none" }
          : isPeeling
          ? { scale: 1.05, x: offsetX, y: offsetY - 6, rotate: rot + 2, zIndex: 30 }
          : isSlapped
          ? { scale: 1, x: offsetX, y: offsetY, rotate: rot, opacity: 1, zIndex: 1 }
          : { scale: 3, rotate: rot + 15, opacity: 0 }
      }
      transition={
        isFallen
          ? { duration: 0.45, ease: "easeIn" }
          : isPeeling
          ? { duration: 0.18, ease: "easeOut" }
          : { type: "spring", stiffness: 220, damping: 12 }
      }
      style={{
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
        cursor: "default",
        position: "relative",
        boxShadow: isPeeling ? "4px 6px 0 var(--ink)" : "2px 3px 0 var(--ink)",
        willChange: "transform",
      }}
    >
      {/* Glitch clone duplicates that tear off on hover */}
      {isPeeling && (
        <motion.div
          animate={{
            x: [0, -6, 6, -3, 3, 0],
            y: [0, 3, -3, 2, -2, 0],
            opacity: [0.65, 0.4, 0.2, 0],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(228,64,28,0.25)",
            border: "2.5px solid var(--vermilion)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Corner peel curl overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: isPeeling ? "12px" : "0px",
          borderColor: `var(--charcoal) var(--charcoal) ${accent} ${accent}`,
          boxShadow: isPeeling ? "-2px 2px 3px rgba(0,0,0,0.2)" : "none",
          transition: "border-width 0.2s ease, box-shadow 0.2s ease",
          zIndex: 10,
        }}
      />

      {/* Ripped Edge SVG when peeling */}
      {isPeeling && (
        <svg
          style={{
            position: "absolute",
            top: "-1.5px",
            right: "-1.5px",
            width: "16px",
            height: "16px",
            zIndex: 9,
            pointerEvents: "none",
          }}
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path d="M 0,0 L 2,2.5 L 0,4.5 L 2.5,6.5 L 0.5,9 L 3.5,7 L 5,9 L 6.5,4.5 L 8.5,0 Z" fill="var(--charcoal)" />
        </svg>
      )}

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
      <img
        src={skill.icon}
        alt={skill.name}
        style={{
          width: "36px",
          height: "36px",
          objectFit: "contain",
          filter: skill.invert ? "invert(1)" : "none",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink)",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─── Tech Stack Section ───────────────────────────────────
const TechStack = () => {
  const [badgeOffsets, setBadgeOffsets] = useState(
    skills.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
  );

  const [isTickerHovered, setIsTickerHovered] = useState(false);

  // Sticker Physics Loop
  useEffect(() => {
    let animId;
    const tick = () => {
      setBadgeOffsets((prev) => {
        const next = prev.map((b) => ({ ...b }));
        
        // 1. Apply spring forces and damping to each badge offset
        for (let i = 0; i < next.length; i++) {
          const b = next[i];
          const k = 0.08; // Spring stiffness pulling it back to home slot (0,0)
          
          b.vx += -k * b.x;
          b.vy += -k * b.y;
          
          // Friction / damping
          b.vx *= 0.88;
          b.vy *= 0.88;
          
          // Update relative positions
          b.x += b.vx;
          b.y += b.vy;
          
          // Outer absolute boundaries (keep them contained near original slot)
          const limit = 40;
          if (Math.abs(b.x) > limit) {
            b.x = Math.sign(b.x) * limit;
            b.vx *= -0.7;
          }
          if (Math.abs(b.y) > limit) {
            b.y = Math.sign(b.y) * limit;
            b.vy *= -0.7;
          }
        }

        // 2. Resolve simple collision chain pushes to neighbors
        for (let i = 0; i < next.length; i++) {
          const b1 = next[i];
          
          // If this badge has strong motion, pass a part to nearest indices
          const speed = Math.sqrt(b1.vx * b1.vx + b1.vy * b1.vy);
          if (speed > 8) {
            const neighbors = [i - 1, i + 1].filter(n => n >= 0 && n < next.length);
            neighbors.forEach((nIdx) => {
              const b2 = next[nIdx];
              b2.vx += b1.vx * 0.45;
              b2.vy += b1.vy * 0.45;
              
              // slightly absorb velocity to dampen recursion
              b1.vx *= 0.85;
              b1.vy *= 0.85;
            });
          }
        }
        
        return next;
      });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const kickBadge = (idx, fx, fy) => {
    setBadgeOffsets((prev) => {
      const next = prev.map((b) => ({ ...b }));
      if (next[idx]) {
        next[idx].vx += fx;
        next[idx].vy += fy;
      }
      return next;
    });
  };

  return (
    <div style={{ padding: "3.5rem 2rem", position: "relative" }}>
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
            Hover to peel & start sticker brawls · Responsive collision physics
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          {...lineDraw}
          style={{ ...lineDraw.style, height: "2px", background: "var(--vermilion)", transformOrigin: "left", marginBottom: "2rem" }}
        />

        {/* Sticker wall */}
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
            <StickerBadge
              key={skill.name}
              skill={skill}
              index={i}
              offsetX={badgeOffsets[i]?.x || 0}
              offsetY={badgeOffsets[i]?.y || 0}
              kickBadge={kickBadge}
            />
          ))}
        </div>

        {/* Hacker Ticker Bar */}
        <div
          style={{
            marginTop: "3rem",
            background: "var(--acid)",
            border: "2.5px solid var(--ink)",
            padding: "0.5rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
            position: "relative",
            cursor: "pointer",
            boxShadow: "3px 3px 0 var(--ink)",
          }}
          onMouseEnter={() => setIsTickerHovered(true)}
          onMouseLeave={() => setIsTickerHovered(false)}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              fontWeight: 800,
              color: "var(--ink)",
              transform: "translate3d(0, 0, 0)",
              animation: isTickerHovered ? "none" : "marquee-vertical 15s linear infinite", // fallback vertical scrolling logic, wait let's use horizontal marquee!
              // Let's write a quick inline horizontal marquee style if not hovered!
              whiteSpace: "nowrap",
            }}
          >
            {isTickerHovered ? (
              <span style={{ color: "var(--vermilion)", letterSpacing: "0.05em" }}>
                [ SYSTEM HALT: USER INTERRUPT DETECTED. BYPASS INITIATED. STACK STABILIZED. ]
              </span>
            ) : (
              <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ ease: "linear", duration: 18, repeat: Infinity }}
              >
                SYSTEM SCAN ACTIVE... PORT 1977 OPEN... BUFFER OVERFLOW RISK: INJECTING CHAOTIC BADGE PHYSICS ENGINE... VERIFYING MERN PLATFORMS... CORE ALIVE...
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom categories */}
        <motion.div
          {...slideUp}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: "2.5rem",
            borderTop: "1px solid rgba(244,237,216,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {["Languages", "Frontend", "Backend", "Databases & Cloud"].map((cat) => (
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
