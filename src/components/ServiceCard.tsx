"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Картка секції «Кому підійде навчання».
 *
 * Перенесено з компонента ServiceCard (21st.dev, @lavikatiyar) зі збереженням
 * структури й анімації оригіналу. Відмінності — свідомі, під наш проєкт:
 *  • cva / cn / lucide-react не тягнемо — у проєкті свій патерн
 *    (Record<Variant, string> + шаблонні рядки, як у Button.tsx);
 *  • framer-motion → motion/react (той самий рушій, motion залежить від нього);
 *  • <img> → next/image;
 *  • CTA-посилання прибрано, натомість лишається опис картки.
 *
 * Анімація оригіналу збережена 1:1:
 *  картка scale 1.02 / 0.3s · зображення scale 1.1, rotate 3, x 10 / 0.4s easeInOut
 */

const cardBase =
  "relative flex w-full flex-col justify-between overflow-hidden rounded-xl p-6 shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-lg";

const cardAnimation = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

const imageAnimation = {
  hover: {
    scale: 1.1,
    rotate: 3,
    x: 10,
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
};

export function ServiceCard({
  title,
  children,
  imgSrc,
  imgAlt,
  className = "",
}: {
  title: string;
  /** Опис картки. */
  children: ReactNode;
  imgSrc: string;
  imgAlt: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`${cardBase} hairline bg-surface text-ink ${className}`}
      variants={cardAnimation}
      whileHover={reduceMotion ? undefined : "hover"}
    >
      <div className="relative z-10 flex h-full flex-col">
        <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-[70%] text-sm leading-relaxed text-muted">
          {children}
        </p>
      </div>

      {/* Декоративна карта Таро в куті.
          Базовий нахил лежить на зовнішньому шарі, а hover-анімація — на
          внутрішньому: інакше `rotate` з variants скинув би нахил у нуль.
          Нахил тут не лише про вигляд — повернута карта виходить за край
          кутом, тож зріз від overflow-hidden не читається прямою лінією. */}
      <div
        aria-hidden={imgAlt === "" ? true : undefined}
        className="pointer-events-none absolute -bottom-8 -right-5 h-[150px] w-[90px] rotate-[-8deg] sm:-bottom-10 sm:-right-7 sm:h-[200px] sm:w-[120px]"
      >
        <motion.div
          className="size-full opacity-90 group-hover:opacity-100"
          variants={reduceMotion ? undefined : imageAnimation}
        >
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="120px"
            className="object-contain object-bottom drop-shadow-[0_6px_16px_rgba(20,23,43,0.18)]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
