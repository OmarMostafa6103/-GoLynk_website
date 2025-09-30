import React from "react";

/**
 * Container
 * Simple wrapper to provide a consistent responsive max-width and padding.
 * Props:
 *  - children
 *  - className (optional additional classes)
 *  - maxW (Tailwind max-width token, e.g., '7xl' or '5xl')
 */
export default function Container({ children, className = "", maxW = "7xl" }) {
  const mwClass = `max-w-${maxW}`;
  return (
    <div
      className={`${mwClass} mx-auto px-3 sm:px-5 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
