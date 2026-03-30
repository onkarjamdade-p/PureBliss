import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import loadingLogo from "../assets/logo_1.png";
import {
    Loader2, User, Phone, CheckCircle, ChevronDown,
    Sparkles, Clock, CalendarDays, ChevronLeft, ChevronRight,
    Sun, Sunrise, Sunset,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const formatDisplayDate = (d) =>
    d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", weekday: "short" }) : "—";

const today = new Date();
today.setHours(0, 0, 0, 0);

const isSameDay = (a, b) =>
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isBefore = (d) => {
    const c = new Date(d); c.setHours(0, 0, 0, 0);
    return c < today;
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES_DATA = {
    "Skin Care": [
        { id: "chemical_peel", label: "Chemical Peel" },
        { id: "carbon_peel", label: "Carbon Peel (Hollywood Peel)" },
        { id: "lhr", label: "Laser Hair Reduction" },
        { id: "mnrf", label: "MNRF Treatment" },
        { id: "hifu", label: "HIFU Face Lift" },
    ],
    "Hair Care": [
        { id: "prp", label: "PRP Therapy" },
        { id: "gfc", label: "GFC Therapy" },
        { id: "mesotherapy", label: "Mesotherapy" },
        { id: "lllt", label: "LLLT Laser" },
        { id: "dandruff", label: "Anti-Dandruff Treatment" },
    ],
    "Semi-Permanent Makeup": [
        { id: "lip_blush", label: "Lip Blush" },
        { id: "bb_glow", label: "BB Glow" },
        { id: "smp", label: "Scalp Micropigmentation" },
        { id: "microblading", label: "Microblading" },
        { id: "beauty_spot", label: "Beauty Spot" },
    ],
    "Eye Care": [
        { id: "dry_eye", label: "Dry Eye Therapy" },
        { id: "vision_correction", label: "Vision Correction" },
        { id: "lash_lift", label: "Lash Lift & Tint" },
        { id: "eyelid_rejuv", label: "Eyelid Rejuvenation" },
    ],
};

const CATEGORY_ICON = {
    "Skin Care": "✦",
    "Hair Care": "◈",
    "Semi-Permanent Makeup": "◇",
    "Eye Care": "◉",
};

/* ─────────────────────────────────────────────
   TIME SLOT GENERATION
───────────────────────────────────────────── */
const makeSlot = (h, m) => ({
    id: `${h}:${String(m).padStart(2, "0")}`,
    label: new Date(0, 0, 0, h, m).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    hour: h,
});

// Short slots: 10am–8:30pm (30-min), Long slots: 10am–4pm (limited)
const ALL_SHORT = [];
const ALL_LONG = [];
for (let m = 10 * 60; m <= 20 * 60 + 30; m += 30) {
    ALL_SHORT.push(makeSlot(Math.floor(m / 60), m % 60));
}
for (let m = 10 * 60; m <= 16 * 60; m += 30) {
    ALL_LONG.push(makeSlot(Math.floor(m / 60), m % 60));
}

const SESSION_GROUPS = [
    { key: "morning", label: "Morning", icon: Sunrise, range: [11, 12] }, // 11:00 – 12:00
    { key: "afternoon", label: "Afternoon", icon: Sun, range: [13, 14] }, // 1:00 – 2:00
    { key: "evening", label: "Evening", icon: Sunset, range: [17, 21] }, // 5:00 – 9:00
];

const groupSlots = (slots) =>
    SESSION_GROUPS.map((g) => ({
        ...g,
        slots: slots.filter((s) => s.hour >= g.range[0] && s.hour < g.range[1]),
    })).filter((g) => g.slots.length > 0);

/* ─────────────────────────────────────────────
   SMART CALENDAR
───────────────────────────────────────────── */
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const SmartCalendar = ({ selected, onSelect }) => {
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    const navigate = (delta) => {
        setDirection(delta);
        let m = viewMonth + delta;
        let y = viewYear;
        if (m > 11) { m = 0; y++; }
        if (m < 0) { m = 11; y--; }
        setViewMonth(m);
        setViewYear(y);
    };

    // Build calendar grid
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

    // Can we go back? Don't allow navigating before current month
    const canGoBack = viewYear > today.getFullYear() || viewMonth > today.getMonth();
    // Max 3 months ahead
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 1);
    const canGoForward = new Date(viewYear, viewMonth + 1, 1) < maxDate;

    return (
        <div className="bg-white rounded-2xl border border-[#e8f2f2] overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#eef4f4]">
                <button
                    onClick={() => canGoBack && navigate(-1)}
                    disabled={!canGoBack}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                        ${canGoBack ? "hover:bg-[#f0fafa] text-[#2d6b6b]" : "text-[#d0e8e8] cursor-not-allowed"}`}
                >
                    <ChevronLeft size={16} />
                </button>

                <AnimatePresence mode="wait">
                    <motion.span
                        key={`${viewYear}-${viewMonth}`}
                        initial={{ opacity: 0, x: direction * 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -16 }}
                        transition={{ duration: 0.18 }}
                        className="text-sm font-bold text-[#1a3d3d]"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                        {MONTHS[viewMonth]} {viewYear}
                    </motion.span>
                </AnimatePresence>

                <button
                    onClick={() => canGoForward && navigate(1)}
                    disabled={!canGoForward}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                        ${canGoForward ? "hover:bg-[#f0fafa] text-[#2d6b6b]" : "text-[#d0e8e8] cursor-not-allowed"}`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Week header */}
            <div className="grid grid-cols-7 px-3 pt-3">
                {WEEK_DAYS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-[#9ab8b8] pb-2">
                        {d}
                    </div>
                ))}
            </div>

            {/* Days grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${viewYear}-${viewMonth}-grid`}
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-7 gap-0.5 px-3 pb-3"
                >
                    {cells.map((d, i) => {
                        if (!d) return <div key={`empty-${i}`} />;
                        const past = isBefore(d);
                        const isTodayD = isSameDay(d, today);
                        const isSel = isSameDay(d, selected);
                        const isSun = d.getDay() === 0;

                        return (
                            <motion.button
                                key={d.toISOString()}
                                whileHover={!past ? { scale: 1.08 } : {}}
                                whileTap={!past ? { scale: 0.94 } : {}}
                                onClick={() => !past && onSelect(new Date(d))}
                                disabled={past}
                                className={`
                                    relative h-9 w-full rounded-xl text-sm font-semibold transition-all duration-150
                                    flex flex-col items-center justify-center
                                    ${isSel
                                        ? "bg-[#2d6b6b] text-white shadow-md shadow-[#2d6b6b]/25 z-10"
                                        : isTodayD
                                            ? "border-2 border-[#5bb9b9] text-[#2d6b6b] bg-[#f0fafa]"
                                            : past
                                                ? "text-[#d5e5e5] cursor-not-allowed"
                                                : isSun
                                                    ? "text-[#e07070] hover:bg-[#fff4f4]"
                                                    : "text-[#2a5555] hover:bg-[#f0fafa]"}
                                `}
                            >
                                {d.getDate()}
                                {isTodayD && !isSel && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#5bb9b9]" />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="flex items-center gap-4 px-5 pb-3 pt-1 border-t border-[#eef4f4]">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#2d6b6b] inline-block" />
                    <span className="text-[10px] text-[#8ab8b8]">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border-2 border-[#5bb9b9] inline-block" />
                    <span className="text-[10px] text-[#8ab8b8]">Today</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#eee] inline-block" />
                    <span className="text-[10px] text-[#8ab8b8]">Unavailable</span>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   SMART TIME SLOTS
───────────────────────────────────────────── */
const SmartTimeSlots = ({ slot, setSlot, isLimited }) => {
    const allSlots = isLimited ? ALL_LONG : ALL_SHORT;
    const groups = groupSlots(allSlots);
    const [activeG, setActiveG] = useState(groups[0]?.key || "morning");

    // When groups change (limited vs full), reset to first group
    const currentGroup = groups.find((g) => g.key === activeG) || groups[0];

    return (
        <div className="bg-white rounded-2xl border border-[#e8f2f2] overflow-hidden">
            {/* Session tabs */}
            <div className="flex border-b border-[#eef4f4]">
                {groups.map((g) => {
                    const Icon = g.icon;
                    const active = g.key === (currentGroup?.key);
                    return (
                        <button
                            key={g.key}
                            onClick={() => setActiveG(g.key)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider transition-all
                                ${active
                                    ? "bg-[#f0fafa] text-[#2d6b6b] border-b-2 border-[#5bb9b9]"
                                    : "text-[#9ab8b8] hover:bg-[#fafefe]"}`}
                        >
                            <Icon size={13} />
                            <span className="hidden sm:inline">{g.label}</span>
                            <span className="inline sm:hidden">{g.label.slice(0, 3)}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                                ${active ? "bg-[#2d6b6b] text-white" : "bg-[#eef4f4] text-[#9ab8b8]"}`}>
                                {g.slots.length}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Slots grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentGroup?.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="p-4 grid grid-cols-3 sm:grid-cols-4 gap-2"
                >
                    {currentGroup?.slots.map((t) => (
                        <motion.button
                            key={t.id}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setSlot(t.id)}
                            className={`py-2.5 px-2 rounded-xl text-sm font-semibold border-2 transition-all
                                ${slot === t.id
                                    ? "bg-[#2d6b6b] border-[#2d6b6b] text-white shadow-md shadow-[#2d6b6b]/20"
                                    : "bg-white border-[#e8f2f2] text-[#3a6060] hover:border-[#aad8d8] hover:bg-[#f4fafa]"}`}
                        >
                            {t.label}
                        </motion.button>
                    ))}
                </motion.div>
            </AnimatePresence>

            {isLimited && (
                <div className="px-4 pb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <p className="text-[10px] text-amber-600 font-medium">
                        Slots limited to 4 PM for multiple services
                    </p>
                </div>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────────── */
const StepIndicator = ({ step, currentStep, label, icon }) => {
    const done = currentStep > step, active = currentStep === step;
    return (
        <div className="flex flex-col items-center gap-1.5">
            <motion.div animate={{ scale: active ? 1.1 : 1 }} transition={{ type: "spring", stiffness: 300 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                    ${done ? "bg-[#2d6b6b] border-[#2d6b6b] text-white"
                        : active ? "bg-white border-[#2d6b6b] text-[#2d6b6b] shadow-md shadow-[#2d6b6b]/15"
                            : "bg-white border-[#dde8e8] text-[#aabdbd]"}`}>
                {done ? <CheckCircle size={16} /> : icon}
            </motion.div>
            <span className={`hidden sm:block text-[10px] font-bold tracking-widest uppercase
                ${active ? "text-[#2d6b6b]" : "text-[#9ab5b5]"}`}>{label}</span>
        </div>
    );
};

/* ─────────────────────────────────────────────
   PAGE LOADER
───────────────────────────────────────────── */
const PageLoader = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "rgba(244,249,249,0.96)", backdropFilter: "blur(8px)" }}>
        <div className="flex flex-col items-center gap-8">
            <div className="relative flex items-center justify-center">
                {[0, 0.5, 1].map((delay, i) => (
                    <motion.div key={i} className="absolute rounded-full border border-[#5ba5a5]/40"
                        style={{ width: 70 + i * 32, height: 70 + i * 32 }}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay }} />
                ))}
                <motion.img src={loadingLogo} alt="Pure Bliss" className="w-14 h-14 object-contain rounded-full"
                    animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </div>
            <div className="text-center space-y-1">
                <motion.p className="text-[#2d5555] font-semibold text-sm tracking-widest uppercase"
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    Confirming appointment
                </motion.p>
                <p className="text-[#8aabab] text-xs">Please wait a moment…</p>
            </div>
        </div>
    </motion.div>
);

/* ─────────────────────────────────────────────
   SUCCESS SCREEN
───────────────────────────────────────────── */
const SuccessScreen = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "rgba(244,249,249,0.96)", backdropFilter: "blur(8px)" }}>
        <div className="flex flex-col items-center gap-5 text-center px-8">
            <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5bb9b9] to-[#2d6b6b]
                           flex items-center justify-center shadow-xl shadow-[#2d6b6b]/25">
                <CheckCircle size={36} className="text-white" strokeWidth={2.5} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-[#1a3d3d]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    Appointment Confirmed
                </h2>
                <p className="text-[#6a9090] text-sm mt-1.5">Redirecting you to WhatsApp…</p>
            </motion.div>
        </div>
    </motion.div>
);

/* ─────────────────────────────────────────────
   MOBILE SUMMARY DRAWER
───────────────────────────────────────────── */
const MobileSummary = ({ name, phone, date, slotLabel, selectedServices, idToService, step }) => {
    const [open, setOpen] = useState(false);
    const show = step >= 2 || name || phone || date || slotLabel || selectedServices.length;
    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-30">
            <div className="bg-white/90 backdrop-blur-md border-t border-[#ddeaea] shadow-2xl">
                <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-[#5bb9b9]" />
                        <span className="text-sm font-semibold text-[#2d5555]">Booking Summary</span>
                        {selectedServices.length > 0 && (
                            <span className="bg-[#e8f5f5] text-[#2d6b6b] text-xs font-bold px-2 py-0.5 rounded-full">
                                {selectedServices.length}
                            </span>
                        )}
                    </div>
                    <motion.div animate={{ rotate: open ? 180 : 0 }}>
                        <ChevronDown size={18} className="text-[#5bb9b9]" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }} className="px-5 pb-5">
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {[
                                    { label: "Name", value: name || "—" },
                                    { label: "Phone", value: phone || "—" },
                                    { label: "Date", value: date ? formatDisplayDate(date) : "—" },
                                    { label: "Time", value: slotLabel || "—" },
                                ].map((r) => (
                                    <div key={r.label} className="bg-[#f4fafa] rounded-xl p-3">
                                        <p className="text-[10px] text-[#8aabab] uppercase tracking-widest font-semibold">{r.label}</p>
                                        <p className="text-sm text-[#1a3d3d] font-semibold mt-0.5 truncate">{r.value}</p>
                                    </div>
                                ))}
                            </div>
                            {selectedServices.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedServices.map((id) => (
                                        <span key={id} className="bg-[#e6f5f5] text-[#2d6b6b] text-xs font-medium px-2.5 py-1 rounded-full border border-[#c5e0e0]">
                                            {idToService[id].label}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────────── */
const Field = ({ icon: Icon, error, children }) => (
    <div>
        <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 bg-white transition-all duration-200 group
            ${error ? "border-red-300 bg-red-50/30" : "border-[#ddeaea] focus-within:border-[#5bb9b9] focus-within:shadow-sm focus-within:shadow-[#5bb9b9]/10"}`}>
            <Icon size={16} className="text-[#8ab8b8] shrink-0 group-focus-within:text-[#2d6b6b] transition-colors" />
            {children}
        </div>
        {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Appointment = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedServices, setSelectedServices] = useState([]);
    const [date, setDate] = useState(null);
    const [slot, setSlot] = useState(""); // stores slot id like "10:00"
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const isLimited = selectedServices.length >= 3;

    // Get human-readable label for selected slot
    const allSlots = isLimited ? ALL_LONG : ALL_SHORT;
    const slotObj = allSlots.find((s) => s.id === slot);
    const slotLabel = slotObj?.label || "—";

    // If switching to limited and slot no longer valid, clear it
    const validSlot = slot && allSlots.some((s) => s.id === slot) ? slot : "";

    const idToService = useMemo(() => {
        const map = {};
        Object.values(SERVICES_DATA).flat().forEach((s) => (map[s.id] = s));
        return map;
    }, []);

    const validateStep = (s) => {
        const e = {};
        if (s === 1) {
            if (!name.trim()) e.name = "Full name is required.";
            else if (!/^[A-Za-z\s]+$/.test(name)) e.name = "Only letters are allowed.";
            if (!phone.trim()) e.phone = "Phone number is required.";
            else if (!/^[0-9]{10}$/.test(phone.trim())) e.phone = "Enter a valid 10-digit number.";
        }
        if (s === 2 && !selectedServices.length) e.services = "Please select at least one service.";
        if (s === 3) {
            if (!date) e.date = "Please select a date.";
            if (!validSlot) e.slot = "Please select a time slot.";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validateStep(3)) return;
        setLoading(true);
        setTimeout(() => {
            const servicesList = selectedServices.map((id) => `• ${idToService[id].label}`).join("\n");
            const msg = `📅 *New Appointment Request*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n\n💆‍♀️ *Services:*\n${servicesList}\n\n🗓️ *Date:* ${formatDisplayDate(date)}\n⏰ *Time:* ${slotLabel} (IST)\n\n——\nPure Bliss Skin & Eye Clinic`;
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                const whatsappUrl = `https://wa.me/919922442405?text=${encodeURIComponent(msg)}`;

                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    window.location.href = whatsappUrl;
                } else {
                    window.open(whatsappUrl, "_blank");
                }

                setSuccess(false);
            }, 1500);
        }, 900);
    };

    const canSubmit = !loading && date && validSlot && selectedServices.length && name.trim() && phone.trim();

    return (
        <div className="min-h-screen bg-[#f4f9f9] text-[#1a3d3d]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
                ::-webkit-scrollbar { display: none; }
            `}</style>

            <AnimatePresence>{loading && <PageLoader />}</AnimatePresence>
            <AnimatePresence>{success && <SuccessScreen />}</AnimatePresence>

            {/* ── HEADER ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1a3d3d]/10" style={{ minHeight: 190 }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a4f4f] via-[#256060] to-[#357575]" />
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "26px 26px" }} />
                    <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                    <div className="absolute -left-8 bottom-0 w-60 h-40 rounded-full bg-[#5bb9b9]/8 blur-2xl pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between px-8 sm:px-12 py-10 gap-6">
                        <div>
                            <p className="text-[#9dd4d4] text-[10px] font-bold tracking-[0.25em] uppercase mb-2">
                                Pure Bliss Skin &amp; Eye Clinic
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                                style={{ fontFamily: "'DM Serif Display', serif" }}>
                                Book an Appointment
                            </h1>
                            <p className="mt-2 text-[#b8dede] text-sm font-light">
                                3 simple steps · Takes under 2 minutes
                            </p>
                        </div>
                        <div className="hidden sm:flex flex-col items-center justify-center w-24 h-24 rounded-full shrink-0
                                        border border-white/15 bg-white/8 backdrop-blur-sm">
                            <Sparkles size={20} className="text-[#9dd4d4] mb-1" />
                            <span className="text-white text-[10px] font-semibold text-center leading-snug tracking-wide uppercase">
                                Premium<br />Care
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-36 md:pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* ── FORM PANEL ── */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl shadow-[#1a3d3d]/6 border border-[#e8f2f2] p-6 sm:p-8">

                            {/* Step progress */}
                            <div className="flex items-center mb-8 pb-6 border-b border-[#eef4f4]">
                                <StepIndicator step={1} currentStep={step} label="Details" icon={<User size={14} />} />
                                <div className="flex-1 mx-2 h-px relative overflow-hidden rounded-full bg-[#e8f2f2]">
                                    <motion.div className="absolute inset-y-0 left-0 bg-[#5bb9b9] rounded-full"
                                        animate={{ width: step > 1 ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                                </div>
                                <StepIndicator step={2} currentStep={step} label="Services" icon={<Sparkles size={14} />} />
                                <div className="flex-1 mx-2 h-px relative overflow-hidden rounded-full bg-[#e8f2f2]">
                                    <motion.div className="absolute inset-y-0 left-0 bg-[#5bb9b9] rounded-full"
                                        animate={{ width: step > 2 ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                                </div>
                                <StepIndicator step={3} currentStep={step} label="Schedule" icon={<CalendarDays size={14} />} />
                            </div>

                            <AnimatePresence mode="wait">

                                {/* ── STEP 1 ── */}
                                {step === 1 && (
                                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8ab8b8] mb-1">Step 1 of 3</p>
                                        <h2 className="text-xl font-bold text-[#1a3d3d] mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
                                            Your Information
                                        </h2>
                                        <div className="space-y-4">
                                            <Field icon={User} error={errors.name}>
                                                <input value={name} maxLength={50}
                                                    onChange={(e) => setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
                                                    placeholder="Full Name"
                                                    className="flex-1 outline-none text-sm bg-transparent text-[#1a3d3d] placeholder-[#b0cccc]" />
                                            </Field>
                                            <Field icon={Phone} error={errors.phone}>
                                                <input type="tel" maxLength={10} value={phone}
                                                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                                                    placeholder="10-digit Mobile Number"
                                                    className="flex-1 outline-none text-sm bg-transparent text-[#1a3d3d] placeholder-[#b0cccc]" />
                                            </Field>
                                        </div>
                                        <button onClick={() => validateStep(1) && setStep(2)}
                                            className="mt-8 w-full sm:w-auto bg-[#2d6b6b] hover:bg-[#245858] text-white
                                                       px-10 py-3.5 rounded-2xl font-semibold text-sm tracking-wide
                                                       shadow-lg shadow-[#2d6b6b]/20 transition-all duration-200
                                                       hover:shadow-xl hover:shadow-[#2d6b6b]/30 hover:-translate-y-0.5">
                                            Continue →
                                        </button>
                                    </motion.div>
                                )}

                                {/* ── STEP 2 ── */}
                                {step === 2 && (
                                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8ab8b8] mb-1">Step 2 of 3</p>
                                        <h2 className="text-xl font-bold text-[#1a3d3d] mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
                                            Select Services
                                        </h2>
                                        <p className="text-[#8aabab] text-xs mb-6">
                                            Choose one or more treatments. Selecting 3+ services limits available time slots.
                                        </p>
                                        <div className="space-y-5">
                                            {Object.entries(SERVICES_DATA).map(([group, items]) => (
                                                <div key={group}>
                                                    <div className="flex items-center gap-2 mb-2.5">
                                                        <span className="text-[#5bb9b9] text-xs">{CATEGORY_ICON[group]}</span>
                                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5a8888]">{group}</h3>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {items.map((s) => {
                                                            const checked = selectedServices.includes(s.id);
                                                            return (
                                                                <motion.label key={s.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                                                    className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer border-2 transition-all duration-150 text-sm
                                                                        ${checked ? "border-[#5bb9b9] bg-[#edf8f8] text-[#1a4848]" : "border-[#eef4f4] bg-[#fafefe] text-[#4a7070] hover:border-[#aad8d8]"}`}>
                                                                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                                                                        ${checked ? "bg-[#5bb9b9] border-[#5bb9b9]" : "border-[#c5dede]"}`}>
                                                                        {checked && <CheckCircle size={10} className="text-white" strokeWidth={3} />}
                                                                    </div>
                                                                    <input type="checkbox" className="sr-only" checked={checked}
                                                                        onChange={() =>
                                                                            setSelectedServices((prev) =>
                                                                                checked ? prev.filter((x) => x !== s.id) : [...prev, s.id]
                                                                            )
                                                                        } />
                                                                    <span className="font-medium leading-tight">{s.label}</span>
                                                                </motion.label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.services && <p className="text-red-400 text-xs mt-4 ml-1">{errors.services}</p>}
                                        <div className="flex gap-3 mt-8">
                                            <button onClick={() => setStep(1)}
                                                className="px-6 py-3.5 rounded-2xl border-2 border-[#ddeaea] text-[#4a7070] text-sm font-semibold hover:bg-[#f4fafa] transition-colors">
                                                ← Back
                                            </button>
                                            <button onClick={() => validateStep(2) && setStep(3)}
                                                className="flex-1 sm:flex-none bg-[#2d6b6b] hover:bg-[#245858] text-white px-10 py-3.5 rounded-2xl font-semibold text-sm tracking-wide shadow-lg shadow-[#2d6b6b]/20 transition-all duration-200 hover:-translate-y-0.5">
                                                Continue →
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── STEP 3 ── */}
                                {step === 3 && (
                                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8ab8b8] mb-1">Step 3 of 3</p>
                                        <h2 className="text-xl font-bold text-[#1a3d3d] mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
                                            Choose Date &amp; Time
                                        </h2>

                                        {/* CALENDAR */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <CalendarDays size={14} className="text-[#5bb9b9]" />
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5a8888]">Select Date</h4>
                                            {date && (
                                                <span className="ml-auto text-xs font-semibold text-[#2d6b6b] bg-[#edf8f8] px-2.5 py-0.5 rounded-full border border-[#c5e5e5]">
                                                    {formatDisplayDate(date)}
                                                </span>
                                            )}
                                        </div>
                                        <SmartCalendar selected={date} onSelect={(d) => { setDate(d); }} />
                                        {errors.date && <p className="text-red-400 text-xs mt-2 ml-1">{errors.date}</p>}

                                        {/* TIME SLOTS */}
                                        <div className="flex items-center gap-2 mt-6 mb-3">
                                            <Clock size={14} className="text-[#5bb9b9]" />
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5a8888]">Select Time</h4>
                                            {validSlot && slotObj && (
                                                <span className="ml-auto text-xs font-semibold text-[#2d6b6b] bg-[#edf8f8] px-2.5 py-0.5 rounded-full border border-[#c5e5e5]">
                                                    {slotObj.label}
                                                </span>
                                            )}
                                        </div>
                                        <SmartTimeSlots slot={validSlot} setSlot={setSlot} isLimited={isLimited} />
                                        {errors.slot && <p className="text-red-400 text-xs mt-2 ml-1">{errors.slot}</p>}

                                        {/* BUTTONS */}
                                        <div className="flex gap-3 mt-8">
                                            <button onClick={() => setStep(2)}
                                                className="px-6 py-3.5 rounded-2xl border-2 border-[#ddeaea] text-[#4a7070] text-sm font-semibold hover:bg-[#f4fafa] transition-colors">
                                                ← Back
                                            </button>
                                            <motion.button onClick={handleSubmit} disabled={!canSubmit}
                                                whileHover={canSubmit ? { y: -2 } : {}} whileTap={canSubmit ? { scale: 0.97 } : {}}
                                                className={`flex-1 sm:flex-none px-8 py-3.5 rounded-2xl font-semibold text-sm
                                                    flex items-center justify-center gap-2.5 transition-all duration-200
                                                    ${canSubmit
                                                        ? "bg-[#2d6b6b] text-white shadow-lg shadow-[#2d6b6b]/25 hover:bg-[#245858] hover:shadow-xl hover:shadow-[#2d6b6b]/30"
                                                        : "bg-[#ddeaea] text-[#8ab0b0] cursor-not-allowed"}`}>
                                                {loading ? (
                                                    <><Loader2 size={16} className="animate-spin" /><span>Sending…</span></>
                                                ) : (
                                                    <>
                                                        <span className="hidden sm:inline">Confirm &amp; Send via WhatsApp</span>
                                                        <span className="sm:hidden">Confirm Booking</span>
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ── SIDEBAR ── */}
                    <aside className="hidden md:flex flex-col gap-4">
                        <div className="bg-white rounded-3xl border border-[#e8f2f2] shadow-xl shadow-[#1a3d3d]/5 p-6">
                            <h3 className="text-base font-bold text-[#1a3d3d] mb-4 pb-3 border-b border-[#eef4f4]"
                                style={{ fontFamily: "'DM Serif Display', serif" }}>
                                Booking Summary
                            </h3>
                            <div className="space-y-1.5 mb-5">
                                {[
                                    { label: "Name", value: name || "—", icon: User },
                                    { label: "Phone", value: phone || "—", icon: Phone },
                                    { label: "Date", value: date ? formatDisplayDate(date) : "—", icon: CalendarDays },
                                    { label: "Time", value: (validSlot && slotObj?.label) || "—", icon: Clock },
                                ].map(({ label, value, icon: Icon }) => (
                                    <div key={label} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#f4fafa] transition-colors">
                                        <div className="w-7 h-7 rounded-lg bg-[#edf8f8] flex items-center justify-center shrink-0">
                                            <Icon size={13} className="text-[#5bb9b9]" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] text-[#9ab8b8] uppercase tracking-wider font-semibold">{label}</p>
                                            <p className="text-sm text-[#1a3d3d] font-semibold truncate">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-[#eef4f4] pt-4">
                                <p className="text-[10px] text-[#9ab8b8] uppercase tracking-wider font-semibold mb-3">
                                    Services ({selectedServices.length})
                                </p>
                                {selectedServices.length === 0 ? (
                                    <div className="text-center py-5">
                                        <Sparkles size={18} className="text-[#c8e0e0] mx-auto mb-2" />
                                        <p className="text-[#b0cccc] text-xs">No services selected yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                                        {selectedServices.map((id) => (
                                            <div key={id} className="flex items-center gap-2 bg-[#edf8f8] rounded-xl px-3 py-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5bb9b9] shrink-0" />
                                                <span className="text-xs text-[#2a5858] font-medium leading-tight">{idToService[id].label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden p-5">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a4f4f] to-[#2a6868]" />
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold tracking-widest uppercase text-[#9dd4d4] mb-2">Good to know</p>
                                <p className="text-xs text-[#cde8e8] leading-relaxed">
                                    After confirming, you'll be taken to WhatsApp to complete your booking with our team.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ── MOBILE SUMMARY ── */}
            <MobileSummary
                name={name} phone={phone} date={date} slotLabel={slotLabel}
                selectedServices={selectedServices} idToService={idToService} step={step}
            />
        </div>
    );
};

export default Appointment;