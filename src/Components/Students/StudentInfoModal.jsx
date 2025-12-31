import { useState } from "react";
import { 
  X,
  User,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  Save
} from "lucide-react";

export default function StudentInfoModal({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    studentName: student?.studentName || "",
    className: student?.className || "",
    section: student?.section || "",
    dateOfBirth: student?.dateOfBirth || "",
    gender: student?.gender || "Boy",
    rollNo: student?.rollNo || "",
    fatherName: student?.fatherName || "",
    motherName: student?.motherName || "",
    mobile: student?.mobile || "",
    address1: student?.address1 || "",
    address2: student?.address2 || "",
    city: student?.city || "",
    religion: student?.religion || "",
    category: student?.category || "",
    bloodGroup: student?.bloodGroup || "",
    aadharNo: student?.aadharNo || "",
    admissionDate: student?.admissionDate || "",
    session: student?.session || "",
    transport: student?.transport || "",
    vehicleType: student?.vehicleType || "",
    discount: student?.discount || "No Discount",
    studentPhoto: student?.studentPhoto || null,
    fatherPhoto: student?.fatherPhoto || null,
    motherPhoto: student?.motherPhoto || null,
    documents: {
      tc: student?.documents?.tc || false,
      character: student?.documents?.character || false,
      reportCard: student?.documents?.reportCard || false,
      birthCert: student?.documents?.birthCert || false,
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (docName) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [docName]: !prev.documents[docName] }
    }));
  };

  const handlePhotoUpload = (e, photoType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [photoType]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]
 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl my-8">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <User className="w-7 h-7" />
              Student Information
            </h2>
            <p className="text-blue-100 text-sm mt-1">View and edit complete student details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          
          {/* STUDENT INFORMATION */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b-2 border-blue-500 pb-2">
              <User className="w-5 h-5 text-blue-600" />
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Class</option>
                  {["Nursery", "KG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Section</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Section</option>
                  {["A", "B", "C", "D"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {["Boy", "Girl"].map(g => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm font-medium text-slate-700">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter roll number"
                />
              </div>
            </div>
          </div>

          {/* PARENT INFORMATION */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b-2 border-green-500 pb-2">
              <User className="w-5 h-5 text-green-600" />
              Parent Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Father's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter father's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter mother's name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>
          </div>

          {/* ADDRESS & PERSONAL DETAILS */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b-2 border-purple-500 pb-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Address & Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Address Line 1</label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Address Line 2</label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Religion</option>
                  {["Hindu", "Muslim", "Sikh", "Christian"].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Category</option>
                  {["General", "OBC", "SC", "ST"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength={12}
                />
              </div>
            </div>
          </div>

          {/* ACADEMIC & TRANSPORT DETAILS */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              Academic & Transport Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Admission Date</label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Session <span className="text-red-500">*</span>
                </label>
                <select
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Session</option>
                  {["2024-25", "2025-26", "2026-27"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Transport</label>
                <select
                  name="transport"
                  value={formData.transport}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Transport</option>
                  <option value="Alawalpur | Rs.500">Alawalpur | Rs.500</option>
                  <option value="City Center | Rs.600">City Center | Rs.600</option>
                  <option value="No Transport">No Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  <option value="">Select Vehicle Type</option>
                  {["Bus", "Van", "Auto", "---"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Discount</label>
                <select
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white"
                >
                  {["No Discount", "10%", "20%", "50%"].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* PHOTOS */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b-2 border-indigo-500 pb-2">
              <Upload className="w-5 h-5 text-indigo-600" />
              Student Photo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: "studentPhoto", label: "Student Photo" },
                { key: "fatherPhoto", label: "Father Photo" },
                { key: "motherPhoto", label: "Mother Photo" }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition cursor-pointer">
                    {formData[key] ? (
                      <img src={formData[key]} alt={label} className="w-32 h-32 object-cover rounded-lg mx-auto mb-2" />
                    ) : (
                      <div className="w-32 h-32 bg-slate-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                    <label className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-700">
                      Click to upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, key)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENTS RECEIVED */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b-2 border-red-500 pb-2">
              <FileText className="w-5 h-5 text-red-600" />
              Documents Received
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "tc", label: "Transfer Certificate (TC)" },
                { key: "character", label: "Character Certificate" },
                { key: "reportCard", label: "Report Card" },
                { key: "birthCert", label: "Date of Birth Certificate" }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDocumentChange(key)}
                      className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 ${
                        formData.documents[key]
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {formData.documents[key] ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {formData.documents[key] ? "Yes" : "No"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-6 border-t-2 border-slate-200">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}