import React, { useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const testimonials = [
  {
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply dummy text...",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply dummy text...",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply dummy text...",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="min-w-[85%] sm:min-w-[320px] max-w-[320px] mr-4 sm:mr-7 flex-shrink-0">
      {/* Quote box */}
      <div className="bg-[#7EC870] rounded-lg p-5 sm:p-6 relative">
        <span className="text-4xl text-white/80 font-serif">❝</span>
        <p className="text-white text-sm leading-relaxed mt-2">{t.quote}</p>

        {/* Arrow */}
        <div
          className="absolute -bottom-4 left-6 w-0 h-0 
          border-l-[15px] border-r-[15px] border-t-[15px] 
          border-l-transparent border-r-transparent border-t-[#7EC870]"
        />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 mt-8 pl-2">
        <img
          src={t.img}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#7EC870]"
        />
        <div>
          <p className="font-bold text-sm text-gray-900">{t.name}</p>
          <p className="text-xs text-gray-500">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function SustainabilitySection() {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const original = track.querySelector(".marquee-inner");
    const clone = original.cloneNode(true);
    track.appendChild(clone);

    const speed = window.innerWidth < 640 ? 0.4 : 0.8; // slower on mobile

    let anim;

    const step = () => {
      if (!pausedRef.current) {
        posRef.current -= speed;
        const totalW = original.offsetWidth;
        if (Math.abs(posRef.current) >= totalW) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      anim = requestAnimationFrame(step);
    };

    anim = requestAnimationFrame(step);

    return () => cancelAnimationFrame(anim);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="bg-white py-12 sm:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          What Students Say
        </h2>
        <div className="w-16 h-[3px] bg-yellow-500 mb-8 sm:mb-12" />
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden w-full cursor-pointer"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div ref={trackRef} className="flex will-change-transform pb-4">
          <div className="marquee-inner flex pl-4 sm:pl-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 
        bg-[#7EC870] text-white w-11 h-11 sm:w-12 sm:h-12 
        flex items-center justify-center rounded-full shadow-lg z-50"
      >
        <ArrowUp size={18} />
      </button>
    </section>
  );
}
