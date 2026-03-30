import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import skin_1 from "../../assets/skin_1.jpg";
import hair_1 from "../../assets/hair_1.jpeg";
import eye_3 from "../../assets/eye_3.jpg";
import semipermanent_Makeup1 from "../../assets/semipermanent_Makeup1.jpg";

/* ── Card data ── */
const CARDS = [
  {
    img: skin_1,
    title: "Skin Care",
    tag: "Rejuvenation",
    desc: "Acne scar removal, pigmentation correction, brightening peels, and advanced rejuvenation treatments.",
    link: "/skincare",
    delay: 0,
  },
  {
    img: hair_1,
    title: "Hair Care",
    tag: "Restoration",
    desc: "PRP, GFC, mesotherapy, scalp strengthening, hair fall control, and laser hair rejuvenation.",
    link: "/haircare",
    delay: 0.1,
  },
  {
    img: eye_3,
    title: "Eye Care",
    tag: "Aesthetics",
    desc: "Eyelash lifts, eyebrow lamination, dry eye relief, and non-surgical eye aesthetics.",
    link: "/eyecare",
    delay: 0.2,
  },
  {
    img: semipermanent_Makeup1,
    title: "Semi-Permanent Makeup",
    tag: "Micropigmentation",
    desc: "Lip blush, BB glow, scalp micro, beauty spot, and advanced micropigmentation techniques.",
    link: "/makeup",
    delay: 0.3,
  },
];

/* ── Single card ── */
const ServiceCard = ({ img, title, tag, desc, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className="group relative flex flex-col bg-white rounded-3xl overflow-hidden
               border border-[#e4eded]
               shadow-[0_2px_16px_rgba(45,107,107,0.07)]
               hover:shadow-[0_16px_48px_rgba(45,107,107,0.15)]
               transition-shadow duration-400"
  >
    {/* ── Image ── */}
    <div className="relative h-52 overflow-hidden">
      <motion.img
        src={img}
        alt={title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent
                      opacity-60 group-hover:opacity-80 transition-opacity duration-400" />

      {/* Tag pill — sits over image */}
      <div className="absolute top-3.5 left-3.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest
                         bg-white/20 backdrop-blur-sm border border-white/30
                         text-white px-2.5 py-1 rounded-full">
          {tag}
        </span>
      </div>

      {/* Title overlay at bottom of image */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-6">
        <h3 className="text-white font-semibold leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)"
          }}>
          {title}
        </h3>
      </div>
    </div>

    {/* ── Content ── */}
    <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
      {/* Thin teal rule */}
      <div className="w-8 h-px bg-[#5bb9b9] mb-3 opacity-60
                      group-hover:w-14 transition-all duration-400" />

      {/* Description */}
      <p className="text-[#4a7070] text-sm font-light leading-relaxed flex-1 mb-5">
        {desc}
      </p>

      {/* CTA */}
      <Link
        to={link}
        className="group/btn self-start inline-flex items-center gap-2
                   text-[#2d6b6b] text-xs font-semibold uppercase tracking-wider
                   border border-[#c5dede] hover:border-[#5bb9b9]
                   bg-white hover:bg-[#f0fafa]
                   px-4 py-2.5 rounded-full
                   transition-all duration-250"
      >
        <span>Explore</span>
        <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>

    {/* Bottom accent line — slides in on hover */}
    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#5bb9b9] to-[#2d6b6b]
                    w-0 group-hover:w-full transition-all duration-500 ease-out" />
  </motion.div>
);

/* ── Export ── */
const ServicesCard = () => (
  <>
    {CARDS.map((c) => (
      <ServiceCard key={c.title} {...c} />
    ))}
  </>
);

export default ServicesCard;