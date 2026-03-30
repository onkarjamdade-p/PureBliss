import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Eye, X, Sparkles, ArrowRight, ChevronDown } from "lucide-react";

import treatment1 from "../assets/DryEye.jpg";
import treatment2 from "../assets/eye_3.jpg";
import treatment3 from "../assets/EyeLashLift.jpg";
import treatment4 from "../assets/EyelRejuvenation.jpg";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const EYE_SERVICES = [
    {
        id: 1,
        title: "Dry Eye Therapy",
        tag: "Eye Comfort",
        desc: "Hydrate and Soothe Irritated Eyes",
        img: treatment1,
        summary: "Advanced therapy designed to relieve dryness, itching, and redness while improving tear quality.",
        benefits: ["Reduces irritation and dryness", "Improves tear film stability", "Soothes sensitive eyes"],
    },
    {
        id: 2,
        title: "Vision Correction",
        tag: "LASIK",
        desc: "Clear Vision Without Glasses",
        img: treatment2,
        summary: "Laser-assisted correction for myopia, hyperopia, or astigmatism with minimal downtime.",
        benefits: ["Painless & precise laser correction", "Quick recovery time", "Freedom from glasses & lenses"],
    },
    {
        id: 3,
        title: "Eyelash Lift & Tint",
        tag: "Lash Enhancement",
        desc: "Naturally Curled, Beautiful Lashes",
        img: treatment3,
        summary: "Enhance your natural lashes with a lift and tint for a bright, open-eye look that lasts for weeks.",
        benefits: ["No need for mascara", "Natural-looking lift", "Long-lasting curl & shine"],
    },
    {
        id: 4,
        title: "Eyelid Rejuvenation",
        tag: "Blepharoplasty",
        desc: "Brighten Tired Eyes",
        img: treatment4,
        summary: "Minimally invasive treatment that reduces puffiness, sagging, and dark circles for youthful, fresh eyes.",
        benefits: ["Reduces fine lines & wrinkles", "Tightens loose eyelid skin", "Restores youthful eye contour"],
    },
];

/* ─────────────────────────────────────────────
   FLOATING PARTICLE
───────────────────────────────────────────── */
const Particle = ({ x, y, size, dur, delay }) => (
    <motion.div className="absolute rounded-full pointer-events-none"
        style={{
            left: `${x}%`, top: `${y}%`, width: size, height: size,
            background: "radial-gradient(circle, rgba(91,185,185,0.55) 0%, transparent 70%)"
        }}
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }} />
);

/* ─────────────────────────────────────────────
   DETAIL MODAL
───────────────────────────────────────────── */
const DetailModal = ({ service, onClose }) => (
    <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ background: "rgba(8,22,22,0.75)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
    >
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden
                 shadow-[0_32px_80px_rgba(0,0,0,0.3)]"
        >
            {/* Image header */}
            <div className="relative h-52 overflow-hidden">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 text-[9px] font-semibold uppercase tracking-widest
                         bg-white/15 backdrop-blur-sm border border-white/25 text-white px-2.5 py-1 rounded-full">
                    {service.tag}
                </span>
                <button onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm
                     text-white flex items-center justify-center hover:bg-black/50 transition-colors">
                    <X size={14} />
                </button>
                <div className="absolute bottom-0 left-0 px-6 pb-4">
                    <h3 className="text-white font-medium leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.4rem" }}>
                        {service.title}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Teal rule */}
                <div className="w-10 h-px mb-4" style={{ background: "linear-gradient(90deg, #5bb9b9, transparent)" }} />

                <p className="text-[#4a7070] text-sm font-light leading-relaxed mb-5 italic">
                    "{service.summary}"
                </p>

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9ab8b8] mb-3">
                    Key Benefits
                </p>
                <ul className="space-y-2.5 mb-6">
                    {service.benefits.map((b, i) => (
                        <motion.li key={i}
                            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.07 }}
                            className="flex items-start gap-2.5"
                        >
                            <div className="w-5 h-5 rounded-md bg-[#edf8f8] border border-[#c5e0e0] flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle size={11} className="text-[#5bb9b9]" strokeWidth={2.5} />
                            </div>
                            <span className="text-sm text-[#2d5555] font-light leading-snug">{b}</span>
                        </motion.li>
                    ))}
                </ul>

                <a href="/appointment"
                    className="flex items-center justify-center gap-2 w-full bg-[#2d6b6b] hover:bg-[#245858]
                     text-white text-xs font-semibold uppercase tracking-wider
                     py-3.5 rounded-2xl shadow-lg shadow-[#2d6b6b]/25 transition-colors duration-200">
                    <Sparkles size={13} className="opacity-80" />
                    Book This Treatment
                </a>
            </div>
        </motion.div>
    </motion.div>
);

