import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Statistics } from "@/components/sections/Statistics";
import { Programs } from "@/components/sections/Programs";
import { License } from "@/components/sections/License";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Mission } from "@/components/sections/Mission";
import { Gallery } from "@/components/sections/Gallery";
import { Admission } from "@/components/sections/Admission";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main-content">
      {/* Hero (saytning birinchi ko‘rinadigan blok) */}
      <Hero />
      <About />
      <Statistics />
      <Programs />
      <License />
      <WhyChooseUs />
      <Mission />
      <Gallery />
      <Admission />
      <Contact />
    </main>
  );
}

