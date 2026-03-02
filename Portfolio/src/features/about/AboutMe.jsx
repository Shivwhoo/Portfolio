import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

// Naya data structure jisme tags aur status add kiye hain back-face ko cool banane ke liye
const timelineEvents = [
  {
    id: 1,
    date: "2024 - 2028 (Ongoing)",
    title: "B.Tech at IIIT Dharwad",
    desc: "Computer Science undergraduate at IIIT Dharwad with a consistent 8.9+ CGPA. Focused on mastering core CS fundamentals, systems thinking, and scalable problem-solving.",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-indigo-500/30",
    tags: ["CS Fundamentals", "CGPA: 8.9+", "Systems Thinking"],
    status: "PROCESSING_NODE"
  },
  {
    id: 2,
    date: "Ongoing",
    title: "Problem Solving & Hackathons",
    desc: "Solved 300+ DSA problems across platforms. LeetCode rating: 1446.777. Codeforces rating: 733. Secured 4th place at Tech Odyssey Hackathon. I compete to win, not participate.",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    tags: ["DSA", "LeetCode: 1446", "CodeForces: 733"],
    status: "COMPETITIVE_MODE"
  },
  {
    id: 3,
    date: "Recent Projects",
    title: "Full-Stack Development",
    desc: "Engineered production-ready backend systems including Blogify (full-stack web app) and a high-performance URL Shortener with analytics and optimized server-side architecture.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-teal-500/30",
    tags: ["Node.js", "Express", "MongoDB", "Architecture"],
    status: "DEPLOYED_SUCCESS"
  },
  {
    id: 4,
    date: "Active",
    title: "Leadership & Communities",
    desc: "Emcee and Event Lead at Zeitgeist Literary & Cultural Club, driving events for 500+ attendees. Active Web Development member at Velocity, contributing to technical initiatives and peer growth.",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    tags: ["Leadership", "Event Management", "Team Building"],
    status: "ACTIVE_THREAD"
  },
  {
    id: 5,
    date: "2020-2022",
    title: "Class XII (ISC)",
    desc: "Completed XII ISC from Don Bosco Academy, Patna with 92.4%. Built academic discipline and competitive consistency early on.",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    tags: ["92.4%", "Physics", "Chemistry", "Maths"],
    status: "ARCHIVED_DATA"
  },
  {
    id: 6,
    date: "2020",
    title: "Class X (ISCE)",
    desc: "Completed X ICSE from Don Bosco Academy, Patna with 89.9%. Strong academic foundation across mathematics and sciences.",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    tags: ["89.9%", "Foundation", "Academics"],
    status: "ARCHIVED_DATA"
  },
  {
    id: 7,
    date: "Dec 2025",
    title: "Sports Achievement",
    desc: "Bronze Medalist – Intra IIIT Badminton Tournament. Competitive mindset extends beyond code. Gotta keep the physical hustle as strong as the coding grind!",
    color: "from-yellow-500/20 to-amber-500/20",
    border: "border-yellow-500/30",
    tags: ["Badminton", "Bronze Medal", "Agility"],
    status: "UNLOCKED_ACHIEVEMENT"
  },
];

