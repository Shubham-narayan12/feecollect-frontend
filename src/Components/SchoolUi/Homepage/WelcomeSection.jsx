"use client";
import React, { useRef, useEffect } from "react";

const notices = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "Desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  "Many desktop publishing packages and web page editors now use",
  "Various versions have evolved over the years.",
  "Welcome To Green Field School",
  "Report submission till 15/02/2023",
];

const events = [
  {
    month: "June",
    day: "21",
    sub: "Maths & English",
    title: "Offer With Higher Package Of 40 LPA",
  },
  {
    month: "July",
    day: "05",
    sub: "Science & Tech",
    title: "Annual Science Exhibition",
  },
  {
    month: "Aug",
    day: "12",
    sub: "Sports Day",
    title: "Athletics Championship",
  },
];

function useMarquee(ref, speed = 0.5) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animId;
    let pos = 0;
    const inner = el.querySelector(".marquee-inner");
    if (!inner) return;

    const clone = inner.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    el.appendChild(clone);

    const step = () => {
      pos -= speed;
      if (Math.abs(pos) >= inner.offsetHeight) pos = 0;
      el.style.transform = `translateY(${pos}px)`;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, []);
}

/* NOTICE */
function NoticeMarquee() {
  const ref = useRef(null);
  useMarquee(ref, 0.6);

  return (
    <div className="overflow-hidden h-[260px] sm:h-[300px] md:h-[340px] relative">
      <div ref={ref}>
        <div className="marquee-inner flex flex-col gap-4 py-2">
          {notices.map((text, i) => (
            <div key={i} className="flex gap-2 text-white text-xs sm:text-sm">
              <span>✔</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* EVENTS */
function EventMarquee() {
  const ref = useRef(null);
  useMarquee(ref, 0.5);

  return (
    <div className="overflow-hidden h-[260px] sm:h-[300px] md:h-[340px] relative">
      <div ref={ref}>
        <div className="marquee-inner flex flex-col gap-4 py-2">
          {events.map((ev, i) => (
            <div key={i} className="flex items-center gap-3 border-b pb-3">
              {/* Date */}
              <div className="bg-green-600 text-white rounded-lg px-3 py-2 text-center min-w-[60px]">
                <p className="text-[10px] font-semibold">{ev.month}</p>
                <p className="text-lg font-bold">{ev.day}</p>
              </div>

              {/* Info */}
              <div>
                <p className="text-xs text-gray-500">{ev.sub}</p>
                <p className="text-sm font-semibold text-gray-800">
                  {ev.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* MAIN */
export default function WelcomeSection() {
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
            <NoticeMarquee />
          </div>
        </div>

        {/* EVENTS */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
            Recent Events
          </h2>
          <div className="w-12 h-[3px] bg-yellow-500 mb-4"></div>

          <EventMarquee />
        </div>
      </div>
    </section>
  );
}
