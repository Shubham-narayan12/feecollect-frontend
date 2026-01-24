import React from 'react';
import { Quote } from 'lucide-react';

const DirectorDesk = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Director's Desk
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Director Profile Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
            <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
              {/* Photo Column */}
              <div className="md:col-span-2 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-2xl transform rotate-3"></div>
                  <img
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=438,fit=crop/dOqNXeekPrHE45km/01234567-YZ9XO42Z4wUzeRqL.jpg"
                    alt="Director"
                    className="relative w-64 h-80 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">A. K. Sharma</h2>
                  <p className="text-[#8B1538] font-semibold text-lg mt-1">Director</p>
                  <p className="text-gray-600 mt-2">M.A., Economics</p>
                </div>
              </div>

              {/* Message Column */}
              <div className="md:col-span-3">
                <div className="flex items-start gap-3 mb-6">
                  <Quote className="w-8 h-8 text-[#8B1538] flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-gray-800">Message from the Director</h3>
                </div>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Dear Students, Parents, and Well-wishers,
                  </p>
                  <p>
                    It gives me immense pleasure to welcome you to Thawe Central School, an institution dedicated to nurturing young minds and shaping future leaders. Education is not just about acquiring knowledge; it's about developing character, fostering creativity, and building a strong foundation for life.
                  </p>
                  <p>
                    At Thawe Central School, we believe in holistic education that goes beyond textbooks. Our commitment is to provide an environment where every child can discover their potential, develop their talents, and grow into responsible citizens who contribute positively to society.
                  </p>
                  <p>
                    We focus on academic excellence while equally emphasizing moral values, discipline, and personal growth. Our experienced faculty, modern infrastructure, and innovative teaching methods ensure that our students receive world-class education that prepares them for the challenges of tomorrow.
                  </p>
                  <p>
                    I encourage all our students to embrace learning with enthusiasm, respect their teachers and peers, and always strive for excellence in whatever they do. Remember, education is the most powerful tool you can use to change the world.
                  </p>
                  <p className="font-semibold text-[#8B1538] mt-6">
                    Together, let us build a brighter future!
                  </p>
                  <div className="mt-8">
                    <p className="font-bold text-gray-800">Dr. Rajesh Kumar</p>
                    <p className="text-gray-600">Director</p>
                    <p className="text-gray-600">Thawe Central School</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To be a center of excellence in education, fostering innovation, critical thinking, and ethical values that empower students to become global citizens and leaders of tomorrow.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-[#8B1538] transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold mb-6 text-[#8B1538]">Our Mission</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                To provide quality education that nurtures intellectual curiosity, promotes moral integrity, and develops well-rounded individuals equipped with skills and values to excel in an ever-changing world.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center text-[#8B1538] mb-8">Core Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Excellence", desc: "Striving for the highest standards in all endeavors" },
                { title: "Integrity", desc: "Upholding honesty and strong moral principles" },
                { title: "Innovation", desc: "Encouraging creative thinking and problem-solving" },
                { title: "Respect", desc: "Valuing diversity and treating everyone with dignity" },
                { title: "Collaboration", desc: "Working together to achieve common goals" },
                { title: "Compassion", desc: "Showing empathy and kindness to all" }
              ].map((value, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-[#8B1538]/20 hover:border-[#8B1538] transition-all duration-300 hover:shadow-lg">
                  <h4 className="text-xl font-bold text-[#8B1538] mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorDesk;