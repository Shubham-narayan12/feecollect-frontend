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
