"use client";

import { useState } from "react";
import { faq } from "@/data/faq";
import { trackEvent } from "@/lib/analytics";
import { AccordionItem } from "./Accordion";
import { Reveal, Section, SectionTitle } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq">
      <Reveal className="max-w-2xl">
        <SectionTitle>Часті запитання</SectionTitle>
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
