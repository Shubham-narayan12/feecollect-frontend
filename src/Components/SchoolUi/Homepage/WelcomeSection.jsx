"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  getAllEventApi,
  getAllNoticeApi,
} from "../../../api/noticeAndEventsApi";

function useMarquee(ref, speed = 0.5) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animId;
    let pos = 0;
    let paused = false;
    const inner = el.querySelector(".marquee-inner");
    if (!inner) return;

    const clone = inner.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    el.appendChild(clone);

    // ✅ Pause on hover
    const handleMouseEnter = () => {
      paused = true;
    };

    const handleMouseLeave = () => {
      paused = false;
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    const step = () => {
      if (!paused) {
        pos -= speed;
        if (Math.abs(pos) >= inner.offsetHeight) pos = 0;
        el.style.transform = `translateY(${pos}px)`;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);

      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
}

/* NOTICE */
function NoticeMarquee({ notices }) {
  const ref = useRef(null);
  useMarquee(ref, 0.6);

  return (
    <div className="overflow-hidden h-[260px] sm:h-[300px] md:h-[340px] relative">
      <div ref={ref}>
        <div className="marquee-inner flex flex-col gap-4 py-2">
          {notices.map((notice, i) => (
            <div
              key={notice._id || i}
              className="flex gap-2 text-white text-xs sm:text-sm"
            >
              <span>✔</span>
              <span>{notice?.notice}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* EVENTS */
function EventMarquee({ events }) {
  const ref = useRef(null);
  useMarquee(ref, 0.5);

  return (
    <div className="overflow-hidden h-[260px] sm:h-[300px] md:h-[340px] relative">
      <div ref={ref}>
        <div className="marquee-inner flex flex-col gap-4 py-2">
          {events.map((ev, i) => {
            const dateParts = ev.eventDate?.split(" ");

            const day = dateParts?.[0];
            const month = dateParts?.[1];

            return (
              <div
                key={ev._id || i}
                className="flex items-center gap-3 border-b pb-3"
              >
                {/* Date */}
                <div className="bg-green-600 text-white rounded-lg px-3 py-2 text-center min-w-[60px]">
                  <p className="text-[10px] font-semibold">{month}</p>
                  <p className="text-lg font-bold">{day}</p>
                </div>

                {/* Info */}
                <div>
                  <p className="text-xs text-gray-500">
                    {ev.eventTitle || ev.category}
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    {ev.eventDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* MAIN */
export default function WelcomeSection() {
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  // ==============================
  // GET ALL NOTICE
  // ==============================
  const fetchNotices = async () => {
    try {
      const response = await getAllNoticeApi();

      if (response?.data?.success) {
        setNotices(response.data.notices);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==============================
  // GET ALL EVENTS
  // ==============================
  const fetchEvents = async () => {
    try {
      const response = await getAllEventApi();

      if (response?.data?.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==============================
  // USE EFFECT
  // ==============================
  useEffect(() => {
    fetchNotices();
    fetchEvents();
  }, []);

  return (
    <section className="bg-white py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* NOTICE */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
            Notice Board
          </h2>

          <div className="w-12 h-[3px] bg-yellow-500 mb-4"></div>

          <div className="bg-green-700 rounded-lg p-4 sm:p-5">
            <NoticeMarquee notices={notices} />
          </div>
        </div>

        {/* EVENTS */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
            Recent Events
          </h2>

          <div className="w-12 h-[3px] bg-yellow-500 mb-4"></div>

          <EventMarquee events={events} />
        </div>
      </div>
    </section>
  );
}
