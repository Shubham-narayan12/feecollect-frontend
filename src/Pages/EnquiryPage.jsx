import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, BookOpen, Calendar, Users } from 'lucide-react';
import { FaPaperPlane } from 'react-icons/fa';

const EnquiryPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentName: '',
    grade: '',
    dateOfBirth: '',
    previousSchool: '',
    enquiryType: 'admission',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        studentName: '',
        grade: '',
        dateOfBirth: '',
        previousSchool: '',
        enquiryType: 'admission',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0F2B] py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Admission Enquiry
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-white/90 text-center text-lg max-w-2xl mx-auto">
            Take the first step towards your child's bright future. We're here to answer all your questions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Contact Info & Why Choose Us */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-[#8B1538] mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 98765 43211</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">admissions@thawecentral.edu</p>
                    <p className="text-gray-600">info@thawecentral.edu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Address</p>
                    <p className="text-gray-600">Thawe Central School Campus</p>
                    <p className="text-gray-600">Thawe, Bihar, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Office Hours</p>
                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Quality Education</p>
                    <p className="text-white/80 text-sm">Experienced faculty with modern teaching methods</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Small Class Sizes</p>
                    <p className="text-white/80 text-sm">Individual attention for every student</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">25+ Years Legacy</p>
                    <p className="text-white/80 text-sm">Proven track record of excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Enquiry Form */}
          <div className="lg:col-span-2">
            <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 overflow-hidden border border-gray-50">
              <div className="p-8 md:p-16 bg-white">
                {/* Header Text */}
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
                    Send an <span className="text-[#8B1538]">Enquiry</span>
                  </h3>
                  <p className="text-gray-500 italic max-w-md mx-auto">
                    Whether you have a request, a query, or want to know about THAWE CENTRAL SCHOOL, use the form below to get in touch with our team.
                  </p>
                </div>

                {submitted && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6">
                    <p className="text-green-700 font-semibold text-center">
                      ✓ Thank you! Your enquiry has been submitted successfully. We'll contact you soon.
                    </p>
                  </div>
                )}
                
                {/* Main Form */}
                <div className="space-y-6">
                  {/* Enquiry Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Enquiry Type*</label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="custom-input"
                    >
                      <option value="admission">New Admission</option>
                      <option value="transfer">School Transfer</option>
                      <option value="general">General Information</option>
                      <option value="visit">School Visit</option>
                    </select>
                  </div>

                  {/* Parent Name */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">First Name*</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name" 
                        className="custom-input" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Last name*</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name" 
                        className="custom-input" 
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Mobile No*</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000" 
                        className="custom-input" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Your email*</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com" 
                        className="custom-input" 
                      />
                    </div>
                  </div>

                  {/* Student Name and Grade */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Student Name*</label>
                      <input 
                        type="text" 
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Enter student's full name" 
                        className="custom-input" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Grade/Class*</label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="custom-input"
                      >
                        <option value="">Select Grade</option>
                        <option value="nursery">Nursery</option>
                        <option value="lkg">LKG</option>
                        <option value="ukg">UKG</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>Class {i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date of Birth and Previous School */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Date of Birth*</label>
                      <input 
                        type="date" 
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="custom-input" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Previous School</label>
                      <input 
                        type="text" 
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleChange}
                        placeholder="Enter previous school name" 
                        className="custom-input" 
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700 ml-2 uppercase tracking-wider">Message*</label>
                    <textarea 
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific questions or requirements..." 
                      className="custom-input resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button 
                      onClick={handleSubmit}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#002147] font-extrabold py-5 rounded-2xl shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-3 transition-all text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      SUBMIT MESSAGE <FaPaperPlane className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Admission Process */}
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Admission Process</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { num: 1, title: "Submit Enquiry", desc: "Fill the form above" },
                  { num: 2, title: "School Visit", desc: "Tour our campus" },
                  { num: 3, title: "Documentation", desc: "Submit required docs" },
                  { num: 4, title: "Welcome!", desc: "Join our family" }
                ].map((step) => (
                  <div key={step.num} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F2B] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {step.num}
                    </div>
                    <p className="font-semibold text-gray-800">{step.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-input {
          width: 100%;
          padding: 16px 24px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          color: #1e293b;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .custom-input:focus {
          outline: none;
          background: white;
          border-color: #fbbf24;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.1);
        }
      `}</style>
    </div>
  );
};

export default EnquiryPage;