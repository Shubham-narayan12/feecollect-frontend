import { Routes, Route, Navigate } from "react-router-dom";

import AdminHeader from "../Components/Sms/Collection/Dashboard/Header";
import AdminSidebar from "../Components/Sms/Collection/Dashboard/Sidebar";

import DashboardHome from "../Components/Sms/Collection/Dashboard/DashboardHome";
import Students from "../Components/Sms/Collection/Dashboard/Students";
import Reports from "../Components/Sms/Collection/Dashboard/Reports";
import AdmissionForm from "../Components/Sms/Collection/Dashboard/AdmissionForm";
import FeeCollection from "./FeeCollection";
import PaymentHistory from "../Components/Sms/Collection/Dashboard/PaymentHistory";
import SchoolFeeStructure from "../Components/Sms/Collection/Dashboard/Fees";
import FeeSettings from "../Pages/FeeSettings";
import SchoolAdminProfile from "../Pages/SchoolAdminProfile";

import IDCardComponent from "../Components/Sms/Collection/Dashboard/IDCardComponent";
import Recipt from "../Components/Sms/Collection/Dashboard/Recipt";
import ReciptDetail from "../Components/Sms/Collection/Dashboard/ReciptDetail";
import Banner from "../Components/Sms/Collection/Dashboard/Banner";
import Gallery from "../Components/Sms/Collection/Dashboard/Gallery";
import NoticeAndEvent from "../Components/Sms/Collection/Dashboard/NoticeAndEvent";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 fixed left-0 top-0 h-screen bg-white border-r z-[1000]">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-60 flex flex-col h-screen">
        {/* Sticky Header */}
        <AdminHeader />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-5">
          <Routes>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="students" element={<Students />} />
            <Route path="fees" element={<SchoolFeeStructure />} />
            <Route path="fee-settings" element={<FeeSettings />} />
            <Route path="fee-collection" element={<FeeCollection />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="reports" element={<Reports />} />
            <Route path="admission" element={<AdmissionForm />} />
            <Route path="profile" element={<SchoolAdminProfile />} />
            <Route path="recipt" element={<Recipt />} />
            <Route path="recipt/1" element={<ReciptDetail />} />
            <Route path="website/banner" element={<Banner />} />
            <Route path="website/gallery" element={<Gallery />} />
            <Route
              path="website/notice-and-event"
              element={<NoticeAndEvent />}
            />

            <Route path="id-cards" element={<IDCardComponent />} />

            {/* Redirect /sms to /sms/dashboard */}
            <Route path="" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
