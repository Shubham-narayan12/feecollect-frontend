import React, { useState, useEffect } from "react";
import { X, Save, Upload, Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "react-toastify";

export default function StudentEditModal({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    admissionDate: "",
    gender: "",
    aadharNo: "",
    penNo: "",
    mobile: "",
    className: "",
    section: "",
    rollNo: "",
    session: "",
    address1: "",
    address2: "",
    city: "",
    religion: "",
    category: "",
    bloodGroup: "",
    transport: "",
    vehicle: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [fatherPhotoPreview, setFatherPhotoPreview] = useState(null);
  const [motherPhotoPreview, setMotherPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fee-related states
  const [recommendedFee, setRecommendedFee] = useState([]);
  const [masterFee, setMasterFee] = useState({
    admissionFee: 0,
    annualFee: 0,
    tuitionFee: 0,
    transportFee: 0,
  });
  const [hasRecommendedFee, setHasRecommendedFee] = useState(false);
  const [hasMasterFee, setHasMasterFee] = useState(false);

  // Load student data when modal opens
  useEffect(() => {
    if (student) {
      setFormData({
        studentName: student.studentName || "",
        fatherName: student.fatherName || "",
        motherName: student.motherName || "",
        dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : "",
        admissionDate: student.admissionDate ? new Date(student.admissionDate).toISOString().split('T')[0] : "",
        gender: student.gender || "",
        aadharNo: student.aadharNo || "",
        penNo: student.penNo || "",
        mobile: student.mobile || "",
        className: student.className || "",
        section: student.section || "",
        rollNo: student.rollNo || "",
        session: student.session || "",
        address1: student.address1 || "",
        address2: student.address2 || "",
        city: student.city || "",
        religion: student.religion || "",
        category: student.category || "",
        bloodGroup: student.bloodGroup || "",
        transport: student.transport || "",
        vehicle: student.vehicle || "",
      });

      // Set existing photo previews
      if (student.photo) setPhotoPreview(student.photo);
      if (student.fatherPhoto) setFatherPhotoPreview(student.fatherPhoto);
      if (student.motherPhoto) setMotherPhotoPreview(student.motherPhoto);

      // Load fee data
      if (student.recommendedFees && student.recommendedFees.length > 0) {
        setRecommendedFee(student.recommendedFees);
        setHasRecommendedFee(true);
      }

      if (student.masterFee) {
        setMasterFee({
          admissionFee: student.masterFee.admissionFee || 0,
          annualFee: student.masterFee.annualFee || 0,
          tuitionFee: student.masterFee.tuitionFee || 0,
          transportFee: student.masterFee.transportFee || 0,
        });
        setHasMasterFee(true);
      }
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFatherPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFatherPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMotherPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMotherPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Recommended Fee Functions
  const addRecommendedFeeItem = () => {
    setRecommendedFee([...recommendedFee, { feeType: "", amount: 0 }]);
    setHasRecommendedFee(true);
  };

  const updateRecommendedFeeItem = (index, field, value) => {
    const updated = [...recommendedFee];
    updated[index][field] = field === "amount" ? Number(value) : value;
    setRecommendedFee(updated);
  };

  const removeRecommendedFeeItem = (index) => {
    const updated = recommendedFee.filter((_, i) => i !== index);
    setRecommendedFee(updated);
    if (updated.length === 0) {
      setHasRecommendedFee(false);
    }
  };

  const deleteAllRecommendedFees = () => {
    if (window.confirm("Are you sure you want to delete all recommended fees?")) {
      setRecommendedFee([]);
      setHasRecommendedFee(false);
      toast.success("Recommended fees deleted");
    }
  };

  // Master Fee Functions
  const updateMasterFee = (field, value) => {
    setMasterFee((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
    setHasMasterFee(true);
  };

  const deleteMasterFee = () => {
    if (window.confirm("Are you sure you want to delete the master fee structure?")) {
      setMasterFee({
        admissionFee: 0,
        annualFee: 0,
        tuitionFee: 0,
        transportFee: 0,
      });
      setHasMasterFee(false);
      toast.success("Master fee deleted");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.studentName || !formData.fatherName || !formData.className) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    
    try {
      // Prepare updated data including fees
      const updatedData = {
        ...student,
        ...formData,
        recommendedFees: hasRecommendedFee ? recommendedFee.filter(fee => fee.feeType && fee.amount > 0) : [],
        masterFee: hasMasterFee ? masterFee : null,
      };

      // Call the onSave prop with updated data
      await onSave(updatedData);
      
      toast.success("Student updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                Edit Student Information
              </h3>
              <p className="text-blue-100 text-sm mt-1">
                Serial No: {student?.serialNo} | PEN: {student?.penNo}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Photos Section */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              Photographs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Student Photo */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-semibold text-slate-700 mb-3">Student Photo</label>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Father Photo */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-semibold text-slate-700 mb-3">Father Photo</label>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg">
                    {fatherPhotoPreview ? (
                      <img
                        src={fatherPhotoPreview}
                        alt="Father"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="father-photo-upload"
                    className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <input
                      id="father-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFatherPhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Mother Photo */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-semibold text-slate-700 mb-3">Mother Photo</label>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg">
                    {motherPhotoPreview ? (
                      <img
                        src={motherPhotoPreview}
                        alt="Mother"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="mother-photo-upload"
                    className="absolute bottom-0 right-0 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <input
                      id="mother-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleMotherPhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information Section */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              Student Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Father's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Admission Date
                </label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  maxLength={12}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  PEN Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="penNo"
                  value={formData.penNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-100 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
              Academic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                  required
                >
                  <option value="">Select Class</option>
                  {["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                >
                  <option value="">Select Section</option>
                  {["A", "B", "C", "D"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Session
                </label>
                <input
                  type="text"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Religion
                </label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Christian">Christian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
              Address Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Transport Section */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
              Transport Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Transportation
                </label>
                <input
                  type="text"
                  name="transport"
                  value={formData.transport}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="e.g., Alawalpur | Rs.500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="e.g., Bus, Van, Auto"
                />
              </div>
            </div>
          </div>

          {/* ========== RECOMMENDED FEE SECTION ========== */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
                Recommended Fee (Student-Specific)
              </h4>
              {hasRecommendedFee && (
                <button
                  type="button"
                  onClick={deleteAllRecommendedFees}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete All
                </button>
              )}
            </div>

            {hasRecommendedFee ? (
              <div className="space-y-3">
                {recommendedFee.map((fee, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Fee Type
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Registration Fee"
                            value={fee.feeType}
                            onChange={(e) => updateRecommendedFeeItem(idx, "feeType", e.target.value)}
                            className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Amount (₹)
                          </label>
                          <input
                            type="number"
                            placeholder="0"
                            value={fee.amount}
                            onChange={(e) => updateRecommendedFeeItem(idx, "amount", e.target.value)}
                            className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRecommendedFeeItem(idx)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRecommendedFeeItem}
                  className="w-full py-3 border-2 border-dashed border-green-300 rounded-xl text-green-700 hover:border-green-500 hover:bg-green-50 font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" /> Add Fee Item
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setHasRecommendedFee(true);
                  addRecommendedFeeItem();
                }}
                className="w-full py-4 border-2 border-dashed border-green-300 rounded-xl text-green-700 hover:border-green-500 hover:bg-green-50 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" /> Add Recommended Fee
              </button>
            )}
          </div>

          {/* ========== MASTER FEE SECTION ========== */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                Master Fee Structure (Class-Based)
              </h4>
              {hasMasterFee && (
                <button
                  type="button"
                  onClick={deleteMasterFee}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>

            {hasMasterFee ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Admission Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={masterFee.admissionFee}
                    onChange={(e) => updateMasterFee("admissionFee", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={masterFee.annualFee}
                    onChange={(e) => updateMasterFee("annualFee", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Tuition Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={masterFee.tuitionFee}
                    onChange={(e) => updateMasterFee("tuitionFee", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Transport Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={masterFee.transportFee}
                    onChange={(e) => updateMasterFee("transportFee", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setHasMasterFee(true)}
                className="w-full py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-700 hover:border-blue-500 hover:bg-blue-50 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" /> Add Master Fee Structure
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t-2 border-slate-200 sticky bottom-0 bg-white pb-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}