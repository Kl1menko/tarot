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

/** Тримає введення телефону у форматі +380… і не пускає зайві символи. */
export function normalizePhoneInput(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const withCode = digits.startsWith("380")
    ? digits
    : `380${digits.replace(/^0+/, "")}`;
  return `+${withCode.slice(0, 12)}`;
}
