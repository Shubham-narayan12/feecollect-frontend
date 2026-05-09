"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

/* ================= NEWS TICKER ================= */
function NewsTicker() {
  const news = [
    "Green Field School: Excellence in Education Since 1999 — Shaping the Future of Every Child!",
    "Admission open for 2025-26 session — Apply now!",
    "Annual Sports Day on 15th May 2025.",
    "Board results declared — Congrats!",
    "PTM on 20th May 2025.",
  ];

  const repeated = [...news, ...news];

  return (
    <div className="flex items-center h-9 sm:h-10 overflow-hidden bg-green-500">
      <div className="bg-white px-3 sm:px-5 h-full flex items-center shrink-0">
        <span className="font-bold text-[10px] sm:text-sm text-orange-500">
          SCHOOL NEWS :
        </span>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          {repeated.map((item, i) => (
            <span
              key={i}
              className="px-6 sm:px-10 text-white font-semibold text-[10px] sm:text-sm"
            >
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
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

/* ================= NAVBAR ================= */
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

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
          />
          <div className="leading-tight">
            <h1 className="text-sm sm:text-lg font-bold">GREEN FIELD SCHOOL</h1>
            <p className="text-[10px] sm:text-xs text-green-600">
              Affiliated To CBSE — Est. 1995
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-6 xl:gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              {!item.hasDropdown ? (
                <Link
                  to={item.path}
                  className="font-semibold text-gray-800 hover:text-green-600 transition"
                >
                  {item.name}
                </Link>
              ) : (
                <div
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 font-semibold">
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === index && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded mt-2 w-44">
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

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white px-5 py-4 shadow-md flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {!item.hasDropdown ? (
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-semibold text-gray-800"
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <p className="font-semibold text-green-600 mt-2">
                    {item.name}
                  </p>
                  {item.dropdownItems.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block pl-4 py-2 text-gray-700"
                    >
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
