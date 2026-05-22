// FacilitiesSection.jsx
// Thawe Central School — Kindergarten, Day Care & After-School Tuition

import React from "react";
import { motion } from "framer-motion";

const features = {
  daycare: [
    { icon: "🎨", text: "Play-based early learning environment" },
    { icon: "👶", text: "Trained caregivers & safe day-care facility" },
    { icon: "🍱", text: "Nutritious meals & supervised rest time" },
    { icon: "❤️", text: "Social & emotional development focus" },
  ],
  tuition: [
    { icon: "🧑‍🏫", text: "Expert faculty for all core subjects" },
    { icon: "📝", text: "Homework help & exam preparation" },
    { icon: "📊", text: "Individual progress tracking & reports" },
    { icon: "🏫", text: "Small batch sizes for personalised attention" },
  ],
};

const FacilitiesSection = () => {
  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-green-950 via-emerald-900 to-green-950 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-green-400/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-16 w-72 h-72 bg-green-400/12 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-48 bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-green-400/8 border border-green-400/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-white/70 text-xs tracking-widest uppercase font-sans">
              Our Facilities
            </span>
            <span className="w-2 h-2 bg-green-300 rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            More Than Just <span className="text-green-400">Classrooms</span>
          </h2>
          <p className="text-white/50 text-sm mt-3 font-sans tracking-wide">
            At Thawe Central School, we care beyond school hours
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Kindergarten & Day Care Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-white/5 to-green-400/7 border border-green-400/25 rounded-2xl p-8 overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/12 to-transparent rounded-2xl" />

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                🌱
              </div>
              <div>
                <h3 className="text-white text-xl font-bold leading-tight">
                  Kindergarten &
                </h3>
                <h3 className="text-green-400 text-xl font-bold">Day Care</h3>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed font-sans mb-6">
              A safe, joyful and nurturing space where your little ones take
              their very first steps toward learning — with{" "}
              <strong className="text-white/80">warmth, play and care</strong>{" "}
              at the centre of everything we do.
            </p>

            <div className="flex flex-col gap-3">
              {features.daycare.map(({ icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 h-8 bg-green-400/15 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                    {icon}
                  </span>
                  <span className="text-white/70 text-sm font-sans">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-green-400/18">
              <span className="bg-green-400/10 text-green-400 text-xs font-sans px-4 py-1.5 rounded-full border border-green-400/25 tracking-wide">
                Ages 2 – 5 years
              </span>
            </div>
          </motion.div>

          {/* After-School Tuition Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-white/5 to-green-300/6 border border-green-300/22 rounded-2xl p-8 overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-300/10 to-transparent rounded-2xl" />

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-green-300 to-green-600 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                📚
              </div>
              <div>
                <h3 className="text-white text-xl font-bold leading-tight">
                  After-School
                </h3>
                <h3 className="text-green-300 text-xl font-bold">
                  Tuition Centre
                </h3>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed font-sans mb-6">
              Our dedicated tuition programme ensures every student masters
              their curriculum with confidence — guided by{" "}
              <strong className="text-white/80">expert teachers</strong> in a
              structured, focused after-hours setting.
            </p>

            <div className="flex flex-col gap-3">
              {features.tuition.map(({ icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 h-8 bg-green-300/10 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                    {icon}
                  </span>
                  <span className="text-white/70 text-sm font-sans">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-green-300/18">
              <span className="bg-green-300/8 text-green-300 text-xs font-sans px-4 py-1.5 rounded-full border border-green-300/22 tracking-wide">
                Class I – VIII &nbsp;|&nbsp; Mon – Sat
              </span>
            </div>
          </motion.div>
        </div>

        {/* CTA Footer Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 bg-green-400/5 border border-green-400/15 rounded-2xl px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
        >
          <div>
            <p className="text-white/90 font-semibold text-base font-sans mb-1">
              Interested in enrolling your child?
            </p>
            <p className="text-white/45 text-sm font-sans">
              Admissions open for 2025–26 academic session
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold font-sans px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
              Enquire Now
            </button>
            <button className="bg-green-400/8 border border-green-400/20 text-white/70 text-sm font-sans px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
