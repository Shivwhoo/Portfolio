import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent pt-12 pb-8 overflow-hidden z-10">
      {/* Subtle glowing top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <a href="#home" className="text-xl font-black tracking-tighter text-white group">
            Shivam<span className="text-indigo-500 group-hover:text-purple-400 transition-colors">.</span>
          </a>
          <p className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center md:justify-start gap-2 mt-1">
            <span>© {currentYear} SYSTEM_ONLINE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          </p>
        </div>

        {/* Center: Full-Stack Watermark */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
          <span>Compiled with</span>
          <span className="text-sky-400">React</span>
          <span className="text-zinc-700">•</span>
          <span className="text-cyan-400">Tailwind</span>
          <span className="text-zinc-700">•</span>
          <span className="text-green-500">Node.js</span>
        </div>

        {/* Right: Socials & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Shivwhoo" 
              target="_blank" 
              rel="noreferrer" 
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <a 
              href="https://linkedin.com/in/shivam-kishore" 
              target="_blank" 
              rel="noreferrer" 
              className="text-zinc-500 hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
            </a>
          </div>
          
          {/* C++ style "Back to Top" command */}
          <a 
            href="#home" 
            className="group flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase hover:text-indigo-400 transition-colors"
          >
            <span>{">"} Return 0;</span>
            <svg className="w-3 h-3 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7-7" />
            </svg>
          </a>
        </div>
        
      </div>
    </footer>
  );
}