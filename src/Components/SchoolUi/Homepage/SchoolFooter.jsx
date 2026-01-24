import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

const SchoolFooter = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Gallery', path: '/GalleryPage' },
    { name: 'Enquiry', path: '/enquiry' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const ourTeam = [
    { name: "Director's Desk", path: '/team/director' },
    { name: "Principal's Desk", path: '/team/principal' },
    { name: 'Faculties', path: '/team/faculties' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">TCS</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Thawe Central</h3>
                <p className="text-sm text-gray-400">School</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students with excellence in education, character, and innovation for over 25 years.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-600"></div>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Team */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white relative inline-block">
              Our Team
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-600"></div>
            </h4>
            <ul className="space-y-3">
              {ourTeam.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white relative inline-block">
              Contact Us
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-600"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Location</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    AT - BEDUTOLA,<br />
                    POST OFFICE - THAWE<br />
                    DIST - GOPALGANJ,<br />
                    PIN CODE - 841440
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Phone</p>
                  <a href="tel:+919471404548" className="text-gray-400 text-sm hover:text-red-500 transition-colors block">
                    +91 - 9471404548
                  </a>
                  <a href="tel:+917050154850" className="text-gray-400 text-sm hover:text-red-500 transition-colors block">
                    +91 - 7050154850
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Email</p>
                  <a href="mailto:thawecentralschool@gmail.com" className="text-gray-400 text-sm hover:text-red-500 transition-colors break-all">
                    thawecentralschool@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Thawe Central School. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>

      {/* Sanskrit Motto */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 py-3">
        <p className="text-center text-white font-semibold text-sm tracking-wide">
          सा विद्या या विमुक्तये
        </p>
      </div>
    </footer>
  );
};

export default SchoolFooter;