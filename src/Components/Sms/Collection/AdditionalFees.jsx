export const AdditionalFees = ({ extraFees, addExtraFee, updateExtraFee, removeExtraFee, inputClass }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl text-lg shadow-lg">
            ➕
          </span>
          Additional Fees
        </h3>
        <button
          onClick={addExtraFee}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <span className="text-lg">➕</span>
          Add Fee
        </button>
      </div>
      
      {extraFees.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="text-5xl mb-3">💰</div>
          <p className="text-gray-600 font-medium mb-2">No additional fees added</p>
          <p className="text-sm text-gray-500">Click "Add Fee" to include extra charges</p>
        </div>
      ) : (
        <div className="space-y-3">
          {extraFees.map((ef, i) => (
            <div key={i} className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl border-2 transition-all duration-200 ${
              ef.title === "Late Fine (Auto-calculated)" 
                ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-400 shadow-sm" 
                : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}>
              <div className="col-span-5">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Fee Title
                </label>
                <input
                  placeholder="e.g., Exam Fee, Sports Fee"
                  className={`${inputClass} ${ef.title === "Late Fine (Auto-calculated)" ? "bg-yellow-100 border-yellow-300" : ""}`}
                  value={ef.title}
                  onChange={(e) => updateExtraFee(i, "title", e.target.value)}
                  disabled={ef.title === "Late Fine (Auto-calculated)"}
                />
              </div>
              <div className="col-span-5">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className={`${inputClass} ${ef.title === "Late Fine (Auto-calculated)" ? "bg-yellow-100 border-yellow-300" : ""}`}
                  value={ef.amount}
                  onChange={(e) => updateExtraFee(i, "amount", e.target.value)}
                  disabled={ef.title === "Late Fine (Auto-calculated)"}
                />
              </div>
              <div className="col-span-2 pt-6">
                <button
                  onClick={() => removeExtraFee(i)}
                  disabled={ef.title === "Late Fine (Auto-calculated)"}
                  className={`w-full ${
                    ef.title === "Late Fine (Auto-calculated)"
                      ? "bg-gray-300 cursor-not-allowed text-gray-500"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  } rounded-xl px-3 py-2.5 transition-all duration-200 font-semibold text-sm`}
                  title={ef.title === "Late Fine (Auto-calculated)" ? "Auto-calculated fees cannot be removed" : "Remove this fee"}
                >
                  {ef.title === "Late Fine (Auto-calculated)" ? "🔒 Auto" : "✕ Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};