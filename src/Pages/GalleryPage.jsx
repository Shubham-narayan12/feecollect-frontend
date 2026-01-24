import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      src: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=588,h=588,fit=crop/dOqNXeekPrHE45km/tcs-school-image-banner-YKbN4E4pEJsG58we.jpg",
      title: "School Campus",
      category: "Infrastructure"
    },
    {
      id: 2,
      src: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=588,h=588,fit=crop/dOqNXeekPrHE45km/thawe-dJoN9M7K8vfDLM2Y.jpg",
      title: "School Building",
      category: "Infrastructure"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
      title: "Classroom Learning",
      category: "Academics"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
      title: "Science Laboratory",
      category: "Facilities"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      title: "Sports Activities",
      category: "Sports"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
      title: "Library",
      category: "Facilities"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
      title: "Computer Lab",
      category: "Facilities"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800",
      title: "Annual Day Celebration",
      category: "Events"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      title: "Playground",
      category: "Sports"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
      title: "Cultural Program",
      category: "Events"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      title: "Basketball Court",
      category: "Sports"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
      title: "Study Hall",
      category: "Academics"
    }
  ];

  const categories = ["All", "Infrastructure", "Academics", "Facilities", "Sports", "Events"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

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
    const newIndex = imageIndex === 0 ? filteredImages.length - 1 : imageIndex - 1;
    setImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section with Animation */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] py-6 px-8 flex items-center justify-center shadow-xl animate-fade-in">
        <img
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=259,fit=crop/dOqNXeekPrHE45km/tcs-logo-123-d95rjaVGMBUEGBLg.png"
          alt="Thawe Central School Logo"
          className="h-20 w-auto mr-6 animate-bounce-subtle"
        />
        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wide">
          THAWE CENTRAL SCHOOL
        </h1>
      </div>

      {/* Gallery Title with Slide-in Animation */}
      <div className="text-center py-16 px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] mb-6 animate-slide-up">
          Our Gallery
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] mx-auto mb-6 animate-expand"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-delay">
          Explore the vibrant moments and memories from Thawe Central School
        </p>
      </div>

      {/* Category Filter with Stagger Animation */}
      <div className="flex flex-wrap justify-center gap-4 px-4 mb-12">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 animate-fade-in-stagger transform hover:-translate-y-1 ${
              activeCategory === category
                ? "bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] text-white shadow-2xl scale-110"
                : "bg-white text-[#8B1538] border-2 border-[#8B1538] hover:bg-[#8B1538] hover:text-white shadow-lg"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid with Stagger Animation */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1 animate-zoom-in"
              onClick={() => openLightbox(image, index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B1538] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              
              <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="text-white w-full">
                  <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{image.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#8B1538] border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Enhanced Animation */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={48} strokeWidth={2} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-6 text-white hover:text-[#8B1538] bg-white/10 hover:bg-white backdrop-blur-sm rounded-full p-4 transition-all duration-300 transform hover:scale-110 z-50"
            onClick={prevImage}
          >
            <ChevronLeft size={36} strokeWidth={2} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-6 text-white hover:text-[#8B1538] bg-white/10 hover:bg-white backdrop-blur-sm rounded-full p-4 transition-all duration-300 transform hover:scale-110 z-50"
            onClick={nextImage}
          >
            <ChevronRight size={36} strokeWidth={2} />
          </button>

          <div className="max-w-6xl max-h-[90vh] relative animate-zoom-in-large" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300 text-lg inline-block bg-[#8B1538] px-4 py-2 rounded-full">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Animation */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] py-6 text-center shadow-2xl">
        <p className="text-white text-lg font-semibold animate-pulse-subtle">
          सा विद्या या विमुक्तये
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from { width: 0; }
          to { width: 6rem; }
        }

        @keyframes fade-in-delay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-stagger {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoom-in {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes zoom-in-large {
          from { 
            opacity: 0;
            transform: scale(0.5);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-expand {
          animation: expand 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s backwards;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.5s ease-out backwards;
        }

        .animate-zoom-in {
          animation: zoom-in 0.5s ease-out backwards;
        }

        .animate-zoom-in-large {
          animation: zoom-in-large 0.4s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;