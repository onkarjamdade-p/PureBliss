import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause, Loader2 } from "lucide-react";

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

// === Optimized Testimonials Section (Option A) ===

const Testimonials_Section = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  // NEW: State to track if the video was playing *before* the tab was hidden
  const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const timersRef = useRef([]);

  // clear timers helper
  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  // playSafe attempts to play and updates isPlaying state
  const playSafe = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const p = vid.play();
    if (p && typeof p.then === "function") {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(!vid.paused);
    }
  }, []);

  // swap video source without unmounting <video>
  const setVideoSource = useCallback((index) => {
    const vid = videoRef.current;
    if (!vid) return;

    setIsLoading(true);

    const newSrc = testimonials_data[index].video;
    if (vid.src && vid.src.includes(newSrc)) {
      setIsLoading(false);
      playSafe();
      return;
    }

    try {
      // Pause before setting new source
      vid.pause();
      setIsPlaying(false);

      vid.src = newSrc;
      vid.load();
    } catch (e) {
      try {
        const source = vid.querySelector("source");
        if (source) {
          source.src = newSrc;
          vid.load();
        }
      } catch (err) {
        // silent
      }
    }
  }, [playSafe]);

  // CHANGE SLIDE with a short fade (we don't unmount video)
  const changeTo = useCallback(
    (newIndex) => {
      if (newIndex === activeIndex) return;
      clearTimers();

      // Ensure we record the current playing state
      setWasPlayingBeforeHide(videoRef.current ? !videoRef.current.paused : isPlaying);

      setIsFading(true);

      const t1 = setTimeout(() => {
        setActiveIndex(newIndex);
        setVideoSource(newIndex);
      }, 220);

      timersRef.current.push(t1);
    },
    [activeIndex, setVideoSource, isPlaying]
  );

  const next = useCallback(() => changeTo((activeIndex + 1) % testimonials_data.length), [activeIndex, changeTo]);
  const prev = useCallback(() => changeTo((activeIndex - 1 + testimonials_data.length) % testimonials_data.length), [activeIndex, changeTo]);

  // Handler for when video is ready to play
  const handleCanPlayThrough = useCallback(() => {
    setIsLoading(false);

    if (isFading) {
      clearTimers();
      const t2 = setTimeout(() => setIsFading(false), 260);
      timersRef.current.push(t2);
    }

    // Only attempt play if the user didn't explicitly pause it
    if (isPlaying) {
      playSafe();
    }
  }, [isFading, isPlaying, playSafe]);

  // When activeIndex changes, ensure video source is set (covers direct calls to setActiveIndex)
  useEffect(() => {
    setVideoSource(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // --- NEW: Page Visibility API for pausing on tab switch ---
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden: record current state and pause
        setWasPlayingBeforeHide(!vid.paused);
        try {
          vid.pause();
          setIsPlaying(false);
        } catch (e) { /* ignore */ }
      } else {
        // Tab is visible: if it was playing before, resume
        // We also check intersection observer status to ensure it's in the viewport
        if (wasPlayingBeforeHide && vid.hasAttribute('data-is-intersecting')) {
          playSafe();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [playSafe, wasPlayingBeforeHide]); // Include wasPlayingBeforeHide as a dependency

  // IntersectionObserver: autoplay when visible, pause otherwise (moderate threshold)
  useEffect(() => {
    const container = containerRef.current;
    const vid = videoRef.current;
    if (!container || !vid) return;

    let debounceT = null;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (debounceT) clearTimeout(debounceT);
          debounceT = setTimeout(() => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
              // Add attribute to signal intersection state for the Page Visibility handler
              vid.setAttribute('data-is-intersecting', 'true');
              if (!isLoading && !document.hidden) playSafe();
            } else {
              vid.removeAttribute('data-is-intersecting');
              try {
                vid.pause();
                setIsPlaying(false);
              } catch (e) {
                // ignore
              }
            }
          }, 110);
        });
      },
      { threshold: [0.45, 0.5] }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (debounceT) clearTimeout(debounceT);
    };
  }, [playSafe, isLoading]);

  // Keyboard (left/right, space)
  useEffect(() => {
    const handler = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        const vid = videoRef.current;
        if (!vid) return;
        if (vid.paused) playSafe();
        else {
          vid.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, playSafe]);

  // Mute toggle
  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    vid.muted = newMuted;
    playSafe();
  };

  // Play/pause toggle
  const togglePlayPause = (e) => {
    if (e) e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) playSafe();
    else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  // Simple swipe handlers (lightweight)
  const touchStartX = useRef(0);
  const onTouchStart = (e) => (touchStartX.current = e.touches?.[0]?.clientX || 0);
  const onTouchEnd = (e) => {
    const endX = e.changedTouches?.[0]?.clientX || 0;
    const delta = touchStartX.current - endX;
    const threshold = 45;
    if (delta > threshold) next();
    else if (delta < -threshold) prev();
    touchStartX.current = 0;
  };

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b from-[#eef7f7] to-[#dfeff0] flex flex-col items-center overflow-hidden"
      aria-label="Client testimonials"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold text-[#083333] mb-8 text-center"
      >
        What Our <span className="text-[#619696]">Clients Say</span>
      </motion.h2>

      <div className="w-full max-w-5xl px-4">
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/30"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* single video element - never unmounted */}
          <video
            ref={videoRef}
            preload="metadata"
            playsInline
            muted={isMuted}
            onCanPlayThrough={handleCanPlayThrough}
            className="w-full h-[min(66vh,520px)] md:h-[min(72vh,700px)] lg:h-[min(68vh,720px)] object-contain bg-black"
            onClick={togglePlayPause}
            aria-label={`Testimonial video ${activeIndex + 1}`}
          >
            <source src={testimonials_data[activeIndex].video} type="video/mp4" />
            {/* fallback text */}
            Your browser does not support the video tag.
          </video>

          {/* Loading Indicator Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 transition-opacity duration-300">
              <Loader2 className="animate-spin text-white h-10 w-10 mb-4" />
              <p className="text-white/70 text-sm">Loading testimonial...</p>
            </div>
          )}

          {/* elegant top/bottom gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* left/right controls */}
          <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous testimonial"
              className="pointer-events-auto bg-white/90 hover:bg-white text-[#083333] p-3 rounded-full shadow-lg backdrop-blur-md"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next testimonial"
              className="pointer-events-auto bg-white/90 hover:bg-white text-[#083333] p-3 rounded-full shadow-lg backdrop-blur-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* controls cluster */}
          <div className="absolute bottom-4 right-4 flex items-center gap-3 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute(e);
              }}
              aria-pressed={!isMuted}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="bg-white/90 hover:bg-white text-[#083333] rounded-full p-2 shadow-lg backdrop-blur-sm"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause(e);
              }}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="bg-white/80 hover:bg-white text-[#083333] rounded-full p-2 shadow-lg backdrop-blur-sm flex items-center justify-center"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>

          {/* fade overlay (used during src swap) */}
          <div
            aria-hidden
            className={`absolute inset-0 pointer-events-none transition-opacity duration-250 ${isFading ? "opacity-70 bg-black/60" : "opacity-0"
              }`}
          />
        </div>

        {/* indicators */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {testimonials_data.map((_, i) => (
            <button
              key={i}
              onClick={() => changeTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-all duration-200 ${i === activeIndex ? "bg-[#619696] scale-110" : "bg-gray-300/70 hover:scale-105"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-36 w-[520px] h-[520px] rounded-full bg-[#619696]/18 blur-3xl" />
    </section>
  );
};

export default Testimonials_Section;