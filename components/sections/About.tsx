import Image from "next/image";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent, statistics } from "@/lib/constants";

export function About() {
  return (
    <section
      id="haqimizda"
      className="section-anchor section-padding relative bg-bg-mid"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading title={aboutContent.title} align="left" />
        </ScrollReveal>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="gradient-border absolute inset-0 rounded-3xl" />
              <Image
                src="/images/building.png"
                alt="Shahrisabz Tibbiyot Texnikumi binosi"
                width={1200}
                height={800}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p
              id="about-heading"
              className="text-lg leading-relaxed text-text-soft md:text-xl"
            >
              {aboutContent.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {statistics.slice(0, 2).map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-5">
                  <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-gradient md:text-3xl">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
