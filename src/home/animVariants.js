export const container = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: {
      delayChildren: 0.15 + delay,
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  }),
};

export const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

export const imageReveal = {
  hidden: { opacity: 0, scale: 0.96, rotate: -2 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 90, damping: 14 },
  },
};
