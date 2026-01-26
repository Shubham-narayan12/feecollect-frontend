// ============================================
// Pages/FeeCollection.jsx - WITH EDIT/DELETE MODALS
// ============================================
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pencil, Trash2, X, Save, Plus } from "lucide-react";
import { toast } from "react-toastify";

// API imports
import { searchStudentById } from "../api/studentApi";
import { feecollect } from "../api/feeLedgerApi";
import { getAllFeeStructures } from "../api/feeStructure.js";
import { getFeeStructureByClass } from "../api/feeStructure.js";
import { generateFeeReceipt, downloadReceiptPdf } from "../api/receiptApi.js";

// Import child components
import { StudentInfoCard } from "../Components/Sms/Collection/StudentInfoCard";
import { PreviousBalanceCard } from "../Components/Sms/Collection/PreviousBalanceCard";
import { OneTimeFees } from "../Components/Sms/Collection/OneTimeFees";

import { MonthlyFeesSection } from "../Components/Sms/Collection/MonthlyFeesSection";
import { LateFineAlert } from "../Components/Sms/Collection/LateFineAlert";
import { AdditionalFees } from "../Components/Sms/Collection/AdditionalFees";

import { DiscountSection } from "../Components/Sms/Collection/DiscountSection";
import { FeeBreakdownSummary } from "../Components/Sms/Collection/FeeBreakdownSummary";

// Constants
const monthsList = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

// ========== MODAL COMPONENTS ==========

