import React, { useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const testimonials = [
  {
    quote: "Contrary to popular belief, Lorem Ipsum is not simply dummy text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, look.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Contrary to popular belief, Lorem Ipsum is not simply dummy text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, look.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Contrary to popular belief, Lorem Ipsum is not simply dummy text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, look.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Contrary to popular belief, Lorem Ipsum is not simply dummy text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, look.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Contrary to popular belief, Lorem Ipsum is not simply dummy text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, look.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Contrary to popular belief, Lorem Ipsum is not simply dummy text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, look.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
  },
];

function TestimonialCard({ t }) {
  return (
    <div style={{ minWidth: 320, maxWidth: 320, marginRight: 28, flexShrink: 0 }}>
      {/* Quote box */}
      <div style={{ background: "#7EC870", borderRadius: 8, padding: "24px 22px", position: "relative" }}>
        <span style={{ fontSize: 44, color: "rgba(255,255,255,0.85)", fontFamily: "Georgia,serif", lineHeight: 1 }}>❝</span>
        <p style={{ color: "#fff", fontSize: 14.5, lineHeight: 1.7, marginTop: 4 }}>{t.quote}</p>
        {/* Arrow pointer */}
        <div style={{
          position: "absolute", bottom: -20, left: 36,
          width: 0, height: 0,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderTop: "20px solid #7EC870",
        }} />
      </div>
      {/* Person */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 32, paddingLeft: 8 }}>
        <img src={t.img} alt={t.name} style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: "2.5px solid #7EC870" }} />
        <div>
          <p style={{ fontWeight: 700, color: "#111", fontSize: 15 }}>{t.name}</p>
          <p style={{ color: "#888", fontSize: 13 }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function SustainabilitySection() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Clone all cards for seamless loop
    const original = track.querySelector(".marquee-inner");
    const clone = original.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);

    const speed = 0.8;

    const step = () => {
      if (!pausedRef.current) {
        posRef.current -= speed;
        const totalW = original.offsetWidth;
        if (Math.abs(posRef.current) >= totalW) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section style={{ background: "#fff", padding: "60px 0", overflow: "hidden" }}>

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
        {/* Heading */}
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111", marginBottom: 8 }}>
          What Student Say's About Courses
        </h2>
        <div style={{ width: 64, height: 3, background: "#e6a817", borderRadius: 2, marginBottom: 40 }} />
      </div>

      {/* Scrolling strip — full width, no padding */}
      <div
        style={{ overflow: "hidden", width: "100%", cursor: "pointer" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div
          ref={trackRef}
          style={{ display: "flex", willChange: "transform", paddingBottom: 16 }}
        >
          <div
            className="marquee-inner"
            style={{ display: "flex", paddingLeft: 24 }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed", bottom: 32, right: 32,
          background: "#7EC870", color: "#fff",
          border: "none", borderRadius: "50%",
          width: 48, height: 48,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 50,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <ArrowUp size={20} />
      </button>

    </section>
  );
}