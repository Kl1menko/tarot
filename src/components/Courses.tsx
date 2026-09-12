"use client";

import Image from "next/image";
import { courses } from "@/data/courses";
import { formatStreamDate, site } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { Button } from "./Button";
import { useCheckout } from "./CheckoutProvider";
import { Reveal, RevealGroup, RevealItem, Section, SectionTitle } from "./ui";

export function Courses() {
  const { openCheckout } = useCheckout();

  return (
    <Section id="courses" width="max-w-[1360px]">
      {/* Без max-w-2xl на обгортці: воно ламало заголовок на два рядки.
          Обмеження ширини лишається на абзаці, якому воно й потрібне. */}
      <Reveal>
        <SectionTitle className="text-center sm:text-left">Три програми — оберіть свою</SectionTitle>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
          Найближчий потік стартує <strong className="text-ink">{formatStreamDate()}</strong>.
          Групи невеликі — залишилось {site.seatsLeft} місць, щоб кожна учениця отримала
          розбір своїх робіт.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <RevealItem
            key={course.id}
            className="flex h-full flex-col overflow-hidden rounded-[28px] bg-surface"
          >
            {/* Фото вписане в картку: відступ по колу і власне скруглення,
                трохи менше за радіус картки — так кути виглядають концентрично. */}
            <div className="p-3 pb-0">
              {/* Пропорція кадру = точна пропорція знімків (900×1061).
                  Будь-яке округлення (3/4, 4/5) змусило б object-cover
                  зрізати краї — тут не зрізається нічого. */}
              <div className="relative aspect-[900/1061] w-full overflow-hidden rounded-[20px] bg-elevated">
                <Image
                  src={course.image}
                  alt={`Обкладинка курсу «${course.name}»`}
                  fill
                  sizes="(max-width: 541px) 100vw, (max-width: 981px) 50vw, 425px"
                  className="object-cover"
                />
                {course.badge && (
                  <span className="absolute left-4 top-4 rounded-pill bg-bg px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                    {course.badge}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-7 pt-6">
              <h3 className="font-display text-xl font-bold leading-snug">
                {course.name}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-faint">
                {course.meta}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {course.desc}
              </p>

              <p className="mt-6 font-display text-2xl font-bold text-ink">
                {course.price.toLocaleString("uk-UA")}{" "}
                <span className="text-base font-normal text-muted">{course.currency}</span>
              </p>
              <Button
                className="mt-5 w-full"
                onClick={() => {
                  trackEvent("course_card_click", { course: course.id });
                  openCheckout(course.id, "course_card");
                }}
              >
                Записатись
              </Button>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
