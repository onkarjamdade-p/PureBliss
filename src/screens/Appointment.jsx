import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Loader2,
    ChevronLeft,
    ChevronRight,
    User,
    Phone,
    CheckCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

/* -------------------- Helpers -------------------- */
const formatDisplayDate = (d) =>
    d
        ? d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            weekday: "short",
        })
        : "—";

/* -------------------- Date Carousel -------------------- */
const HorizontalDateCarousel = ({ selected, onSelect }) => {
    const days = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        d.setHours(0, 0, 0, 0);
        return d;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto py-2 -mx-2 sm:-mx-6 md:mx-0"
        >
            <div className="flex gap-2 sm:gap-3 px-2 sm:px-6 md:px-0">
                {days.map((d) => {
                    const isSelected = selected && selected.getTime() === d.getTime();
                    return (
                        <button
                            key={d.toISOString()}
                            onClick={() => onSelect(new Date(d))}
                            className={`min-w-[60px] px-2 sm:px-3 py-2 sm:py-3 rounded-xl border-2 text-center transition-all ${isSelected
                                ? "bg-[#619696] border-[#619696] text-white shadow-md scale-[1.02]"
                                : "bg-white text-[#0b3d3d] border-[#e0f1f1] hover:border-[#5bb9b9]"
                                }`}
                        >
                            <div className="text-xs font-medium uppercase tracking-wider">
                                {d.toLocaleString("en-US", { weekday: "short" })}
                            </div>
                            <div className="text-xl font-extrabold mt-0.5">{d.getDate()}</div>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
};

/* -------------------- Services Data -------------------- */
const SERVICES_DATA = {
    "Skin Care": [
        { id: "chemical_peel", label: "Chemical Peel" },
        { id: "carbon_peel", label: "Carbon Peel (Hollywood Peel)" },
        { id: "lhr", label: "Laser Hair Reduction (LHR)" },
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

/* -------------------- Time Slots -------------------- */
const APPOINTMENT_DURATION = 90;
const INTERVAL_MINUTES = 30;
const CLOSING_MINUTES = 22 * 60;

const generateTimeSlots = (startHour, interval, limitMinutes) => {
    const slots = [];
    let current = startHour * 60;

    while (current <= limitMinutes) {
        const hours = Math.floor(current / 60);
        const minutes = current % 60;

        const t = new Date(0, 0, 0, hours, minutes).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });

        slots.push(t);
        current += interval;
    }
    return slots;
};

const SHORT_SLOTS = generateTimeSlots(10, INTERVAL_MINUTES, CLOSING_MINUTES - APPOINTMENT_DURATION);
const LONG_SLOTS = generateTimeSlots(10, INTERVAL_MINUTES, 16 * 60);

/* -------------------- Mobile Summary -------------------- */
const MobileSummary = ({ name, phone, date, slot, selectedServices, idToService, step }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const show = step >= 2 || name || phone || date || slot || selectedServices.length;
    if (!show) return null;

    const summary = [
        { label: "Name", value: name || "—" },
        { label: "Phone", value: phone || "—" },
        { label: "Date", value: date ? formatDisplayDate(date) : "—" },
        { label: "Time", value: slot || "—" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t-4 border-[#5bb9b9] shadow-xl z-30">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex justify-between w-full px-4 py-3 text-base font-bold text-[#619696]"
            >
                {isExpanded ? "Hide Summary" : "View Summary"}
                {isExpanded ? <ChevronDown /> : <ChevronUp />}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4"
                        style={{ overflow: "hidden" }}
                    >
                        <h4 className="font-semibold text-[#0b3d3d] text-sm mb-3">
                            Personal Details
                        </h4>

                        <div className="bg-[#f0fafa] p-3 rounded-lg text-sm mb-4">
                            {summary.map((row) => (
                                <p className="flex justify-between py-1 border-b last:border-none" key={row.label}>
                                    <b>{row.label}:</b> <span>{row.value}</span>
                                </p>
                            ))}
                        </div>

                        <h4 className="font-semibold mb-2 text-sm text-[#0b3d3d]">
                            Selected Services ({selectedServices.length})
                        </h4>

                        {selectedServices.length === 0 ? (
                            <p className="text-gray-500 text-xs">No services selected.</p>
                        ) : (
                            <ul className="space-y-1.5 max-h-32 overflow-y-auto p-3 border rounded-lg bg-white">
                                {selectedServices.map((id) => (
                                    <li key={id} className="flex items-start gap-2 text-sm">
                                        <CheckCircle size={14} className="text-[#5bb9b9]" />
                                        {idToService[id].label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};



/* -------------------- MAIN COMPONENT -------------------- */

const Appointment = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedServices, setSelectedServices] = useState([]);
    const [date, setDate] = useState(null);
    const [slot, setSlot] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    /* Dynamically choose short or long time slots */
    const currentSlots = useMemo(() => {
        if (selectedServices.length >= 3) {
            if (!LONG_SLOTS.includes(slot)) setSlot("");
            return LONG_SLOTS;
        }
        return SHORT_SLOTS;
    }, [selectedServices.length, slot]);

    /* Convert service ID → label */
    const idToService = useMemo(() => {
        const map = {};
        Object.values(SERVICES_DATA)
            .flat()
            .forEach((s) => (map[s.id] = s));
        return map;
    }, []);

    /* -------------------- VALIDATION -------------------- */
    const validateStep = (s) => {
        const e = {};

        if (s === 1) {
            if (!name.trim()) e.name = "Full name is required.";
            else if (!/^[A-Za-z\s]+$/.test(name)) e.name = "Only alphabets allowed.";

            if (!phone.trim()) e.phone = "Phone number is required.";
            else if (!/^[0-9]{10}$/.test(phone.trim())) e.phone = "Enter valid 10-digit mobile number.";
        }

        if (s === 2 && !selectedServices.length)
            e.services = "Select at least one service.";

        if (s === 3) {
            if (!date) e.date = "Select a date.";
            if (!slot) e.slot = "Select a time slot.";
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    /* -------------------- SUBMIT -------------------- */
    const handleSubmit = () => {
        if (!validateStep(3)) {
            if (!validateStep(1)) setStep(1);
            else if (!validateStep(2)) setStep(2);
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const servicesList = selectedServices
                .map((id) => `• ${idToService[id].label}`)
                .join("\n");

            const msg = `
📅 *New Appointment Request*

👤 *Name:* ${name}
📞 *Phone:* ${phone}

💆‍♀️ *Services:*
${servicesList}

🗓️ *Date:* ${formatDisplayDate(date)}
⏰ *Time:* ${slot} (IST)

——
Thanks,
Pure Bliss Skin & Eye Clinic`;

            window.open(
                `https://wa.me/9922442405?text=${encodeURIComponent(msg)}`,
                "_blank"
            );

            setLoading(false);
        }, 900);
    };

    /* -------------------- STEP INDICATOR -------------------- */
    const StepIndicator = ({ step, currentStep, label }) => (
        <div className="flex items-center gap-2">
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep === step
                    ? "bg-[#619696] text-white shadow-lg"
                    : currentStep > step
                        ? "bg-[#5bb9b9]/20 text-[#0b3d3d]"
                        : "bg-gray-200 text-gray-500"
                    }`}
            >
                {currentStep > step ? <CheckCircle size={18} /> : step}
            </div>

            <span
                className={`hidden sm:inline text-sm font-semibold ${currentStep === step ? "text-[#0b3d3d]" : "text-gray-600"
                    }`}
            >
                {label}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fbfb] text-[#0b3d3d] pb-20 sm:pb-12 pt-20 sm:pt-24">
            {/* HEADER BANNER */}
            <div className="max-w-3xl sm:max-w-6xl mx-auto px-3 sm:px-6 mb-10">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl h-44 sm:h-56 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5bb9b9] to-[#619696]"></div>

                    <div className="relative z-10 text-center text-white px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-2"
                        >
                            <Calendar size={38} />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
                        >
                            Book Your Appointment
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm md:text-base"
                        >
                            Quick & easy 3-step booking process
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="max-w-lg sm:max-w-5xl mx-auto px-3 sm:px-6 pb-44 sm:pb-28 md:pb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">

                    {/* LEFT SIDE FORM */}
                    <div className="md:col-span-2 bg-white shadow-xl border rounded-2xl p-4 sm:p-6 md:p-8">

                        {/* Step Indicators */}
                        <div className="flex items-center justify-between mb-8 pb-5 border-b">
                            <StepIndicator step={1} currentStep={step} label="Details" />
                            <div className={`flex-1 h-0.5 mx-2 ${step > 1 ? "bg-[#5bb9b9]" : "bg-gray-200"}`} />
                            <StepIndicator step={2} currentStep={step} label="Services" />
                            <div className={`flex-1 h-0.5 mx-2 ${step > 2 ? "bg-[#5bb9b9]" : "bg-gray-200"}`} />
                            <StepIndicator step={3} currentStep={step} label="Confirm" />
                        </div>

                        <AnimatePresence mode="wait">
                            {/* -------------------- STEP 1 -------------------- */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                >
                                    <h2 className="text-lg sm:text-xl font-bold mb-6 text-[#619696]">
                                        Your Information
                                    </h2>

                                    <div className="space-y-6">
                                        {/* Name */}
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
                                                placeholder="Full Name"
                                                className={`w-full pl-10 pr-3 py-3 rounded-xl border-2 ${errors.name
                                                    ? "border-red-400"
                                                    : "border-gray-200 focus:border-[#619696]"
                                                    }`}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                            <input
                                                type="tel"
                                                maxLength={10}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                                                placeholder="10-digit Phone Number"
                                                className={`w-full pl-10 pr-3 py-3 rounded-xl border-2 ${errors.phone
                                                    ? "border-red-400"
                                                    : "border-gray-200 focus:border-[#619696]"
                                                    }`}
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => validateStep(1) && setStep(2)}
                                        className="mt-8 bg-[#619696] hover:bg-[#5bb9b9] text-white px-8 py-3 rounded-xl font-semibold shadow-md"
                                    >
                                        Next Step
                                    </button>
                                </motion.div>
                            )}

                            {/* -------------------- STEP 2 -------------------- */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                >
                                    <h2 className="text-lg sm:text-xl font-bold mb-6 text-[#619696]">
                                        Select Services
                                    </h2>

                                    <div className="space-y-6">
                                        {Object.entries(SERVICES_DATA).map(([group, items]) => (
                                            <div
                                                key={group}
                                                className="border border-[#e0f1f1] p-5 rounded-xl bg-[#fbffff]"
                                            >
                                                <h3 className="font-bold mb-3 text-lg border-b pb-2 border-[#5bb9b9]/40">
                                                    {group}
                                                </h3>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {items.map((s) => {
                                                        const checked = selectedServices.includes(s.id);
                                                        return (
                                                            <label
                                                                key={s.id}
                                                                className={`flex items-center gap-3 border-2 p-3 rounded-lg cursor-pointer text-sm transition-all ${checked
                                                                    ? "bg-[#e6fffb] border-[#5bb9b9]"
                                                                    : "bg-white border-gray-200 hover:border-[#5bb9b9]/50"
                                                                    }`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checked}
                                                                    onChange={() =>
                                                                        setSelectedServices((prev) =>
                                                                            checked
                                                                                ? prev.filter((x) => x !== s.id)
                                                                                : [...prev, s.id]
                                                                        )
                                                                    }
                                                                />
                                                                {s.label}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {errors.services && (
                                        <p className="text-red-500 text-sm mt-4">{errors.services}</p>
                                    )}

                                    <div className="flex justify-between mt-8">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="border px-6 py-3 rounded-xl font-medium"
                                        >
                                            Back
                                        </button>

                                        <button
                                            onClick={() => validateStep(2) && setStep(3)}
                                            className="bg-[#619696] hover:bg-[#5bb9b9] text-white px-8 py-3 rounded-xl font-semibold shadow-md"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                            {/* -------------------- STEP 3 -------------------- */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                >
                                    <h2 className="text-lg sm:text-xl font-bold mb-6 text-[#619696]">
                                        Pick Date & Time
                                    </h2>

                                    {/* DATE */}
                                    <h4 className="mb-3 font-semibold text-gray-700">Select Date</h4>

                                    <HorizontalDateCarousel
                                        selected={date}
                                        onSelect={(d) => {
                                            const c = new Date(d);
                                            c.setHours(0, 0, 0, 0);
                                            setDate(c);
                                        }}
                                    />

                                    {errors.date && (
                                        <p className="text-red-500 text-sm mt-2">{errors.date}</p>
                                    )}

                                    {/* TIME */}
                                    <h4 className="mt-6 mb-3 font-semibold text-gray-700">
                                        Available Time Slots
                                        {currentSlots === LONG_SLOTS && (
                                            <span className="text-red-500 text-xs ml-2">
                                                (Limited due to multiple services)
                                            </span>
                                        )}
                                    </h4>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                                        {currentSlots.map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setSlot(t)}
                                                className={`py-3 px-3 border-2 rounded-xl transition-all font-medium ${slot === t
                                                    ? "bg-[#619696] border-[#619696] text-white shadow-md scale-[1.02]"
                                                    : "bg-white border-gray-200 hover:border-[#5bb9b9]"
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>

                                    {errors.slot && (
                                        <p className="text-red-500 text-sm mt-2">{errors.slot}</p>
                                    )}

                                    {/* BUTTONS */}
                                    <div className="flex justify-between mt-8 flex-wrap gap-3">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="border px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                                        >
                                            Back
                                        </button>

                                        <button
                                            onClick={handleSubmit}
                                            disabled={
                                                loading ||
                                                !date ||
                                                !slot ||
                                                !selectedServices.length ||
                                                !name.trim() ||
                                                !phone.trim()
                                            }
                                            className={`px-8 py-3 rounded-xl shadow-lg font-semibold flex items-center justify-center gap-2 ${loading ||
                                                !date ||
                                                !slot ||
                                                !selectedServices.length ||
                                                !name.trim() ||
                                                !phone.trim()
                                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                : "bg-[#619696] text-white hover:bg-[#5bb9b9]"
                                                }`}
                                        >
                                            {loading ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                <>
                                                    <span className="hidden md:inline">
                                                        Confirm & Send via WhatsApp
                                                    </span>
                                                    <span className="md:hidden">Confirm & Send</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* -------------------- DESKTOP BOOKING SUMMARY -------------------- */}
                    <aside className="hidden md:block bg-white p-6 rounded-2xl shadow-xl border h-fit sticky top-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                        <h3 className="text-2xl font-extrabold mb-5 text-[#0b3d3d]">
                            Booking Summary
                        </h3>

                        {/* SERVICES */}
                        <h4 className="font-bold mb-2 text-[#619696] text-sm uppercase tracking-wider">
                            Selected Services ({selectedServices.length})
                        </h4>

                        {selectedServices.length === 0 ? (
                            <div className="p-4 bg-[#f0fafa] rounded-xl border text-gray-600 text-sm">
                                Please choose your treatments in Step 2
                            </div>
                        ) : (
                            <ul className="space-y-3 max-h-56 overflow-y-auto pr-2">
                                {selectedServices.map((id) => (
                                    <li
                                        key={id}
                                        className="p-3 bg-[#fbffff] border-2 border-[#e6fffb] rounded-xl shadow-sm flex items-start gap-2"
                                    >
                                        <CheckCircle
                                            size={18}
                                            className="text-[#619696] mt-1 flex-shrink-0"
                                        />
                                        <span className="font-medium text-sm">
                                            {idToService[id].label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* PERSONAL DETAILS */}
                        <div className="mt-6 border-t pt-6 space-y-3 text-sm">
                            <h4 className="font-bold text-[#619696] uppercase tracking-wider text-xs">
                                Personal Details
                            </h4>

                            <p className="flex justify-between border-b pb-2">
                                <b className="text-gray-700">Name:</b>
                                <span className="font-semibold">{name || "—"}</span>
                            </p>

                            <p className="flex justify-between border-b pb-2">
                                <b className="text-gray-700">Phone:</b>
                                <span className="font-semibold">{phone || "—"}</span>
                            </p>

                            <p className="flex justify-between border-b pb-2">
                                <b className="text-gray-700">Date:</b>
                                <span className="font-semibold">
                                    {date ? formatDisplayDate(date) : "—"}
                                </span>
                            </p>

                            <p className="flex justify-between">
                                <b className="text-gray-700">Time:</b>
                                <span className="font-extrabold text-[#619696]">
                                    {slot || "—"}
                                </span>
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            {/* -------------------- MOBILE SUMMARY (BOTTOM DRAWER) -------------------- */}
            <MobileSummary
                name={name}
                phone={phone}
                date={date}
                slot={slot}
                selectedServices={selectedServices}
                idToService={idToService}
                step={step}
            />
        </div>
    );
};

export default Appointment;
