import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Statistics } from "@/components/sections/Statistics";
import { Programs } from "@/components/sections/Programs";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Mission } from "@/components/sections/Mission";
import { Gallery } from "@/components/sections/Gallery";
import { Admission } from "@/components/sections/Admission";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Statistics />
      <Programs />
      <WhyChooseUs />
      <Mission />
      <Gallery />
      <Admission />
      <Contact />
    </main>
  );
}
