/**
 * useScrollAnimation.js
 * 
 * Reverted all page section transitions to immediate static states to
 * resolve page-reload choppiness and CPU load during initial render.
 */

// ── Base viewport config (no-op) ──────────────────────────
export const viewport = {};

// ── Slide up + fade (Static) ──────────────────────────────
export const slideUp = {
  initial:    { opacity: 1, y: 0 },
  animate:    { opacity: 1, y: 0 },
  transition:  { duration: 0 },
};

export const slideUpFast = {
  initial:    { opacity: 1, y: 0 },
  animate:    { opacity: 1, y: 0 },
  transition:  { duration: 0 },
};

// ── Slide from left (Static) ──────────────────────────────
export const slideLeft = {
  initial:    { opacity: 1, x: 0 },
  animate:    { opacity: 1, x: 0 },
  transition:  { duration: 0 },
};

// ── Slide from right (Static) ─────────────────────────────
export const slideRight = {
  initial:    { opacity: 1, x: 0 },
  animate:    { opacity: 1, x: 0 },
  transition:  { duration: 0 },
};

// ── Ink-layer press (Static) ──────────────────────────────
export const inkLayer = {
  initial:    { opacity: 1, y: 0, filter: "none" },
  animate:    { opacity: 1, y: 0, filter: "none" },
  transition:  { duration: 0 },
};

// ── Stamp in (Static) ─────────────────────────────────────
export const stampIn = {
  initial:    { opacity: 1, scale: 1, filter: "none" },
  animate:    { opacity: 1, scale: 1, filter: "none" },
  transition:  { duration: 0 },
};

// ── Scale up (Static) ─────────────────────────────────────
export const scaleIn = {
  initial:    { opacity: 1, scale: 1 },
  animate:    { opacity: 1, scale: 1 },
  transition:  { duration: 0 },
};

// ── Stagger children container (Static) ───────────────────
export const staggerContainer = {
  initial:    { opacity: 1 },
  animate:    { opacity: 1 },
  transition:  { duration: 0 },
};

// ── Stagger child (Static) ────────────────────────────────
export const staggerChild = {
  initial:    { opacity: 1, y: 0 },
  animate:    { opacity: 1, y: 0 },
  transition:  { duration: 0 },
};

// ── Line draw (Static) ────────────────────────────────────
export const lineDraw = {
  initial:    { scaleX: 1, opacity: 1 },
  animate:    { scaleX: 1, opacity: 1 },
  transition:  { duration: 0 },
  style:       { transformOrigin: "left" },
};

// ── Fade in only (Static) ─────────────────────────────────
export const fadeIn = {
  initial:    { opacity: 1 },
  animate:    { opacity: 1 },
  transition:  { duration: 0 },
};
