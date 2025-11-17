import React from "react";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-20">

      {/* Top Wave Shape */}
      <div className="absolute top-[-60px] left-0 right-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="#0b0f10"
            fillOpacity="1"
            d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,112C840,117,960,171,1080,176C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="bg-gradient-to-b from-[#0b0f10] via-[#080c0c] to-black backdrop-blur-xl text-white px-6 py-16 rounded-t-xl shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center sm:text-left">

          {/* Branding */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-2xl font-semibold tracking-wide text-[#b9eaec] drop-shadow-md">
              Pure Bliss Clinic
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Where Beauty Meets Care
            </p>
            <p className="text-gray-500 text-sm mt-4">
              © 2025 Pure Bliss, Inc.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#b9eaec]">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="text-gray-300 hover:text-[#b9eaec] transition-all duration-200 hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#b9eaec]">Our Services</h3>
            <ul className="space-y-2">
              {[
                { to: "/skincare", label: "Skin Care" },
                { to: "/haircare", label: "Hair Care" },
                { to: "/eyecare", label: "Eye Care" },
                { to: "/makeup", label: "Semi-Permanent Makeup" },
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.to}
                    className="text-gray-300 hover:text-[#b9eaec] transition-all duration-200 hover:translate-x-1"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#b9eaec]">Connect</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/pureblissskinandeyeclinic"
                className="flex items-center hover:text-[#b9eaec] transition-all duration-200 hover:translate-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="mr-2 text-xl" /> Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1BNz4egJ37/"
                className="flex items-center hover:text-[#b9eaec] transition-all duration-200 hover:translate-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="mr-2 text-xl" /> Facebook
              </a>
              <a
                href="https://wa.me/9922442405?text=Hello,%20I'm%20interested%20in%20your%20services!"
                className="flex items-center hover:text-[#b9eaec] transition-all duration-200 hover:translate-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="mr-2 text-xl" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Designed With Care • Pure Bliss Clinic
        </div>
      </div>
    </footer>
  );
};

export default Footer;
