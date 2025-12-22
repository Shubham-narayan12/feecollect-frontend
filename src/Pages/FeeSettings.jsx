import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFeeStructure } from "../api/feeStructure.js";
import { toast } from "react-toastify";

const CLASSES = [
  "Nursery",
  "KG",
  "1","2","3","4","5","6","7","8","9","10",
];

export default function FeeSettings() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    className: "",
    admissionFee: "",
    tuitionFee: "",
    annualFee: "",
    examFee: "",
    transportFee: "",
    extraFees: [],
  });

  const [extraTitle, setExtraTitle] = useState("");
  const [extraAmount, setExtraAmount] = useState("");

  /* ================= BASIC INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= EXTRA FEES ================= */
  const addExtraFee = () => {
    if (!extraTitle || !extraAmount) {
      toast.error("Extra fee title & amount required");
      return;
    }

    setForm({
      ...form,
      extraFees: [
        ...form.extraFees,
        { title: extraTitle, amount: Number(extraAmount) },
      ],
    });

    setExtraTitle("");
    setExtraAmount("");
  };

  const removeExtraFee = (index) => {
    setForm({
      ...form,
      extraFees: form.extraFees.filter((_, i) => i !== index),
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!form.className) {
      toast.error("Please select class");
      return;
    }

    try {
      const payload = {
        className: form.className,
        admissionFee: Number(form.admissionFee),
        tuitionFee: Number(form.tuitionFee),
        annualFee: Number(form.annualFee),
        examFee: Number(form.examFee),
        transportFee: Number(form.transportFee || 0),
        extraFees: form.extraFees,
      };

      await createFeeStructure(payload);
      toast.success("Fee Structure Created Successfully");

      setForm({
        className: "",
        admissionFee: "",
        tuitionFee: "",
        annualFee: "",
        examFee: "",
        transportFee: "",
        extraFees: [],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Fee Structure Settings</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 font-semibold"
          >
            ← Back
          </button>
        </div>

        {/* CLASS */}
        <div className="mb-4">
          <label className="font-semibold">Class</label>
          <select
            name="className"
            value={form.className}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select Class</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* FEES */}
        {[
          ["admissionFee", "Admission Fee"],
          ["tuitionFee", "Tuition Fee"],
          ["annualFee", "Annual Fee"],
          ["examFee", "Exam Fee"],
          ["transportFee", "Transport Fee (optional)"],
        ].map(([name, label]) => (
          <div className="mb-4" key={name}>
            <label className="font-semibold">{label}</label>
            <input
              type="number"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        ))}

        {/* EXTRA FEES */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">Extra Fees</h3>

          {form.extraFees.map((fee, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-2 rounded mb-2"
            >
              <span>{fee.title} – ₹{fee.amount}</span>
              <button
                onClick={() => removeExtraFee(i)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-3">
            <input
              placeholder="Title"
              value={extraTitle}
              onChange={(e) => setExtraTitle(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <input
              placeholder="Amount"
              type="number"
              value={extraAmount}
              onChange={(e) => setExtraAmount(e.target.value)}
              className="border p-2 rounded w-32"
            />
            <button
              onClick={addExtraFee}
              className="bg-green-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded font-bold"
        >
          Save Fee Structure
        </button>
      </div>
    </div>
  );
}
