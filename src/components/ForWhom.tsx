import { forWhom } from "@/data/content";
import { ServiceCard } from "./ServiceCard";
import { Reveal, RevealGroup, RevealItem, Section, SectionTitle } from "./ui";

export function ForWhom() {
  return (
    <Section>
      <Reveal className="max-w-2xl">
        <SectionTitle>Кому підійде навчання?</SectionTitle>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {forWhom.map((card) => (
          <RevealItem key={card.title}>
            <ServiceCard
              title={card.title}
              imgSrc={card.image}
              imgAlt={card.imageAlt}
              className="min-h-[180px]"
            >
              {card.text}
            </ServiceCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
