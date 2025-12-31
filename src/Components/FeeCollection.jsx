import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchStudentById } from "../api/studentApi";
import { feecollect } from "../api/feeLedgerApi";

const monthsList = [
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March",
];

export default function FeeCollectionSimple() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("student");

  const [student, setStudent] = useState(null);

  // Fees
  const [admissionFee, setAdmissionFee] = useState(0);
  const [annualFee, setAnnualFee] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  // Monthly Records
  const [monthlyFees, setMonthlyFees] = useState({});

  // Extra Fees
  const [extraFees, setExtraFees] = useState([]);

  useEffect(() => {
    async function loadStudent() {
      const res = await searchStudentById(studentId);
      setStudent(res.data.student);
    }
    loadStudent();
  }, [studentId]);

  // ---------------- MONTHLY HANDLERS ----------------
  const toggleMonth = (month) => {
    setMonthlyFees((prev) => ({
      ...prev,
      [month]: prev[month]
        ? null
        : { tuitionFee: 0, transportFee: 0 },
    }));
  };

  const updateMonthFee = (month, key, value) => {
    setMonthlyFees((prev) => ({
      ...prev,
      [month]: { ...prev[month], [key]: +value },
    }));
  };

  // ---------------- EXTRA FEES ----------------
  const addExtraFee = () => {
    setExtraFees([...extraFees, { title: "", amount: 0 }]);
  };

  const updateExtraFee = (index, key, value) => {
    const copy = [...extraFees];
    copy[index][key] = key === "amount" ? +value : value;
    setExtraFees(copy);
  };

  const removeExtraFee = (index) => {
    setExtraFees(extraFees.filter((_, i) => i !== index));
  };

  // ---------------- SUBMIT ----------------
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
        extraFees: extraFees.filter(
          (f) => f.title && f.amount > 0
        ),
        paidAmount,
      };

      await feecollect(payload);

      alert("✅ Fee Collected & Ledger Updated");
      navigate(`/?tab=payment-history&student=${student._id}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Fee Collection Failed");
    }
  };

  if (!student) return <p>Loading student...</p>;

  const input =
    "border border-gray-300 rounded px-3 py-2 w-full text-sm";

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">💰 Fee Collection</h2>

      {/* STUDENT INFO */}
      <div className="mb-6 bg-gray-50 p-4 rounded">
        <p><b>Name:</b> {student.studentName}</p>
        <p><b>Class:</b> {student.className}-{student.section}</p>
        <p><b>Student ID:</b> {student._id}</p>
      </div>

      {/* ADMISSION / ANNUAL */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="number"
          className={input}
          placeholder="Admission Fee"
          value={admissionFee}
          onChange={(e) => setAdmissionFee(e.target.value)}
        />
        <input
          type="number"
          className={input}
          placeholder="Annual Fee"
          value={annualFee}
          onChange={(e) => setAnnualFee(e.target.value)}
        />
      </div>

      {/* MONTHLY FEES */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">📅 Monthly Fees</h3>

        {monthsList.map((m) => (
          <div key={m} className="grid grid-cols-4 gap-2 mb-2">
            <input
              type="checkbox"
              checked={!!monthlyFees[m]}
              onChange={() => toggleMonth(m)}
            />
            <span>{m}</span>

            <input
              type="number"
              placeholder="Tuition"
              disabled={!monthlyFees[m]}
              className={input}
              onChange={(e) =>
                updateMonthFee(m, "tuitionFee", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Transport"
              disabled={!monthlyFees[m]}
              className={input}
              onChange={(e) =>
                updateMonthFee(m, "transportFee", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      {/* EXTRA FEES */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">➕ Extra Fees</h3>

        {extraFees.map((ef, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <input
              placeholder="Fee Title"
              className={input}
              value={ef.title}
              onChange={(e) =>
                updateExtraFee(i, "title", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Amount"
              className={input}
              value={ef.amount}
              onChange={(e) =>
                updateExtraFee(i, "amount", e.target.value)
              }
            />
            <button
              onClick={() => removeExtraFee(i)}
              className="bg-red-500 text-white rounded px-2"
            >
              ❌
            </button>
          </div>
        ))}

        <button
          onClick={addExtraFee}
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
        >
          ➕ Add Extra Fee
        </button>
      </div>

      {/* PAID AMOUNT */}
      <div className="mb-6">
        <input
          type="number"
          placeholder="Paid Amount"
          className={input}
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
        />
      </div>

      {/* SUBMIT */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-400 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={submitFee}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          💾 Collect Fee
        </button>
      </div>
    </div>
  );
}
