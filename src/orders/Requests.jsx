import React, { useMemo, useState } from "react";
import Orders from "./Orders";
import Trips from "./Trips";

/**
 * Requests.jsx
 * Page that composes Orders and Trips side-by-side (desktop) or stacked (mobile).
 * Provides search + status filter and passes data down.
 */

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
    topColorClass: "border-green-500", // top border accent
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
  {
    id: 3,
    type: "trip",
    title: "رحلة من القاهرة إلى الإسكندرية",
    pickup: "التجمع الخامس",
    dropoff: "سيدي جابر",
    date: "غداً - 09:00 صباحاً",
    reward: 50,
    currency: "EGP",
    status: "متاحة للحجز",
    sender: "سارة م.",
    avatarColor: "bg-emerald-500",
    topColorClass: "border-sky-400",
    note: "تكلفة الشحن: تبدأ من EGP 50",
  },
  {
    id: 4,
    type: "trip",
    title: "رحلة داخلية (القاهرة)",
    pickup: "الزمالك",
    dropoff: "المعادى",
    date: "اليوم - 20:00 مساءً",
    reward: 35,
    currency: "EGP",
    status: "متاحة للحجز",
    sender: "خالد ف.",
    avatarColor: "bg-emerald-700",
    topColorClass: "border-sky-400",
    note: "تكلفة الشحن: تبدأ من EGP 35",
  },
];

import Container from "../components/Container";

export default function Requests() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // e.g., "قيد التنفيذ"
  const [tabView, setTabView] = useState("all"); // all / orders / trips

  const orders = useMemo(
    () => SAMPLE_ORDERS.filter((s) => s.type === "order"),
    []
  );
  const trips = useMemo(
    () => SAMPLE_ORDERS.filter((s) => s.type === "trip"),
    []
  );

  // Filtering logic (applies to both lists)
  const filterBy = (items) =>
    items.filter((it) => {
      if (statusFilter && it.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.trim().toLowerCase();
      return (
        (it.title || "").toLowerCase().includes(q) ||
        (it.pickup || "").toLowerCase().includes(q) ||
        (it.dropoff || "").toLowerCase().includes(q) ||
        (it.sender || "").toLowerCase().includes(q)
      );
    });

  const filteredOrders = filterBy(orders);
  const filteredTrips = filterBy(trips);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Container className="pt-4">
        {/* sticky header */}
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                الطلبات والرحلات
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                ابحث وفلتر، ويتم عرض الطلبات يمينًا والرحلات يسارًا على الشاشات
                الواسعة.
              </p>
            </div>

            {/* search + filter */}
            <div className="w-full md:w-auto flex gap-3 items-center">
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
                <input
                  className="outline-none text-right w-64 md:w-80"
                  placeholder="ابحث في العناوين أو المواقع أو الأسماء..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="بحث"
                />
                <button
                  className="text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setQuery("")}
                  aria-label="مسح البحث"
                  title="مسح"
                >
                  ✕
                </button>
              </div>

              <select
                className="border rounded-lg px-3 py-2 bg-white shadow-sm text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="فلتر الحالة"
              >
                <option value="">الكل</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="معلّق">معلّق</option>
                <option value="متاحة للحجز">متاحة للحجز</option>
              </select>

              <div className="inline-flex gap-2">
                <button
                  className={`px-3 py-2 rounded-lg text-sm ${
                    tabView === "all"
                      ? "bg-slate-900 text-white"
                      : "bg-white border shadow-sm"
                  }`}
                  onClick={() => setTabView("all")}
                >
                  الكل
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-sm ${
                    tabView === "orders"
                      ? "bg-slate-900 text-white"
                      : "bg-white border shadow-sm"
                  }`}
                  onClick={() => setTabView("orders")}
                >
                  الطلبات
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-sm ${
                    tabView === "trips"
                      ? "bg-slate-900 text-white"
                      : "bg-white border shadow-sm"
                  }`}
                  onClick={() => setTabView("trips")}
                >
                  الرحلات
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* two-column split with independent scrolling */}
        <main className="flex flex-col lg:flex-row gap-6 py-6 lg:py-8">
          {(tabView === "all" || tabView === "orders") && (
            <section
              className="flex-1 bg-white rounded-2xl shadow-sm px-4 sm:px-5 md:px-6 py-5 lg:mr-2 no-scrollbar"
              style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}
              aria-label="الطلبات المعروضة"
            >
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-3">
                <h2 className="text-xl font-extrabold">الطلبات المعروضة</h2>
                <div className="text-sm text-gray-500">
                  ({filteredOrders.length} طلب)
                </div>
              </div>
              <Orders orders={filteredOrders} compact />
            </section>
          )}

          {(tabView === "all" || tabView === "trips") && (
            <section
              className="flex-1 bg-white rounded-2xl shadow-sm px-4 sm:px-5 md:px-6 py-5 lg:ml-2 no-scrollbar"
              style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}
              aria-label="الرحلات المتاحة"
            >
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-3">
                <h2 className="text-xl font-extrabold">الرحلات المتاحة</h2>
                <div className="text-sm text-gray-500">
                  ({filteredTrips.length} رحلة)
                </div>
              </div>
              <Trips trips={filteredTrips} compact />
            </section>
          )}
        </main>
      </Container>
    </div>
  );
}
