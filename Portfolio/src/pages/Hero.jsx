import React from "react";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-transparent pt-24 pb-20 lg:py-0"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN: Name & Typography */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          {/* Top Badge */}
          <motion.div variants={fadeInUp} className="mb-4 md:mb-6 inline-block">
            <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-300 text-xs md:text-sm font-mono tracking-wider uppercase">
                Hello_World, I am
              </span>
            </div>
          </motion.div>

          {/* MASSIVE NAME REVEAL */}
          <motion.h1
            variants={fadeInUp}
            className="text-[4rem] sm:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-black tracking-tighter leading-[0.85] mb-6 text-white uppercase"
          >
            SHIVAM
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              KISHORE.
            </span>
          </motion.h1>

          {/* Code-style Subheading */}
          <motion.div
            variants={fadeInUp}
            className="text-zinc-400 text-sm md:text-lg lg:text-xl mb-8 md:mb-10 max-w-lg leading-relaxed border-l-2 border-indigo-500/50 pl-4 md:pl-5 font-mono"
          >
            <p className="mb-2">
              <span className="text-pink-500">const</span>{" "}
              <span className="text-blue-400">role</span> ={" "}
              <span className="text-green-400">"Full Stack Developer"</span>;
            </p>
            <p className="font-mono text-white">
              <span className="text-pink-500">while</span> (
              <span className="text-yellow-400">alive</span>) &nbsp;
              <span className="text-white">build()</span>,
              <span className="text-white">learn()</span>,
              <span className="text-white">scale()</span>;
            </p>
          </motion.div>

          {/* Action Buttons - UPDATED WITH DOWNLOAD RESUME */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            {/* 1. Primary Action */}
            <a
              href="#stats"
              className="group relative px-6 py-3.5 md:px-8 md:py-4 rounded-lg bg-white text-black font-bold tracking-widest uppercase overflow-hidden flex justify-center items-center text-xs md:text-sm flex-1 sm:flex-none"
            >
              <div className="absolute inset-0 w-full h-full bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                STATS
              </span>
            </a>

            {/* 2. Download CV Action (NEW) */}
            <a
              href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:7f96f047-8909-423d-8f57-a3ae1fb1eb6b"
              className="px-6 py-3.5 md:px-8 md:py-4 rounded-lg border border-indigo-500/50 hover:bg-indigo-500/10 text-indigo-400 font-bold tracking-widest uppercase transition-all duration-300 flex justify-center items-center text-xs md:text-sm gap-2 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] flex-1 sm:flex-none"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Extract_CV
            </a>

            {/* 3. Secondary Action */}
            <a
              href="#contact"
              className="px-6 py-3.5 md:px-8 md:py-4 rounded-lg border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-300 font-bold tracking-widest uppercase transition-all duration-300 flex justify-center items-center text-xs md:text-sm flex-1 sm:flex-none"
            >
              Initialize Contact
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Floating Terminal/Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full mt-8 lg:mt-0"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-full max-w-lg mx-auto lg:ml-auto relative z-10"
          >
            <div className="bg-[#121214]/60 backdrop-blur-xl rounded-xl md:rounded-2xl border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.6)] lg:shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-xs md:text-[0.95rem]">
              <div className="flex items-center px-3 py-2 md:px-4 md:py-3 bg-zinc-900/80 border-b border-zinc-800">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-[10px] md:text-xs text-zinc-500 font-mono">
                  dev_profile.cpp
                </div>
              </div>

              <div className="p-4 md:p-8 font-mono overflow-x-auto text-zinc-300 leading-loose whitespace-pre">
                <p>
                  <span className="text-pink-500">#include</span>{" "}
                  <span className="text-green-400">&lt;iostream&gt;</span>
                </p>
                <p>
                  <span className="text-pink-500">#include</span>{" "}
                  <span className="text-green-400">&lt;vector&gt;</span>
                </p>
                <p>
                  <span className="text-pink-500">using namespace</span>{" "}
                  <span className="text-blue-400">std</span>;
                </p>
                <br />
                <p>
                  <span className="text-pink-500">class</span>{" "}
                  <span className="text-yellow-300">Creator</span> {"{"}
                </p>
                <p className="pl-4">
                  <span className="text-pink-500">public:</span>
                </p>
                <p className="pl-8">
                  <span className="text-blue-400">string</span> name ={" "}
                  <span className="text-green-400">"Shivam Kishore"</span>;
                </p>
                <p className="pl-8">
                  <span className="text-blue-400">vector</span>&lt;
                  <span className="text-blue-400">string</span>&gt; skills ={" "}
                  {"{"}
                </p>
                <p className="pl-12 text-green-400">
                  "React", "Node.js", "C++"
                </p>
                <p className="pl-8">{"}"};</p>
                <br />
                <p className="pl-8">
                  <span className="text-blue-400">void</span>{" "}
                  <span className="text-yellow-300">buildFuture</span>() {"{"}
                </p>
                <p className="pl-12">
                  cout &lt;&lt;{" "}
                  <span className="text-green-400">"Compiling ideas..."</span>{" "}
                  &lt;&lt; endl;
                </p>
                <p className="pl-8">{"}"}</p>
                <p>{"};"}</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-left-10 bg-[#09090b]/60 backdrop-blur-xl border border-white/10 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl flex items-center gap-2 sm:gap-4"
            >
              <div className="bg-indigo-500 p-1.5 sm:p-2.5 rounded-md sm:rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-[10px] sm:text-sm">
                  Status: Coding
                </p>
                <p className="text-indigo-400 text-[8px] sm:text-xs font-mono">
                  Bug free zone
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[2px] h-12 bg-gradient-to-b from-indigo-500 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
