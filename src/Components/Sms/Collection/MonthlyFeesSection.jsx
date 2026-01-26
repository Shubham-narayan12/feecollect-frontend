import React, { useState } from "react";

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
  const [hasTransport, setHasTransport] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Monthly Fees</h3>
            <p className="text-sm text-gray-500">Select months and enter fee amounts</p>
          </div>
        </div>

        

      {/* Quick Select Options */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-5 border-2 border-blue-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-blue-600">⚡</span>
          <span className="text-sm font-bold text-gray-700">Quick Actions</span>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={selectAllMonths}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>✓</span>
            Select All Months
          </button>
          
          <button
            onClick={clearAllMonths}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>✗</span>
            Clear All
          </button>

          <div className="flex items-center gap-3 ml-4 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Select Range:</span>
            <select 
              id="startMonth"
              className="border-2 border-blue-300 bg-white rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="">From Month</option>
              {monthsList.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            
            <span className="text-gray-400 font-bold">→</span>
            
            <select 
              id="endMonth"
              className="border-2 border-blue-300 bg-white rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
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
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>→</span>
              Apply Range
            </button>
          </div>
        </div>

        {/* Default Fees Display */}
        {(defaultTuitionFee > 0 || (hasTransport && defaultTransportFee > 0)) && (
          <div className="mt-4 pt-4 border-t-2 border-blue-200">
            <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
              <span className="text-lg">💡</span>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-blue-600">Auto-fill for Class {student?.className}:</span>
                {defaultTuitionFee > 0 && (
                  <span className="ml-3 font-semibold">
                    Tuition: <span className="text-green-600">₹{defaultTuitionFee}</span>
                  </span>
                )}
                {hasTransport && defaultTransportFee > 0 && (
                  <span className="ml-3 font-semibold">
                    Transport: <span className="text-green-600">₹{defaultTransportFee}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Transport Toggle */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-slate-200 shadow-sm">
          <span className="text-sm font-semibold text-gray-700">Has Transportation?</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="hasTransport"
                checked={hasTransport === true}
                onChange={() => setHasTransport(true)}
                className="w-4 h-4 text-green-600 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700 group-hover:text-green-600 transition-colors">
                Yes
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="hasTransport"
                checked={hasTransport === false}
                onChange={() => setHasTransport(false)}
                className="w-4 h-4 text-red-600 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700 group-hover:text-red-600 transition-colors">
                No
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Month Selection Grid */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 shadow-inner">
        <div className="space-y-3">
          {monthsList.map((m) => (
            <div
              key={m}
              className={`grid ${hasTransport ? 'grid-cols-12' : 'grid-cols-8'} gap-3 items-center p-4 rounded-xl transition-all duration-200 ${
                monthlyFees[m] 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-md' 
                  : 'bg-white border-2 border-gray-200 hover:border-blue-200 hover:shadow-sm'
              }`}
            >
              <div className={`${hasTransport ? 'col-span-3' : 'col-span-3'} flex items-center gap-3`}>
                <input
                  type="checkbox"
                  checked={!!monthlyFees[m]}
                  onChange={() => toggleMonth(m)}
                  className="w-6 h-6 text-blue-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 cursor-pointer transition-all"
                />
                <span className={`font-bold ${monthlyFees[m] ? 'text-blue-700' : 'text-gray-600'}`}>
                  {m}
                </span>
              </div>

              <div className={`${hasTransport ? 'col-span-4' : 'col-span-5'}`}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                  <input
                    type="number"
                    placeholder="Tuition Fee"
                    disabled={!monthlyFees[m]}
                    className={`${inputClass} pl-7 ${monthlyFees[m] ? 'bg-white' : 'bg-gray-100'}`}
                    value={monthlyFees[m]?.tuitionFee || ''}
                    onChange={(e) => updateMonthFee(m, "tuitionFee", e.target.value)}
                  />
                </div>
              </div>

              {hasTransport && (
                <div className="col-span-5">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                    <input
                      type="number"
                      placeholder="Transport Fee"
                      disabled={!monthlyFees[m]}
                      className={`${inputClass} pl-7 ${monthlyFees[m] ? 'bg-white' : 'bg-gray-100'}`}
                      value={monthlyFees[m]?.transportFee || ''}
                      onChange={(e) => updateMonthFee(m, "transportFee", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Months Summary */}
      {Object.keys(monthlyFees).filter(m => monthlyFees[m]).length > 0 && (
        <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span className="font-semibold text-gray-700">
                {Object.keys(monthlyFees).filter(m => monthlyFees[m]).length} month(s) selected
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Total Monthly Fees</p>
              <p className="text-xl font-bold text-green-600">
                ₹{Object.values(monthlyFees).reduce((sum, month) => {
                  if (month) {
                    const tuition = month.tuitionFee || 0;
                    const transport = hasTransport ? (month.transportFee || 0) : 0;
                    return sum + tuition + transport;
                  }
                  return sum;
                }, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};