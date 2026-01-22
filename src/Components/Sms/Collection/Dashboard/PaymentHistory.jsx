import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFeeLedgerByStudentId } from "../../../../api/feeLedgerApi";


export default function PaymentHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("student");

  const [monthlyHistory, setMonthlyHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) loadLedger();
  }, [studentId]);

  const loadLedger = async () => {
    try {
      setLoading(true);
      const res = await getFeeLedgerByStudentId(studentId);
      const ledger = res.data.ledger;

      /* ================= TRANSFORM DATA ================= */
      const monthMap = {};

      // MONTHLY RECORDS (Tuition + Transport)
      ledger.monthlyRecords.forEach((rec) => {
        const key = `${rec.month}-${rec.year}`;

        if (!monthMap[key]) {
          monthMap[key] = {
            month: rec.month,
            year: rec.year,
            payments: [],
          };
        }

        const items = [];
        if (rec.tuitionFee > 0)
          items.push({ label: "Tuition Fee", amount: rec.tuitionFee });
        if (rec.transportFee > 0)
          items.push({ label: "Transport Fee", amount: rec.transportFee });

        monthMap[key].payments.push({
          date: new Date(rec.year, 0).toISOString(),
          paidAmount: rec.paidAmount || 0,
          dueAmount:
            rec.tuitionFee +
            rec.transportFee -
            (rec.paidAmount || 0),
          items,
        });
      });

      // EXTRA FEES (Exam, Uniform etc)
      ledger.extraFees.forEach((fee) => {
        const d = new Date(fee.date);
        const key = `${d.toLocaleString("en-IN", {
          month: "long",
        })}-${d.getFullYear()}`;

        if (!monthMap[key]) {
          monthMap[key] = {
            month: d.toLocaleString("en-IN", { month: "long" }),
            year: d.getFullYear(),
            payments: [],
          };
        }

        monthMap[key].payments.push({
          date: fee.date,
          paidAmount: fee.status === "Paid" ? fee.amount : 0,
          dueAmount: fee.status === "Unpaid" ? fee.amount : 0,
          items: [{ label: fee.title, amount: fee.amount }],
        });
      });

      setMonthlyHistory(Object.values(monthMap));
    } catch (error) {
      console.error("Failed to load payment history", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg font-semibold text-slate-500">
          Loading payment history...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <button
            onClick={() => navigate("/?tab=students")}
            className="text-slate-600 hover:text-indigo-600"
          >
            Students
          </button>
          <span className="mx-2">›</span>
          <button
            onClick={() =>
              navigate(`/?tab=fee-collection&student=${studentId}`)
            }
            className="text-slate-600 hover:text-indigo-600"
          >
            Fee Collection
          </button>
          <span className="mx-2">›</span>
          <span className="font-semibold">Payment History</span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="text-slate-600 mt-1">
            Student ID: <span className="font-semibold">{studentId}</span>
          </p>
        </div>

        {/* Month Cards */}
        <div className="space-y-6">
          {monthlyHistory.map((monthData, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow border overflow-hidden"
            >
              <div className="px-6 py-4 bg-indigo-50 border-b">
                <h3 className="text-xl font-bold text-indigo-900">
                  {monthData.month} {monthData.year}
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {monthData.payments.map((payment, i) => (
                  <div
                    key={i}
                    className="border rounded-xl p-5 bg-slate-50"
                  >
                    <div className="flex justify-between mb-3 text-sm">
                      <span className="font-medium">
                        {new Date(payment.date).toLocaleDateString("en-IN")}
                      </span>
                      <span className="font-semibold text-green-700">
                        Paid ₹{payment.paidAmount}
                      </span>
                    </div>

                    {payment.dueAmount > 0 && (
                      <div className="text-sm font-semibold text-red-600 mb-2">
                        Due ₹{payment.dueAmount}
                      </div>
                    )}

                    <ul className="space-y-2">
                      {payment.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex justify-between bg-white p-2 rounded"
                        >
                          <span>{item.label}</span>
                          <span className="font-semibold">
                            ₹{item.amount}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {monthlyHistory.length === 0 && (
            <div className="text-center text-slate-400 py-10">
              No payment history available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
