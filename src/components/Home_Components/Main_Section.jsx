import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Pure_Bliss_2 from "../../assets/video/Pure_Bliss_2.mp4";
import PureBlissLogo from "../../assets/logo_1.png"; // ✅ update path if needed

/* ─────────────────────────────────────────────
   Page Loader — inline (no separate file needed)
───────────────────────────────────────────── */
const PageLoader = ({ isLoading }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setVisible(false), 650);
      return () => clearTimeout(t);

    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pb-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#ffffff",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&display=swap');
            @keyframes pb-bar {
              0%   { width: 0%;  opacity: 1; }
              78%  { width: 93%; opacity: 1; }
              95%  { width: 97%; opacity: 1; }
              100% { width: 97%; opacity: 0; }
            }
            .pb-topbar-fill, .pb-track-fill { animation: pb-bar 2.6s cubic-bezier(0.4,0,0.2,1) infinite; }
            @keyframes pb-spin  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
            @keyframes pb-spinr { to { transform: translate(-50%,-50%) rotate(-360deg); } }
            .pb-ring-cw  { animation: pb-spin  9s linear infinite; }
            .pb-ring-ccw { animation: pb-spinr 14s linear infinite; }
            @keyframes pb-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.55)} }
            .pb-dot { animation: pb-pulse 1.6s ease-in-out infinite; }
            @keyframes pb-blink { 0%,40%,100%{opacity:1} 70%{opacity:.3} }
            .pb-status-txt { animation: pb-blink 2.4s ease-in-out infinite; }
            @keyframes pb-scan {
              0%{top:0%;opacity:0} 6%{opacity:1} 94%{opacity:1} 100%{top:100%;opacity:0}
            }
            .pb-scan { animation: pb-scan 3.2s ease-in-out infinite; }
            @keyframes pb-breathe { 0%,100%{opacity:.5} 50%{opacity:1} }
            .pb-tagline { animation: pb-breathe 2.4s ease-in-out infinite; }
          `}</style>

          {/* Top bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#e4f0f3" }}>
            <div className="pb-topbar-fill" style={{ height: "100%", background: "linear-gradient(90deg,#1565c0,#1e88e5,#29b6d8)", borderRadius: "0 2px 2px 0" }} />
          </div>

          {/* Scan sweep */}
          <div className="pb-scan" style={{ position: "absolute", left: 0, right: 0, height: 56, background: "linear-gradient(to bottom,transparent,rgba(21,101,192,0.035),transparent)", pointerEvents: "none" }} />

          {/* Corner brackets */}
          {[
            { top: 22, left: 22, borderWidth: "1.5px 0 0 1.5px" },
            { top: 22, right: 22, borderWidth: "1.5px 1.5px 0 0" },
            { bottom: 22, left: 22, borderWidth: "0 0 1.5px 1.5px" },
            { bottom: 22, right: 22, borderWidth: "0 1.5px 1.5px 0" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 20, height: 20, borderStyle: "solid", borderColor: "rgba(21,101,192,0.18)", ...s }} />
          ))}

          {/* Logo zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", width: 110, height: 110, marginBottom: 26 }}
          >
            {/* Ring 1 */}
            <div className="pb-ring-cw" style={{ position: "absolute", width: 104, height: 104, borderRadius: "50%", border: "1px solid rgba(21,101,192,0.15)", top: "50%", left: "50%" }}>
              <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#1e88e5", top: -3, left: "50%", marginLeft: -3 }} />
            </div>
            {/* Ring 2 */}
            <div className="pb-ring-ccw" style={{ position: "absolute", width: 126, height: 126, borderRadius: "50%", border: "1px solid rgba(21,101,192,0.08)", top: "50%", left: "50%" }}>
              <div style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: "#1565c0", bottom: -2.5, left: "50%", marginLeft: -2.5 }} />
            </div>
            {/* Logo circle */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: "50%", background: "#f5fafd", border: "1.5px solid #b8d9eb", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, overflow: "hidden" }}>
              <img src={PureBlissLogo} alt="Pure Bliss" style={{ width: 58, height: 58, objectFit: "contain" }} />
            </div>
          </motion.div>

          {/* Brand name */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }} style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(1.4rem,4vw,1.75rem)", color: "#0d3a54", letterSpacing: "0.06em", margin: "0 0 4px", lineHeight: 1.2 }}>Pure Bliss</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: "9px", color: "#5a9bb8", letterSpacing: "0.30em", textTransform: "uppercase", margin: 0 }}>Skin &amp; Eye Clinic</p>
          </motion.div>

          {/* Status + progress */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 13 }}>
              <div className="pb-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#1e88e5", flexShrink: 0 }} />
              <span className="pb-status-txt" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#6aadca", letterSpacing: "0.05em" }}>Loading your experience…</span>
            </div>
            <div style={{ width: 148, height: 1.5, background: "#ddeef4", borderRadius: 2, overflow: "hidden" }}>
              <div className="pb-track-fill" style={{ height: "100%", background: "linear-gradient(90deg,#1565c0,#29b6d8)", borderRadius: 2 }} />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }} style={{ textAlign: "center", marginTop: 20 }}>
            <div style={{ width: 28, height: 1, background: "#cce4ed", margin: "0 auto 12px" }} />
            <p className="pb-tagline" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(0.72rem,2vw,0.82rem)", color: "#88c0d4", letterSpacing: "0.03em", margin: 0 }}>
              Where Care Meets Confidence
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────
   Taglines
───────────────────────────────────────────── */
const taglines = [
  "Where Care Meets Confidence",
  "Bringing Out Your Natural Glow",
  "Advanced Skin, Hair & Eye Solutions",
  "Elegance. Expertise. Empathy.",
];

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
const Main_Section = () => {
  const [isFading, setIsFading] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const videoRef = useRef(null);

  /* ── Autoplay ── */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((e) => console.log("Autoplay blocked:", e));
    }
  }, []);

  /* ── Hide loader once video is ready ── */
  useEffect(() => {
    if (videoLoaded) {
      // Small buffer so the hero fades in gracefully after loader exits
      const t = setTimeout(() => setPageReady(true), 300);
      return () => clearTimeout(t);
    }
  }, [videoLoaded]);

  /* ── Fallback: hide loader after 3.5s max (slow network) ── */
  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 3500);
    return () => clearTimeout(t);
  }, []);

  /* ── Tagline cycle ── */
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineIndex((p) => (p + 1) % taglines.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const handleVideoEnd = () => {
    setIsFading(true);
    setTimeout(() => setIsFading(false), 200);
  };

  return (
    <>
      {/* ── Loader ── */}
      <PageLoader isLoading={!pageReady} />

      {/* ── Hero ── */}
      <div
        className="relative w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
          .hero-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; letter-spacing: 0.02em; }
          .hero-body  { font-family: 'DM Sans', sans-serif; }
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }
          .shimmer-line {
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
          }
          @keyframes scanline {
            0%   { top: -10%; }
            100% { top: 110%; }
          }
          .scanline {
            position: absolute; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(180,230,230,0.15), transparent);
            animation: scanline 7s linear infinite;
            pointer-events: none; z-index: 3;
          }
        `}</style>

        {/* Background Video */}
        <AnimatePresence mode="wait">
          <motion.video
            key="hero-video"
            ref={videoRef}
            autoPlay muted loop playsInline
            onEnded={handleVideoEnd}
            onCanPlay={() => setVideoLoaded(true)}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: isFading ? 0 : (videoLoaded ? 1 : 0), scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full z-[1] object-cover"
          >
            <source src={Pure_Bliss_2} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        <div className="scanline" />

        {/* Overlays */}
        <div className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(160deg, rgba(10,30,30,0.72) 0%, rgba(8,25,25,0.44) 50%, rgba(12,35,35,0.68) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 z-[2]"
          style={{ height: "30%", background: "linear-gradient(to top, rgba(8,22,22,0.65), transparent)" }} />
        <div className="absolute inset-0 z-[2]"
          style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.42) 100%)" }} />

        {/* Content */}
        <div className="relative z-[5] flex flex-col items-center text-center
                        px-4 sm:px-8 md:px-12
                        w-full max-w-[92vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
                        py-20 sm:py-24 md:py-28">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-body mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3"
          >
            <span className="block w-5 sm:w-7 h-px bg-[#7dcfcf]/60" />
            <span className="text-[#a8dcdc] text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] sm:tracking-[0.32em]">
              Pure Bliss Skin &amp; Eye Clinic
            </span>
            <span className="block w-5 sm:w-7 h-px bg-[#7dcfcf]/60" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title text-white leading-[1.07]
                       text-[clamp(2.2rem,7vw,4.5rem)]
                       mb-2 sm:mb-3"
          >
            Experience Elegance
            <br />
            <span className="italic font-light" style={{ color: "#b8e8e8" }}>in Care</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="my-4 sm:my-5 h-px w-24 sm:w-36 md:w-44 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, rgba(180,230,230,0.55), transparent)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-body text-[#cde8e8]/80 font-light leading-relaxed mb-7 sm:mb-8
                       text-[clamp(0.82rem,2.2vw,1.1rem)]
                       max-w-[85%] sm:max-w-md md:max-w-lg mx-auto"
          >
            Top-notch skin, hair, and eye care services — crafted for your confidence.
          </motion.p>

          {/* Tagline carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-9 sm:mb-10 overflow-hidden flex items-center justify-center"
            style={{ height: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="hero-body italic text-[#9dd8d8]/90 font-light tracking-wide
                           text-[clamp(0.85rem,2.4vw,1.2rem)]"
              >
                {taglines[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <Link to="/appointment"
              className="group relative hero-body inline-flex items-center gap-2.5
                         text-white font-semibold rounded-full overflow-hidden
                         bg-[#3a8080] hover:bg-[#2d6b6b]
                         shadow-xl shadow-[#2d6b6b]/30 hover:shadow-2xl hover:shadow-[#2d6b6b]/40
                         transition-all duration-300 hover:-translate-y-0.5
                         px-6 py-3 sm:px-7 sm:py-3.5
                         text-[clamp(0.78rem,1.8vw,0.9rem)]">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-line" />
              <span className="relative">Book an Appointment</span>
              <svg className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link to="/skincare"
              className="hero-body inline-flex items-center gap-2
                         border border-white/25 hover:border-white/50
                         text-white/80 hover:text-white
                         rounded-full backdrop-blur-sm
                         transition-all duration-300 hover:-translate-y-0.5
                         px-6 py-3 sm:px-7 sm:py-3.5
                         text-[clamp(0.78rem,1.8vw,0.9rem)] font-medium">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Main_Section;