function RecommendedFeeModal({ recommendedFee, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFees, setEditedFees] = useState([...recommendedFee]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Recommended Fee</h3>
              <p className="text-green-100 text-sm">
                Student specific fee structure
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Pencil className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete all recommended fees?"))
                      onDelete();
                  }}
                  className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onUpdate(editedFees);
                  setIsEditing(false);
                }}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Save className="w-5 h-5 text-white" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[500px] overflow-y-auto">
          {isEditing ? (
            <div className="space-y-3">
              {editedFees.map((fee, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        placeholder="Fee Type"
                        value={fee.feeType}
                        onChange={(e) => {
                          const arr = [...editedFees];
                          arr[idx].feeType = e.target.value;
                          setEditedFees(arr);
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={fee.amount}
                        onChange={(e) => {
                          const arr = [...editedFees];
                          arr[idx].amount = Number(e.target.value);
                          setEditedFees(arr);
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <button
                      onClick={() =>
                        setEditedFees(editedFees.filter((_, i) => i !== idx))
                      }
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  setEditedFees([...editedFees, { feeType: "", amount: 0 }])
                }
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-500 hover:bg-green-50 font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add New Fee Item
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {recommendedFee.map((fee, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-lg border border-green-200"
                >
                  <span className="font-medium text-gray-700">
                    {fee.feeType}
                  </span>
                  <span className="font-bold text-green-700">
                    ₹ {fee.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setEditedFees([...recommendedFee]);
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdate(editedFees);
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function MasterFeeModal({ masterFee, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFee, setEditedFee] = useState({ ...masterFee });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Master Fee Structure
              </h3>
              <p className="text-blue-100 text-sm">
                Class: {masterFee.className || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Pencil className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete master fee structure?"))
                      onDelete();
                  }}
                  className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onUpdate(editedFee);
                  setIsEditing(false);
                }}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Save className="w-5 h-5 text-white" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {isEditing ? (
            <>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admission Fee
                </label>
                <input
                  type="number"
                  value={editedFee.admissionFee || 0}
                  onChange={(e) =>
                    setEditedFee({
                      ...editedFee,
                      admissionFee: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Annual Fee
                </label>
                <input
                  type="number"
                  value={editedFee.annualFee || 0}
                  onChange={(e) =>
                    setEditedFee({
                      ...editedFee,
                      annualFee: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Tuition Fee
                </label>
                <input
                  type="number"
                  value={editedFee.tuitionFee || 0}
                  onChange={(e) =>
                    setEditedFee({
                      ...editedFee,
                      tuitionFee: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Transport Fee
                </label>
                <input
                  type="number"
                  value={editedFee.transportFee || 0}
                  onChange={(e) =>
                    setEditedFee({
                      ...editedFee,
                      transportFee: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          ) : (
            <>
              {masterFee.admissionFee > 0 && (
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-lg border border-blue-200">
                  <span className="font-medium text-gray-700">
                    Admission Fee
                  </span>
                  <span className="font-bold text-blue-700">
                    ₹ {masterFee.admissionFee.toLocaleString()}
                  </span>
                </div>
              )}
              {masterFee.annualFee > 0 && (
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-lg border border-blue-200">
                  <span className="font-medium text-gray-700">Annual Fee</span>
                  <span className="font-bold text-blue-700">
                    ₹ {masterFee.annualFee.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-lg border border-blue-200">
                <span className="font-medium text-gray-700">
                  Monthly Tuition Fee
                </span>
                <span className="font-bold text-blue-700">
                  ₹ {masterFee.tuitionFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-lg border border-blue-200">
                <span className="font-medium text-gray-700">
                  Monthly Transport Fee
                </span>
                <span className="font-bold text-blue-700">
                  ₹ {masterFee.transportFee.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setEditedFee({ ...masterFee });
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdate(editedFee);
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ========== UTILITY FUNCTIONS ==========

const calculateLateFine = (month, student) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const admissionDate = student?.admissionDate
    ? new Date(student.admissionDate)
    : null;
  const monthIndex = monthsList.indexOf(month);

  let monthYear = currentYear;
  if (monthIndex >= 9)
    monthYear = currentMonth < 3 ? currentYear : currentYear + 1;
  else monthYear = currentMonth >= 3 ? currentYear : currentYear - 1;

  const monthStartDate = new Date(
    monthYear,
    monthIndex >= 9 ? monthIndex - 9 : monthIndex + 3,
    1,
  );

  if (admissionDate) {
    if (
      monthStartDate <
      new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1)
    )
      return null;

    const admissionMonth = admissionDate.getMonth();
    const admissionYear = admissionDate.getFullYear();
    const thisMonthDate = monthIndex >= 9 ? monthIndex - 9 : monthIndex + 3;

    if (admissionYear === monthYear && admissionMonth === thisMonthDate) {
      const admissionDay = admissionDate.getDate();

      let dueDate;
      if (admissionDay <= 10) {
        dueDate = new Date(monthYear, thisMonthDate, 10);
      } else {
        dueDate = new Date(monthYear, thisMonthDate + 1, 10);
      }

      const lateDays = Math.floor(
        (currentDate - dueDate) / (1000 * 60 * 60 * 24),
      );

      if (lateDays > 0) {
        return {
          month,
          dueDate: dueDate.toLocaleDateString("en-IN"),
          lateDays,
          lateFinePerDay: 10,
          lateFineAmount: lateDays * 10,
          isAdmissionMonth: true,
        };
      }
      return null;
    }
  }

  const dueDate = new Date(
    monthYear,
    monthIndex >= 9 ? monthIndex - 9 : monthIndex + 3,
    10,
  );
  const lateDays = Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24));

  if (lateDays > 0)
    return {
      month,
      dueDate: dueDate.toLocaleDateString("en-IN"),
      lateDays,
      lateFinePerDay: 10,
      lateFineAmount: lateDays * 10,
    };
  return null;
};

const calculateTotals = ({
  admissionFee,
  annualFee,
  monthlyFees,
  extraFees,
  totalLateFine,
  previousBalance,
  discountType,
  discountValue,
  paidAmount,
}) => {
  const monthlyTotal = Object.values(monthlyFees).reduce(
    (sum, m) => (m ? sum + (m.tuitionFee || 0) + (m.transportFee || 0) : sum),
    0,
  );
  const extraTotal = extraFees.reduce(
    (sum, f) =>
      f.title !== "Late Fine (Auto-calculated)" ? sum + (f.amount || 0) : sum,
    0,
  );
  const subtotal =
    Number(admissionFee || 0) +
    Number(annualFee || 0) +
    monthlyTotal +
    extraTotal +
    totalLateFine +
    Number(previousBalance || 0);

  let discountAmount = 0;
  if (discountType === "percentage" && discountValue > 0) {
    discountAmount = Math.min(
      (subtotal * Number(discountValue)) / 100,
      subtotal,
    );
  } else if (discountType === "fixed" && discountValue > 0) {
    discountAmount = Math.min(Number(discountValue), subtotal);
  }

  const grandTotal = subtotal - discountAmount;
  const balanceDue = Math.max(grandTotal - Number(paidAmount || 0), 0);

  return {
    admissionFee: Number(admissionFee || 0),
    annualFee: Number(annualFee || 0),
    monthlyTotal,
    extraTotal,
    lateFineTotal: totalLateFine,
    previousBalance: Number(previousBalance || 0),
    subtotal,
    discountAmount,
    grandTotal,
    paidAmount: Number(paidAmount || 0),
    balanceDue,
  };
};

const CollapsibleSection = ({
  id,
  title,
  icon,
  isOpen,
  toggleSection,
  children,
  badge,
}) => (
  <div className="mb-4 border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {badge}
          </span>
        )}
        <span
          className={`text-3xl transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </div>
    </button>
    {isOpen && (
      <div className="p-6 bg-white border-t-2 border-gray-200">{children}</div>
    )}
  </div>
);

// ========== MAIN COMPONENT ==========

export default function FeeCollection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("student");

  const [student, setStudent] = useState(null);
  const [showRecommendedFeeModal, setShowRecommendedFeeModal] = useState(false);
  const [showMasterFeeModal, setShowMasterFeeModal] = useState(false);
  const [recommendedFee, setRecommendedFee] = useState(null);
  const [masterFee, setMasterFee] = useState(null);

  const [openSections, setOpenSections] = useState({
    student: true,
    previous: false,
    onetime: false,
    monthly: true,
    additional: false,
    payment: false,
    discount: false,
    summary: true,
  });
  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const [admissionFee, setAdmissionFee] = useState(0);
  const [annualFee, setAnnualFee] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(0);
  const [monthlyFees, setMonthlyFees] = useState({});
  const [defaultTuitionFee, setDefaultTuitionFee] = useState(0);
  const [defaultTransportFee, setDefaultTransportFee] = useState(0);
  const [extraFees, setExtraFees] = useState([]);
  const [discountType, setDiscountType] = useState("none");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountReason, setDiscountReason] = useState("");

  const getLateFines = () => {
    const lateFines = [];
    Object.keys(monthlyFees).forEach((month) => {
      if (monthlyFees[month]) {
        const lateFine = calculateLateFine(month, student);
        if (lateFine) lateFines.push(lateFine);
      }
    });
    return lateFines;
  };

  const lateFines = getLateFines();
  const totalLateFine = lateFines.reduce(
    (sum, lf) => sum + lf.lateFineAmount,
    0,
  );

  // Calculate totals
  const totals = calculateTotals({
    admissionFee,
    annualFee,
    monthlyFees,
    extraFees,
    totalLateFine,
    previousBalance,
    discountType,
    discountValue,
    paidAmount,
  });

  useEffect(() => {
    if (totalLateFine > 0) {
      const lateFineExists = extraFees.some(
        (fee) => fee.title === "Late Fine (Auto-calculated)",
      );

      if (lateFineExists) {
        setExtraFees((prev) =>
          prev.map((fee) =>
            fee.title === "Late Fine (Auto-calculated)"
              ? { ...fee, amount: totalLateFine }
              : fee,
          ),
        );
      } else {
        setExtraFees((prev) => [
          ...prev,
          {
            title: "Late Fine (Auto-calculated)",
            amount: totalLateFine,
          },
        ]);
      }
    } else {
      setExtraFees((prev) =>
        prev.filter((fee) => fee.title !== "Late Fine (Auto-calculated)"),
      );
    }
  }, [totalLateFine]);

  useEffect(() => {
    async function loadStudent() {
      const res = await searchStudentById(studentId);
      setStudent(res.data.student);
      if (res.data.recommendedFees) setRecommendedFee(res.data.recommendedFees);
      if (res.data.student.previousBalance)
        setPreviousBalance(res.data.student.previousBalance);
      if (res.data.student.className)
        await loadDefaultFeesByClass(res.data.student.className);
    }
    if (studentId) loadStudent();
  }, [studentId]);

  useEffect(() => {
    async function loadMasterFee() {
      try {
        if (!student?.className) return;
        console.log(student.className);

        const res = await getFeeStructureByClass({
          className: student.className,
        });

        setMasterFee(res.data.structure || null);
      } catch (error) {
        console.error("Failed to load master fee", error);
        setMasterFee(null);
      }
    }
    loadMasterFee();
  }, [student?.className]);

  const loadDefaultFeesByClass = async (className) => {
    try {
      const res = await getAllFeeStructures();
      const feeStructure = res.data.data.find(
        (fs) => fs.className === className,
      );

      if (feeStructure) {
        setDefaultTuitionFee(feeStructure.tuitionFee || 0);
        setDefaultTransportFee(feeStructure.transportFee || 0);
      }
    } catch (error) {
      console.error("Failed to load fee structure", error);
    }
  };

  const toggleMonth = (month) => {
    setMonthlyFees((prev) => ({
      ...prev,
      [month]: prev[month]
        ? null
        : { tuitionFee: defaultTuitionFee, transportFee: defaultTransportFee },
    }));
  };

  const updateMonthFee = (month, key, value) => {
    setMonthlyFees((prev) => ({
      ...prev,
      [month]: { ...prev[month], [key]: +value },
    }));
  };

  const selectConsecutiveMonths = (startMonth, endMonth) => {
    const startIdx = monthsList.indexOf(startMonth);
    const endIdx = monthsList.indexOf(endMonth);
    const newMonthlyFees = { ...monthlyFees };

    if (startIdx <= endIdx) {
      for (let i = startIdx; i <= endIdx; i++) {
        newMonthlyFees[monthsList[i]] = {
          tuitionFee: defaultTuitionFee,
          transportFee: defaultTransportFee,
        };
      }
    } else {
      for (let i = startIdx; i < monthsList.length; i++) {
        newMonthlyFees[monthsList[i]] = {
          tuitionFee: defaultTuitionFee,
          transportFee: defaultTransportFee,
        };
      }
      for (let i = 0; i <= endIdx; i++) {
        newMonthlyFees[monthsList[i]] = {
          tuitionFee: defaultTuitionFee,
          transportFee: defaultTransportFee,
        };
      }
    }
    setMonthlyFees(newMonthlyFees);
  };

  const selectAllMonths = () => {
    const allMonths = {};
    monthsList.forEach((month) => {
      allMonths[month] = {
        tuitionFee: defaultTuitionFee,
        transportFee: defaultTransportFee,
      };
    });
    setMonthlyFees(allMonths);
  };

  const clearAllMonths = () => setMonthlyFees({});
  const addExtraFee = () =>
    setExtraFees([...extraFees, { title: "", amount: 0 }]);

  const updateExtraFee = (index, key, value) => {
    const copy = [...extraFees];
    copy[index][key] = key === "amount" ? +value : value;
    setExtraFees(copy);
  };

  const removeExtraFee = (index) => {
    if (extraFees[index].title === "Late Fine (Auto-calculated)") {
      alert("⚠️ Late fine is auto-calculated and cannot be removed manually.");
      return;
    }
    setExtraFees(extraFees.filter((_, i) => i !== index));
  };

  const submitFee = async () => {
    try {
      const monthlyRecords = Object.entries(monthlyFees)
        .filter(([_, v]) => v)
        .map(([month, v]) => ({
          month,
          year: new Date().getFullYear(),
          tuitionFee: v.tuitionFee || 0,
          transportFee: v.transportFee || 0,
        }));

      const commonPayload = {
        studentId: student._id,
        admissionFee,
        annualFee,
        monthlyRecords,
        extraFees: extraFees.filter((f) => f.title && f.amount > 0),
        lateFine: totalLateFine,
        previousBalance: Number(previousBalance || 0),
        discount:
          discountType !== "none"
            ? {
                type: discountType,
                value: discountValue,
                amount: totals.discountAmount,
                reason: discountReason,
              }
            : null,
        paidAmount,
        paymentMode: "Cash",
      };

      // 🔹 1️⃣ Fee Collect
      toast.loading("Collecting fee...", { toastId: "fee" });
      await feecollect(commonPayload);

      toast.update("fee", {
        render: "Fee collected successfully",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      // 🔹 2️⃣ Generate Receipt
      toast.loading("Generating receipt...", { toastId: "receipt" });
      const res = await generateFeeReceipt(commonPayload);

      const fileName = res?.data?.receipt?.fileName || res?.recipt?.fileName;
      if (!fileName) throw new Error("Receipt file not generated");

      toast.update("receipt", {
        render: "Receipt generated",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      // 🔹 3️⃣ Download PDF
      toast.loading("Downloading receipt...", { toastId: "download" });
      await downloadReceiptPdf(fileName);

      toast.update("download", {
        render: "Receipt downloaded",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      navigate(`/sms/payment-history?student=${student._id}`);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err.message || "Fee collection failed",
      );
    }
  };

  const handleUpdateRecommendedFee = (updatedFees) => {
    setRecommendedFee(updatedFees);
    // TODO: Add API call here
    alert("✅ Recommended fees updated!");
  };

  const handleDeleteRecommendedFee = () => {
    setRecommendedFee([]);
    setShowRecommendedFeeModal(false);
    // TODO: Add API call here
    alert("✅ Recommended fees deleted!");
  };

  const handleUpdateMasterFee = (updatedFee) => {
    setMasterFee(updatedFee);
    setDefaultTuitionFee(updatedFee.tuitionFee || 0);
    setDefaultTransportFee(updatedFee.transportFee || 0);
    // TODO: Add API call here
    alert("✅ Master fee updated!");
  };

  const handleDeleteMasterFee = () => {
    setMasterFee(null);
    setShowMasterFeeModal(false);
    // TODO: Add API call here
    alert("✅ Master fee deleted!");
  };

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student information...</p>
        </div>
      </div>
    );
  }

  const inputClass =
    "border border-gray-300 rounded-lg px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  const selectedMonthsCount = Object.keys(monthlyFees).filter(
    (m) => monthlyFees[m],
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-4xl">💰</span>
                  Fee Collection
                </h2>
                <p className="text-blue-100 text-sm mt-2">
                  Click on sections to expand/collapse
                </p>
              </div>

              <div className="flex gap-3">
                {student?.feeBenefit?.hasFeeBenefit && (
                  <button
                    onClick={() => setShowRecommendedFeeModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow"
                  >
                    ⭐ Recommended Fee
                  </button>
                )}
                <button
                  onClick={() => setShowMasterFeeModal(true)}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow border border-white/30"
                >
                  📚 Master Fee
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <CollapsibleSection
              id="student"
              title="Student Information"
              icon="👤"
              isOpen={openSections.student}
              toggleSection={toggleSection}
            >
              <StudentInfoCard student={student} />
            </CollapsibleSection>

            {previousBalance > 0 && (
              <CollapsibleSection
                id="previous"
                title="Previous Balance"
                icon="💳"
                isOpen={openSections.previous}
                toggleSection={toggleSection}
                badge={`₹${previousBalance.toFixed(2)}`}
              >
                <PreviousBalanceCard
                  previousBalance={previousBalance}
                  setPreviousBalance={setPreviousBalance}
                  inputClass={inputClass}
                />
              </CollapsibleSection>
            )}

            <CollapsibleSection
              id="onetime"
              title="One-Time Fees"
              icon="📋"
              isOpen={openSections.onetime}
              toggleSection={toggleSection}
            >
              <OneTimeFees
                admissionFee={admissionFee}
                setAdmissionFee={setAdmissionFee}
                annualFee={annualFee}
                setAnnualFee={setAnnualFee}
                inputClass={inputClass}
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="monthly"
              title="Monthly Fees"
              icon="📅"
              isOpen={openSections.monthly}
              toggleSection={toggleSection}
              badge={
                selectedMonthsCount > 0
                  ? `${selectedMonthsCount} months selected`
                  : null
              }
            >
              <MonthlyFeesSection
                monthsList={monthsList}
                monthlyFees={monthlyFees}
                toggleMonth={toggleMonth}
                updateMonthFee={updateMonthFee}
                selectAllMonths={selectAllMonths}
                clearAllMonths={clearAllMonths}
                selectConsecutiveMonths={selectConsecutiveMonths}
                defaultTuitionFee={defaultTuitionFee}
                defaultTransportFee={defaultTransportFee}
                student={student}
                inputClass={inputClass}
              />
              {lateFines.length > 0 && (
                <div className="mt-6">
                  <LateFineAlert
                    lateFines={lateFines}
                    totalLateFine={totalLateFine}
                    student={student}
                  />
                </div>
              )}
            </CollapsibleSection>

            <CollapsibleSection
              id="additional"
              title="Additional Fees"
              icon="➕"
              isOpen={openSections.additional}
              toggleSection={toggleSection}
              badge={extraFees.length > 0 ? `${extraFees.length} items` : null}
            >
              <AdditionalFees
                extraFees={extraFees}
                addExtraFee={addExtraFee}
                updateExtraFee={updateExtraFee}
                removeExtraFee={removeExtraFee}
                inputClass={inputClass}
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="payment"
              title="Payment Amount"
              icon="💵"
              isOpen={openSections.payment}
              toggleSection={toggleSection}
              badge={
                paidAmount > 0 ? `₹${Number(paidAmount).toFixed(2)}` : null
              }
            >
              <div className="max-w-md">
                <input
                  type="number"
                  placeholder="Enter amount paid by student"
                  className={inputClass + " text-lg font-semibold"}
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              id="discount"
              title="Apply Discount"
              icon="🎁"
              isOpen={openSections.discount}
              toggleSection={toggleSection}
              badge={
                totals.discountAmount > 0
                  ? `-₹${totals.discountAmount.toFixed(2)}`
                  : null
              }
            >
              <DiscountSection
                discountType={discountType}
                setDiscountType={setDiscountType}
                discountValue={discountValue}
                setDiscountValue={setDiscountValue}
                discountReason={discountReason}
                setDiscountReason={setDiscountReason}
                totals={totals}
                inputClass={inputClass}
              />
            </CollapsibleSection>

            <CollapsibleSection
              id="summary"
              title="Fee Breakdown & Summary"
              icon="🧮"
              isOpen={openSections.summary}
              toggleSection={toggleSection}
              badge={`Total: ₹${totals.grandTotal.toFixed(2)}`}
            >
              <FeeBreakdownSummary
                totals={totals}
                discountReason={discountReason}
              />
            </CollapsibleSection>

            <div className="flex gap-4 justify-end pt-6 border-t-2 border-gray-200 mt-6 sticky bottom-0 bg-white pb-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors font-medium shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={submitFee}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span className="text-lg">💾</span>
                Collect Fee
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRecommendedFeeModal && recommendedFee && (
        <RecommendedFeeModal
          recommendedFee={recommendedFee}
          onClose={() => setShowRecommendedFeeModal(false)}
          onUpdate={handleUpdateRecommendedFee}
          onDelete={handleDeleteRecommendedFee}
        />
      )}

      {showMasterFeeModal && masterFee && (
        <MasterFeeModal
          masterFee={masterFee}
          onClose={() => setShowMasterFeeModal(false)}
          onUpdate={handleUpdateMasterFee}
          onDelete={handleDeleteMasterFee}
        />
      )}
    </div>
  );
}
