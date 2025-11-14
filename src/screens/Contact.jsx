import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { CiClock1 } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------- Google Map -------------------- */
const GoogleMapComponent = () => (
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.0702354083996!2d73.88642597530608!3d18.660843982460147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2ec69f9c29%3A0x6910ba95de0afc6!2sPure%20Bliss%20Advance%20Aesthetic&#39;s%20and%20Eye%20Care%20Clinic!5e0!3m2!1sen!2sin!4v1742375755516!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
    />
);

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: [],
        showDropdown: false,
        message: "",
    });

    const [toast, setToast] = useState({ show: false, text: "", type: "success" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, service, message } = formData;

        if (!firstName || !email || !message || service.length === 0) {
            setToast({
                show: true,
                text: "⚠️ Please fill all required fields including service.",
                type: "error",
            });
            setTimeout(() => setToast({ show: false }), 2500);
            return;
        }

        setToast({
            show: true,
            text: "✅ Opening WhatsApp...",
            type: "success",
        });

        const whatsappMessage = `Hello, Pure Bliss Clinic 👋%0A
I would like to inquire about your services. Here are my details:%0A
👤 Name: ${firstName} ${lastName}%0A
📧 Email: ${email}%0A
💆‍♀️ Services Interested In: ${service.join(", ")}%0A
💬 Message: ${message}%0A
Looking forward to your response.%0AThank you!`;

        const whatsappNumber = "919922442405";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        setTimeout(() => {
            window.open(whatsappURL, "_blank");
            setToast({ show: false });
        }, 1200);
    };

    return (
        <div className="bg-[#f8fbfb] text-gray-900 relative min-h-screen pb-10">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.4 }}
                        className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg z-[9999] text-white ${toast.type === "error" ? "bg-red-500" : "bg-[#0b3d3d]"}`}
                    >
                        {toast.text}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================= Hero Section Centered =================== */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="
        relative w-full max-w-6xl mx-auto
        min-h-[320px] sm:min-h-[380px] md:min-h-[450px]
        rounded-2xl overflow-hidden shadow-xl mb-10
        flex items-center justify-center
        mt-20 sm:mt-28 md:mt-32
        pt-6 sm:pt-12 md:pt-20
    "
            >
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/images/contact_bg.jpg')] bg-cover bg-center" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#5bb9b9]/70 via-[#4a9a9a]/60 to-[#327a7a]/70" />

                {/* Centered Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">

                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 drop-shadow-lg"
                    >
                        Get in Touch with Pure Bliss Clinic
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="max-w-xl text-sm sm:text-base md:text-lg text-[#eafcfc] leading-relaxed font-light px-2"
                    >
                        Connect with our experts — your journey to confident beauty begins here.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="w-20 sm:w-24 h-[3px] bg-[#79d1d1] mt-4 sm:mt-5 rounded-full"
                    />
                </div>
            </motion.section>


            {/* ============= Contact Form + Info ============= */}
            <div className="px-2 sm:px-8 md:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-stretch gap-8 sm:gap-10">
                    {/* ------ FORM LEFT SIDE ------- */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-3/5"
                    >
                        <div className="bg-white shadow-2xl p-4 sm:p-8 md:p-10 rounded-2xl border border-[#cdeeee]">
                            <h3 className="text-[#0b3d3d] text-xl sm:text-2xl font-semibold mb-2">
                                Send Us a Message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                {/* Name Fields */}
                                <div>
                                    <label className="block mb-2 font-medium text-sm">Full Name*</label>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            className="bg-[#f6fafa] p-3 rounded-lg border w-full sm:w-1/2"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            className="bg-[#f6fafa] p-3 rounded-lg border w-full sm:w-1/2"
                                        />
                                    </div>
                                </div>
                                {/* Email */}
                                <div>
                                    <label className="block mb-2 font-medium text-sm">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your email"
                                        className="bg-[#f6fafa] p-3 rounded-lg border w-full"
                                    />
                                </div>
                                {/* Phone */}
                                <div>
                                    <label className="block mb-2 font-medium text-sm">Phone Number</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your phone number"
                                        className="bg-[#f6fafa] p-3 rounded-lg border w-full"
                                    />
                                </div>
                                {/* Multi-Select Dropdown */}
                                <div className="relative">
                                    <label className="block mb-2 font-medium text-sm">Select Services*</label>
                                    {/* Selected Tags */}
                                    <div
                                        className="bg-[#f6fafa] border p-3 rounded-lg cursor-pointer flex flex-wrap gap-2 min-h-[48px]"
                                        onClick={() =>
                                            setFormData({ ...formData, showDropdown: !formData.showDropdown })
                                        }
                                    >
                                        {formData.service.length === 0 ? (
                                            <span className="text-gray-400">-- Choose Services --</span>
                                        ) : (
                                            formData.service.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-[#d9f3f3] text-[#0b3d3d] px-2 py-1 rounded-md text-xs flex items-center gap-1"
                                                >
                                                    {item}
                                                    <span
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFormData({
                                                                ...formData,
                                                                service: formData.service.filter((x) => x !== item),
                                                            });
                                                        }}
                                                        className="cursor-pointer text-red-500 font-bold"
                                                    >
                                                        ✕
                                                    </span>
                                                </span>
                                            ))
                                        )}

                                        <motion.span
                                            animate={{ rotate: formData.showDropdown ? 180 : 0 }}
                                            className="ml-auto text-[#619696] text-lg"
                                        >
                                            ▼
                                        </motion.span>
                                    </div>
                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {formData.showDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute w-full mt-2 bg-white rounded-xl border shadow-lg max-h-60 overflow-y-auto z-30"
                                            >
                                                {[
                                                    { group: "🌿 Skin Care", items: ["Chemical Peel", "Carbon Peel (Hollywood Peel)", "Laser Hair Reduction (LHR)", "MNRF Treatment", "HIFU Face Lift"] },
                                                    { group: "💇 Hair Care", items: ["PRP Therapy", "GFC Therapy", "Mesotherapy", "LLLT Laser Treatment", "Anti-Dandruff Treatment"] },
                                                    { group: "👁️ Eye Care", items: ["Dry Eye Therapy", "Vision Correction", "Eyelash Lift & Tint", "Eyelid Rejuvenation"] },
                                                    { group: "💄 Semi-Permanent Makeup", items: ["Lip Blush", "Microblading", "BB Glow", "Ombre Brows"] },
                                                ].map((cat, i) => (
                                                    <div key={i} className="border-b last:border-none">
                                                        <h4 className="px-4 py-2 text-sm font-semibold text-[#619696] bg-[#f9fdfd] sticky top-0">
                                                            {cat.group}
                                                        </h4>
                                                        {cat.items.map((item, idx) => (
                                                            <label
                                                                key={idx}
                                                                className="flex items-center px-5 py-2 text-sm hover:bg-[#e6f4f4] gap-3 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.service.includes(item)}
                                                                    onChange={() => {
                                                                        const selected = formData.service.includes(item);
                                                                        setFormData({
                                                                            ...formData,
                                                                            service: selected
                                                                                ? formData.service.filter((x) => x !== item)
                                                                                : [...formData.service, item],
                                                                        });
                                                                    }}
                                                                />
                                                                {item}
                                                            </label>
                                                        ))}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {/* Message */}
                                <div>
                                    <label className="block mb-2 font-medium text-sm">Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your message here"
                                        className="bg-[#f6fafa] p-3 rounded-lg border w-full"
                                    />
                                </div>
                                {/* Submit */}
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="submit"
                                    className="bg-[#619696] hover:bg-[#4a7e7e] px-6 py-3 rounded-lg text-white font-semibold w-full mt-1"
                                >
                                    Send via WhatsApp
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                    {/* ------ INFO RIGHT SIDE ------- */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-2/5"
                    >
                        <div className="bg-white shadow-2xl p-4 sm:p-8 md:p-10 rounded-2xl border border-[#cdeeee]">
                            <h3 className="text-[#0b3d3d] text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                                Contact Information
                            </h3>
                            <div className="space-y-5 sm:space-y-6">
                                {[
                                    { icon: <FaPhoneAlt />, title: "Phone", details: ["+91 9922442405", "+91 7249539802"] },
                                    { icon: <MdEmail />, title: "Email", details: ["purebliss2303@gmail.com"] },
                                    { icon: <FaWhatsapp />, title: "WhatsApp", details: ["+91 9922442405"] },
                                    {
                                        icon: <FaLocationDot />,
                                        title: "Address",
                                        details: [
                                            "Sr. No. 5, Sankalp Vastu, Alandi Rd, near Bansilal Mills, Charholi Budruk, Pune, Maharashtra 412105",
                                        ],
                                    },
                                    { icon: <CiClock1 />, title: "Hours", details: ["Monday to Sunday: 10:30 am – 8:00 pm"] },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="text-[#619696] text-lg sm:text-xl">{item.icon}</div>
                                        <div>
                                            <h3 className="font-semibold text-[#0b3d3d]">{item.title}</h3>
                                            {item.details.map((d, i) => (
                                                <p key={i} className="text-gray-700 text-xs sm:text-sm mt-1">{d}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ============= Google Map ============= */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="h-[220px] sm:h-[350px] md:h-[450px] w-full border-t mt-6"
            >
                <GoogleMapComponent />
            </motion.div>

            {/* ============= Social Icons ============= */}
            <div className="flex justify-center items-center gap-8 sm:gap-10 py-8 sm:py-12">
                {[
                    { icon: <FaInstagram />, link: "https://www.instagram.com/pureblissskinandeyeclinic" },
                    { icon: <FaFacebook />, link: "https://www.facebook.com/" },
                    {
                        icon: <FaWhatsapp />,
                        link: "https://wa.me/919922442405?text=Hello,%20I'm%20interested%20in%20your%20services!",
                    },
                ].map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0b3d3d] hover:text-[#619696] text-2xl sm:text-3xl transition transform hover:scale-110"
                    >
                        {item.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Contact;
