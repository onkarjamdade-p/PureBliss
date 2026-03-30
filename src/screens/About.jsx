import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

import founder from "../assets/founder.jpg";
import logoFull from "../assets/NewLogo3.png";
import skinCareImg from "../assets/skin_1.jpg";
import hairCareImg from "../assets/hair_1.jpg";
import eyeCareImg from "../assets/eye_3.jpg";
import PureBlissLogo from "../assets/logo_1.png"; // ✅ update path if needed

/* ─────────────────────────────────────────────
   Page Loader
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
            <div className="pb-ring-cw" style={{ position: "absolute", width: 104, height: 104, borderRadius: "50%", border: "1px solid rgba(21,101,192,0.15)", top: "50%", left: "50%" }}>
              <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#1e88e5", top: -3, left: "50%", marginLeft: -3 }} />
            </div>
            <div className="pb-ring-ccw" style={{ position: "absolute", width: 126, height: 126, borderRadius: "50%", border: "1px solid rgba(21,101,192,0.08)", top: "50%", left: "50%" }}>
              <div style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: "#1565c0", bottom: -2.5, left: "50%", marginLeft: -2.5 }} />
            </div>
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
   DATA
───────────────────────────────────────────── */
const TAGLINES = [
  "Care that Defines Confidence",
  "Beauty Rooted in Science",
  "Precision. Passion. Perfection.",
];

const FOCUS_AREAS = [
  { img: skinCareImg, title: "Skin Care", tag: "Rejuvenation", desc: "Carbon peels to hydra facials — restoring youthful radiance and confidence from within.", delay: 0 },
  { img: hairCareImg, title: "Hair Care", tag: "Restoration", desc: "PRP, GFC, and scalp therapies — experience healthy, voluminous hair renewed from the root.", delay: 0.15 },
  { img: eyeCareImg, title: "Eye Care", tag: "Aesthetics", desc: "Dry eye therapy to eyelash lifts — gentle, precise treatments for a brighter outlook.", delay: 0.3 },
];

const CREDENTIALS = ["B.Optom", "PGDCC", "PMU Certified", "Clinical Optometrist", "Cosmetologist", "Trichologist"];

const VM = [
  {
    label: "Our Vision", number: "01", icon: "◈",
    text: "To redefine aesthetic excellence through innovation, compassion, and precision — empowering every individual to radiate confidence and wellness."
  },
  {
    label: "Our Mission", number: "02", icon: "✦",
    text: "We deliver world-class treatments rooted in science and care, ensuring every client's experience is transformative, safe, and deeply fulfilling."
  },
];

