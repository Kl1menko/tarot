import { NextResponse } from "next/server";

/**
 * Заглушка прийому заявок. Тут підключається реальний канал доставки
 * (Telegram-бот, пошта, CRM) — контракт запиту при цьому не змінюється.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.phone) {
      return NextResponse.json(
        { ok: false, error: "Не заповнені обовʼязкові поля" },
        { status: 400 },
      );
    }

    console.info("[lead]", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Некоректний запит" }, { status: 400 });
  }
}
