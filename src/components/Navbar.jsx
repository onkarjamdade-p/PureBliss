import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Menu, X, Calendar } from "lucide-react";
import logoFull from "../assets/NewLogo3.png";

// Google Translate
const translateToLang = (langCode) => {
  const id = setInterval(() => {
    const sel = document.querySelector(".goog-te-combo");
    if (sel) { sel.value = langCode; sel.dispatchEvent(new Event("change")); clearInterval(id); }
  }, 200);
};

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const SERVICES = [
  { label: "Skin Care", to: "/skincare", tag: "Rejuvenation" },
  { label: "Hair Care", to: "/haircare", tag: "Restoration" },
  { label: "Eye Care", to: "/eyecare", tag: "Aesthetics" },
  { label: "Permanent Makeup", to: "/makeup", tag: "Micropigmentation" },
];

const LANGUAGES = [
  { label: "English", code: "en", flag: "🇬🇧" },
  { label: "Hindi", code: "hi", flag: "🇮🇳" },
  { label: "Marathi", code: "mr", flag: "🇮🇳" },
];

// Services Dropdown
const ServicesDropdown = ({ onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-50 w-72 rounded-2xl overflow-hidden border shadow-lg"
    style={{
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)"
    }}
  >
    <div className="h-1 w-full bg-gradient-to-r from-[#3A5A5A]/50 via-[#4A6B6B]/50 to-[#1f3f3f]/50" />

    <div className="p-4 space-y-1">
      {SERVICES.map((s, i) => (
        <motion.button
          key={s.to}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          onClick={() => onSelect(s.to)}
          className="group w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#e6f2f2]/50 transition-all duration-200 text-left border border-[#e6f2f2] hover:border-[#3A5A5A]/30"
        >
          <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
            {s.label}
          </span>

          <span className="text-xs font-semibold uppercase tracking-wide text-[#3A5A5A] bg-[#e6f2f2] group-hover:bg-[#d9eeee] px-3 py-1 rounded-full">
            {s.tag}
          </span>
        </motion.button>
      ))}
    </div>
  </motion.div>
);
// Lang Dropdown
const LangDropdown = ({ onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-50 w-48 rounded-2xl overflow-hidden border shadow-lg"
    style={{
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)"
    }}
  >
    <div className="h-1 w-full bg-gradient-to-r from-[#3A5A5A]/50 via-[#4A6B6B]/50 to-[#1f3f3f]/50" />

    <div className="p-3 space-y-1">
      {LANGUAGES.map((l, i) => (
        <motion.button
          key={l.code}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          onClick={() => onSelect(l.code)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#e6f2f2]/50 transition-all duration-200 text-sm font-medium text-gray-800 hover:text-gray-900 border border-[#e6f2f2] hover:border-[#3A5A5A]/30"
        >
          <span className="text-lg">{l.flag}</span>
          <span>{l.label}</span>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const servicesRef = useRef(null);
  const langRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeAll = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setLangOpen(false);
    setMobileServicesOpen(false);
  };

  const go = (path) => {
    navigate(path);
    closeAll();
  };

  const isActive = (to) => location.pathname === to;

  // Effects
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => closeAll(), [location.pathname]);

  const navStyle = scrolled
    ? {
      background: "rgba(255, 255, 255, 0.95)",
      borderBottomColor: "rgba(244, 63, 94, 0.15)",
      padding: "12px 0",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    }
    : {
      background: "rgba(255, 255, 255, 0.92)",
      borderBottomColor: "rgba(0, 0, 0, 0.05)",
      padding: "20px 0",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
    };

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  .nb { font-family: 'Inter', sans-serif; }

  .nav-link {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #374151;
  }

  /* ✅ GREEN UNDERLINE ANIMATION */
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    right: 50%;
    height: 2px;
    background: linear-gradient(90deg, #3A5A5A, #1f3f3f);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 1px;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    left: 0;
    right: 0;
  }

  /* ✅ GREEN ACTIVE TEXT */
  .nav-link.active {
    color: #3A5A5A !important;
    font-weight: 600;
  }
`}</style>

      <motion.nav
        className="nb fixed top-0 w-full z-50 border-b"
        style={{
          ...navStyle,
          backdropFilter: "saturate(180%) blur(20px)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={closeAll} className="flex-shrink-0">
            <motion.img
              src={logoFull}
              alt="Pure Bliss Clinic"
              className="h-10 lg:h-12 object-contain"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.25 }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link px-6 py-3 text-sm font-medium hover:text-gray-900 ${isActive(to) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => { setServicesOpen(v => !v); setLangOpen(false); }}
                className={`nav-link flex items-center gap-1 px-6 py-3 text-sm font-medium hover:text-gray-900 ${servicesOpen ? 'active' : ''}`}
              >
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>
              <AnimatePresence>
                {servicesOpen && <ServicesDropdown onSelect={go} />}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={() => go("/appointment")}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 bg-gradient-to-r from-[#3A5A5A]/90 to-[#1f3f3f]/90 hover:from-[#2f4a4a] hover:to-[#163535] text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#3A5A5A]/40"            >
              <Calendar size={18} />
              <span>Book Now</span>
            </motion.button>

            <div ref={langRef} className="relative">
              <button
                onClick={() => { setLangOpen(v => !v); setServicesOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border border-gray-200 hover:border-[#3A5A5A]/40
  ${langOpen
                    ? "bg-[#e6f2f2] border-[#3A5A5A]/40 shadow-sm text-[#2f4a4a]"
                    : "text-gray-700 hover:bg-[#e6f2f2]/50 hover:shadow-sm"}`}
                aria-expanded={langOpen}
              >
                <Globe size={16} />
                <span>EN</span>
                <motion.span animate={{ rotate: langOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>
              <AnimatePresence>{langOpen && <LangDropdown onSelect={(code) => { translateToLang(code); setLangOpen(false); }} />}</AnimatePresence>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-[#e6f2f2] hover:border-[#3A5A5A]/40 transition-all duration-200 shadow-sm"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed right-0 top-0 h-full w-80 max-w-[90vw] z-50 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(0,0,0,0.05)"
            }}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-b from-white to-[#e6f2f2]/40">
              <Link to="/" onClick={closeAll}>
                <img src={logoFull} alt="Pure Bliss" className="h-10 object-contain" />
              </Link>
              <button
                onClick={closeAll}
                className="p-2 rounded-xl hover:bg-[#e6f2f2] hover:shadow-sm transition-all"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-2 overflow-y-auto">
              {NAV_LINKS.map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={to}
                    onClick={closeAll}
                    className={`block p-4 rounded-2xl text-lg font-medium transition-all duration-200 flex items-center justify-between border hover:border-[#3A5A5A]/40 hover:shadow-md ${isActive(to)
                      ? "bg-gradient-to-r from-[#e6f2f2] to-[#d9eeee] text-[#2f4a4a] border-[#3A5A5A]/40 shadow-md font-semibold"
                      : "text-gray-700 hover:text-gray-900 hover:bg-[#e6f2f2] border border-gray-100"
                      }`}
                  >
                    {label}
                    {isActive(to) && (
                      <div className="w-2 h-2 bg-[#3A5A5A] rounded-full" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <div>
                <button
                  onClick={() => setMobileServicesOpen(v => !v)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-[#e6f2f2] border border-gray-100 hover:border-[#3A5A5A]/30 transition-all duration-200">
                  Services
                  <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }}>
                    <ChevronDown size={20} className="text-gray-500" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-3 space-y-2 overflow-hidden"
                    >
                      {SERVICES.map((s, i) => (
                        <motion.button
                          key={s.to}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => go(s.to)}
                          className="w-full flex items-center justify-between p-3 rounded-xl text-md text-gray-700 hover:text-gray-900 hover:bg-[#e6f2f2] border border-gray-100 hover:border-[#3A5A5A]/30 transition-all shadow-sm">

                          <span>{s.label}</span>
                          <span className="text-xs bg-[#e6f2f2] text-[#3A5A5A] px-3 py-1 rounded-full font-medium">
                            {s.tag}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={() => go("/appointment")}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#3A5A5A] to-[#1f3f3f] hover:from-[#2f4a4a] hover:to-[#163535] text-white font-semibold uppercase tracking-wide py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 mt-8 border border-[#3A5A5A]/50"
              >
                <Calendar size={20} />
                Book Appointment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
