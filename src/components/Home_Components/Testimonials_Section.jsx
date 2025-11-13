import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

import Testimonials_1 from "../../assets/video/Testimonials_1.mp4";
import Testimonials_2 from "../../assets/video/Testimonials_2.mp4";
import Testimonials_3 from "../../assets/video/Testimonials_3.mp4";
import Testimonials_4 from "../../assets/video/Testimonials_4.mp4";
import Video_1 from "../../assets/video/Video_1.mp4";

const testimonials_data = [
  { id: 1, video: Testimonials_1 },
  { id: 2, video: Testimonials_2 },
  { id: 3, video: Testimonials_3 },
  { id: 4, video: Testimonials_4 },
  { id: 5, video: Video_1 },
];

const Testimonials_Section = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials_data.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials_data.length) % testimonials_data.length);

  // 🔁 Reset and play the new video when index changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = isMuted;
      video.play().catch(() => { });
    }
  }, [activeIndex, isMuted]);

  // 🎧 Toggle Mute/Unmute
  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    video.muted = newMuted;

    try {
      if (!newMuted) {
        video.volume = 1.0;
        await video.play();
      } else {
        video.pause();
        await video.play(); // Keeps state synced
      }
    } catch (err) {
      console.warn("Toggle play blocked:", err);
    }
  };

  // 🖱️ Tap anywhere to toggle sound
  const handleSectionClick = (e) => {
    const isControl = e.target.closest("button") || e.target.closest(".dot-control");
    if (!isControl) toggleMute();
  };

  // ⏸️ Pause/Play based on scroll visibility
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            video.play().catch(() => { });

          } else {
            // ⏸️ Pause when out of view
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // at least 50% visible to play
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick}
      className="relative bg-gradient-to-b from-[#f8fbfb] to-[#e8f4f4] py-16 flex flex-col items-center overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-[#0b3d3d] mb-8 text-center"
      >
        What Our <span className="text-[#619696]">Clients Say</span>
      </motion.h2>

      {/* Video */}
      <div className="relative w-full max-w-5xl px-4 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#dff3f3]"
          >
            <video
              ref={videoRef}
              key={testimonials_data[activeIndex].video}
              src={testimonials_data[activeIndex].video}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-[60vh] sm:h-[70vh] md:h-[75vh] object-contain bg-black cursor-pointer"
            />

            {/* Mute/Unmute Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-[#0b3d3d] rounded-full p-3 shadow-md backdrop-blur-sm"
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </motion.button>

            {/* Tap Prompt */}
            {isMuted && !hasUserInteracted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-16 right-4 bg-[#619696]/90 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-pulse pointer-events-none"
              >
                🔊 Tap screen to Unmute
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex justify-between items-center px-3 md:px-6 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={prev}
            className="p-3 md:p-4 rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm pointer-events-auto"
          >
            <ChevronLeft className="text-[#0b3d3d]" size={22} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={next}
            className="p-3 md:p-4 rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm pointer-events-auto"
          >
            <ChevronRight className="text-[#0b3d3d]" size={22} />
          </motion.button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials_data.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.2 }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 dot-control ${i === activeIndex ? "bg-[#619696]" : "bg-gray-300"
              }`}
          />
        ))}
      </div>

      {/* Glow */}
      <div className="absolute -bottom-20 w-[500px] h-[500px] bg-[#619696]/20 rounded-full blur-3xl animate-pulse" />
    </section>
  );
};

export default Testimonials_Section;

