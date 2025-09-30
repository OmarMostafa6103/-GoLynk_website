import React from "react";

export const ModePills = ({ mode, onToggleMode }) => {
  const safeToggle = (m) => (onToggleMode ? onToggleMode(m) : null);
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 flex gap-3 lg:hidden">
      <button
        onClick={() => safeToggle("sender")}
        className={`px-6 py-2 rounded-full font-bold ${
          mode === "sender" ? "bg-black text-white" : "bg-red-500 text-white"
        }`}
        aria-label="عرض المرسلين"
      >
        مرسل
      </button>
      <button
        onClick={() => safeToggle("traveler")}
        className={`px-6 py-2 rounded-full font-bold ${
          mode === "traveler" ? "bg-black text-white" : "bg-sky-500 text-white"
        }`}
        aria-label="عرض المسافرين"
      >
        مسافر
      </button>
    </div>
  );
};

export const CreateButtons = ({ onCreateSender, onCreateTraveler }) => (
  <div className="mt-4">
    <div className="max-w-3xl mx-auto px-4">
      <div className="grid gap-3 sm:gap-4 md:flex md:justify-center">
        <button
          onClick={() => onCreateTraveler && onCreateTraveler()}
          className="w-full md:w-auto h-14 bg-white border border-sky-400 text-sky-600 font-bold rounded-full shadow-lg flex items-center justify-center gap-3 px-4"
          aria-label="أضف رحلة"
        >
          <span className="text-2xl">＋</span>
          <span className="ml-2">أضف رحلة</span>
        </button>

        <button
          onClick={() => onCreateSender && onCreateSender()}
          className="w-full md:w-auto h-14 bg-white border border-red-400 text-red-600 font-bold rounded-full shadow-lg flex items-center justify-center gap-3 px-4"
          aria-label="أضف طلب"
        >
          <span className="text-2xl">＋</span>
          <span className="ml-2">أضف طلب</span>
        </button>

        <style>{`@media (min-width: 768px) { .max-w-3xl > .grid { display:flex; justify-content:center; gap:16px } }`}</style>
      </div>
    </div>
  </div>
);

// Default export kept for backward compatibility; renders both pieces together.
const MapControls = ({
  mode,
  onToggleMode,
  onCreateSender,
  onCreateTraveler,
}) => (
  <>
    <ModePills mode={mode} onToggleMode={onToggleMode} />
    <CreateButtons
      onCreateSender={onCreateSender}
      onCreateTraveler={onCreateTraveler}
    />
  </>
);

export default MapControls;
