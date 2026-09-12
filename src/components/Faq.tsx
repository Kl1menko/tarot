"use client";

import { useState } from "react";
import { faq } from "@/data/faq";
import { trackEvent } from "@/lib/analytics";
import { AccordionItem } from "./Accordion";
import { Reveal, Section, SectionTitle } from "./ui";

/**
 * Розмітка FAQPage для пошукових систем: Google показує такі питання
 * розгорнутим сніпетом. Джерело — той самий масив `faq`, тож відповіді
 * в розмітці й на сторінці не можуть розійтись (Google за це карає).
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq">
      <script
        type="application/ld+json"
        // Дані статичні й наші власні, зовнішнього вводу тут немає.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Reveal className="max-w-2xl">
        <SectionTitle className="text-center sm:text-left">Часті запитання</SectionTitle>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3">
        {faq.map((item, i) => (
          <Reveal key={item.question}>
            <AccordionItem
              id={`faq-${i}`}
              title={item.question}
              open={open === i}
              onToggle={() => {
                const next = open === i ? null : i;
                if (next !== null) trackEvent("faq_open", { question: item.question });
                setOpen(next);
              }}
            >
              {item.answer}
            </AccordionItem>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
