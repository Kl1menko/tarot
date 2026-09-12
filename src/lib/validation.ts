export const phonePattern = /^\+380\d{9}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateName(v: string) {
  if (!v.trim()) return "Вкажіть імʼя";
  if (v.trim().length < 2) return "Занадто коротке імʼя";
  return undefined;
}

export function validatePhone(v: string) {
  if (!v.trim()) return "Вкажіть телефон";
  if (!phonePattern.test(v.replace(/[\s()-]/g, "")))
    return "Формат: +380XXXXXXXXX";
  return undefined;
}

export function validateEmail(v: string) {
  if (!v.trim()) return "Вкажіть email";
  if (!emailPattern.test(v.trim())) return "Некоректний email";
  return undefined;
}

/**
 * Згода на обробку даних. Кнопка відправки і так disabled без галочки
 * (agent.md §5.1), але сабміт може статись і в обхід неї — Enter у полі,
 * автозаповнення, знятий disabled у девтулзах. Тому перевіряємо ще й тут:
 * обовʼязковість поля не має триматись лише на стані кнопки.
 */
export function validateConsent(v: boolean) {
  if (!v) return "Потрібна згода на обробку персональних даних";
  return undefined;
}

/** Тримає введення телефону у форматі +380… і не пускає зайві символи. */
export function normalizePhoneInput(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const withCode = digits.startsWith("380")
    ? digits
    : `380${digits.replace(/^0+/, "")}`;
  return `+${withCode.slice(0, 12)}`;
}
