import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoFull from "../assets/NewLogo3.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth > 768 &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceClick = (path) => {
    navigate(path);
    setServicesOpen(false);
    setMenuOpen(false);
  };

  const handleBookNow = () => {
    navigate("/appointment");
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md border-b border-gray-200 z-50 px-6 py-5 md:py-4 transition-all duration-300">

      {/* ⭐ Adjusted 3-Column Layout Wrapper */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between relative md:grid md:grid-cols-[auto_1fr_auto] md:items-center">

        {/* ⭐ Mobile: Center Logo | Desktop: Left Logo 
           --- CHANGE APPLIED: md:ml-4 moves the logo slightly right on desktop --- */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none md:ml-20"
          onClick={() => {
            setMenuOpen(false);
            setServicesOpen(false);
          }}
        >
          <img
            src={logoFull}
            alt="Pure Bliss Logo"
            className="h-14 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* ⭐ Desktop Navbar Links (STAYS IN COLUMN 2) */}
        <ul className="hidden md:flex items-center space-x-10 text-[17px] font-medium text-gray-700 justify-center">
          <li className="relative group">
            <Link to="/" className="hover:text-[#619696] transition">
              Home
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#619696] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>

          <li className="relative group">
            <Link to="/about" className="hover:text-[#619696] transition">
              About
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#619696] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>

          <li className="relative group" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 hover:text-[#619696] transition"
            >
              Services ▾
            </button>

            {servicesOpen && (
              <div className="absolute left-0 mt-3 w-56 bg-white rounded-xl border border-gray-100 shadow-xl p-3 space-y-2 animate-fadeDown">
                {[
                  { name: "Skin Care", path: "/skincare" },
                  { name: "Hair Care", path: "/haircare" },
                  { name: "Eye Care", path: "/eyecare" },
                  { name: "Semi-Permanent Makeup", path: "/makeup" },
                ].map((s) => (
                  <button
                    key={s.path}
                    onClick={() => handleServiceClick(s.path)}
                    className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-[#619696]/10 hover:text-[#619696] transition"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </li>

          <li className="relative group">
            <Link to="/contact" className="hover:text-[#619696] transition">
              Contact
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#619696] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>

        {/* ⭐ Desktop Book Button (STAYS IN COLUMN 3) */}
        <button
          onClick={handleBookNow}
          className="hidden md:block bg-[#619696] hover:bg-[#4d7777] text-white px-6 py-2 rounded-full font-semibold shadow-md transition hover:scale-110"
        >
          Book Appointment
        </button>

        {/* ⭐ Mobile Hamburger (Unaffected) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto text-gray-800 focus:outline-none text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ❗ Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        ></div>
      )}

      {/* ⭐ Mobile Slide Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] sm:w-[70%] bg-white shadow-2xl border-l border-gray-200 transition-transform duration-500 z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Mobile Logo */}
        <div className="relative flex items-center justify-center px-6 py-4 border-b border-gray-200">
          <img src={logoFull} alt="Logo" className="h-10" />
          <FaTimes
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 text-2xl text-gray-700 cursor-pointer hover:text-[#619696]"
          />
        </div>

        {/* Mobile Links */}
        <div className="px-6 py-8 flex flex-col space-y-6 text-[18px] font-medium text-gray-700">

          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#619696]">
            Home
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#619696]">
            About
          </Link>

          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex justify-between items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[#619696] font-semibold"
            >
              <span>Services</span>
              <span>{servicesOpen ? "▴" : "▾"}</span>
            </button>

            {servicesOpen && (
              <div className="mt-3 space-y-2 bg-white border border-gray-200 rounded-lg p-3 shadow-md animate-fadeDown">
                {[
                  { name: "Skin Care", path: "/skincare" },
                  { name: "Hair Care", path: "/haircare" },
                  { name: "Eye Care", path: "/eyecare" },
                  { name: "Semi-Permanent Makeup", path: "/makeup" },
                ].map((s) => (
                  <button
                    key={s.path}
                    onClick={() => handleServiceClick(s.path)}
                    className="w-full text-center px-5 py-3 rounded-md text-gray-700 hover:bg-[#f1f5f5] hover:text-[#619696] transition"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#619696]">
            Contact
          </Link>

          <hr className="border-gray-200" />

          <button
            onClick={handleBookNow}
            className="w-full bg-[#619696] text-white py-3 rounded-full font-semibold shadow-md hover:bg-[#4d7777] transition"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeDown { animation: fadeDown 0.28s ease-out; }
      `}</style>
    </nav>
  );
};

export default Navbar;