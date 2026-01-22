import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* 🌐 Public School UI */
import SchoolHome from "./Pages/SchoolHome";

/* 🔐 Admin Pages */
import LoginPage from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";

/* 🔐 Protected Route */
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 SCHOOL WEBSITE */}
        <Route path="/" element={<SchoolHome />} />

        {/* 🔓 LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🏠 SMS DASHBOARD (with nested routes) */}
        <Route
          path="/sms/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🚫 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </Router>
  );
}
