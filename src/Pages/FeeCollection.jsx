// ============================================
// Pages/FeeCollection.jsx - WITH COLLAPSIBLE SECTIONS
// ============================================
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// API imports - adjust based on your folder structure
import { searchStudentById } from "../api/studentApi";
import { feecollect } from "../api/feeLedgerApi";
import { getAllFeeStructures } from "../api/feeStructure.js";
import { getFeeStructureByClass } from "../api/feeStructure.js";

// Import child components from Components/Collection/
import { StudentInfoCard } from "../Components/Collection/StudentInfoCard";
import { PreviousBalanceCard } from "../Components/Collection/PreviousBalanceCard";
import { OneTimeFees } from "../Components/Collection/OneTimeFees";
import { MonthlyFeesSection } from "../Components/Collection/MonthlyFeesSection";
import { LateFineAlert } from "../Components/Collection/LateFineAlert";
import { AdditionalFees } from "../Components/Collection/AdditionalFees";
import { DiscountSection } from "../Components/Collection/DiscountSection";
import { FeeBreakdownSummary } from "../Components/Collection/FeeBreakdownSummary";

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

// Utility: Calculate late fine for a specific month
const calculateLateFine = (month, student) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const admissionDate = student?.admissionDate
    ? new Date(student.admissionDate)
    : null;
  const monthIndex = monthsList.indexOf(month);

  let monthYear = currentYear;
  if (monthIndex >= 9) {
    if (currentMonth < 3) {
      monthYear = currentYear;
    } else {
      monthYear = currentYear + 1;
    }
  } else {
    if (currentMonth >= 3) {
      monthYear = currentYear;
    } else {
      monthYear = currentYear - 1;
    }
  }

  const monthStartDate = new Date(
    monthYear,
    monthIndex >= 9 ? monthIndex - 9 : monthIndex + 3,
    1
  );

  if (admissionDate) {
    if (
      monthStartDate <
      new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1)
    ) {
      return null;
    }

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
        (currentDate - dueDate) / (1000 * 60 * 60 * 24)
      );

      if (lateDays > 0) {
        const lateFineAmount = lateDays * 10;
        return {
          month,
          dueDate: dueDate.toLocaleDateString("en-IN"),
          lateDays,
          lateFinePerDay: 10,
          lateFineAmount,
          isAdmissionMonth: true,
        };
      }

      return null;
    }
  }

  const dueDate = new Date(
    monthYear,
    monthIndex >= 9 ? monthIndex - 9 : monthIndex + 3,
    10
  );
  const lateDays = Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24));

  if (lateDays > 0) {
    const lateFineAmount = lateDays * 10;
    return {
      month,
      dueDate: dueDate.toLocaleDateString("en-IN"),
      lateDays,
      lateFinePerDay: 10,
      lateFineAmount,
    };
  }

  return null;
};

// Utility: Calculate all totals
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
  const monthlyTotal = Object.values(monthlyFees).reduce((sum, month) => {
    if (month) {
      return sum + (month.tuitionFee || 0) + (month.transportFee || 0);
    }
    return sum;
  }, 0);

  const extraTotal = extraFees.reduce((sum, fee) => {
    if (fee.title !== "Late Fine (Auto-calculated)") {
      return sum + (fee.amount || 0);
    }
    return sum;
  }, 0);

  const subtotal =
    Number(admissionFee || 0) +
    Number(annualFee || 0) +
    monthlyTotal +
    extraTotal +
    totalLateFine +
    Number(previousBalance || 0);

  let discountAmount = 0;
  if (discountType === "percentage" && discountValue > 0) {
    discountAmount = (subtotal * Number(discountValue)) / 100;
    if (discountAmount > subtotal) discountAmount = subtotal;
  } else if (discountType === "fixed" && discountValue > 0) {
    discountAmount = Number(discountValue);
    if (discountAmount > subtotal) discountAmount = subtotal;
  }

  const grandTotal = subtotal - discountAmount;
  const balanceDue = grandTotal - Number(paidAmount || 0);

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
    balanceDue: balanceDue > 0 ? balanceDue : 0,
  };
};

