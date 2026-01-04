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