import React from "react";
import { motion } from "framer-motion";
import droplet_1 from "../../assets/droplet_1.png";
import heart_asset from "../../assets/heart_asset.png";
import microscope_asset from "../../assets/microscope_asset.png";

const approaches = [
  {
    id: 1,
    img: droplet_1,
    title: "Personalized Care",
    desc: "Tailored treatments designed to meet your unique skincare, haircare, and eye care needs.",
    accent: "#5bb9b9",
    delay: 0,
  },
  {
    id: 2,
    img: heart_asset,
    title: "Expertise",
    desc: "Exceptional care delivered through cutting-edge technology and deeply skilled practitioners.",
    accent: "#3a8080",
    delay: 0.15,
  },
  {
    id: 3,
    img: microscope_asset,
    title: "Compassionate Approach",
    desc: "Care offered with genuine understanding and empathy in a calm, supportive environment.",
    accent: "#2d6b6b",
    delay: 0.3,
  },
];

const Our_Approach_Section = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(160deg, #eaf5f5 0%, #d4ecec 55%, #c8e6e6 100%)",
        fontFamily: "'DM Sans', sans-serif"
      }}>

      {/* Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      {/* ── Background texture dots ── */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #2d6b6b 1px, transparent 0)",
          backgroundSize: "28px 28px"
        }} />

      {/* ── Soft glow blobs ── */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(91,185,185,0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(45,107,107,0.1) 0%, transparent 70%)" }} />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 md:px-12">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#5bb9b9] mb-3">
            How We Work
          </p>
          <h2 className="text-[#1a3d3d] leading-tight mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3rem)"
            }}>
            Our Approach
          </h2>
          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mx-auto h-px w-16 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #5bb9b9, transparent)" }}
          />
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {approaches.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative bg-white rounded-3xl p-7 sm:p-8
                         border border-[#ddeaea]
                         shadow-[0_2px_20px_rgba(45,107,107,0.07)]
                         hover:shadow-[0_12px_40px_rgba(45,107,107,0.14)]
                         transition-shadow duration-300 overflow-hidden"
            >
              {/* Card top accent line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }} />

              {/* Icon container */}
              <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                {/* Soft halo */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle, ${item.accent}18 0%, transparent 70%)` }} />
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="relative w-12 h-12 object-contain"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Number badge */}
              <div className="absolute top-7 right-7 text-[10px] font-bold tracking-widest text-[#9ab8b8]">
                0{item.id}
              </div>

              {/* Title */}
              <h3 className="text-[#1a3d3d] font-semibold mb-2.5 leading-snug"
                style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
                {item.title}
              </h3>

              {/* Thin divider */}
              <div className="w-8 h-px mb-3"
                style={{ background: item.accent, opacity: 0.45 }} />

              {/* Description */}
              <p className="text-[#4a7070] text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Quote tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3">
            {/* Quote mark */}
            <span className="text-[#5bb9b9]/40 text-5xl leading-none select-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>"</span>
            <p className="text-[#2d6b6b] italic font-light max-w-lg leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 2.2vw, 1.2rem)"
              }}>
              Blending science, compassion, and beauty for radiant confidence.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-4 h-px bg-[#5bb9b9]/50" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8ab8b8] font-medium">
                Pure Bliss
              </span>
              <span className="w-4 h-px bg-[#5bb9b9]/50" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Our_Approach_Section;