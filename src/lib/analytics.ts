type EventName =
  | "lead_submit"
  | "checkout_start"
  | "course_card_click"
  | "faq_open";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: EventPayload[];
  }
}

/**
 * Єдина точка відправки подій. Наразі пише в dataLayer (GTM) і в консоль у dev.
 * Підключення до конкретної системи аналітики — тут, решта коду не змінюється.
 */
export function trackEvent(event: EventName, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload);
  }
}
