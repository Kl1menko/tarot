import Image from "next/image";
import { aboutPoints, site } from "@/data/content";
import { StarVec } from "./StarVec";
import { Reveal, RevealGroup, RevealItem, Section, SectionTitle } from "./ui";

export function About() {
  return (
    <Section id="about" className="mentor-section">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
        {/* Ліва колонка: фото + плашка з цифрою поверх нижнього кута */}
        <Reveal className="relative">
          <div className="mentor-portrait relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-elevated">
            <Image
              src="/images/hero-person.webp"
              alt="Вікторія — викладачка курсу"
              fill
              sizes="(max-width: 981px) 100vw, 460px"
              className="object-contain object-bottom"
            />
          </div>

          {/* Ширина по контенту (w-max), а не на всю колонку: плашка з трьох
              цифр коротша за портрет, і розтягнута вона лишала порожнечу
              обабіч. Центрується відносно фото парою left-1/2 + translate.
              max-w-full — щоб на вузьких екранах блок не вилазив за портрет. */}
          <div className="absolute -bottom-5 left-1/2 w-max max-w-full -translate-x-1/2 rounded-2xl bg-surface p-5 shadow-[0_18px_40px_-18px_rgba(20,23,43,0.28)]">
            <div className="flex items-center gap-5">
              <Stat value={`${site.yearsOfPractice}`} label="років практики" />
              <span aria-hidden="true" className="h-8 w-px bg-ink/10" />
              <Stat value={`${site.studentsCount}+`} label="учениць" />
              <span aria-hidden="true" className="h-8 w-px bg-ink/10" />
              <Stat value="6" label="років навчаю" />
            </div>
          </div>
        </Reveal>

        {/* Права колонка */}
        <div className="mt-8 lg:mt-0">
          <Reveal>
            <SectionTitle className="text-center sm:text-left">Це ремесло,<br /><span className="editorial-accent">а не магія</span></SectionTitle>

            <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
              Я {site.yearsOfPractice} років працюю з картами і відливками — спершу для
              себе, потім із клієнтами, а останні шість років навчаю інших.
            </p>

            {/* Головна думка — виділена, щоб око чіплялось */}
            <blockquote className="mentor-quote mt-6 font-display text-lg font-medium leading-snug text-ink sm:text-xl">
              Тут немає нічого, що не можна пояснити словами і розкласти на кроки.
            </blockquote>

            <p className="mt-6 text-[15px] leading-relaxed text-muted sm:text-base">
              Тому мої курси побудовані як ремісниче навчання. Ви не будете чекати
              «осяяння» — ви отримаєте систему, за якою карта чи форма воску
              читаються однаково зрозуміло і на першому місяці, і на десятому році
              практики.
            </p>
          </Reveal>

          <RevealGroup className="mentor-principles mt-9 grid gap-4 sm:grid-cols-2">
            {aboutPoints.map((point) => (
              <RevealItem
                key={point.title}
                className="rounded-2xl bg-surface p-5 transition-shadow duration-300 hover:shadow-[0_14px_30px_-14px_rgba(20,23,43,0.22)]"
              >
                {/* Один знак на всі чотири пункти: іконки-метафори (список,
                    люди, щит, рука) читалися як різні категорії, хоча пункти
                    рівнозначні. Спільна зірка тримає ритм, не сортуючи їх.

                    На мобільному знак і заголовок стоять у рядок: окремим
                    блоком над текстом іконка розганяла картку по висоті, і
                    чотири пункти займали майже весь екран. З sm повертається
                    стовпчик — там ширини колонки на рядок уже не вистачає. */}
                <div className="flex items-center gap-3 sm:block">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-bg p-2 text-gold sm:mb-3"
                  >
                    <StarVec />
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink">{point.title}</h3>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold leading-none text-ink">{value}</p>
      <p className="mt-1 text-xs leading-tight text-faint">{label}</p>
    </div>
  );
}
