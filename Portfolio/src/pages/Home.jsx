import { motion } from "framer-motion";
// Link import hata sakte ho agar ab hum IDs use kar rahe hain
import { fadeInUp, staggerContainer } from "../lib/motionVariants";
import ProjectsSection from "./Project";
import HeroSection from "./Hero";
import TechStack from "./Techstack";
import ContactSection from "./Contact";
import StatsSection from "../features/stats/StatsSection";
import InteractiveBackground from "../components/InteractiveBackground";
import AboutMe from '../features/about/AboutMe'

export default function Home() {
  const name = "Shivam Kishore";

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* GLOBAL BACKGROUND */}
      <InteractiveBackground />

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        
        {/* ================= HERO ================= */}
        {/* ID "home" add kiya yahan */}

        <HeroSection/>
        
        <TechStack />

        {/* Baki sections ko IDs ke saath wrap kiya */}
        <section id="stats" className="py-24 px-6 relative z-10">
          <StatsSection />
        </section>

        <section id="about">
          <AboutMe />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>



        <section id="contact">
          <ContactSection />
        </section>

      </div>
    </div>
  );
}