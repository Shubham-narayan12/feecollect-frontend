export const FeeBreakdownSummary = ({ totals, discountReason, extraFees = [] }) => {
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
          
          {/* Show individual additional fees or total */}
          {extraFees && extraFees.length > 0 ? (
            <div className="border-b border-indigo-200 pb-2">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 font-medium">Additional Fees:</span>
                <span className="text-gray-900 font-semibold">₹{totals.extraTotal.toFixed(2)}</span>
              </div>
              <div className="ml-6 space-y-1.5 mt-2 bg-blue-50 rounded-lg p-3 border border-blue-200">
                {extraFees.map((fee, index) => (
                  <div key={index} className="flex justify-between items-center py-1.5 text-sm">
                    <span className="text-gray-700 flex items-center gap-2 font-medium">
                      <span className="text-blue-600">▪</span>
                      {fee.title || `Fee ${index + 1}`}
                    </span>
                    <span className="text-gray-800 font-semibold">₹{Number(fee.amount || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center py-2 border-b border-indigo-200">
              <span className="text-gray-700 font-medium">Additional Fees:</span>
              <span className="text-gray-900 font-semibold">₹{totals.extraTotal.toFixed(2)}</span>
            </div>
          )}
          
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
