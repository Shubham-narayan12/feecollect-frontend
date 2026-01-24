import React from 'react';
import { Quote, Award, Target, Heart } from 'lucide-react';

const PrincipalDesk = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Principal's Desk
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Principal Profile Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
            <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
              {/* Photo Column */}
              <div className="md:col-span-2 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-2xl transform -rotate-3"></div>
                  <img
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=425,fit=crop/dOqNXeekPrHE45km/012345-mjE5XW77zMIz4lbY.png"
                    alt="Principal"
                    className="relative w-64 h-80 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">Mr. Majibullah </h2>
                  <p className="text-[#8B1538] font-semibold text-lg mt-1">Principal</p>
                  <p className="text-gray-600 mt-2">M. A. Urdu</p>
                  <p className="text-gray-600">25+ Years of Experience</p>
                </div>
              </div>

              {/* Message Column */}
              <div className="md:col-span-3">
                <div className="flex items-start gap-3 mb-6">
                  <Quote className="w-8 h-8 text-[#8B1538] flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-gray-800">A Message of Inspiration</h3>
                </div>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Dear Students and Parents,
                  </p>
                  <p>
                    Welcome to Thawe Central School, where every child's journey is unique and valued. As Principal, I am honored to lead this wonderful institution where we don't just teach subjects, but nurture dreams and build futures.
                  </p>
                  <p>
                    In today's rapidly evolving world, education must prepare students not just with knowledge, but with the skills to think critically, communicate effectively, and adapt to change. At our school, we blend traditional values with modern pedagogy to create a learning environment that is both enriching and enjoyable.
                  </p>
                  <p>
                    Our dedicated teachers work tirelessly to ensure that each student receives personalized attention and support. We celebrate diversity, encourage creativity, and foster a culture of mutual respect and understanding. Every child has unique talents waiting to be discovered and developed.
                  </p>
                  <p>
                    To our dear students: Remember that success is not just about grades, but about becoming good human beings who contribute positively to society. Be curious, be kind, be courageous, and never stop learning.
                  </p>
                  <p>
                    To our parents: Thank you for entrusting us with your child's education. Your partnership and support are invaluable in our mission to provide the best possible learning experience.
                  </p>
                  <p className="font-semibold text-[#8B1538] mt-6">
                    Let's work together to help our children soar to new heights!
                  </p>
                  <div className="mt-8">
                    <p className="font-bold text-gray-800">Mrs. Priya Sharma</p>
                    <p className="text-gray-600">Principal</p>
                    <p className="text-gray-600">Thawe Central School</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Focus Areas */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#8B1538] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Academic Excellence</h3>
              <p className="text-gray-600 text-center">
                Fostering a love for learning and achieving outstanding academic results through innovative teaching methods.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#8B1538] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Holistic Development</h3>
              <p className="text-gray-600 text-center">
                Nurturing physical, emotional, and social growth alongside academic achievement for well-rounded individuals.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#8B1538] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Character Building</h3>
              <p className="text-gray-600 text-center">
                Instilling strong values, ethics, and life skills that shape responsible and compassionate citizens.
              </p>
            </div>
          </div>

          {/* Educational Philosophy */}
          <div className="bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">Our Educational Philosophy</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-white text-[#8B1538] rounded-full flex items-center justify-center font-bold">1</span>
                  Student-Centered Learning
                </h4>
                <p className="ml-10 text-white/90">
                  Every student is unique. We tailor our approach to meet individual needs, ensuring no child is left behind.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-white text-[#8B1538] rounded-full flex items-center justify-center font-bold">2</span>
                  Experiential Learning
                </h4>
                <p className="ml-10 text-white/90">
                  Learning by doing. We emphasize hands-on activities, projects, and real-world applications.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-white text-[#8B1538] rounded-full flex items-center justify-center font-bold">3</span>
                  Technology Integration
                </h4>
                <p className="ml-10 text-white/90">
                  Preparing students for the digital age with modern tools and technology-enhanced learning.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-white text-[#8B1538] rounded-full flex items-center justify-center font-bold">4</span>
                  Continuous Assessment
                </h4>
                <p className="ml-10 text-white/90">
                  Regular feedback and evaluation to track progress and identify areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDesk;