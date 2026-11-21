"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { features } from "@/lib/constants";

export function WhyChooseUs() {
  return (
    <section className="section-padding relative" aria-labelledby="why-heading">
      <div className="absolute inset-0 mesh-bg opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            id="why-heading"
            title="Nega bizni tanlashadi?"
            subtitle="Talabalarimiz va ota-onalar bizni ishonch bilan tanlaydi"
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={index * 0.07} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <GlassCard hover={false} className="group flex h-full flex-col text-center hover:border-white/15 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                    <motion.div
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.45 }}
                    >
                      <Icon
                        className="h-7 w-7 text-primary transition-colors group-hover:text-accent-green"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <h3 className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
