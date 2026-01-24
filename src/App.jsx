import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* 🌐 Public School UI */
import SchoolHome from "./Pages/SchoolHome";
import SchoolAboutUs from "./Pages/SchoolAboutUs";
import SchoolContactPage from "./Pages/SchoolContactUs";
import GalleryPage from "./Pages/GalleryPage";
import EnquiryPage from "./Pages/EnquiryPage";
import SchoolNavbar from "./Components/SchoolUi/Homepage/SchoolNavbar";
import SchoolFooter from "./Components/SchoolUi/Homepage/SchoolFooter";

/* 👥 Our Team Pages */
import DirectorDesk from "./Components/SchoolUi/Team/DirectorDesk";
import PrincipalDesk from "./Components/SchoolUi/Team/PrincipalDesk";
import Faculties from "./Components/SchoolUi/Team/Faculties";

/* 🔐 Admin Pages */
import LoginPage from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";

/* 🔐 Protected Route */
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

/* 🌐 Public Layout (Navbar + Pages + Footer) */
function PublicLayout() {
  return (
    <>
      <SchoolNavbar />
      <Outlet />
      <SchoolFooter />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 PUBLIC WEBSITE WITH NAVBAR & FOOTER */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<SchoolHome />} />
          <Route path="/aboutus" element={<SchoolAboutUs />} />
          <Route path="/contact" element={<SchoolContactPage />} />
          <Route path="/GalleryPage" element={<GalleryPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          
          {/* 👥 Our Team Routes */}
          <Route path="/team/director" element={<DirectorDesk />} />
          <Route path="/team/principal" element={<PrincipalDesk />} />
          <Route path="/team/faculties" element={<Faculties />} />
        </Route>

        {/* 🔓 LOGIN (NO NAVBAR/FOOTER) */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🏠 SMS DASHBOARD (NO NAVBAR/FOOTER) */}
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