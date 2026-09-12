import { About } from "@/components/About";
import { CheckoutProvider } from "@/components/CheckoutProvider";
import { Courses } from "@/components/Courses";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { ForWhom } from "@/components/ForWhom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { Program } from "@/components/Program";
import { StickyCta } from "@/components/StickyCta";
import { Testimonials } from "@/components/Testimonials";
import { site } from "@/data/content";
import { courses } from "@/data/courses";

/**
 * Розмітка школи та курсів для пошукових систем.
 *
 * FAQPage живе в самому компоненті Faq — він володіє тими даними. Тут те, що
 * описує сторінку цілком: сама школа, її засновниця і перелік курсів із
 * цінами. Ціни й назви беруться з `courses`, тож розмітка не розійдеться
 * з тим, що бачить людина.
 */
const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.brand,
  description: site.tagline,
  url: site.url,
  sameAs: [site.contacts.telegram, site.contacts.instagram],
  founder: {
    "@type": "Person",
    name: site.brand,
    jobTitle: "Тарологиня, викладачка",
  },
};

const coursesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: courses.map((course, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: course.name,
      description: course.desc,
      url: `${site.url}/#courses`,
      provider: { "@type": "EducationalOrganization", name: site.brand, url: site.url },
      // inLanguage і courseMode Google вимагає для сніпета курсу.
      inLanguage: "uk",
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: "UAH",
        category: "Paid",
        availability: "https://schema.org/InStock",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: course.meta.split("·")[0].trim(),
      },
    },
  })),
};

export default function Home() {
  return (
    <CheckoutProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <ForWhom />
        <HowItWorks />
        <Program />
        <Testimonials />
        <Courses />
        <Faq />
        <LeadForm />
      </main>
      <StickyCta />
      <Footer />
    </CheckoutProvider>
  );
}
