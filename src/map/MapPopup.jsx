import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { motion as Motion } from "framer-motion";

const popupVariants = {
  hidden: { scale: 0.2, opacity: 0, y: 40 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    scale: 0.2,
    opacity: 0,
    y: 40,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
};

const MapPopup = ({
  mode,
  items = [],
  onClose,
  centerAndSelect,
  toggleExpand,
  expandedIds = [],
}) => {
  if (!items || items.length === 0) return null;

  return (
    <Motion.div
      className="fixed inset-0 z-[1400] flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={popupVariants}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <Motion.div
        className="relative z-50 w-full h-full lg:w-[80vw] lg:max-w-[880px] lg:h-auto bg-white lg:rounded-2xl shadow flex flex-col"
        variants={popupVariants}
      >
        {/* Always-visible close button (helps when header controls are overlapped on small screens) */}
        <IconButton
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-4 right-4 z-[1500] bg-white shadow-md"
          size="large"
          sx={{ width: 44, height: 44, borderRadius: 2 }}
        >
          <CloseIcon />
        </IconButton>
        <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b">
          <h3 className="text-lg font-extrabold">
            {mode === "sender" ? "المرسلين" : "المسافرين"}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="hidden lg:inline-flex p-2 rounded bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 overflow-auto grow space-y-3 rtl" dir="rtl">
          {items.map((it) => {
            const isSender = Array.isArray(it.orders);
            const primary = isSender ? it.orders?.[0] : it.trips?.[0];
            const title = it.name || it.title || `#${it.id}`;
            const from = primary?.from || "";
            const to = primary?.to || "";
            const type = primary?.type || "";

            return (
              <Motion.div
                key={it.id}
                className="p-3 rounded-lg bg-gray-50 flex items-start justify-between"
                variants={itemVariants}
              >
                <div className="flex-1 text-right">
                  <div className="font-semibold">{title}</div>
                  <div className="text-sm text-gray-500">
                    {from} {from && to ? "→" : ""} {to}
                  </div>
                  {expandedIds.includes(it.id) && (
                    <div className="mt-2 text-sm text-gray-600">
                      {primary?.item ||
                        primary?.title ||
                        it.description ||
                        it.notes ||
                        "لا توجد تفاصيل إضافية"}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <button
                    onClick={() => toggleExpand(it.id)}
                    className="text-sm px-3 py-2 rounded bg-white border"
                  >
                    عرض
                  </button>
                  <button
                    onClick={() =>
                      centerAndSelect(
                        it.lat,
                        it.lng,
                        isSender
                          ? {
                              title,
                              subtitle: primary?.item || "",
                              from,
                              to,
                              type,
                              id: primary?.id || null,
                              kind: "order",
                            }
                          : {
                              title,
                              subtitle: primary?.title || "",
                              from,
                              to,
                              type,
                              id: primary?.id || null,
                              kind: "trip",
                            }
                      )
                    }
                    className="text-sm px-3 py-2 rounded bg-blue-600 text-white"
                  >
                    موقع
                  </button>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </Motion.div>
    </Motion.div>
  );
};

export default MapPopup;
