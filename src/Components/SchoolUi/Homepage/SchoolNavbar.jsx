import React, { useState } from 'react';
import { ChevronDown, Home, Menu, X } from 'lucide-react';

function SchoolNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
  { name: 'About Us', hasDropdown: false, path: '/about' },
  { name: 'Gallery', hasDropdown: false, path: '/gallery' },
  { name: 'Contact Us', hasDropdown: false, path: '/contact' },
  { 
    name: 'Our Team', 
    hasDropdown: true,
    dropdownItems: [
      { name: "Director's Desk", path: '/team/director' },
      { name: "Principal's Desk", path: '/team/principal' },
      { name: 'Faculties', path: '/team/faculties' }
    ]
  },
];

  return (
    <div className="relative overflow-visible">
      <nav className="bg-white shadow-md relative z-40 pb-0">
        <div className="flex items-center">
          {/* Vertical Brand Banner - Extended Height with Pointed Bottom */}
          <div className="relative h-32 min-w-[200px] z-50">
            {/* Main Rectangle */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-red-600 via-red-500 to-red-600 shadow-lg">
              {/* Top Golden Rod */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-full h-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-t-sm"></div>
              
              {/* Golden Ornaments */}
              <div className="absolute -top-3 left-1/4 w-6 h-6 bg-yellow-400 rounded-full shadow-md"></div>
              <div className="absolute -top-3 right-1/4 w-6 h-6 bg-yellow-400 rounded-full shadow-md"></div>
              
              {/* Dotted Border */}
              <div className="absolute inset-2 border-2 border-dashed border-white/50 rounded-sm"></div>
              
              {/* Text Content */}
              <div className="relative flex items-center justify-center h-full">
                <div className="text-center px-4">
                  <div className="text-white font-bold text-lg leading-tight uppercase tracking-wider drop-shadow-lg">
                    <div>Future Ready</div>
                    <div>Education</div>
                    <div className="text-sm mt-1 font-semibold">Today</div>
                  </div>
                </div>
              </div>

              {/* Pointed Bottom Triangle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-full">
                <div className="w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-t-[30px] border-t-red-600"></div>
              </div>
            </div>
          </div>

          {/* Main Navbar Content */}
          <div className="flex-1 flex items-center justify-between px-6 h-20">
            {/* Logo and School Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xl">GFS</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-gray-800">Green Field School </span>
                  <span className="text-orange-500">Patna</span>
                </h1>
                <p className="text-sm text-gray-600">Takshila & GFS Society Initiative</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Home Icon */}
              <button className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors">
                <Home className="w-5 h-5" />
              </button>

              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    className="px-4 py-2 text-gray-700 hover:text-orange-500 font-medium flex items-center gap-1 transition-colors"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  {/* Dropdown placeholder */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div 
                      className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        Option 1
                      </a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        Option 2
                      </a>
                      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        Option 3
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-700 hover:text-orange-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium flex items-center justify-between transition-colors"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default SchoolNavbar;
