import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Pages & Components */
import AdminDashboard from "./Pages/AdminDashboard";
import LoginPage from "./Pages/LoginPage";
import FeeCollection from "./Pages/FeeCollection";
import FeeSettings from "./Pages/FeeSettings";
import SchoolFeeStructure from "./Components/Dashboard/Fees";

/* 🔐 Protected Route */
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🏠 Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 📊 Fee Structure */}
        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <SchoolFeeStructure />
            </ProtectedRoute>
          }
        />

        {/* 💰 Fee Collection */}
        <Route
          path="/fee-collection"
          element={
            <ProtectedRoute>
              <FeeCollection />
            </ProtectedRoute>
          }
        />

      

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 🔔 Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}
