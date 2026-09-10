import type { Variants } from "motion/react";

/** Спільні варіанти reveal-on-scroll (agent.md §2.4). */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export const viewportOnce = { once: true, amount: 0.2 } as const;
