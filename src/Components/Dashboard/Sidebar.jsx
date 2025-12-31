import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PieChart,
  Users,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

/* ---------------- TEMP ADMIN DATA (Later replace with backend) ---------------- */
const ADMIN = {
  name: "Shubham Yadav",
  role: "Super Admin",
  email: "admin@schoolfee.com",
};

const SidebarIcon = ({ icon: Icon }) => <Icon size={20} />;

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const isActiveTab = (tab) => location.search.includes(`tab=${tab}`);

  return (
    <>
      <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 overflow-y-auto h-screen fixed left-0 top-0 z-50 shadow-2xl">

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/3 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/15 to-cyan-500/10 rounded-full blur-3xl animate-pulse-slow-delayed" />
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" />
        </div>

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
            tab="dashboard"
            icon={PieChart}
            active={isActiveTab("dashboard")}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />

          <SidebarItem
            label="Admission"
            tab="admission"
            icon={Users}
            active={isActiveTab("admission")}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />

          <SidebarItem
            label="Students"
            tab="students"
            icon={Users}
            active={isActiveTab("students")}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />

          <SidebarItem
            label="Fees"
            tab="fees"
            icon={CreditCard}
            active={isActiveTab("fees")}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />

          <SidebarItem
            label="ID Card"
            tab="id-cards"
            icon={BadgeCheck}
            active={isActiveTab("id-cards")}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />

          {/* Divider */}
          <div className="my-4 h-px bg-slate-700/50" />

          {/* ---------------- ADMIN INFO CARD ---------------- */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-md opacity-50" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                  {ADMIN.name.charAt(0)}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-white">
                  {ADMIN.name}
                </p>
                <p className="text-xs text-emerald-400">
                  {ADMIN.role}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {ADMIN.email}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-green-400 font-semibold">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-slow-delayed {
          0%,100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 8s infinite; }
        .animate-float { animation: float 10s infinite; }
      `}</style>
    </>
  );
}

/* ---------------- SIDEBAR ITEM ---------------- */
function SidebarItem({ label, tab, icon, active, hoveredItem, setHoveredItem }) {
  const isHovered = hoveredItem === tab;

  return (
    <Link to={`/?tab=${tab}`}>
      <div
        className={`relative flex items-center p-3 rounded-xl transition-all duration-300 cursor-pointer
        ${
          active
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-800/70"
        }`}
        onMouseEnter={() => setHoveredItem(tab)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="p-2 rounded-lg bg-slate-700/30">
          <SidebarIcon icon={icon} />
        </div>
        <span className="ml-3 font-semibold text-sm">{label}</span>

        {isHovered && !active && (
          <span className="absolute right-3 text-emerald-400">›</span>
        )}
      </div>
    </Link>
  );
}