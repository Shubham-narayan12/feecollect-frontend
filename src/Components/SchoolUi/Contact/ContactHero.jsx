import React from "react";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: `url('/contact main banner.jpeg')`,
        }}
      >
        {/*  Updated Overlay (Green + Dark Blend) */}
        <div className="absolute inset-0 bg-gradient-to-br bg-black/35 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <span className="inline-block px-4 py-1 mb-4 border border-green-400 text-green-400 text-sm font-semibold tracking-widest uppercase rounded-full">
            Green Field School
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Get In <span className="text-green-400">Touch</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions about admissions, academics, or campus life? Our team
            is always ready to guide you.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-green-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg
          className="relative block w-full h-[50px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#f0fdf4"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default ContactHero;
