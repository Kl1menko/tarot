import { About } from "@/components/About";
import { CheckoutProvider } from "@/components/CheckoutProvider";
import { Courses } from "@/components/Courses";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { ForWhom } from "@/components/ForWhom";
import { Guarantee } from "@/components/Guarantee";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { Program } from "@/components/Program";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <CheckoutProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <ForWhom />
        <HowItWorks />
        <Program />
        <Courses />
        <Testimonials />
        <Faq />
        <Guarantee />
        <LeadForm />
      </main>
      <Footer />
    </CheckoutProvider>
  );
}
