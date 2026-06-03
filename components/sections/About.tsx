import Image from "next/image";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
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
            <div className="text-center">
              <h2
                className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-center text-gradient"
              >
                Shahrisabz Tibbiyot Texnikumi haqida
              </h2>
              <div className="mt-4 mx-auto w-full max-w-xl text-center text-lg leading-relaxed text-text-soft md:text-xl">
                
              </div>
            </div>
          </ScrollReveal>

          {/* Premium About image presentation */}
          <ScrollReveal delay={0.1}>
            <div className="relative w-full max-w-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" aria-hidden="true" />
              <div className="relative mx-auto h-[420px] w-full px-4 md:h-[560px] lg:h-[600px]">
                <div className="absolute inset-0 rounded-3xl bg-white/5 shadow-2xl shadow-black/20 ring-1 ring-white/10" aria-hidden="true" />
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="h-full w-full origin-center transition-transform duration-[900ms] ease-out hover:scale-[1.02]">
                    <Image
                      src="/images/building.png"
                      alt="Shahrisabz Tibbiyot Texnikumi"
                      width={1920}
                      height={900}
                      priority
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-accent-green/10 pointer-events-none" aria-hidden="true" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
