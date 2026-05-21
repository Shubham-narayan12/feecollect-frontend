"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  `“Education is not only about gaining knowledge, but also about shaping values, inspiring dreams, and building a brighter future for every child. At Green Field School, we believe that true learning creates confidence, discipline, and compassion in young minds. Our mission is to nurture students with wisdom, creativity, and strong moral character so they can succeed in every aspect of life. We strive to provide an environment where curiosity is encouraged, talents are discovered, and leadership qualities are developed. Every student is guided to become a responsible citizen who contributes positively to society. With dedication, innovation, and care, we prepare children to face the challenges of tomorrow with courage and determination. Together, we are building not just educated students, but future leaders of the nation.”`,
];

export default function VisionMissionSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      },
    );

    gsap.fromTo(
      contentRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-white overflow-hidden"
    >
      {/* Background Shape */}
      <div className="absolute top-0 right-0 w-60 sm:w-80 md:w-96 h-60 sm:h-80 md:h-96 rounded-full opacity-20 translate-x-1/2 -translate-y-1/2 bg-green-400" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Label */}
        <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2 text-green-500">
          From The Desk
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-10">
          Director's <span className="text-green-500">Message</span>
        </h2>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* IMAGE */}
          <div ref={imgRef} className="w-full md:w-auto flex justify-center">
            <div className="relative w-56 sm:w-64 md:w-[280px]">
              {/* Border */}
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl border-2 border-green-500" />

              <img
                src="/Director.png"
                alt="Founder"
                className="relative z-10 w-full h-64 sm:h-72 md:h-[360px] object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div ref={contentRef} className="flex-1 flex flex-col gap-4 sm:gap-6">
            {quotes.map((q, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-[3px] bg-green-500 rounded-full"></div>
                <p className="text-gray-600 italic leading-relaxed text-xs sm:text-sm md:text-[15px]">
                  {q}
                </p>
              </div>
            ))}

            {/* Name */}
            <div className="mt-4">
              <p className="text-gray-900 font-bold text-base sm:text-lg">
                ANITA KUMARI
              </p>
              <p className="text-green-500 text-xs sm:text-sm mt-1">
                Director, Green Field School
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
