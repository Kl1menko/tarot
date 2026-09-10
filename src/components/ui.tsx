"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { revealUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Container({
  children,
  className = "",
  width = "max-w-[1160px]",
}: {
  children: ReactNode;
  className?: string;
  /** Максимальна ширина. Перевизначається там, де секції треба більше місця. */
  width?: string;
}) {
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  width,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Прокидається в Container — для секцій, ширших за типові 1160px. */
  width?: string;
}) {
  return (
    <section id={id} className={`py-14 sm:py-18 lg:py-24 ${className}`}>
      <Container width={width}>{children}</Container>
    </section>
  );
}

/** Обгортка reveal-on-scroll. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Контейнер із каскадною появою дочірніх <Reveal>-елементів. */
export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={revealUp}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display font-semibold leading-tight text-[clamp(26px,3.5vw,36px)] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
      {children}
    </p>
  );
}
