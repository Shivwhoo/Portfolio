import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition"
    >
      <h3 className="text-xl font-semibold mb-4">
        {project.title}
      </h3>

      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 text-sm">
        <a
          href={project.github}
          target="_blank"
          className="text-zinc-500 hover:text-indigo-400 transition"
        >
          GitHub
        </a>

        <a
          href={project.live}
          target="_blank"
          className="text-zinc-500 hover:text-indigo-400 transition"
        >
          Live Demo
        </a>
      </div>
    </motion.div>
  );
}