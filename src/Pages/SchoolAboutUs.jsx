// SchoolAboutUs.jsx
import React from "react";
import HeroSection from "../Components/SchoolUi/Aboutus/HeroSection";
import AboutSchoolSection from "../Components/SchoolUi/Aboutus/AboutSchoolSection";
import VisionMissionSection from "../Components/SchoolUi/Homepage/VisionMissionSection";
import FacilitiesSection from "../Components/SchoolUi/Aboutus/FacilitiesSection";
import WhyChooseUsSection from "../Components/SchoolUi/Aboutus/WhyChooseUsSection";
import CallToActionSection from "../Components/SchoolUi/Aboutus/CallToActionSection";

const SchoolAboutUs = () => {
  return (
    <main className="w-full bg-slate-50 overflow-x-hidden">
      {/* 1️⃣ Hero Section - Full Height with Overlay focus */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        <HeroSection />
      </section>

      {/* 2️⃣ Introduction / About School - Added Curved Divider */}
      <div className="relative z-10 -mt-10 bg-white rounded-t-[50px] shadow-2xl overflow-hidden">
        <section className="py-20 px-4 md:px-0 container mx-auto">
          <AboutSchoolSection />
        </section>
      </div>

      {/* 3️⃣ Vision & Mission - Subtle Gradient Background */}
      <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative">
        {/* Decorative Element */}
        <div className="absolute top-10 left-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto">
          <VisionMissionSection />
        </div>
      </section>

      {/* 4️⃣ Management / Facilities - Card Style Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
              Our Infrastructure
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              World Class Facilities
            </h2>
          </div>
          <FacilitiesSection />
        </div>
      </section>

      {/* 5️⃣ Why Choose Our School - Dark Theme Contrast */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="container mx-auto relative z-10">
          <WhyChooseUsSection />
        </div>
      </section>

      {/* 6️⃣ Call To Action - Clean Transition */}
      <section className="w-full">
        {/* Humne pichle message mein CTA ko already premium design kar diya tha, 
            isliye yahan extra padding ki zarurat nahi hogi */}
        <CallToActionSection />
      </section>
    </main>
  );
};

export default SchoolAboutUs;
