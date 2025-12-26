import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFeeStructure } from "../api/feeStructure.js";
import { toast } from "react-toastify";
import {
  DollarSign,
  GraduationCap,
  Calendar,
  FileText,
  Bus,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

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

  const feeFields = [
    { name: "admissionFee", label: "Admission Fee", icon: DollarSign, color: "purple" },
    { name: "tuitionFee", label: "Tuition Fee", icon: GraduationCap, color: "blue" },
    { name: "annualFee", label: "Annual Fee", icon: Calendar, color: "green" },
    { name: "examFee", label: "Exam Fee", icon: FileText, color: "orange" },
    { name: "transportFee", label: "Transport Fee (optional)", icon: Bus, color: "cyan" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: "bg-purple-50 border-purple-200 focus:border-purple-500 focus:ring-purple-100",
      blue: "bg-blue-50 border-blue-200 focus:border-blue-500 focus:ring-blue-100",
      green: "bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-100",
      orange: "bg-orange-50 border-orange-200 focus:border-orange-500 focus:ring-orange-100",
      cyan: "bg-cyan-50 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-100",
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color) => {
    const colors = {
      purple: "text-purple-600",
      blue: "text-blue-600",
      green: "text-green-600",
      orange: "text-orange-600",
      cyan: "text-cyan-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Fee Structure Settings</h2>
                <p className="text-gray-600 text-sm mt-1">Configure fee structure for each class</p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          
          {/* CLASS */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Select Class
            </label>
            <select
              name="className"
              value={form.className}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-lg font-medium"
            >
              <option value="">Choose a class</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>

          {/* FEES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {feeFields.map(({ name, label, icon: Icon, color }) => (
              <div key={name}>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Icon className={`w-5 h-5 ${getIconColor(color)}`} />
                  {label}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input
                    type="number"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder="0"
                    className={`w-full border-2 ${getColorClasses(color)} pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 transition-all text-lg font-medium`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* EXTRA FEES */}
          <div className="mt-8 border-t-2 border-gray-100 pt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Additional Fees</h3>
            </div>

            {form.extraFees.length > 0 && (
              <div className="space-y-3 mb-5">
                {form.extraFees.map((fee, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-green-200 p-4 rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{fee.title}</p>
                        <p className="text-sm text-gray-600">Amount: ₹{fee.amount}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeExtraFee(i)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all group-hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-3">Add New Fee</p>
              <div className="flex gap-3">
                <input
                  placeholder="Fee title (e.g. Sports Fee)"
                  value={extraTitle}
                  onChange={(e) => setExtraTitle(e.target.value)}
                  className="border-2 border-gray-300 focus:border-green-500 bg-white p-3 rounded-xl flex-1 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
                />
                <div className="relative w-40">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input
                    placeholder="Amount"
                    type="number"
                    value={extraAmount}
                    onChange={(e) => setExtraAmount(e.target.value)}
                    className="w-full border-2 border-gray-300 focus:border-green-500 bg-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
                  />
                </div>
                <button
                  onClick={addExtraFee}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
          >
            <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Save Fee Structure
          </button>
        </div>
      </div>
    </div>
  );
}