import { site } from "@/data/content";
import { Container, Reveal } from "./ui";

export function Guarantee() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Reveal className="hairline flex flex-col items-start gap-5 rounded-card bg-gold/10 p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
          <span
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/45 font-display text-2xl text-gold"
          >
            ✓
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">
              Гарантія повернення коштів
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
              Якщо протягом перших {site.refundLessons} уроків ви зрозумієте, що курс вам
              не підходить — я поверну повну вартість. Без пояснень, без додаткових
              умов і без незручних питань.
            </p>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
