import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  `"Education is not just about acquiring knowledge; it's about transforming lives and building character. At Gyan Niketan, we believe in nurturing not just academic excellence, but also moral values, leadership qualities, and social responsibility."`,
  `"When I founded Gyan Niketan in 1986, my vision was simple yet profound—to create an institution that would not only impart quality education but also shape responsible citizens who contribute positively to society. Today, as I look back at our journey, I am proud to see how this vision has become a reality. Our students have excelled academically and grown into compassionate leaders, innovative thinkers, and responsible global citizens."`,
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
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      contentRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Faint bg circle */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 translate-x-1/2 -translate-y-1/2"
        style={{ background: "#7EC870" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Label */}
        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
          style={{ color: "#7EC870" }}
        >
          From The Desk
        </p>

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10">
          Founder's{" "}
          <span style={{ color: "#7EC870" }}>Message</span>
        </h2>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Left — Photo */}
          <div ref={imgRef} className="flex-shrink-0">
            <div className="relative w-[300px]">
              {/* Green corner accent */}
              <div
                className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl z-0"
                style={{ border: "2px solid #7EC870" }}
              />
              <img
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=480&fit=crop&crop=face"
                alt="Founder"
                className="relative z-10 w-full h-[380px] object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right — Quotes + Name */}
          <div ref={contentRef} className="flex-1 flex flex-col gap-6 pt-2">

            {quotes.map((q, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="w-1 flex-shrink-0 rounded-full"
                  style={{ background: "#7EC870" }}
                />
                <p className="text-gray-600 italic leading-relaxed text-[15.5px]">
                  {q}
                </p>
              </div>
            ))}

            {/* Name */}
            <div className="mt-4">
              <p className="text-gray-900 font-bold text-lg">
                Padma Shree Acharya Kishore Kunal
              </p>
              <p
                className="font-medium text-sm mt-1"
                style={{ color: "#7EC870" }}
              >
                Founder, Gyan Niketan School, Patna
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}