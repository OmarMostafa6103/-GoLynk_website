import React from "react";
import { motion as Motion } from "framer-motion";

export default function SectionReveal({
  children,
  delay = 0,
  direction = "up",
}) {
  const distance = 30;
  const initial = {
    opacity: 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
  };
  return (
    <Motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </Motion.div>
  );
}
