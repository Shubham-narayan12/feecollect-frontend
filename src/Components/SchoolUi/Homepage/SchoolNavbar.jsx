import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

function NewsTicker() {
  const news = [
    "Thawe Central School: Excellence in Education Since 1999 — Shaping the Future of Every Child!",
    "Admission open for 2025-26 session — Apply now!",
    "Annual Sports Day on 15th May 2025.",
    "Board results declared — Congrats!",
    "PTM on 20th May 2025.",
  ];

  const repeated = [...news, ...news];

  return (
    <div className="flex items-center h-10 overflow-hidden bg-green-400">
      <div className="bg-white px-5 h-full flex items-center">
        <span className="font-bold text-sm text-orange-500">SCHOOL NEWS :</span>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          {repeated.map((item, i) => (
            <span key={i} className="px-10 text-yellow-200 font-bold text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

function SchoolNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutUs" },
    { name: "Admission", path: "/enquiry" },
    { name: "Gallery", path: "/GalleryPage" },
    {
      name: "Our Team",
      hasDropdown: true,
      dropdownItems: [
        { name: "Director's Desk", path: "/team/director" },
        { name: "Principal's Desk", path: "/team/principal" },
        { name: "Faculties", path: "/team/faculties" },
      ],
    },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white shadow">
      <NewsTicker />

      <nav className="flex items-center justify-between px-6 h-20">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-40 h-40rounded-full" />
          <div>
            <h1 className="text-lg font-bold">GREEN FIELD SCHOOL</h1>
            <p className="text-xs text-green-600">
              Affiliated To CBSE — Est. 1999
            </p>
          </div>

          {/* Navbar Content - Reduced Height */}
          <div className="flex-1 flex items-center justify-between px-6 h-20">
            {/* Logo */}
            <div className="flex items-center gap-4 animate-slide-in-right">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=259,fit=crop/dOqNXeekPrHE45km/tcs-logo-123-d95rjaVGMBUEGBLg.png"
                alt="Thawe Central School Logo"
                className="w-16 h-16 object-contain rounded-full bg-white p-1 shadow-lg hover:shadow-[#8B1538]/50 transform hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent hover:from-[#8B1538] hover:via-[#6B0F2B] hover:to-[#8B1538] transition-all duration-500">
                  Thawe Central School GOPALGANJ
                </h1>
                <p className="text-xs text-gray-600 hover:text-[#8B1538] transition-colors duration-300">
                  Excellence in Education Since 1999
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2 animate-fade-in">
              {/* Home */}
              <Link
                to="/"
                className="p-3 bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] hover:from-[#6B0F2B] hover:to-[#8B1538] text-white rounded-lg shadow-lg hover:shadow-[#8B1538]/50 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
              </Link>

              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  {!item.hasDropdown ? (
                    <Link
                      to={item.path}
                      className="px-5 py-2.5 text-gray-700 hover:text-white font-semibold rounded-lg relative overflow-hidden transition-all duration-300 hover:scale-105 group"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                    </Link>
                  ) : (
                    <button
                      className="px-5 py-2.5 text-gray-700 hover:text-white font-semibold rounded-lg flex items-center gap-2 relative overflow-hidden transition-all duration-300 hover:scale-105 group"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDown className={`w-4 h-4 relative z-10 transform transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                    </button>
                  )}

                  {/* Dropdown */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl py-3 min-w-[220px] z-50 border border-[#8B1538]/20 animate-dropdown"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdownItems.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          className="block px-4 py-2 hover:bg-green-100"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-5 py-3 flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {!item.hasDropdown ? (
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-bold"
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <p className="font-bold text-green-600">{item.name}</p>
                  {item.dropdownItems.map((sub, i) => (
                    <Link key={i} to={sub.path} className="block pl-4 py-1">
                      {sub.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SchoolNavbar;
