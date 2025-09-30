import React, { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const sheetVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.22 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
};

const MapActionSheet = ({ open, onClose, title, children }) => {
  const [mounted, setMounted] = useState(open);
  const ref = useRef(null);
  const headerHeight = 64;

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const handleExitComplete = () => setMounted(false);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // basic focus trap
  useEffect(() => {
    if (!open || !ref.current) return;
    const focusable = ref.current.querySelectorAll(
      "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])"
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handler = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last && last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first && first.focus();
      }
    };
    window.addEventListener("keydown", handler);
    first && first.focus();
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // navbar measurement
  const navbar =
    typeof document !== "undefined"
      ? document.getElementById("app-navbar")
      : null;
  const navbarHeight = navbar ? navbar.clientHeight : 0;
  const sheetTop = navbarHeight
    ? `${navbarHeight + 8}px`
    : `${headerHeight + 8}px`;

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {open && (
        <Motion.div
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <Motion.div
            role="dialog"
            aria-modal="true"
            ref={ref}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ top: sheetTop }}
            className="absolute left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
          >
            <div
              className="bg-white rounded-2xl shadow-xl"
              style={{ height: "80vh", overflow: "hidden" }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-lg">{title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-2 bg-gray-200 rounded-full mr-2" />
                  <button
                    aria-label="Close"
                    onClick={onClose}
                    className="text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div
                style={{ height: `calc(80vh - ${headerHeight}px)` }}
                className="overflow-auto p-4"
              >
                {children}
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapActionSheet;
