import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { getAllGalleryApi } from "../api/galleryImagesApi";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);

  const categories = [
    "All",
    "Infrastructure",
    "Academics",
    "Facilities",
    "Sports",
    "Events",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch gallery images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getAllGalleryApi();

        // Backend response format ke hisab se data extract krna
        // Agar response.data.images hai ya direct array hai:
        const fetchedData = response?.galleries || [];

        // Ensure image object properties match frontend expectations (handling 'src' field fallback)
        const normalizedImages = fetchedData.map((img) => ({
          id: img._id || img.id,
          src: img.src || img.image || img.imageUrl, // Backend field fallbacks
          title: img.title || "Gallery Image",
          category: img.category || "Infrastructure",
        }));

        setGalleryImages(normalizedImages);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    };

    fetchImages();
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setImageIndex(index);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (imageIndex + 1) % filteredImages.length;
    setImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex =
      imageIndex === 0 ? filteredImages.length - 1 : imageIndex - 1;
    setImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800">
      {/* Premium Header Banner (Matching the Enquiry Page Hero) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 py-16 px-4">
        {/* Decorative Blur Background Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-750/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-2xl -ml-20 -mb-20"></div>

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          <img
            src="/logo.png"
            alt="Thawe Central School Logo"
            className="h-24 w-auto drop-shadow-xl animate-bounce-subtle"
          />
          <div className="text-center md:text-left">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight">
              Green Field School
            </h1>
            <p className="text-green-300 text-sm md:text-md mt-1 font-medium tracking-widest uppercase">
              Affiliated to CBSE | Patna, Bihar
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Title & Subtext */}
      <div className="text-center pt-16 pb-10 px-4">
        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 font-semibold text-xs uppercase tracking-widest rounded-full mb-3 border border-green-200">
          Our Campus Life
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-emerald-950 mb-4 animate-slide-up">
          Vibrant Moments & Memories
        </h2>
        <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full mb-4 animate-expand"></div>
        <p className="text-gray-500 text-lg max-w-xl mx-auto animate-fade-in-delay leading-relaxed">
          Take a visual tour of our state-of-the-art facilities, academic
          activities, events, and dynamic student life.
        </p>
      </div>

      {/* Category Filter Pills (Premium Clean Aesthetics) */}
      <div className="flex flex-wrap justify-center gap-3 px-4 mb-16">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{ animationDelay: `${index * 0.05}s` }}
            className={`px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 animate-fade-in-stagger transform hover:-translate-y-0.5 active:translate-y-0 ${
              activeCategory === category
                ? "bg-gradient-to-r from-green-700 to-emerald-800 text-white shadow-lg shadow-green-900/15 scale-105"
                : "bg-white text-green-800 border border-green-100 hover:border-green-600 shadow-sm hover:shadow-md"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Photo Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              style={{ animationDelay: `${index * 0.04}s` }}
              className="group relative overflow-hidden rounded-3xl shadow-md border border-gray-100 cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl animate-zoom-in bg-white"
              onClick={() => openLightbox(image, index)}
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-video sm:aspect-square md:h-72">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Overlay with Premium Dark Green/Emerald Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              {/* Info Slide-up Container */}
              <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-10">
                <div className="text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-2 inline-block">
                    {image.category}
                  </span>
                  <h3 className="text-lg font-bold drop-shadow-md leading-snug">
                    {image.title}
                  </h3>
                </div>
              </div>

              {/* Top Right Corner Highlight Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Premium Modern Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-emerald-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          {/* Navigation Controls */}
          <button
            className="absolute left-4 md:left-8 text-white/80 hover:text-green-800 bg-white/10 hover:bg-white rounded-2xl p-3 md:p-4 transition-all duration-300 transform hover:scale-105 active:scale-95 z-50"
            onClick={prevImage}
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>

          <button
            className="absolute right-4 md:right-8 text-white/80 hover:text-green-800 bg-white/10 hover:bg-white rounded-2xl p-3 md:p-4 transition-all duration-300 transform hover:scale-105 active:scale-95 z-50"
            onClick={nextImage}
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>

          {/* Modal Container */}
          <div
            className="max-w-5xl max-h-[85vh] relative animate-zoom-in-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-emerald-900/30 p-2 rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl"
              />
            </div>

            {/* Image Details Bar */}
            <div className="text-center mt-4 bg-white/10 border border-white/5 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-white pl-2">
                {selectedImage.title}
              </h3>
              <span className="text-xs font-bold text-emerald-950 bg-amber-400 px-4 py-1.5 rounded-full uppercase tracking-wider">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Sanskrit Shloka */}
      <div className="bg-gradient-to-r from-green-800 via-green-900 to-emerald-950 py-8 text-center shadow-inner border-t border-emerald-800/20">
        <p className="text-amber-400 text-lg font-bold tracking-widest animate-pulse-subtle">
          सा विद्या या विमुक्तये
        </p>
        <p className="text-green-200/60 text-xs mt-1">
          That is knowledge which liberates
        </p>
      </div>

      {/* Styled Animations JSX */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-stagger {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes zoom-in-large {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-expand {
          animation: expand 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.2s backwards;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.4s cubic-bezier(0.16, 1, 0.3, 1)
            backwards;
        }

        .animate-zoom-in {
          animation: zoom-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .animate-zoom-in-large {
          animation: zoom-in-large 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
