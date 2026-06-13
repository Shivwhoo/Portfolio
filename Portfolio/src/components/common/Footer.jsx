import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main footer bar */}
      <footer
        style={{
          background: "var(--ink)",
          borderTop: "2px solid var(--vermilion)",
          padding: "1.5rem 2rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }} style={{ textDecoration: "none" }} aria-label="Back to top">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--cream)" }}>
              SK<span style={{ color: "var(--vermilion)" }}>.</span>
            </span>
          </a>

          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(244,237,216,0.2)" }}>
            © {year} Shivam Kishore · Built with React + Framer Motion
          </span>

          {/* Back to top in footer — text only, not the FAB */}
          <button
            onClick={scrollToTop}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(228,64,28,0.5)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color 0.15s",
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--vermilion)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(228,64,28,0.5)")}
          >
            ↑ Back to top
          </button>
        </div>
      </footer>

      {/* Floating scroll-to-top button — fixed bottom-right, only appears after scrolling */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 100,
              width: "44px",
              height: "44px",
              background: "var(--vermilion)",
              border: "2px solid var(--ink)",
              color: "var(--cream)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "3px 3px 0 var(--ink)",
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              transition: "transform 0.15s",
            }}
            whileHover={{ y: -4, boxShadow: "3px 7px 0 var(--ink)" }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}