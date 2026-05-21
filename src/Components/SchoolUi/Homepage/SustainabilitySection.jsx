import React, { useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const testimonials = [
  {
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply dummy text of the printing and typesetting industry.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply dummy text of the printing and typesetting industry.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply dummy text of the printing and typesetting industry.",
    name: "Johndove",
    role: "Data Analysis",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
];

function TestimonialCard({ t }) {
  return (
    <div
      style={{
        minWidth: "min(82vw, 300px)",
        maxWidth: "300px",
        marginRight: "16px",
        flexShrink: 0,
      }}
    >
      {/* Quote box */}
      <div
        style={{
          backgroundColor: "#7EC870",
          borderRadius: "12px",
          padding: "18px 18px 20px",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: "2rem",
            color: "rgba(255,255,255,0.75)",
            fontFamily: "serif",
            lineHeight: 1,
            display: "block",
          }}
        >
          ❝
        </span>
        <p
          style={{
            color: "#fff",
            fontSize: "13px",
            lineHeight: 1.65,
            marginTop: "6px",
          }}
        >
          {t.quote}
        </p>

        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            bottom: "-12px",
            left: "20px",
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "12px solid #7EC870",
          }}
        />
      </div>

      {/* Profile */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "22px",
          paddingLeft: "4px",
        }}
      >
        <img
          src={t.img}
          alt={t.name}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #7EC870",
            flexShrink: 0,
          }}
        />
        <div>
          <p style={{ fontWeight: 600, fontSize: "13px", color: "#111" }}>
            {t.name}
          </p>
          <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
            {t.role}
          </p>
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
    if (!original) return;
    const clone = original.cloneNode(true);
    track.appendChild(clone);

    const speed = 0.5;
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
    <section
      style={{
        backgroundColor: "#fff",
        paddingTop: "clamp(32px, 6vw, 64px)",
        paddingBottom: "clamp(32px, 6vw, 64px)",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          paddingLeft: "clamp(16px, 4vw, 24px)",
          paddingRight: "clamp(16px, 4vw, 24px)",
          marginBottom: "clamp(24px, 5vw, 48px)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(20px, 5vw, 30px)",
            fontWeight: 800,
            color: "#111",
            marginBottom: "8px",
          }}
        >
          What Students Say
        </h2>
        <div
          style={{
            width: "48px",
            height: "3px",
            backgroundColor: "#f5a623",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Slider */}
      <div
        style={{ overflow: "hidden", width: "100%", cursor: "pointer" }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => {
          setTimeout(() => (pausedRef.current = false), 1200);
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            willChange: "transform",
            paddingBottom: "16px",
          }}
        >
          <div
            className="marquee-inner"
            style={{
              display: "flex",
              paddingLeft: "clamp(16px, 4vw, 24px)",
            }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "clamp(16px, 4vw, 32px)",
          right: "clamp(16px, 4vw, 32px)",
          backgroundColor: "#7EC870",
          color: "#fff",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
          zIndex: 50,
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </section>
  );
}
