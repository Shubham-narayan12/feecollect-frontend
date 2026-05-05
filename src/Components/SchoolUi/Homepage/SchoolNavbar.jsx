import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Home, Menu, X } from "lucide-react";

function SchoolNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "About Us", hasDropdown: false, path: "/aboutUs" },
    { name: "Gallery", hasDropdown: false, path: "/GalleryPage" },
    { name: "Enquiry", hasDropdown: false, path: "/enquiry" },
    { name: "Contact Us", hasDropdown: false, path: "/contact" },
    {
      name: "Our Team",
      hasDropdown: true,
      dropdownItems: [
        { name: "Director's Desk", path: "/team/director" },
        { name: "Principal's Desk", path: "/team/principal" },
        { name: "Faculties", path: "/team/faculties" },
      ],
    },
  ];

  return (
    <div className="sticky top-0 z-50">
      <nav
        className={`relative transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-xl"
            : "bg-gradient-to-r from-white/90 via-white/85 to-white/90 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="flex items-center">
          

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
                  Green Field School
                </h1>
                <p className="text-xs text-gray-600 hover:text-[#8B1538] transition-colors duration-300">
                  Excellence in Education Since 1995
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
                          className="block px-5 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] transition-all duration-300 font-medium transform hover:translate-x-2 hover:scale-105"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[#8B1538]/10 transition-colors duration-300 transform hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={28} className="text-[#8B1538] animate-spin-in" />
              ) : (
                <Menu size={28} className="text-[#8B1538] animate-fade-in" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#8B1538]/20 animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-[#8B1538]/50 transform hover:scale-105 transition-all duration-300"
              >
                Home
              </Link>

              {menuItems.map((item, index) => (
                <div key={index} className="animate-fade-in-stagger" style={{ animationDelay: `${index * 0.1}s` }}>
                  {!item.hasDropdown ? (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg hover:bg-gradient-to-r from-[#8B1538]/10 to-[#6B0F2B]/10 hover:text-[#8B1538] font-medium transform hover:translate-x-2 transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-2">
                      <div className="px-4 py-2 font-bold text-[#8B1538] flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" />
                        {item.name}
                      </div>
                      {item.dropdownItems.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-8 py-2 rounded-lg hover:bg-[#8B1538]/10 hover:text-[#8B1538] font-medium transform hover:translate-x-2 transition-all duration-300"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
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
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            max-height: 600px;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes pulse-color {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes spin-in {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.5s ease-out backwards;
        }

        .animate-dropdown {
          animation: dropdown 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .animate-pulse-color {
          animation: pulse-color 2s ease-in-out infinite;
        }

        .animate-spin-in {
          animation: spin-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SchoolNavbar;