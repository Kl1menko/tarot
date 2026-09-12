"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { courses } from "@/data/courses";
import { formatStreamDate, site } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import {
  normalizePhoneInput,
  validateConsent,
  validateEmail,
  validateName,
  validatePhone,
} from "@/lib/validation";
import { Button } from "./Button";
import { Checkbox, Field, SegmentedControl, Select, TextInput } from "./FormFields";
import { StarMark } from "./StarMark";
import { Reveal, Section, SectionTitle } from "./ui";

type RequestType = "course" | "consultation";
type Messenger = "telegram" | "whatsapp" | "viber";

interface Values {
  name: string;
  phone: string;
  email: string;
  requestType: RequestType;
  course: string;
  messenger: Messenger;
  consent: boolean;
}

const initial: Values = {
  name: "",
  phone: "+380",
  email: "",
  requestType: "course",
  course: "",
  messenger: "telegram",
  consent: false,
};

const requestTypes = [
  { value: "course" as const, label: "Підбір курсу" },
  { value: "consultation" as const, label: "Онлайн-консультація" },
];

const messengers = [
  { value: "telegram" as const, label: "Telegram" },
  { value: "whatsapp" as const, label: "WhatsApp" },
  { value: "viber" as const, label: "Viber" },
];

export function LeadForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = {
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
      consent: validateConsent(values.consent),
    };
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // Курс релевантний лише для запиту на підбір курсу.
          course: values.requestType === "course" ? values.course : undefined,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      trackEvent("lead_submit", {
        request_type: values.requestType,
        course: values.course || undefined,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="form" className="application-section">
      <div className="application-layout">
        <Reveal className="application-intro">
          <SectionTitle className="text-center sm:text-left">Залишити<br /><span className="editorial-accent">заявку</span></SectionTitle>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Напишіть кілька слів про себе — я зʼвʼяжусь особисто і допоможу
            обрати курс під ваш рівень. Це безкоштовно й ні до чого не
            зобовʼязує.
          </p>

          {/* Дата потоку й місця — окремим блоком, а не в дужках посеред
              абзацу: це те, що змушує залишити заявку сьогодні. */}
          <div className="application-dates mt-6 flex items-stretch gap-4 rounded-2xl bg-surface p-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.14em] text-faint">Старт потоку</p>
              <p className="mt-1 font-display text-lg font-bold text-ink">
                {formatStreamDate()}
              </p>
            </div>
            <span aria-hidden="true" className="w-px shrink-0 bg-ink/10" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.14em] text-faint">Вільних місць</p>
              <p className="mt-1 font-display text-lg font-bold text-gold">
                {site.seatsLeft}
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-3.5 text-sm text-muted">
            {[
              "Відповідаю протягом доби в будні",
              "Ніякого спаму й автодзвінків",
              "Можна просто поставити питання",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold"
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="m2.5 6.2 2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {line}
              </li>
            ))}
          </ul>
          <div className="application-signature" aria-hidden="true">
            <span><StarMark /></span><p>Кожен шлях починається<br />з першого кроку.</p>
          </div>
        </Reveal>

        <Reveal className="application-card">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="flex min-h-[440px] flex-col items-center justify-center px-2 text-center"
              >
                <span
                  aria-hidden="true"
                  className="mb-6 flex size-16 items-center justify-center rounded-full bg-gold/12 text-gold ring-1 ring-gold/30"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="font-display text-2xl font-semibold">Дякую за заявку!</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Я отримала ваше повідомлення і напишу вам у{" "}
                  {messengers.find((m) => m.value === values.messenger)?.label} протягом
                  доби. Якщо питання термінове — пишіть напряму в Telegram.
                </p>
                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => {
                    setValues(initial);
                    setStatus("idle");
                  }}
                >
                  Надіслати ще одну заявку
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="application-form flex flex-col gap-5"
              >
                <div className="application-form-heading">
                  <h3>Познайомимось?</h3>
                  <p>Залиште контакти для особистої відповіді.<br />Поля із * обовʼязкові.</p>
                </div>
                <Field id="lead-name" label="Імʼя" required error={errors.name}>
                  <TextInput
                    id="lead-name"
                    value={values.name}
                    error={errors.name}
                    autoComplete="name"
                    placeholder="Як до вас звертатись?"
                    onChange={(e) => set("name", e.target.value)}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="lead-phone" label="Телефон" required error={errors.phone}>
                    <TextInput
                      id="lead-phone"
                      type="tel"
                      inputMode="tel"
                      value={values.phone}
                      error={errors.phone}
                      autoComplete="tel"
                      placeholder="+380XXXXXXXXX"
                      onChange={(e) => set("phone", normalizePhoneInput(e.target.value))}
                    />
                  </Field>

                  <Field id="lead-email" label="Email" required error={errors.email}>
                    <TextInput
                      id="lead-email"
                      type="email"
                      inputMode="email"
                      value={values.email}
                      error={errors.email}
                      autoComplete="email"
                      placeholder="you@example.com"
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted">Тип запиту</span>
                  <SegmentedControl
                    label="Тип запиту"
                    options={requestTypes}
                    value={values.requestType}
                    onChange={(v) => set("requestType", v)}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {values.requestType === "course" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <Field id="lead-course" label="Курс, який цікавить">
                        <Select
                          id="lead-course"
                          value={values.course}
                          onChange={(e) => set("course", e.target.value)}
                        >
                          <option value="">Оберіть зі списку</option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                          <option value="undecided">Ще не вирішила</option>
                        </Select>
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted">
                    Месенджер для звʼязку
                  </span>
                  <SegmentedControl
                    label="Месенджер для звʼязку"
                    options={messengers}
                    value={values.messenger}
                    onChange={(v) => set("messenger", v)}
                  />
                </div>

                <Checkbox
                  id="lead-consent"
                  checked={values.consent}
                  error={errors.consent}
                  onChange={(v) => set("consent", v)}
                >
                  Погоджуюсь на обробку персональних даних
                </Checkbox>

                {status === "error" && (
                  <p role="alert" className="text-sm text-rose">
                    Не вдалося надіслати заявку. Перевірте зʼєднання і спробуйте ще раз.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={!values.consent || status === "sending"}
                  className="application-submit mt-1 w-full"
                >
                  {status === "sending" ? "Надсилаю…" : "Надіслати заявку"}
                  {status !== "sending" && <span aria-hidden="true">↗</span>}
                </Button>

                <p className="text-center text-xs leading-relaxed text-faint">
                  Заявка нічого не коштує і ні до чого не зобовʼязує —
                  спершу поговоримо.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  );
}
