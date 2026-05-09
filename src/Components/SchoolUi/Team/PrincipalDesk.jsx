import React from "react";
import { Quote, Award, Target, Heart } from "lucide-react";

const PrincipalDesk = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Principal's Desk
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12 border border-green-100">
            <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
              {/* Photo */}
              <div className="md:col-span-2 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl rotate-3"></div>
                  <img
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=425,fit=crop/dOqNXeekPrHE45km/012345-mjE5XW77zMIz4lbY.png"
                    alt="Principal"
                    className="relative w-64 h-80 object-cover rounded-2xl shadow-xl"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Mr. Majibullah
                  </h2>
                  <p className="text-green-700 font-semibold text-lg mt-1">
                    Principal
                  </p>
                  <p className="text-gray-600 mt-2">M. A. Urdu</p>
                  <p className="text-gray-600">25+ Years of Experience</p>
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-3">
                <div className="flex items-start gap-3 mb-6">
                  <Quote className="w-8 h-8 text-green-700 flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    A Message of Inspiration
                  </h3>
                </div>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Dear Students and Parents,</p>

                  <p>
                    Welcome to Green Field School, where every child's journey
                    is unique and valued.
                  </p>

                  <p>
                    We focus on both academic excellence and personal growth
                    through modern education.
                  </p>

                  <p>
                    Our teachers ensure personalized attention and holistic
                    development.
                  </p>

                  <p className="font-semibold text-green-700 mt-6">
                    Let’s build a bright future together!
                  </p>

                  <div className="mt-8">
                    <p className="font-bold text-gray-800">Mrs. Priya Sharma</p>
                    <p className="text-gray-600">Principal</p>
                    <p className="text-gray-600">Green Field School</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Award,
                title: "Academic Excellence",
                desc: "Achieving high standards in education",
              },
              {
                icon: Target,
                title: "Holistic Development",
                desc: "Overall growth of students",
              },
              {
                icon: Heart,
                title: "Character Building",
                desc: "Values and discipline",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Philosophy Section */}
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">
              Our Educational Philosophy
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Student-Centered Learning",
                "Experiential Learning",
                "Technology Integration",
                "Continuous Assessment",
              ].map((title, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    {title}
                  </h4>

                  <p className="ml-10 text-white/90">
                    We ensure practical, modern and effective learning methods.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDesk;
