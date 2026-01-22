// VisionMissionSection.jsx
// School About Us – Vision & Mission Section

import React from "react";
import { motion } from "framer-motion";

const VisionMissionSection = () => {
  return (
    <section className="relative w-full py-24 bg-slate-950 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Our <span className="text-yellow-400">Vision & Mission</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Guiding principles that shape our students and future leaders
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* VISION */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed">
              To nurture young minds with knowledge, discipline and strong moral
              values, empowering them to become confident, responsible and
              compassionate individuals who contribute positively to society and
              the nation.
            </p>
          </motion.div>

          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed">
              To provide quality education through modern teaching methods,
              experienced faculty and a supportive learning environment that
              fosters academic excellence, character development and lifelong
              learning.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