const TimelineCard = ({ event, index }) => {
  const isEven = index % 2 === 0;
  const [isFlipped, setIsFlipped] = useState(false);

  // Convert title to a terminal-friendly path (e.g., "B.Tech at IIIT Dharwad" -> "b.tech_at_iiit_dharwad")
  const terminalPath = event.title.toLowerCase().replace(/ /g, '_').replace(/[^a-z0-9_]/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative flex items-center md:justify-between w-full ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-[14px] md:left-1/2 w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] border-2 border-slate-950 transform md:-translate-x-1/2 z-20" />

      <div className="hidden md:block w-[45%]" />

      <div 
        className="w-[calc(100%-3rem)] ml-[3rem] md:ml-0 md:w-[45%] z-10 h-[280px] md:h-[320px] [perspective:1000px]"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)} 
      >
        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d] cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1 }}
        >
          {/* ===== FRONT FACE ===== */}
          <div className={`absolute inset-0 w-full h-full rounded-[2rem] p-8 md:p-10 overflow-hidden bg-white/5 backdrop-blur-xl border ${event.border} shadow-2xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-center group`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-medium text-zinc-300 mb-6 backdrop-blur-md">
                {event.date}
              </span>
              <h3 className="text-2xl md:text-4xl font-semibold text-white mb-2 leading-tight">
                {event.title}
              </h3>
              <p className="text-indigo-400 mt-4 font-mono text-xs flex items-center gap-2 uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                [ Initialize Scan ]
                <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </p>
            </div>

            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl ${event.color} rounded-full blur-[40px] opacity-30`} />
          </div>

          {/* ===== BACK FACE (UPGRADED MAGICAL CONTENT) ===== */}
          <div className={`absolute inset-0 w-full h-full rounded-[2rem] p-6 md:p-8 overflow-hidden bg-[#0a0a0e]/95 backdrop-blur-3xl border ${event.border} shadow-2xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col`}>
            <div className={`absolute inset-0 bg-gradient-to-tl ${event.color} opacity-5`} />
            
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 relative z-10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                {event.status}
              </span>
            </div>

            {/* Terminal Content */}
            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-white mb-3 font-mono border-l-2 border-indigo-500 pl-2">
                <span className="text-indigo-500">~/timeline/</span>{terminalPath}
              </h3>
              
              <div className="text-zinc-400 leading-relaxed text-xs md:text-sm font-mono flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <span className="text-green-400 mr-2">{">"}</span>
                {event.desc}
              </div>

              {/* Tech/Stat Pills Row */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                {event.tags && event.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Big Watermark Number in the Background */}
            <div className="absolute -bottom-6 -right-2 text-[8rem] leading-none font-black text-white/[0.03] pointer-events-none select-none z-0">
              {`0${index + 1}`}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function AboutMe() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end bottom"]
  });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 relative z-10 max-w-6xl mx-auto">
      
      {/* Section Title */}
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent"
        >
          Experiences
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 mt-4 text-lg"
        >
          Hover over the cards to execute log files.
        </motion.p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        
        {/* ================= DESKTOP FUNKY CURVED LINE ================= */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-32 -translate-x-1/2 z-0 opacity-80 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="curve-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                <stop offset="30%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="70%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M 50 0 C 130 12.5, -30 25, 50 37.5 C 130 50, -30 62.5, 50 75 C 130 87.5, -30 100, 50 100" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke" 
            />
            <motion.path 
              d="M 50 0 C 130 12.5, -30 25, 50 37.5 C 130 50, -30 62.5, 50 75 C 130 87.5, -30 100, 50 100" 
              fill="none" 
              stroke="url(#curve-grad)" 
              strokeWidth="4" 
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: scrollYProgress }} 
              className="drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
            />
          </svg>
        </div>
        
        {/* ================= MOBILE FUNKY CURVED LINE ================= */}
        <div className="block md:hidden absolute left-0 top-0 bottom-0 w-12 z-0 opacity-80 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="mobile-curve-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M 33 0 C 100 12.5, -20 25, 33 37.5 C 100 50, -20 62.5, 33 75 C 100 87.5, -20 100, 33 100" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke" 
            />
            <motion.path 
              d="M 33 0 C 100 12.5, -20 25, 33 37.5 C 100 50, -20 62.5, 33 75 C 100 87.5, -20 100, 33 100" 
              fill="none" 
              stroke="url(#mobile-curve-grad)" 
              strokeWidth="3" 
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </div>

        {/* 3D FLIP CARDS CONTAINER */}
        <div className="flex flex-col gap-16 md:gap-12 mt-10">
          {timelineEvents.map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}