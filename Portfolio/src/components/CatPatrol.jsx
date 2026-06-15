import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── SVG Cat sprite ──────────────────────────────────────────
// A minimal but expressive pixel-art style cat rendered in SVG
function CatSprite({ facing = "right", action = "walk", tailPhase = 0, blinking = false }) {
  const flipX = facing === "left" ? -1 : 1;
  const tailAngle = Math.sin(tailPhase) * 28;

  // Eye state
  const eyeH = blinking ? 1 : 4;
  const eyeY = blinking ? 16 : 14;

  // Paw bob for walk
  const isWalking = action === "walk";
  const isSitting = action === "sit" || action === "curl";
  const isTyping = action === "type";

  return (
    <svg
      viewBox="0 0 48 48"
      width="60"
      height="60"
      style={{
        transform: `scaleX(${flipX})`,
        overflow: "visible",
        filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    >
      {/* Tail */}
      <g
        style={{
          transformOrigin: "10px 30px",
          transform: `rotate(${tailAngle}deg)`,
          transition: "transform 0.1s ease",
        }}
      >
        <path
          d="M10,30 Q2,22 4,14 Q6,8 10,10"
          fill="none"
          stroke="#E4401C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="3" fill="#E4401C" />
      </g>

      {/* Body */}
      {isSitting || action === "curl" ? (
        // Curled / sitting body
        <ellipse cx="27" cy="32" rx="12" ry="9" fill="#F4EDD8" />
      ) : (
        // Walking body
        <ellipse cx="27" cy="31" rx="11" ry="8" fill="#F4EDD8" />
      )}

      {/* Head */}
      <circle cx="30" cy="18" r="10" fill="#F4EDD8" />

      {/* Ears */}
      <polygon points="22,12 19,4 26,10" fill="#F4EDD8" />
      <polygon points="22,12 20,5 25,10" fill="#E4401C" opacity="0.6" />
      <polygon points="38,12 41,4 34,10" fill="#F4EDD8" />
      <polygon points="38,12 40,5 35,10" fill="#E4401C" opacity="0.6" />

      {/* Eyes */}
      <ellipse cx="26" cy={eyeY} rx="2.5" ry={eyeH / 2} fill="#1a1a1a" />
      <ellipse cx="34" cy={eyeY} rx="2.5" ry={eyeH / 2} fill="#1a1a1a" />
      {!blinking && (
        <>
          <circle cx="27" cy="13" r="1" fill="white" opacity="0.8" />
          <circle cx="35" cy="13" r="1" fill="white" opacity="0.8" />
        </>
      )}

      {/* Nose */}
      <polygon points="30,19 28.5,21 31.5,21" fill="#E4401C" />

      {/* Whiskers */}
      <line x1="20" y1="20" x2="13" y2="19" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.5" />
      <line x1="20" y1="21.5" x2="13" y2="22.5" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.5" />
      <line x1="40" y1="20" x2="47" y2="19" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.5" />
      <line x1="40" y1="21.5" x2="47" y2="22.5" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.5" />

      {/* Mouth */}
      <path d="M29,22 Q30,23.5 31,22" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />

      {/* Paws - walk vs sit */}
      {isWalking && (
        <>
          <ellipse cx="20" cy="39" rx="3.5" ry="2.5" fill="#F4EDD8" />
          <ellipse cx="34" cy="39" rx="3.5" ry="2.5" fill="#F4EDD8" />
        </>
      )}

      {isSitting && (
        <>
          {/* Sitting paws in front */}
          <ellipse cx="21" cy="40" rx="4" ry="2.5" fill="#F4EDD8" />
          <ellipse cx="33" cy="40" rx="4" ry="2.5" fill="#F4EDD8" />
        </>
      )}

      {action === "curl" && (
        <>
          {/* Tucked paws */}
          <ellipse cx="23" cy="39" rx="3" ry="2" fill="#F4EDD8" />
          <ellipse cx="31" cy="39" rx="3" ry="2" fill="#F4EDD8" />
        </>
      )}

      {isTyping && (
        <>
          {/* Raised typing paws */}
          <ellipse cx="22" cy="35" rx="3.5" ry="2.5" fill="#F4EDD8" />
          <ellipse cx="34" cy="33" rx="3.5" ry="2.5" fill="#F4EDD8" />
        </>
      )}

      {/* Stripes */}
      <line x1="20" y1="26" x2="20" y2="34" stroke="rgba(200,170,140,0.4)" strokeWidth="1.5" />
      <line x1="23" y1="24" x2="23" y2="33" stroke="rgba(200,170,140,0.35)" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Paw print stamp ─────────────────────────────────────────
function PawPrint({ x, y, rotate = 0, opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 40 45"
      width="36"
      height="40"
      style={{
        position: "absolute",
        left: x - 18,
        top: y - 20,
        transform: `rotate(${rotate}deg)`,
        opacity,
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 4px rgba(228,64,28,0.3))",
      }}
      aria-hidden="true"
    >
      {/* Main pad */}
      <ellipse cx="20" cy="30" rx="9" ry="7" fill="var(--vermilion)" opacity="0.85" />
      {/* Toe pads */}
      <circle cx="10" cy="18" r="4.5" fill="var(--vermilion)" opacity="0.85" />
      <circle cx="18" cy="14" r="4" fill="var(--vermilion)" opacity="0.85" />
      <circle cx="26" cy="14" r="4" fill="var(--vermilion)" opacity="0.85" />
      <circle cx="32" cy="18" r="4.5" fill="var(--vermilion)" opacity="0.85" />
    </svg>
  );
}

// ─── Speech bubble ───────────────────────────────────────────
function SpeechBubble({ text, side = "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: -5 }}
      transition={{ type: "spring", damping: 14, stiffness: 180 }}
      style={{
        position: "absolute",
        bottom: "68px",
        [side === "right" ? "left" : "right"]: "0px",
        background: "var(--cream)",
        color: "var(--ink)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "5px 10px",
        border: "2px solid var(--ink)",
        borderRadius: "4px",
        whiteSpace: "nowrap",
        zIndex: 1000,
        boxShadow: "2px 2px 0 var(--ink)",
      }}
    >
      {text}
      {/* Tail of bubble */}
      <span
        style={{
          position: "absolute",
          bottom: "-8px",
          [side === "right" ? "left" : "right"]: "14px",
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "8px solid var(--ink)",
        }}
      />
    </motion.div>
  );
}

// ─── Main CatPatrol ──────────────────────────────────────────
const SECTIONS = ["home", "about", "tech-stack", "projects", "stats", "contact"];

// Time the cat spends at each section (ms)
const DWELL_TIME = {
  home: 3200,
  about: 2400,
  "tech-stack": 3000,
  projects: 3200,
  stats: 2200,
  contact: 3600,
};

export default function CatPatrol() {
  const [catX, setCatX] = useState(-80); // off-screen left initially
  const [catY, setCatY] = useState(0);
  const [facing, setFacing] = useState("right");
  const [action, setAction] = useState("walk");
  const [currentSection, setCurrentSection] = useState(null);
  const [phase, setPhase] = useState("walking"); // walking | arriving | interacting | leaving
  const [bubble, setBubble] = useState(null);
  const [tailPhase, setTailPhase] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [pawPrints, setPawPrints] = useState([]);
  const [curlBlur, setCurlBlur] = useState(false); // for project card blur
  const [spinBadge, setSpinBadge] = useState(false); // for tech badge spin
  const [meowTyped, setMeowTyped] = useState(false); // contact email field

  const rafRef = useRef(null); // movement RAF
  const tailRafRef = useRef(null); // tail wag RAF
  const sectionIdxRef = useRef(0);
  const phaseRef = useRef("walking");
  const catXRef = useRef(-80);
  const catYRef = useRef(0);
  const timeoutRefs = useRef([]);
  const pawIdRef = useRef(0);

  // ── Tail wag animation ────────────────────────────────────
  useEffect(() => {
    let t = 0;
    const tick = () => {
      t += 0.07;
      setTailPhase(t);
      tailRafRef.current = requestAnimationFrame(tick);
    };
    tailRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(tailRafRef.current);
  }, []);

  // ── Random blink ─────────────────────────────────────────
  useEffect(() => {
    const schedBlink = () => {
      const delay = 2500 + Math.random() * 3000;
      const t = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 140);
        schedBlink();
      }, delay);
      timeoutRefs.current.push(t);
    };
    schedBlink();
  }, []);

  // ── Helpers ───────────────────────────────────────
  const after = useCallback((ms, fn) => {
    const t = setTimeout(fn, ms);
    timeoutRefs.current.push(t);
    return t;
  }, []);

  const getSectionCenterY = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return window.scrollY + window.innerHeight / 2;
    const rect = el.getBoundingClientRect();
    return window.scrollY + rect.top + rect.height * 0.45;
  }, []);

  const getSectionX = useCallback((id, side = "right") => {
    const el = document.getElementById(id);
    if (!el) return window.innerWidth * 0.75;
    const rect = el.getBoundingClientRect();
    return side === "right"
      ? Math.min(rect.right - 80, window.innerWidth - 80)
      : Math.max(rect.left + 40, 40);
  }, []);

  const addPawPrint = useCallback((x, y) => {
    const id = pawIdRef.current++;
    const rotate = (Math.random() - 0.5) * 30;
    setPawPrints((prev) => [...prev, { id, x, y, rotate, opacity: 0.75 }]);
    const t1 = setTimeout(() => {
      setPawPrints((prev) => prev.map((p) => (p.id === id ? { ...p, opacity: 0 } : p)));
      const t2 = setTimeout(() => setPawPrints((prev) => prev.filter((p) => p.id !== id)), 600);
      timeoutRefs.current.push(t2);
    }, 3500);
    timeoutRefs.current.push(t1);
  }, []);

  // ── Animate cat movement ─────────────────────────────────
  const moveCatTo = useCallback((targetX, targetY, onDone) => {
    const startX = catXRef.current;
    const startY = catYRef.current;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 220; // px per second
    const duration = Math.max((dist / speed) * 1000, 300);
    const startTime = performance.now();

    let lastPawX = startX;

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const x = startX + dx * ease;
      const y = startY + dy * ease;

      catXRef.current = x;
      catYRef.current = y;
      setCatX(x);
      setCatY(y);

      // Drop paw prints every ~55px of horizontal travel
      if (Math.abs(x - lastPawX) > 55) {
        addPawPrint(x, y + 30);
        lastPawX = x;
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onDone?.();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [addPawPrint]);

  // ── Section interactions ──────────────────────────────────
  const doInteraction = useCallback((sectionId) => {
    setPhase("interacting");
    phaseRef.current = "interacting";

    switch (sectionId) {
      case "home": {
        // Stamps paw print on the screen
        setAction("sit");
        setBubble("*stamps paw*");
        after(300, () => {
          const x = catXRef.current + 30;
          const y = catYRef.current;
          for (let i = 0; i < 5; i++) {
            after(i * 180, () => {
              addPawPrint(
                x + (Math.random() - 0.5) * 80,
                y + (Math.random() - 0.5) * 60
              );
            });
          }
        });
        break;
      }

      case "about": {
        // Sits and looks curious
        setAction("sit");
        setBubble("mrrrow?");
        break;
      }

      case "tech-stack": {
        // Bats at the badge — triggers a visual spin
        setAction("walk");
        setBubble("*bats badge*");
        setSpinBadge(true);
        after(1200, () => setSpinBadge(false));

        // Scatter some paw prints near badges
        after(200, () => {
          const el = document.getElementById("tech-stack");
          if (el) {
            const rect = el.getBoundingClientRect();
            for (let i = 0; i < 4; i++) {
              after(i * 200, () => {
                addPawPrint(
                  rect.left + rect.width * (0.2 + Math.random() * 0.6),
                  window.scrollY + rect.top + rect.height * (0.3 + Math.random() * 0.4)
                );
              });
            }
          }
        });
        break;
      }

      case "projects": {
        // Curls up on a card
        setAction("curl");
        setBubble("*curls up* 😸");
        setCurlBlur(true);
        after(1800, () => setCurlBlur(false));
        break;
      }

      case "stats": {
        // Sits and admires
        setAction("sit");
        setBubble("purrrr~");
        break;
      }

      case "contact": {
        // Types meow into email field
        setAction("type");
        setBubble("meow@cat.io");
        setMeowTyped(true);
        after(2000, () => setMeowTyped(false));
        break;
      }
    }
  }, [after, addPawPrint]);

  // ── Patrol loop ───────────────────────────────────────────
  const runPatrol = useCallback(() => {
    const sections = SECTIONS;

    const visitNext = (idx) => {
      if (idx >= sections.length) {
        // Loop: walk off screen right then restart
        setAction("walk");
        setFacing("right");
        setBubble(null);
        setCurlBlur(false);

        after(300, () => {
          moveCatTo(window.innerWidth + 100, catYRef.current, () => {
            // Teleport to left and restart
            catXRef.current = -100;
            catYRef.current = getSectionCenterY(sections[0]);
            setCatX(-100);
            setCatY(catYRef.current);
            sectionIdxRef.current = 0;
            after(600, () => visitNext(0));
          });
        });
        return;
      }

      const sectionId = sections[idx];
      const targetY = getSectionCenterY(sectionId);
      const targetX = getSectionX(sectionId, idx % 2 === 0 ? "right" : "left");

      // Set facing direction
      const walkDir = targetX > catXRef.current ? "right" : "left";
      setFacing(walkDir);
      setAction("walk");
      setBubble(null);
      setCurlBlur(false);
      setSpinBadge(false);
      setMeowTyped(false);

      // Scroll cat's target section into the viewport gently
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      after(600, () => {
        moveCatTo(targetX, targetY, () => {
          // Arrived
          setPhase("arriving");
          phaseRef.current = "arriving";
          setCurrentSection(sectionId);
          setAction("sit");

          after(350, () => {
            doInteraction(sectionId);

            // Dwell then move on
            const dwell = DWELL_TIME[sectionId] ?? 2500;
            after(dwell, () => {
              setBubble(null);
              setAction("walk");
              setPhase("leaving");
              phaseRef.current = "leaving";
              sectionIdxRef.current = idx + 1;
              visitNext(idx + 1);
            });
          });
        });
      });
    };

    // Start off-screen left, at hero level
    const heroY = getSectionCenterY("home");
    catXRef.current = -100;
    catYRef.current = heroY;
    setCatX(-100);
    setCatY(heroY);
    setFacing("right");
    setAction("walk");
    visitNext(0);
  }, [moveCatTo, doInteraction, getSectionCenterY, getSectionX, after]);

  useEffect(() => {
    // Small delay before the cat enters
    const t = setTimeout(() => runPatrol(), 2200);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(tailRafRef.current);
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [runPatrol]);

  // ── Meow email interaction ────────────────────────────────
  useEffect(() => {
    if (!meowTyped) return;
    const emailInput = document.getElementById("contact-email");
    if (!emailInput) return;

    const meow = "meow@cat.io";
    let i = 0;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;

    const type = () => {
      if (i > meow.length) return;
      const val = meow.slice(0, i);
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(emailInput, val);
        emailInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
      i++;
      setTimeout(type, 95);
    };
    type();
  }, [meowTyped]);

  // ── Curl blur on first project card ──────────────────────
  useEffect(() => {
    // Apply blur to the first project card when cat curls on it
    const card = document.querySelector("[data-project-card='first']");
    if (card) {
      card.style.filter = curlBlur ? "blur(2.5px) brightness(0.8) sepia(0.3)" : "";
      card.style.transition = "filter 0.5s ease";
    }
  }, [curlBlur]);

  // ── Badge spin ────────────────────────────────────────────
  useEffect(() => {
    // Fire a custom event so the SpinBadge in Hero can react (optional)
    if (spinBadge) {
      window.dispatchEvent(new CustomEvent("cat-bat-badge"));
    }
  }, [spinBadge]);

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      {/* Paw prints scattered on page */}
      {pawPrints.map((p) => (
        <PawPrint
          key={p.id}
          x={p.x}
          y={p.y}
          rotate={p.rotate}
          opacity={p.opacity}
        />
      ))}

      {/* The cat itself */}
      <div
        style={{
          position: "absolute",
          left: catX,
          top: catY - 30,
          zIndex: 9999,
          pointerEvents: "none",
          userSelect: "none",
          transition: "top 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Speech bubble */}
        <AnimatePresence>
          {bubble && (
            <SpeechBubble
              key={bubble}
              text={bubble}
              side={facing === "right" ? "right" : "left"}
            />
          )}
        </AnimatePresence>

        {/* Walking bounce */}
        <motion.div
          animate={
            action === "walk"
              ? { y: [0, -4, 0, -3, 0], rotate: [0, 1, 0, -1, 0] }
              : action === "type"
              ? { y: [0, -2, 0, -3, 0], rotate: [0, 0.5, 0, -0.5, 0] }
              : { y: 0, rotate: 0 }
          }
          transition={
            action === "walk"
              ? { repeat: Infinity, duration: 0.45, ease: "easeInOut" }
              : action === "type"
              ? { repeat: Infinity, duration: 0.3, ease: "linear" }
              : { duration: 0.3 }
          }
        >
          <CatSprite
            facing={facing}
            action={action}
            tailPhase={tailPhase}
            blinking={blinking}
          />
        </motion.div>

        {/* Curl glow halo */}
        <AnimatePresence>
          {action === "curl" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(228,64,28,0.18) 0%, transparent 70%)",
                zIndex: -1,
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Typing sparks */}
        <AnimatePresence>
          {action === "type" && (
            <motion.div
              key="sparks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: "absolute", top: "10px", left: "20px", pointerEvents: "none" }}
            >
              {["✦", "·", "✧"].map((s, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [-2, -14, -2],
                    opacity: [0, 1, 0],
                    x: [0, (i - 1) * 10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.55,
                    delay: i * 0.18,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    fontSize: "10px",
                    color: "var(--acid)",
                    fontWeight: 900,
                  }}
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
