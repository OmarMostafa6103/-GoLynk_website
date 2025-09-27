import React, { useState, useEffect } from "react";
const animations = [
  "/Dropshipping model-rafiki.svg",
  "/In no time-amico.svg",
  "/In no time-cuate.svg",
  "/In no time-pana.svg",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [fade, setFade] = useState(true);
  const [showPrev, setShowPrev] = useState(false);

  useEffect(() => {
    let fadeOutTimeout;
    let changeTimeout;
    let removePrevTimeout;

    // دالة لاختيار صورة عشوائية غير الحالية
    const getRandomIndex = (exclude) => {
      let idx;
      do {
        idx = Math.floor(Math.random() * animations.length);
      } while (idx === exclude);
      return idx;
    };

    // بعد 4 ثواني، ابدأ حركة الخروج التدريجي
    changeTimeout = setTimeout(() => {
      setShowPrev(true);
      setFade(false); // ابدأ fade out
      // بعد انتهاء حركة الخروج، غير الصورة وابدأ حركة الدخول التدريجي
      fadeOutTimeout = setTimeout(() => {
        setPrev(current);
        const nextIdx = getRandomIndex(current);
        setCurrent(nextIdx);
        setFade(true); // ابدأ fade in
        // بعد انتهاء حركة الدخول، أخفِ الصورة القديمة
        removePrevTimeout = setTimeout(() => setShowPrev(false), 600);
      }, 600);
    }, 4000);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(changeTimeout);
      clearTimeout(removePrevTimeout);
    };
  }, [current]);

  const fadeStyle = {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  return (
    <section className="pt-2 pb-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 order-2 md:order-1 text-right">
          <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-2">
            نوصّلها معاك — أسرع، أوفر، وأخضر 🌍
          </h1>
          <div className="mb-2">
            <span className="inline-block px-5 py-2 rounded-full bg-brand-50 text-brand-600 font-bold text-base md:text-lg ring-1 ring-brand-100">
              توصيل ذكي متعدد المحطات
            </span>
          </div>
          <p className="text-gray-700 text-base md:text-lg xl:text-xl">
            GoLynk يربط بين المرسلين والمسافرين عبر المواصلات العامة. توصيل ذكي
            متعدد المحطات يقلل التكلفة والانبعاثات الكربونية.
          </p>
          <div className="flex flex-wrap gap-3 justify-start md:justify-end">
            <a
              href="/map"
              className="px-5 py-2 md:px-7 md:py-3 rounded-full bg-brand-500 text-white font-bold shadow-brand hover:bg-brand-600 transition"
            >
              أرسل شحنة الآن
            </a>
            <a
              href="/orders"
              className="px-5 py-2 md:px-7 md:py-3 rounded-full border-2 border-brand-500 text-brand-600 font-bold hover:bg-brand-50 transition"
            >
              انضم كموزع
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 flex items-center justify-center">
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-[520px] xl:max-w-[620px] aspect-square">
            {showPrev && (
              <img
                src={animations[prev]}
                alt="animation"
                style={{ ...fadeStyle, opacity: fade ? 0 : 1, zIndex: 1 }}
                key={animations[prev]}
              />
            )}
            <img
              src={animations[current]}
              alt="animation"
              style={{ ...fadeStyle, opacity: fade ? 1 : 0, zIndex: 2 }}
              key={animations[current]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
