// ============================================
// 7. DiscountSection.jsx - Enhanced UI
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
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl text-lg shadow-lg">
            🎁
          </span>
          Apply Discount
        </h3>
        {discountType !== "none" && discountValue > 0 && (
          <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm border border-purple-200">
            <span className="text-base">✨</span>
            Discount Active
          </span>
        )}
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
              <span className="text-purple-500">●</span>
              Discount Type
            </label>
            <select
              className={`${inputClass} font-medium cursor-pointer hover:border-purple-400 transition-all duration-200`}
              value={discountType}
              onChange={(e) => {
                setDiscountType(e.target.value);
                if (e.target.value === "none") {
                  setDiscountValue(0);
                  setDiscountReason("");
                }
              }}
            >
              <option value="none">🚫 No Discount</option>
              <option value="percentage">📊 Percentage (%)</option>
              <option value="fixed">💰 Fixed Amount (₹)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
              <span className="text-purple-500">●</span>
              {discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}
            </label>
            <div className="relative">
              <input
                type="number"
                className={`${inputClass} ${discountType === "none" ? "bg-gray-100" : "bg-white"} pr-12 font-semibold text-lg`}
                placeholder={discountType === "percentage" ? "0" : "0.00"}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                disabled={discountType === "none"}
                min="0"
                max={discountType === "percentage" ? "100" : undefined}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                {discountType === "percentage" ? "%" : "₹"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
              <span className="text-purple-500">●</span>
              Reason for Discount
            </label>
            <input
              type="text"
              className={`${inputClass} ${discountType === "none" ? "bg-gray-100" : "bg-white"}`}
              placeholder="e.g., Sibling, Merit, Early Bird"
              value={discountReason}
              onChange={(e) => setDiscountReason(e.target.value)}
              disabled={discountType === "none"}
            />
          </div>
        </div>

        {discountType !== "none" && discountValue > 0 ? (
          <div className="bg-white rounded-xl p-5 border-2 border-purple-300 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full -ml-12 -mb-12 opacity-30"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🎉</span>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Discount Applied</p>
                </div>
                <p className="text-purple-700 font-bold text-lg">
                  {discountType === "percentage" 
                    ? `${discountValue}% off` 
                    : `₹${Number(discountValue).toFixed(2)} off`}
                </p>
                {discountReason && (
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                    <span className="text-purple-500">→</span>
                    {discountReason}
                  </p>
                )}
              </div>
              
              <div className="text-right border-l-2 border-purple-200 pl-6">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">You Save</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-purple-600">₹</span>
                  <span className="text-3xl font-black text-purple-600">{totals.discountAmount.toFixed(2)}</span>
                </div>
                <div className="mt-1 inline-block px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold">
                  Savings Applied ✓
                </div>
              </div>
            </div>
          </div>
        ) : discountType !== "none" && (
          <div className="bg-white/50 rounded-xl p-4 border-2 border-dashed border-purple-300 text-center">
            <p className="text-gray-500 text-sm">
              💡 Enter a discount value to see savings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};