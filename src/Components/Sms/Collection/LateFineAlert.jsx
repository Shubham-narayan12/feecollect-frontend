// ===============================================================================================================================
// 4. LateFineAlert.jsx
// ===============================================================================================================================
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