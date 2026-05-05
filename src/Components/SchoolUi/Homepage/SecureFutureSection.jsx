import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Panel data ──────────────────────────────────────────────────────────────
const panels = [
  {
    id: 1,
    label: "SPORTS & TEAMWORK",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    position: "left",
  },
  {
    id: 2,
    label: "EXPLORATION & DISCOVERY",
    src: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800&q=80",
    position: "center",
  },
  {
    id: 3,
    label: "ATHLETICS & TEAMWORK",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    position: "right-top",
  },
  {
    id: 4,
    label: "ARTS & MUSIC",
    src: "https://images.unsplash.com/photo-1508062878650-88b52897f298?w=800&q=80",
    position: "right-bottom",
  },
];

export default function SecureFutureSection() {
  const sectionRef = useRef(null);
  const centerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        centerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, delay: 0.25, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "520px", background: "#0d1f0f" }}
    >
      {/* ── Left panel ── */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0"
        style={{ width: "26%", overflow: "hidden" }}
      >
        <img
          src={panels[0].src}
          alt={panels[0].label}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        {/* right divider line */}
        <div
          className="absolute inset-y-0 right-0"
          style={{ width: "2px", background: "rgba(126,200,112,0.5)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p
            className="text-white font-bold tracking-widest text-xs"
            style={{ letterSpacing: "0.18em" }}
          >
            {panels[0].label}
          </p>
        </div>
      </div>

      {/* ── Center panel (hero) ── */}
      <div
        ref={centerRef}
        className="absolute inset-y-0"
        style={{ left: "26%", width: "48%", overflow: "hidden" }}
      >
        <img
          src={panels[1].src}
          alt={panels[1].label}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.38)" }}
        />
        {/* left & right divider lines */}
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: "2px", background: "rgba(126,200,112,0.5)" }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{ width: "2px", background: "rgba(126,200,112,0.5)" }}
        />

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          {/* eyebrow */}
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#7EC870", letterSpacing: "0.22em" }}
          >
            WORK TOGETHER
          </p>

          {/* Headline */}
          <h2
            className="text-white font-extrabold leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.15 }}
          >
            Let's Secure Your{" "}
            <span style={{ color: "#7EC870" }}>Child's</span>
            <br />
            <span style={{ color: "#7EC870" }}>Future</span>
          </h2>

          {/* Sub-text */}
          <p
            className="text-sm leading-relaxed mb-8 max-w-sm"
            style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}
          >
            Join the Gyan Niketan family and give your child the gift of
            world-class education with values that last a lifetime.
          </p>

          {/* CTA Button */}
          <a
            href="/admissions"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 transition-all duration-300"
            style={{
              background: "#1a4731",
              color: "#fff",
              border: "2px solid #7EC870",
              borderRadius: "4px",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 20px rgba(26,71,49,0.5)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7EC870";
              e.currentTarget.style.color = "#0d1f0f";
              e.currentTarget.style.boxShadow = "0 6px 28px rgba(126,200,112,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1a4731";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,71,49,0.5)";
            }}
          >
            Apply Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
          <p
            className="text-white font-bold tracking-widest text-xs"
            style={{ letterSpacing: "0.18em" }}
          >
            {panels[1].label}
          </p>
        </div>
      </div>

      {/* ── Right panels (stacked) ── */}
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 flex flex-col"
        style={{ width: "26%" }}
      >
        {/* Right Top */}
        <div className="relative flex-1 overflow-hidden" style={{ borderBottom: "2px solid rgba(126,200,112,0.5)" }}>
          <img
            src={panels[2].src}
            alt={panels[2].label}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.45)" }}
          />
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: "2px", background: "rgba(126,200,112,0.5)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p
              className="text-white font-bold tracking-widest text-xs"
              style={{ letterSpacing: "0.15em" }}
            >
              {panels[2].label}
            </p>
          </div>
        </div>

        {/* Right Bottom */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={panels[3].src}
            alt={panels[3].label}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.45)" }}
          />
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: "2px", background: "rgba(126,200,112,0.5)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p
              className="text-white font-bold tracking-widest text-xs"
              style={{ letterSpacing: "0.15em" }}
            >
              {panels[3].label}
            </p>
          </div>
        </div>
      </div>

      {/* ── Subtle green vignette overlay on entire section ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(13,31,15,0.55) 100%)",
        }}
      />
    </section>
  );
}