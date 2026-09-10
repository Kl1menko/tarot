"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

export function AccordionItem({
  id,
  title,
  meta,
  index,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  meta?: string;
  /** Порядковий номер у списку. Задається лише там, де є послідовність
      (модулі програми); у FAQ його немає — тоді значок не рендериться. */
  index?: number;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="hairline overflow-hidden rounded-card bg-elevated/60">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-ink/[0.03] sm:px-6 sm:py-5"
        >
          {index !== undefined && (
            <span
              aria-hidden="true"
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold transition-colors ${
                // Закритий значок білий із контуром: заливка будь-якого світлого
                // тону зливається з рядком (1.04–1.12), тож форму тримає бордер.
                open
                  ? "bg-onyx text-bg"
                  : "border border-ink/15 bg-surface text-ink"
              }`}
            >
              {index}
            </span>
          )}
          <span className="flex-1 text-[15px] font-semibold text-ink sm:text-base">
            {title}
          </span>
          {meta && <span className="hidden text-xs text-faint sm:block">{meta}</span>}
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22 }}
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">
              {meta && <p className="mb-2 text-xs text-faint sm:hidden">{meta}</p>}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
