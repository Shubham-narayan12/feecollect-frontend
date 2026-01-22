// CallToActionSection.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

const CallToActionSection = () => {
  return (
    <section className="relative w-full py-24 bg-[#020617] overflow-hidden">
      
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side – Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide">
            GET IN TOUCH
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
            Have Questions? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Contact Us
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            Whether you have a request, a query, or want to know about{" "}
            <span className="text-white font-bold border-b-2 border-yellow-400/50">
              THAWE CENTRAL SCHOOL
            </span>
            , we are here to help you.
          </p>

          {/* Info Cards */}
          <div className="space-y-8">
            <ContactInfo 
              icon={<FaMapMarkerAlt />} 
              title="Our Location" 
              desc="AT- BEDUTOLA, PO- THAWE, DIST- GOPALGANJ, 841440" 
            />
            <ContactInfo 
              icon={<FaPhoneAlt />} 
              title="Call Support" 
              desc="+91 94714 04548, +91 70501 54850" 
            />
            <ContactInfo 
              icon={<FaClock />} 
              title="Opening Hours" 
              desc="07:00 AM - 04:00 PM (Mon - Sat)" 
              isClosed={true}
            />
          </div>
        </motion.div>

        {/* Right Side – Modern Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Form Card Decor */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <form className="relative bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
            
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <CustomInput type="text" placeholder="First Name" />
              <CustomInput type="text" placeholder="Last Name" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <CustomInput type="tel" placeholder="Mobile Number" />
              <CustomInput type="email" placeholder="Email Address" />
            </div>

            <textarea
              rows="4"
              placeholder="How can we help you?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 transition-all mb-8 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full group relative flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-yellow-400/20"
            >
              <span>Submit Message</span>
              <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// Sub-component for Contact Details
const ContactInfo = ({ icon, title, desc, isClosed }) => (
  <div className="flex items-center gap-5 group">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-yellow-400 text-xl group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h4>
      <p className="text-white text-lg font-medium">
        {desc} {isClosed && <span className="text-red-500 text-sm ml-2 font-bold">(Sunday Closed)</span>}
      </p>
    </div>
  </div>
);

// Sub-component for Inputs
const CustomInput = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 transition-all"
  />
);

export default CallToActionSection;