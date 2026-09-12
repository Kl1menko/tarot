"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

/**
 * Поля форми.
 *
 * Фокус тримає кільце (ring), а не зміна кольору рамки: рамка на 1px між
 * #edeff3 і золотом майже не читається, а кільце видно однозначно — і мишею,
 * і з клавіатури. Помилка фарбує і рамку, і фон — сам лише червоний контур
 * на світлому полі легко пропустити.
 */
const fieldBase =
  "w-full rounded-xl bg-elevated px-4 py-3.5 text-[15px] text-ink placeholder:text-faint " +
  "border border-ink/12 transition-[border-color,box-shadow,background-color] duration-200 " +
  "focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/25 " +
  "hover:border-ink/20";

const fieldError =
  "border-rose/70 bg-rose/[0.04] focus:border-rose/70 focus:ring-rose/20";

export function Field({
  label,
  error,
  required,
  hint,
  children,
  id,
}: {
  label: string;
  error?: string;
  required?: boolean;
  /** Підказка під полем. Ховається, коли зʼявляється помилка. */
  hint?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-terracotta">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-rose">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-faint">{hint}</p>
      )}
    </div>
  );
}

export function TextInput({
  error,
  id,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${fieldBase} ${error ? fieldError : ""} ${className}`}
      {...props}
    />
  );
}

export function Select({
  error,
  id,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    // appearance-none прибирає системну стрілку, тож малюємо свою — без неї
    // поле не відрізнити від звичайного інпута і не видно, що це список.
    <div className="relative">
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldBase} ${error ? fieldError : ""} cursor-pointer appearance-none pr-11`}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  /** Текст помилки. Рендериться під рядком — як у <Field>, щоб згода
      поводилась як звичайне обовʼязкове поле, а не як мовчазний блокатор. */
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors ${
          error
            ? "border-rose/60 bg-rose/[0.04] text-ink"
            : checked
              ? "border-gold/45 bg-gold/[0.06] text-ink"
              : "border-ink/12 bg-elevated/50 text-muted hover:border-ink/20"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-gold"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-rose">
          {error}
        </p>
      )}
    </div>
  );
}

/** Сегментований перемикач (тип запиту, месенджер). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      // Рівні частки замість вільного переносу: різна довжина підписів
      // («Telegram» / «WhatsApp» / «Viber») давала рвану лінію кнопок.
      className="grid grid-cols-2 gap-2 sm:grid-cols-3"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            // Активний стан тримається на трьох ознаках одразу — колір, рамка
            // і насиченість тексту. На одному лише світлому фоні різниця між
            // обраним і необраним читалась погано.
            className={`rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 ${
              active
                ? "border-gold bg-gold/[0.16] font-semibold text-ink shadow-[0_2px_10px_-4px_rgba(117,88,35,0.45)]"
                : "border-ink/10 bg-elevated/40 font-medium text-muted hover:border-gold/40 hover:bg-elevated/70 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
