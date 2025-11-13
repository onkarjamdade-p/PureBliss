import React from "react";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
        {/* Branding */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-lg font-semibold">© Pure Bliss, Inc.</h2>
          <p className="text-sm mt-1 text-gray-300">All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 text-[#b9eaec] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-400 text-[#b9eaec] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-400 text-[#b9eaec] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Our Services</h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/skincare"
                className="hover:text-gray-400 text-[#b9eaec] transition-colors"
              >
                Skin Care
              </Link>
            </li>
            <li>
              <Link
                to="/haircare"
                className="hover:text-gray-400 text-[#b9eaec] transition-colors"
              >
                Hair Care
              </Link>
            </li>
            <li>
              <Link
                to="/eyecare"
                className="hover:text-gray-400 text-[#b9eaec] transition-colors"
              >
                Eye Care
              </Link>
            </li>
            <li>
              <Link
                to="/makeup"
                className="hover:text-gray-400 text-[#b9eaec] transition-colors"
              >
                Semi-Permanent Makeup
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="https://www.instagram.com/pureblissskinandeyeclinic"
              className="flex items-center hover:text-gray-400 text-[#b9eaec] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="mr-2" /> Instagram
            </a>
            <a
              href="https://www.facebook.com"
              className="flex items-center hover:text-gray-400 text-[#b9eaec] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="mr-2" /> Facebook
            </a>
            <a
              href="https://wa.me/9922442405?text=Hello,%20I'm%20interested%20in%20your%20services!"
              className="flex items-center hover:text-gray-400 text-[#b9eaec] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip for mobile */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400 sm:hidden">
        Pure Bliss © 2025
      </div>
    </footer>
  );
};

export default Footer;
