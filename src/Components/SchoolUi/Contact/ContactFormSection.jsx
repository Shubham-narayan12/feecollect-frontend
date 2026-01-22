import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const ContactFormSection = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 overflow-hidden border border-gray-50">
      <div className="p-8 md:p-16 bg-white">
        {/* Header Text */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
            Send an <span className="text-blue-900">Enquiry</span>
          </h3>
          <p className="text-gray-500 italic max-w-md mx-auto">
            Whether you have a request, a query, or want to know about THAWE CENTRAL SCHOOL, use the form below to get in touch with our team.
          </p>
        </div>
        
        {/* Main Form */}
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Name</label>
              <input type="text" placeholder="First name" className="custom-input" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Last name</label>
              <input type="text" placeholder="Last name" className="custom-input" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Mobile No*</label>
              <input type="tel" placeholder="+91 00000 00000" className="custom-input" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Your email*</label>
              <input type="email" placeholder="example@mail.com" className="custom-input" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Message*</label>
            <textarea rows="5" placeholder="How can we help you?" className="custom-input resize-none"></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "#eab308" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-400 text-[#002147] font-extrabold py-5 rounded-2xl shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-3 transition-all text-lg"
            >
              SUBMIT MESSAGE <FaPaperPlane className="text-sm" />
            </motion.button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .custom-input {
          width: 100%;
          padding: 16px 24px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          color: #1e293b;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .custom-input:focus {
          outline: none;
          background: white;
          border-color: #fbbf24;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ContactFormSection;