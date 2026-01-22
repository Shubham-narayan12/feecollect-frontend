// AboutSchoolSection.jsx
// Premium About School Section with Motion

import React from "react";
import { motion } from "framer-motion";

const AboutSchoolSection = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 overflow-hidden">
      {/* Soft background blur shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              About <br />
              <span className="text-yellow-400">THAWE CENTRAL SCHOOL</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Welcome to{" "}
              <strong className="text-white">THAWE CENTRAL SCHOOL</strong>,
              where education meets excellence. Choosing the right school is a
              crucial decision, and we ensure a nurturing, disciplined and
              future-ready learning environment for every child.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              The school is run by{" "}
              <strong className="text-white">
                Gauri Ram Das Educational and Welfare Trust
              </strong>{" "}
              and founded by{" "}
              <strong className="text-white">Mr. Amrendra Kumar Sharma</strong>.
            </p>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl"
          >
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              THAWE CENTRAL SCHOOL operates from{" "}
              <strong className="text-white">Nursery to Class VIII</strong> and
              follows the <strong className="text-white">CBSE pattern</strong>,
              affiliated with the{" "}
              <strong className="text-white">Bihar Board</strong>.
            </p>

            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              It is a fully{" "}
              <strong className="text-white">English Medium</strong> institution
              focused on academic excellence, moral values and holistic
              development.
            </p>

            <p className="text-gray-200 text-lg leading-relaxed">
              Join{" "}
              <strong className="text-yellow-400">THAWE CENTRAL SCHOOL</strong>{" "}
              and be part of a legacy that prepares students for a bright,
              confident and successful future.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSchoolSection;
