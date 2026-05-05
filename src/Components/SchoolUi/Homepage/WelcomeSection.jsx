import React, { useRef, useEffect } from "react";

const notices = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "Desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  "Many desktop publishing packages and web page editors now use",
  "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  "Welcome To The Best Private University in MP",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "Report of Activities to submitted till 15/02/2023 Appointed counseling of Director",
  "Regarding preparation Appointed counseling of Director of nAAC",
  "Counseler has been Appointed counseling of Student",
];

const events = [
  { month: "June", day: "21", sub: "Maths $ English", title: "Offer With Higher Package Of 40 LPA" },
  { month: "July", day: "05", sub: "Science & Tech", title: "Annual Science Exhibition 2023" },
  { month: "Aug",  day: "12", sub: "Sports Day",     title: "Inter School Athletics Championship" },
  { month: "Sep",  day: "03", sub: "Cultural Fest",  title: "National Level Cultural Competition" },
  { month: "Oct",  day: "18", sub: "Admission Open", title: "Enrollment For New Academic Session" },
];

function useMarquee(ref, speed = 0.5) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let animId;
    let pos = 0;
    const inner = el.querySelector(".marquee-inner");
    if (!inner) return;
    const clone = inner.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    el.appendChild(clone);
    const step = () => {
      pos -= speed;
      if (Math.abs(pos) >= inner.offsetHeight) pos = 0;
      el.style.transform = `translateY(${pos}px)`;
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };
    el.parentElement.addEventListener("mouseenter", pause);
    el.parentElement.addEventListener("mouseleave", resume);
    return () => {
      cancelAnimationFrame(animId);
      el.parentElement?.removeEventListener("mouseenter", pause);
      el.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, []);
}

function NoticeMarquee() {
  const trackRef = useRef(null);
  useMarquee(trackRef, 0.6);
  return (
    <div style={{ overflow: "hidden", height: 340, position: "relative" }}>
      <div ref={trackRef} style={{ willChange: "transform" }}>
        <div className="marquee-inner" style={{ display: "flex", flexDirection: "column", gap: 18, padding: "8px 0" }}>
          {notices.map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ color: "#fff", fontSize: 15, marginTop: 1, flexShrink: 0 }}>☑</span>
              <span style={{ fontSize: 14, color: "#fff", lineHeight: 1.55 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 36, background: "linear-gradient(to bottom, #4a7c59, transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, background: "linear-gradient(to top, #4a7c59, transparent)", pointerEvents: "none" }} />
    </div>
  );
}

function EventMarquee() {
  const trackRef = useRef(null);
  useMarquee(trackRef, 0.5);
  return (
    <div style={{ overflow: "hidden", height: 340, position: "relative" }}>
      <div ref={trackRef} style={{ willChange: "transform" }}>
        <div className="marquee-inner" style={{ display: "flex", flexDirection: "column", gap: 14, padding: "8px 0" }}>
          {events.map((ev, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{
                background: "#5cb85c", color: "#fff",
                borderRadius: 8, minWidth: 64, textAlign: "center",
                padding: "10px 8px", flexShrink: 0,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>{ev.month}</div>
                <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{ev.day}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#777", marginBottom: 3 }}>{ev.sub}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{ev.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 36, background: "linear-gradient(to bottom, #fff, transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, background: "linear-gradient(to top, #fff, transparent)", pointerEvents: "none" }} />
    </div>
  );
}

export default function WelcomeSection() {
  return (
    <section style={{ background: "#fff", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

        {/* Notice Board */}
        <div style={{ background: "#fff", borderRadius: 8, padding: "28px 24px", boxShadow: "0 1px 12px rgba(0,0,0,0.07)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a3a1a", marginBottom: 6 }}>Notice Boards</h2>
          <div style={{ width: 48, height: 3, background: "#e6a817", borderRadius: 2, marginBottom: 20 }} />
          <div style={{
            background: "#4a7c59",
            border: "3px solid #e08060",
            borderRadius: 2,
            padding: "20px 22px",
          }}>
            <NoticeMarquee />
          </div>
        </div>

        {/* Recent Events */}
        <div style={{ background: "#fff", borderRadius: 2, padding: "28px 24px", boxShadow: "0 1px 12px rgba(0,0,0,0.07)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a3a1a", marginBottom: 6 }}>Recent Event</h2>
          <div style={{ width: 48, height: 3, background: "#e6a817", borderRadius: 2, marginBottom: 20 }} />
          <EventMarquee />
        </div>

      </div>
    </section>
  );
}