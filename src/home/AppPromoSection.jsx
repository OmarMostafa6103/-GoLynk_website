import React from "react";

const AppPromoSection = () => (
  <section className="py-16 pb-28 bg-gradient-to-b from-brand-50 to-white">
    <div className="max-w-screen-2xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1 space-y-6 text-right">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-2">
          تحكم بكل خدماتك من مكان واحد
        </h2>
        <div className="w-16 h-1 bg-brand-500 rounded mb-4 ml-auto"></div>
        <ul className="space-y-3 text-gray-700 text-base md:text-lg">
          <li className="flex items-center gap-2 justify-end">
            <span className="text-blue-600 font-bold">01</span>
            <span>أنشئ المهمة</span>
          </li>
          <li className="flex items-center gap-2 justify-end">
            <span className="text-blue-600 font-bold">02</span>
            <span>استقبل العروض</span>
          </li>
          <li className="flex items-center gap-2 justify-end">
            <span className="text-blue-600 font-bold">03</span>
            <span>احجز بسهولة</span>
          </li>
        </ul>
        <div className="flex flex-wrap gap-3 justify-end">
          <a
            href="/orders"
            className="px-6 py-3 rounded-full bg-brand-500 text-white font-bold shadow-brand hover:bg-brand-600 transition"
          >
            ابدأ الحجز
          </a>
          <a
            href="/social-login"
            className="px-6 py-3 rounded-full border-2 border-brand-500 text-brand-600 font-bold hover:bg-brand-50 transition"
          >
            سجّل دخول
          </a>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <div className="mx-auto w-full max-w-lg xl:max-w-xl aspect-[10/16] rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-400 shadow-xl flex items-center justify-center text-white text-4xl xl:text-5xl font-black">
          GoLynk
        </div>
      </div>
    </div>

    <div className="mt-10 bg-brand-800 text-white py-8 rounded-xl flex flex-col md:flex-row items-center justify-between px-6">
      <div className="text-right">
        <h3 className="text-xl md:text-2xl font-bold mb-2">
          هل لديك مركبة أو مهارات؟
        </h3>
        <p>انضم كمقدم خدمة وابدأ الربح.</p>
      </div>
      <a
        href="/users"
        className="mt-4 md:mt-0 px-8 py-3 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-brand-800 transition"
      >
        سجل كمقدم خدمة
      </a>
    </div>
  </section>
);

export default AppPromoSection;
