import { addStudent } from "../../../../Data/studentStorage";

import React, { useState } from "react";
import { createStudent } from "../../../../api/studentApi.js";
import { toast } from "react-toastify";

export default function AdmissionForm() {
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    aadharNo: "",
    penNo: "",
    className: "",
    section: "",
    dob: "",
    session: "2026-2027",
    mobile: "",
    gender: "",
    religion: "",
    category: "",
    address1: "",
    address2: "",
    city: "",
    rollNo: "",
    transport: "",
    vehicle: "",
    bloodGroup: "",

    // 👇 FILE OBJECTS
    photoPreview: null,
    fatherPhotoPreview: null,
    motherPhotoPreview: null,
  });

  function handleInput(e) {
    const { name, value } = e.target;

    // Limit Aadhar number to 12 digits
    if (name === "aadharNo" && value.length > 12) {
      return;
    }

    // Limit PEN number to 12 digits
    if (name === "penNo" && value.length > 12) {
      return;
    }

    setForm({ ...form, [name]: value });
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  }

  function handleFatherPhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        fatherPhoto: file,
        fatherPhotoPreview: URL.createObjectURL(file),
      });
    }
  }

  function handleMotherPhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        motherPhoto: file,
        motherPhotoPreview: URL.createObjectURL(file),
      });
    }
  }

  /******************* SAVE ADMISSION + ADD STUDENT *******************/
  async function submitForm() {
    try {
      // 🔹 Basic validation
      if (
        !form.studentName ||
        !form.fatherName ||
        !form.penNo ||
        !form.className ||
        !form.session
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // Validate Aadhar number (12 digits)
      if (form.aadharNo && form.aadharNo.length !== 12) {
        toast.error("Aadhar number must be exactly 12 digits");
        return;
      }

      // Validate PEN number (12 digits)
      if (form.penNo.length !== 12) {
        toast.error("PEN number must be exactly 12 digits");
        return;
      }

      const formData = new FormData();

      // 🔹 Normal primitive fields only
      Object.keys(form).forEach((key) => {
        if (
          [
            "photo",
            "fatherPhoto",
            "motherPhoto",
            "photoPreview",
            "fatherPhotoPreview",
            "motherPhotoPreview",
            "feeBenefit",
            "recommendedFees",
          ].includes(key)
        ) {
          return;
        }

        if (form[key] !== undefined && form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      // 🔹 Fee Benefit (OBJECT → JSON)
      if (form.feeBenefit) {
        formData.append(
          "feeBenefit",
          JSON.stringify({
            hasFeeBenefit: form.feeBenefit.hasFeeBenefit,
            description: form.feeBenefit.description || "",
          }),
        );
      }

      // 🔹 Recommended Fees (ARRAY → JSON)
      if (
        form.feeBenefit?.hasFeeBenefit &&
        Array.isArray(form.recommendedFees) &&
        form.recommendedFees.length > 0
      ) {
        formData.append(
          "recommendedFees",
          JSON.stringify(
            form.recommendedFees.map((f) => ({
              feeType: f.feeType,
              amount: Number(f.amount),
            })),
          ),
        );
      }

      // 🔹 File fields
      if (form.photo) {
        formData.append("photo", form.photo);
      }

      if (form.fatherPhoto) {
        formData.append("fatherPhoto", form.fatherPhoto);
      }

      if (form.motherPhoto) {
        formData.append("motherPhoto", form.motherPhoto);
      }

      // 🔹 API CALL
      const res = await createStudent(formData);

      toast.success(res?.data?.message || "Student added successfully");

      // 🔹 Reset Form
      setForm({
        studentName: "",
        fatherName: "",
        motherName: "",
        aadharNo: "",
        penNo: "",
        className: "",
        section: "",
        session: "2026-2027",
        mobile: "",
        gender: "",
        religion: "",
        category: "",
        address1: "",
        address2: "",
        city: "",
        dob: "",
        rollNo: "",
        transport: "",
        vehicle: "",
        bloodGroup: "",

        feeBenefit: {
          hasFeeBenefit: false,
          description: "",
        },

        recommendedFees: [],

        photo: null,
        fatherPhoto: null,
        motherPhoto: null,
      });
    } catch (error) {
      console.error("Create student error:", error);
      toast.error(error?.response?.data?.message || "Failed to create student");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                New Admission Form
              </h2>
              <p className="text-slate-500 mt-1">
                Fill in the student details to complete admission
              </p>
            </div>
          </div>
        </div>

        {/* Student Basic Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Student Information
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Student Name"
                name="studentName"
                value={form.studentName}
                onChange={handleInput}
                required
              />

              <Select
                label="Class"
                name="className"
                value={form.className}
                onChange={handleInput}
                options={[
                  "Nursery",
                  "KG",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                ]}
                required
              />

              <Select
                label="Section"
                name="section"
                value={form.section}
                onChange={handleInput}
                options={["A", "B", "C", "D"]}
                required
              />

              <Input
                type="date"
                label="Date of Birth"
                name="dob"
                value={form.dob}
                onChange={handleInput}
                required
              />

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender
                </label>
                <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value="Boy"
                      onChange={handleInput}
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                      Boy
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value="Girl"
                      onChange={handleInput}
                      className="w-4 h-4 text-pink-600 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-pink-600 transition-colors">
                      Girl
                    </span>
                  </label>
                </div>
              </div>

              <Input
                label="Roll Number"
                name="rollNo"
                value={form.rollNo}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        {/* Parent Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Parent Information
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Father's Name"
                name="fatherName"
                value={form.fatherName}
                onChange={handleInput}
                
              />
              <Input
                label="Mother's Name"
                name="motherName"
                value={form.motherName}
                onChange={handleInput}
              />
              <Input
                label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        {/* Address & Personal Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Address & Personal Details
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Address Line 1"
                name="address1"
                value={form.address1}
                onChange={handleInput}
              />
              <Input
                label="Address Line 2"
                name="address2"
                value={form.address2}
                onChange={handleInput}
              />
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleInput}
              />
              <Select
                label="Religion"
                name="religion"
                value={form.religion}
                onChange={handleInput}
                options={["Hindu", "Muslim", "Sikh", "Christian"]}
              />
              <Select
                label="Category"
                name="category"
                value={form.category}
                onChange={handleInput}
                options={["General", "OBC", "SC", "ST"]}
              />
              <Select
                label="Blood Group"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleInput}
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
              />
              <Input
                type="number"
                label="Aadhar Number (12 digits)"
                name="aadharNo"
                value={form.aadharNo}
                onChange={handleInput}
                placeholder="Enter 12 digit Aadhar"
                maxLength={12}
                
              />
              <Input
                type="number"
                label="PEN No (12 digits)"
                name="penNo"
                value={form.penNo}
                onChange={handleInput}
                placeholder="Enter 12 digit PEN"
                maxLength={12}
                
              />
            </div>
          </div>
        </div>

        {/* Academic & Transport Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              Academic & Transport Details
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Session <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="session"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-700 font-semibold cursor-not-allowed"
                  value="2026-2027"
                  readOnly
                  disabled
                />
              </div>

              <Input
                label="Transportation"
                name="transport"
                value={form.transport}
                onChange={handleInput}
                placeholder="e.g., Alawalpur | Rs.500"
              />

              <Input
                label="Vehicle Type"
                name="vehicle"
                value={form.vehicle}
                onChange={handleInput}
                placeholder="e.g., Bus, Van, Auto"
              />

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Student Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handlePhoto}
                    className="hidden"
                    id="student-upload"
                  />
                  <label
                    htmlFor="student-upload"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    {form.photoPreview ? (
                      <img
                        src={form.photoPreview}
                        className="h-24 w-24 rounded-xl object-cover shadow-md"
                        alt="Student"
                      />
                    ) : (
                      <div className="text-center py-4">
                        <svg
                          className="w-10 h-10 mx-auto text-slate-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs text-slate-500">
                          Click to upload
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Father Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFatherPhoto}
                    className="hidden"
                    id="father-photo"
                  />
                  <label
                    htmlFor="father-photo"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    {form.fatherPhotoPreview ? (
                      <img
                        src={form.fatherPhotoPreview}
                        className="h-24 w-24 rounded-xl object-cover shadow-md"
                        alt="Father"
                      />
                    ) : (
                      <div className="text-center py-4">
                        <svg
                          className="w-10 h-10 mx-auto text-slate-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs text-slate-500">
                          Click to upload
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mother Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleMotherPhoto}
                    className="hidden"
                    id="mother-photo"
                  />
                  <label
                    htmlFor="mother-photo"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    {form.motherPhotoPreview ? (
                      <img
                        src={form.motherPhotoPreview}
                        className="h-24 w-24 rounded-xl object-cover shadow-md"
                        alt="Mother"
                      />
                    ) : (
                      <div className="text-center py-4">
                        <svg
                          className="w-10 h-10 mx-auto text-slate-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs text-slate-500">
                          Click to upload
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Benefit / Recommendation */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mt-6">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Fee Benefit / Recommendation
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Has Fee Benefit */}
              <Select
                label="Has Fee Benefit?"
                name="feeBenefit.hasFeeBenefit"
                value={form.feeBenefit?.hasFeeBenefit ? "Yes" : "No"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    feeBenefit: {
                      ...form.feeBenefit,
                      hasFeeBenefit: e.target.value === "Yes",
                    },
                  })
                }
                options={["No", "Yes"]}
              />

              {/* Description - Only show when hasFeeBenefit is true */}
              {form.feeBenefit?.hasFeeBenefit && (
                <Input
                  label="Benefit Remark / Description"
                  name="feeBenefit.description"
                  value={form.feeBenefit?.description || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      feeBenefit: {
                        ...form.feeBenefit,
                        description: e.target.value,
                      },
                    })
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Recommended Fees */}
        {form.feeBenefit?.hasFeeBenefit && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mt-6">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">
                Recommended Fees (Fee Adjustment)
              </h3>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    recommendedFees: [
                      ...(form.recommendedFees || []),
                      { feeType: "", amount: "" },
                    ],
                  })
                }
                className="bg-white text-emerald-600 px-3 py-1 rounded-lg text-sm font-semibold"
              >
                + Add
              </button>
            </div>

            <div className="p-6 space-y-4">
              {form.recommendedFees?.length === 0 && (
                <p className="text-sm text-gray-500">
                  No recommended fee added
                </p>
              )}

              {form.recommendedFees?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border p-4 rounded-xl"
                >
                  {/* Fee Type */}
                  <Input
                    label="Fee Type"
                    placeholder="Admission / Tuition / Transport"
                    value={item.feeType}
                    onChange={(e) => {
                      const updated = [...form.recommendedFees];
                      updated[index].feeType = e.target.value;
                      setForm({ ...form, recommendedFees: updated });
                    }}
                    required
                  />

                  {/* Amount */}
                  <Input
                    type="number"
                    label="Amount"
                    value={item.amount}
                    onChange={(e) => {
                      const updated = [...form.recommendedFees];
                      updated[index].amount = Number(e.target.value);
                      setForm({ ...form, recommendedFees: updated });
                    }}
                    required
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = form.recommendedFees.filter(
                        (_, i) => i !== index,
                      );
                      setForm({ ...form, recommendedFees: updated });
                    }}
                    className="text-red-600 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() =>
              setForm({
                studentName: "",
                fatherName: "",
                motherName: "",
                aadharNo: "",
                penNo: "",
                className: "",
                section: "",
                session: "2026-2027",
                mobile: "",
                gender: "",
                religion: "",
                category: "",
                address1: "",
                address2: "",
                city: "",
                dob: "",
                rollNo: "",
                transport: "",
                vehicle: "",
                bloodGroup: "",

                feeBenefit: {
                  hasFeeBenefit: false,
                  description: "",
                },

                recommendedFees: [],

                photo: null,
                fatherPhoto: null,
                motherPhoto: null,
              })
            }
            className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Reset Form
          </button>
          <button
            onClick={submitForm}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save Admission
          </button>
        </div>
      </div>
    </div>
  );
}

/********** Reusable Components **********/

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  maxLength,
  disabled = false,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className={`w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700 ${
          disabled ? "bg-slate-100 cursor-not-allowed" : ""
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options, required = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700 bg-white"
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
