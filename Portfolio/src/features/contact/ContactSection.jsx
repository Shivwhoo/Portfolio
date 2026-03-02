import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./contactSchema";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { sendContactMessage } from "../../services/contactService";

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });



const onSubmit = async (data) => {
  try {
    await sendContactMessage(data);
    toast.success("Message sent successfully ");
    reset();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Get In Touch
        </h2>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl"
        >
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="w-full p-3 rounded-xl bg-transparent border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="w-full p-3 rounded-xl bg-transparent border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              rows="5"
              placeholder="Your Message"
              {...register("message")}
              className="w-full p-3 rounded-xl bg-transparent border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}