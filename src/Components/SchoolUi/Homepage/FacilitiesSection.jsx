import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function FacilitiesSection() {
  const scrollRef = useRef(null);

  const facilities = [
    {
      id: 1,
      title: "JIMMY JOLLEY PARK",
      image:
        "https://images.unsplash.com/photo-1587691592099-24045742c181?w=800",
      icon: "🏃",
    },
    {
      id: 2,
      title: "ACTIVITY ROOM",
      image:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/dOqNXeekPrHE45km/employees2-Aq2X4eKWgOILDXDB.png",
      icon: "🎨",
    },
    {
      id: 3,
      title: "DANCE & MUSIC STUDIO",
      image:
        "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/cdn-builder-placeholders/grid-gallery/woman-with-flowers-in-hair.png",
      icon: "🎵",
    },
    {
      id: 4,
      title: "TECH SAVVY CLASSES",
      image:
        "https://assets.zyrosite.com/dOqNXeekPrHE45km/computer-lab-school-YanzpDq96oFZ71qO.jpg",
      icon: "💻",
    },
    {
      id: 5,
      title: "LIBRARY",
      image:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/dOqNXeekPrHE45km/student-123-A1arvLarxnCR1KWO.webp",
      icon: "📚",
    },
    {
      id: 6,
      title: "SPORTS COMPLEX",
      image:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/dOqNXeekPrHE45km/student-123-A1arvLarxnCR1KWO.webp",
      icon: "⚽",
    },
  ];

  const duplicatedFacilities = [...facilities, ...facilities];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 1;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) scrollPosition = 0;
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "#f4f9f4" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            {/* Top accent bar */}
            <div
              style={{
                width: "48px",
                height: "5px",
                background: "#2e7d32",
                marginBottom: "12px",
              }}
            />
            <h2
              className="font-bold font-serif uppercase tracking-widest"
              style={{ color: "#1b5e20", fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Our Facilities
            </h2>
            <p
              className="mt-3 font-serif"
              style={{
                color: "#4a4a4a",
                fontSize: "15px",
                maxWidth: "600px",
                lineHeight: 1.7,
              }}
            >
              At Thawe Central School, education transcends academics — creating
              an exciting, caring and supportive space where students thrive and
              all-round development takes centre stage.
            </p>
          </div>

         
        </div>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #f4f9f4, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #f4f9f4, transparent)",
            }}
          />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-hidden"
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedFacilities.map((facility, index) => (
              <div
                key={`${facility.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                style={{ width: "300px" }}
              >
                {/* Card — sharp edges */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "380px",
                    border: "2px solid #2e7d32",
                    boxShadow: "4px 4px 0px #2e7d32",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "6px 6px 0px #1b5e20";
                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "4px 4px 0px #2e7d32";
                    e.currentTarget.style.transform = "translate(0, 0)";
                  }}
                >
                  {/* Image */}
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Dark gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                    }}
                  />

                  {/* Top-right icon box — sharp */}
                  <div
                    className="absolute top-0 right-0 flex items-center justify-center text-2xl z-20"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "#2e7d32",
                    }}
                  >
                    {facility.icon}
                  </div>

                  {/* Bottom title bar — sharp */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-10"
                    style={{ background: "#2e7d32", padding: "12px 16px" }}
                  >
                    <h3
                      className="font-bold font-serif text-center uppercase tracking-widest text-white"
                      style={{ fontSize: "13px", letterSpacing: "2px" }}
                    >
                      {facility.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div
          className="text-center mt-6 font-serif"
          style={{ color: "#4CAF50", fontSize: "13px", letterSpacing: "1px" }}
        >
          ● Hover to pause &nbsp;·&nbsp; Auto-scrolling ●
        </div>
      </div>
    </section>
  );
}