// Collapsible Section Component
const CollapsibleSection = ({
  id,
  title,
  icon,
  isOpen,
  toggleSection,
  children,
  badge,
}) => {
  return (
    <div className="mb-4 border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            {badge && <span className="text-xs text-gray-500">{badge}</span>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {badge && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {badge}
            </span>
          )}
          <span
            className={`text-3xl transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ⌄
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="p-6 bg-white border-t-2 border-gray-200 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
};

export default function FeeCollection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("student");

  const [student, setStudent] = useState(null);
  const [showRecommendedFeeModal, setShowRecommendedFeeModal] = useState(false);
  const [showMasterFeeModal, setShowMasterFeeModal] = useState(false);
  const [recommendedFee, setRecommendedFee] = useState(null);
  const [masterFee, setMasterFee] = useState(null);

  // Collapsible sections state
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

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Fees
  const [admissionFee, setAdmissionFee] = useState(0);
  const [annualFee, setAnnualFee] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(0);

  // Monthly Records
  const [monthlyFees, setMonthlyFees] = useState({});
  const [defaultTuitionFee, setDefaultTuitionFee] = useState(0);
  const [defaultTransportFee, setDefaultTransportFee] = useState(0);

  // Extra Fees
  const [extraFees, setExtraFees] = useState([]);

  // Discount System
  const [discountType, setDiscountType] = useState("none");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountReason, setDiscountReason] = useState("");

  // Calculate late fines
  const getLateFines = () => {
    const lateFines = [];
    Object.keys(monthlyFees).forEach((month) => {
      if (monthlyFees[month]) {
        const lateFine = calculateLateFine(month, student);
        if (lateFine) {
          lateFines.push(lateFine);
        }
      }
    });
    return lateFines;
  };

  const lateFines = getLateFines();
  const totalLateFine = lateFines.reduce(
    (sum, lf) => sum + lf.lateFineAmount,
    0
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

  // Auto-add late fine to extra fees
  useEffect(() => {
    if (totalLateFine > 0) {
      const lateFineExists = extraFees.some(
        (fee) => fee.title === "Late Fine (Auto-calculated)"
      );

      if (lateFineExists) {
        setExtraFees((prev) =>
          prev.map((fee) =>
            fee.title === "Late Fine (Auto-calculated)"
              ? { ...fee, amount: totalLateFine }
              : fee
          )
        );
      } else {
        setExtraFees((prev) => [
          ...prev,
          {
            title: "Late Fine (Auto-calculated)",
            amount: totalLateFine,
            isAutoCalculated: true,
          },
        ]);
      }
    } else {
      setExtraFees((prev) =>
        prev.filter((fee) => fee.title !== "Late Fine (Auto-calculated)")
      );
    }
  }, [totalLateFine]);

  // Load student data
  useEffect(() => {
    async function loadStudent() {
      const res = await searchStudentById(studentId);

      setStudent(res.data.student);

      if (res.data.recommendedFees) {
        setRecommendedFee(res.data.recommendedFees);
      }

      if (res.data.student.previousBalance) {
        setPreviousBalance(res.data.student.previousBalance);
      }

      if (res.data.student.className) {
        await loadDefaultFeesByClass(res.data.student.className);
      }
    }

    if (studentId) loadStudent();
  }, [studentId]);

  useEffect(() => {
    async function loadMasterFee() {
      try {
        if (!student?.className) return;
        console.log(student.className)

        const res = await getFeeStructureByClass({className:student.className});
        

        setMasterFee(res.data.structure || null);
      } catch (error) {
        console.error("Failed to load master fee", error);
        setMasterFee(null);
      }
    }

    loadMasterFee();
  }, [student?.className]);

  // Load default fees from fee structure
  const loadDefaultFeesByClass = async (className) => {
    try {
      const res = await getAllFeeStructures();
      const feeStructure = res.data.data.find(
        (fs) => fs.className === className
      );

      if (feeStructure) {
        setDefaultTuitionFee(feeStructure.tuitionFee || 0);
        setDefaultTransportFee(feeStructure.transportFee || 0);
      } else {
        setDefaultTuitionFee(0);
        setDefaultTransportFee(0);
      }
    } catch (error) {
      console.error("Failed to load fee structure", error);
      setDefaultTuitionFee(0);
      setDefaultTransportFee(0);
    }
  };

  // Monthly handlers
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
    const startIndex = monthsList.indexOf(startMonth);
    const endIndex = monthsList.indexOf(endMonth);

    const newMonthlyFees = { ...monthlyFees };

    if (startIndex <= endIndex) {
      for (let i = startIndex; i <= endIndex; i++) {
        newMonthlyFees[monthsList[i]] = {
          tuitionFee: defaultTuitionFee,
          transportFee: defaultTransportFee,
        };
      }
    } else {
      for (let i = startIndex; i < monthsList.length; i++) {
        newMonthlyFees[monthsList[i]] = {
          tuitionFee: defaultTuitionFee,
          transportFee: defaultTransportFee,
        };
      }
      for (let i = 0; i <= endIndex; i++) {
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

  const clearAllMonths = () => {
    setMonthlyFees({});
  };

  // Extra fees handlers
  const addExtraFee = () => {
    setExtraFees([...extraFees, { title: "", amount: 0 }]);
  };

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

  //=========================== Submit handler=========================================
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

      const payload = {
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
      };

      await feecollect(payload);

      alert("✅ Fee Collected & Ledger Updated");
      navigate(`/?tab=payment-history&student=${student._id}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Fee Collection Failed");
    }
  };

  const handleRecommendedFee = () => {
    if (!recommendedFee || recommendedFee.length === 0) {
      alert("No recommended fee available for this student");
      return;
    }

    // sirf modal open karo
    setShowRecommendedFeeModal(true);
  };

  const handleMasterFee = () => {
    if (!masterFee) {
      alert("Master fee not available for this class");
      return;
    }

    setShowMasterFeeModal(true);
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
    (m) => monthlyFees[m]
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
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

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Recommended Fee (only if feeBenefit = true) */}
                {student?.feeBenefit?.hasFeeBenefit && (
                  <button
                    onClick={handleRecommendedFee}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow"
                  >
                    ⭐ Recommended Fee
                  </button>
                )}

                {/* Master Fee (always visible) */}
                <button
                  onClick={handleMasterFee}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow border border-white/30"
                >
                  📚 Master Fee
                </button>

                {/* SHOW RECOMMENDED FEE MODAL */}
                {showRecommendedFeeModal && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-[420px] p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-800">
                        ⭐ Recommended Fee
                      </h3>

                      <div className="space-y-2">
                        {recommendedFee.map((fee, index) => (
                          <div
                            key={index}
                            className="flex justify-between bg-gray-100 px-4 py-2 rounded"
                          >
                            <span className="font-medium">{fee.feeType}</span>
                            <span className="font-semibold">
                              ₹ {fee.amount}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          onClick={() => setShowRecommendedFeeModal(false)}
                          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SHOW MASTER FEE MODAL */}
                {showMasterFeeModal && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl w-[450px] p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-800">
                        📚 Master Fee Structure
                      </h3>

                      <div className="space-y-3 text-sm">
                        {masterFee.admissionFee > 0 && (
                          <div className="flex justify-between bg-gray-100 px-4 py-2 rounded">
                            <span>Admission Fee</span>
                            <span className="font-semibold">
                              ₹ {masterFee.admissionFee}
                            </span>
                          </div>
                        )}

                        {masterFee.annualFee > 0 && (
                          <div className="flex justify-between bg-gray-100 px-4 py-2 rounded">
                            <span>Annual Fee</span>
                            <span className="font-semibold">
                              ₹ {masterFee.annualFee}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between bg-gray-100 px-4 py-2 rounded">
                          <span>Monthly Tuition Fee</span>
                          <span className="font-semibold">
                            ₹ {masterFee.tuitionFee}
                          </span>
                        </div>

                        <div className="flex justify-between bg-gray-100 px-4 py-2 rounded">
                          <span>Monthly Transport Fee</span>
                          <span className="font-semibold">
                            ₹ {masterFee.transportFee}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          onClick={() => setShowMasterFeeModal(false)}
                          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Student Info - Collapsible */}
            <CollapsibleSection
              id="student"
              title="Student Information"
              icon="👤"
              isOpen={openSections.student}
              toggleSection={toggleSection}
            >
              <StudentInfoCard student={student} />
            </CollapsibleSection>

            {/* Previous Balance - Collapsible */}
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

            {/* One-Time Fees - Collapsible */}
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

            {/* Monthly Fees - Collapsible */}
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

              {/* Late Fine Alert inside Monthly section */}
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

            {/* Additional Fees - Collapsible */}
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

            {/* Payment Amount - Collapsible */}
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

            {/* Discount Section - Collapsible */}
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

            {/* Fee Summary - Collapsible (Keep open by default) */}
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

            {/* Submit Buttons - Always Visible */}
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
    </div>
  );
}
