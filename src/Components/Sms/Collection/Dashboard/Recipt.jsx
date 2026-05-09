import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye hook import kiya
import {
  Search,
  Hash,
  User,
  GraduationCap,
  School,
  Receipt,
  Eye,
} from "lucide-react";
import { searchRecipt } from "../../../../api/receiptApi";

const ReceiptSearch = () => {
  const navigate = useNavigate(); // Navigation hook initialize kiya

  const [searchData, setSearchData] = useState({
    receiptNo: "",
    studentName: "",
    rollNo: "",
    className: "",
  });

  // State to hold search results (API response dynamic data)
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    

    try {
      const res = await searchRecipt(searchData);
      

      if (res.data.success) {
        setSearchResults(res.data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search Error:", error);

      // Agar 404 aaye (no data)
      if (error.response && error.response.status === 404) {
        setSearchResults([]);
      } else {
        alert("Something went wrong");
      }
    }
  };

  // Button click par path `/sms/recipt/receiptId` par dynamic redirect karega
  const handleViewReceipt = (receiptId) => {
    console.log("Navigating to receipt ID:", receiptId);
    navigate(`/sms/recipt/${receiptId}`);
  };

  return (
    <div className="w-full bg-transparent pt-12 pb-8 px-6 flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl">
        {/* Compact Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-green-100 p-2.5 rounded-xl border border-green-200 shadow-sm">
            <Receipt className="text-green-700 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Fee Receipt <span className="text-green-700">Portal</span>
            </h2>
            <p className="text-xs text-gray-400">
              Search and download student receipts
            </p>
          </div>
        </div>

        {/* Compact Rectangle Search Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-150 p-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col lg:flex-row items-end gap-3"
          >
            {/* Input fields container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              {/* Receipt No */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">
                  Receipt No
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <Hash size={14} />
                  </div>
                  <input
                    type="text"
                    name="receiptNo"
                    placeholder="TCS/2026/001"
                    value={searchData.receiptNo}
                    onChange={handleChange}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Student Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">
                  Student Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Enter Name"
                    value={searchData.studentName}
                    onChange={handleChange}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Roll No */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">
                  Roll No
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <GraduationCap size={14} />
                  </div>
                  <input
                    type="text"
                    name="rollNo"
                    placeholder="Roll Number"
                    value={searchData.rollNo}
                    onChange={handleChange}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Class/Grade */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">
                  Class/Grade
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <School size={14} />
                  </div>
                  <select
                    name="className"
                    value={searchData.className}
                    onChange={handleChange}
                    className="search-input appearance-none cursor-pointer"
                  >
                    <option value="">Select Class</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={`${i + 1}`}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Compact Right Aligned Search Button */}
            <button
              type="submit"
              className="w-full lg:w-auto h-[42px] bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-800 hover:to-emerald-900 text-white font-semibold px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
            >
              <Search size={16} /> <span>Search</span>
            </button>
          </form>
        </div>

        {/* Micro Warning Info */}
        <p className="text-[10px] text-gray-400 italic mt-3 text-left pl-2">
          * Hint: You can search using single or multiple filters.
        </p>

        {/* ================= RESULTS SECTION ================= */}
        {hasSearched && (
          <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-150 overflow-hidden">
            {/* Header of results box */}
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Search Results ({searchResults.length})
              </span>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>

            {searchResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Receipt No
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Father's Name
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Class (Section)
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Paid Amount
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {searchResults.map((receipt) => (
                      <tr
                        key={receipt._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        {/* Receipt No */}
                        <td className="py-3.5 px-6 text-sm font-semibold text-gray-700">
                          {receipt.receiptNo}
                        </td>
                        {/* Student Name */}
                        <td className="py-3.5 px-6 text-sm font-medium text-gray-900">
                          {receipt.studentName}
                        </td>
                        {/* Father Name */}
                        <td className="py-3.5 px-6 text-sm text-gray-500">
                          {receipt.fatherName}
                        </td>
                        {/* Class & Section */}
                        <td className="py-3.5 px-6 text-sm text-gray-600">
                          {receipt.className}{" "}
                          {receipt.section ? `(${receipt.section})` : ""}
                        </td>
                        {/* Paid Amount */}
                        <td className="py-3.5 px-6">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                            ₹{receipt.paidAmount}
                          </span>
                        </td>
                        {/* View Action */}
                        <td className="py-3.5 px-6 text-center">
                          <button
                            onClick={() => handleViewReceipt(receipt._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-green-700 hover:text-white bg-green-50 hover:bg-green-700 border border-green-100 hover:border-green-700 transition-all active:scale-95"
                          >
                            <Eye size={12} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* No Records Found Visual State */
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-3 rounded-full text-gray-400 mb-3">
                  <Search size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  No Receipts Found
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .search-input {
          width: 100%;
          height: 42px;
          padding: 8px 12px 8px 36px;
          font-size: 0.85rem;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background-color: #fcfdfd;
          transition: all 0.2s ease-in-out;
        }
        .search-input:hover {
          border-color: #cbd5e1;
        }
        .search-input:focus {
          outline: none;
          border-color: #15803d;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.06);
        }
        .search-input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default ReceiptSearch;
