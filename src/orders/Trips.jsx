import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

/**
 * Trips.jsx
 * Props:
 *  - trips: array of trip objects (see sample shape in Requests.jsx)
 */

const IconLocation = ({ className = "w-4 h-4 text-sky-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="8" r="2" fill="currentColor" />
  </svg>
);
const IconTime = ({ className = "w-4 h-4 text-gray-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M12 7v6l4 2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconBadge = ({ children, className = "w-5 h-5" }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    {children}
  </div>
);

const moneyFmt = (amount, currency = "EGP") =>
  `${currency} ${amount.toLocaleString()}`;

const statusColor = (status) => {
  switch (status) {
    case "متاحة للحجز":
      return "bg-emerald-50 text-emerald-700";
    case "قيد التنفيذ":
      return "bg-blue-100 text-blue-700";
    case "منتهية":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function Trips({ trips = [] }) {
  const [open, setOpen] = useState({});
  const toggle = (id) => setOpen((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="space-y-5">
      <AnimatePresence>
        {trips.map((item) => (
          <Motion.article
            key={item.id}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{
              y: -4,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(2,6,23,0.08)",
            }}
            transition={{ duration: 0.45 }}
            className={`relative bg-white rounded-lg shadow-sm border ${item.topColorClass} border-t-4 overflow-hidden p-5`}
            dir="rtl"
            aria-label={`رحلة ${item.title}`}
          >
            <div className="absolute top-4 right-4">
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full ${statusColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>

            <div className="">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-800 leading-tight">
                      {item.title}
                    </h3>

                    <div className="text-slate-400 mt-1">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 7h18"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4 text-sm text-slate-600 space-y-3">
                    <div className="flex items-center gap-2">
                      <IconLocation />
                      <div>
                        <div className="font-medium text-slate-800">
                          {item.pickup}
                        </div>
                        <div className="text-xs text-gray-500">الانطلاق</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconLocation className="w-4 h-4 text-red-500 rotate-180" />
                      <div>
                        <div className="font-medium text-slate-800">
                          {item.dropoff}
                        </div>
                        <div className="text-xs text-gray-500">الوجهة</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconTime />
                      <div className="text-sm text-gray-600">{item.date}</div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <IconBadge>
                        <svg
                          className="w-4 h-4 text-amber-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M12 1v22"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M17 5H7a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3V8a3 3 0 00-3-3z"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          />
                        </svg>
                      </IconBadge>
                      <div className="text-sm font-bold text-amber-700">
                        تكلفة الشحن: تبدأ من{" "}
                        {moneyFmt(item.reward, item.currency)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-28 flex flex-col items-center justify-between text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${item.avatarColor}`}
                  >
                    {item.sender?.charAt(0) || "س"}
                  </div>

                  <div className="mt-3 w-full">
                    <button
                      onClick={() => toggle(item.id)}
                      className="w-full inline-flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition"
                    >
                      {open[item.id] ? "إخفاء" : "تفاصيل"}
                    </button>
                  </div>

                  <div className="mt-2 w-full">
                    <button className="w-full inline-flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-full bg-emerald-600 text-white hover:brightness-95 transition">
                      احجز
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {open[item.id] && (
                  <Motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28 }}
                    className="mt-6 overflow-hidden text-sm text-gray-700 border-t pt-4"
                  >
                    <div>{item.note}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      مسافر: {item.sender}
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          </Motion.article>
        ))}
      </AnimatePresence>
    </div>
  );
}
