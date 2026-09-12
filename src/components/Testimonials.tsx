import Image from "next/image";
import type { Testimonial } from "@/data/types";
import { testimonials } from "@/data/testimonials";
import { Container, Reveal, SectionTitle } from "./ui";

/** Статична сітка: повний текст відгуків доступний у зручному темпі. */
export function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section py-14 sm:py-18 lg:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTitle className="text-center sm:text-left">Що кажуть учениці</SectionTitle>
        </Reveal>
        <div className="mt-10"><TestimonialRow /></div>
      </Container>
    </section>
  );
}

function TestimonialRow() {
  return (
    <ul className="testimonial-grid">
      {testimonials.map((item) => (
        <li key={item.id} className="min-w-0">
          <TestimonialCard item={item} />
        </li>
      ))}
    </ul>
  );
}

/** Мінімальна висота для знімка; текстові відгуки можуть рости. */
const CARD_HEIGHT = "min-h-[280px] h-full";

function TestimonialCard({ item }: { item: Testimonial }) {
  if (item.type === "screenshot") {
    return (
      <figure
        className={`hairline relative ${CARD_HEIGHT} overflow-hidden rounded-card bg-elevated`}
      >
        <Image
          src={item.image}
          alt={`Скріншот відгуку про курс «${item.courseName}»`}
          fill
          sizes="(max-width: 767px) 90vw, 480px"
          className="object-contain"
        />
        {/* Підпис поверх знімка: окремим рядком під ним він з'їдав би висоту,
            яка потрібна самому скріншоту. */}
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-8 text-[11px] text-bg/90">
          {item.city} · {item.courseName}
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      className={`hairline flex ${CARD_HEIGHT} flex-col rounded-card bg-surface p-5`}
    >
      {/* Лапки в самому тексті, а не окремим декоративним рядком: той
          забирав висоту, нічого не додаючи. */}
      <blockquote className="flex-1 text-[15px] leading-relaxed text-muted">
        «{item.quote}»
      </blockquote>

      <div className="mt-4 flex items-center gap-2.5 border-t border-ink/10 pt-3.5">
        <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-elevated">
          <Image src={item.image} alt="" fill sizes="32px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-semibold text-ink">
            {item.authorName}
          </span>
          <span className="block truncate text-[11px] text-faint">
            {item.city} · {item.courseName}
          </span>
        </span>
      </div>
    </div>
  );
}
