import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { contactSchema } from "../features/contact/contactSchema";
import { sendContactMessage } from "../services/contactService";
import { slideUp, slideLeft, slideRight } from "../hooks/useScrollAnimation";

// ─── Vertical marquee ─────────────────────────────────────
function VerticalMarquee({ text, side = "left" }) {
  const repeated = Array(8).fill(text).join(" · ");
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        [side]: 0,
        width: "28px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: side === "right" ? "rotate(180deg)" : "none",
          animation: `marquee-vertical ${side === "left" ? 18 : 22}s linear infinite`,
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(228,64,28,0.4)",
          whiteSpace: "nowrap",
        }}
      >
        {repeated}{repeated}
      </div>
    </div>
  );
}

// ─── Jagged tear ──────────────────────────────────────────
function JaggedTear() {
  return (
    <div style={{ width: "100%", lineHeight: 0, overflow: "hidden", marginBottom: "-1px", position: "relative", zIndex: 2 }}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ width: "100%", height: "40px", display: "block" }} aria-hidden="true">
        <path
          d="M0,0 L0,20 L18,5 L36,25 L54,8 L72,28 L90,12 L108,30 L126,6 L144,24 L162,10 L180,28 L198,4 L216,22 L234,8 L252,26 L270,12 L288,28 L306,6 L324,22 L342,10 L360,28 L378,4 L396,20 L414,8 L432,28 L450,14 L468,30 L486,6 L504,24 L522,10 L540,28 L558,4 L576,22 L594,8 L612,26 L630,12 L648,28 L666,6 L684,20 L702,8 L720,28 L738,14 L756,30 L774,6 L792,24 L810,10 L828,26 L846,4 L864,22 L882,8 L900,28 L918,12 L936,28 L954,6 L972,22 L990,10 L1008,28 L1026,4 L1044,20 L1062,8 L1080,26 L1098,12 L1116,28 L1134,6 L1152,22 L1170,10 L1188,28 L1200,16 L1200,0 Z"
          fill="var(--charcoal)"
        />
      </svg>
    </div>
  );
}

