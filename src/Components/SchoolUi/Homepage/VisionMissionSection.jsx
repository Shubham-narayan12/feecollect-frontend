import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionMissionSection() {
  const sectionRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [visionRef.current, missionRef.current],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-[#fde9d6] overflow-hidden"
    >
      {/* Soft background circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">

          {/* OUR VISION */}
          <div
            ref={visionRef}
            className="bg-[#0b4a91] text-white p-12 md:p-14 relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-2xl">
                👁️
              </div>
              <h3 className="text-2xl font-bold tracking-wide uppercase">
                Our Vision
              </h3>
            </div>

            <div className="w-20 h-[3px] bg-yellow-400 mb-6" />

            <p className="leading-relaxed text-white/90 text-[15.5px]">
              Blending academic excellence with Indian values, creativity and
              innovation, we aim to nurture future-ready individuals.
              Sustainable, inclusive and technologically advanced learning
              environments empower students to lead with integrity, compassion
              and global awareness.
            </p>

            {/* Accent */}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-sm" />
              <span className="w-3 h-3 bg-red-400 rounded-sm" />
              <span className="w-3 h-3 bg-blue-400 rounded-sm" />
            </div>
          </div>

          {/* OUR MISSION */}
          <div
            ref={missionRef}
            className="bg-[#ef4136] text-white p-12 md:p-14 relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="text-2xl font-bold tracking-wide uppercase">
                Our Mission
              </h3>
            </div>

            <div className="w-20 h-[3px] bg-yellow-400 mb-6" />

            <p className="leading-relaxed text-white/90 text-[15.5px]">
              With emphasis on creating a positive and inclusive campus, we
              strive to educate with a global perspective. Infusion of latest
              technology enhances each student’s learning curve. Respect for the
              environment through community service and fostering love for
              Indian art and culture defines our commitment to society.
            </p>

            {/* Accent */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-sm" />
              <span className="w-3 h-3 bg-red-400 rounded-sm" />
              <span className="w-3 h-3 bg-blue-400 rounded-sm" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
