import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Counter } from "@/components/ui/Counter";
import { statistics } from "@/lib/constants";

export function Statistics() {
  return (
    <section className="section-padding relative overflow-hidden" aria-label="Statistika">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-mid via-bg-deep to-bg-deep" />
      <div className="noise-overlay absolute inset-0" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {statistics.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
