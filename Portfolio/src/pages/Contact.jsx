import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { contactSchema } from "../features/contact/contactSchema"; // Adjust path if needed
import { sendContactMessage } from "../services/contactService"; // Adjust path if needed

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function ContactSection() {
  const [isHovering, setIsHovering] = useState(false);

  // Hook Form Integration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await sendContactMessage(data);
      toast.success("Payload delivered successfully!");
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Transmission failed. Connection lost."
      );
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-sm bg-indigo-400 animate-pulse" />
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest">System.Comm_Link</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Initialize <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Connection
            </span>
          </h2>
          <p className="text-zinc-400 font-mono text-sm max-w-xl mx-auto">
            {">"} Open for collaborations, hackathons, and development opportunities. Send a payload below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Contact Details & Terminal */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* C++ Code Easter Egg Terminal */}
            <motion.div variants={itemVariants} className="bg-[#121214]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-sm leading-loose">
                <p className="text-zinc-500 mb-2">// Server configuration</p>
                <p><span className="text-pink-500">#include</span> <span className="text-green-400">&lt;iostream&gt;</span></p>
                <p><span className="text-pink-500">using namespace</span> <span className="text-blue-400">std</span>;</p>
                <br />
                <p><span className="text-pink-500">struct</span> <span className="text-yellow-300">ContactInfo</span> {'{'}</p>
                <p className="pl-4"><span className="text-blue-400">string</span> email = <span className="text-green-400">"shivamkishore009@gmail.com"</span>;</p>
                <p className="pl-4"><span className="text-blue-400">string</span> phone = <span className="text-green-400">"+91-9334947294"</span>;</p>
                <p className="pl-4"><span className="text-blue-400">string</span> location = <span className="text-green-400">"IIIT Dharwad"</span>;</p>
                <p>{'};'}</p>
              </div>
            </motion.div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a 
                variants={itemVariants}
                href="mailto:shivamkishore009@gmail.com"
                className="bg-[#121214]/40 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/5 hover:border-indigo-500/50 transition-all duration-300 group flex flex-col gap-3"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="text-white font-bold text-sm">Email</h4>
                  <p className="text-zinc-500 text-xs font-mono mt-1 break-all">shivamkishore009@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                variants={itemVariants}
                href="https://github.com/Shivwhoo"
                target="_blank"
                rel="noreferrer"
                className="bg-[#121214]/40 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/5 hover:border-indigo-500/50 transition-all duration-300 group flex flex-col gap-3"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-white font-bold text-sm">GitHub</h4>
                  <p className="text-zinc-500 text-xs font-mono mt-1">/Shivwhoo</p>
                </div>
              </motion.a>

              <motion.a 
                variants={itemVariants}
                href="https://www.linkedin.com/in/shivam-kishore-103556329/"
                target="_blank"
                rel="noreferrer"
                className="bg-[#121214]/40 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col gap-3"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                <div>
                  <h4 className="text-white font-bold text-sm">LinkedIn</h4>
                  <p className="text-zinc-500 text-xs font-mono mt-1">/in/shivam-kishore</p>
                </div>
              </motion.a>

              <motion.div 
                variants={itemVariants}
                className="bg-[#121214]/40 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/5 hover:border-green-500/50 transition-all duration-300 group flex flex-col gap-3 cursor-default"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h4 className="text-white font-bold text-sm">Phone</h4>
                  <p className="text-zinc-500 text-xs font-mono mt-1">+91-9334947294</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Glassmorphic Form with React Hook Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Dynamic Background Glow for Form */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl transition-opacity duration-500 ${isHovering ? 'opacity-30' : 'opacity-10'}`} />
            
            <div className="relative bg-[#121214]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-white font-mono uppercase tracking-widest text-sm">Send_Payload</h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-zinc-400 text-xs font-mono uppercase">User_Name</label>
                  <input 
                    type="text" 
                    id="name"
                    {...register("name")}
                    className={`bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-colors placeholder:text-zinc-600`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">
                      {">"} ERR: {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-zinc-400 text-xs font-mono uppercase">Return_Address (Email)</label>
                  <input 
                    type="email" 
                    id="email"
                    {...register("email")}
                    className={`bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-colors placeholder:text-zinc-600`}
                    placeholder="john@server.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">
                      {">"} ERR: {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-zinc-400 text-xs font-mono uppercase">String_Message</label>
                  <textarea 
                    id="message"
                    rows="4"
                    {...register("message")}
                    className={`bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-colors placeholder:text-zinc-600 resize-none`}
                    placeholder="Enter execution commands..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">
                      {">"} ERR: {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 group relative w-full px-6 py-4 rounded-lg font-bold tracking-widest uppercase overflow-hidden flex justify-center items-center text-sm transition-all
                    ${isSubmitting ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-indigo-500 text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]'}
                  `}
                >
                  {!isSubmitting && (
                    <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? "Executing..." : "Execute_Transmission"}
                    {!isSubmitting && (
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}