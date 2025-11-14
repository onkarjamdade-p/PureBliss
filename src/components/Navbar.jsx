import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoFull from "../assets/NewLogo3.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Prevent page scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Close desktop dropdown on outside click
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

  // Handle service navigation
  const handleServiceClick = (path) => {
    navigate(path);
    setServicesOpen(false);
    setMenuOpen(false);
  };

  // Handle booking navigation
  const handleBookNow = () => {
    navigate("/appointment");
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md border-b border-gray-200 px-6 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setMenuOpen(false);
            setServicesOpen(false);
          }}
        >
          <img
            src={logoFull}
            alt="Pure Bliss Logo"
            className="h-14 w-auto hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* ✨ Desktop Navbar */}
        <ul className="hidden md:flex space-x-10 text-[17px] font-medium text-gray-700 items-center">
          <li className="relative group">
            <Link to="/" className="transition-colors duration-300 hover:text-[#619696]">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#619696] group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          </li>

          <li className="relative group">
            <Link to="/about" className="transition-colors duration-300 hover:text-[#619696]">
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#619696] group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          </li>

          <li className="relative group" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="hover:text-[#619696] flex items-center gap-1 focus:outline-none transition-all duration-300"
            >
              Services ▾
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#619696] group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </button>

            {servicesOpen && (
              <div className="absolute left-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-lg p-3 space-y-2 animate-fadeDown">
                {[
                  { name: "Skin Care", path: "/skincare" },
                  { name: "Hair Care", path: "/haircare" },
                  { name: "Eye Care", path: "/eyecare" },
                  { name: "Semi-Permanent Makeup", path: "/makeup" },
                ].map((service) => (
                  <button
                    key={service.path}
                    onClick={() => handleServiceClick(service.path)}
                    className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-[#619696]/10 hover:text-[#619696] transition-all duration-200"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            )}
          </li>

          <li className="relative group">
            <Link to="/contact" className="transition-colors duration-300 hover:text-[#619696]">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#619696] group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          </li>
        </ul>

        {/* ✨ Desktop “Book Now” Button */}
        <button
          onClick={handleBookNow}
          className="hidden md:block bg-[#619696] hover:bg-[#4d7777] text-white font-semibold py-2 px-6 rounded-full shadow-md transform transition duration-300 hover:scale-110 hover:shadow-lg"
        >
          Book Appoinment
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-800 w-6 h-6 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] sm:w-[70%] bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-500 z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <img src={logoFull} alt="Logo" className="h-9" />
          <FaTimes
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700 cursor-pointer hover:text-[#619696] transition duration-200"
          />
        </div>

        <div className="flex flex-col px-6 py-8 space-y-6 text-[18px] font-medium text-gray-700">
          <Link to="/" className="hover:text-[#619696]" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/about" className="hover:text-[#619696]" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full text-[#619696] font-semibold flex justify-between items-center px-3 py-2 border border-gray-200 rounded-md bg-gray-50 hover:bg-[#f8fafa] transition-all duration-200"
            >
              <span>Services</span>
              <span>{servicesOpen ? "▴" : "▾"}</span>
            </button>

            {servicesOpen && (
              <div className="mt-3 bg-white border border-gray-200 rounded-lg shadow-md p-3 origin-top animate-fadeDown space-y-2">
                {[
                  { name: "Skin Care", path: "/skincare" },
                  { name: "Hair Care", path: "/haircare" },
                  { name: "Eye Care", path: "/eyecare" },
                  { name: "Semi-Permanent Makeup", path: "/makeup" },
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleServiceClick(item.path)}
                    className="w-full text-center px-5 py-3 text-gray-700 hover:bg-[#f1f5f5] hover:text-[#619696] rounded-md transition-all duration-200"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-[#619696]" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <div className="border-t border-gray-200 my-3"></div>

          {/* ✅ Mobile “Book Now” Button */}
          <button
            onClick={handleBookNow}
            className="w-full bg-[#619696] hover:bg-[#4d7777] text-white font-semibold py-3 rounded-full shadow-md transform transition duration-300 hover:scale-105"
          >
            Book Appoinment
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeDown {
          animation: fadeDown 0.3s ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
