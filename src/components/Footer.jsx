import React from "react";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const links = {
    quick: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
    ],
    services: [
      { to: "/skincare", label: "Skin Care" },
      { to: "/haircare", label: "Hair Care" },
      { to: "/eyecare", label: "Eye Care" },
      { to: "/makeup", label: "Semi-Permanent Makeup" },
    ],
  };

  const socialLinks = [
    {
      href: "https://www.instagram.com/pureblissskinandeyeclinic",
      icon: FaInstagram,
      label: "Instagram",
    },
    {
      href: "https://www.facebook.com/share/1BNz4egJ37/",
      icon: FaFacebook,
      label: "Facebook",
    },
    {
      href: "https://wa.me/9922442405?text=Hello,%20I'm%20interested%20in%20your%20services!",
      icon: FaWhatsapp,
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="mt-20">
      {/* Clean Wave */}
      <div className="w-full h-20 -mb-1">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d6b6b" />
              <stop offset="100%" stopColor="#245858" />
            </linearGradient>
          </defs>
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,65,576,69.3C672,75,768,101,864,112C960,123,1056,129,1152,122.7C1248,117,1344,99,1392,85.3L1440,72L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
            fill="url(#footerWave)"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#2d6b6b] to-[#245858] px-6 py-16 text-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">

          {/* Branding */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-xl">
              Pure Bliss Clinic
            </h2>
            <p className="text-white/90 text-lg font-medium">
              Where Beauty Meets Care
            </p>
            <p className="text-white/70 text-sm">
              © 2026 Pure Bliss Clinic. All rights reserved.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-white/90">Quick Links</h3>
            <ul className="space-y-3">
              {links.quick.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-center gap-2 w-full bg-[#2d6b6b] hover:bg-[#245858] text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-2xl shadow-lg shadow-[#2d6b6b]/25 transition-colors duration-200 group"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-white/90">Our Services</h3>
            <ul className="space-y-3">
              {links.services.map((service) => (
                <li key={service.to}>
                  <Link
                    to={service.to}
                    className="flex items-center justify-center gap-2 w-full bg-[#2d6b6b] hover:bg-[#245858] text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-2xl shadow-lg shadow-[#2d6b6b]/25 transition-colors duration-200 group"
                  >
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-white/90">Connect With Us</h3>
            <div className="flex justify-center lg:justify-start space-x-6">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-[#2d6b6b] hover:bg-[#245858] rounded-2xl shadow-lg shadow-[#2d6b6b]/25 transition-all duration-200 hover:-translate-y-1 border border-white/10"
                >
                  <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Line - Using exact button style */}
        <div className="mt-16 pt-12 border-t border-white/20 text-center">
          <div className="flex items-center justify-center gap-2 w-full bg-[#2d6b6b] hover:bg-[#245858] text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-2xl shadow-lg shadow-[#2d6b6b]/25 transition-colors duration-200 inline-flex">
            Pure Bliss Clinic | Skin • Hair • Eye Wellness
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
