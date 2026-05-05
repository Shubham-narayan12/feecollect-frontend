"use client";
import React, { useEffect, useState } from "react";

function HomeHeroSlider() {
  const images = [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600",
  ];

  const [current, setCurrent] = useState(0);

  // Auto change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[610px] overflow-hidden">

      {/* Background Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="School"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Center Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">

        {/* Logo */}
        <img
          src="/logo.png"
          alt="Green Field School"
          className="w-48 h-48 md:w-52 md:h-52 mb-4 object-contain"
        />

        {/* School Name */}
        <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
          Green Field School
        </h1>

        {/* Tagline */}
        <p className="text-gray-200 mt-2 text-sm md:text-base tracking-widest">
          FOR KNOWLEDGE & DISCIPLINE
        </p>

        {/* Description */}
        <p className="text-gray-300 mt-6 max-w-4xl text-sm md:text-base leading-relaxed">
          Green Field School is committed to providing quality education,
          nurturing young minds, and building responsible citizens for the future.
          Our campus fosters innovation, discipline, and excellence in every student.
        </p>
      </div>

      {/* Right Green Notice Box */}
      

    </section>
  );
}

export default HomeHeroSlider;