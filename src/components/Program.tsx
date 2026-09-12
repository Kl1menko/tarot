"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

const courseLabels: Record<CourseId, string> = { tarot: "Таро", wax: "Воскові відливки", tin: "Оловʼяні відливки" };

export function Program() {
  const reduceMotion = useReducedMotion();
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
    <Section id="program" className="curriculum-section">
      {/* Заголовок задає ієрархію перед вибором напряму. */}
      <div className="curriculum-heading">
        <Reveal className="max-w-2xl">
          <SectionTitle className="text-center sm:text-left">Що саме <span className="editorial-accent">ви вивчите</span></SectionTitle>
          <div className="mt-4">
            <Lead>
              Оберіть свій напрям і зазирніть у навчання. У кожному модулі —
              конкретні теми та практика, крок за кроком.
            </Lead>
          </div>
        </Reveal>

      </div>

      {/* Усі три напрями видимі також на мобільному; стрілки перемикають вкладки. */}
      <Reveal className="mt-8">
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Оберіть курс"
          className="curriculum-tabs"
        >
          {courses.map((course) => {
            const isActive = course.id === activeId;
            return (
              <button
                key={course.id}
                ref={(el) => {
                  tabRefs.current[course.id] = el;
                }}
                role="tab"
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-label={course.name}
                aria-selected={isActive}
                aria-controls={`program-panel-${course.id}`}
                id={`program-tab-${course.id}`}
                onClick={() => selectCourse(course.id)}
                onKeyDown={(event) => {
                  const current = courses.findIndex((item) => item.id === course.id);
                  let next = current;
                  if (event.key === "ArrowRight") next = (current + 1) % courses.length;
                  else if (event.key === "ArrowLeft") next = (current - 1 + courses.length) % courses.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = courses.length - 1;
                  else return;
                  event.preventDefault();
                  selectCourse(courses[next].id);
                  tabRefs.current[courses[next].id]?.focus({ preventScroll: true });
                }}
                className="curriculum-tab"
              >
                <span>{courseLabels[course.id]}</span>
                <span aria-hidden="true" className="curriculum-tab-mark">{isActive ? "↗" : "+"}</span>
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
          tabIndex={0}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="curriculum-panel"
        >
          {/* Обкладинка і факти про курс поруч зі змістом модулів. */}
          <div className="curriculum-layout">
          <div className="curriculum-overview">
            <div className="curriculum-overview-copy">
            <h3>{active.name}</h3>
            {/* `meta` уже містить кількість уроків, тому беремо з нього лише
                тривалість — інакше виходило «24 уроки … 24 уроки». */}
            <p className="curriculum-description">{active.desc}</p>
            <dl className="curriculum-facts">
              <div><dt>Тривалість</dt><dd>{active.meta.split("·")[0].trim()}</dd></div>
              <div><dt>Програма</dt><dd>{modulesLabel(active.modules.length)}</dd></div>
              <div><dt>Навчання</dt><dd>{lessonsLabel(totalLessons)}</dd></div>
            </dl>
            </div>
          </div>

          <div className="curriculum-modules">
            <p className="curriculum-modules-label">Ваш шлях навчання <span>01 — {String(active.modules.length).padStart(2, "0")}</span></p>
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
          </div>

          {/* Дія одразу після програми: клієнт щойно побачив зміст — тут і
              вирішує, а не шукає картку курсу вище по сторінці. */}
          <div className="curriculum-enroll">
            <div>
              <p className="text-[15px] font-semibold text-ink">
                Ваш наступний крок
              </p>
              <p className="curriculum-price">
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
