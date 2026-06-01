import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Megaphone,
  Trash2,
  Plus,
  Clock,
  MapPin,
} from "lucide-react";

import {
  createNoticeApi,
  createEventApi,
  getAllEventApi,
  getAllNoticeApi,
  deleteEventApi,
  deleteNoticeApi,
} from "../../../../api/noticeAndEventsApi";

const NoticeAndEvent = () => {
  // ===============================
  // NOTICE STATES
  // ===============================
  const [notices, setNotices] = useState([]);
  const [notice, setNotice] = useState("");

  // ===============================
  // EVENT STATES
  // ===============================
  const [events, setEvents] = useState([]);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDay, setEventDay] = useState("");
  const [eventMonth, setEventMonth] = useState("June");
  const [eventYear, setEventYear] = useState("");

  // ===============================
  // GET ALL NOTICE
  // ===============================
  const fetchAllNotice = async () => {
    try {
      const response = await getAllNoticeApi();

      setNotices(response?.data?.notices || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // GET ALL EVENTS
  // ===============================
  const fetchAllEvents = async () => {
    try {
      const response = await getAllEventApi();

      setEvents(response?.data?.events || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // CREATE NOTICE
  // ===============================
  const handleCreateNotice = async () => {
    try {
      if (!notice.trim()) {
        return alert("Please enter notice");
      }

      await createNoticeApi({
        notice,
      });

      setNotice("");

      fetchAllNotice();
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // DELETE NOTICE
  // ===============================
  const handleDeleteNotice = async (id) => {
    try {
      await deleteNoticeApi(id);

      fetchAllNotice();
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // CREATE EVENT
  // ===============================
  const handleCreateEvent = async () => {
    try {
      if (!eventTitle || !eventDay || !eventMonth || !eventYear) {
        return alert("Please fill all event fields");
      }

      const formattedDate = `${eventDay} ${eventMonth} ${eventYear}`;

      await createEventApi({
        eventTitle,
        eventDate: formattedDate,
        eventDescription,
      });

      setEventTitle("");
      setEventDescription("");
      setEventDay("");
      setEventMonth("June");
      setEventYear("");

      fetchAllEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // DELETE EVENT
  // ===============================
  const handleDeleteEvent = async (id) => {
    try {
      await deleteEventApi(id);

      fetchAllEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================
  // USE EFFECT
  // ===============================
  useEffect(() => {
    fetchAllNotice();
    fetchAllEvents();
  }, []);

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
        {/* ================= NOTICE SECTION ================= */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Megaphone size={20} className="text-blue-500" />
              Post New Notice
            </h2>

            <div className="space-y-4">
              <textarea
                maxLength={150}
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                placeholder="Type your notice here (Max 20-30 words)..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none text-sm"
              />

              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-400">
                  Recommended: Short & Clear
                </span>

                <button
                  onClick={handleCreateNotice}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                  Post Notice
                </button>
              </div>
            </div>
          </div>

          {/* NOTICE LIST */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              Recent Notices
            </p>

            {notices.map((n) => (
              <div
                key={n._id}
                className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm flex justify-between items-start"
              >
                <div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {n.notice}
                  </p>

                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-2">
                    <Clock size={12} />

                    {new Date(n.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteNotice(n._id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= EVENT SECTION ================= */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-emerald-500" />
              Add New Event
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* EVENT TITLE */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  EVENT TITLE
                </label>

                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Sports Meet"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>

              {/* EVENT DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  SUBTITLE / DESCRIPTION
                </label>

                <input
                  type="text"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="e.g. Inter-school Competition"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>

              {/* DAY */}
              <div className="grid grid-cols-3 gap-2 md:col-span-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">
                    DAY
                  </label>

                  <input
                    type="number"
                    value={eventDay}
                    onChange={(e) => setEventDay(e.target.value)}
                    placeholder="DD"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>

                {/* MONTH */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">
                    MONTH
                  </label>

                  <select
                    value={eventMonth}
                    onChange={(e) => setEventMonth(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  >
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>

                {/* YEAR */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block">
                    YEAR
                  </label>

                  <input
                    type="number"
                    value={eventYear}
                    onChange={(e) => setEventYear(e.target.value)}
                    placeholder="YYYY"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleCreateEvent}
                className="md:col-span-2 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
              >
                <Plus size={18} />
                Schedule Event
              </button>
            </div>
          </div>

          {/* EVENT LIST */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
              Upcoming Events
            </p>

            {events.map((e) => {
              const dateParts = e.eventDate?.split(" ");

              return (
                <div
                  key={e._id}
                  className="bg-white overflow-hidden rounded-2xl border border-slate-200 shadow-sm flex items-stretch"
                >
                  <div className="bg-emerald-600 text-white px-6 flex flex-col items-center justify-center min-w-[100px]">
                    <span className="text-2xl font-black leading-none">
                      {dateParts?.[0]}
                    </span>

                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {dateParts?.[1]}
                    </span>
                  </div>

                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">
                      {e.eventTitle}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      {e.eventDescription}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        <MapPin size={12} />
                        Campus Ground
                      </span>

                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock size={12} />

                        {dateParts?.[2]}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center">
                    <button
                      onClick={() => handleDeleteEvent(e._id)}
                      className="p-2 text-slate-300 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeAndEvent;