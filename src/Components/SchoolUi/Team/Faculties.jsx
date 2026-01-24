import React, { useState } from 'react';
import { Mail, Phone, Award, BookOpen } from 'lucide-react';

const Faculties = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const facultyMembers = [
    {
      name: "Dr. Amit Singh",
      designation: "Head of Science Department",
      department: "Science",
      qualification: "Ph.D. in Physics, M.Sc.",
      experience: "18 Years",
      specialization: "Physics & Mathematics",
      email: "amit.singh@thawecentral.edu",
      phone: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
    },
    {
      name: "Mrs. Kavita Verma",
      designation: "Senior English Teacher",
      department: "Languages",
      qualification: "M.A. in English, B.Ed.",
      experience: "15 Years",
      specialization: "English Literature & Grammar",
      email: "kavita.verma@thawecentral.edu",
      phone: "+91 98765 43211",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
    },
    {
      name: "Mr. Rahul Gupta",
      designation: "Mathematics Teacher",
      department: "Mathematics",
      qualification: "M.Sc. Mathematics, B.Ed.",
      experience: "12 Years",
      specialization: "Advanced Mathematics",
      email: "rahul.gupta@thawecentral.edu",
      phone: "+91 98765 43212",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
    },
    {
      name: "Dr. Sunita Rao",
      designation: "Chemistry Teacher",
      department: "Science",
      qualification: "Ph.D. in Chemistry",
      experience: "20 Years",
      specialization: "Organic & Inorganic Chemistry",
      email: "sunita.rao@thawecentral.edu",
      phone: "+91 98765 43213",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400"
    },
    {
      name: "Mr. Vikram Malhotra",
      designation: "Physical Education Teacher",
      department: "Sports",
      qualification: "M.P.Ed., B.P.Ed.",
      experience: "10 Years",
      specialization: "Sports & Fitness",
      email: "vikram.malhotra@thawecentral.edu",
      phone: "+91 98765 43214",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      name: "Mrs. Neha Sharma",
      designation: "Social Studies Teacher",
      department: "Social Studies",
      qualification: "M.A. in History, B.Ed.",
      experience: "14 Years",
      specialization: "History & Geography",
      email: "neha.sharma@thawecentral.edu",
      phone: "+91 98765 43215",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400"
    },
    {
      name: "Mr. Rajesh Kumar",
      designation: "Computer Science Teacher",
      department: "Technology",
      qualification: "M.Tech., MCA",
      experience: "8 Years",
      specialization: "Programming & Web Development",
      email: "rajesh.kumar@thawecentral.edu",
      phone: "+91 98765 43216",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    },
    {
      name: "Mrs. Anjali Desai",
      designation: "Art & Craft Teacher",
      department: "Arts",
      qualification: "M.F.A., B.F.A.",
      experience: "11 Years",
      specialization: "Fine Arts & Handicrafts",
      email: "anjali.desai@thawecentral.edu",
      phone: "+91 98765 43217",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    {
      name: "Mr. Suresh Patel",
      designation: "Biology Teacher",
      department: "Science",
      qualification: "M.Sc. in Botany, B.Ed.",
      experience: "16 Years",
      specialization: "Botany & Zoology",
      email: "suresh.patel@thawecentral.edu",
      phone: "+91 98765 43218",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400"
    },
    {
      name: "Mrs. Pooja Reddy",
      designation: "Hindi Teacher",
      department: "Languages",
      qualification: "M.A. in Hindi, B.Ed.",
      experience: "13 Years",
      specialization: "Hindi Literature",
      email: "pooja.reddy@thawecentral.edu",
      phone: "+91 98765 43219",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400"
    },
    {
      name: "Mr. Arun Mehta",
      designation: "Music Teacher",
      department: "Arts",
      qualification: "M.A. in Music",
      experience: "9 Years",
      specialization: "Vocal & Instrumental Music",
      email: "arun.mehta@thawecentral.edu",
      phone: "+91 98765 43220",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400"
    },
    {
      name: "Mrs. Meera Joshi",
      designation: "Sanskrit Teacher",
      department: "Languages",
      qualification: "M.A. in Sanskrit, B.Ed.",
      experience: "17 Years",
      specialization: "Sanskrit Language & Literature",
      email: "meera.joshi@thawecentral.edu",
      phone: "+91 98765 43221",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
    }
  ];

  const departments = ["All", "Science", "Mathematics", "Languages", "Social Studies", "Technology", "Arts", "Sports"];

  const filteredFaculty = selectedDepartment === "All" 
    ? facultyMembers 
    : facultyMembers.filter(f => f.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Our Faculties
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
          <p className="text-white/90 text-center mt-4 text-lg">
            Meet our dedicated team of experienced educators
          </p>
        </div>
      </div>

      {/* Department Filter */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedDepartment === dept
                  ? "bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] text-white shadow-xl scale-110"
                  : "bg-white text-[#8B1538] border-2 border-[#8B1538] hover:bg-[#8B1538] hover:text-white shadow-lg"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredFaculty.map((faculty, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in"
            >
              {/* Photo Section */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#8B1538] to-[#6B0F2B]">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{faculty.name}</h3>
                  <p className="text-sm text-white/90">{faculty.designation}</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-5 h-5 text-[#8B1538]" />
                  <div>
                    <p className="text-xs text-gray-500">Qualification</p>
                    <p className="text-sm font-semibold">{faculty.qualification}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Award className="w-5 h-5 text-[#8B1538]" />
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm font-semibold">{faculty.experience}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Specialization</p>
                  <p className="text-sm font-semibold text-[#8B1538]">{faculty.specialization}</p>
                </div>

                <div className="pt-3 space-y-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Mail className="w-4 h-4 text-[#8B1538]" />
                    <span className="truncate">{faculty.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Phone className="w-4 h-4 text-[#8B1538]" />
                    <span>{faculty.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-white/90">Expert Teachers</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">25+</p>
              <p className="text-white/90">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-white/90">Departments</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100%</p>
              <p className="text-white/90">Qualified Staff</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
};

export default Faculties;