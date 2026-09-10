"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { courses } from "@/data/courses";
import type { CourseId } from "@/data/types";
import { trackEvent } from "@/lib/analytics";
import { AccordionItem } from "./Accordion";
import { Button } from "./Button";
import { useCheckout } from "./CheckoutProvider";
import { Lead, Reveal, Section, SectionTitle } from "./ui";

function plural(n: number, one: string, few: string, many: string) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} ${one}`;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return `${n} ${few}`;
  return `${n} ${many}`;
}

const lessonsLabel = (n: number) => plural(n, "урок", "уроки", "уроків");
const modulesLabel = (n: number) => plural(n, "модуль", "модулі", "модулів");

export function Program() {
  const [activeId, setActiveId] = useState<CourseId>(courses[0].id);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const { openCheckout } = useCheckout();

  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<CourseId, HTMLButtonElement | null>>>({});

  const active = courses.find((c) => c.id === activeId)!;
  const totalLessons = active.modules.reduce((sum, m) => sum + m.lessons, 0);

  /**
   * Підтягує обраний чип до лівого краю стрічки, щоб було видно наступний.
   * Інакше після кліку по другому чипу третій лишається за екраном і курс
   * виглядає так, ніби його немає.
   *
   * Скролимо саме стрічку (`scrollLeft`), а не `scrollIntoView` по кнопці:
   * той посунув би ще й сторінку по вертикалі й викинув би читача із секції.
   */
  function scrollTabIntoStrip(id: CourseId) {
    const strip = tablistRef.current;
    const tab = tabRefs.current[id];
    if (!strip || !tab) return;
    // На десктопі це сітка без прокрутки — нічого не робимо.
    if (strip.scrollWidth <= strip.clientWidth) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: tab.offsetLeft - strip.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  function selectCourse(id: CourseId) {
    setActiveId(id);
    setOpenModule(0);
    scrollTabIntoStrip(id);
  }

  return (
    <Section id="program">
      <Reveal className="max-w-2xl">
        <SectionTitle>Що саме ви вивчите</SectionTitle>
        <div className="mt-4">
          <Lead>
            Три курси — три різні програми. Оберіть той, що вас цікавить, і
            подивіться список модулів: кожен розгортається, усередині — що саме
            ви робитимете на практиці.
          </Lead>
        </div>
      </Reveal>

      {/* Вибір курсу.
          Мобільний — горизонтальна стрічка чипів зі snap: три картки в стовпчик
          займали майже 400px, тобто пів-екрана до першого модуля.
          З 541px — сітка карток, де є ще й ціна (місця вистачає). */}
      <Reveal className="mt-8">
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Оберіть курс"
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {courses.map((course) => {
            const isActive = course.id === activeId;
            const lessons = course.modules.reduce((s, m) => s + m.lessons, 0);
            return (
              <button
                key={course.id}
                ref={(el) => {
                  tabRefs.current[course.id] = el;
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`program-panel-${course.id}`}
                id={`program-tab-${course.id}`}
                onClick={() => selectCourse(course.id)}
                className={`relative w-[210px] shrink-0 snap-start overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 sm:w-auto sm:p-5 ${
                  isActive
                    ? "bg-surface shadow-[0_16px_36px_-16px_rgba(20,23,43,0.28)]"
                    : "bg-surface/50 shadow-none hover:bg-surface/80"
                }`}
              >
                <span
                  className={`block text-sm font-semibold leading-snug sm:text-[15px] ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                >
                  {course.name}
                </span>

                <span className="mt-2 block text-xs text-faint">
                  {modulesLabel(course.modules.length)} · {lessonsLabel(lessons)}
                </span>

                {/* Ціна тільки з sm: на мобільному вона дублюється в плашці
                    із кнопкою одразу під модулями. */}
                <span
                  className={`mt-3 hidden font-display text-lg font-bold sm:block ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                >
                  {course.price.toLocaleString("uk-UA")}{" "}
                  <span className="text-xs font-normal text-faint">
                    {course.currency}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          id={`program-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`program-tab-${activeId}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          {/* Підсумок обраної програми — обсяг одним рядком */}
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ink/10 pb-4">
            <h3 className="font-display text-xl font-bold">{active.name}</h3>
            {/* `meta` уже містить кількість уроків, тому беремо з нього лише
                тривалість — інакше виходило «24 уроки … 24 уроки». */}
            <p className="text-sm text-muted">
              {active.meta.split("·")[0].trim()} ·{" "}
              {modulesLabel(active.modules.length)} · {lessonsLabel(totalLessons)}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {active.modules.map((module, i) => (
              <AccordionItem
                key={module.title}
                id={`module-${activeId}-${i}`}
                title={module.title}
                index={i + 1}
                meta={lessonsLabel(module.lessons)}
                open={openModule === i}
                onToggle={() => setOpenModule(openModule === i ? null : i)}
              >
                {module.detail}
              </AccordionItem>
            ))}
          </div>

          {/* Дія одразу після програми: клієнт щойно побачив зміст — тут і
              вирішує, а не шукає картку курсу вище по сторінці. */}
          <div className="mt-7 flex flex-col items-center gap-4 rounded-2xl bg-surface p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-left">
            <div>
              <p className="text-[15px] font-semibold text-ink">
                Підходить «{active.name}»?
              </p>
              <p className="mt-1 text-sm text-muted">
                {active.price.toLocaleString("uk-UA")} {active.currency}
              </p>
            </div>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                trackEvent("course_card_click", { course: active.id });
                openCheckout(active.id, "program");
              }}
            >
              Записатись на курс
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
