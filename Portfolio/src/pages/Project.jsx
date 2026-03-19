import React from "react";
import { motion } from "framer-motion";

// Aapke projects ka data
const projectsData = [
  {
    title: "Pingster // Real-Time Comms Matrix",
    description:
      "A high-performance, full-stack chat application engineered for instant payload delivery. Features secure 1-on-1 communication tunnels, dynamic group clusters, live typing indicators, and seamless multimedia integration. Built with an optimized Socket.io architecture and a responsive, cyberpunk-inspired UI/UX.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Redux", "Cloudinary"],
    github: "https://github.com/Shivwhoo/Pingster",
    live: "https://pingster-opal.vercel.app/",
    status: "Deployed",
    color: "from-purple-500/20 to-emerald-500/20",
    borderColor: "group-hover:border-purple-500/50",
    image:"C:\Users\shiva\Desktop\Portfolio\Portfolio\src\main.jsx"
  },
  {
    title: "Blogify // BLOG Apllication",
    description:
      "A full-stack blogging ecosystem allowing users to create, edit, and interact with rich-text content. Optimized for speed and SEO, featuring a clean UI and a powerful backend CMS.",
    tech: ["React", "Node.js", "Express", "Tailwind CSS"],
    github: "https://github.com/Shivwhoo/Blogify-React-Node.js",
    live: "https://pingster-opal.vercel.app/",
    status: "Not-deployed",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-blue-500/50",
  },
  {
    title: "Portfolio // Personal Brand Engine",
    description:
      "A fully immersive developer portfolio engineered to showcase projects as products, not just code. Built with a strong focus on UI/UX, performance, and storytelling, it delivers a 3D-inspired interactive experience with smooth animations, dynamic project rendering, and responsive design. Designed to function as both a personal brand hub and a conversion tool for recruiters and collaborators.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Three.js"],
    github: "https://github.com/Shivwhoo/Portfolio",
    live: "https://portfolio-silk-three-85.vercel.app/",
    status: "Live 🚀",
    color: "from-purple-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-purple-400/60",
  },
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
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden bg-transparent"
    >
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
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest">
              System.Executables
            </span>
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
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center group`}
              >
                {/* Visual/Image Section (Glass Mockup) */}
                <div className="w-full lg:w-1/2 relative">
                  {/* Decorative background glow that activates on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  <div
                    className={`relative w-full aspect-[4/3] bg-[#121214]/40 backdrop-blur-xl border border-white/10 ${project.borderColor} rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2`}
                  >
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
                    <div className="w-full h-[calc(100%-2rem)] relative bg-[#0a0a0c] p-6 flex flex-col justify-center overflow-hidden group/card">
                      {/* Layer 1: Subtle Easter Egg Code */}
                      <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-800 pointer-events-none select-none transition-colors duration-500 group-hover/card:text-[#39ff14]/60">
                        <p>#include &lt;iostream&gt;</p>
                        <p>using namespace std;</p>
                        <p>int main() {"{"}</p>
                        <p className="pl-4">
                          cout &lt;&lt; "Init {project.title.split(" ")[0]}";
                        </p>
                        <p className="pl-4">return 0;</p>
                        <p>{"}"}</p>
                      </div>

                      {/* Layer 2: Big Abstract Title (Pehle wala mast logic) */}
                      <h3 className="text-3xl md:text-4xl font-black text-white/10 uppercase tracking-tighter text-center z-10 group-hover/card:scale-110 group-hover/card:text-white/30 transition-all duration-700 pointer-events-none">
                        {project.title.split("//")[0]}
                      </h3>

                      {/* Layer 3: The PNG Image */}
                      {/* Default: Opacity 80% (taaki thoda dark/edgy lage). Hover: Opacity 5% (to reveal the code behind it) */}
                      {project.image && (
                        <img
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          className="absolute inset-0 w-full h-full object-cover object-top z-20 opacity-80 group-hover/card:opacity-5 transition-all duration-500"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-zinc-500 font-mono text-sm">
                      0{index + 1}
                    </span>
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
                      <span className="border-b border-transparent group-hover/btn:border-white transition-colors pb-0.5">
                        cat source_code
                      </span>
                    </a>
                    <a
                      href={project.live}
                      className="group/btn flex items-center gap-2 text-sm font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="text-indigo-500">{">"}</span>
                      <span className="border-b border-transparent group-hover/btn:border-white transition-colors pb-0.5">
                        ./view_live
                      </span>
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
