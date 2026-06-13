import { motion } from "framer-motion";

export default function SqueegeeWipe() {
  return (
    <div
      style={{
        position: "relative",
        height: "120px",
        background: "var(--charcoal)",
        overflow: "hidden",
        borderTop: "1.5px solid rgba(244,237,216,0.08)",
        borderBottom: "1.5px solid rgba(244,237,216,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Red ink squeegee screen sweep */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          background: "var(--vermilion)",
          zIndex: 1,
        }}
      />
      {/* Squeegee edge line handle */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "4px",
          background: "var(--cream)",
          zIndex: 2,
        }}
      />

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          color: "rgba(244,237,216,0.25)",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 0,
        }}
      >
        ◆ OVERPRINT INK LAYER PULL ◆
      </span>
    </div>
  );
}
