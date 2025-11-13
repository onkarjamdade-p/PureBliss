import React from "react";
import ServicesCard from "./ServicesCard";
import { motion } from "framer-motion";

const Services_Section = () => {
  return (
    <section className="bg-white py-20 text-gray-800 flex flex-col items-center justify-center overflow-hidden">
      {/* ✨ Section Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#4d7777] tracking-wide relative"
      >
        Our Services
        <span className="block w-16 h-[3px] bg-[#7eacac] mx-auto mt-3 rounded-full"></span>
      </motion.h1>

      {/* ✨ Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-600 text-[17px] max-w-2xl mb-12 px-5"
      >
        Experience personalized <span className="text-[#619696] font-semibold">skin</span>,{" "}
        <span className="text-[#619696] font-semibold">hair</span>, and{" "}
        <span className="text-[#619696] font-semibold">eye</span> treatments — designed
        to rejuvenate, restore, and reveal your natural beauty.
      </motion.p>

      {/* ✨ Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10"
      >
        <ServicesCard />
      </motion.div>

      {/* ✨ Animated Marquee Line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full mt-16 overflow-hidden py-4 bg-gradient-to-r from-[#e9f4f4] via-white to-[#e9f4f4]"
      >
        <motion.p
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className="text-center text-[#4d7777] text-lg font-medium whitespace-nowrap"
        >
          ✨ Skin • Hair • Eye • Aesthetic Care — Designed to Bring Out Your Natural Glow ✨
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Services_Section;
