import React from "react";
import { motion } from "framer-motion";
import droplet_1 from "../../assets/droplet_1.png";
import heart_asset from "../../assets/heart_asset.png";
import microscope_asset from "../../assets/microscope_asset.png";

const Our_Approach_Section = () => {
  const approaches = [
    {
      id: 1,
      img: droplet_1,
      title: "Personalized Care",
      desc: "Tailored treatments designed to meet your unique skincare, haircare, and eye care needs.",
      delay: 0,
    },
    {
      id: 2,
      img: heart_asset,
      title: "Expertise",
      desc: "Dedicated to providing exceptional care through cutting-edge technology and skilled expertise.",
      delay: 0.2,
    },
    {
      id: 3,
      img: microscope_asset,
      title: "Compassionate Approach",
      desc: "Providing care with understanding and empathy in a calm and supportive environment.",
      delay: 0.4,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#e3f2f2] to-[#c1e0e0] py-20 flex flex-col items-center text-gray-800 overflow-hidden">
      {/* ✨ Section Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-serif font-bold mb-12 text-[#2d6e6e] drop-shadow-md tracking-wide relative"
      >
        Our Approach
        <span className="block w-20 h-[3px] bg-[#619696] mx-auto mt-4 rounded-full"></span>
      </motion.h1>

      {/* ✨ Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
        {approaches.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: item.delay,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0px 10px 30px rgba(97,150,150,0.2)",
            }}
            className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-8 border border-transparent hover:border-[#619696]/30 transition-all duration-500"
          >
            {/* Icon */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-5">
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-24 h-24 object-contain drop-shadow-sm"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 rounded-full bg-[#619696]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-[#2f4f4f] mb-2 text-center">
              {item.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-center text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ✨ Gentle Animated Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 text-[#2d6e6e] font-medium text-center text-lg md:text-xl tracking-wide italic"
      >
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          “Blending science, compassion, and beauty for radiant confidence.”
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Our_Approach_Section;
