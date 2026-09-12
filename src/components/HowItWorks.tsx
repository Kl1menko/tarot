import { howItWorks } from "@/data/content";
import { StarMark } from "./StarMark";
import { Lead, Reveal, RevealGroup, RevealItem, Section, SectionTitle } from "./ui";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="learning-section">
      <div className="learning-layout">
      <Reveal className="learning-intro max-w-2xl">
        <SectionTitle className="text-center sm:text-left">Від цікавості —<br /><span className="editorial-accent">до практики</span></SectionTitle>
        <div className="mt-4">
          <Lead>
            Усе онлайн, у зручному темпі, з живою підтримкою. Пʼять кроків від
            заявки до сертифіката.
          </Lead>
        </div>
        <a href="#program" className="learning-link">Переглянути програму <span aria-hidden="true">↗</span></a>
        <div className="learning-seal" aria-hidden="true"><span><StarMark /></span><p>Знання, які стають<br />вашою практикою</p></div>
      </Reveal>

      <RevealGroup className="learning-steps">
        {howItWorks.map((step) => (
          <RevealItem
            key={step.number}
            className="learning-step relative"
          >
            {/* Номер позначає послідовність кроків. */}
            <span
              aria-hidden="true"
              className="step-number"
            >
              0{step.number}
            </span>

            <h3 className="relative text-lg font-semibold leading-snug">
              {step.title}
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-muted">
              {step.text}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
      </div>
    </Section>
  );
}
