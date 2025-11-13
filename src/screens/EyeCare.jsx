import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Eye,
    X,
    Brain,
    ChevronRight,
    ChevronLeft,
    Sparkles,
} from "lucide-react";

import treatment1 from "../assets/DryEye.jpg";
import treatment2 from "../assets/eye_3.jpg";
import treatment3 from "../assets/EyeLashLift.jpg";
import treatment4 from "../assets/EyelRejuvenation.jpg";

/* -------------------- Services -------------------- */
const eyeServices = [
    {
        id: 1,
        title: "Dry Eye Therapy",
        desc: "Hydrate and soothe irritated eyes",
        img: treatment1,
        details: {
            summary:
                "Advanced therapy designed to relieve dryness, itching, and redness while improving tear quality.",
            benefits: [
                "Reduces irritation and dryness",
                "Improves tear film stability",
                "Soothes sensitive eyes",
            ],
        },
    },
    {
        id: 2,
        title: "Vision Correction",
        desc: "Clear vision without glasses",
        img: treatment2,
        details: {
            summary:
                "Laser-assisted correction for myopia, hyperopia, or astigmatism with minimal downtime.",
            benefits: [
                "Painless & precise laser correction",
                "Quick recovery time",
                "Freedom from glasses & lenses",
            ],
        },
    },
    {
        id: 3,
        title: "Eyelash Lift & Tint",
        desc: "Naturally curled, beautiful lashes",
        img: treatment3,
        details: {
            summary:
                "Enhance your natural lashes with a lift and tint for a bright, open-eye look that lasts for weeks.",
            benefits: [
                "No need for mascara",
                "Natural-looking lift",
                "Long-lasting curl & shine",
            ],
        },
    },
    {
        id: 4,
        title: "Eyelid Rejuvenation",
        desc: "Brighten tired eyes",
        img: treatment4,
        details: {
            summary:
                "Minimally invasive treatment that reduces puffiness, sagging, and dark circles for youthful, fresh eyes.",
            benefits: [
                "Reduces fine lines & wrinkles",
                "Tightens loose eyelid skin",
                "Restores youthful eye contour",
            ],
        },
    },
];

/* -------------------- Main Page -------------------- */
const EyeCare = () => {
    const [flippedId, setFlippedId] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const handleFlip = (id) => setFlippedId((prev) => (prev === id ? null : id));

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="bg-gradient-to-b from-[#f8fbfb] to-[#e8f4f4] min-h-screen pt-[100px] pb-10 relative overflow-x-hidden font-[Poppins]">
            {/* 🎬 Hero Section */}
            <section className="relative w-full max-w-6xl mx-auto h-[420px] rounded-2xl overflow-hidden shadow-xl mb-10">
                <motion.video
                    src="/videos/eye_intro.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* 💠 Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#5bb9b9]/70 via-[#4a9a9a]/60 to-[#327a7a]/70" />

                {/* 🩵 Text Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg shimmer-text"
                    >
                        Advanced Eye Care & Vision Solutions
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="max-w-2xl text-base md:text-lg text-[#eafcfc] leading-relaxed font-light"
                    >
                        Restore clarity, comfort, and confidence with our advanced eye
                        treatments — precise care for healthier, brighter eyes.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="w-24 h-[3px] bg-[#79d1d1] mt-5 rounded-full"
                    />
                </div>

                {/* 💫 Shimmer Animation */}
                <style>{`
          .shimmer-text {
            background: linear-gradient(90deg, #ffffff, #c6f3f3, #ffffff);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 4s ease-in-out infinite;
          }

          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
            </section>

            {/* 👁️ Service Cards */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
                {eyeServices.map((s) => {
                    const isFlipped = flippedId === s.id;
                    return (
                        <motion.div
                            key={s.id}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className={`relative w-full h-[420px] perspective ${isFlipped ? "heartbeat-glow" : ""
                                }`}
                            onClick={() => handleFlip(s.id)}
                        >
                            <motion.div
                                className="relative w-full h-full transition-transform duration-700"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                                }}
                            >
                                {/* FRONT */}
                                <div className="absolute inset-0 bg-white rounded-2xl border border-[#dff3f3] shadow-md hover:shadow-2xl overflow-hidden backface-hidden flex flex-col transition-all duration-500">
                                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
                                        <img
                                            src={s.img}
                                            alt={s.title}
                                            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d3d]/40 to-transparent" />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between text-center">
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#0b3d3d] mb-1">
                                                {s.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm">{s.desc}</p>
                                        </div>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-3 px-4 py-1.5 bg-[#619696] hover:bg-[#4a7e7e] text-white text-xs rounded-full flex items-center justify-center gap-1 shadow-md"
                                        >
                                            <Eye size={13} /> View Details
                                        </motion.button>
                                    </div>
                                </div>

                                {/* BACK */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8fefe] to-[#e9f6f6] rounded-2xl border border-[#cdeeee] shadow-lg p-5 rotateY-180 backface-hidden flex flex-col justify-between">
                                    <div className="flex flex-col items-center text-center">
                                        <h3 className="text-lg font-bold text-[#0b3d3d] mb-2 tracking-wide">
                                            {s.title}
                                        </h3>
                                        <div className="w-16 h-[2px] bg-[#79d1d1] mb-3 rounded-full"></div>

                                        <p className="text-gray-800 text-sm font-semibold mb-4 leading-relaxed italic">
                                            “{s.details.summary}”
                                        </p>

                                        <div className="w-full h-[1px] bg-[#cdeeee] my-3"></div>

                                        <h4 className="text-[#0b3d3d] font-bold text-sm mb-2 uppercase tracking-wide">
                                            Key Benefits
                                        </h4>

                                        <ul className="text-sm text-gray-700 space-y-2 w-full px-3 mt-1 text-left">
                                            {s.details.benefits.map((b, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 hover:text-[#0b3d3d] transition-colors font-medium"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-[#619696] mt-[2px]" />
                                                    <span className="text-[13px] leading-snug">{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFlip(s.id);
                                        }}
                                        className="mt-4 w-full px-3 py-2 border border-[#619696] text-[#619696] hover:bg-[#e6f8f8] text-xs rounded-full flex items-center justify-center gap-1 font-medium"
                                    >
                                        <X size={12} /> Back
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.section>

            {/* 💫 Glow Animation */}
            <style>{`
        .perspective { perspective: 1000px; }
        .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .rotateY-180 { transform: rotateY(180deg); }

        .heartbeat-glow {
          border-radius: 1rem;
          animation: heartbeatGlow 2s ease-in-out 2;
          box-shadow: 0 0 25px rgba(97, 200, 200, 0.8);
        }

        @keyframes heartbeatGlow {
          0% { box-shadow: 0 0 0px rgba(97, 200, 200, 0); }
          20% { box-shadow: 0 0 25px rgba(97, 200, 200, 1); }
          40% { box-shadow: 0 0 15px rgba(97, 200, 200, 0.6); }
          60% { box-shadow: 0 0 25px rgba(97, 200, 200, 0.9); }
          80% { box-shadow: 0 0 12px rgba(97, 200, 200, 0.5); }
          100% { box-shadow: 0 0 0px rgba(97, 200, 200, 0); }
        }
      `}</style>
        </div>
    );
};

export default EyeCare;
