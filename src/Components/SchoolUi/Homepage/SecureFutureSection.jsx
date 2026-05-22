import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        gsap.fromTo(
          leftRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          },
        );
        gsap.fromTo(
          centerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          },
        );
        gsap.fromTo(
          rightRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          },
        );
      } else {
        // Mobile: fade in stacked panels
        const targets = [centerRef.current, bottomRef.current].filter(Boolean);
        gsap.fromTo(
          targets,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Inject responsive CSS */}
      <style>{`
        .sfs-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #0d1f0f;
        }

        /* ── DESKTOP layout (side-by-side panels) ── */
        .sfs-desktop {
          display: flex;
          height: 520px;
        }
        .sfs-mobile {
          display: none;
        }

        /* ── MOBILE layout (stacked) ── */
        @media (max-width: 767px) {
          .sfs-desktop {
            display: none;
          }
          .sfs-mobile {
            display: flex;
            flex-direction: column;
          }

          /* Hero card */
          .sfs-hero {
            position: relative;
            width: 100%;
            min-height: 420px;
            overflow: hidden;
          }
          .sfs-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            inset: 0;
            filter: brightness(0.38);
          }
          .sfs-hero-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 48px 24px 40px;
            min-height: 420px;
          }

          /* Bottom row: 3 thumbnail panels */
          .sfs-thumbs {
            display: flex;
            height: 110px;
            border-top: 2px solid rgba(126,200,112,0.4);
          }
          .sfs-thumb {
            flex: 1;
            position: relative;
            overflow: hidden;
          }
          .sfs-thumb + .sfs-thumb {
            border-left: 2px solid rgba(126,200,112,0.4);
          }
          .sfs-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.45);
          }
          .sfs-thumb-label {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 6px 6px;
            font-size: 7px;
            font-weight: 700;
            color: #fff;
            letter-spacing: 0.1em;
            text-align: center;
            line-height: 1.3;
          }
        }

        .sfs-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 13px;
          padding: 12px 28px;
          background: #1a4731;
          color: #fff;
          border: 2px solid #7EC870;
          border-radius: 4px;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s;
          box-shadow: 0 4px 20px rgba(26,71,49,0.5);
        }
        .sfs-btn:hover {
          background: #7EC870;
          color: #0d1f0f;
          box-shadow: 0 6px 28px rgba(126,200,112,0.45);
        }
      `}</style>

      <section ref={sectionRef} className="sfs-section">
        {/* ── DESKTOP: original 3-column layout ── */}
        <div className="sfs-desktop">
          {/* Left panel */}
          <div
            ref={leftRef}
            style={{ width: "26%", position: "relative", overflow: "hidden" }}
          >
            <img
              src={panels[0].src}
              alt={panels[0].label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.45)",
              }}
            />
            <div
              style={{
                position: "absolute",
                insetBlock: 0,
                right: 0,
                width: "2px",
                background: "rgba(126,200,112,0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                }}
              >
                {panels[0].label}
              </p>
            </div>
          </div>

          {/* Center panel */}
          <div
            ref={centerRef}
            style={{ width: "48%", position: "relative", overflow: "hidden" }}
          >
            <img
              src={panels[1].src}
              alt={panels[1].label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.38)",
              }}
            />
            <div
              style={{
                position: "absolute",
                insetBlock: 0,
                left: 0,
                width: "2px",
                background: "rgba(126,200,112,0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                insetBlock: 0,
                right: 0,
                width: "2px",
                background: "rgba(126,200,112,0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#7EC870",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  marginBottom: "16px",
                }}
              >
                WORK TOGETHER
              </p>
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                }}
              >
                Let's Secure Your{" "}
                <span style={{ color: "#7EC870" }}>Child's</span>
                <br />
                <span style={{ color: "#7EC870" }}>Future</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                  maxWidth: "320px",
                }}
              >
                Join the Gyan Niketan family and give your child the gift of
                world-class education with values that last a lifetime.
              </p>
              <a href="/admissions" className="sfs-btn">
                Apply Now
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                }}
              >
                {panels[1].label}
              </p>
            </div>
          </div>

          {/* Right panels */}
          <div
            ref={rightRef}
            style={{ width: "26%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                flex: 1,
                position: "relative",
                overflow: "hidden",
                borderBottom: "2px solid rgba(126,200,112,0.5)",
              }}
            >
              <img
                src={panels[2].src}
                alt={panels[2].label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.45)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  insetBlock: 0,
                  left: 0,
                  width: "2px",
                  background: "rgba(126,200,112,0.5)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px",
                }}
              >
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                  }}
                >
                  {panels[2].label}
                </p>
              </div>
            </div>
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <img
                src={panels[3].src}
                alt={panels[3].label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.45)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  insetBlock: 0,
                  left: 0,
                  width: "2px",
                  background: "rgba(126,200,112,0.5)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px",
                }}
              >
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                  }}
                >
                  {panels[3].label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE: stacked layout ── */}
        <div className="sfs-mobile" ref={centerRef}>
          {/* Hero panel with text */}
          <div className="sfs-hero">
            <img src={panels[1].src} alt={panels[1].label} />
            <div className="sfs-hero-content">
              <p
                style={{
                  color: "#7EC870",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  marginBottom: "14px",
                }}
              >
                WORK TOGETHER
              </p>
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                Let's Secure Your{" "}
                <span style={{ color: "#7EC870" }}>Child's</span>
                <br />
                <span style={{ color: "#7EC870" }}>Future</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  maxWidth: "300px",
                }}
              >
                Join the Gyan Niketan family and give your child the gift of
                world-class education with values that last a lifetime.
              </p>
              <a href="/admissions" className="sfs-btn">
                Apply Now
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* 3 thumbnail panels at bottom */}
          <div className="sfs-thumbs" ref={bottomRef}>
            {[panels[0], panels[2], panels[3]].map((p) => (
              <div className="sfs-thumb" key={p.id}>
                <img src={p.src} alt={p.label} />
                <div className="sfs-thumb-label">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(13,31,15,0.55) 100%)",
          }}
        />
      </section>
    </>
  );
}
