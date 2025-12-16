import { loadAdmissions, saveAdmissions } from "../../Data/admissionStorage";
import { addStudent } from "../../Data/studentStorage";
import React, { useState } from "react";
import { createStudent } from "../../api/studentApi.js";
import { toast } from "react-toastify";

export default function AdmissionForm() {
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    aadharNo: "",
    className: "",
    section: "",
    session: "",
    mobile: "",
    gender: "",
    religion: "",
    category: "",
    address1: "",
    address2: "",
    city: "",
    dob: "",
    admissionDate: "",
    rollNo: "",
    transport: "",
    vehicle: "",
    bloodGroup: "",
    discount: "",
    tc: "No",
    charCert: "No",
    reportCard: "No",
    dobCert: "No",
    photo: null,
  });

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: URL.createObjectURL(file) });
    }
  }

  /******************* SAVE ADMISSION + ADD STUDENT *******************/
  async function submitForm() {
    try {
      // Basic frontend validation (optional but recommended)
      if (
        !form.studentName ||
        !form.fatherName ||
        !form.aadharNo ||
        !form.className ||
        !form.session
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // API CALL
      const res = await createStudent(form);

      // SUCCESS
      toast.success(res?.data?.message || "Student added successfully");

      // Reset Form
      setForm({
        studentName: "",
        fatherName: "",
        motherName: "",
        aadharNo: "",
        className: "",
        section: "",
        session: "",
        mobile: "",
        gender: "",
        religion: "",
        category: "",
        address1: "",
        address2: "",
        city: "",
        dob: "",
        admissionDate: "",
        rollNo: "",
        transport: "",
        vehicle: "",
        bloodGroup: "",
        discount: "",
        tc: "No",
        charCert: "No",
        reportCard: "No",
        dobCert: "No",
        photo: null,
      });
    } catch (error) {
      console.error("Create student error:", error);

      toast.error(error?.response?.data?.message || "Failed to create student");
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl space-y-6">
      <h2 className="text-2xl font-semibold mb-4">New Admission Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-red-100 p-4 rounded-lg">
        <Input
          label="Student Name"
          name="studentName"
          value={form.studentName}
          onChange={handleInput}
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
        />

        <Select
          label="Section"
          name="section"
          value={form.section}
          onChange={handleInput}
          options={["A", "B", "C", "D"]}
        />

        <Input
          label="Address1"
          name="address1"
          value={form.address1}
          onChange={handleInput}
        />
        <Input
          label="Address2"
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

        <Input
          label="Mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleInput}
        />

        <div>
          <label className="block font-medium mb-1">Gender</label>
          <div className="flex items-center gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Boy"
                onChange={handleInput}
              />{" "}
              Boy
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Girl"
                onChange={handleInput}
              />{" "}
              Girl
            </label>
          </div>
        </div>

        <Input
          type="date"
          label="Date of Birth"
          name="dob"
          value={form.dob}
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

        <Input
          label="Father Name"
          name="fatherName"
          value={form.fatherName}
          onChange={handleInput}
        />
        <Input
          label="Mother Name"
          name="motherName"
          value={form.motherName}
          onChange={handleInput}
        />

        <Select
          label="Blood Group"
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleInput}
          options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
        />

        <Input
          type="date"
          label="Adm. Date"
          name="admissionDate"
          value={form.admissionDate}
          onChange={handleInput}
        />
        <Input
          label="Roll No"
          name="rollNo"
          value={form.rollNo}
          onChange={handleInput}
        />

        <Select
          label="Transport"
          name="transport"
          value={form.transport}
          onChange={handleInput}
          options={[
            "Alawalpur | Rs.500",
            "City Center | Rs.600",
            "No Transport",
          ]}
        />

        <Select
          label="Vehicle"
          name="vehicle"
          value={form.vehicle}
          onChange={handleInput}
          options={["Bus", "Van", "Auto", "---"]}
        />

        <div>
          <label className="block font-medium mb-1">Photo</label>
          <input type="file" onChange={handlePhoto} />
          {form.photo && (
            <img src={form.photo} className="h-20 w-20 rounded-full mt-2" />
          )}
        </div>

        <Select
          label="Session"
          name="session"
          value={form.session}
          onChange={handleInput}
          options={["2024-25", "2025-26", "2026-27"]}
        />

        <Input
          label="Aadhar No"
          name="aadharNo"
          value={form.aadharNo}
          onChange={handleInput}
        />
      </div>

      <div className="bg-white border p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Documents Received:</h3>

        <DocRadio label="TC" name="tc" value={form.tc} onChange={handleInput} />
        <DocRadio
          label="Char. Cer."
          name="charCert"
          value={form.charCert}
          onChange={handleInput}
        />
        <DocRadio
          label="Report Card"
          name="reportCard"
          value={form.reportCard}
          onChange={handleInput}
        />
        <DocRadio
          label="DOB Cert."
          name="dobCert"
          value={form.dobCert}
          onChange={handleInput}
        />

        <Select
          label="Discount"
          name="discount"
          value={form.discount}
          onChange={handleInput}
          options={["No Discount", "10%", "20%", "50%"]}
        />
      </div>

      <button
        onClick={submitForm}
        className="px-4 py-2 bg-emerald-500 text-white rounded shadow"
      >
        Save Admission
      </button>
    </div>
  );
}

/********** Reusable Components **********/

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full px-3 py-2 rounded border"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        name={name}
        className="w-full px-3 py-2 rounded border"
        value={value}
        onChange={onChange}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function DocRadio({ label, name, value, onChange }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="font-medium">{label}:</span>
      <label>
        <input type="radio" name={name} value="Yes" onChange={onChange} /> Yes
      </label>
      <label>
        <input type="radio" name={name} value="No" onChange={onChange} /> No
      </label>
    </div>
  );
}
