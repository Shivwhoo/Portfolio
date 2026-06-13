import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { slideUp } from "../../hooks/useScrollAnimation";

const TICKER_MESSAGES = [
  "B.TECH CS UNDERGRAD AT IIIT DHARWAD.",
  "ERROR 418: I AM A TEAPOT, NOT A RESUME ENGINE.",
  "ACADEMIC FOCUS: DISTRIBUTED SYSTEMS & ALGORITHMS.",
  "ANOTHER EXPERIENCE NODE. ARE YOU IMPRESSED YET?",
  "CURRENT GPA: 8.9+ / 10.0. TOP TIER CONSISTENCY.",
  "USER DETECTED SCROLLING. GO TO BED.",
  "DSA MILESTONE: 300+ SOLVED ON LEETCODE & CODEFORCES.",
  "CONTEST RATING PEAK: 1446 LEETCODE / 733 CF.",
  "IS ANYONE ACTUALLY READING THIS TICKERTAPE?",
  "TECH ODYSSEY HACKATHON: 4TH PLACE NATIONWIDE.",
  "MERN STACK FOCUS: BUILT PINGSTER REAL-TIME PLATFORM.",
  "BUILT EDTRAINING: ENTERPRISE EDTECH WEB SUITE.",
  "VELOCITY WEB DEV CELL ACTIVE MEMBER.",
  "STATUS: SHIPS PRS, WRITES CLEAN BRUTALIST CODE."
];

