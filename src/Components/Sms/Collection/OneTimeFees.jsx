// ============================================
// 3. OneTimeFees.jsx (UPDATED)
// ============================================
export const OneTimeFees = ({
  admissionFee,
  setAdmissionFee,
  annualFee,
  setAnnualFee,
  inputClass,
  FeeLedger,
}) => {
  // ✅ Safety check (jab API load na hua ho)
  if (!FeeLedger) {
    return <div className="mb-8 text-gray-500">Loading One-Time Fees...</div>;
  }

  // =========================
  // Admission Fee Logic
  // =========================
  const admissionPaid = FeeLedger?.admissionFee?.paidAmount || 0;
  const admissionDue = FeeLedger?.admissionFee?.dueAmount || 0;

  const isAdmissionFullyPaid = admissionPaid > 0 && admissionDue === 0;

  const isAdmissionPartial = admissionPaid > 0 && admissionDue > 0;

  // =========================
  // Annual Fee Logic
  // =========================
  const annualPaid = FeeLedger?.annualFee?.paidAmount || 0;
  const annualDue = FeeLedger?.annualFee?.dueAmount || 0;

  const isAnnualFullyPaid = annualPaid > 0 && annualDue === 0;

  const isAnnualPartial = annualPaid > 0 && annualDue > 0;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">📋</span>
        One-Time Fees
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* ========================= */}
        {/* Admission Fee */}
        {/* ========================= */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admission Fee
          </label>

          {isAdmissionFullyPaid ? (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg font-medium">
              ✅ Already Paid (₹{admissionPaid})
            </div>
          ) : isAdmissionPartial ? (
            <>
              <div className="mb-2 text-yellow-700 bg-yellow-100 p-2 rounded">
                ⚠️ Paid: ₹{admissionPaid} | Due: ₹{admissionDue}
              </div>

              <input
                type="number"
                className={inputClass}
                placeholder="Enter remaining amount"
                value={admissionFee}
                onChange={(e) => setAdmissionFee(e.target.value)}
              />
            </>
          ) : (
            <input
              type="number"
              className={inputClass}
              placeholder="Enter admission fee"
              value={admissionFee}
              onChange={(e) => setAdmissionFee(e.target.value)}
            />
          )}
        </div>

        {/* ========================= */}
        {/* Annual Fee */}
        {/* ========================= */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Fee
          </label>

          {isAnnualFullyPaid ? (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg font-medium">
              ✅ Already Paid (₹{annualPaid})
            </div>
          ) : isAnnualPartial ? (
            <>
              <div className="mb-2 text-yellow-700 bg-yellow-100 p-2 rounded">
                ⚠️ Paid: ₹{annualPaid} | Due: ₹{annualDue}
              </div>

              <input
                type="number"
                className={inputClass}
                placeholder="Enter remaining amount"
                value={annualFee}
                onChange={(e) => setAnnualFee(e.target.value)}
              />
            </>
          ) : (
            <input
              type="number"
              className={inputClass}
              placeholder="Enter annual fee"
              value={annualFee}
              onChange={(e) => setAnnualFee(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
