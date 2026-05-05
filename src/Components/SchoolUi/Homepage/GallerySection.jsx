"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Gallery Data ───────────────────────────────────────────────────────────
const galleryCategories = [
  "All",
  "Events",
  "Classroom",
  "Sports",
  "Activities",
];

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80",
    title: "Annual Science Exhibition",
    category: "Events",
    tall: true,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
    title: "Interactive Classroom Learning",
    category: "Classroom",
    tall: false,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=900&q=80",
    title: "Student Art Workshop",
    category: "Activities",
    tall: false,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80",
    title: "Inter-School Football Cup",
    category: "Sports",
    tall: false,
    wide: true,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    title: "Morning Yoga & Fitness",
    category: "Sports",
    tall: false,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    title: "Reading & Library Hour",
    category: "Classroom",
    tall: true,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=900&q=80",
    title: "Annual Cultural Fest",
    category: "Events",
    tall: false,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=900&q=80",
    title: "Chemistry Lab Session",
    category: "Classroom",
    tall: false,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=900&q=80",
    title: "Graduation Ceremony 2024",
    category: "Events",
    tall: false,
    wide: true,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=80",
    title: "Robotics Club",
    category: "Activities",
    tall: false,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&q=80",
    title: "Athletics & Track Day",
    category: "Sports",
    tall: true,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
    title: "Tech Innovation Week",
    category: "Activities",
    tall: false,
  },
];

const ITEMS_PER_PAGE = 8;

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{
        background: "rgba(5, 10, 20, 0.96)",
        backdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:bg-white/20 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 1l16 16M17 1L1 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Prev Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 md:left-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M13 3L6 10l7 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Image Container */}
      <div
        className="relative w-full max-w-4xl"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden shadow-2xl rounded-sm"
          style={{ border: "3px solid #7EC870" }}
        >
          {/* Responsive aspect ratio */}
          <div className="aspect-[4/3] md:aspect-[16/10] w-full">
            <img
              src={image.src}
              alt={image.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Caption */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
            }}
          >
            <span
              className="inline-block text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-1 md:mb-2 px-2.5 py-0.5 md:py-1"
              style={{
                background: "rgba(126,200,112,0.25)",
                color: "#7EC870",
                letterSpacing: "0.12em",
                border: "1px solid #7EC870",
              }}
            >
              {image.category}
            </span>
            <h3 className="text-white text-base md:text-xl font-bold line-clamp-1">
              {image.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M7 3l7 7-7 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── Image Card ───────────────────────────────────────────────────────────────
function GalleryCard({ image, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Responsive Grid span logic
  const gridSpanClass = `
    col-span-1 
    ${image.wide ? "sm:col-span-2" : ""} 
    ${image.tall ? "sm:row-span-2" : ""}
  `;

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${gridSpanClass}`}
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 60}ms, transform 0.55s ease ${index * 60}ms`,
        border: hovered ? "2.5px solid #7EC870" : "2.5px solid #c8e6c0",
        borderRadius: "0px",
        boxShadow: hovered
          ? "0 8px 28px rgba(26,71,49,0.18)"
          : "0 2px 8px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(image)}
    >
      {/* Container dynamic heights:
        - Mobile par: sab square (1:1 ratio) dikhenge taaki layout toote na.
        - Screens broad hone par tall/wide properties apply ho jaengi.
      */}
      <div
        className={`relative w-full h-full min-h-[160px] sm:min-h-[220px] aspect-square sm:aspect-auto`}
        style={{ overflow: "hidden" }}
      >
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.45s ease",
          }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-3"
          style={{
            background: hovered
              ? "linear-gradient(160deg, rgba(10,20,60,0.72) 0%, rgba(5,10,30,0.88) 100%)"
              : "linear-gradient(160deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 100%)",
            transition: "background 0.35s ease",
          }}
        >
          {/* Category tag — always visible */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3">
            <span
              className="text-[9px] md:text-xs font-semibold tracking-wider uppercase px-2 py-0.5 md:px-2.5 md:py-1"
              style={{
                background: "rgba(26,71,49,0.85)",
                backdropFilter: "blur(6px)",
                color: "#7EC870",
                letterSpacing: "0.1em",
                border: "1px solid #7EC870",
              }}
            >
              {image.category}
            </span>
          </div>

          {/* Center icon on hover */}
          <div
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0.7)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div
              className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
              }}
            >
              <svg
                width="18"
                height="18"
                className="md:w-[22px] md:h-[22px]"
                viewBox="0 0 22 22"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="9.5"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 11l2 2 4-4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
            }}
          >
            <p
              className="text-white font-semibold text-xs md:text-sm leading-snug line-clamp-1"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {image.title}
            </p>
            <p className="text-blue-200 text-[10px] md:text-xs mt-0.5 font-medium tracking-wide">
              View Full Image →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Gallery Component ───────────────────────────────────────────────────
