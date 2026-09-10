"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const fieldBase =
  "w-full rounded-xl bg-elevated px-4 py-3 text-[15px] text-ink placeholder:text-faint border border-ink/12 transition-colors focus:border-gold/70 focus:outline-none";

export function Field({
  label,
  error,
  required,
  children,
  id,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
        {required && <span className="ml-1 text-terracotta">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-rose">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${fieldBase} ${error ? "border-rose/60" : ""}`}
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
    <select
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${fieldBase} appearance-none ${error ? "border-rose/60" : ""}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-muted">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-[#C9A86A]"
      />
      <span>{children}</span>
    </label>
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
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-pill border px-4 py-2 text-sm transition-colors ${
              active
                ? "border-gold bg-gold/15 text-ink"
                : "border-ink/15 text-muted hover:border-gold/60 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
