"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { coursesById } from "@/data/courses";
import type { CourseId } from "@/data/types";
import {
  normalizePhoneInput,
  validateEmail,
  validateName,
  validatePhone,
} from "@/lib/validation";
import { Button } from "./Button";
import { Checkbox, Field, TextInput } from "./FormFields";

interface Values {
  name: string;
  email: string;
  phone: string;
  telegram: string;
  consent: boolean;
}

const empty: Values = {
  name: "",
  email: "",
  phone: "+380",
  telegram: "",
  consent: false,
};

export function CheckoutModal({
  courseId,
  onClose,
}: {
  courseId: CourseId | null;
  onClose: () => void;
}) {
  // key за courseId перемонтовує форму, тож стан скидається при кожному відкритті.
  return <CheckoutForm key={courseId ?? "closed"} courseId={courseId} onClose={onClose} />;
}

function CheckoutForm({
  courseId,
  onClose,
}: {
  courseId: CourseId | null;
  onClose: () => void;
}) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const course = courseId ? coursesById[courseId] : null;

  // Блокуємо скрол тіла, поки модалка відкрита.
  useEffect(() => {
    if (!courseId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [courseId, onClose]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!course) return;

    const nextErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
    };
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, course: course.id }),
      });
      if (!res.ok) throw new Error("request failed");
      const data: { paymentUrl?: string } = await res.json();
      // Провайдер оплати повертає посилання — переходимо на нього.
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        onClose();
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-onyx/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Мобільний — на весь екран; з 541px — картка по центру.
              Шапка закріплена, прокручується лише форма: інакше на телефоні
              клавіатура ховала б кнопку відправки. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="flex h-full w-full flex-col bg-surface sm:h-auto sm:max-h-[92vh] sm:max-w-lg sm:rounded-[28px]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-ink/10 p-6 sm:p-8 sm:pb-6">
              <div>
                <h3 id="checkout-title" className="font-display text-xl font-bold leading-snug">
                  {course.name}
                </h3>
                <p className="mt-1.5 font-display text-lg font-bold text-ink">
                  {course.price.toLocaleString("uk-UA")}{" "}
                  <span className="text-sm font-normal text-muted">{course.currency}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрити"
                className="-mr-2 -mt-2 flex size-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-ink"
              >
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-4 overflow-y-auto p-6 sm:p-8 sm:pt-6"
              noValidate
            >
              <input type="hidden" name="course" value={course.id} />

              <Field id="co-name" label="Імʼя" required error={errors.name}>
                <TextInput
                  id="co-name"
                  value={values.name}
                  error={errors.name}
                  autoComplete="name"
                  placeholder="Вікторія"
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>

              <Field id="co-email" label="Email" required error={errors.email}>
                <TextInput
                  id="co-email"
                  type="email"
                  inputMode="email"
                  value={values.email}
                  error={errors.email}
                  autoComplete="email"
                  placeholder="you@example.com"
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>

              <Field id="co-phone" label="Телефон" required error={errors.phone}>
                <TextInput
                  id="co-phone"
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  error={errors.phone}
                  autoComplete="tel"
                  placeholder="+380XXXXXXXXX"
                  onChange={(e) => set("phone", normalizePhoneInput(e.target.value))}
                />
              </Field>

              <Field id="co-tg" label="Telegram-нікнейм">
                <TextInput
                  id="co-tg"
                  value={values.telegram}
                  placeholder="@nickname"
                  onChange={(e) => set("telegram", e.target.value)}
                />
              </Field>

              <Checkbox
                id="co-consent"
                checked={values.consent}
                onChange={(v) => set("consent", v)}
              >
                Погоджуюсь на обробку персональних даних
              </Checkbox>

              {/* Кнопка — у закріпленому підвалі, а не в потоці полів.
                  На весь екран поля не заповнюють висоту, і кнопка з mt-auto
                  «відпливала» вниз, лишаючи ~400px порожнечі. Тепер це підвал
                  із рискою: та сама позиція, але читається як структура. */}
              <div className="mt-auto -mx-6 border-t border-ink/10 px-6 pt-5 sm:-mx-8 sm:px-8">
                {status === "error" && (
                  <p role="alert" className="mb-3 text-sm text-rose">
                    Не вдалося надіслати. Перевірте зʼєднання і спробуйте ще раз.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={!values.consent || status === "sending"}
                  className="w-full"
                >
                  {status === "sending" ? "Зачекайте…" : "Перейти до оплати"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
