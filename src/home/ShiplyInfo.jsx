import React, { useState } from "react";

const Stat = ({ value, label, icon }) => (
  <div className="flex flex-col items-center">
    <div className="text-3xl md:text-5xl font-extrabold text-brand-700">
      {value}
    </div>
    <div className="mt-2 text-sm md:text-base text-slate-700 flex items-center gap-3">
      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
        {icon}
      </span>
      <span className="text-slate-700">{label}</span>
    </div>
  </div>
);

const Card = ({ title, desc, icon }) => (
  <div className="bg-white rounded-xl border border-transparent hover:border-brand-100 shadow-sm hover:shadow-lg p-4 md:p-6 flex-1 min-w-0 transform transition-all duration-200 group">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
      <div className="mt-2 invisible group-hover:visible transition-opacity duration-200 opacity-0 group-hover:opacity-100">
        <span className="text-brand-600 font-semibold">اعرف أكثر →</span>
      </div>
    </div>
  </div>
);

const ShiplyInfo = () => {
  const [openGuide, setOpenGuide] = useState(false);

  return (
    <section className="w-full flex flex-col gap-10 px-4 sm:px-6">
      {/* Top stats row */}
      <div className="bg-emerald-50/80 py-10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <Stat
            value="1,200"
            label="شحنة ناجحة"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 7h18v10H3z"
                  stroke="#155e75"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 3v4"
                  stroke="#155e75"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 3v4"
                  stroke="#155e75"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <div className="flex items-center justify-center">
            <Stat
              value="85"
              label="انبعاثات أقل"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C12 2 16 6 12 12c0 0-4-6-0-10z"
                    stroke="#065f46"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12s6 4 6 8H6c0-4 6-8 6-8z"
                    stroke="#065f46"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
          <div className="flex justify-end md:justify-end">
            <Stat
              value="350"
              label="مُوصل نشط"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                    stroke="#065f46"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5 20c1.5-4 5-6 7-6s5.5 2 7 6"
                    stroke="#065f46"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        </div>

        {/* partners row */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 mt-6 flex items-center justify-center gap-6 flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/30 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-3 border border-white/20 backdrop-blur-sm"
            ></div>
          ))}
        </div>
      </div>

      {/* Pale band with heading */}
      <div className="bg-[#F4F1DF] py-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-slate-800">كيف نعمل؟</h2>
        </div>
      </div>

      {/* Guide Modal */}
      {openGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenGuide(false)}
            aria-hidden
          />
          <div className="relative bg-white rounded-xl w-11/12 md:w-11/12 lg:w-2/3 max-w-4xl p-4 md:p-8 shadow-xl">
            <button
              onClick={() => setOpenGuide(false)}
              className="absolute top-4 left-4 text-slate-500 hover:text-slate-700"
              aria-label="Close guide"
            >
              ✕
            </button>
            <h3 className="text-2xl font-extrabold text-slate-800 mb-4 text-right">
              دليل استخدام GoLynk
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              هنا مخطط طريق يوضح الخطوات الأساسية لاستخدام الموقع خطوة بخطوة.
            </p>

            {/* Road / Timeline */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <ol className="relative border-l border-slate-200 pl-6 space-y-8">
                  <li className="mb-2">
                    <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white">
                      1
                    </div>
                    <h4 className="font-semibold text-slate-800 text-right">
                      أنشئ طلبك
                    </h4>
                    <p className="text-sm text-slate-600 text-right">
                      أدخل تفاصيل الشحنة، الوزن، والمكان المطلوب توصيلة إليه.
                    </p>
                  </li>
                  <li className="mb-2">
                    <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white">
                      2
                    </div>
                    <h4 className="font-semibold text-slate-800 text-right">
                      مطابقة ذكية
                    </h4>
                    <p className="text-sm text-slate-600 text-right">
                      خوارزمياتنا تختار أفضل فاصل ومزود خدمة بناءً على المسار
                      والسعة.
                    </p>
                  </li>
                  <li>
                    <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white">
                      3
                    </div>
                    <h4 className="font-semibold text-slate-800 text-right">
                      تتبع واستلام
                    </h4>
                    <p className="text-sm text-slate-600 text-right">
                      تابع الشحنة لحظة بلحظة حتى استلامها بنجاح.
                    </p>
                  </li>
                </ol>
              </div>
              <div className="w-full md:w-1/3 flex items-center justify-center">
                <img
                  src={import.meta.env.BASE_URL + "assets/delivery-illustration.svg"}
                  alt="road illustration"
                  className="w-36 md:w-48 h-auto object-contain"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpenGuide(false)}
                className="px-5 py-2 rounded-full bg-brand-100 text-brand-700 font-semibold hover:bg-brand-200 transition"
              >
                اغلق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="max-w-screen-2xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            title="استلم وتتبع لحظي"
            desc="تابع شحنتك لحظة بلحظة حتى وصولها بسلام إلى وجهتها النهائية."
            icon={<span>📍</span>}
          />
          <Card
            title="مطابقة ذكية عبر الذكاء الصناعي"
            desc="نقوم بمطابقة شحنتك تلقائيًا مع الفواصل الأنسب عبر خوارزميات ذكية."
            icon={<span>🤖</span>}
          />
          <Card
            title="أنشئ طلبك"
            desc="أدخل تفاصيل شحنتك ومسارها لإنشاء طلب توصيل جديد."
            icon={<span>✏️</span>}
          />
          <Card
            title="إنشاء رحلة"
            desc="أدخل تفاصيل رحلتك ومواعيدها لإنشاء رحلة نقل جديدة ومشاركتها مع الموصلين."
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 13h18"
                  stroke="#065f46"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 13v-4a3 3 0 013-3h4a3 3 0 013 3v4"
                  stroke="#065f46"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="7" cy="18" r="1" fill="#065f46" />
                <circle cx="17" cy="18" r="1" fill="#065f46" />
              </svg>
            }
          />
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setOpenGuide(true)}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-brand-600 text-white font-semibold shadow-sm hover:bg-brand-700 transition"
          >
            اعرف أكثر
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShiplyInfo;
