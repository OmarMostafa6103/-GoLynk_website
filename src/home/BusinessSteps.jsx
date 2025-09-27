import React from "react";
import { motion as Motion } from "framer-motion";
import { container, item } from "./animVariants";
// Heroicons (solid)
import {
  UserPlusIcon,
  CheckCircleIcon,
  CubeIcon,
  TruckIcon as HeroTruck,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";

const steps = [
  {
    number: 1,
    title: "إنشاء حساب مجاني",
    desc: "ابدأ رحلتك مع GoLynk بإنشاء حساب مجاني بسهولة.",
    icon: <UserPlusIcon className="w-7 h-7 text-white" aria-hidden />,
  },
  {
    number: 2,
    title: "تفعيل الحساب",
    desc: "يتم مراجعة وتفعيل حسابك من قبل فريقنا خلال وقت قصير.",
    icon: <CheckCircleIcon className="w-7 h-7 text-white" aria-hidden />,
  },
  {
    number: 3,
    title: "إنشاء أول طلب",
    desc: "قم بإنشاء طلب أو حجز أول شحنة لك مباشرة من اللوحة.",
    icon: <CubeIcon className="w-7 h-7 text-white" aria-hidden />,
  },
  {
    number: 4,
    title: "التتبع والتنفيذ",
    desc: "تابع كل خطوة من شحنتك حتى التسليم النهائي بثقة.",
    icon: <HeroTruck className="w-7 h-7 text-white" aria-hidden />,
  },
  {
    number: 5,
    title: "الشراكة والتوسع",
    desc: "انضم إلينا كشريك نجاح وانطلق في رحلة نمو مربحة.",
    icon: <HandThumbUpIcon className="w-7 h-7 text-white" aria-hidden />,
  },
];

const Step = ({ step, index }) => (
  <Motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    whileHover={{ scale: 1.05 }}
    className={`flex flex-col items-center text-center max-w-xs mx-auto relative ${
      index % 2 === 0 ? "lg:translate-y-0" : "lg:translate-y-20"
    }`}
  >
    <Motion.div
      whileHover={{ rotate: 10 }}
      className="relative flex items-center justify-center mb-4"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.12)]">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          {/* icon placed here, white strokes in SVG */}
          {step.icon}
        </div>
      </div>
      {/* subtle inner ring */}
      <div className="absolute inset-0 m-1 rounded-full border border-white/10 pointer-events-none" />
    </Motion.div>
    <h3 className="text-lg font-bold text-green-900">{step.title}</h3>
    <p className="text-gray-700 mt-2 leading-relaxed">{step.desc}</p>
  </Motion.div>
);

export default function BusinessTimeline() {
  return (
    <section
      className="w-full py-20 bg-gradient-to-b from-beige-50 to-white relative overflow-hidden"
      dir="rtl"
    >
      {/* background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="w-72 h-72 bg-green-100 rounded-full blur-3xl absolute top-10 right-10 opacity-30" />
        <div className="w-96 h-96 bg-amber-100 rounded-full blur-3xl absolute bottom-10 left-20 opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-green-900 mb-16">
          خطوات العمل وشراكة النجاح مع{" "}
          <span className="text-green-700">GoLynk</span>
        </h2>

        <div className="relative">
          <Motion.svg
            viewBox="0 0 1400 400"
            className="absolute top-20 left-0 w-full h-[400px] pointer-events-none opacity-60"
            preserveAspectRatio="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Motion.path
              d="M 100 100 Q 400 0, 700 100 T 1300 100 Q 1000 200, 700 300 T 100 300"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeDasharray="6 10"
            />
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#166534" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
            </defs>
          </Motion.svg>

          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:justify-between relative z-10 gap-6"
          >
            {steps.map((step, i) => (
              <Motion.div key={step.number} variants={item}>
                <Step step={step} index={i} />
              </Motion.div>
            ))}
          </Motion.div>
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-10 text-center shadow-2xl text-white relative overflow-hidden"
        >
          <h3 className="text-2xl lg:text-3xl font-extrabold mb-4">
            هل أنتم مستعدون للشراكة؟
          </h3>
          <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            سواء كنت متجرًا أو فردًا، نوفر لك فرصًا للنمو المربح مع GoLynk.
          </p>
          <Motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-50 transition text-lg"
          >
            ابدأ شراكتك الآن
          </Motion.button>
        </Motion.div>
      </div>
    </section>
  );
}
