import React from "react";
import { motion } from "framer-motion";
import ServicesCard from "./ServicesCard";

/* ── Marquee items ── */
const MARQUEE_ITEMS = [
  "Skin Care",
  "Hair Care",
  "Eye Treatments",
  "Aesthetic Care",
  "Advanced Treatments",
  "Expert Care",
  "Personalized Solutions",
  "Natural Glow",
];

const Services_Section = () => {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee-left 22s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ── Subtle background texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, #2d6b6b 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Glow accents ── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(91,185,185,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, rgba(45,107,107,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* ── Heading block ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-18"
        >
          {/* Eyebrow */}
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#5bb9b9] mb-3">
            What We Offer
          </p>

          {/* Title */}
          <h2
            className="text-[#1a3d3d] leading-tight mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Our Services
          </h2>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mx-auto h-px w-16 origin-center mb-5"
            style={{
              background:
                "linear-gradient(90deg, transparent, #5bb9b9, transparent)",
            }}
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#4a7070] font-light leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Experience personalized{" "}
            <span className="text-[#2d6b6b] font-semibold">skin</span>,{" "}
            <span className="text-[#2d6b6b] font-semibold">hair</span>, and{" "}
            <span className="text-[#2d6b6b] font-semibold">eye</span> treatments
            — designed to rejuvenate, restore, and reveal your natural beauty.
          </motion.p>
        </motion.div>

        {/* ── Services Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <ServicesCard />
        </motion.div>
      </div>

      {/* ── Marquee strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative mt-20 md:mt-24 overflow-hidden py-4 border-y border-[#ddeaea]"
        style={{
          background:
            "linear-gradient(90deg, #f0fafa 0%, #fafefe 50%, #f0fafa 100%)",
        }}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #f0fafa, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #f0fafa, transparent)",
          }}
        />

        {/* Track — doubled for seamless loop */}
        <div className="marquee-track flex items-center gap-0 w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-0 shrink-0">
              <span
                className="text-[#2d6b6b] font-medium whitespace-nowrap px-5"
                style={{ fontSize: "clamp(0.75rem, 1.6vw, 0.875rem)", letterSpacing: "0.04em" }}
              >
                {item}
              </span>
              {/* Dot separator */}
              <span className="w-1 h-1 rounded-full bg-[#5bb9b9]/50 shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services_Section;