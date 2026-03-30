import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause, Loader2 } from "lucide-react";

import Testimonials_1 from "../../assets/video/Testimonials_1.mp4";
import Testimonials_2 from "../../assets/video/Testimonials_2.mp4";
import Testimonials_3 from "../../assets/video/Testimonials_3.mp4";
import Testimonials_4 from "../../assets/video/Testimonials_4.mp4";

const TESTIMONIALS = [
  { id: 1, video: Testimonials_1, label: "Client 1" },
  { id: 2, video: Testimonials_2, label: "Client 2" },
  { id: 3, video: Testimonials_3, label: "Client 3" },
  { id: 4, video: Testimonials_4, label: "Client 4" },
];

const Testimonials_Section = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  const playSafe = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const p = vid.play();
    if (p?.then) p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    else setIsPlaying(!vid.paused);
  }, []);

  const setVideoSource = useCallback((index) => {
    const vid = videoRef.current;
    if (!vid) return;
    setIsLoading(true);
    const newSrc = TESTIMONIALS[index].video;
    if (vid.src?.includes(newSrc)) { setIsLoading(false); playSafe(); return; }
    try { vid.pause(); setIsPlaying(false); vid.src = newSrc; vid.load(); }
    catch { try { const s = vid.querySelector("source"); if (s) { s.src = newSrc; vid.load(); } } catch { } }
  }, [playSafe]);

  const changeTo = useCallback((newIndex) => {
    if (newIndex === activeIndex) return;
    clearTimers();
    setWasPlayingBeforeHide(videoRef.current ? !videoRef.current.paused : isPlaying);
    setIsFading(true);
    const t = setTimeout(() => { setActiveIndex(newIndex); setVideoSource(newIndex); }, 220);
    timersRef.current.push(t);
  }, [activeIndex, setVideoSource, isPlaying]);

  const next = useCallback(() => changeTo((activeIndex + 1) % TESTIMONIALS.length), [activeIndex, changeTo]);
  const prev = useCallback(() => changeTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [activeIndex, changeTo]);

  const handleCanPlayThrough = useCallback(() => {
    setIsLoading(false);
    if (isFading) { clearTimers(); const t = setTimeout(() => setIsFading(false), 260); timersRef.current.push(t); }
    if (isPlaying) playSafe();
  }, [isFading, isPlaying, playSafe]);

  useEffect(() => { setVideoSource(activeIndex); }, [activeIndex]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const handle = () => {
      if (document.hidden) { setWasPlayingBeforeHide(!vid.paused); try { vid.pause(); setIsPlaying(false); } catch { } }
      else if (wasPlayingBeforeHide && vid.hasAttribute("data-intersecting")) playSafe();
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, [playSafe, wasPlayingBeforeHide]);

  useEffect(() => {
    const container = containerRef.current;
    const vid = videoRef.current;
    if (!container || !vid) return;
    let dt = null;
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (dt) clearTimeout(dt);
        dt = setTimeout(() => {
          if (e.isIntersecting && e.intersectionRatio >= 0.45) {
            vid.setAttribute("data-intersecting", "true");
            if (!isLoading && !document.hidden) playSafe();
          } else {
            vid.removeAttribute("data-intersecting");
            try { vid.pause(); setIsPlaying(false); } catch { }
          }
        }, 110);
      });
    }, { threshold: [0.45, 0.5] });
    observerRef.current.observe(container);
    return () => { observerRef.current?.disconnect(); if (dt) clearTimeout(dt); };
  }, [playSafe, isLoading]);

  useEffect(() => {
    const handler = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        const vid = videoRef.current;
        if (!vid) return;
        if (vid.paused) playSafe(); else { vid.pause(); setIsPlaying(false); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, playSafe]);

  const toggleMute = (e) => {
    e?.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    const m = !isMuted; setIsMuted(m); vid.muted = m; playSafe();
  };

  const togglePlayPause = (e) => {
    e?.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) playSafe(); else { vid.pause(); setIsPlaying(false); }
  };

  const touchStartX = useRef(0);
  const onTouchStart = (e) => (touchStartX.current = e.touches?.[0]?.clientX || 0);
  const onTouchEnd = (e) => {
    const delta = touchStartX.current - (e.changedTouches?.[0]?.clientX || 0);
    if (delta > 45) next(); else if (delta < -45) prev();
    touchStartX.current = 0;
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #eaf5f5 0%, #d6ecec 55%, #cce8e8 100%)",
        fontFamily: "'DM Sans', sans-serif"
      }}
      aria-label="Client testimonials"
    >
      {/* Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #2d6b6b 1px, transparent 0)",
          backgroundSize: "28px 28px"
        }} />

      {/* Glow orbs */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(91,185,185,0.1) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(45,107,107,0.09) 0%, transparent 70%)" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#5bb9b9] mb-3">
            Real Stories
          </p>
          <h2 className="text-[#1a3d3d] leading-tight mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(1.9rem, 5vw, 3rem)"
            }}>
            What Our{" "}
            <span className="italic" style={{ color: "#3a8080" }}>Clients Say</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}
            className="mx-auto h-px w-16 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #5bb9b9, transparent)" }}
          />
        </motion.div>

        {/* ── Video player ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div
            className="relative rounded-3xl overflow-hidden bg-black
                       border border-white/10
                       shadow-[0_24px_80px_rgba(45,107,107,0.18)]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Video */}
            <video
              ref={videoRef}
              preload="metadata"
              playsInline
              muted={isMuted}
              onCanPlayThrough={handleCanPlayThrough}
              onClick={togglePlayPause}
              aria-label={`Testimonial video ${activeIndex + 1}`}
              className="w-full object-contain bg-black cursor-pointer"
              style={{ height: "min(66vh, 520px)" }}
            >
              <source src={TESTIMONIALS[activeIndex].video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 z-30">
                <div className="relative flex items-center justify-center mb-4">
                  {[0, 0.4, 0.8].map((d, i) => (
                    <motion.div key={i}
                      className="absolute rounded-full border border-[#5bb9b9]/40"
                      style={{ width: 40 + i * 20, height: 40 + i * 20 }}
                      animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: d }} />
                  ))}
                  <Loader2 className="animate-spin text-[#5bb9b9] w-8 h-8" />
                </div>
                <p className="text-white/50 text-xs tracking-widest uppercase">Loading…</p>
              </div>
            )}

            {/* Top/bottom gradients */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-20"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-28"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }} />
            </div>

            {/* Slide counter — top left */}
            <div className="absolute top-4 left-4 z-20">
              <span className="text-[10px] font-semibold uppercase tracking-widest
                               bg-black/30 backdrop-blur-sm border border-white/15
                               text-white/80 px-2.5 py-1 rounded-full">
                {activeIndex + 1} / {TESTIMONIALS.length}
              </span>
            </div>

            {/* Nav arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-4 pointer-events-none z-20">
              {[{ fn: prev, icon: ChevronLeft, label: "Previous" },
              { fn: next, icon: ChevronRight, label: "Next" }].map(({ fn, icon: Icon, label }) => (
                <button key={label}
                  onClick={(e) => { e.stopPropagation(); fn(); }}
                  aria-label={`${label} testimonial`}
                  className="pointer-events-auto
                             w-9 h-9 sm:w-10 sm:h-10 rounded-full
                             bg-white/85 hover:bg-white
                             text-[#1a3d3d] shadow-lg backdrop-blur-sm
                             flex items-center justify-center
                             transition-all duration-200 hover:scale-105 hover:shadow-xl">
                  <Icon size={18} />
                </button>
              ))}
            </div>

            {/* Controls cluster — bottom right */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
              <button onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-white
                           text-[#1a3d3d] shadow-md backdrop-blur-sm
                           flex items-center justify-center
                           transition-all duration-200 hover:scale-105">
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <button onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-white
                           text-[#1a3d3d] shadow-md backdrop-blur-sm
                           flex items-center justify-center
                           transition-all duration-200 hover:scale-105">
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>

            {/* Fade overlay (src swap) */}
            <div aria-hidden
              className={`absolute inset-0 pointer-events-none bg-black transition-opacity duration-250
                          ${isFading ? "opacity-60" : "opacity-0"}`} />
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => changeTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300
                  ${i === activeIndex
                    ? "w-6 h-2.5 bg-[#2d6b6b]"
                    : "w-2.5 h-2.5 bg-[#9ab8b8]/50 hover:bg-[#5bb9b9]/60"}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials_Section;