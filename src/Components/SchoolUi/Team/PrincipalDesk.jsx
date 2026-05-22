import React from "react";
import { Quote } from "lucide-react";

const PrincipalDesk = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 py-8 px-4">
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
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
            <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
              {/* Photo */}
              <div className="md:col-span-2 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl rotate-3"></div>
                  <img
                    src="/principal.jpeg"
                    alt="Principal"
                    className="relative w-64 h-80 object-cover object-top rounded-2xl shadow-xl"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Mr. Rajesh Kumar
                  </h2>
                  <p className="text-green-600 font-semibold text-lg mt-1">
                    Principal
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-3">
                <div className="flex items-start gap-3 mb-6">
                  <Quote className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Message from the Principal
                  </h3>
                </div>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Dear Students, Parents, and Guardians,</p>

                  <p>
                    Welcome to Green Field School — a place where every child is
                    valued, every dream is nurtured, and every effort is
                    celebrated. I am proud to lead this wonderful institution
                    and work alongside a dedicated team of educators.
                  </p>

                  <p>
                    Education is not merely about acquiring knowledge; it is
                    about building character, developing critical thinking, and
                    preparing students to face real-world challenges with
                    confidence and integrity.
                  </p>

                  <p>
                    We are committed to providing a safe, inclusive, and
                    stimulating environment where curiosity is encouraged and
                    excellence is the standard we set for ourselves every day.
                  </p>

                  <p>
                    I urge every student to be disciplined, respectful, and
                    persistent. Success belongs to those who work hard and never
                    give up.
                  </p>

                  <p className="font-semibold text-green-700 mt-6">
                    Let us walk this journey of learning together!
                  </p>

                  <div className="mt-8">
                    <p className="font-bold text-gray-800">Mr. Rajesh Kumar</p>
                    <p className="text-gray-600">Principal</p>
                    <p className="text-gray-600">Green Field School</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition duration-300">
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg">
                To foster a love for learning that empowers students to become
                thoughtful, capable, and compassionate individuals.
              </p>
            </div>

            <div className="bg-white border-4 border-green-600 rounded-2xl p-8 shadow-xl hover:scale-105 transition duration-300">
              <h3 className="text-3xl font-bold mb-6 text-green-700">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700">
                To deliver an enriching academic experience supported by strong
                discipline, mentorship, and holistic personal development.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center text-green-700 mb-8">
              Our Commitments
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Discipline",
                  desc: "Structure that builds character",
                },
                {
                  title: "Academic Excellence",
                  desc: "Highest learning standards",
                },
                { title: "Mentorship", desc: "Guided growth at every step" },
                { title: "Inclusivity", desc: "Every child belongs here" },
                { title: "Safety", desc: "A secure space to grow" },
                {
                  title: "Accountability",
                  desc: "Own your actions, own your future",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-green-200 hover:border-green-600 hover:shadow-lg transition duration-300 bg-gradient-to-br from-green-50 to-white"
                >
                  <h4 className="text-xl font-bold text-green-700 mb-2">
                    {value.title}
                  </h4>
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

export default PrincipalDesk;
