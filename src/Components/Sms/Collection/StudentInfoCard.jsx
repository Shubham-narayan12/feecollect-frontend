// ============================================
// 1. StudentInfoCard.jsx - IMPROVED UI
// ============================================
import React from "react";

export const StudentInfoCard = ({ student }) => {
  return (
    <div className="mb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200 rounded-full translate-y-24 -translate-x-24 opacity-20"></div>
      
      {/* Content */}
      <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-blue-100 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Student Information</h3>
            <p className="text-sm text-gray-500">Personal & Academic Details</p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Student Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-2 ring-blue-200">
                {student.photo ? (
                  <img 
                    src={student.photo} 
                    alt={student.studentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-5xl font-bold drop-shadow-lg">
                      {student.studentName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              {/* Status Badge */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Student Name - Highlighted */}
              <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-600 font-semibold mb-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                  Student Name
                </p>
                <p className="text-lg font-bold text-gray-900">{student.studentName}</p>
              </div>

              {/* Roll Number */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 font-medium">Roll Number</p>
                <p className="font-bold text-gray-900 text-base">{student.rollNo || 'N/A'}</p>
              </div>

              {/* Class & Section */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 font-medium">Class & Section</p>
                <p className="font-bold text-gray-900 text-base">{student.className}-{student.section}</p>
              </div>

              {/* Session */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 font-medium">Session</p>
                <p className="font-bold text-gray-900 text-base">{student.session || 'N/A'}</p>
              </div>

              {/* Father's Name */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 font-medium">Father's Name</p>
                <p className="font-semibold text-gray-900 text-sm">{student.fatherName || 'N/A'}</p>
              </div>

              {/* Mother's Name */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 font-medium">Mother's Name</p>
                <p className="font-semibold text-gray-900 text-sm">{student.motherName || 'N/A'}</p>
              </div>

              {/* Phone Number */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 font-medium">Phone Number</p>
                <p className="font-semibold text-gray-900 text-sm font-mono">{student.mobile || 'N/A'}</p>
              </div>

              {/* Aadhar Number */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <p className="text-xs text-gray-500 mb-1 font-medium">Aadhar Number</p>
                <p className="font-semibold text-gray-900 text-sm font-mono">{student.aadharNo || 'N/A'}</p>
              </div>

              {/* Student ID */}
              <div className="md:col-span-2 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-300">
                <p className="text-xs text-gray-500 mb-1 font-medium">Student ID</p>
                <p className="font-bold text-gray-900 font-mono text-sm tracking-wide">{student._id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 2. PreviousBalanceCard.jsx
// ============================================
export const PreviousBalanceCard = ({ previousBalance, setPreviousBalance, inputClass }) => {
  return (
    <div className="mb-8">
      <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💳</span>
          <div className="flex-1">
            <h4 className="text-orange-800 font-bold text-lg mb-2">Previous Outstanding Balance</h4>
            <p className="text-orange-700 text-sm mb-3">
              Enter any unpaid balance from previous transactions
            </p>
            <div className="mb-3">
              <input
                type="number"
                className={inputClass}
                placeholder="Enter previous balance (if any)"
                value={previousBalance}
                onChange={(e) => setPreviousBalance(Number(e.target.value))}
                min="0"
              />
            </div>
            {previousBalance > 0 && (
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Outstanding Amount:</span>
                  <span className="text-2xl font-bold text-orange-600">₹{previousBalance.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 3. OneTimeFees.jsx
// ============================================
export const OneTimeFees = ({ admissionFee, setAdmissionFee, annualFee, setAnnualFee, inputClass }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">📋</span>
        One-Time Fees
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admission Fee
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="Enter admission fee"
            value={admissionFee}
            onChange={(e) => setAdmissionFee(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Fee
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="Enter annual fee"
            value={annualFee}
            onChange={(e) => setAnnualFee(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// 4. LateFineAlert.jsx
// ============================================
export const LateFineAlert = ({ lateFines, totalLateFine, student }) => {
  if (lateFines.length === 0) return null;

  return (
    <div className="mb-4 bg-red-50 border-2 border-red-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h4 className="text-red-800 font-bold text-lg mb-3">Late Fee Notice</h4>
          <p className="text-red-700 text-sm mb-4">
            The following month(s) have overdue fees. A late fine of ₹10 per day is being applied:
          </p>
          {student.admissionDate && (
            <p className="text-sm text-gray-600 mb-3 italic">
              Note: Admission Date: {new Date(student.admissionDate).toLocaleDateString('en-IN')} - Late fine calculated from admission month onwards only.
            </p>
          )}
          
          <div className="space-y-3">
            {lateFines.map((lf, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Month</p>
                    <p className="font-semibold text-gray-800">{lf.month}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Due Date</p>
                    <p className="font-semibold text-gray-800">{lf.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Late Days</p>
                    <p className="font-semibold text-red-600">{lf.lateDays} days</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Fine Per Day</p>
                    <p className="font-semibold text-gray-800">₹{lf.lateFinePerDay}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Total Fine</p>
                    <p className="font-bold text-red-600">₹{lf.lateFineAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-red-200">
            <div className="flex justify-between items-center">
              <span className="text-red-800 font-semibold">Total Late Fine:</span>
              <span className="text-red-600 font-bold text-xl">₹{totalLateFine}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 5. MonthlyFeesSection.jsx
// ============================================
export const MonthlyFeesSection = ({
  monthsList,
  monthlyFees,
  toggleMonth,
  updateMonthFee,
  selectAllMonths,
  clearAllMonths,
  selectConsecutiveMonths,
  defaultTuitionFee,
  defaultTransportFee,
  student,
  inputClass
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">📅</span>
        Monthly Fees
      </h3>

      {/* Quick Select Options */}
      <div className="mb-4 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
          
          <button
            onClick={selectAllMonths}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            ✓ Select All Months
          </button>
          
          <button
            onClick={clearAllMonths}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            ✗ Clear All
          </button>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-gray-600">Select Range:</span>
            <select 
              id="startMonth"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">From Month</option>
              {monthsList.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            
            <span className="text-gray-500">to</span>
            
            <select 
              id="endMonth"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">To Month</option>
              {monthsList.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                const start = document.getElementById('startMonth').value;
                const end = document.getElementById('endMonth').value;
                if (start && end) {
                  selectConsecutiveMonths(start, end);
                } else {
                  alert('Please select both start and end months');
                }
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              Apply Range
            </button>
          </div>
        </div>

        {/* Default Fees Display */}
        {(defaultTuitionFee > 0 || defaultTransportFee > 0) && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Auto-fill amounts for Class {student?.className}:</span>
              {defaultTuitionFee > 0 && <span className="ml-2">Tuition: ₹{defaultTuitionFee}</span>}
              {defaultTransportFee > 0 && <span className="ml-2">| Transport: ₹{defaultTransportFee}</span>}
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="grid gap-3">
          {monthsList.map((m) => (
            <div
              key={m}
              className={`grid grid-cols-12 gap-3 items-center p-3 rounded-lg transition-all ${
                monthlyFees[m] ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="col-span-3 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!monthlyFees[m]}
                  onChange={() => toggleMonth(m)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="font-medium text-gray-700">{m}</span>
              </div>

              <div className="col-span-4">
                <input
                  type="number"
                  placeholder="Tuition Fee"
                  disabled={!monthlyFees[m]}
                  className={inputClass}
                  value={monthlyFees[m]?.tuitionFee || ''}
                  onChange={(e) => updateMonthFee(m, "tuitionFee", e.target.value)}
                />
              </div>

              <div className="col-span-5">
                <input
                  type="number"
                  placeholder="Transport Fee"
                  disabled={!monthlyFees[m]}
                  className={inputClass}
                  value={monthlyFees[m]?.transportFee || ''}
                  onChange={(e) => updateMonthFee(m, "transportFee", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 6. AdditionalFees.jsx
// ============================================
export const AdditionalFees = ({ extraFees, addExtraFee, updateExtraFee, removeExtraFee, inputClass }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">➕</span>
        Additional Fees
      </h3>
      
      <div className="space-y-3 mb-4">
        {extraFees.map((ef, i) => (
          <div key={i} className={`grid grid-cols-12 gap-3 items-center p-3 rounded-lg border ${
            ef.title === "Late Fine (Auto-calculated)" 
              ? "bg-yellow-50 border-yellow-300" 
              : "bg-gray-50 border-gray-200"
          }`}>
            <div className="col-span-5">
              <input
                placeholder="Fee Title (e.g., Exam Fee, Sports Fee)"
                className={inputClass}
                value={ef.title}
                onChange={(e) => updateExtraFee(i, "title", e.target.value)}
                disabled={ef.title === "Late Fine (Auto-calculated)"}
              />
            </div>
            <div className="col-span-5">
              <input
                type="number"
                placeholder="Amount"
                className={inputClass}
                value={ef.amount}
                onChange={(e) => updateExtraFee(i, "amount", e.target.value)}
                disabled={ef.title === "Late Fine (Auto-calculated)"}
              />
            </div>
            <div className="col-span-2">
              <button
                onClick={() => removeExtraFee(i)}
                className={`w-full ${
                  ef.title === "Late Fine (Auto-calculated)"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white rounded-lg px-3 py-2.5 transition-colors font-medium`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addExtraFee}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2"
      >
        <span className="text-lg">➕</span>
        Add Extra Fee
      </button>
    </div>
  );
};

// ============================================
// 7. DiscountSection.jsx
// ============================================
export const DiscountSection = ({
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  discountReason,
  setDiscountReason,
  totals,
  inputClass
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">🎁</span>
        Apply Discount
      </h3>
      
      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Type
            </label>
            <select
              className={inputClass}
              value={discountType}
              onChange={(e) => {
                setDiscountType(e.target.value);
                if (e.target.value === "none") {
                  setDiscountValue(0);
                  setDiscountReason("");
                }
              }}
            >
              <option value="none">No Discount</option>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder={discountType === "percentage" ? "Enter %" : "Enter ₹"}
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              disabled={discountType === "none"}
              min="0"
              max={discountType === "percentage" ? "100" : undefined}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Discount
            </label>
            <input
              type="text"
              className={inputClass}
              placeholder="e.g., Sibling discount, Merit"
              value={discountReason}
              onChange={(e) => setDiscountReason(e.target.value)}
              disabled={discountType === "none"}
            />
          </div>
        </div>

        {discountType !== "none" && discountValue > 0 && (
          <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Discount Applied</p>
                <p className="text-purple-600 font-medium">
                  {discountType === "percentage" 
                    ? `${discountValue}% off` 
                    : `₹${Number(discountValue).toFixed(2)} off`}
                  {discountReason && ` - ${discountReason}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">You Save</p>
                <p className="text-2xl font-bold text-purple-600">₹{totals.discountAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 8. FeeBreakdownSummary.jsx
// ============================================
export const FeeBreakdownSummary = ({ totals, discountReason }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">🧮</span>
        Fee Breakdown & Summary
      </h3>
      
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-indigo-200">
            <span className="text-gray-700 font-medium">Admission Fee:</span>
            <span className="text-gray-900 font-semibold">₹{totals.admissionFee.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-indigo-200">
            <span className="text-gray-700 font-medium">Annual Fee:</span>
            <span className="text-gray-900 font-semibold">₹{totals.annualFee.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-indigo-200">
            <span className="text-gray-700 font-medium">Monthly Fees (Tuition + Transport):</span>
            <span className="text-gray-900 font-semibold">₹{totals.monthlyTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-indigo-200">
            <span className="text-gray-700 font-medium">Additional Fees:</span>
            <span className="text-gray-900 font-semibold">₹{totals.extraTotal.toFixed(2)}</span>
          </div>
          
          {totals.lateFineTotal > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-red-300 bg-red-50 px-3 rounded">
              <span className="text-red-700 font-medium">Late Fine:</span>
              <span className="text-red-600 font-bold">₹{totals.lateFineTotal.toFixed(2)}</span>
            </div>
          )}

          {totals.previousBalance > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-orange-300 bg-orange-50 px-3 rounded">
              <span className="text-orange-700 font-medium">Previous Balance:</span>
              <span className="text-orange-600 font-bold">₹{totals.previousBalance.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-2 pt-4">
            <span className="text-gray-800 font-semibold text-lg">Subtotal:</span>
            <span className="text-gray-900 font-bold text-lg">₹{totals.subtotal.toFixed(2)}</span>
          </div>

          {totals.discountAmount > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-purple-300 bg-purple-50 px-3 rounded">
              <span className="text-purple-700 font-medium">
                Discount {discountReason && `(${discountReason})`}:
              </span>
              <span className="text-purple-600 font-bold">- ₹{totals.discountAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 border-2 border-indigo-300">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total Amount:</span>
            <span className="text-2xl font-bold text-indigo-600">₹{totals.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-300">
            <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
            <p className="text-xl font-bold text-green-600">₹{totals.paidAmount.toFixed(2)}</p>
          </div>
          
          <div className={`rounded-lg p-4 border ${
            totals.balanceDue > 0 
              ? 'bg-orange-50 border-orange-300' 
              : 'bg-green-50 border-green-300'
          }`}>
            <p className="text-sm text-gray-600 mb-1">Balance Due</p>
            <p className={`text-xl font-bold ${
              totals.balanceDue > 0 ? 'text-orange-600' : 'text-green-600'
            }`}>
              ₹{totals.balanceDue.toFixed(2)}
            </p>
          </div>
        </div>

        {totals.paidAmount > 0 && (
          <div className="mt-4">
            {totals.balanceDue === 0 && totals.paidAmount === totals.grandTotal && (
              <div className="bg-green-100 border border-green-400 rounded-lg p-3 flex items-center gap-2">
                <span className="text-green-600 text-xl">✅</span>
                <span className="text-green-800 font-medium">Full Payment Received</span>
              </div>
            )}
            
            {totals.balanceDue > 0 && totals.paidAmount > 0 && (
              <div className="bg-orange-100 border border-orange-400 rounded-lg p-3 flex items-center gap-2">
                <span className="text-orange-600 text-xl">⚠️</span>
                <span className="text-orange-800 font-medium">Partial Payment - Balance remaining: ₹{totals.balanceDue.toFixed(2)}</span>
              </div>
            )}
            
            {totals.paidAmount > totals.grandTotal && (
              <div className="bg-blue-100 border border-blue-400 rounded-lg p-3 flex items-center gap-2">
                <span className="text-blue-600 text-xl">ℹ️</span>
                <span className="text-blue-800 font-medium">Excess Payment: ₹{(totals.paidAmount - totals.grandTotal).toFixed(2)} - Will be adjusted in next payment</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};