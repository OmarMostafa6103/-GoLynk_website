import React, { useEffect, useState, useRef } from "react";
import OrderForm from "./OrderForm";
import TripForm from "./TripForm";

const CreatePanel = ({
  action,
  onClose,
  userLocation,
  handleCreateOrder,
  handleCreateTrip,
}) => {
  const [layout, setLayout] = useState({ top: 16, height: "80vh" });

  useEffect(() => {
    const update = () => {
      const nav =
        typeof document !== "undefined" &&
        document.getElementById("app-navbar");
      const navH = nav ? nav.clientHeight : 0;
      const gap = 16; // px from navbar
      const top = navH + gap;
      const available = window.innerHeight - top - gap; // leave bottom gap as well
      const eightyVh = window.innerHeight * 0.8;
      const height = Math.max(200, Math.min(eightyVh, available));
      setLayout({ top, height });
    };
    update();
    window.addEventListener("resize", update);
    // handle Escape to close
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  const containerRef = useRef(null);

  // basic focus trap: keep focus inside the panel when opened
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onKey = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last && last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first && first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // autofocus first element
    setTimeout(() => first && first.focus(), 10);
    return () => document.removeEventListener("keydown", onKey);
  }, [action]);

  if (!action) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={action === "create-sender" ? "إنشاء مرسل" : "إنشاء مسافر"}
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={containerRef}
        className="absolute left-0 right-0 mx-auto px-4"
        style={{
          top: `${layout.top}px`,
          height: `${layout.height}px`,
          maxWidth: "768px",
        }}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold">
              {action === "create-sender" ? "إنشاء مرسل" : "إنشاء مسافر"}
            </div>
            <button
              onClick={onClose}
              className="text-gray-600"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>

          <style>{`
            .create-panel-scroll { scrollbar-width: thin; scrollbar-color: rgba(148,163,184,0.85) rgba(0,0,0,0.03); }
            .create-panel-scroll::-webkit-scrollbar { width: 10px; }
            .create-panel-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.03); border-radius: 9999px; }
            .create-panel-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.85); border-radius: 9999px; }
          `}</style>

          {/* Make this div the flex-grow scrollable region */}
          <div className="p-4 overflow-auto flex-1 min-h-0 create-panel-scroll">
            {action === "create-sender" ? (
              <OrderForm
                onCreate={handleCreateOrder}
                initialLocation={userLocation}
              />
            ) : (
              <TripForm
                onCreate={handleCreateTrip}
                initialLocation={userLocation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePanel;
