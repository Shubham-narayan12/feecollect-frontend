import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const SchoolFooter = () => {
  return (
    <footer className="bg-[#eef7ee] text-center py-12">

      {/* Logo */}
      <img
        src="/logo.png"
        alt="logo"
        className="w-100 h-55 mx-auto mb-3 object-contain"
      />

      

      {/* School Name */}
      <h2 className="text-4xl font-bold text-green-700 mb-3">
        Green Field School
      </h2>

      {/* Address */}
      <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
        AT - Lohiya Patna, Patna-14, DIST - Patna,
        PIN CODE - 800014, BIHAR, INDIA
      </p>

      {/* Phone */}
      <p className="mt-3 text-gray-700">
        📞 +91 - 9334205858
      </p>

      {/* Email */}
      <p className="text-gray-700">
        ✉️ thawecentralschool@gmail.com
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-5">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer">
          <Facebook size={18} />
        </div>
        <div className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center cursor-pointer">
          <Twitter size={18} />
        </div>
        <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center cursor-pointer">
          <Instagram size={18} />
        </div>
        <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer">
          <Linkedin size={18} />
        </div>
      </div>

      {/* Menu Links */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 text-gray-700 text-sm">
        <a href="#">Home</a>
        <a href="#">About us</a>
        <a href="#">Event</a>
        <a href="#">Gallery</a>
        <a href="#">Courses</a>
        <a href="#">Contact Us</a>
      </div>

    </footer>
  );
};

export default SchoolFooter;