import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* 🔹 DUMMY MONTH-WISE PAYMENT DATA */
const DUMMY_MONTHLY_HISTORY = [
  {
    month: "April",
    year: 2025,
    payments: [
      {
        date: "2025-04-05",
        paidAmount: 2500,
        dueAmount: 500,
        items: [
          { label: "Tuition Fee", amount: 2000 },
          { label: "Transport Fee", amount: 500 },
        ],
      },
    ],
  },
  {
    month: "May",
    year: 2025,
    payments: [
      {
        date: "2025-05-10",
        paidAmount: 3000,
        dueAmount: 0,
        items: [
          { label: "Tuition Fee", amount: 2500 },
          { label: "Transport Fee", amount: 500 },
        ],
      },
      {
        date: "2025-05-25",
        paidAmount: 500,
        dueAmount: 0,
        items: [{ label: "Exam Fee", amount: 500 }],
      },
    ],
  },
];

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("student");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 🔹 Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm">
            <button
              onClick={() => navigate("/?tab=students")}
              className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Students
            </button>

            <svg className="w-4 h-4 mx-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            <button
              onClick={() =>
                navigate(`/?tab=fee-collection&student=${studentId}`)
              }
              className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Fee Collection
            </button>

            <svg className="w-4 h-4 mx-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            <span className="text-slate-900 font-semibold">
              Payment History
            </span>
          </nav>
        </div>

        {/* 🔹 Header Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Payment History
              </h1>
              <p className="text-slate-600">
                Student ID: <span className="font-semibold text-indigo-600">{studentId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 🔹 Month Cards */}
        <div className="space-y-6">
          {DUMMY_MONTHLY_HISTORY.map((monthData, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Month Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900">
                    {monthData.month} {monthData.year}
                  </h3>
                </div>
              </div>

              {/* Payments */}
              <div className="p-6 space-y-4">
                {monthData.payments.map((payment, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-xl p-5 bg-gradient-to-br from-white to-slate-50 hover:border-indigo-200 transition-colors"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-slate-700">
                          {new Date(payment.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold text-green-700">
                            Paid: ₹{payment.paidAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {payment.dueAmount > 0 && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-lg border border-red-200">
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold text-red-700">
                              Due: ₹{payment.dueAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                        Payment Breakdown
                      </h4>
                      <ul className="space-y-2">
                        {payment.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between items-center text-sm py-2 px-3 bg-white rounded-lg border border-slate-100">
                            <span className="text-slate-700 font-medium">{item.label}</span>
                            <span className="font-semibold text-slate-900">₹{item.amount.toLocaleString('en-IN')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}