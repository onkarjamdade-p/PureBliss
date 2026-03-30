import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { CiClock1 } from "react-icons/ci";
import { ChevronDown, X, Send, CheckCircle, AlertCircle } from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICE_GROUPS = [
    { group: "Skin Care", items: ["Chemical Peel", "Carbon Peel (Hollywood Peel)", "Laser Hair Reduction (LHR)", "MNRF Treatment", "HIFU Face Lift"] },
    { group: "Hair Care", items: ["PRP Therapy", "GFC Therapy", "Mesotherapy", "LLLT Laser Treatment", "Anti-Dandruff Treatment"] },
    { group: "Eye Care", items: ["Dry Eye Therapy", "Vision Correction", "Eyelash Lift & Tint", "Eyelid Rejuvenation"] },
    { group: "Semi-Permanent Makeup", items: ["Lip Blush", "Microblading", "BB Glow", "Ombre Brows"] },
];

const CONTACT_INFO = [
    { icon: FaPhoneAlt, label: "Phone", details: ["+91 9922442405", "+91 7249539802"] },
    { icon: MdEmail, label: "Email", details: ["purebliss2303@gmail.com"] },
    { icon: FaWhatsapp, label: "WhatsApp", details: ["+91 9922442405"] },
    { icon: FaLocationDot, label: "Address", details: ["Sr. No. 5, Sankalp Vastu, Alandi Rd, near Bansilal Mills, Charholi Budruk, Pune, Maharashtra 412105"] },
    { icon: CiClock1, label: "Hours", details: ["Monday to Sunday: 10:30 am – 8:00 pm"] },
];

const SOCIALS = [
    { icon: FaInstagram, label: "Instagram", link: "https://www.instagram.com/pureblissskinandeyeclinic", color: "#E1306C" },
    { icon: FaFacebook, label: "Facebook", link: "https://www.facebook.com/share/1BNz4egJ37/", color: "#1877F2" },
    { icon: FaWhatsapp, label: "WhatsApp", link: "https://wa.me/919922442405?text=Hello,%20I'm%20interested%20in%20your%20services!", color: "#25D366" },
];

/* ─────────────────────────────────────────────
   GOOGLE MAP
───────────────────────────────────────────── */
const GoogleMapComponent = () => (
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.0702354083996!2d73.88642597530608!3d18.660843982460147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2ec69f9c29%3A0x6910ba95de0afc6!2sPure%20Bliss%20Advance%20Aesthetic%27s%20and%20Eye%20Care%20Clinic!5e0!3m2!1sen!2sin!4v1742375755516!5m2!1sen!2sin"
        width="100%" height="100%"
        style={{ border: 0 }} allowFullScreen loading="lazy"
        referrerPolicy="no-referrer-when-downgrade" title="Pure Bliss Clinic Location"
    />
);

