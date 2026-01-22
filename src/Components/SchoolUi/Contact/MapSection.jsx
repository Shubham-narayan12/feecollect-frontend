import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaDirections } from "react-icons/fa";

const MapSection = () => {
  // Aapke school ka full address
  const fullAddress = "AT- BEDUTOLA, POST OFFICE - THAWE, DIST- GOPALGANJ, PIN CODE - 841440";
  
  // Google Maps Embed URL (Aap apna exact location link yahan replace kar sakte hain)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.892336647226!2d84.3986!3d26.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI2JzA2LjAiTiA4NMKwMjMnNTUuMCJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin";

  return (
    <div className="relative w-full h-[550px] bg-slate-100 overflow-hidden">
      {/* 1. Google Map Iframe */}
      <iframe
        title="Thawe Central School Location"
        src={mapEmbedUrl}
        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>

      {/* 2. Floating Address Card */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="absolute top-10 left-4 md:left-10 z-20 max-w-sm bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center shadow-lg">
            <FaMapMarkedAlt />
          </div>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">Visit Our Campus</h4>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {fullAddress}
        </p>

        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#002147] hover:bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20"
        >
          Get Directions <FaDirections />
        </a>
      </motion.div>

      {/* 3. Bottom Gradient Shadow (Section transition ke liye) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MapSection;