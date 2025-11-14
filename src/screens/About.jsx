import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import founder from "../assets/founder.jpg";
import logoFull from "../assets/NewLogo3.png";
import skinCareImg from "../assets/skin_1.jpg";
import hairCareImg from "../assets/hair_1.jpg";
import eyeCareImg from "../assets/eye_3.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const taglines = [
    "Care that Defines Confidence",
    "Beauty Rooted in Science",
    "Precision. Passion. Perfection",
  ];

  const [currentTag, setCurrentTag] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTag((prev) => (prev + 1) % taglines.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="font-sans text-gray-800 bg-white">

      {/* 🌸 HERO SECTION WITH MERGED LOGO */}
      <div className="relative h-[86vh] flex flex-col justify-center items-center text-center 
      bg-gradient-to-b from-[#e3f6f6] via-[#d5eeee] to-white overflow-hidden">

        {/* 🌟 Logo merged & floating */}
        <motion.img
          src={logoFull}
          alt="Pure Bliss Clinic Logo"
          className="w-44 sm:w-56 md:w-64 lg:w-72 object-contain select-none"
          style={{
            background: "transparent",
            filter: "drop-shadow(0px 4px 14px rgba(97,150,150,0.32))",
          }}
          animate={{
            opacity: [0.85, 1, 0.85],
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        />

        {/* ✨ Animated Taglines */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentTag}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2b5a5a] px-4 mt-10"
          >
            {taglines[currentTag]}
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mt-3 text-sm sm:text-base md:text-lg font-light max-w-xl"
        >
          Experience holistic wellness for your skin, hair, and eyes with advanced, compassionate care.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-10 text-[#619696] text-sm font-medium italic"
        >
          ↓ Learn More About Us
        </motion.div>
      </div>

      {/* 🩵 OUR FOCUS AREAS */}
      <div
        className="bg-[#f7fdfd] py-20 px-6 md:px-16 lg:px-24 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2b5a5a] mb-12">
          Our Focus Areas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">

          {/* Skin Care */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-xl rounded-xl p-6 w-72 md:w-80 flex flex-col items-center 
            transition-all duration-300 hover:shadow-2xl border border-[#c8e5e5]"
          >
            <img
              src={skinCareImg}
              alt="Skin Care"
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-[#2b5a5a] mb-2">Skin Care</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover the glow within — from carbon peels to hydra facials,
              restoring youthful radiance and confidence.
            </p>
          </motion.div>

          {/* Hair Care */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-xl rounded-xl p-6 w-72 md:w-80 flex flex-col items-center 
            transition-all duration-300 hover:shadow-2xl border border-[#c8e5e5]"
          >
            <img
              src={hairCareImg}
              alt="Hair Care"
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-[#2b5a5a] mb-2">Hair Care</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Revive your roots with PRP, GFC, and scalp therapies — experience
              healthy, voluminous hair again.
            </p>
          </motion.div>

          {/* Eye Care */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-xl rounded-xl p-6 w-72 md:w-80 flex flex-col items-center 
            transition-all duration-300 hover:shadow-2xl border border-[#c8e5e5]"
          >
            <img
              src={eyeCareImg}
              alt="Eye Care"
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-[#2b5a5a] mb-2">Eye Care</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              From dry eye therapy to eyelash lifts — gentle, precise treatments
              for a brighter outlook.
            </p>
          </motion.div>

        </div>
      </div>

      {/* 🌿 VISION + MISSION */}
      <div
        className="bg-gradient-to-b from-[#e4f5f5] to-[#d0ecec] py-16 px-6 md:px-16 text-center md:text-left"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2b5a5a] mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To redefine aesthetic excellence through innovation, compassion,
              and precision — empowering every individual to radiate confidence
              and wellness.
            </p>
          </div>

          <div data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2b5a5a] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We aim to deliver world-class treatments rooted in science and
              care, ensuring every client’s experience is transformative, safe,
              and deeply fulfilling.
            </p>
          </div>

        </div>
      </div>

      {/* 🧑‍⚕️ FOUNDER SECTION */}
      <div
        className="md:grid md:grid-cols-2 place-items-center bg-[#f7fdfd] py-16 px-6 md:px-20"
        data-aos="zoom-in"
      >
        {/* Founder Image */}
        <div className="order-2 md:order-1 flex justify-center">
          <motion.img
            src={founder}
            alt="Founder"
            className="rounded-full shadow-2xl w-72 h-72 md:w-96 md:h-96 object-cover 
            border-4 border-[#cfe5e5]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Founder Info */}
        <div className="order-1 md:order-2 max-w-lg space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold text-[#2b5a5a]">Founder</h2>
          <h3 className="text-lg font-semibold text-[#619696]">Shivani Sawant</h3>

          <p className="text-gray-600 text-base leading-relaxed">
            <strong>(B.Optom | pgdcc | pmu)</strong>
            <br />
            <strong>Clinical Optometrist | Cosmetologist & Trichologist</strong>
            <br />
            A visionary leader in aesthetics and wellness, Shivani Sawant blends
            medical precision with compassionate care.
          </p>
        </div>
      </div>

    </section>
  );
};

export default About;
