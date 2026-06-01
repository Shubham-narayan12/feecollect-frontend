"use client";

import React, { useEffect, useState } from "react";
import { getAllBannerApi } from "../../../api/bannerApi";

function HomeHeroSlider() {
  const [banners, setBanners] = useState([]);

  const [current, setCurrent] = useState(0);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH ALL BANNERS
  // ==========================================

  const fetchAllBanners = async () => {
    try {
      setLoading(true);

      const response = await getAllBannerApi();

      setBanners(response?.banners || []);
    } catch (error) {
      console.log(error);

      alert(error?.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBanners();
  }, []);

  // ==========================================
  // AUTO SLIDER
  // ==========================================

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] lg:min-h-screen overflow-hidden">
      {/* ==========================================
          BANNERS
      ========================================== */}

      {!loading &&
        banners.length > 0 &&
        banners.map((item, index) => (
          <img
            key={item._id}
            src={item.photoUrl}
            alt={item.bannerTitle}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

      {/* ==========================================
          FALLBACK IMAGE
      ========================================== */}

      {!loading && banners.length === 0 && (
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          alt="School"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* ==========================================
          LOADING
      ========================================== */}

      {loading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
      )}

      {/* ==========================================
          OVERLAY
      ========================================== */}

      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Green Field School"
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 mb-4 object-contain"
        />

        {/* School Name */}
        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-lg leading-tight">
          Green Field School
        </h1>

        {/* Tagline */}
        <p className="text-gray-200 mt-2 text-[10px] sm:text-xs md:text-sm tracking-widest">
          FOR KNOWLEDGE & DISCIPLINE
        </p>

        {/* Description */}
        <p className="text-gray-300 mt-4 sm:mt-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl text-xs sm:text-sm md:text-base leading-relaxed">
          Green Field School is committed to providing quality education,
          nurturing young minds, and building responsible citizens for the
          future. Our campus fosters innovation, discipline, and excellence in
          every student.
        </p>
      </div>
    </section>
  );
}

export default HomeHeroSlider;