import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home",     href: "#home" },
  { name: "About",    href: "#about" },
  { name: "Stack",    href: "#tech-stack" },
  { name: "Stats",    href: "#stats" },
  { name: "Projects", href: "#projects" },
  { name: "Timeline", href: "#timeline" },
  { name: "Contact",  href: "#contact" },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll depth
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lock scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 60,
    background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(228,64,28,0.15)" : "none",
    transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
  };

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={navStyle}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              if (window.lenis) {
                window.lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{ textDecoration: "none" }}
            aria-label="Home"
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "var(--cream)",
              }}
            >
              SK
              <span style={{ color: "var(--vermilion)" }}>.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) {
                      if (window.lenis) {
                        window.lenis.scrollTo(target, { offset: -80 });
                      } else {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  style={{
                    position: "relative",
                    padding: "0.5rem 0.875rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--vermilion)" : "rgba(244,237,216,0.45)",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--cream)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(244,237,216,0.45)";
                  }}
                >
                  {link.name}
                  {/* Active indicator — animated underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        left: "0.875rem",
                        right: "0.875rem",
                        height: "2px",
                        background: "var(--vermilion)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* CTA Resume pill */}
            <a
              href="/Shivam%20Kishore%20CV-MAY.pdf"
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: "1rem",
                padding: "0.45rem 1rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--cream)",
                border: "1.5px solid var(--vermilion)",
                textDecoration: "none",
                background: "transparent",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--vermilion)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              CV
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "40px",
              height: "40px",
              background: "transparent",
              border: "1.5px solid rgba(244,237,216,0.15)",
              cursor: "pointer",
              zIndex: 70,
              position: "relative",
            }}
            className="mobile-only"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  isMobileMenuOpen
                    ? i === 0
                      ? { rotate: 45, y: 10 }
                      : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -10 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  background: "var(--cream)",
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 55,
              background: "rgba(10,10,10,0.97)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {/* Mobile nav links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                        const target = document.querySelector(link.href);
                        if (target) {
                          if (window.lenis) {
                            window.lenis.scrollTo(target, { offset: -80 });
                          } else {
                            target.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }, 300);
                    }}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(2rem, 10vw, 3.5rem)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      color: isActive ? "var(--vermilion)" : "var(--cream)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(244,237,216,0.06)",
                      padding: "0.6rem 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "color 0.15s",
                    }}
                  >
                    {isActive && (
                      <span style={{ color: "var(--vermilion)", fontSize: "0.5em" }}>◆</span>
                    )}
                    {link.name}
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom info in mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                right: "2rem",
                borderTop: "1px solid rgba(244,237,216,0.08)",
                paddingTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(244,237,216,0.2)",
                }}
              >
                Shivam Kishore · 2026
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(228,64,28,0.4)",
                }}
              >
                Full Stack Engineer
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for responsive */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
