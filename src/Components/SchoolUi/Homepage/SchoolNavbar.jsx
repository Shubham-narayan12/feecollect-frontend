"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  Users,
  Phone,
  Image,
  Info,
  Home,
  ChevronDown,
} from "lucide-react";

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
    <div className="flex items-center h-8 overflow-hidden bg-green-600">
      <div className="bg-white px-3 h-full flex items-center shrink-0 border-r border-green-300">
        <span className="font-bold text-[10px] text-orange-500 tracking-widest uppercase">
          News
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          {repeated.map((item, i) => (
            <span key={i} className="px-8 text-white font-medium text-[10px]">
              • {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll { animation: scroll 30s linear infinite; }
      `}</style>
    </div>
  );
}

/* ================= MOBILE DRAWER ================= */
function MobileDrawer({ open, onClose }) {
  const [teamOpen, setTeamOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/aboutUs", icon: Info },
    { name: "Admission", path: "/enquiry", icon: GraduationCap },
    { name: "Gallery", path: "/GalleryPage", icon: Image },
    { name: "Contact Us", path: "/contact", icon: Phone },
  ];

  const teamLinks = [
    { name: "Director's Desk", path: "/team/director" },
    { name: "Principal's Desk", path: "/team/principal" },
    { name: "Faculties", path: "/team/faculties" },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTeamOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[82vw] max-w-xs z-50 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#fff", boxShadow: "4px 0 30px rgba(0,0,0,0.12)" }}
      >
        {/* Header */}
        <div
          className="relative flex flex-col items-center pt-10 pb-6 px-5"
          style={{
            background:
              "linear-gradient(135deg, #16a34a 0%, #15803d 60%, #14532d 100%)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1"
          >
            <X size={20} />
          </button>

          {/* School Logo / Avatar */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2 border-white/40"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-50 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span style="font-size:28px">🏫</span>`;
              }}
            />
          </div>

          <h2 className="text-white font-bold text-base tracking-wide text-center leading-tight">
            GREEN FIELD SCHOOL
          </h2>
          <p className="text-green-200 text-[11px] mt-0.5">
            Affiliated To CBSE — Est. 1995
          </p>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-3">
          <p className="px-5 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Navigation
          </p>

          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-green-50 active:bg-green-100 transition-colors"
            >
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(22,163,74,0.1)" }}
              >
                <Icon size={16} className="text-green-600" />
              </span>
              <span className="font-medium text-sm">{name}</span>
              <ChevronRight size={14} className="ml-auto text-gray-300" />
            </Link>
          ))}

          {/* Team Accordion */}
          <button
            onClick={() => setTeamOpen(!teamOpen)}
            className="w-full flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-green-50 active:bg-green-100 transition-colors"
          >
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(22,163,74,0.1)" }}
            >
              <Users size={16} className="text-green-600" />
            </span>
            <span className="font-medium text-sm">Our Team</span>
            <ChevronDown
              size={14}
              className={`ml-auto text-gray-400 transition-transform duration-200 ${teamOpen ? "rotate-180" : ""}`}
            />
          </button>

          {teamOpen && (
            <div className="bg-gray-50 border-l-2 border-green-500 ml-5 mr-3 rounded-r-lg mb-1 overflow-hidden">
              {teamLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={onClose}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 border-b border-gray-100 last:border-0"
                >
                  {name}
                </Link>
              ))}
            </div>
          )}

          <div className="mx-5 my-3 border-t border-gray-100" />

          {/* CTA */}
          <div className="px-5 pt-1 pb-4">
            <Link
              to="/enquiry"
              onClick={onClose}
              className="block w-full text-center py-3 rounded-2xl text-white text-sm font-bold tracking-wide"
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
              }}
            >
              Apply for Admission
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 text-center">
            © 2025 Green Field School. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

/* ================= MAIN NAVBAR ================= */
function SchoolNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <NewsTicker />

      <nav className="flex items-center justify-between px-4 h-14 sm:h-16 lg:h-20 sm:px-6">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
          />
          <div className="leading-tight">
            <h1 className="text-xs sm:text-base lg:text-lg font-bold tracking-tight">
              GREEN FIELD SCHOOL
            </h1>
            <p className="text-[9px] sm:text-xs text-green-600">
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
                  className="font-semibold text-sm text-gray-700 hover:text-green-600 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <div
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 font-semibold text-sm text-gray-700 hover:text-green-600 transition-colors">
                    {item.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${activeDropdown === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown === index && (
                    <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-2 w-48 py-1 border border-gray-100">
                      {item.dropdownItems.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
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
          <Link
            to="/enquiry"
            className="ml-2 px-4 py-2 rounded-full text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
          >
            Apply Now
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

export default SchoolNavbar;
