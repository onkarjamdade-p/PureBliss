import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoFull from "../assets/NewLogo3.png";

const PRIMARY_COLOR = "#619696";
const HOVER_COLOR = "#4d7777";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // NEW SEPARATE STATES
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const [desktopLangOpen, setDesktopLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  // refs for click outside (desktop only)
  const servicesRef = useRef(null);
  const desktopLangRef = useRef(null);

  // Translate trigger
  const translateTo = (langCode) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  // Close entire mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
    setDesktopServicesOpen(false);
    setMobileServicesOpen(false);
    setDesktopLangOpen(false);
    setMobileLangOpen(false);
  };

  const navigateService = (path) => {
    navigate(path);
    closeMenu();
  };

  // Disable scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Navbar shrink on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop click-outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setDesktopServicesOpen(false);
      }
      if (desktopLangRef.current && !desktopLangRef.current.contains(e.target)) {
        setDesktopLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full bg-white z-50 transition-all duration-300 ${isScrolled ? "shadow-md border-b py-3" : "py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LOGO */}
        <Link to="/" onClick={closeMenu}>
          <motion.img
            src={logoFull}
            alt="logo"
            className="h-10 md:h-12"
            whileHover={{ scale: 1.05 }}
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center space-x-10 text-gray-700 font-medium">

          <li><Link to="/" className="nav-underline">Home</Link></li>
          <li><Link to="/about" className="nav-underline">About</Link></li>
          <li><Link to="/contact" className="nav-underline">Contact</Link></li>

          {/* DESKTOP SERVICES */}
          <li ref={servicesRef} className="relative">
            <button
              onClick={() => setDesktopServicesOpen((v) => !v)}
              className="flex items-center gap-2 nav-underline"
            >
              Services <span>{desktopServicesOpen ? "▲" : "▼"}</span>
            </button>

            <AnimatePresence>
              {desktopServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="dropdown-panel absolute left-1/2 -translate-x-1/2 mt-3 z-50"
                >
                  <button onClick={() => navigateService("/skincare")} className="dropdown-item">Skin Care</button>
                  <button onClick={() => navigateService("/haircare")} className="dropdown-item">Hair Care</button>
                  <button onClick={() => navigateService("/eyecare")} className="dropdown-item">Eye Care</button>
                  <button onClick={() => navigateService("/makeup")} className="dropdown-item">Semi-Permanent Makeup</button>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* DESKTOP LANGUAGE + CTA */}
        <div ref={desktopLangRef} className="hidden md:flex items-center gap-6 relative">

          <button
            onClick={() => setDesktopLangOpen((v) => !v)}
            className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-full shadow-lg font-semibold flex items-center gap-2"
          >
            <span className="nav-underline">🌐 Translate</span>
            <span>{desktopLangOpen ? "▲" : "▼"}</span>
          </button>

          {desktopLangOpen && (
            <div className="dropdown-panel absolute top-12 left-0 z-50">
              <button onClick={() => { translateTo("en"); setDesktopLangOpen(false); }} className="lang-item">🇬🇧 English</button>
              <button onClick={() => { translateTo("hi"); setDesktopLangOpen(false); }} className="lang-item">🇮🇳 Hindi</button>
              <button onClick={() => { translateTo("mr"); setDesktopLangOpen(false); }} className="lang-item">🇮🇳 Marathi</button>
            </div>
          )}

          <motion.button
            onClick={() => navigate("/appointment")}
            whileHover={{ backgroundColor: HOVER_COLOR }}
            className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-full shadow-lg font-semibold"
          >
            Book Appointment
          </motion.button>
        </div>

        {/* MOBILE MENU ICON */}
        {!menuOpen && (
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-2xl text-gray-700">
            <FaBars />
          </button>
        )}
      </div>

      {/* BACKDROP */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed top-0 right-0 h-full w-[80%] bg-white shadow-xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28 }}
          >

            {/* CLOSE BUTTON */}
            <div className="flex justify-end px-6 py-4">
              <button onClick={closeMenu} className="text-3xl text-gray-600">
                <FaTimes />
              </button>
            </div>

            {/* MOBILE MENU CONTENT */}
            <div className="px-6 pb-12 flex flex-col space-y-10 text-lg">

              {/* MAIN MENU */}
              <div className="space-y-3">
                <p className="text-xs uppercase font-semibold text-gray-500">Main Menu</p>

                <div className="flex flex-col space-y-3">
                  <Link to="/" onClick={closeMenu} className="nav-underline">Home</Link>
                  <Link to="/about" onClick={closeMenu} className="nav-underline">About</Link>
                  <Link to="/contact" onClick={closeMenu} className="nav-underline">Contact</Link>
                </div>
              </div>


              <hr />

              {/* MOBILE SERVICES */}
              <div className="space-y-2">
                <p className="text-xs uppercase font-semibold text-gray-500">Our Services</p>

                <button
                  className="flex justify-between items-center w-full"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  <span className="nav-underline">Services</span>
                  <span>{mobileServicesOpen ? "▲" : "▼"}</span>
                </button>

                {mobileServicesOpen && (
                  <div className="pl-3 flex flex-col space-y-2">
                    <button onClick={() => navigateService("/skincare")} className="nav-underline text-left">Skin Care</button>
                    <button onClick={() => navigateService("/haircare")} className="nav-underline text-left">Hair Care</button>
                    <button onClick={() => navigateService("/eyecare")} className="nav-underline text-left">Eye Care</button>
                    <button onClick={() => navigateService("/makeup")} className="nav-underline text-left">Semi-Permanent Makeup</button>
                  </div>
                )}
              </div>

              <hr />

              {/* MOBILE LANGUAGE */}
              <div className="space-y-2">
                <p className="text-xs uppercase font-semibold text-gray-500">Language Options</p>

                <button
                  className="flex justify-between items-center w-full"
                  onClick={() => setMobileLangOpen((v) => !v)}
                >
                  <span className="nav-underline">🌐 Translate</span>
                  <span>{mobileLangOpen ? "▲" : "▼"}</span>
                </button>

                {mobileLangOpen && (
                  <div className="pl-3 flex flex-col space-y-2">
                    <button onClick={() => translateTo("en")} className="nav-underline text-left">🇬🇧 English</button>
                    <button onClick={() => translateTo("hi")} className="nav-underline text-left">🇮🇳 Hindi</button>
                    <button onClick={() => translateTo("mr")} className="nav-underline text-left">🇮🇳 Marathi</button>
                  </div>
                )}
              </div>

              <hr />

              {/* CTA */}
              <motion.button
                onClick={() => { closeMenu(); navigate("/appointment"); }}
                whileHover={{ backgroundColor: HOVER_COLOR }}
                className="w-full bg-[var(--color-primary)] text-white py-3 rounded-full font-semibold shadow-md"
              >
                Book Appointment
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
