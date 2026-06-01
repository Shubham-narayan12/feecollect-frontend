"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllGalleryApi } from "../../../api/galleryImagesApi";

// ─── Gallery Categories ───────────────────────────────────────────
const galleryCategories = [
  "All",
  "Events",
  "Classroom",
  "Sports",
  "Activities",
  "Campus",
];

const ITEMS_PER_PAGE = 8;

// ─── Lightbox ─────────────────────────────────────────────────────
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
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center text-white"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 md:left-8 z-10 text-white text-4xl"
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden shadow-2xl rounded-sm"
          style={{ border: "3px solid #7EC870" }}
        >
          <div className="aspect-[4/3] md:aspect-[16/10] w-full">
            <img
              src={image.imageUrl}
              alt={image.imageTitle}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
            <span
              className="inline-block text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-2 px-2 py-1"
              style={{
                background: "rgba(126,200,112,0.25)",
                color: "#7EC870",
                border: "1px solid #7EC870",
              }}
            >
              {image.category}
            </span>

            <h3 className="text-white text-base md:text-xl font-bold">
              {image.imageTitle}
            </h3>
          </div>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 md:right-8 z-10 text-white text-4xl"
      >
        ›
      </button>
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────
function GalleryCard({ image, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer group col-span-1"
      style={{
        border: hovered
          ? "2.5px solid #7EC870"
          : "2.5px solid #c8e6c0",
        transition: "0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(image)}
    >
      <div className="relative w-full h-full min-h-[160px] sm:min-h-[220px] aspect-square overflow-hidden">
        <img
          src={image.imageUrl}
          alt={image.imageTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
          <div
            className={`text-center transition-all duration-300 ${
              hovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <h3 className="text-white font-bold text-sm px-2">
              {image.imageTitle}
            </h3>

            <p className="text-xs text-slate-200 mt-1">
              View Image →
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="absolute top-2 left-2">
          <span
            className="text-[10px] font-semibold uppercase px-2 py-1"
            style={{
              background: "rgba(26,71,49,0.85)",
              color: "#7EC870",
              border: "1px solid #7EC870",
            }}
          >
            {image.category}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [visibleCount, setVisibleCount] =
    useState(ITEMS_PER_PAGE);

  const [lightboxImage, setLightboxImage] =
    useState(null);

  const [loading, setLoading] = useState(true);

  // ======================================================
  // FETCH GALLERY IMAGES
  // ======================================================

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);

      const response = await getAllGalleryApi();

      setGalleryImages(response?.galleries || []);
    } catch (error) {
      console.log(error);

      alert(
        error?.message ||
          "Failed to fetch gallery images",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // ======================================================
  // FILTER IMAGES
  // ======================================================

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (img) => img.category === activeCategory,
        );

  // ONLY 8 IMAGES SHOW
  const visible = filtered.slice(0, visibleCount);

  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);

    setVisibleCount(ITEMS_PER_PAGE);
  };

  // ======================================================
  // LIGHTBOX
  // ======================================================

  const openLightbox = useCallback((image) => {
    setLightboxImage(image);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const currentIdx = lightboxImage
    ? filtered.findIndex(
        (i) => i._id === lightboxImage._id,
      )
    : -1;

  const goPrev = useCallback(() => {
    if (currentIdx > 0) {
      setLightboxImage(filtered[currentIdx - 1]);
    } else {
      setLightboxImage(filtered[filtered.length - 1]);
    }
  }, [currentIdx, filtered]);

  const goNext = useCallback(() => {
    if (currentIdx < filtered.length - 1) {
      setLightboxImage(filtered[currentIdx + 1]);
    } else {
      setLightboxImage(filtered[0]);
    }
  }, [currentIdx, filtered]);

  return (
    <>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .pill-btn {
          font-size: 0.75rem;
          padding: 7px 16px;
          border-radius: 5px;
          transition: 0.2s;
        }

        .pill-btn.active {
          background: #1a4731;
          color: white;
        }

        .pill-btn.inactive {
          background: white;
          border: 1px solid #d1d5db;
        }
      `}</style>

      <section
        className="bg-white"
        style={{ padding: "40px 0 60px" }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {/* HEADER */}
          <div className="mb-8">
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-2"
              style={{ color: "#1a4731" }}
            >
              Gallery
            </h2>

            <div
              style={{
                width: "50px",
                height: "4px",
                background: "#e6a817",
              }}
            />
          </div>

          {/* FILTERS */}
          <div className="flex gap-2 flex-wrap mb-6">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${
                  activeCategory === cat
                    ? "active"
                    : "inactive"
                }`}
                onClick={() =>
                  handleCategoryChange(cat)
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-slate-500">
                Loading gallery...
              </p>
            </div>
          ) : (
            <>
              {/* GRID */}
              <div className="gallery-grid">
                {visible.map((image, index) => (
                  <GalleryCard
                    key={image._id}
                    image={image}
                    index={index}
                    onClick={openLightbox}
                  />
                ))}
              </div>

              {/* LOAD MORE */}
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() =>
                      setVisibleCount(
                        (c) => c + ITEMS_PER_PAGE,
                      )
                    }
                    className="px-8 py-3 border border-green-600 text-green-700 hover:bg-green-700 hover:text-white transition-all"
                  >
                    Load More Photos
                  </button>
                </div>
              )}

              {/* COUNT */}
              <p className="text-center mt-4 text-xs text-slate-400">
                Showing{" "}
                {Math.min(
                  visibleCount,
                  filtered.length,
                )}{" "}
                of {filtered.length} photos
              </p>
            </>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
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