import Image from "next/image";
import { aboutPoints, site } from "@/data/content";
import { Reveal, RevealGroup, RevealItem, Section, SectionTitle } from "./ui";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
        {/* Ліва колонка: фото + плашка з цифрою поверх нижнього кута */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-elevated">
            <Image
              src="/images/about-process.svg"
              alt="Вікторія за роботою: розклад карт і воскова відливка"
              fill
              sizes="(max-width: 981px) 100vw, 460px"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-surface p-5 shadow-[0_18px_40px_-18px_rgba(20,23,43,0.28)]">
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
            <SectionTitle>Це ремесло, а не магія</SectionTitle>

            <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
              Я {site.yearsOfPractice} років працюю з картами і відливками — спершу для
              себе, потім із клієнтами, а останні шість років навчаю інших.
            </p>

            {/* Головна думка — виділена, щоб око чіплялось */}
            <blockquote className="mt-6 font-display text-lg font-medium leading-snug text-ink sm:text-xl">
              Тут немає нічого, що не можна пояснити словами і розкласти на кроки.
            </blockquote>

            <p className="mt-6 text-[15px] leading-relaxed text-muted sm:text-base">
              Тому мої курси побудовані як ремісниче навчання. Ви не будете чекати
              «осяяння» — ви отримаєте систему, за якою карта чи форма воску
              читаються однаково зрозуміло і на першому місяці, і на десятому році
              практики.
            </p>
          </Reveal>

          <RevealGroup className="mt-9 grid gap-4 sm:grid-cols-2">
            {aboutPoints.map((point, i) => (
              <RevealItem
                key={point.title}
                className="rounded-2xl bg-surface p-5 transition-shadow duration-300 hover:shadow-[0_14px_30px_-14px_rgba(20,23,43,0.22)]"
              >
                <span
                  aria-hidden="true"
                  className="mb-3 flex size-9 items-center justify-center rounded-xl bg-bg text-gold"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {pointIcons[i % pointIcons.length]}
                  </svg>
                </span>
                <h3 className="text-[15px] font-semibold text-ink">{point.title}</h3>
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

/** Іконки пунктів — інлайн-SVG, порядок за `aboutPoints`. */
const pointIcons = [
  // Методика — список із галочкою
  <>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17" />
  </>,
  // Спільнота — люди
  <>
    <path d="M16 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <path d="M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M22 19v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </>,
  // Етика — щит
  <>
    <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z" />
    <path d="m9 12 2 2 4-4" />
  </>,
  // Практика — рука/дотик
  <>
    <path d="M12 3v9" />
    <path d="M8 8v6a6 6 0 0 0 12 0V9" />
    <path d="M4 12v2a8 8 0 0 0 4 7" />
  </>,
];
