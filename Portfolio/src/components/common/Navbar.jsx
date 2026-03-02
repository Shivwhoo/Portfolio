import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home", code: "cd ~" },
  { name: "Stack", href: "#tech-stack", code: "ls ./tech" }, // Added Tech Stack link
  { name: "Stats", href: "#stats", code: "cat stats.log" },
  { name: "Experiences", href: "#about", code: "history" },
  { name: "Projects", href: "#projects", code: "ls ./bin" },
  { name: "Contact", href: "#contact", code: "ping -c 4" },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full backdrop-blur-xl bg-[#09090b]/70 border-b border-white/5 z-[60]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          {/* Minimal Premium Logo */}
          <a
            href="#home"
            className="text-2xl font-black tracking-tighter text-white group"
          >
            Shivam
            <span className="text-indigo-500 transition-colors duration-300 group-hover:text-purple-400">
              .
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 group
                    ${isActive ? "text-indigo-400 bg-indigo-500/10" : "text-zinc-400 hover:text-white hover:bg-white/5"}
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && <span className="text-indigo-500">{">"}</span>}
                    {link.name}
                  </span>

                  {/* Active Bottom Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="navGlow"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg z-[70]"
          >
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
              }
              className="w-5 h-0.5 bg-white block transition-transform"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-white block transition-opacity"
            />
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="w-5 h-0.5 bg-white block transition-transform"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-[#09090b]/90 md:hidden flex flex-col justify-center px-8"
          >
            {/* Terminal Header for Mobile Menu */}
            <div className="absolute top-24 left-8 right-8 border-b border-white/10 pb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 font-mono text-xs text-zinc-500">
                root@shivam:~
              </span>
            </div>

            <div className="flex flex-col gap-6 mt-10">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className={`group flex flex-col font-mono ${isActive ? "text-indigo-400" : "text-zinc-400"}`}
                  >
                    <span className="text-[10px] text-zinc-600 mb-1 group-hover:text-indigo-500/50 transition-colors">
                      $ {link.code}
                    </span>
                    <span className="text-3xl font-bold tracking-tight group-hover:text-white transition-colors flex items-center gap-4">
                      {isActive && (
                        <span className="text-indigo-500 animate-pulse">
                          {">"}
                        </span>
                      )}
                      {link.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
