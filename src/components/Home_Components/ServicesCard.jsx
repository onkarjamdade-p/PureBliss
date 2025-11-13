import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import skin_1 from "../../assets/skin_1.jpg";
import hair_1 from "../../assets/hair_1.jpeg";
import eye_3 from "../../assets/eye_3.jpg";
import semipermanent_Makeup1 from "../../assets/semipermanent_Makeup1.jpg";

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.03,
    boxShadow: "0 15px 40px rgba(97,150,150,0.25)",
  },
};

const ServiceCard = ({ img, title, desc, link, delay }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    transition={{ duration: 0.5, delay }}
    className="
      relative w-72 rounded-2xl overflow-hidden bg-white shadow-lg
      border border-transparent
      bg-gradient-to-b from-white to-[#f8ffff]
      hover:border-[#82caca] transition-all duration-300
    "
  >
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <motion.img
        src={img}
        alt={title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />
      {/* Dark Overlay on Hover */}
      <motion.div
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.4 }}
      />
    </div>

    {/* Content */}
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">
        {title}
      </h2>
      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        {desc}
      </p>

      <Link
        to={link}
        className="
          mt-5 inline-block px-5 py-2 rounded-xl text-sm font-medium
          bg-[#b3e0e0] text-gray-900 border border-[#619696]
          hover:bg-[#96d6d6] transition-all duration-300 shadow
        "
      >
        Learn More
      </Link>
    </div>

    {/* Bottom Accent Line */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#619696] to-[#96e5e5]" />
  </motion.div>
);

const ServicesCard = () => {
  return (
    <>
      <ServiceCard
        img={skin_1}
        title="Skin Care"
        desc="Acne scar removal, pigmentation correction, brightening peels, and advanced rejuvenation treatments."
        link="/skincare"
        delay={0}
      />

      <ServiceCard
        img={hair_1}
        title="Hair Care"
        desc="PRP, GFC, mesotherapy, scalp strengthening, hair fall control, and laser hair rejuvenation."
        link="/haircare"
        delay={0.2}
      />

      <ServiceCard
        img={eye_3}
        title="Eye Care"
        desc="Eyelash lifts, eyebrow lamination, dry eye relief, and non-surgical eye aesthetics."
        link="/eyecare"
        delay={0.4}
      />

      <ServiceCard
        img={semipermanent_Makeup1}
        title="Semi-Permanent Makeup"
        desc="Lip blush, BB glow, scalp micro, beauty spot, and advanced micropigmentation techniques."
        link="/makeup"
        delay={0.6}
      />
    </>
  );
};

export default ServicesCard;
