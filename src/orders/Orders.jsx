import React, { useState } from "react";
import Container from "../components/Container";
import { motion as Motion, AnimatePresence } from "framer-motion";

/**
 * Orders.jsx
 * Props:
 *  - orders: array of order objects (see sample shape in Requests.jsx)
 *
 * Renders list of cards with top accent border, status badge, icons, avatar initial,
 * action buttons and expandable details with smooth animations.
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
const IconMoney = ({ className = "w-4 h-4 text-emerald-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
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
);

const moneyFmt = (amount, currency = "EGP") =>
  `${currency} ${amount.toLocaleString()}`;

const statusColor = (status) => {
  switch (status) {
    case "تم التوصيل":
      return "bg-green-100 text-green-700"; // Completed → Green
    case "قيد التنفيذ":
      return "bg-blue-100 text-blue-700"; // In Progress → Blue
    case "معلّق":
      return "bg-gray-100 text-gray-700"; // Pending → Gray
    case "متاحة للحجز":
      return "bg-emerald-50 text-emerald-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function Orders({ orders = [], compact = false }) {
  // If this component is used standalone (no orders prop passed), show sample data
  const SAMPLE_ORDERS = [
    {
      id: 1,
      type: "order",
      title: "طلب توصيل أجهزة إلكترونية",
      pickup: "مدينة نصر",
      dropoff: "الجيزة، شارع الهرم",
      date: "2025/10/05 - 15:00",
      reward: 150,
      currency: "EGP",
      status: "قيد التنفيذ",
      sender: "محمد ص.",
      avatarColor: "bg-sky-500",
      topColorClass: "border-green-500",
      note: "تم الإرسال بواسطة: شركة نصر",
    },
    {
      id: 2,
      type: "order",
      title: "أوراق ومستندات هامة",
      pickup: "وسط البلد",
      dropoff: "6 أكتوبر",
      date: "اليوم - 18:30",
      reward: 90,
      currency: "EGP",
      status: "معلّق",
      sender: "شركة الريان",
      avatarColor: "bg-orange-500",
      topColorClass: "border-yellow-400",
    },
  ];

  const data = orders && orders.length ? orders : SAMPLE_ORDERS;

  const [open, setOpen] = useState({});

  const toggle = (id) => setOpen((s) => ({ ...s, [id]: !s[id] }));

  // Render compact (no page header/wrapper) when embedded in a two-column layout
  if (compact) {
    return (
      <div className="space-y-5">
        <AnimatePresence>
          {data.map((item) => (
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
              aria-label={`طلب ${item.title}`}
            >
              {/* status badge top-right */}
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
                        {item.type === "trip" ? (
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
                        ) : (
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M3 3h18v18H3z"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-4 text-sm text-slate-600 space-y-3">
                      <div className="flex items-center gap-2">
                        <IconLocation />
                        <div>
                          <div className="font-medium text-slate-800">
                            {item.pickup}
                          </div>
                          <div className="text-xs text-gray-500">التقاط</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconLocation className="w-4 h-4 text-red-500 rotate-180" />
                        <div>
                          <div className="font-medium text-slate-800">
                            {item.dropoff}
                          </div>
                          <div className="text-xs text-gray-500">تسليم</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconTime />
                        <div className="text-sm text-gray-600">{item.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconMoney />
                        <div className="text-sm font-bold text-emerald-700">
                          {moneyFmt(item.reward, item.currency)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* avatar & actions */}
                  <div className="w-28 flex flex-col items-center justify-between text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${item.avatarColor}`}
                    >
                      {item.sender?.charAt(0) || "U"}
                    </div>

                    <div className="mt-3 w-full">
                      <button
                        onClick={() => toggle(item.id)}
                        className="w-full inline-flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition"
                      >
                        {open[item.id] ? "إخفاء" : "عرض"}
                      </button>
                    </div>

                    <div className="mt-2 w-full">
                      <button className="w-full inline-flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-full bg-emerald-600 text-white hover:brightness-95 transition">
                        اختر
                      </button>
                    </div>
                  </div>
                </div>

                {/* expandable details */}
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
                        مرسل بواسطة: {item.sender}
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

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Container className="py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">الطلبات</h1>
          <p className="text-sm text-gray-500">
            قائمة الطلبات الواردة — استعرض أو اختر أي طلب للتفاصيل.
          </p>
        </header>

        <div className="space-y-6">
          <AnimatePresence>
            {data.map((item) => (
              <Motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 12px 30px rgba(2,6,23,0.08)",
                }}
                transition={{ duration: 0.45 }}
                className={`relative bg-white rounded-2xl shadow-sm border ${item.topColorClass} border-t-4 overflow-hidden`}
                dir="rtl"
                aria-label={`طلب ${item.title}`}
              >
                {/* status badge top-right */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${statusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <h3 className="text-xl font-extrabold text-slate-800 leading-tight">
                          {item.title}
                        </h3>

                        <div className="text-slate-400 mt-1">
                          {item.type === "trip" ? (
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
                          ) : (
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden
                            >
                              <path
                                d="M3 3h18v18H3z"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 border-t pt-4 text-sm text-slate-600">
                        <div className="flex items-center gap-3">
                          <IconLocation />
                          <div>
                            <div className="font-medium text-slate-800">
                              {item.pickup}
                            </div>
                            <div className="text-xs text-gray-500">التقاط</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <IconLocation className="w-4 h-4 text-red-500 rotate-180" />
                          <div>
                            <div className="font-medium text-slate-800">
                              {item.dropoff}
                            </div>
                            <div className="text-xs text-gray-500">تسليم</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <IconTime />
                          <div className="text-sm text-gray-600">
                            {item.date}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <IconMoney />
                          <div className="text-sm font-bold text-amber-700">
                            {moneyFmt(item.reward, item.currency)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* avatar & actions */}
                    <div className="w-28 flex flex-col items-center justify-between text-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${item.avatarColor}`}
                      >
                        {item.sender?.charAt(0) || "U"}
                      </div>

                      <div className="mt-3 w-full">
                        <button
                          onClick={() => toggle(item.id)}
                          className="w-full inline-flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition"
                        >
                          {open[item.id] ? "إخفاء" : "عرض"}
                        </button>
                      </div>

                      <div className="mt-2 w-full">
                        <button className="w-full inline-flex items-center justify-center text-sm font-semibold px-3 py-2 rounded-full bg-amber-600 text-white hover:brightness-95 transition">
                          اختر
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* expandable details */}
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
                          مرسل بواسطة: {item.sender}
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Motion.article>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
