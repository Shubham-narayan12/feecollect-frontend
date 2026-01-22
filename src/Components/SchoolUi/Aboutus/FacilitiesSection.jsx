// FacilitiesSection.jsx
// School About Us – Facilities Section

import React from "react";
import { motion } from "framer-motion";
import {
  FaSchool,
  FaDesktop,
  FaFingerprint,
  FaBus,
  FaCogs,
  FaVideo,
  FaBookOpen,
} from "react-icons/fa";

const facilities = [
  {
    title: "Big Campus",
    icon: <FaSchool />,
  },
  {
    title: "Computer Lab",
    icon: <FaDesktop />,
  },
  {
    title: "Biometric System",
    icon: <FaFingerprint />,
  },
  {
    title: "Transport Facilities",
    icon: <FaBus />,
  },
  {
    title: "Digitally Managed",
    icon: <FaCogs />,
  },
  {
    title: "CCTV Surveillance",
    icon: <FaVideo />,
  },
  {
    title: "Best Education Plan",
    icon: <FaBookOpen />,
  },
];

const FacilitiesSection = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            We Provide <br />
            <span className="text-yellow-400">The Best Facilities</span>
          </h2>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {facilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl cursor-pointer"
            >
              <div className="text-4xl text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
