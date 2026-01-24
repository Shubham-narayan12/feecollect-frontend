import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const images = [
  "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=900&q=80",
];

export default function WelcomeSection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.set(cardsRef.current, {
      y: (i) => i * 18,
      rotation: (i) => (i === 1 ? 6 : i === 2 ? -6 : 0),
      scale: (i) => 1 - i * 0.05,
      zIndex: (i) => 10 - i,
    });
  }, []);

  const rotateStack = () => {
    const cards = cardsRef.current;

    gsap.to(cards[0], {
      y: 50,
      rotation: -12,
      scale: 0.9,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        cards.push(cards.shift());

        gsap.to(cards, {
          y: (i) => i * 18,
          rotation: (i) => (i === 1 ? 6 : i === 2 ? -6 : 0),
          scale: (i) => 1 - i * 0.05,
          zIndex: (i) => 10 - i,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });
  };

  return (
    <section
      className="py-30 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/cream-color-background-cer0c76lelrr1679.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-red-600 font-medium mb-3">Warm Welcome To</p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
            THAWE CENTRAL SCHOOL <span className="text-orange-500">PATNA</span>
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              At Thawe Central School Patna, we are committed to nurturing young
              minds and shaping them into confident, responsible and
              compassionate global citizens.
            </p>

            <p>
              Our institution blends strong academic foundations with modern
              facilities, creative learning, sports, and character development
              to ensure holistic growth.
            </p>

            <p>
              We strive to inspire curiosity, discipline, and lifelong learning
              so that every child is prepared for the future.
            </p>
          </div>

          <button className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition">
            Click Photos
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* RIGHT IMAGE STACK */}
        <div className="flex justify-center lg:justify-end">
          <div
            className="relative w-[360px] h-[460px] cursor-pointer select-none"
            onClick={rotateStack}
          >
            {images.map((img, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl bg-white"
              >
                <img
                  src={img}
                  alt="School Life"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
