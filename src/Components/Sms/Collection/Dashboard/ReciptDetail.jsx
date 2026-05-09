import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Calendar,
  User,
  DollarSign,
  Tag,
  Building,
  CheckCircle,
  FileText,
} from "lucide-react";

const ReciptDetail = () => {
  const { id } = useParams(); // Fetch dynamic ID from URL parameters
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call using mongoose model structure
    const fetchReceiptData = () => {
      setLoading(true);
      // Dummy mock data matches your Mongoose Schema structure
      const mockReceipt = {
        _id: id,
        receiptNo: "RCPT-2026-00001",
        studentId: "STU1029",
        studentName: "Aarav Kumar",
        fatherName: "Rajesh Kumar",
        className: "Class 5",
        section: "A",
        rollNo: "12",

        // Fee breakup
        tuitionFee: 1500,
        admissionFee: 0,
        annualFee: 500,
        transportFee: 300,

        // Extra/custom fees
        extraFees: [
          { title: "Exam Fee", amount: 200 },
          { title: "Lab Maintenance", amount: 100 },
        ],

        // Final calculations
        totalAmount: 2600,
        paidAmount: 2500,
        dueAmount: 100,
        paymentMode: "UPI",

        // Months
        months: ["April-2026", "May-2026"],
        year: 2026,
        fileName: "receipt_RCPT-2026-00001.pdf",
        createdAt: "2026-04-12T10:30:00.000Z",
      };

      setTimeout(() => {
        setReceipt(mockReceipt);
        setLoading(false);
      }, 500); // Small loading effect
    };

    fetchReceiptData();
  }, [id]);

  const handlePrint = () => {
    window.print(); // Triggers native browser print window
  };

  if (loading) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-700"></div>
        <p className="text-sm text-gray-500 mt-4 font-semibold">
          Fetching receipt data...
        </p>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-red-500 font-bold mb-4">Receipt Not Found!</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent py-8 px-4 sm:px-6 flex flex-col items-center justify-start print:p-0 print:bg-white">
      <div className="w-full max-w-4xl">
        {/* Back navigation & Action Buttons (Hidden during Print) */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-semibold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-150 transition-all active:scale-95"
          >
            <ArrowLeft size={16} /> <span>Back to Portal</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-sm text-white font-semibold bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-800 hover:to-emerald-900 px-5 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Printer size={16} /> <span>Print Receipt</span>
          </button>
        </div>

        {/* Dynamic Main Invoice Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-150 overflow-hidden p-6 sm:p-8 print:shadow-none print:border-none print:p-0">
          {/* Top Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-2xl border border-green-200">
                <FileText className="text-green-700 w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  Thawe Central <span className="text-green-700">School</span>
                </h1>
                <p className="text-xs text-gray-400">
                  Gopalganj, Bihar, India | ERP Fee Receipt
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg text-emerald-800 font-bold text-xs mb-1">
                <CheckCircle size={12} className="text-emerald-600" />
                <span>Paid via {receipt.paymentMode}</span>
              </div>
              <p className="text-sm font-black text-gray-800 block">
                Receipt No:{" "}
                <span className="text-green-700">{receipt.receiptNo}</span>
              </p>
              <p className="text-[11px] text-gray-400">
                Date:{" "}
                {new Date(receipt.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Student Info Metadata Grid */}
          <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-5 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Student Name */}
            <div className="flex items-start gap-2.5">
              <User className="text-gray-400 mt-0.5" size={16} />
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Student Name
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {receipt.studentName}
                </span>
              </div>
            </div>

            {/* Father's Name */}
            <div className="flex items-start gap-2.5">
              <User className="text-gray-400 mt-0.5" size={16} />
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Father's Name
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {receipt.fatherName}
                </span>
              </div>
            </div>

            {/* Class, Sec, Roll */}
            <div className="flex items-start gap-2.5">
              <Building className="text-gray-400 mt-0.5" size={16} />
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Class & Sec (Roll)
                </span>
                <span className="text-sm font-bold text-green-700">
                  {receipt.className}{" "}
                  {receipt.section ? `(${receipt.section})` : ""} -{" "}
                  <span className="text-gray-800">Roll {receipt.rollNo}</span>
                </span>
              </div>
            </div>

            {/* Active Billing Session/Months */}
            <div className="flex items-start gap-2.5">
              <Calendar className="text-gray-400 mt-0.5" size={16} />
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Months/Session
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {receipt.months.join(", ")} ({receipt.year})
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Fee Splitup Ledger Table */}
          <div className="border border-gray-150 rounded-2xl overflow-hidden mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150">
                  <th className="py-3 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Fee Description
                  </th>
                  <th className="py-3 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Tuition Fee */}
                {receipt.tuitionFee > 0 && (
                  <tr>
                    <td className="py-3 px-5 text-sm font-medium text-gray-800">
                      Tuition Fee
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-700 text-right font-semibold">
                      ₹{receipt.tuitionFee}
                    </td>
                  </tr>
                )}
                {/* Admission Fee */}
                {receipt.admissionFee > 0 && (
                  <tr>
                    <td className="py-3 px-5 text-sm font-medium text-gray-800">
                      Admission Fee
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-700 text-right font-semibold">
                      ₹{receipt.admissionFee}
                    </td>
                  </tr>
                )}
                {/* Annual Fee */}
                {receipt.annualFee > 0 && (
                  <tr>
                    <td className="py-3 px-5 text-sm font-medium text-gray-800">
                      Annual Charges
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-700 text-right font-semibold">
                      ₹{receipt.annualFee}
                    </td>
                  </tr>
                )}
                {/* Transport Fee */}
                {receipt.transportFee > 0 && (
                  <tr>
                    <td className="py-3 px-5 text-sm font-medium text-gray-800">
                      School Bus Transport Fee
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-700 text-right font-semibold">
                      ₹{receipt.transportFee}
                    </td>
                  </tr>
                )}
                {/* Dynamic Extra Fees Array rendering */}
                {receipt.extraFees &&
                  receipt.extraFees.map((extra, index) => (
                    <tr key={index}>
                      <td className="py-3 px-5 text-sm font-medium text-gray-800 flex items-center gap-1.5">
                        <Tag size={12} className="text-gray-400" />
                        {extra.title}
                      </td>
                      <td className="py-3 px-5 text-sm text-gray-700 text-right font-semibold">
                        ₹{extra.amount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Summary Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
            {/* Total Block */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Total Payable Amount
              </span>
              <span className="text-2xl font-black text-gray-800">
                ₹{receipt.totalAmount}
              </span>
            </div>

            {/* Paid Block (Green themed) */}
            <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">
                Paid Amount
              </span>
              <span className="text-2xl font-black text-green-700">
                ₹{receipt.paidAmount}
              </span>
            </div>

            {/* Due Block (Conditionally Styled: Orange if due exists, else generic gray) */}
            <div
              className={`border rounded-xl p-4 flex flex-col justify-between ${receipt.dueAmount > 0 ? "bg-orange-50 border-orange-100" : "bg-gray-50 border-gray-100"}`}
            >
              <span
                className={`text-xs font-bold uppercase tracking-wider mb-2 ${receipt.dueAmount > 0 ? "text-orange-700" : "text-gray-400"}`}
              >
                Due Balance
              </span>
              <span
                className={`text-2xl font-black ${receipt.dueAmount > 0 ? "text-orange-700" : "text-gray-800"}`}
              >
                ₹{receipt.dueAmount}
              </span>
            </div>
          </div>

          {/* Footer Terms & Signatures */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="text-xs text-gray-400 space-y-1">
              <p className="font-bold text-gray-600">Please Note:</p>
              <p>• All fee payments made are non-refundable.</p>
              <p>
                • This is a computer-generated fee receipt. Stamp is not
                required.
              </p>
            </div>

            <div className="text-right sm:self-end self-stretch flex flex-col items-end">
              <div className="w-40 border-b border-gray-300 mb-2"></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Authorized Signature
              </span>
              <span className="text-[10px] text-gray-400">
                Thawe Central School Admin
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Styled JSX specifically structured to remove browser headers/footers during print layout */}
      <style jsx>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReciptDetail;
