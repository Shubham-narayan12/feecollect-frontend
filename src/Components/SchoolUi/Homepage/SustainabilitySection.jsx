import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function SustainabilitySection() {
  const [activeTab, setActiveTab] = useState('khadi');

  const categories = [
    {
      id: 'khadi',
      title: 'Khadi',
      subtitle: 'From Loom to Learning.',
      icon: '🌾',
      bgColor: 'bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'climate',
      title: 'Climate Change',
      subtitle: 'Awareness & Action',
      icon: '🌍',
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      borderColor: 'border-2 border-blue-300'
    },
    {
      id: 'forest',
      title: 'School Forest',
      subtitle: 'Beyond Books, Beneath the Canopy',
      icon: '🌳',
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      borderColor: 'border-2 border-purple-300'
    },
    {
      id: 'solar',
      title: 'Solar Energy',
      subtitle: 'Sun-powered Learning',
      icon: '☀️',
      bgColor: 'bg-white',
      textColor: 'text-orange-600',
      borderColor: 'border-2 border-orange-300'
    },
    {
      id: 'zerowaste',
      title: 'Zero Waste',
      subtitle: 'Reduce Your Consumption',
      icon: '♻️',
      bgColor: 'bg-white',
      textColor: 'text-red-600',
      borderColor: 'border-2 border-red-300'
    },
    {
      id: 'millets',
      title: 'Millets',
      subtitle: 'Tiny Grains, Mighty Gains',
      icon: '🌾',
      bgColor: 'bg-white',
      textColor: 'text-green-600',
      borderColor: 'border-2 border-green-300'
    }
  ];

  const content = {
  khadi: {
    title: 'Khadi - From Loom to Learning',
    description:
      "At Thawe Central School, we proudly promote sustainability, patriotism, and cultural legacy. By embracing Khadi–India's symbol of self-reliance and simplicity–we instill values of unity, determination, and environmental responsibility in our students. As an eco-friendly, hand-spun fabric supporting local artisans, Khadi reflects our commitment to conscious living. Through its use in uniforms and events, we blend tradition with modernity, inspiring students to cherish heritage and work toward a sustainable future.",
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600'
  },

  climate: {
    title: 'Climate Change - Awareness & Action',
    description:
      'We educate our students about climate change through workshops, seminars, and hands-on activities. Our curriculum integrates environmental science, encouraging students to understand global warming, carbon footprint, and sustainable practices.',
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b0?w=600'
  },

  forest: {
    title: 'School Forest - Beyond Books, Beneath the Canopy',
    description:
      'Our school forest serves as an outdoor classroom where students learn about biodiversity, ecology, and conservation. This green sanctuary provides a hands-on learning environment.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600'
  },

  solar: {
    title: 'Solar Energy - Sun-powered Learning',
    description:
      'Thawe Central School harnesses solar energy to power our facilities, demonstrating renewable energy in action. Our solar panels serve as educational tools for teaching clean energy.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600'
  },

  zerowaste: {
    title: 'Zero Waste - Reduce Your Consumption',
    description:
      'We practice zero waste principles through recycling programs, composting initiatives, and waste segregation. Students learn to reduce, reuse, and recycle.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600'
  },

  millets: {
    title: 'Millets - Tiny Grains, Mighty Gains',
    description:
      'We promote millets as a sustainable and nutritious food choice. Our cafeteria incorporates millet-based meals, teaching students about traditional grains and their health benefits.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'
  }
};


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Yellow Diagonal Background */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-yellow-400 to-yellow-500">
        <div className="absolute top-0 right-0 w-full h-full bg-blue-500" 
             style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}>
        </div>
      </div>

      {/* Blue Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600"></div>

      {/* Content */}
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 uppercase tracking-wider">
            Sustainability
          </h2>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`${category.bgColor} ${category.textColor} ${category.borderColor || ''} 
                  rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                  ${activeTab === category.id ? 'ring-4 ring-white' : ''}`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                <p className="text-sm opacity-90">{category.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div>
                <h3 className="text-3xl font-bold text-blue-700 mb-4 border-b-4 border-blue-500 pb-2 inline-block">
                  {content[activeTab].title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {content[activeTab].description}
                </p>
                
                {/* Decorative Element */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rotate-45"></div>
                  <div className="w-3 h-3 bg-orange-500 rotate-45"></div>
                  <div className="w-3 h-3 bg-yellow-500 rotate-45"></div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={content[activeTab].image}
                  alt={content[activeTab].title}
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </section>
  );
}