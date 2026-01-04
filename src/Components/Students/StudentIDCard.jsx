import React from "react";

export default function StudentIDCard({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-[350px] shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 text-center">
          <h2 className="text-xl font-bold">ABC Public School</h2>
          <p className="text-xs text-blue-100">Student Identity Card</p>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4">
          {/* PHOTO */}
          <div className="flex justify-center">
            {student.photo ? (
              <img
                src={student.photo}
                alt="Student"
                className="h-24 w-24 rounded-xl object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="h-24 w-24 rounded-xl bg-slate-200 flex items-center justify-center">
                <span className="text-slate-500 text-sm">No Photo</span>
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="text-sm space-y-2">
            <p><b>Name:</b> {student.studentName}</p>
            <p><b>Father:</b> {student.fatherName}</p>
            <p><b>Class:</b> {student.className} - {student.section}</p>
            <p><b>Roll No:</b> {student.rollNo || "—"}</p>
            <p><b>Mobile:</b> {student.mobile}</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center px-5 py-4 bg-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-300 hover:bg-slate-400 rounded-lg text-sm font-semibold"
          >
            Close
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
