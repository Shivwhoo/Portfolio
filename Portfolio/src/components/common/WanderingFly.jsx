import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WanderingFly() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [isSwatted, setIsSwatted] = useState(false);
  const [stains, setStains] = useState([]);

  const flyRef = useRef(null);
  const checkTimer = useRef(0);

  // Random walk pathing loop
  useEffect(() => {
    if (isSwatted) return;

    // Start inside the viewport
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let tx = Math.random() * window.innerWidth;
    let ty = Math.random() * window.innerHeight;

    let animId;
    const move = () => {
      // Linear interpolation towards target coords
      x += (tx - x) * 0.025;
      y += (ty - y) * 0.025;

      // Select new target when close
      if (Math.abs(tx - x) < 25 && Math.abs(ty - y) < 25) {
        tx = Math.random() * (window.innerWidth - 40) + 20;
        ty = Math.random() * (window.innerHeight - 40) + 20;
      }

      setPos({ x, y });

      const rad = Math.atan2(ty - y, tx - x);
      setAngle(rad * (180 / Math.PI) + 90); // base offset rotate

      // Throttled document element lookup for glitching
      checkTimer.current++;
      if (checkTimer.current % 12 === 0) {
        try {
          const el = document.elementFromPoint(x, y);
          if (el && el.tagName && ["SPAN", "H1", "H2", "H3", "P", "IMG", "BUTTON", "A"].includes(el.tagName)) {
            // Glitch target briefly
            const prevFilter = el.style.filter;
            const prevTransform = el.style.transform;
            
            el.style.filter = "invert(1) hue-rotate(120deg)";
            el.style.transform = `${prevTransform} skewX(8deg) scale(0.98)`;
            
            setTimeout(() => {
              el.style.filter = prevFilter;
              el.style.transform = prevTransform;
            }, 180);
          }
        } catch (err) {
          // ignore off-screen or scroll errors
        }
      }

      animId = requestAnimationFrame(move);
    };

    animId = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animId);
  }, [isSwatted]);

  // Click handler to SWAT
  const handleSwat = (e) => {
    e.stopPropagation();
    setIsSwatted(true);
    
    // Spawn ink stain at coordinate
    const newStain = {
      id: Date.now(),
      x: pos.x,
      y: pos.y,
      size: 40 + Math.random() * 30,
      rotate: Math.random() * 360,
    };
    
    setStains((prev) => [...prev, newStain]);

    // Respawn fly after 30 seconds
    setTimeout(() => {
      setIsSwatted(false);
    }, 30000);
  };

  return (
    <>
      {/* Splat marks left behind */}
      <AnimatePresence>
        {stains.map((stain) => (
          <motion.div
            key={stain.id}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 10 }}
            onAnimationComplete={() => {
              // Fade stains out after 15 seconds
              setTimeout(() => {
                setStains((prev) => prev.filter((item) => item.id !== stain.id));
              }, 15000);
            }}
            style={{
              position: "fixed",
              left: stain.x,
              top: stain.y,
              width: `${stain.size}px`,
              height: `${stain.size}px`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 9990,
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", fill: "var(--vermilion)", transform: `rotate(${stain.rotate}deg)` }}>
              <path d="M50,30 C30,30 20,45 10,50 C20,55 35,50 45,65 C55,70 50,85 60,80 C70,75 85,85 80,65 C75,55 90,50 85,40 C75,35 60,30 50,30 Z" />
              <circle cx="30" cy="30" r="3" />
              <circle cx="70" cy="70" r="4" />
              <circle cx="20" cy="60" r="2" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Wandering Fly */}
      <AnimatePresence>
        {!isSwatted && (
          <motion.div
            ref={flyRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            onClick={handleSwat}
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y,
              width: "16px",
              height: "16px",
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              cursor: "crosshair",
              zIndex: 9995,
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Fly Graphic */}
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              {/* Fly Body */}
              <ellipse cx="50" cy="50" rx="12" ry="22" fill="#111" stroke="#444" strokeWidth="2" />
              <circle cx="50" cy="22" r="8" fill="#111" />
              {/* Left Wing */}
              <ellipse cx="32" cy="42" rx="8" ry="18" fill="rgba(244,237,216,0.35)" stroke="#666" strokeWidth="1" transform="rotate(-30 32 42)" />
              {/* Right Wing */}
              <ellipse cx="68" cy="42" rx="8" ry="18" fill="rgba(244,237,216,0.35)" stroke="#666" strokeWidth="1" transform="rotate(30 68 42)" />
              {/* Legs */}
              <path d="M 34,40 Q 20,38 18,34" fill="none" stroke="#111" strokeWidth="3" />
              <path d="M 34,50 Q 18,52 14,48" fill="none" stroke="#111" strokeWidth="3" />
              <path d="M 66,40 Q 80,38 82,34" fill="none" stroke="#111" strokeWidth="3" />
              <path d="M 66,50 Q 82,52 86,48" fill="none" stroke="#111" strokeWidth="3" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
