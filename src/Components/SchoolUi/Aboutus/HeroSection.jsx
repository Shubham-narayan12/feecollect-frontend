import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=2448,h=1310,fit=crop/dOqNXeekPrHE45km/tsc-school-1---copy-AGBvZob37oSBNpvr.jpg"
          alt="School Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Header with Logo */}
        <div className="bg-[#8B1538]/95 py-4 px-8 flex items-center justify-center">
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=259,fit=crop/dOqNXeekPrHE45km/tcs-logo-123-d95rjaVGMBUEGBLg.png"
            alt="Thawe Central School Logo"
            className="h-24 w-auto mr-6"
          />
          <h1 className="text-white text-5xl md:text-6xl font-bold tracking-wide">
            THAWE CENTRAL SCHOOL
          </h1>
        </div>

        {/* Main Content Area with White/Light Background */}
        <div className="relative bg-gray-50/95 backdrop-blur-sm">
          {/* Background Image for this section */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=2448,h=1310,fit=crop/dOqNXeekPrHE45km/tsc-school-1---copy-AGBvZob37oSBNpvr.jpg"
              alt="School Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center px-8 py-20">
            {/* Large Title */}
            <h2 className="text-[#8B1538] text-7xl md:text-8xl font-bold text-center mb-8 tracking-tight">
              THAWE CENTRAL
            </h2>
            <h2 className="text-[#8B1538] text-7xl md:text-8xl font-bold text-center mb-12 tracking-tight">
              SCHOOL
            </h2>

            {/* Tagline */}
            <p className="text-gray-700 text-xl md:text-2xl text-center max-w-3xl mb-8 font-medium">
              Empowering Students with Excellence in Education, Character & Innovation
            </p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
              <div className="bg-white/95 rounded-lg p-6 shadow-xl text-center backdrop-blur-sm">
                <div className="text-[#8B1538] text-4xl font-bold mb-2">25+</div>
                <div className="text-gray-600 font-medium">Years of Excellence</div>
              </div>
              <div className="bg-white/95 rounded-lg p-6 shadow-xl text-center backdrop-blur-sm">
                <div className="text-[#8B1538] text-4xl font-bold mb-2">2000+</div>
                <div className="text-gray-600 font-medium">Students</div>
              </div>
              <div className="bg-white/95 rounded-lg p-6 shadow-xl text-center backdrop-blur-sm">
                <div className="text-[#8B1538] text-4xl font-bold mb-2">100+</div>
                <div className="text-gray-600 font-medium">Expert Faculty</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sanskrit Motto at Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 bg-gray-50/95 backdrop-blur-sm px-6 py-2 rounded-lg">
        <p className="text-[#8B1538] text-xl font-semibold">
          सा विद्या या विमुक्तये
        </p>
      </div>
    </section>
  );
};

export default HeroSection;