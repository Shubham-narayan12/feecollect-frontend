import React from "react";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
      {/* 1. Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop')`, // Aap apni school building ki photo yahan daal sakte hain
        }}
      >
        {/* Dark Blue Overlay - School theme se match karne ke liye */}
        <div className="absolute inset-0 bg-[#002147]/80 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Chhota Tagline */}
          <span className="inline-block px-4 py-1 mb-4 border border-yellow-400 text-yellow-400 text-sm font-semibold tracking-widest uppercase rounded-full">
            Thawe Central School
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Get In <span className="text-yellow-400">Touch</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions about admissions, academics, or campus life? 
            Our dedicated team is here to provide all the information you need.
          </p>
        </motion.div>

        {/* 3. Decorative Scroll Indicator (Optional) */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Curve Design (Section transition ke liye) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
};

export default ContactHero;