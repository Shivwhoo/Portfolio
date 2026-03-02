import React from "react";
import { motion } from "framer-motion";

// Devicon & Simple-Icons URLs for Tech Stack
const techData = [
  {
    category: "Languages",
    description: "Core logic & scripting",
    skills: [
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    category: "Frontend",
    description: "UI / UX & Client side",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    category: "Backend",
    description: "Server, Auth & Logic",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg", invertDark: true },
      // Multer is an NPM package, so using the NPM logo to represent it
      { name: "Multer", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/npm.svg", invertDark: true },
    ],
  },
  {
    category: "Databases & Cloud",
    description: "Storage, Media & VCS",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Cloudinary", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/cloudinary.svg", invertDark: true },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invertDark: true },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const TechStack = () => {
  return (
    // Note: 'bg-[#09090b]' is REMOVED and 'bg-transparent' is added.
    <section id="tech-stack" className="py-24 relative overflow-hidden bg-transparent">
      
      {/* STATIC BACKGROUND GLOW IS REMOVED SO YOUR INTERACTIVE BACKGROUND SHINES THROUGH */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 backdrop-blur-md">
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest">System.Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Stack</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto font-mono text-sm">
            {">"} Loading core dependencies, databases, and cloud services...
          </p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techData.map((category, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              // Made the background more transparent (bg-[#121214]/40) and added backdrop-blur-lg
              className="group bg-[#121214]/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-white/[0.05] transition-all duration-500 flex flex-col shadow-xl"
            >
              {/* Category Header */}
              <div className="mb-6 border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors duration-300">
                  {category.category}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  // {category.description}
                </p>
              </div>

              {/* Skills Grid inside the Card */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                {category.skills.map((skill, i) => {
                  // If odd number of items, make the last item span 2 columns to keep it symmetrical
                  const isLastOddItem = category.skills.length % 2 !== 0 && i === category.skills.length - 1;
                  
                  return (
                    <div 
                      key={i} 
                      // Transparent skill boxes for better blending
                      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 ${isLastOddItem ? 'col-span-2' : ''}`}
                    >
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className={`w-9 h-9 object-contain mb-2 ${skill.invertDark ? 'brightness-0 invert opacity-80' : ''}`} 
                      />
                      <span className="text-[11px] font-mono text-zinc-300 text-center uppercase tracking-wider">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TechStack;