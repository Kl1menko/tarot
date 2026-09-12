"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/content";
import { revealUp, staggerContainer } from "@/lib/motion";
import { ButtonLink } from "./Button";
import { HeroCardsFront } from "./HeroCards";
import { Container, Eyebrow } from "./ui";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} id="top" className="relative">
      {/* Сцена 16:9 — пропорція фонового зображення */}
      <div className="relative aspect-[941/1672] max-h-[86vh] w-full overflow-hidden bg-[#0d1428] sm:aspect-[1672/941] sm:max-h-none sm:min-h-[420px]">
        {/* Шар 1 — фон із аркою. Два кадри: вертикальний під мобільний,
            горизонтальний з 541px. next/image не робить art direction, тому <picture>. */}
        <picture>
          <source media="(min-width: 541px)" srcSet="/images/bg-hero.webp" />
          <img
            src="/images/m-bg.webp"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-center"
          />
        </picture>

        {/* Шар 2 — портрет, вписаний у білу арку (вона займає ~36% ширини) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 z-10 h-[84%] w-[94%] -translate-x-[calc(50%+2px)] sm:bottom-[-12%] sm:h-[106%] sm:w-[50%] lg:w-[46%]"
        >
          <Image
            src="/images/hero-person.webp"
            alt="Вікторія Яні, засновниця школи"
            fill
            priority
            sizes="(max-width: 541px) 94vw, (max-width: 981px) 50vw, 46vw"
            className="object-contain object-bottom"
          />
        </motion.div>

        {/* Шар 3 — золоті карти поверх портрета */}
        <div className="absolute inset-0 z-20">
          <HeroCardsFront sceneRef={heroRef} />
        </div>

        {/* Шар 4 — імʼя та слоган */}
        {/* pt-[13%] на мобільному, а не 7%: світла зона фону має форму
            пісочного годинника — угорі вона найвужча, і на 390px ім'я
            заходило кутами на темно-сині борти. Нижче арка ширшає. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-[13%] sm:pt-[0.2%]">
          <motion.p
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            // max-w-[54%] і менший кегль на мобільному: ім'я має вміститись
            // у вузьку частину світлої арки, не торкаючись темних бортів.
            className="mx-auto max-w-[54%] text-center font-serif text-[clamp(30px,7vw,60px)] font-medium uppercase leading-[1.08] tracking-[0.04em] text-ink sm:max-w-[52%] sm:text-[clamp(42px,3vw+30px,60px)] sm:leading-normal sm:tracking-[0.14em] lg:max-w-[46%]"
          >
            {site.brand}
          </motion.p>
        </div>

      </div>

      {/* Текстовий блок під сценою */}
      {/* Блок заходить на сцену, щоб накрити обрізаний низ портрета */}
      {/* Блок наїжджає на сцену зі скругленими верхніми кутами */}
      <Container className="relative z-30 -mt-[9%] overflow-hidden rounded-t-[12px] bg-bg pt-10 pb-12 sm:-mt-[3%] sm:pt-16 sm:pb-16">
        {/* Градієнт за заголовком: дві плями на псевдоелементах шару. */}
        <div className="animated-gradient" aria-hidden="true" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.div variants={revealUp}>
            <Eyebrow>Онлайн-школа Вікторії</Eyebrow>
          </motion.div>

          <motion.h1
            variants={revealUp}
            className="font-display font-semibold leading-[1.12] text-[clamp(28px,4.4vw,46px)]"
          >
            Навчіться читати карти й відливки{" "}
            <em className="not-italic text-gold">за 12 тижнів</em>
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            Системна методика без езотеричного туману: структуровані уроки, практика
            з першого тижня і розбори наживо. За {site.yearsOfPractice} років практики
            через мої курси пройшли понад {site.studentsCount} учениць — більшість
            почали з повного нуля.
          </motion.p>

          {/* На мобільному — дві однакові кнопки на всю ширину в стовпчик:
              підписи різної довжини, тому в ряд вони переносились і виходили
              різного розміру. З 541px повертається звичний ряд по центру. */}
          <motion.div
            variants={revealUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <ButtonLink href="#courses" className="w-full sm:w-auto">
              Обрати курс
            </ButtonLink>
            <ButtonLink
              href="#how-it-works"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Як проходить навчання
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={revealUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-faint"
          >
            <li>{site.yearsOfPractice} років практики</li>
            <li aria-hidden="true">·</li>
            <li>{site.studentsCount}+ учениць</li>
            <li aria-hidden="true">·</li>
            <li>онлайн з будь-якої країни</li>
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