function Tickertape() {
  const [lines, setLines] = useState([
    { timestamp: new Date(Date.now() - 45000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), msg: "BOOTING LOGS..." },
    { timestamp: new Date(Date.now() - 30000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), msg: "ESTABLISHING UPLINK..." },
    { timestamp: new Date(Date.now() - 15000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), msg: "SYSTEM ACTIVE: SHIVWHOO/PORTFOLIO" }
  ]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const nextMsg = TICKER_MESSAGES[messageIndex];
      setLines((prev) => [...prev, { timestamp: timeStr, msg: nextMsg }]);
      setMessageIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [messageIndex]);

  return (
    <div className="tickertape-desktop">
      {/* Printer slot at the top */}
      <div className="tickertape-printer-slot">
        <div style={{
          position: "absolute",
          right: "10px",
          top: "2px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#39ff14",
          boxShadow: "0 0 4px #39ff14",
          animation: "cursor-blink 1s infinite"
        }} />
      </div>
      
      {/* Receipt container */}
      <div className="tickertape-receipt-container">
        <motion.div
          drag="y"
          dragConstraints={{ top: -600, bottom: 0 }}
          className="tickertape-receipt-paper"
          style={{ y: 0 }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", borderBottom: "2px dashed #111", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
            <h4 style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.05em", color: "#111" }}>SHIVWHOO LOGS</h4>
            <span style={{ fontSize: "0.5rem", color: "#444" }}>TERMINAL FEED v1.0.4</span>
          </div>

          {/* Printed Lines */}
          {lines.map((line, idx) => (
            <div key={idx} className="tickertape-line">
              <span className="tickertape-line-timestamp">[{line.timestamp}]</span>
              <span className="tickertape-line-message">{line.msg}</span>
            </div>
          ))}

          {/* Barcode/Footer */}
          <div style={{ marginTop: "1.5rem", textAlign: "center", borderTop: "1px dashed #111", paddingTop: "0.75rem" }}>
            <div style={{
              display: "inline-block",
              width: "120px",
              height: "20px",
              background: "repeating-linear-gradient(90deg, #111, #111 2px, transparent 2px, transparent 6px, #111 6px, #111 8px, transparent 8px, transparent 10px)",
              opacity: 0.8
            }} />
            <div style={{ fontSize: "0.5rem", color: "#666", marginTop: "0.2rem" }}>*DRAG UP TO READ OLDER LOGS*</div>
          </div>

          {/* Jagged tear shape at the end */}
          <div className="tickertape-receipt-jagged-edge" />
        </motion.div>
      </div>
    </div>
  );
}

const timelineEvents = [
  {
    id: 1,
    date: "2024 – 2028 (Ongoing)",
    title: "B.Tech @ IIIT Dharwad",
    desc: "Computer Science undergraduate with a consistent 8.9+ CGPA. Mastering core CS fundamentals, systems thinking, and scalable problem-solving.",
    tags: ["CS Fundamentals", "CGPA 8.9+", "Systems"],
    accent: "var(--vermilion)",
  },
  {
  id: 2,
    date: "2026 – Present",
    title: "Software Development Intern @ EdMentor",
    desc: "Working on full-stack development for an EdTech platform, building scalable features, CRM modules, real-time systems, payment integrations, and improving user experience across the product.",
    tags: ["Full-Stack", "EdTech", "Real-Time Systems"],
    accent: "var(--vermilion)",
  },
  {
    id: 3,
    date: "Ongoing",
    title: "Problem Solving & Hackathons",
    desc: "300+ DSA problems solved. LeetCode 1446. Codeforces 733. 4th place at Tech Odyssey Hackathon. Compete to win.",
    tags: ["DSA", "LeetCode 1446", "CF 733", "Hackathon 4th"],
    accent: "var(--acid)",
  },
  {
    id: 4,
    date: "Recent Projects",
    title: "Full-Stack Engineering",
    desc: "Production-ready systems: Pingster (real-time chat), EdTraining (edtech platform), Blogify. MERN stack, Socket.io, Razorpay.",
    tags: ["MERN", "Socket.io", "Node.js", "MongoDB"],
    accent: "var(--vermilion)",
  },
  {
    id: 5,
    date: "Active",
    title: "Leadership & Communities",
    desc: "Emcee & Event Lead at Zeitgeist Literary & Cultural Club — events for 500+ attendees. Web Dev member at Velocity.",
    tags: ["Leadership", "Events 500+", "Team Building"],
    accent: "var(--acid)",
  },
  {
    id: 6,
    date: "2020 – 2022",
    title: "Class XII — ISC 92.4%",
    desc: "Don Bosco Academy, Patna. Built academic discipline and competitive consistency early on.",
    tags: ["92.4%", "ISC Board"],
    accent: "var(--cream)",
  },
  {
    id: 7,
    date: "Dec 2025",
    title: "Bronze Medal — Badminton",
    desc: "Intra IIIT Badminton Tournament Bronze Medalist. Competitive mindset beyond the terminal.",
    tags: ["Bronze", "Badminton", "Athletics"],
    accent: "var(--acid)",
  },
];

function TimelineNode({ event, index }) {
  const [open, setOpen] = useState(false);
  const isLeft = index % 2 === 0;

  const cardStyle = {
    cursor: "pointer",
    background: open ? "var(--vermilion)" : "var(--charcoal-2)",
    border: `2px solid ${event.accent}`,
    padding: "1rem 1.25rem",
    transition: "background 0.2s",
    boxShadow: "3px 3px 0 var(--ink)",
  };

  const renderCardContent = () => (
    <>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", color: event.accent, textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
        {event.date}
      </span>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "var(--cream)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "0.5rem" }}>
        {event.title}
      </h3>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cream)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              {event.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {event.tags.map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", border: `1px solid ${event.accent}`, color: event.accent }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(244,237,216,0.3)", letterSpacing: "0.15em", display: "block", marginTop: open ? "0.75rem" : 0 }}>
        {open ? "[ COLLAPSE ]" : "[ EXPAND ]"}
      </span>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: 0 }}
      style={{ display: "grid", gridTemplateColumns: "1fr 32px 1fr", alignItems: "start", gap: "0 1rem", position: "relative" }}
    >
      <div style={{ textAlign: "right", paddingTop: "4px" }}>
        {isLeft && <div style={cardStyle} onClick={() => setOpen(!open)}>{renderCardContent()}</div>}
      </div>

      {/* Diamond node (Draggable Octopus node) */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.65}
          whileDrag={{ scale: 1.4, cursor: "grabbing" }}
          initial={{ rotate: 45 }}
          style={{
            width: "16px",
            height: "16px",
            border: `3px solid ${event.accent}`,
            background: "var(--charcoal)",
            flexShrink: 0,
            marginTop: "16px",
            position: "relative",
            zIndex: 3,
            cursor: "grab",
          }}
        />
      </div>

      <div style={{ paddingTop: "4px" }}>
        {!isLeft && <div style={cardStyle} onClick={() => setOpen(!open)}>{renderCardContent()}</div>}
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);
  const [wiggle, setWiggle] = useState(0);

  // Wiggling central tentacle ticks
  useEffect(() => {
    let animId;
    let start = null;
    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      setWiggle(elapsed / 160);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const generateTentaclePath = () => {
    let points = [];
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * 100;
      const x = 10 + Math.sin((y * 0.15) + wiggle) * 4;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <section
      id="timeline"
      ref={containerRef}
      style={{
        position: "relative",
        padding: "3.5rem 1.5rem",
        background: "var(--charcoal)",
        overflow: "clip",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Tickertape />
        {/* Timeline header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "3rem", borderTop: "1px solid rgba(244,237,216,0.08)", paddingTop: "2rem" }}
        >
          <span className="section-label" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>The Logs</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--cream)", lineHeight: 0.95, marginTop: "0.5rem" }}>
            Experience<br /><span style={{ color: "var(--vermilion)" }}>& Timeline</span>
          </h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(244,237,216,0.3)", letterSpacing: "0.1em", marginTop: "0.75rem" }}>
            Click any node to expand · Drag central nodes to stretch octopus joints
          </p>
        </motion.div>

        {/* Timeline body */}
        <div style={{ position: "relative", marginTop: "4rem" }}>
          
          {/* Octopus head at top of spine */}
          <div style={{
            position: "absolute",
            top: "-36px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "30px",
            height: "30px",
            zIndex: 10,
            pointerEvents: "none",
          }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <circle cx="50" cy="50" r="42" fill="var(--vermilion)" stroke="var(--ink)" strokeWidth="6" />
              <circle cx="36" cy="42" r="7" fill="white" />
              <circle cx="36" cy="42" r="3.5" fill="black" />
              <circle cx="64" cy="42" r="7" fill="white" />
              <circle cx="64" cy="42" r="3.5" fill="black" />
              <path d="M 40,65 Q 50,72 60,65" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Jagged / Wiggling Spine Line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "20px", transform: "translateX(-50%)", zIndex: 0 }}>
            <svg
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
              viewBox="0 0 20 100"
              preserveAspectRatio="none"
            >
              {/* Background ghost path */}
              <path
                d={generateTentaclePath()}
                fill="none"
                stroke="rgba(244,237,216,0.06)"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
              {/* Main wiggling tentacle path */}
              <path
                d={generateTentaclePath()}
                fill="none"
                stroke="var(--vermilion)"
                strokeWidth="3.5"
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
            {timelineEvents.map((event, i) => (
              <TimelineNode key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
