import React from "react";
import { motion } from "framer-motion";

// Aapke projects ka data
const projectsData = [
  {
    title: "Blogify",
    description: "A full-stack blogging ecosystem allowing users to create, edit, and interact with rich-text content. Optimized for speed and SEO, featuring a clean UI and a powerful backend CMS.",
    tech: ["React", "Node.js", "Express", "Tailwind CSS"],
    github: "#",
    live: "#",
    status: "Deployed",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    title: "VidStream // YouTube Clone",
    description: "A highly scalable video streaming platform. Engineered with robust backend logic for video uploading, processing, and seamless playback. Features secure user authentication and dynamic content delivery.",
    tech: ["Node.js", "Express", "MongoDB", "Multer", "Cloudinary"],
    github: "#",
    live: "#",
    status: "Active_Node",
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "group-hover:border-red-500/50"
  },
  {
    title: "LinkForge // URL Shortener",
    description: "A lightning-fast URL shortening service. Built to handle high-volume redirects with minimal latency. Includes click-tracking analytics and custom alias generation.",
    tech: ["JavaScript", "Node.js", "MongoDB", "Express"],
    github: "#",
    live: "#",
    status: "Optimized",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "group-hover:border-emerald-500/50"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const projectVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: "easeOut" } 
  },
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-32 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-sm bg-indigo-400 animate-pulse" />
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest">System.Executables</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Featured <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Deployments
            </span>
          </h2>
        </motion.div>

        {/* Projects List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-24 md:gap-32"
        >
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index} 
                variants={projectVariants}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center group`}
              >
                
                {/* Visual/Image Section (Glass Mockup) */}
                <div className="w-full lg:w-1/2 relative">
                  {/* Decorative background glow that activates on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className={`relative w-full aspect-[4/3] bg-[#121214]/40 backdrop-blur-xl border border-white/10 ${project.borderColor} rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2`}>
                    
                    {/* Mockup Top Bar */}
                    <div className="h-8 w-full bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 group-hover:bg-red-500 transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 group-hover:bg-yellow-500 transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 group-hover:bg-green-500 transition-colors" />
                      <div className="ml-auto text-[10px] text-zinc-500 font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.status}
                      </div>
                    </div>

                    {/* Placeholder for actual project image - Replace src when you have screenshots */}
                    <div className="w-full h-[calc(100%-2rem)] relative bg-[#0a0a0c] p-6 flex flex-col justify-center">
                       {/* Subtle Easter Egg Code in Background */}
                       <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-800 pointer-events-none select-none">
                         <p>#include &lt;iostream&gt;</p>
                         <p>using namespace std;</p>
                         <p>int main() {'{'}</p>
                         <p className="pl-4">cout &lt;&lt; "Init {project.title.split(' ')[0]}";</p>
                         <p className="pl-4">return 0;</p>
                         <p>{'}'}</p>
                       </div>
                       
                       {/* Big Abstract Title as Placeholder */}
                       <h3 className="text-3xl md:text-4xl font-black text-white/10 uppercase tracking-tighter text-center z-10 group-hover:scale-110 transition-transform duration-700">
                         {project.title.split('//')[0]}
                       </h3>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-zinc-500 font-mono text-sm">0{index + 1}</span>
                    <div className="h-[1px] w-12 bg-zinc-700" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 font-light">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-indigo-300 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Links (Terminal Style) */}
                  <div className="flex gap-6 mt-auto">
                    <a 
                      href={project.github} 
                      className="group/btn flex items-center gap-2 text-sm font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="text-indigo-500">{">"}</span> 
                      <span className="border-b border-transparent group-hover/btn:border-white transition-colors pb-0.5">cat source_code</span>
                    </a>
                    <a 
                      href={project.live} 
                      className="group/btn flex items-center gap-2 text-sm font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="text-indigo-500">{">"}</span> 
                      <span className="border-b border-transparent group-hover/btn:border-white transition-colors pb-0.5">./view_live</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;