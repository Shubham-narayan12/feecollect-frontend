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
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              {!item.hasDropdown ? (
                <Link
                  to={item.path}
                  className="font-bold text-gray-800 hover:text-green-600"
                >
                  {item.name}
                </Link>
              ) : (
                <div
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 font-bold">
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === index && (
                    <div className="absolute top-full left-0 bg-white shadow rounded mt-1">
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