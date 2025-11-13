import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Pure_Bliss_2 from "../../assets/video/Pure_Bliss_2.mp4";

const taglines = [
  "Where Care Meets Confidence ",
  "Bringing Out Your Natural Glow ",
  "Advanced Skin, Hair & Eye Solutions ",
  "Elegance. Expertise. Empathy. ",
];

const Main_Section = () => {
  const [currentVideo, setCurrentVideo] = useState(Pure_Bliss_2);
  const [isFading, setIsFading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const videoRef = useRef(null);

  // ✅ Detect device type and handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // 🎬 Switch to next video after intro
  const handleVideoEnd = () => {
    setIsFading(true);
    setTimeout(() => {

      setIsFading(false);
    }, 200);
  };

  // ▶️ Autoplay handling
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) =>
        console.log("Autoplay blocked:", error)
      );
    }
  }, [currentVideo]);

  // ✨ Cycle taglines smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[80vh] md:min-h-[86vh] w-full flex flex-col items-center justify-center overflow-hidden text-center">
      {/* 🎥 Background Video */}
      <AnimatePresence mode="wait">
        <motion.video
          key={currentVideo}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onEnded={handleVideoEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full z-[1] object-cover"
        >
          <source src={currentVideo} type="video/mp4" />
        </motion.video>
      </AnimatePresence>


      {/* 🌓 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-[2]" />

      {/* 🌟 Content (Only for second video) */}
      {currentVideo === Pure_Bliss_2 && (
        <div className="relative z-10 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 max-w-[90%] min-w-xl lg:max-w-3xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight sm:leading-snug"
          >
            Experience Elegance in Care
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-xs sm:text-base md:text-lg lg:text-xl font-light font-serif mt-3 max-w-[90%] sm:max-w-xl mx-auto"
          >
            Top-notch skin, hair, and eye care services and products
          </motion.h2>

          {/* ✨ Animated Tagline Carousel */}
          <div className="mt-8 h-10 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
                className="text-lg sm:text-xl md:text-2xl italic text-[#b3e0e0] font-light tracking-wide glow-text"
              >
                {taglines[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 🌈 Glow Animation */}
      <style>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(255,255,255,0.5),
                       0 0 20px rgba(97,150,150,0.6),
                       0 0 30px rgba(97,150,150,0.4);
          animation: glowPulse 3s ease-in-out infinite alternate;
        }
        @keyframes glowPulse {
          from { text-shadow: 0 0 10px rgba(255,255,255,0.4); }
          to { text-shadow: 0 0 25px rgba(97,150,150,0.8); }
        }
      `}</style>
    </div>
  );
};

export default Main_Section;
