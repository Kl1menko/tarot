import { forWhom } from "@/data/content";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem, Section, SectionTitle } from "./ui";

export function ForWhom() {
  return (
    <Section className="audience-section">
      <Reveal className="max-w-2xl">
        <SectionTitle className="text-center sm:text-left">Кому підійде навчання?</SectionTitle>
      </Reveal>

      <RevealGroup className="audience-grid">
        {forWhom.map((card) => (
          <RevealItem key={card.title} className="audience-card">
            <div className="audience-art" aria-hidden="true">
              <Image src={card.image} alt="" fill sizes="(max-width: 767px) 140px, 200px" className="object-contain" />
            </div>
            <div className="audience-copy"><h3>{card.title}</h3><p>{card.text}</p></div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
