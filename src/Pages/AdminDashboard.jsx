import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import AdminHeader from "../Components/Dashboard/Header";
import AdminSidebar from "../Components/Dashboard/Sidebar";

import DashboardHome from "../Components/Dashboard/DashboardHome";
import Students from "../Components/Dashboard/Students";
import Reports from "../Components/Dashboard/Reports";
import AdmissionForm from "../Components/Dashboard/AdmissionForm";
import FeeCollection from "./FeeCollection";
import PaymentHistory from "../Components/Dashboard/PaymentHistory";

import SchoolFeeStructure from "../Components/Dashboard/Fees";
import FeeSettings from "../Pages/FeeSettings";
import AdminProfile from "../Pages/AdminProfile";
import IDCardComponent from "../Components/Dashboard/IDCardComponent";


export default function AdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab(params.get("tab") || "dashboard");
  }, [location.search]);

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
          {tab === "dashboard" && <DashboardHome />}
          {tab === "students" && <Students />}
          {tab === "fees" && <SchoolFeeStructure />}
          {tab === "fee-settings" && <FeeSettings />}
          {tab === "fee-collection" && <FeeCollection />}
          {tab === "payment-history" && <PaymentHistory />}
          {tab === "reports" && <Reports />}
          {tab === "admission" && <AdmissionForm />}
          {tab === "profile" && <AdminProfile />}
          {tab === "id-cards" && <IDCardComponent />}
        </main>
      </div>
    </div>
  );
}

