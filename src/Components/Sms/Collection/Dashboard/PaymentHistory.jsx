import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Download, Receipt, Calendar, TrendingUp, Filter, Search, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { getFeeLedgerByStudentId } from "../../../../api/feeLedgerApi";

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("student");

  const [monthlyHistory, setMonthlyHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // all, paid, pending
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");

  useEffect(() => {
    if (studentId) loadLedger();
  }, [studentId]);

  const loadLedger = async () => {
    try {
      setLoading(true);
      const res = await getFeeLedgerByStudentId(studentId);
      const ledger = res.data.ledger;

      // Store student info if available
      if (res.data.student) {
        setStudentInfo(res.data.student);
      }

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

        const totalAmount = rec.tuitionFee + rec.transportFee;
        const paidAmount = rec.paidAmount || 0;
        const dueAmount = totalAmount - paidAmount;

        monthMap[key].payments.push({
          date: new Date(rec.year, 0).toISOString(),
          paidAmount: paidAmount,
          dueAmount: dueAmount,
          totalAmount: totalAmount,
          status: dueAmount === 0 ? "paid" : paidAmount > 0 ? "partial" : "pending",
          items,
          type: "monthly",
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
          totalAmount: fee.amount,
          status: fee.status === "Paid" ? "paid" : "pending",
          items: [{ label: fee.title, amount: fee.amount }],
          type: "extra",
        });
      });

      setMonthlyHistory(Object.values(monthMap));
    } catch (error) {
      console.error("Failed to load payment history", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary statistics
  const calculateSummary = () => {
    let totalPaid = 0;
    let totalDue = 0;
    let totalAmount = 0;

    monthlyHistory.forEach((month) => {
      month.payments.forEach((payment) => {
        totalPaid += payment.paidAmount;
        totalDue += payment.dueAmount;
        totalAmount += payment.totalAmount;
      });
    });

    return { totalPaid, totalDue, totalAmount };
  };

  const summary = calculateSummary();

  // Get unique years for filter
  const availableYears = [...new Set(monthlyHistory.map(m => m.year))].sort((a, b) => b - a);

  // Filter payments
  const filteredHistory = monthlyHistory.filter((month) => {
    if (selectedYear !== "all" && month.year !== parseInt(selectedYear)) {
      return false;
    }
    return true;
  }).map((month) => {
    const filteredPayments = month.payments.filter((payment) => {
      // Filter by status
      if (filterStatus === "paid" && payment.status !== "paid") return false;
      if (filterStatus === "pending" && payment.status === "paid") return false;

      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return payment.items.some(item => 
          item.label.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    return { ...month, payments: filteredPayments };
  }).filter((month) => month.payments.length > 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <span className="text-lg font-semibold text-slate-600">
            Loading payment history...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-2 border-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
                <p className="text-slate-600 mt-1">
                  Complete transaction records and fee breakdown
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
            >
              ← Back
            </button>
          </div>

          {/* Student Info */}
          {studentInfo && (
            <div className="mt-4 pt-4 border-t-2 border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Student Name</p>
                <p className="font-bold text-gray-800">{studentInfo.studentName || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Class</p>
                <p className="font-bold text-gray-800">{studentInfo.className || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Roll Number</p>
                <p className="font-bold text-gray-800">{studentInfo.rollNo || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-xl border border-orange-200">
                <p className="text-xs text-gray-600 mb-1">Student ID</p>
                <p className="font-bold text-gray-800 text-sm">{studentId}</p>
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6" />
              </div>
              <TrendingUp className="w-6 h-6 opacity-50" />
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">Total Paid</p>
            <p className="text-3xl font-bold">₹{summary.totalPaid.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <Clock className="w-6 h-6 opacity-50" />
            </div>
            <p className="text-orange-100 text-sm font-medium mb-1">Total Due</p>
            <p className="text-3xl font-bold">₹{summary.totalDue.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <CreditCard className="w-6 h-6" />
              </div>
              <Calendar className="w-6 h-6 opacity-50" />
            </div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Total Amount</p>
            <p className="text-3xl font-bold">₹{summary.totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-800">Filters & Search</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by fee type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid Only</option>
              <option value="pending">Pending Only</option>
            </select>

            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || filterStatus !== "all" || selectedYear !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
                setSelectedYear("all");
              }}
              className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Payment History Cards */}
        <div className="space-y-6">
          {filteredHistory.map((monthData, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">
                    {monthData.month} {monthData.year}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-semibold">
                    {monthData.payments.length} {monthData.payments.length === 1 ? 'Transaction' : 'Transactions'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {monthData.payments.map((payment, i) => (
                  <div
                    key={i}
                    className={`border-2 rounded-xl p-5 transition-all hover:shadow-md ${
                      payment.status === "paid"
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                        : payment.status === "partial"
                        ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                        : "bg-gradient-to-br from-red-50 to-pink-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          payment.status === "paid"
                            ? "bg-green-500"
                            : payment.status === "partial"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}>
                          {payment.status === "paid" ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : payment.status === "partial" ? (
                            <Clock className="w-5 h-5 text-white" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 text-sm">
                            {new Date(payment.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <div className={`text-xs font-bold mt-1 ${
                            payment.status === "paid"
                              ? "text-green-700"
                              : payment.status === "partial"
                              ? "text-yellow-700"
                              : "text-red-700"
                          }`}>
                            {payment.status === "paid" ? "✓ PAID" : payment.status === "partial" ? "⚠ PARTIAL" : "✗ PENDING"}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                        <div className="text-xl font-bold text-gray-800">
                          ₹{payment.totalAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Amount Paid</p>
                        <p className="text-lg font-bold text-green-600">
                          ₹{payment.paidAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Amount Due</p>
                        <p className="text-lg font-bold text-red-600">
                          ₹{payment.dueAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Fee Items */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Fee Breakdown
                      </p>
                      {payment.items.map((item, j) => (
                        <div
                          key={j}
                          className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200"
                        >
                          <span className="font-medium text-gray-700">{item.label}</span>
                          <span className="font-bold text-gray-800">
                            ₹{item.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                      <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2">
                        <Receipt className="w-4 h-4" />
                        View Receipt
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl font-semibold text-gray-600 mb-2">
                No payment history found
              </p>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== "all" || selectedYear !== "all"
                  ? "Try adjusting your filters"
                  : "No transactions have been recorded yet"}
              </p>
            </div>
          )}
        </div>

        {/* Export Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Export Payment History</h3>
              <p className="text-sm text-gray-600">Download complete payment records</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export as PDF
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export as Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}