/* ─────────────────────────────────────────────
   FIELD WRAPPER WITH ANIMATION
───────────────────────────────────────────── */
const Field = ({ label, required, children, error, isTouched }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
    >
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a8080] mb-2">
            {label}{required && <span className="text-[#5bb9b9] ml-1">*</span>}
        </label>
        {children}
        <AnimatePresence>
            {error && isTouched && (
                <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-red-400 text-xs mt-1.5"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </motion.div>
);

const inputCls = (err) =>
    `w-full px-4 py-3 rounded-2xl border-2 bg-[#f8fdfd] text-sm text-[#1a3d3d]
   placeholder-[#b0cccc] outline-none transition-all duration-300
   ${err ? "border-red-300 animate-pulse" : "border-[#ddeaea] focus:border-[#5bb9b9] focus:shadow-lg focus:shadow-[#5bb9b9]/20"}`;

/* ─────────────────────────────────────────────
   TOAST WITH IMPROVED ANIMATION
───────────────────────────────────────────── */
const Toast = ({ show, text, type }) => (
    <AnimatePresence>
        {show && (
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
                   flex items-center gap-2.5 px-5 py-3 rounded-full shadow-2xl shadow-black/20
                   border text-sm font-medium backdrop-blur-sm"
                style={type === "error"
                    ? { background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626" }
                    : { background: "#f0fafa", border: "1px solid #5bb9b9", color: "#2d6b6b" }}
            >
                {type === "error" ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                {text}
            </motion.div>
        )}
    </AnimatePresence>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT WITH FULL VALIDATION & ANIMATIONS
───────────────────────────────────────────── */
const Contact = () => {
    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "", services: [], message: ""
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState({ show: false, text: "", type: "success" });
    const [dropOpen, setDropOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

    // Real-time validation
    useEffect(() => {
        const newErrors = {};

        if (touched.firstName && !form.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (touched.email) {
            if (!form.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                newErrors.email = "Please enter a valid email";
            }
        }

        if (touched.phone && form.phone && !/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Phone must be 10 digits";
        }

        if (touched.services && !form.services.length) {
            newErrors.services = "Select at least one service";
        }

        if (touched.message && !form.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
    }, [form, touched]);

    const toggleService = (item) => {
        setField("services", form.services.includes(item)
            ? form.services.filter(x => x !== item)
            : [...form.services, item]
        );
        setTouched(prev => ({ ...prev, services: true }));
    };

    const handleInputBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = form.email.trim() ? "Please enter a valid email" : "Email is required";
        }
        if (!form.services.length) newErrors.services = "Select at least one service";
        if (!form.message.trim()) newErrors.message = "Message is required";
        if (form.phone && !/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showToast = (text, type = "success") => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ firstName: true, email: true, services: true, message: true, phone: form.phone ? true : false });

        if (!validateForm()) {
            showToast("Please fix the errors above.", "error");
            return;
        }

        setIsSubmitting(true);
        showToast("Sending message to WhatsApp...", "success");

        const msg = `Hello, Pure Bliss Clinic 👋%0A%0A` +
            `👤 Name: ${form.firstName} ${form.lastName}%0A` +
            `📧 Email: ${form.email}%0A` +
            `📱 Phone: ${form.phone || 'Not provided'}%0A` +
            `💆‍♀️ Services: ${form.services.join(", ")}%0A` +
            `💬 Message: ${form.message}%0A%0AThank you!`;

        setTimeout(() => {
            window.open(`https://wa.me/919922442405?text=${msg}`, "_blank");
            setIsSubmitting(false);
            showToast("Message sent successfully! WhatsApp opened.", "success");
        }, 1500);
    };

    /* Animated Particle */
    const Particle = ({ x, y, size, dur, delay }) => (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: `${x}%`, top: `${y}%`, width: size, height: size,
                background: "radial-gradient(circle, rgba(91,185,185,0.6) 0%, transparent 70%)"
            }}
            animate={{
                y: [0, -25, 0],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360]
            }}
            transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
        />
    );

    return (
        <div style={{ fontFamily: "'DM Sans',sans-serif" }} className="bg-[#f4f9f9] text-[#1a3d3d] min-h-screen">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

            <Toast {...toast} />

            {/* ══════════════════════════════════════════
              HERO WITH ENHANCED ANIMATIONS
          ══════════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden flex flex-col items-center justify-center text-center
                          mt-16 sm:mt-20 mx-4 sm:mx-8 md:mx-12 rounded-3xl"
                style={{
                    minHeight: 340,
                    background: "linear-gradient(145deg, #0d2e2e 0%, #1a4f4f 45%, #2d7070 100%)"
                }}
            >
                {/* Animated Dot Grid */}
                <motion.div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-3xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                        backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
                        backgroundSize: "26px 26px"
                    }}
                />

                {/* Floating Glows */}
                <motion.div
                    className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ background: "radial-gradient(circle, rgba(91,185,185,0.15) 0%, transparent 70%)" }}
                />
                <motion.div
                    className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
                />

                {/* Animated Particles */}
                {[[8, 25, 8, 6, 0], [88, 18, 6, 7, 1.5], [15, 70, 7, 5.5, 0.8], [92, 55, 5, 6.5, 2.2]].map(([x, y, s, d, dl], i) =>
                    <Particle key={i} x={x} y={y} size={s} dur={d} delay={dl} />
                )}

                {/* Corner Accents */}
                <motion.div
                    className="absolute top-5 left-5 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-sm hidden sm:block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                />
                <motion.div
                    className="absolute bottom-5 right-5 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-sm hidden sm:block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                />

                <div className="relative z-10 px-6 py-14 sm:py-20 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <motion.span
                            className="w-5 h-px bg-[#7dcfcf]/60"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.6 }}
                        />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a8dcdc]">
                            Pure Bliss Skin &amp; Eye Clinic
                        </span>
                        <motion.span
                            className="w-5 h-px bg-[#7dcfcf]/60"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-white leading-tight mb-3"
                        style={{
                            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
                            fontSize: "clamp(1.8rem,5vw,3.2rem)"
                        }}
                    >
                        Get in Touch
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="h-px w-20 mb-4 origin-center"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(180,230,230,0.8), transparent)" }}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-white/70 font-light max-w-sm"
                        style={{ fontSize: "clamp(0.875rem,2vw,1rem)" }}
                    >
                        Connect with our experts — your journey to confident beauty begins here.
                    </motion.p>
                </div>
            </motion.section>

            {/* ══════════════════════════════════════════
              FORM + INFO WITH ANIMATIONS
          ══════════════════════════════════════════ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
                    {/* ── FORM ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="md:col-span-3"
                    >
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-3xl border border-[#e4eded]
                                shadow-2xl shadow-[#2d6b6b]/10 p-6 sm:p-8 md:p-10"
                        >
                            <motion.p
                                className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5bb9b9] mb-1"
                                initial={{ scale: 0.8 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                Message Us
                            </motion.p>
                            <motion.h2
                                className="text-[#1a3d3d] mb-7"
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif", fontWeight: 400,
                                    fontSize: "clamp(1.4rem,3vw,1.8rem)"
                                }}
                                initial={{ y: 20 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Send Us a Message
                            </motion.h2>

                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                {/* Name row */}
                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Field
                                        label="First Name"
                                        required
                                        error={errors.firstName}
                                        isTouched={touched.firstName}
                                    >
                                        <motion.input
                                            value={form.firstName}
                                            onChange={e => setField("firstName", e.target.value)}
                                            onBlur={() => handleInputBlur("firstName")}
                                            placeholder="First name"
                                            maxLength={60}
                                            className={inputCls(errors.firstName)}
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </Field>
                                    <Field label="Last Name" error={errors.lastName}>
                                        <motion.input
                                            value={form.lastName}
                                            onChange={e => setField("lastName", e.target.value)}
                                            placeholder="Last name"
                                            maxLength={60}
                                            className={inputCls(errors.lastName)}
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </Field>
                                </motion.div>

                                {/* Email + Phone */}
                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <Field
                                        label="Email"
                                        required
                                        error={errors.email}
                                        isTouched={touched.email}
                                    >
                                        <motion.input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setField("email", e.target.value)}
                                            onBlur={() => handleInputBlur("email")}
                                            placeholder="your@email.com"
                                            className={inputCls(errors.email)}
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </Field>
                                    <Field
                                        label="Phone"
                                        error={errors.phone}
                                        isTouched={touched.phone}
                                    >
                                        <motion.input
                                            type="tel"
                                            maxLength={10}
                                            value={form.phone}
                                            onChange={e => setField("phone", e.target.value.replace(/[^0-9]/g, ""))}
                                            onBlur={() => handleInputBlur("phone")}
                                            placeholder="10-digit number"
                                            className={inputCls(errors.phone)}
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </Field>
                                </motion.div>

                                {/* Services Dropdown */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <Field
                                        label="Select Services"
                                        required
                                        error={errors.services}
                                        isTouched={touched.services}
                                    >
                                        <div className="relative">
                                            <motion.div
                                                onClick={() => setDropOpen(v => !v)}
                                                className={`${inputCls(errors.services)} flex flex-wrap gap-1.5 min-h-[48px] cursor-pointer items-center p-3`}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                            >
                                                {form.services.length === 0 ? (
                                                    <span className="text-[#b0cccc] text-sm">Choose services you’re interested in…</span>
                                                ) : (
                                                    form.services.map(s => (
                                                        <motion.span
                                                            key={s}
                                                            className="flex items-center gap-1 bg-[#edf8f8]/80 text-[#2d6b6b]
                                            border border-[#c5e0e0]/50 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                                                            whileHover={{ scale: 1.05 }}
                                                        >
                                                            {s}
                                                            <motion.span
                                                                onClick={e => { e.stopPropagation(); toggleService(s); }}
                                                                className="text-[#9ab8b8] hover:text-red-400 ml-1 cursor-pointer"
                                                                whileHover={{ rotate: 90 }}
                                                                whileTap={{ scale: 0.8 }}
                                                            >
                                                                <X size={12} />
                                                            </motion.span>
                                                        </motion.span>
                                                    ))
                                                )}
                                                <motion.span
                                                    className="ml-auto shrink-0 text-[#9ab8b8]"
                                                    animate={{ rotate: dropOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDown size={18} />
                                                </motion.span>
                                            </motion.div>

                                            <AnimatePresence>
                                                {dropOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="absolute w-full mt-3 bg-white/95 backdrop-blur-sm rounded-3xl border border-[#e4eded]/50
                                        shadow-2xl shadow-[#2d6b6b]/15 max-h-72 overflow-y-auto z-40"
                                                    >
                                                        {SERVICE_GROUPS.map((cat, i) => (
                                                            <div key={i} className="border-b border-[#eef4f4]/50 last:border-none">
                                                                <p className="sticky top-0 bg-white/80 px-5 py-3
                                                text-[11px] font-bold uppercase tracking-widest text-[#5bb9b9] bg-opacity-90 backdrop-blur-sm">
                                                                    {cat.group}
                                                                </p>
                                                                {cat.items.map((item, j) => {
                                                                    const checked = form.services.includes(item);
                                                                    return (
                                                                        <motion.label
                                                                            key={j}
                                                                            className={`flex items-center gap-4 px-6 py-4 cursor-pointer text-sm
                                                                                   transition-all duration-200 hover:bg-[#f8fdfd]
                                                                                   ${checked ? "bg-gradient-to-r from-[#5bb9b9]/10 to-[#2d6b6b]/10 text-[#2d6b6b] font-medium" : "text-[#4a7070]"}`}
                                                                            whileHover={{ x: 4 }}
                                                                        >
                                                                            <motion.div
                                                                                className={`w-5 h-5 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm
                                                                                             ${checked ? "bg-[#5bb9b9] border-[#5bb9b9] shadow-[#5bb9b9]/25" : "border-[#c5dede] hover:border-[#5bb9b9]/50"}`}
                                                                                animate={checked ? { scale: [1, 1.1, 1] } : {}}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                                {checked && (
                                                                                    <CheckCircle size={14} className="text-white" strokeWidth={3} />
                                                                                )}
                                                                            </motion.div>
                                                                            <input
                                                                                type="checkbox"
                                                                                className="sr-only"
                                                                                checked={checked}
                                                                                onChange={() => toggleService(item)}
                                                                            />
                                                                            {item}
                                                                        </motion.label>
                                                                    );
                                                                })}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </Field>
                                </motion.div>

                                {/* Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <Field
                                        label="Message"
                                        required
                                        error={errors.message}
                                        isTouched={touched.message}
                                    >
                                        <motion.textarea
                                            rows={4}
                                            value={form.message}
                                            onChange={e => setField("message", e.target.value)}
                                            onBlur={() => handleInputBlur("message")}
                                            placeholder="Tell us more about what you're looking for…"
                                            className={`${inputCls(errors.message)} resize-none`}
                                            whileFocus={{ scale: 1.01 }}
                                        />
                                    </Field>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                    className={`w-full flex items-center justify-center gap-3
                                     text-white text-sm font-semibold uppercase tracking-wider py-4 rounded-3xl
                                     shadow-xl shadow-[#2d6b6b]/30 transition-all duration-300 ${isSubmitting
                                            ? 'bg-[#9ab8b8]/70 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-[#2d6b6b] to-[#5bb9b9] hover:from-[#245858] hover:to-[#4aa0a0]'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaWhatsapp size={18} />
                                            <span>Send via WhatsApp</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>

                    {/* ── CONTACT INFO ── */}
                    {/* ── CONTACT INFO ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 flex flex-col gap-6"
                    >
                        {/* Contact Info Card */}
                        <motion.div
                            className="bg-white rounded-3xl border border-[#e4eded]
        shadow-2xl shadow-[#2d6b6b]/10 p-6 sm:p-8 flex-1"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#5bb9b9] mb-1">
                                Reach Us
                            </p>

                            <h2 className="text-[#1a3d3d] mb-8 text-lg">
                                Contact Information
                            </h2>

                            <div className="space-y-4">
                                {CONTACT_INFO.map(({ icon: Icon, label, details }, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#eef7f7]">
                                            <Icon size={18} className="text-[#5bb9b9]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#9ab8b8]">{label}</p>
                                            {details.map((d, j) => (
                                                <p key={j} className="text-sm">{d}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social Card */}
                        <motion.div
                            className="relative rounded-3xl overflow-hidden p-8"
                            style={{
                                background: "linear-gradient(145deg, #0d2e2e, #2d7070)"
                            }}
                        >
                            <p className="text-[10px] uppercase text-[#9dd8d8] mb-2">
                                Follow Us
                            </p>

                            <p className="text-white/80 text-sm mb-6">
                                Stay updated with our latest treatments.
                            </p>

                            <div className="flex gap-5">
                                {SOCIALS.map(({ icon: Icon, link, color }, i) => (
                                    <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 flex items-center justify-center rounded-2xl
                    bg-white/10 border border-white/20 text-white transition"
                                        style={{ hover: { color: color } }}
                                    >
                                        <Icon size={22} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* CLOSE GRID + CONTAINER */}
                </div>
            </div>

            {/* MAP HEADING */}
            <div className="text-center mt-10 mb-6">
                <p className="text-[10px] uppercase text-[#5bb9b9]">
                    Visit Us
                </p>
                <h2 className="text-[#1a3d3d] text-xl">
                    Our Location on Map
                </h2>
            </div>

            {/* MAP */}
            <motion.div
                className="mx-4 sm:mx-8 md:mx-12 mb-20 rounded-3xl overflow-hidden
    border border-[#e4eded] shadow-xl"
                style={{ height: "400px" }}
            >
                <GoogleMapComponent />
            </motion.div>

        </div>
    );
};

export default Contact;
