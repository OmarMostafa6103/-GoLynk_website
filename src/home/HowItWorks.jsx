import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// lightweight CountUp using requestAnimationFrame (avoids external dependency)
function SmallCountUp({ end = 0, duration = 2, decimals = 0 }) {
  const [value, setValue] = useState(0);
  React.useEffect(() => {
    let raf = null;
    let start = null;
    const to = Number(end) || 0;
    const d = Math.max(100, duration * 1000);
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / d, 1);
      const current = to * progress;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, decimals]);

  return (
    <span>
      {value.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
    </span>
  );
}

export default function HowItWorks() {
  const [openImpact, setOpenImpact] = useState(false);

  const stats = [
    { id: 1, label: "طن CO2 تم توفيرها", value: 120, icon: "🌿" },
    { id: 2, label: "رحلات فارغة تم تجنبها", value: 85, icon: "🚌" },
    { id: 3, label: "شحنات نشطة", value: 42, icon: "📦" },
  ];

  return (
    <section className="py-14">
      <div className="max-w-screen-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 shadow-lg"
        >
          <div
            className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8"
            dir="rtl"
          >
            {/* Cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-4 p-5 bg-emerald-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center text-2xl">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-3xl font-extrabold text-emerald-700">
                      <SmallCountUp end={stat.value} duration={1.6} />
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full lg:w-72 flex items-center justify-center lg:justify-end"
            >
              <button
                onClick={() => setOpenImpact(true)}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg hover:from-emerald-700 hover:to-teal-600 transition"
              >
                <span>عرض الأثر الكامل</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  ➜
                </motion.span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Impact Modal */}
      <AnimatePresence>
        {openImpact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenImpact(false)}
            ></div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative max-w-2xl w-full mx-4 bg-white rounded-2xl shadow-2xl p-8"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-extrabold">الأثر البيئي</h3>
                <button
                  onClick={() => setOpenImpact(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="p-5 bg-emerald-50 rounded-lg text-center shadow-sm"
                  >
                    <div className="text-3xl font-extrabold text-emerald-700">
                      <SmallCountUp end={stat.value} duration={1.8} />
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-right">
                <button
                  onClick={() => setOpenImpact(false)}
                  className="px-5 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                  حسناً
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
