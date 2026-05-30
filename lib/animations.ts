export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const defaultViewport = {
  once: true,
  margin: "-80px" as const,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};
