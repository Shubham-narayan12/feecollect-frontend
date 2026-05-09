import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PieChart, Users, CreditCard, BadgeCheck } from "lucide-react";

/* ---------------- TEMP ADMIN DATA (Later replace with backend) ---------------- */
const admin = JSON.parse(localStorage.getItem("admin"));
  const adminName = admin?.name || "Admin";
  const adminEmail = admin?.email || "admin@school.com";
  const adminRole = admin?.role || "Admin";
  const avatarLetter = adminName.charAt(0).toUpperCase();

const SidebarIcon = ({ icon: Icon }) => <Icon size={20} />;

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 overflow-y-auto h-screen fixed left-0 top-0 z-50 shadow-2xl">
        {/* Logo */}
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

        {/* Menu */}
        <div className="flex flex-col gap-2 p-4 relative">
          <p className="text-xs text-slate-500 uppercase font-bold px-2 mb-2">
            Main Menu
          </p>

          <SidebarItem
            label="Dashboard"
            to="/sms/dashboard"
            icon={PieChart}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
          <SidebarItem
            label="Admission"
            to="/sms/admission"
            icon={Users}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
          <SidebarItem
            label="Students"
            to="/sms/students"
            icon={Users}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
          <SidebarItem
            label="Fees"
            to="/sms/fees"
            icon={CreditCard}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
          <SidebarItem
            label="ID Card"
            to="/sms/id-cards"
            icon={BadgeCheck}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />

          {/* Divider */}
          <div className="my-4 h-px bg-slate-700/50" />

          {/* Admin Info Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-md opacity-50" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                  {avatarLetter}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-white">{adminName}</p>
                <p className="text-xs text-emerald-400">{adminEmail}</p>
                <p className="text-[11px] text-slate-400 truncate">
                  {adminRole}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-green-400 font-semibold">Online</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- SIDEBAR ITEM ---------------- */
function SidebarItem({ label, to, icon, hoveredItem, setHoveredItem }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center p-3 rounded-xl transition-all duration-300 cursor-pointer
        ${isActive ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg" : "text-slate-300 hover:bg-slate-800/70"}`
      }
      onMouseEnter={() => setHoveredItem(to)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="p-2 rounded-lg bg-slate-700/30">
        <SidebarIcon icon={icon} />
      </div>
      <span className="ml-3 font-semibold text-sm">{label}</span>
    </NavLink>
  );
}
