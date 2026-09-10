import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem, Section, SectionTitle } from "./ui";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <Reveal className="max-w-2xl">
        <SectionTitle>Що кажуть учениці</SectionTitle>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <RevealItem
            key={i}
            className="hairline flex h-full flex-col overflow-hidden rounded-card bg-surface"
          >
            {item.type === "screenshot" ? (
              <div className="relative aspect-[3/4] w-full bg-elevated">
                <Image
                  src={item.image}
                  alt={`Скріншот відгуку про курс «${item.courseName}»`}
                  fill
                  sizes="(max-width: 981px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-1 flex-col p-6">
                <span aria-hidden="true" className="font-display text-4xl leading-none text-gold/60">
                  “
                </span>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.quote}
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-elevated">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-[15px] font-semibold text-ink">
                    {item.authorName}
                  </span>
                </div>
              </div>
            )}

            <p className="border-t border-ink/10 px-6 py-4 text-xs text-faint">
              {item.city} · {item.courseName}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
