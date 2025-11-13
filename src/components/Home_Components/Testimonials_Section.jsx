import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

import Testimonials_1 from "../../assets/video/Testimonials_1.mp4";
import Testimonials_2 from "../../assets/video/Testimonials_2.mp4";
import Testimonials_3 from "../../assets/video/Testimonials_3.mp4";
import Testimonials_4 from "../../assets/video/Testimonials_4.mp4";

const testimonials_data = [
  { id: 1, video: Testimonials_1 },
  { id: 2, video: Testimonials_2 },
  { id: 3, video: Testimonials_3 },
  { id: 4, video: Testimonials_4 },
];

const Testimonials_Section = () => {
  const [videoRatio, setVideoRatio] = useState("16/9");

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials_data.length);

  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + testimonials_data.length) % testimonials_data.length);

  // Reset + play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = isMuted;
    video.play().catch(() => { });
  }, [activeIndex, isMuted]);

  // Mute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    video.muted = newMuted;
    video.play().catch(() => { });
  };

  // Autoplay on scroll visibility
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting ? video.play().catch(() => { }) : video.pause()
        );
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-[#f8fbfb] to-[#e8f4f4] flex flex-col items-center overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-[#0b3d3d] mb-10 text-center"
      >
        What Our <span className="text-[#619696]">Clients Say</span>
      </motion.h2>

      {/* Video wrapper */}
      <div className="relative w-100 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8 }}
            className="
  relative rounded-3xl overflow-hidden shadow-2xl
  border border-white backdrop-blur-xl
  h-[65vh] md:h-[75vh]
  z-10
"
          >
            {/* Video (OBJECT-CONTAIN) */}
            <video
              ref={videoRef}
              src={testimonials_data[activeIndex].video}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-contain z-[1]"
            />

            {/* Mute Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              whileHover={{ scale: 1.1 }}
              className="
  absolute bottom-5 right-5 
  z-[9999]
  bg-white/80 hover:bg-white text-[#0b3d3d]
  rounded-full p-3 shadow-lg backdrop-blur-md cursor-pointer
"
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="absolute inset-0 flex justify-between items-center px-4 z-[999] pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.15 }}
            onClick={prev}
            className="
              pointer-events-auto bg-white/70 hover:bg-white
              shadow-lg p-3 md:p-4 rounded-full backdrop-blur-md
            "
          >
            <ChevronLeft className="text-[#0b3d3d]" size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            onClick={next}
            className="
              pointer-events-auto bg-white/70 hover:bg-white
              shadow-lg p-3 md:p-4 rounded-full backdrop-blur-md
            "
          >
            <ChevronRight className="text-[#0b3d3d]" size={24} />
          </motion.button>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-2 mt-8">
        {testimonials_data.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.25 }}
            className={`
              w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-300
              ${i === activeIndex ? "bg-[#619696]" : "bg-gray-300"}
            `}
          />
        ))}
      </div>

      {/* Glow Blob */}
      <div className="absolute -bottom-32 w-[550px] h-[550px] bg-[#619696]/20 rounded-full blur-3xl" />
    </section>
  );
};

export default Testimonials_Section;
