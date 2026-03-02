import { motion } from "framer-motion";
import { fadeInUp } from "../../lib/motionVariants";
import { projects } from "./projectsData";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section className="py-24 px-6">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}