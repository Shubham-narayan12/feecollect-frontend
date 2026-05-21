import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PieChart,
  Users,
  CreditCard,
  BadgeCheck,
  Globe,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  LayoutPanelTop,
} from "lucide-react";

/* ---------------- TEMP ADMIN DATA ---------------- */
const admin = JSON.parse(localStorage.getItem("admin"));
const adminName = admin?.name || "Admin";
const adminEmail = admin?.email || "admin@school.com";
const adminRole = admin?.role || "Admin";
const avatarLetter = adminName.charAt(0).toUpperCase();

const SidebarIcon = ({ icon: Icon }) => <Icon size={20} />;

export default function Sidebar() {
  const [isWebsiteOpen, setIsWebsiteOpen] = useState(false); // Dropdown state

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 overflow-y-auto h-screen fixed left-0 top-0 z-50 shadow-2xl">
      {/* Logo Section */}
      <div className="relative p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-3 rounded-xl font-bold shadow-xl">
            SF
          </span>
          <div>
            <p className="text-xl font-bold text-white">SchoolFee</p>
            <p className="text-xs text-emerald-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col gap-2 p-4">
        <p className="text-xs text-slate-500 uppercase font-bold px-2 mb-2">
          Main Menu
        </p>

        <SidebarItem label="Dashboard" to="/sms/dashboard" icon={PieChart} />
        {/* --- WEBSITE DROPDOWN --- */}
        <div>
          <button
            onClick={() => setIsWebsiteOpen(!isWebsiteOpen)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 text-slate-300 hover:bg-slate-800/70 ${isWebsiteOpen ? "bg-slate-800/50" : ""}`}
          >
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-slate-700/30">
                <Globe size={20} />
              </div>
              <span className="ml-3 font-semibold text-sm">Website</span>
            </div>
            {isWebsiteOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {/* Dropdown Items */}
          {isWebsiteOpen && (
            <div className="mt-2 ml-6 flex flex-col gap-1 border-l-2 border-slate-700 pl-4 transition-all duration-500">
              <SidebarItem
                label="Banner"
                to="/sms/website/banner"
                icon={LayoutPanelTop}
                isSubItem
              />
              <SidebarItem
                label="Gallery"
                to="/sms/website/gallery"
                icon={ImageIcon}
                isSubItem
              />
              <SidebarItem
                label="Notice And Events"
                to="/sms/website/notice-and-event"
                icon={ImageIcon}
                isSubItem
              />
            </div>
          )}
        </div>
        <SidebarItem label="Admission" to="/sms/admission" icon={Users} />
        <SidebarItem label="Students" to="/sms/students" icon={Users} />
        <SidebarItem label="Fees" to="/sms/fees" icon={CreditCard} />
        <SidebarItem label="ID Card" to="/sms/id-cards" icon={BadgeCheck} />

        <div className="my-4 h-px bg-slate-700/50" />

        {/* Admin Info Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
              {avatarLetter}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {adminName}
              </p>
              <p className="text-[11px] text-emerald-400 truncate">
                {adminEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR ITEM ---------------- */
function SidebarItem({ label, to, icon, isSubItem = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center transition-all duration-300 cursor-pointer
        ${isSubItem ? "p-2" : "p-3 rounded-xl"}
        ${
          isActive
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg rounded-xl"
            : "text-slate-300 hover:bg-slate-800/70"
        }`
      }
    >
      <div className={`${isSubItem ? "" : "p-2 rounded-lg bg-slate-700/30"}`}>
        <SidebarIcon icon={icon} />
      </div>
      <span className="ml-3 font-semibold text-sm">{label}</span>
    </NavLink>
  );
}
