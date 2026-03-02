import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Smoother spring configuration for that premium feel
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate random particles
  const particles = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-950 overflow-hidden">
      
      {/* Subtle Developer Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

{/* Primary Cursor Glow */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY,
          willChange: "transform" // <--- YEH LINE ZAROORI HAI GPU ACCELERATION KE LIYE
        }}
        className="absolute left-0 top-0 w-[600px] h-[600px] 
                   bg-indigo-600/15 rounded-full blur-[120px] mix-blend-screen"
      />
      
      {/* Secondary Cursor Glow (Inner Core) */}
      <motion.div
        style={{ 
          x: springX, 
          y: springY,
          willChange: "transform" // <--- YEH LINE BHI ZAROORI HAI
        }}
        className="absolute left-[150px] top-[150px] w-[300px] h-[300px] 
                   bg-purple-500/20 rounded-full blur-[90px] mix-blend-screen"
      />

      {/* Ambient Corner Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />

      {/* Floating Particles Effect */}
     {/* Floating Particles Effect */}
      {windowSize.width > 0 && particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400/30 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          animate={{
            y: [0, -(Math.random() * 150 + 50)],
            x: [0, (Math.random() * 100 - 50)],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 7,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}