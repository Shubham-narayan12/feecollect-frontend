// WhyChooseUsSection.jsx
// School About Us – Why Choose Our School

import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaStar,
  FaChalkboardTeacher,
  FaBuilding,
  FaSchool,
  FaUsers,
  FaHeart,
  FaComments,
} from "react-icons/fa";

const features = [
  {
    title: "Quality Education",
    icon: <FaGraduationCap />,
  },
  {
    title: "School Feature",
    icon: <FaStar />,
  },
  {
    title: "Fully English Medium & CBSE-Based Teaching",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Own Building",
    icon: <FaBuilding />,
  },
  {
    title: "Good Infrastructure",
    icon: <FaSchool />,
  },
  {
    title: "Well Experienced & Dedicated Faculties",
    icon: <FaUsers />,
  },
  {
    title: "Value Based Curriculum",
    icon: <FaHeart />,
  },
  {
    title: "Interactive Atmosphere",
    icon: <FaComments />,
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Glow effects */}
      <div className="absolute -top-24 right-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

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
            Why Choose <span className="text-yellow-400">Our School</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Excellence in education, values and holistic development
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06 }}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl cursor-pointer"
            >
              <div className="text-4xl text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="text-base font-semibold text-white leading-snug">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