/* ─────────────────────────────────────────────
   FLOATING PARTICLE
───────────────────────────────────────────── */
const Particle = ({ x, y, size, duration, delay, opacity }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      background: "radial-gradient(circle, rgba(91,185,185,0.6) 0%, transparent 70%)"
    }}
    animate={{ y: [0, -24, 0], x: [0, 8, -8, 0], opacity: [opacity * 0.5, opacity, opacity * 0.5] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const PARTICLES = [
  { x: 8, y: 20, size: 6, duration: 5.5, delay: 0, opacity: 0.7 },
  { x: 88, y: 15, size: 4, duration: 7, delay: 1.2, opacity: 0.5 },
  { x: 15, y: 75, size: 8, duration: 6, delay: 0.5, opacity: 0.6 },
  { x: 92, y: 60, size: 5, duration: 4.8, delay: 2, opacity: 0.4 },
  { x: 50, y: 88, size: 3, duration: 8, delay: 0.8, opacity: 0.5 },
  { x: 72, y: 30, size: 7, duration: 5.2, delay: 1.5, opacity: 0.45 },
  { x: 30, y: 45, size: 4, duration: 6.5, delay: 3, opacity: 0.35 },
];

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
const Counter = ({ from, to, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      setVal(Math.floor(from + (to - from) * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView]);

  return <span ref={ref}>{val}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   MORPHING BLOB
───────────────────────────────────────────── */
const MorphBlob = ({ color = "#5bb9b9", size = 320, opacity = 0.07 }) => (
  <motion.svg width={size} height={size} viewBox="0 0 200 200"
    className="absolute pointer-events-none select-none"
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    style={{ opacity }}
  >
    <motion.path fill={color}
      animate={{
        d: [
          "M47.5,-61.8C60.5,-52.3,69.4,-36.6,72.1,-20.1C74.9,-3.6,71.4,13.7,63.3,28.4C55.2,43.2,42.4,55.4,27.5,62.5C12.5,69.7,-4.7,71.8,-20.8,67.3C-36.9,62.8,-52,51.7,-62.1,36.8C-72.3,22,-77.5,3.3,-73.7,-13.2C-69.9,-29.7,-57.2,-44.1,-43,-53.4C-28.9,-62.7,-13.2,-66.9,2.5,-70C18.1,-73.1,34.5,-71.3,47.5,-61.8Z",
          "M42,-56.3C54.3,-46.8,63.8,-32.2,67.5,-16.2C71.2,-0.2,69.2,17.2,61.5,31.2C53.8,45.2,40.4,55.8,25.5,62.1C10.6,68.3,-5.7,70.1,-20.8,65.5C-35.9,60.9,-49.8,49.8,-59.1,35.4C-68.4,21,-73.1,3.2,-70,-13.4C-66.9,-30,-55.9,-45.3,-42.2,-54.8C-28.5,-64.3,-12.3,-68,2.5,-71C17.3,-74,29.7,-65.8,42,-56.3Z",
          "M47.5,-61.8C60.5,-52.3,69.4,-36.6,72.1,-20.1C74.9,-3.6,71.4,13.7,63.3,28.4C55.2,43.2,42.4,55.4,27.5,62.5C12.5,69.7,-4.7,71.8,-20.8,67.3C-36.9,62.8,-52,51.7,-62.1,36.8C-72.3,22,-77.5,3.3,-73.7,-13.2C-69.9,-29.7,-57.2,-44.1,-43,-53.4C-28.9,-62.7,-13.2,-66.9,2.5,-70C18.1,-73.1,34.5,-71.3,47.5,-61.8Z",
        ]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

/* ─────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────── */
const SectionHeading = ({ eyebrow, title, subtitle, light = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="text-center mb-14 md:mb-16"
  >
    <motion.p
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.28em" }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`text-[10px] sm:text-xs font-semibold uppercase mb-3 ${light ? "text-[#9dd8d8]" : "text-[#5bb9b9]"}`}
      style={{ letterSpacing: "0.28em" }}
    >
      {eyebrow}
    </motion.p>
    <h2 className={`leading-tight mb-4 ${light ? "text-white" : "text-[#1a3d3d]"}`}
      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
      {title}
    </h2>
    <motion.div
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.9, delay: 0.3 }} viewport={{ once: true }}
      className="mx-auto h-px w-16 origin-center mb-5"
      style={{ background: light ? "linear-gradient(90deg, transparent, rgba(157,216,216,0.8), transparent)" : "linear-gradient(90deg, transparent, #5bb9b9, transparent)" }}
    />
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }} viewport={{ once: true }}
        className={`font-light max-w-lg mx-auto leading-relaxed ${light ? "text-white/60" : "text-[#4a7070]"}`}
        style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
const About = () => {
  const [tagIdx, setTagIdx] = useState(0);
  const [pageReady, setPageReady] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpac = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* ── Hide loader after mount settle ── */
  useEffect(() => {
    // Short delay lets React paint the page before dismissing loader
    const t = setTimeout(() => setPageReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  /* ── Fallback: always hide after 3.5s (slow network) ── */
  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTagIdx(p => (p + 1) % TAGLINES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ── Loader ── */}
      <PageLoader isLoading={!pageReady} />

      {/* ── Page ── */}
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          @keyframes spin-slow { to { transform: rotate(360deg); } }
          .spin-slow { animation: spin-slow 18s linear infinite; }
          @keyframes spin-rev  { to { transform: rotate(-360deg); } }
          .spin-rev  { animation: spin-rev 24s linear infinite; }
          @keyframes pulse-ring {
            0%   { transform: scale(1);   opacity: 0.4; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .pulse-ring   { animation: pulse-ring 3s ease-out infinite; }
          .pulse-ring-2 { animation: pulse-ring 3s ease-out 1s infinite; }
        `}</style>

        {/* ══ HERO ══ */}
        <section ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0d2e2e 0%, #1a4f4f 40%, #255f5f 80%, #2d7070 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />

          <div className="absolute -top-20 -left-20 opacity-100">
            <MorphBlob color="#5bb9b9" size={420} opacity={0.06} />
          </div>
          <div className="absolute -bottom-20 -right-20">
            <MorphBlob color="#2d6b6b" size={380} opacity={0.08} />
          </div>

          {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="spin-slow w-[500px] h-[500px] rounded-full opacity-[0.06]"
              style={{ border: "1px solid rgba(91,185,185,0.8)" }} />
            <div className="spin-rev absolute w-[700px] h-[700px] rounded-full opacity-[0.04]"
              style={{ border: "1px dashed rgba(91,185,185,0.6)" }} />
          </div>

          <motion.div style={{ y: logoY, opacity: heroOpac }}
            className="relative z-10 flex flex-col items-center px-5 sm:px-10 max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 mb-8"
            >
              <motion.span animate={{ width: ["0px", "28px"] }} transition={{ duration: 0.8, delay: 0.4 }}
                className="block h-px bg-[#7dcfcf]/60" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a8dcdc]">
                Pure Bliss Skin &amp; Eye Clinic
              </span>
              <motion.span animate={{ width: ["0px", "28px"] }} transition={{ duration: 0.8, delay: 0.4 }}
                className="block h-px bg-[#7dcfcf]/60" />
            </motion.div>

            <div className="relative flex items-center justify-center mb-9">
              <div className="pulse-ring   absolute w-48 h-48 rounded-full border border-[#5bb9b9]/30" />
              <div className="pulse-ring-2 absolute w-48 h-48 rounded-full border border-[#5bb9b9]/20" />
              <motion.img src={logoFull} alt="Pure Bliss"
                className="relative w-36 sm:w-44 md:w-52 object-contain select-none"
                style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3)) brightness(1.08)" }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="mb-5 overflow-hidden" style={{ height: "clamp(2.2rem, 5vw, 3.2rem)" }}>
              <AnimatePresence mode="wait">
                <motion.h1 key={tagIdx}
                  initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -28, filter: "blur(4px)" }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)", lineHeight: 1.1 }}
                >
                  {TAGLINES[tagIdx]}
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="mb-5 h-px w-28 sm:w-40 origin-center"
              style={{ background: "linear-gradient(90deg, transparent, rgba(180,230,230,0.6), transparent)" }}
            />

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="text-white/60 font-light leading-relaxed max-w-md"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Experience holistic wellness for your skin, hair, and eyes with advanced, compassionate care.
            </motion.p>

            <motion.a href="/appointment"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2.5
                         bg-white/10 hover:bg-white/18 backdrop-blur-sm
                         border border-white/20 hover:border-white/40
                         text-white text-xs font-semibold uppercase tracking-wider
                         px-6 py-3 rounded-full transition-all duration-250"
            >
              Book a Consultation
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">Scroll</span>
            <div className="w-px h-8 relative overflow-hidden"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }}>
              <motion.div className="absolute top-0 left-0 right-0 h-3 bg-white/50 rounded-full"
                animate={{ y: ["-100%", "250%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
            </div>
          </motion.div>
        </section>

        {/* ══ STATS STRIP ══ */}
        <section className="py-14 relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #1a4f4f 0%, #2d7070 50%, #1a4f4f 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />

          <div className="relative max-w-4xl mx-auto px-5">
            <div className="grid grid-cols-3 gap-0 divide-x divide-white/10">
              {[
                { title: "Skin Care", desc: "Glow, acne & anti-aging treatments", icon: "" },
                { title: "Hair Care", desc: "Hair fall, PRP & restoration", icon: "" },
                { title: "Eye Care", desc: "Advanced eye & aesthetic treatments", icon: "" },
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center py-5 px-2 text-center"
                >
                  <span className="text-2xl mb-2">{s.icon}</span>
                  <span className="text-white font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                    {s.title}
                  </span>
                  <span className="text-[#9dd8d8]/80 text-[11px] sm:text-xs font-medium uppercase tracking-widest mt-2">
                    {s.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOCUS AREAS ══ */}
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #2d6b6b 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, rgba(91,185,185,0.06), transparent 65%)" }} />

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
            <SectionHeading eyebrow="Specialisations" title="Our Focus Areas"
              subtitle="Precision treatments across three pillars of aesthetic and clinical excellence." />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {FOCUS_AREAS.map((item) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 50, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.28 } }}
                  className="group relative flex flex-col bg-white rounded-3xl overflow-hidden
                             border border-[#e4eded]
                             shadow-[0_2px_16px_rgba(45,107,107,0.07)]
                             hover:shadow-[0_20px_56px_rgba(45,107,107,0.16)]
                             transition-shadow duration-400"
                  style={{ perspective: 1000 }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <motion.img src={item.img} alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                    <span className="absolute top-3.5 left-3.5 text-[9px] font-semibold uppercase tracking-widest
                                     bg-white/15 backdrop-blur-sm border border-white/25 text-white px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <h3 className="absolute bottom-0 left-0 px-5 pb-4 text-white font-medium"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)" }}>
                      {item.title}
                    </h3>
                  </div>
                  <div className="px-5 pt-4 pb-5">
                    <motion.div className="h-px bg-[#5bb9b9] mb-3 origin-left opacity-60"
                      initial={{ scaleX: 0.3 }}
                      whileInView={{ scaleX: 0.5 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <p className="text-[#4a7070] text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#5bb9b9] to-[#2d6b6b]
                                  w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ VISION + MISSION ══ */}
        <section className="py-24 md:py-28 relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0d2e2e 0%, #1a4f4f 50%, #255f5f 100%)" }}>
          <div className="absolute top-0 left-0 opacity-100">
            <MorphBlob color="#5bb9b9" size={500} opacity={0.05} />
          </div>
          {PARTICLES.slice(0, 4).map((p, i) => <Particle key={i} {...p} />)}

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 md:px-12">
            <SectionHeading eyebrow="Who We Are" title="Vision & Mission" light />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VM.map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
                  className="relative rounded-3xl p-7 sm:p-8 overflow-hidden cursor-default"
                  style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)" }}
                >
                  <span className="absolute top-4 right-6 leading-none select-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "5rem", color: "rgba(255,255,255,0.05)" }}>
                    {item.number}
                  </span>
                  <motion.span className="block text-2xl text-[#5bb9b9]/60 mb-4"
                    animate={{ rotate: [0, 8, -8, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 5, repeat: Infinity, delay: i * 1.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  <div className="w-10 h-px mb-4"
                    style={{ background: "linear-gradient(90deg, rgba(157,216,216,0.7), transparent)" }} />
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9dd8d8]/60 mb-2">{item.label}</p>
                  <p className="text-white/70 font-light leading-relaxed" style={{ fontSize: "clamp(0.875rem, 1.8vw, 1rem)" }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOUNDER ══ */}
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute -bottom-32 -left-32 pointer-events-none opacity-100">
            <MorphBlob color="#5bb9b9" size={500} opacity={0.05} />
          </div>

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
            <SectionHeading eyebrow="Meet the Expert" title="Our Founder" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-start"
              >
                <div className="relative">
                  {[80, 96, 112].map((size, i) => (
                    <motion.div key={i}
                      className="absolute rounded-full border border-[#5bb9b9]"
                      style={{ inset: `-${size / 8}px`, opacity: 0.08 + i * 0.04 }}
                      animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
                      transition={{ duration: 20 + i * 6, repeat: Infinity, ease: "linear" }}
                    />
                  ))}
                  <motion.img src={founder} alt="Shivani Sawant"
                    className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80
                               rounded-full object-cover border-4 border-white
                               shadow-[0_20px_60px_rgba(45,107,107,0.2)]"
                    initial={{ scale: 0.85 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-3 -right-3 sm:right-0
                               bg-white rounded-2xl px-4 py-2.5
                               border border-[#e4eded]
                               shadow-[0_8px_24px_rgba(45,107,107,0.12)]"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9ab8b8]">Specialty</p>
                    <p className="text-sm font-semibold text-[#2d6b6b] mt-0.5 whitespace-nowrap">
                      Optometrist &amp; Cosmetologist
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5bb9b9] mb-2">Founder</p>
                  <h3 className="text-[#1a3d3d] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
                    Shivani Sawant
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {CREDENTIALS.map((c, i) => (
                    <motion.span key={c}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                      viewport={{ once: true }}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#edf8f8] text-[#2d6b6b] border border-[#c5e0e0]"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
                  className="w-12 h-px origin-left"
                  style={{ background: "linear-gradient(90deg, #5bb9b9, transparent)" }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="text-[#4a7070] font-light leading-relaxed"
                  style={{ fontSize: "clamp(0.875rem, 1.8vw, 1rem)" }}
                >
                  Shivani Sawant created Pure Bliss Clinic to offer reliable and comfortable skin, hair, and eye care.
                  She believes in understanding every patient's unique concerns. Her treatments focus on natural,
                  effective, and long-lasting results. With her experience and warm approach, she makes every visit
                  reassuring. Her goal is simple — to help you look and feel your best.
                </motion.p>

                <motion.a href="/appointment"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}
                  whileHover={{ scale: 1.03, backgroundColor: "#245858" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-[#2d6b6b] text-white
                             text-xs font-semibold uppercase tracking-wider
                             px-6 py-3 rounded-full shadow-lg shadow-[#2d6b6b]/25
                             transition-colors duration-200"
                >
                  Book a Consultation
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;