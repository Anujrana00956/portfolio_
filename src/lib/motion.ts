/** Soft Apple-like curves */
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeSmooth = [0.16, 1, 0.3, 1] as const;
export const easeSoft = [0.33, 1, 0.68, 1] as const;
/** Extra-smooth decelerate (Apple product pages) */
export const easeApple = [0.25, 0.1, 0.25, 1] as const;
export const easeAppleOut = [0.16, 1, 0.3, 1] as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 90,
  damping: 24,
  mass: 0.9,
};
export const springSnappy = {
  type: "spring" as const,
  stiffness: 200,
  damping: 28,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeAppleOut },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const softScale = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeAppleOut },
  },
};
