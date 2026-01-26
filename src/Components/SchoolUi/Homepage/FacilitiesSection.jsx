import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FacilitiesSection() {
  const scrollRef = useRef(null);

  const facilities = [
    {
      id: 1,
      title: 'JIMMY JOLLEY PARK',
      image: 'https://images.unsplash.com/photo-1587691592099-24045742c181?w=800',
      icon: '🏃',
      color: 'bg-orange-500',
      ribbon: 'bg-orange-500'
    },
    {
      id: 2,
      title: 'ACTIVITY ROOM',
      image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/dOqNXeekPrHE45km/employees2-Aq2X4eKWgOILDXDB.png',
      icon: '🎨',
      color: 'bg-blue-600',
      ribbon: 'bg-blue-600'
    },
    {
      id: 3,
      title: 'DANCE & MUSIC STUDIO',
      image: 'https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/cdn-builder-placeholders/grid-gallery/woman-with-flowers-in-hair.png',
      icon: '🎵',
      color: 'bg-green-500',
      ribbon: 'bg-green-500'
    },
    {
      id: 4,
      title: 'TECH SAVY CLASSES',
      image: 'https://assets.zyrosite.com/dOqNXeekPrHE45km/computer-lab-school-YanzpDq96oFZ71qO.jpg',
      icon: '💻',
      color: 'bg-orange-500',
      ribbon: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'LIBRARY',
      image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/dOqNXeekPrHE45km/student-123-A1arvLarxnCR1KWO.webp',
      icon: '📚',
      color: 'bg-purple-600',
      ribbon: 'bg-purple-600'
    },
    {
      id: 6,
      title: 'SPORTS COMPLEX',
      image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/dOqNXeekPrHE45km/student-123-A1arvLarxnCR1KWO.webp',
      icon: '⚽',
      color: 'bg-red-500',
      ribbon: 'bg-red-500'
    }
  ];

  // Duplicate facilities for seamless loop
  const duplicatedFacilities = [...facilities, ...facilities];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when first set of images has scrolled completely
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
            FACILITIES
          </h2>
          <p className="text-gray-600 text-lg max-w-4xl leading-relaxed mb-6">
            At Thawe Central School, education transcends academics, creating an exciting, caring and supportive space where students thrive and all-round development takes centre stage.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-all duration-300 flex items-center gap-2 group">
            View All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Scrolling Images Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedFacilities.map((facility, index) => (
              <div
                key={`${facility.id}-${index}`}
                className="flex-shrink-0 w-80 md:w-96 relative group cursor-pointer"
              >
                {/* Corner Ribbon */}
                <div className="absolute top-0 right-0 z-20">
                  <div className={`${facility.ribbon} w-20 h-20 flex items-center justify-center text-white text-3xl shadow-lg`}
                       style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}>
                    <span className="absolute top-2 right-2">{facility.icon}</span>
                  </div>
                </div>

                {/* Image Card */}
                <div className="relative h-96 rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Title Badge */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className={`${facility.ribbon} px-6 py-3`}>
                      <h3 className="text-white font-bold text-lg text-center uppercase tracking-wide">
                        {facility.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Scroll Indicator */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          Hover to pause • Auto-scrolling
        </div>
      </div>
    </section>
  );
}