"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { programs } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Programs() {
  return (
    <section
      id="yonalishlar"
      className="section-anchor section-padding relative bg-bg-mid"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            title="Ta'lim yo'nalishlari"
            subtitle="Zamonaviy tibbiyot sohasida talab qilinadigan kasblar bo'yicha professional tayyorgarlik"
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <ScrollReveal key={`${program.title}-${program.duration ?? index}`} delay={index * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                  <GlassCard gradientBorder className="group h-full">
                    <div
                      className={cn(
                        "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br",
                        program.accent,
                      )}
                    >
                      <Icon
                        className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3
                        id={index === 0 ? "programs-heading" : undefined}
                        className="font-[family-name:var(--font-heading)] text-xl font-bold text-white"
                      >
                        {program.title}
                      </h3>
                      {program.duration && (
                        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-blue-300">
                          {program.duration}
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-text-muted md:text-base">
                      {program.description}
                    </p>
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
