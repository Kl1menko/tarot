import { NextResponse } from "next/server";
import { coursesById } from "@/data/courses";
import type { CourseId } from "@/data/types";

/**
 * Заглушка чекауту. Реальна інтеграція має створити платіж у провайдера
 * і повернути його `paymentUrl` — фронтенд уже вміє на нього редіректити.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const course = coursesById[body?.course as CourseId];

    if (!course) {
      return NextResponse.json({ ok: false, error: "Невідомий курс" }, { status: 400 });
    }
    if (!body?.name || !body?.email || !body?.phone) {
      return NextResponse.json(
        { ok: false, error: "Не заповнені обовʼязкові поля" },
        { status: 400 },
      );
    }

    console.info("[checkout]", { course: course.id, amount: course.price, ...body });

    // paymentUrl зʼявиться після підключення провайдера оплати.
    return NextResponse.json({ ok: true, paymentUrl: null });
  } catch {
    return NextResponse.json({ ok: false, error: "Некоректний запит" }, { status: 400 });
  }
}
