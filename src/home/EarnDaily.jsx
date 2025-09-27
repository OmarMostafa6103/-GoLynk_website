import React from "react";
import { motion as Motion } from "framer-motion";
import { container, item, imageReveal } from "./animVariants";

const features = [
  "سجل بياناتك في دقائق بسهولة.",
  "تحقق من الهوية لتوفير الأمان والموثوقية.",
  "ابدأ التوصيل وحوّل رحلتك إلى دخل إضافي.",
];

export default function EarnDaily() {
  return (
    <section
      className="relative py-20 bg-gradient-to-b from-[#f5f3e0] to-[#f0ede2]"
      dir="rtl"
    >
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/30 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* left: illustration */}
          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.05}
            className="order-2 lg:order-1 flex justify-center"
          >
            <Motion.div
              variants={imageReveal}
              className="rounded-3xl bg-white shadow-2xl p-6 w-full max-w-md flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-200 to-transparent opacity-12 z-0" />
              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src={encodeURI("/Dropshipping model-rafiki.svg")}
                  alt="توضيح عملية التوصيل"
                  className="w-full h-auto max-h-[380px] object-contain drop-shadow-xl"
                  loading="lazy"
                />
              </div>
            </Motion.div>
          </Motion.div>

          {/* right: content */}
          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.12}
            className="order-1 lg:order-2"
          >
            <Motion.h2
              variants={item}
              className="text-4xl md:text-5xl font-extrabold text-right bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text mb-4"
            >
              اربح من رحلاتك اليومية
            </Motion.h2>
            <Motion.p
              variants={item}
              className="text-lg text-slate-600 mb-8 text-right"
            >
              كل رحلة ممكن تتحول لفرصة دخل إضافي وتساعد في تقليل الانبعاثات
              الكربونية. انضم الآن وشارك في التغيير!
            </Motion.p>

            <ul className="space-y-5 text-right mb-10">
              {features.map((itemText, i) => (
                <Motion.li
                  key={i}
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white shadow-md">
                    ✓
                  </span>
                  <span className="text-lg text-slate-700">{itemText}</span>
                </Motion.li>
              ))}
            </ul>

            <Motion.div variants={item} className="flex lg:justify-end gap-4">
              <button className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-7 py-3 rounded-full shadow-lg hover:scale-105 transition">
                انضم الآن
              </button>
              <button className="inline-flex items-center justify-center border-2 border-emerald-600 text-emerald-700 font-medium px-6 py-3 rounded-full hover:bg-emerald-50 transition">
                اعرف المزيد
              </button>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
