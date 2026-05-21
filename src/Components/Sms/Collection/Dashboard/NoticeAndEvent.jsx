import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Megaphone,
  Trash2,
  Plus,
  Clock,
  MapPin,
} from "lucide-react";

const NoticeAndEvent = () => {
  // Dummy Data
  const [notices, setNotices] = useState([
    {
      id: 1,
      text: "The school will remain closed on Friday due to heavy rainfall.",
      date: "24 May 2024",
    },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Science Fair",
      sub: "Exploring Space",
      day: "15",
      month: "June",
      year: "2024",
    },
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Bell className="text-amber-500" /> Announcements & Events
        </h1>
        <p className="text-slate-500 text-sm">
          Update students and parents about upcoming school activities.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* --- SECTION 1: NOTICES (Left) --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Megaphone size={20} className="text-blue-500" /> Post New Notice
            </h2>
            <div className="space-y-4">
              <textarea
                maxLength={150}
                placeholder="Type your notice here (Max 20-30 words)..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none text-sm"
              />
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-400">
                  Recommended: Short & Clear
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all">
                  Post Notice
                </button>
              </div>
            </div>
          </div>

          {/* Notice List */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              Recent Notices
            </p>
            {notices.map((n) => (
              <div
                key={n.id}
                className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm flex justify-between items-start"
              >
                <div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {n.text}
                  </p>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-2">
                    <Clock size={12} /> {n.date}
                  </span>
                </div>
                <button className="text-slate-300 hover:text-red-500 transition-colors p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: EVENTS (Right) --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-emerald-500" /> Add New Event
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  EVENT TITLE
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sports Meet"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  SUBTITLE / DESCRIPTION
                </label>
                <input
                  type="text"
                  placeholder="e.g. Inter-school Competition"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>

              {/* Date Pickers Custom Row */}
              <div className="grid grid-cols-3 gap-2 md:col-span-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">
                    DAY
                  </label>
                  <input
                    type="number"
                    placeholder="DD"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">
                    MONTH
                  </label>
                  <select className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">
                    YEAR
                  </label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <button className="md:col-span-2 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                <Plus size={18} /> Schedule Event
              </button>
            </div>
          </div>

          {/* Event Cards */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              Upcoming Events
            </p>
            {events.map((e) => (
              <div
                key={e.id}
                className="bg-white overflow-hidden rounded-2xl border border-slate-200 shadow-sm flex items-stretch"
              >
                <div className="bg-emerald-600 text-white px-6 flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-2xl font-black leading-none">
                    {e.day}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {e.month}
                  </span>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-slate-800 text-sm">
                    {e.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{e.sub}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <MapPin size={12} /> Campus Ground
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock size={12} /> {e.year}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <button className="p-2 text-slate-300 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeAndEvent;