/* ─────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────── */
const ServiceCard = ({ service, index, onOpen }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        whileHover={{ y: -7, transition: { duration: 0.25 } }}
        onClick={() => onOpen(service)}
        className="group relative flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer
               border border-[#e4eded]
               shadow-[0_2px_16px_rgba(45,107,107,0.07)]
               hover:shadow-[0_20px_56px_rgba(45,107,107,0.16)]
               transition-shadow duration-400"
    >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
            <motion.img src={service.img} alt={service.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.07 }} transition={{ duration: 0.55 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent
                      opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

            {/* Tag pill */}
            <span className="absolute top-3.5 left-3.5 text-[9px] font-semibold uppercase tracking-widest
                       bg-white/15 backdrop-blur-sm border border-white/25 text-white px-2.5 py-1 rounded-full">
                {service.tag}
            </span>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 px-5 pb-4">
                <h3 className="text-white font-medium leading-tight"
                    style={{
                        fontFamily: "'Cormorant Garamond',serif", fontWeight: 400,
                        fontSize: "clamp(1rem,2vw,1.2rem)"
                    }}>
                    {service.title}
                </h3>
            </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
            {/* Animated rule */}
            <motion.div
                className="h-px bg-[#5bb9b9] mb-3 origin-left opacity-50"
                style={{ width: "2rem" }}
                whileHover={{ width: "3.5rem", opacity: 0.8 }}
                transition={{ duration: 0.35 }}
            />

            <p className="text-[#4a7070] text-sm font-light leading-relaxed flex-1 mb-4">{service.desc}</p>

            {/* CTA row */}
            <div className="flex items-center gap-1.5 text-[#2d6b6b] text-xs font-semibold uppercase tracking-wider
                      group-hover:gap-2.5 transition-all duration-250">
                <Eye size={13} />
                <span>View Details</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-250" />
            </div>
        </div>

        {/* Bottom border slide */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#5bb9b9] to-[#2d6b6b]
                    w-0 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const EyeCare = () => {
    const [activeService, setActiveService] = useState(null);

    return (
        <div style={{ fontFamily: "'DM Sans',sans-serif" }}
            className="bg-[#f4f9f9] min-h-screen">

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 22s linear infinite; }
        @keyframes spin-rev  { to { transform: rotate(-360deg); } }
        .spin-rev  { animation: spin-rev 30s linear infinite; }
      `}</style>

            {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
            <section className="relative overflow-hidden flex flex-col items-center justify-center text-center
                          pt-20 sm:pt-0"
                style={{
                    minHeight: "clamp(380px,70vh,600px)",
                    background: "linear-gradient(145deg, #0d2e2e 0%, #1a4f4f 45%, #2d7070 100%)"
                }}>

                {/* Dot texture */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
                        backgroundSize: "26px 26px"
                    }} />

                {/* Video background */}
                <video src="/videos/eye_intro.mp4" autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />

                {/* Rotating rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="spin-slow w-[600px] h-[600px] rounded-full opacity-[0.05]"
                        style={{ border: "1px solid rgba(91,185,185,0.8)" }} />
                    <div className="spin-rev absolute w-[800px] h-[800px] rounded-full opacity-[0.03]"
                        style={{ border: "1px dashed rgba(91,185,185,0.6)" }} />
                </div>

                {/* Glow orbs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(91,185,185,0.14) 0%, transparent 70%)" }} />
                <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />

                {/* Floating particles */}
                {[[8, 25, 6, 5, 0], [90, 18, 4, 6.5, 1.2], [14, 72, 5, 5.5, 0.6], [92, 60, 7, 7, 1.8], [50, 85, 3, 8, 0.9]].map(([x, y, s, d, dl], i) =>
                    <Particle key={i} x={x} y={y} size={s} dur={d} delay={dl} />)}

                {/* Corner accents */}
                <div className="absolute top-6 left-6 w-9 h-9 border-l-2 border-t-2 border-white/20 rounded-tl-sm hidden sm:block" />
                <div className="absolute bottom-8 right-6 w-9 h-9 border-r-2 border-b-2 border-white/20 rounded-br-sm hidden sm:block" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center px-5 py-16 sm:py-24 max-w-2xl">

                    <motion.div
                        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <span className="w-5 h-px bg-[#7dcfcf]/60" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a8dcdc]">
                            Pure Bliss Clinic
                        </span>
                        <span className="w-5 h-px bg-[#7dcfcf]/60" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-white leading-tight mb-3"
                        style={{
                            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
                            fontSize: "clamp(2rem,6vw,3.8rem)"
                        }}
                    >
                        Advanced Eye{" "}
                        <span className="italic" style={{ color: "#b8e8e8" }}>Care</span>
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mb-5 h-px w-24 sm:w-36 origin-center"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(180,230,230,0.6), transparent)" }}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.7 }}
                        className="text-white/60 font-light leading-relaxed max-w-md"
                        style={{ fontSize: "clamp(0.875rem,2vw,1rem)" }}
                    >
                        Restore clarity, comfort, and confidence with our advanced eye treatments.
                    </motion.p>

                    <motion.a href="/appointment"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        className="mt-8 inline-flex items-center gap-2.5
                       bg-white/10 hover:bg-white/18 backdrop-blur-sm
                       border border-white/20 hover:border-white/40
                       text-white text-xs font-semibold uppercase tracking-wider
                       px-6 py-3 rounded-full transition-all duration-250"
                    >
                        <Sparkles size={13} className="opacity-80" />
                        Book a Consultation
                    </motion.a>
                </div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                >
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">Scroll</span>
                    <div className="w-px h-7 relative overflow-hidden"
                        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }}>
                        <motion.div className="absolute top-0 left-0 right-0 h-3 bg-white/50 rounded-full"
                            animate={{ y: ["-100%", "250%"] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
                    </div>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════
          SECTION INTRO
      ══════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }} viewport={{ once: true }}
                className="text-center pt-20 pb-10 px-5"
            >
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#5bb9b9] mb-3">
                    Our Treatments
                </p>
                <h2 className="text-[#1a3d3d] leading-tight mb-4"
                    style={{
                        fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
                        fontSize: "clamp(1.7rem,4vw,2.6rem)"
                    }}>
                    Eye Care Services
                </h2>
                <motion.div
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}
                    className="mx-auto h-px w-16 origin-center"
                    style={{ background: "linear-gradient(90deg, transparent, #5bb9b9, transparent)" }}
                />
                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }} viewport={{ once: true }}
                    className="text-[#4a7070] font-light max-w-lg mx-auto mt-4"
                    style={{ fontSize: "clamp(0.875rem,2vw,1rem)" }}
                >
                    Tap any card to explore treatment details and benefits.
                </motion.p>
            </motion.div>

            {/* ══════════════════════════════════════════
          CARDS GRID
      ══════════════════════════════════════════ */}
            <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pb-24">
                {/* Background decoration */}
                <div className="relative">
                    <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #2d6b6b 1px, transparent 0)",
                            backgroundSize: "28px 28px"
                        }} />
                    <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
                        style={{ background: "radial-gradient(circle at top right, rgba(91,185,185,0.06), transparent 65%)" }} />

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {EYE_SERVICES.map((s, i) => (
                            <ServiceCard key={s.id} service={s} index={i} onOpen={setActiveService} />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
                    className="text-center mt-14"
                >
                    <a href="/appointment"
                        className="inline-flex items-center gap-2.5 bg-[#2d6b6b] hover:bg-[#245858]
                       text-white text-xs font-semibold uppercase tracking-wider
                       px-8 py-3.5 rounded-full shadow-lg shadow-[#2d6b6b]/25
                       transition-colors duration-200">
                        <Sparkles size={13} className="opacity-80" />
                        Book an Eye Treatment
                        <ArrowRight size={13} />
                    </a>
                </motion.div>
            </div>

            {/* ══════════════════════════════════════════
          DETAIL MODAL
      ══════════════════════════════════════════ */}
            <AnimatePresence>
                {activeService && (
                    <DetailModal service={activeService} onClose={() => setActiveService(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default EyeCare;