export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const openLightbox = useCallback((image) => setLightboxImage(image), []);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const lightboxImages = filtered;
  const currentIdx = lightboxImage
    ? lightboxImages.findIndex((i) => i.id === lightboxImage.id)
    : -1;

  const goPrev = useCallback(() => {
    if (currentIdx > 0) setLightboxImage(lightboxImages[currentIdx - 1]);
    else setLightboxImage(lightboxImages[lightboxImages.length - 1]);
  }, [currentIdx, lightboxImages]);

  const goNext = useCallback(() => {
    if (currentIdx < lightboxImages.length - 1)
      setLightboxImage(lightboxImages[currentIdx + 1]);
    else setLightboxImage(lightboxImages[0]);
  }, [currentIdx, lightboxImages]);

  return (
    <>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 150px;
          gap: 10px;
        }
        @media (min-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 180px;
            gap: 12px;
          }
        }
        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 220px;
            gap: 14px;
          }
        }
        
        .pill-btn {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          padding: 6px 14px;
          border-radius: 4px;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        @media (min-width: 640px) {
          .pill-btn {
            font-size: 0.82rem;
            padding: 7px 18px;
          }
        }
        .pill-btn.active {
          background: #1a4731;
          color: #ffffff;
          border-color: #1a4731;
          box-shadow: 0 2px 10px rgba(26,71,49,0.25);
        }
        .pill-btn.inactive {
          background: #fff;
          color: #4a5568;
          border-color: #d1d5db;
        }
        .pill-btn.inactive:hover {
          border-color: #1a4731;
          color: #1a4731;
          background: #f0faf4;
        }
      `}</style>

      <section className="bg-white" style={{ padding: "40px 0 60px" }}>
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}
        >
          {/* Header */}
          <div
            className="mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-2"
              style={{ color: "#1a4731" }}
            >
              Gallery
            </h2>
            {/* Yellow underline bar */}
            <div
              style={{
                width: "50px",
                height: "4px",
                background: "#e6a817",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Filter Pills with Horizontal Scroll on Mobile */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.6s ease 0.15s",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${activeCategory === cat ? "active" : "inactive"}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Masonry Grid */}
          <div
            className="gallery-grid"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s ease 0.25s",
            }}
          >
            {visible.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={index}
                onClick={openLightbox}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="group flex items-center gap-2.5 px-6 py-2.5 sm:px-8 sm:py-3 font-semibold text-xs sm:text-sm transition-all duration-300"
                style={{
                  background: "white",
                  color: "#1a4731",
                  border: "1.5px solid #7EC870",
                  borderRadius: "4px",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a4731";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#1a4731";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(26,71,49,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#1a4731";
                  e.currentTarget.style.borderColor = "#7EC870";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span>Load More Photos</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 3v10M3 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Count indicator */}
          <p
            className="text-center mt-4 text-[10px] sm:text-xs"
            style={{
              color: "#a0aec4",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            Showing {Math.min(visibleCount, filtered.length)} of{" "}
            {filtered.length} photos
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
