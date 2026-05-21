"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  BookOpen,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { FaPaperPlane } from "react-icons/fa";

const EnquiryPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentName: "",
    grade: "",
    dateOfBirth: "",
    previousSchool: "",
    enquiryType: "New Admission",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.phone ||
      !formData.studentName ||
      !formData.message
    ) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        studentName: "",
        grade: "",
        dateOfBirth: "",
        previousSchool: "",
        enquiryType: "New Admission",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800">
      {/* Modern Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 py-20 px-4">
        {/* Abstract design elements for premium look */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-700/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-2xl -ml-20 -mb-20"></div>

        <div className="container mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-green-100/10 text-green-300 font-semibold text-xs uppercase tracking-widest rounded-full mb-3 border border-green-500/20">
            Admissions Open 2026-27
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Begin Your Child's Journey
          </h1>
          <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Fill out the enquiry form below, and our admissions team will guide
            you through the next steps to secure your child's future.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* LEFT SIDE: Info & Accolades (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full"></span>
                Admissions Office
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: "Call Us Today",
                    lines: ["9334205858"],
                    color: "text-blue-600",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    title: "Email Inquiry",
                    lines: ["admissions@thawecentral.edu"],
                    color: "text-emerald-600",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: "Our Campus",
                    lines: ["Green Field School", "Patna, Bihar, India"],
                    color: "text-red-600",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: "Visiting Hours",
                    lines: [
                      "Mon - Fri: 9:00 AM - 3:00 PM",
                      "Sat: 9:00 AM - 12:30 PM",
                    ],
                    color: "text-amber-600",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-green-700 group-hover:bg-green-50 transition-colors duration-200 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-500 text-xs uppercase tracking-wider">
                        {item.title}
                      </p>
                      {item.lines.map((l, idx) => (
                        <p
                          key={idx}
                          className="text-gray-800 font-semibold text-sm mt-0.5"
                        >
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* School Highlights / Trust Indicators */}
            <div className="bg-gradient-to-br from-green-850 to-emerald-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>

              <h3 className="text-lg font-bold text-amber-300 mb-5 tracking-wide">
                Why Thawe Central School?
              </h3>

              <div className="space-y-5">
                {[
                  {
                    icon: <Award className="text-amber-400 shrink-0" />,
                    title: "Academics Excellence",
                    desc: "Consistently delivering top CBSE results in the region.",
                  },
                  {
                    icon: <Users className="text-green-300 shrink-0" />,
                    title: "Optimal Student Ratio",
                    desc: "Personal attention for every student in modern classrooms.",
                  },
                  {
                    icon: <ShieldCheck className="text-emerald-300 shrink-0" />,
                    title: "Safe & Secure Campus",
                    desc: "24/7 CCTV surveillance and verified transport networks.",
                  },
                ].map((highlight, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="p-1">{highlight.icon}</div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">
                        {highlight.title}
                      </h4>
                      <p className="text-xs text-green-100/85 mt-1 leading-relaxed">
                        {highlight.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic & Clean Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Online Enquiry Form
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Fields marked with <span className="text-red-500">*</span> are
                mandatory for submission.
              </p>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-500/30 text-emerald-800 p-4 rounded-xl mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Thank You!</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your inquiry has been successfully logged. Our admissions
                    desk will contact you shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Enquiry Purpose
                </label>
                <select
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="custom-input cursor-pointer"
                >
                  <option value="New Admission">
                    Request for New Admission
                  </option>
                  <option value="Transfer">Transfer from another School</option>
                  <option value="General">General/Other Information</option>
                </select>
              </div>

              {/* Parent Details */}
              <div>
                <span className="block text-xs font-bold text-green-700 uppercase tracking-widest mb-3 border-b pb-1 border-gray-100">
                  Parent/Guardian Information
                </span>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="custom-input"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1 pl-1">
                    Primary Mobile *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1 pl-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="custom-input"
                  />
                </div>
              </div>

              {/* Student Details */}
              <div>
                <span className="block text-xs font-bold text-green-700 uppercase tracking-widest mb-3 border-b pb-1 border-gray-100">
                  Student Details
                </span>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="studentName"
                      placeholder="Student Name *"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </div>
                  <div>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="custom-input cursor-pointer"
                    >
                      <option value="">Target Class/Grade</option>
                      <option value="Playgroup / Nursery">
                        Playgroup / Nursery
                      </option>
                      <option value="LKG / UKG">LKG / UKG</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={`Class ${i + 1}`}>
                          Class {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Student Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 pl-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="custom-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 pl-1">
                    Last School Attended
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    placeholder="Previous School Name"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="custom-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Message or Special Instructions *
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us about your child's interests, learning needs, or ask your questions here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="custom-input resize-none"
                  rows={4}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-800 hover:to-emerald-900 text-white font-bold py-4 px-6 rounded-2xl flex justify-center items-center gap-2.5 shadow-lg shadow-green-900/15 hover:shadow-xl hover:shadow-green-900/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
              >
                Send Request <FaPaperPlane className="text-sm opacity-90" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* STEPPER: Simplified Admission Journey (Premium UI) */}
      <div className="bg-gray-50 border-y border-gray-100 py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950">
              Simple Admission Process
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Smooth, fast, and transparent 4-step registration path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                title: "1. Enquiry Form",
                desc: "Submit the online enquiry form with correct details.",
              },
              {
                title: "2. Campus Visit",
                desc: "Tour our modern infrastructure & discuss with counselors.",
              },
              {
                title: "3. Document Check",
                desc: "Verify essential student and academic records.",
              },
              {
                title: "4. Confirm Seat",
                desc: "Complete basic admission formalities to secure placement.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto bg-green-50 text-green-750 font-bold text-lg flex items-center justify-center rounded-2xl mb-4 border border-green-100 shadow-inner">
                  {i + 1}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Styles for perfect inputs */}
      <style jsx>{`
        .custom-input {
          width: 100%;
          padding: 14px 16px;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          background-color: #fcfdfd;
          transition: all 0.2s ease-in-out;
        }
        .custom-input:hover {
          border-color: #cbd5e1;
        }
        .custom-input:focus {
          outline: none;
          border-color: #15803d;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(21, 128, 61, 0.08);
        }
      `}</style>
    </div>
  );
};

export default EnquiryPage;
