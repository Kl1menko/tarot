"use client";

import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Темна пігулка з перламутровим переливом — клас у globals.css.
  // Текст світлий: на оніксі контраст 16.4:1.
  // Прозорий бордер — щоб висота збігалася з secondary, у якого бордер є:
  // без нього поруч (і в стовпчику на мобільному) кнопки різнились на 2px.
  primary: "btn-pearl border border-transparent text-bg",
  secondary:
    "border border-gold/50 text-ink hover:border-gold hover:bg-gold/10",
  ghost: "text-muted hover:text-ink",
};

const hover = { scale: 1.03 };
const tap = { scale: 0.97 };

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof motion.button> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <motion.button
      whileHover={hover}
      whileTap={tap}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof motion.a> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <motion.a
      whileHover={hover}
      whileTap={tap}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}