// ─── Contact Section ──────────────────────────────────────
export default function ContactSection() {
  const headlineRef = useRef(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: "-60px" });
  const canvasRef = useRef(null);
  const [showStamp, setShowStamp] = useState(false);

  // Add-on: 3D spin angle array for 4 social links
  const [spinAngles, setSpinAngles] = useState([0, 0, 0, 0]);

  // Add-on: Haunted email typewriting state
  const [emailPlaceholder, setEmailPlaceholder] = useState("your@email.com");
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const textTimer = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId;
    const ctx = canvas.getContext("2d");

    const render = () => {
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 0.015)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Canvas spray can drawing letters
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      // 1. Draw spray particles
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 25;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        const dotSize = Math.random() * 1.8 + 0.4;
        ctx.fillStyle = Math.random() > 0.4 ? "rgba(228, 64, 28, 0.45)" : "rgba(255, 213, 0, 0.3)";
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
      // Soft radial mist
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 30);
      grad.addColorStop(0, "rgba(228, 64, 28, 0.1)");
      grad.addColorStop(0.6, "rgba(255, 213, 0, 0.04)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();

      // 2. Spawn letters trail
      textTimer.current++;
      if (textTimer.current % 10 === 0) {
        const words = ["PUNK", "SHIPS", "DIY", "NOISE", "RAW", "LOUD", "ANARCHY"];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        ctx.save();
        ctx.font = "900 12px 'IBM Plex Mono', monospace";
        ctx.fillStyle = Math.random() > 0.4 ? "rgba(228, 64, 28, 0.65)" : "rgba(255, 213, 0, 0.65)";
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.8);
        ctx.fillText(randomWord, 0, 0);
        ctx.restore();
      }
    }
  };

  // 3D Screaming icons chain reaction
  const triggerIconSpin = (startIndex) => {
    setSpinAngles((prev) => {
      const next = [...prev];
      next[startIndex] += 720;
      return next;
    });

    const propagate = (idx, direction, depth) => {
      if (depth > 3) return;
      setTimeout(() => {
        setSpinAngles((prev) => {
          const next = [...prev];
          const nextIdx = (idx + direction + 4) % 4;
          next[nextIdx] += 720;
          return next;
        });
        propagate((idx + direction + 4) % 4, direction, depth + 1);
      }, 150);
    };

    propagate(startIndex, 1, 1);
    propagate(startIndex, -1, 1);
  };

  // Haunted email placeholder typing loop
  useEffect(() => {
    if (isEmailFocused) {
      setEmailPlaceholder("your@email.com");
      return;
    }

    const fakeEmails = ["anarchy_now@hell.co", "satan@666.com", "copy_paste_god@coder.io", "help_me@campus.edu", "zeitgeist_lead@zeit.com"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentWord = fakeEmails[wordIdx];
      if (!isDeleting) {
        setEmailPlaceholder(currentWord.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentWord.length) {
          isDeleting = true;
          timer = setTimeout(type, 1500); // pause before backspacing
        } else {
          timer = setTimeout(type, 90);
        }
      } else {
        setEmailPlaceholder(currentWord.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          wordIdx = (wordIdx + 1) % fakeEmails.length;
          timer = setTimeout(type, 400); // pause before typing next
        } else {
          timer = setTimeout(type, 50);
        }
      }
    };

    timer = setTimeout(type, 2000); // initial delay
    return () => clearTimeout(timer);
  }, [isEmailFocused]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data) => {
    try {
      await sendContactMessage(data);
      setShowStamp(true);
      toast.success("Message transmitted!", {
        style: { background: "var(--vermilion)", color: "var(--cream)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "0.1em", border: "2px solid var(--ink)", borderRadius: 0 },
      });
      reset();
      setTimeout(() => setShowStamp(false), 5000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Transmission failed.", {
        style: { background: "var(--ink)", color: "var(--cream)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", border: "2px solid var(--vermilion)", borderRadius: 0 },
      });
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "0.875rem 1rem",
    background: "var(--cream)",
    color: "var(--ink)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.82rem",
    border: `2px solid ${hasError ? "var(--vermilion)" : "var(--ink)"}`,
    outline: "none",
    transition: "box-shadow 0.15s",
    borderRadius: 0,
    boxSizing: "border-box",
  });

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(244,237,216,0.5)",
    marginBottom: "0.4rem",
  };

  const errStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--vermilion)",
    marginTop: "0.25rem",
    letterSpacing: "0.08em",
  };

  return (
    <>
      <JaggedTear />

      <section
        id="contact"
        onMouseMove={handleMouseMove}
        style={{ position: "relative", background: "var(--ink)", overflow: "clip", paddingTop: "1px" }}
      >
        {/* Spray paint canvas background */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <VerticalMarquee text="SHIVAM KISHORE · AVAILABLE FOR HIRE · LET'S BUILD" side="left" />
        <VerticalMarquee text="OPEN TO WORK · FULL STACK · ENGINEER · BUILDER" side="right" />

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 3rem 4rem", position: "relative", zIndex: 2 }}>

          {/* Headline */}
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              className="section-label"
              style={{ marginBottom: "1.5rem", display: "inline-flex" }}
            >
              Open Comms
            </motion.span>

            <motion.h2
              initial={{ scale: 1, filter: "none", opacity: 1 }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem, 8vw, 7rem)", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 0.88, color: "var(--cream)", marginBottom: "0.5rem" }}
            >
              Let's Build<br /><span style={{ color: "var(--vermilion)" }}>Something.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "rgba(244,237,216,0.35)", letterSpacing: "0.08em", marginTop: "1.25rem" }}
            >
              Open for collaborations, hackathons & dev roles · Send a payload below
            </motion.p>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "start" }}>

            {/* Direct lines */}
            <motion.div {...slideLeft}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--cream)", marginBottom: "1.5rem", borderLeft: "4px solid var(--vermilion)", paddingLeft: "0.75rem" }}>
                Direct Lines
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: "✉", label: "Email", val: "shivamkishore009@gmail.com", href: "mailto:shivamkishore009@gmail.com" },
                  { icon: "◆", label: "GitHub", val: "github.com/Shivwhoo", href: "https://github.com/Shivwhoo" },
                  { icon: "▲", label: "LinkedIn", val: "in/shivam-kishore-103556329", href: "https://www.linkedin.com/in/shivam-kishore-103556329/" },
                  { icon: "◉", label: "Phone", val: "+91-9334947294", href: "tel:+919334947294" },
                ].map(({ icon, label, val, href }, idx) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => {
                      if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
                        // Allow navigation, but trigger spin first
                        triggerIconSpin(idx);
                      }
                    }}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "0.875rem 1rem", background: "rgba(244,237,216,0.03)", border: "1.5px solid rgba(244,237,216,0.08)", textDecoration: "none", transition: "border-color 0.15s, background 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--vermilion)"; e.currentTarget.style.background = "rgba(228,64,28,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(244,237,216,0.08)"; e.currentTarget.style.background = "rgba(244,237,216,0.03)"; }}
                  >
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      background: "var(--vermilion)",
                      color: "var(--ink)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "1rem",
                      fontWeight: 900,
                      borderRadius: "0px",
                      border: "1.5px dashed var(--ink)",
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.5)",
                      flexShrink: 0,
                      lineHeight: 1,
                      transform: `rotate(${label === "Email" ? -4 : label === "GitHub" ? 3 : label === "LinkedIn" ? -2 : 5}deg) rotateY(${spinAngles[idx]}deg)`,
                      transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    }}>
                      {icon}
                    </span>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,237,216,0.3)", marginBottom: "0.15rem" }}>{label}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cream)", wordBreak: "break-all" }}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...slideRight} style={{ position: "relative" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--cream)", marginBottom: "1.5rem", borderLeft: "4px solid var(--acid)", paddingLeft: "0.75rem" }}>
                Send a Payload
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <AnimatePresence>
                  {showStamp && (
                    <motion.div
                      initial={{ scale: 3, opacity: 0, rotate: -45 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: -12,
                        transition: { type: "spring", damping: 10, stiffness: 100 }
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.5 } }}
                      style={{
                        position: "absolute",
                        top: "20%",
                        left: "5%",
                        right: "5%",
                        zIndex: 20,
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{
                        border: "6px double var(--vermilion)",
                        color: "var(--vermilion)",
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        padding: "0.5rem 1rem",
                        background: "rgba(10, 10, 10, 0.95)",
                        boxShadow: "0 0 15px rgba(228, 64, 28, 0.4)",
                        textAlign: "center",
                        filter: "url(#contact-ink-bleed)",
                      }}>
                        TRANSMITTED
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="contact-name" style={labelStyle}>Name</label>
                  <input id="contact-name" type="text" {...register("name")} placeholder="Your name" style={inputStyle(!!errors.name)}
                    onFocus={(e) => { e.target.style.boxShadow = "0 0 0 2px var(--vermilion)"; }}
                    onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                  />
                  {errors.name && <p style={errStyle}>› {errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    placeholder={emailPlaceholder}
                    style={inputStyle(!!errors.email)}
                    onFocus={(e) => {
                      setIsEmailFocused(true);
                      e.target.style.boxShadow = "0 0 0 2px var(--vermilion)";
                    }}
                    onBlur={(e) => {
                      setIsEmailFocused(false);
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.email && <p style={errStyle}>› {errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" style={labelStyle}>Message</label>
                  <textarea id="contact-message" rows={5} {...register("message")} placeholder="What do you want to build?" style={{ ...inputStyle(!!errors.message), resize: "none" }}
                    onFocus={(e) => { e.target.style.boxShadow = "0 0 0 2px var(--vermilion)"; }}
                    onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                  />
                  {errors.message && <p style={errStyle}>› {errors.message.message}</p>}
                </div>
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className={isSubmitting ? "" : "btn-vermilion"}
                  style={isSubmitting ? {
                    width: "100%", padding: "1rem", background: "rgba(244,237,216,0.1)", color: "rgba(244,237,216,0.4)",
                    fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase",
                    border: "2px solid rgba(244,237,216,0.15)", cursor: "not-allowed"
                  } : { width: "100%", padding: "1rem" }}
                >
                  {isSubmitting ? "Transmitting..." : "Transmit →"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Footer strip */}
          <motion.div
            {...slideUp}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(244,237,216,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,237,216,0.2)" }}>
              Shivam Kishore · IIIT Dharwad · 2026
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(228,64,28,0.4)" }}>
              1977 London Punk × 2026 SWE
            </span>
            <a href="/Shivam%20Kishore%20CV-MAY.pdf" download="Shivam_Kishore_CV.pdf"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,237,216,0.3)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vermilion)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,237,216,0.3)")}
            >
              Download CV ↓
            </a>
          </motion.div>
        </div>
      </section>

      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="contact-ink-bleed">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
}