import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { slideUp, slideLeft, slideRight } from "../../hooks/useScrollAnimation";

// ─── About Me ─────────────────────────────────────────────
export default function AboutMe() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0]);

  // Base misregistration overlay states
  const [cyanOffset, setCyanOffset] = useState({ x: 0, y: 0 });
  const [magentaOffset, setMagentaOffset] = useState({ x: 0, y: 0 });
  const [isBioHovered, setIsBioHovered] = useState(false);

  // Add-on: Split-personality horizontal offsets
  const [sliceX, setSliceX] = useState([0, 0, 0]);

  // Add-on: Ink Vomit overlays
  const [inkVomits, setInkVomits] = useState([]);

  // Add-on: Text-eating worm bio text state
  const originalBio = "I'm a full-stack engineer who builds at 2am and ships by morning. Studying CS at IIIT Dharwad, I obsess over clean architecture, fast feedback loops, and making the web feel alive.";
  const [displayedBio, setDisplayedBio] = useState(originalBio);
  const [wormIndex, setWormIndex] = useState(0);

  // Interval loops
  useEffect(() => {
    // 1. Ghost overlay registration shift
    const ghostInterval = setInterval(() => {
      setCyanOffset({
        x: (Math.random() - 0.5) * 3.5,
        y: (Math.random() - 0.5) * 3.5,
      });
      setMagentaOffset({
        x: (Math.random() - 0.5) * 3.5,
        y: (Math.random() - 0.5) * 3.5,
      });
    }, 200);

    // 2. Split slice horizontal displacements
    const sliceInterval = setInterval(() => {
      setSliceX([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 9,
      ]);
    }, 350);

    // 3. Ink vomit trigger (every 10s)
    const vomitInterval = setInterval(() => {
      const left = 10 + Math.random() * 70;
      const top = 10 + Math.random() * 70;
      const size = 100 + Math.random() * 140;
      const rotate = Math.random() * 360;
      const id = Date.now();
      
      setInkVomits((prev) => [...prev, { id, left, top, size, rotate }]);
    }, 10000);

    return () => {
      clearInterval(ghostInterval);
      clearInterval(sliceInterval);
      clearInterval(vomitInterval);
    };
  }, []);

  // 4. Text-eating worm simulation
  useEffect(() => {
    const wormInterval = setInterval(() => {
      setWormIndex((idx) => {
        const nextIdx = (idx + 1) % originalBio.length;
        const chars = originalBio.split("");
        const wormLen = 6;
        const corruptionLen = 8;

        for (let i = 0; i < chars.length; i++) {
          if (i >= nextIdx && i < nextIdx + wormLen) {
            const wormSegments = ["~", "~", "~", "=", "=", "o"];
            chars[i] = wormSegments[(i - nextIdx) % wormSegments.length];
          } else if (i >= nextIdx - corruptionLen && i < nextIdx) {
            const glyphs = ["█", "░", "▒", "@", "%", "&", "$", "#", "0", "1"];
            chars[i] = glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
        setDisplayedBio(chars.join(""));
        return nextIdx;
      });
    }, 180);

    return () => clearInterval(wormInterval);
  }, []);

  return (
    <section ref={containerRef} style={{ position: "relative", padding: "3.5rem 1.5rem", overflow: "clip" }}>
      <motion.div style={{ position: "absolute", inset: 0, background: "var(--cream)", opacity: bgOpacity, pointerEvents: "none" }} />

      {/* Random Ink Vomit Overlays */}
      <AnimatePresence>
        {inkVomits.map((vom) => (
          <motion.div
            key={vom.id}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.14 }}
            exit={{ opacity: 0 }}
            transition={{ scale: { type: "spring", stiffness: 180, damping: 12 }, opacity: { duration: 0.2 } }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setInkVomits((prev) => prev.filter((item) => item.id !== vom.id));
              }, 8000);
            }}
            style={{
              position: "absolute",
              left: `${vom.left}%`,
              top: `${vom.top}%`,
              width: `${vom.size}px`,
              height: `${vom.size}px`,
              transform: `translate(-50%, -50%) rotate(${vom.rotate}deg)`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", fill: Math.random() > 0.5 ? "var(--vermilion)" : "var(--acid)" }}>
              <path d="M50,10 C40,25 20,20 15,35 C10,50 30,55 25,70 C20,85 45,75 50,90 C55,75 80,85 75,70 C70,55 90,50 85,35 C80,20 60,25 50,10 Z" />
              <circle cx="22" cy="18" r="4" />
              <circle cx="78" cy="82" r="5" />
              <circle cx="82" cy="22" r="3" />
              <circle cx="18" cy="72" r="4" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div {...slideUp} style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ marginBottom: "1rem", display: "inline-flex" }}>The Artist</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 0.9, color: "var(--cream)", marginTop: "0.5rem" }}>
            About<br /><span style={{ color: "var(--vermilion)" }}>Me.</span>
          </h2>
        </motion.div>

        {/* Portrait + bio grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "start" }}>

          {/* Split-personality Portrait */}
          <motion.div {...slideLeft} style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "10px", left: "10px", right: "-10px", bottom: "-10px", background: "var(--vermilion)", opacity: 0.5, zIndex: 0 }} />
            
            <div style={{ position: "relative", zIndex: 1, border: "2.5px solid var(--cream)", background: "var(--charcoal-2)", height: "380px", overflow: "hidden" }}>
              {[0, 1, 2].map((i) => {
                const clipPaths = [
                  "polygon(0% 0%, 100% 0%, 100% 33.33%, 0% 33.33%)",
                  "polygon(0% 33.33%, 100% 33.33%, 100% 66.66%, 0% 66.66%)",
                  "polygon(0% 66.66%, 100% 66.66%, 100% 100%, 0% 100%)"
                ];
                return (
                  <motion.div
                    key={i}
                    animate={{ x: sliceX[i] }}
                    transition={{ type: "spring", stiffness: 180, damping: 12 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      clipPath: clipPaths[i],
                      overflow: "hidden",
                    }}
                  >
                    {/* Original Portrait */}
                    <img src="/portrait.png" alt="Shivam Kishore" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "contrast(1.1) saturate(0.95)" }} />

                    {/* Cyan ghost overlay */}
                    <img
                      src="/portrait.png"
                      alt=""
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        mixBlendMode: "screen",
                        opacity: 0.5,
                        filter: "contrast(1.6) sepia(1) hue-rotate(160deg) saturate(3)",
                        transform: `translate(${cyanOffset.x}px, ${cyanOffset.y}px)`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Magenta ghost overlay */}
                    <img
                      src="/portrait.png"
                      alt=""
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        mixBlendMode: "screen",
                        opacity: 0.5,
                        filter: "contrast(1.6) sepia(1) hue-rotate(300deg) saturate(3)",
                        transform: `translate(${magentaOffset.x}px, ${magentaOffset.y}px)`,
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>
                );
              })}

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(228,64,28,0.65), transparent)", mixBlendMode: "multiply", zIndex: 5, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem", background: "var(--vermilion)", padding: "0.35rem 0.8rem", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--cream)", zIndex: 6 }}>
                Shivam Kishore
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            {...slideRight}
            style={{ paddingTop: "0.5rem" }}
            onMouseEnter={() => setIsBioHovered(true)}
            onMouseLeave={() => setIsBioHovered(false)}
          >
            {/* Stats strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", marginBottom: "2rem", border: "1px solid rgba(244,237,216,0.12)" }}>
              {[
                { val: "300+", label: "DSA Solved" },
                { val: "1446", label: "LeetCode" },
                { val: "8.9+", label: "CGPA" },
              ].map(({ val, label }) => (
                <div key={label} style={{ padding: "1rem", borderRight: "1px solid rgba(244,237,216,0.12)", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.8rem", color: "var(--vermilion)", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(244,237,216,0.4)", marginTop: "0.25rem" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Eaten/Glitched bio paragraph */}
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              lineHeight: 1.85,
              color: "rgba(244,237,216,0.7)",
              marginBottom: "1.5rem",
              transition: "text-shadow 0.35s ease, color 0.35s ease",
              ...(isBioHovered ? {
                color: "var(--cream)",
                textShadow: "0 2px 1px rgba(228,64,28,0.5), 0 4px 3px rgba(255,213,0,0.35), 0 7px 6px rgba(228,64,28,0.2)"
              } : {})
            }}>
              {displayedBio}
            </p>

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              lineHeight: 1.85,
              color: "rgba(244,237,216,0.55)",
              transition: "text-shadow 0.35s ease, color 0.35s ease",
              ...(isBioHovered ? {
                color: "var(--cream)",
                textShadow: "0 2px 1px rgba(228,64,28,0.5), 0 4px 3px rgba(255,213,0,0.35), 0 7px 6px rgba(228,64,28,0.2)"
              } : {})
            }}>
              When I'm not building, I'm competing — on LeetCode, Codeforces, or a badminton court. Hackathons, open mics, and event stages have all had me on them.
            </p>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", border: "2px solid var(--acid)", background: "rgba(255,213,0,0.05)" }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--acid)", display: "inline-block", animation: "breath 1.5s ease-in-out infinite" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--acid)" }}>
                Available for internships & collaborations
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}