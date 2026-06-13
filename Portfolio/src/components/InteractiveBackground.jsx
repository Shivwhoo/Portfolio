import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Poster Background ────────────────────────────────────────────────────────
// Replaces the indigo cursor-glow particles with the punk silkscreen aesthetic:
//   • Deep charcoal base
//   • Asymmetric vermilion color block (top-right) with print-jitter
//   • Animated halftone grain layer
//   • Hand-drawn SVG border that traces itself on mount
// ─────────────────────────────────────────────────────────────────────────────

export default function PosterBackground() {
  const borderRef = useRef(null);

  // Trace the border SVG on mount
  useEffect(() => {
    const path = borderRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    // Short delay, then animate
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s";
      path.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1, background: "var(--charcoal)" }}
    >
      {/* ── Vermilion top-right color block with print jitter ── */}
      <motion.div
        animate={{
          x: [0, -1, 1, -0.5, 0.5, 0],
          y: [0, 0.5, -1, 1, -0.5, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-5%",
          right: "-5%",
          width: "45%",
          height: "55%",
          background: "var(--vermilion)",
          clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 75% 100%, 0% 70%, 5% 30%)",
          opacity: 0.08,
        }}
      />

      {/* ── Acid yellow accent smear (bottom-left) ── */}
      <motion.div
        animate={{
          x: [0, 1, -1, 0.5, -0.5, 0],
          y: [0, -0.5, 1, -1, 0.5, 0],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear", delay: 0.7 }}
        style={{
          position: "absolute",
          bottom: "-3%",
          left: "-3%",
          width: "35%",
          height: "40%",
          background: "var(--acid)",
          clipPath: "polygon(0% 30%, 40% 0%, 100% 20%, 90% 100%, 10% 100%)",
          opacity: 0.04,
        }}
      />

      {/* ── Charcoal left panel (dark stripe) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "18px",
          height: "100%",
          background: "var(--ink)",
          opacity: 0.5,
        }}
      />

      {/* ── Hand-drawn SVG border ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Ghost border */}
        <rect
          x="0.8"
          y="0.8"
          width="98.4"
          height="98.4"
          rx="0"
          fill="none"
          stroke="rgba(244,237,216,0.04)"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
        />
        {/* Animated traced border */}
        <rect
          ref={borderRef}
          x="1.2"
          y="1.2"
          width="97.6"
          height="97.6"
          rx="0"
          fill="none"
          stroke="rgba(228,64,28,0.25)"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ willChange: "stroke-dashoffset" }}
        />
      </svg>

      {/* ── Corner marks (silkscreen registration crosses) ── */}
      {[
        { top: "12px", left: "12px" },
        { top: "12px", right: "12px" },
        { bottom: "12px", left: "12px" },
        { bottom: "12px", right: "12px" },
      ].map((pos, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          style={{
            position: "absolute",
            ...pos,
            opacity: 0.25,
          }}
        >
          <line x1="7" y1="0" x2="7" y2="14" stroke="#E4401C" strokeWidth="1" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="#E4401C" strokeWidth="1" />
          <circle cx="7" cy="7" r="2.5" fill="none" stroke="#E4401C" strokeWidth="0.8" />
        </svg>
      ))}

      {/* ── Horizontal rule dividers (screen print layer marks) ── */}
      <div
        style={{
          position: "absolute",
          top: "33.333%",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(228,64,28,0.08), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "66.666%",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(244,237,216,0.05), transparent)",
        }}
      />
    </div>
  );
}