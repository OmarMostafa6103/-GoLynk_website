import React, { useState } from "react";

const tabs = [
  { label: "سيارات" },
  { label: "شاحنات خفيفة" },
  { label: "شاحنات 3.5 طن" },
  { label: "شاحنات 7.5 طن +" },
];

const HelpSection = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 text-right">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2">
            اعثر على المساعدة بسرعة وسهولة
          </h2>
          <div className="w-16 h-1 bg-brand-500 rounded mb-4 ml-auto"></div>
          <p className="text-gray-700 mb-6">
            GoLynk منصة شاملة تربطك بمقدمي خدمات محترفين في الوقت الفعلي
            للخرائط، الطلبات، والشحن.
          </p>
          <a
            href="/users"
            className="px-8 py-3 rounded-full bg-brand-500 text-white font-bold text-lg shadow-brand hover:bg-brand-600 transition"
          >
            استعرض مقدمي الخدمات
          </a>
        </div>
        <div className="order-1 md:order-2">
          <div className="flex flex-wrap gap-4 mb-6">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActive(idx)}
                className={`pb-2 text-lg font-bold border-b-2 transition ${
                  active === idx
                    ? "border-brand-600 text-brand-700"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl p-6 flex items-center gap-6 bg-gradient-to-l from-brand-50 to-brand-100">
            <span className="text-5xl">🚚</span>
            <div className="text-right">
              <div className="font-bold text-lg mb-1">{tabs[active].label}</div>
              <div className="text-gray-700">
                خيار مناسب لنقل الأغراض بمختلف الأحجام
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
