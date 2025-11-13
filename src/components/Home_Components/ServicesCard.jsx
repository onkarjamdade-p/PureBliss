import React from 'react';
import { motion } from 'framer-motion';
import hair_1 from '../../assets/hair_1.jpeg';
import skin_1 from '../../assets/skin_1.jpg';
import eye_3 from '../../assets/eye_3.jpg';
import semipermanent_Makeup1 from '../../assets/semipermanent_Makeup1.jpg';
import { Link } from 'react-router-dom';

const ServicesCard = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-xl w-100 md:w-64 border border-[#619696] overflow-hidden"
      >
        <img
          src={skin_1}
          alt="Skin Care"
          className="w-full h-90 object-cover"
        />
        <hr className="border-t border-[#619696]" />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Skin Care</h2>
          <p className="text-sm text-gray-600 mb-3">
            Acne scar removal, carbon peels, pigmentation treatments, skin
            whitening...
          </p>
          <Link to={"/skincare"} className="mt-3 px-4 py-2 text-black text-sm rounded-lg bg-primary hover:bg-[#adcaca] transition duration-300 border cursor-pointer">
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-xl  w-100 md:w-64 border border-[#619696] overflow-hidden"
      >
        <img src={hair_1} alt="" className="w-full h-90 object-cover" />
        <hr className="border-t border-[#619696]" />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Hair Care</h2>
          <p className="text-sm text-gray-600 mb-3">
            Hair loss, laser hair reduction, mesotherapy, scalp
            micropigmentation...
          </p>
          <Link to={"/haircare"} className="mt-3 px-4 py-2 text-black text-sm rounded-lg bg-primary hover:bg-[#adcaca] transition duration-300 border">
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-xl w-100 md:w-64 border border-[#619696] overflow-hidden"
      >
        <img
          src={eye_3}
          alt="eye Care"
          className="w-screen h-89 object-cover"
        />
        <hr className="border-t border-[#619696]" />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Eye Care</h2>
          <p className="text-sm text-gray-600 mb-3">
            Eyelash lifts, eyebrow lamination, dry eye therapy, vision
            correction and many more
          </p>
          <Link to={"/eyecare"} className="mt-3 px-4 py-2 text-black text-sm rounded-lg bg-primary hover:bg-[#adcaca] transition duration-300 border">
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-xl  w-100 md:w-64 border border-[#619696] overflow-hidden"
      >
        <img
          src={semipermanent_Makeup1}
          alt="Skin Care"
          className="w-full h-90 object-cover"
        />
        <hr className="border-t border-[#619696]" />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-">
            Semipermanent Makeup
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            BB glow, beauty spot, lip blush, lip micropigmentation, scalp
            micro...
          </p>
          <Link to={"/makeup"} className="mt-3 px-4 py-2 text-black text-sm rounded-lg bg-primary hover:bg-[#adcaca] transition duration-300 border">
            Learn More
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default ServicesCard;
