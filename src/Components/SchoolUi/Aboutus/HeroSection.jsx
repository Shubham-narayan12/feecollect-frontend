// HeroSection.jsx
// School About Us Page – Hero Section

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[70vh]">
      {/* Background Image */}
      <img
        src="/images/school-building.jpg" // school building image
        alt="School Building"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        {/* School Logo */}
        <img
          src="/images/school-logo.jpg" // school logo
          alt="School Logo"
          className="w-28 h-28 mb-4 bg-white p-2 rounded-full"
        />

        {/* School Name */}
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          ABC Public School
        </h1>

        {/* Tagline */}
        <p className="text-base md:text-lg max-w-2xl">
          Shaping Young Minds with Knowledge, Discipline & Values
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

/*
📁 Required folder structure:
public/
 └── images/
     ├── school-building.jpg
     └── school-logo.png
*/
