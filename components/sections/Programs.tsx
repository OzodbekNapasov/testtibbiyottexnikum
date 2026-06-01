"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <ScrollReveal key={`${program.title}-${program.duration}`} delay={index * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                  <GlassCard gradientBorder className="group h-full">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div
                        className={cn(
                          "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br",
                          program.accent,
                        )}
                      >
                        <Icon
                          className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-blue-300">
                        {program.duration}
                      </span>
                    </div>

                    <div className="mb-3">
                      <h3
                        id={index === 0 ? "programs-heading" : undefined}
                        className="font-[family-name:var(--font-heading)] text-xl font-bold text-white"
                      >
                        {program.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent-green">
                        {program.subtitle}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-text-muted">
                      {program.description}
                    </p>

                    <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Kasb (mutaxassislik) kodi va nomi
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">
                          {program.professionCode}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Kvalifikatsiya(lar) nomi
                        </p>
                        <ul className="mt-2 space-y-1">
                          {program.qualifications.map((qualification) => (
                            <li
                              key={qualification}
                              className="flex items-start gap-2 text-sm text-text-soft"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {qualification}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          O&apos;qishga qabul shartlari
                        </p>
                        <p className="mt-1 text-sm text-text-soft">
                          {program.admissionRequirements}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              onClick={() => (window as any).openModal?.()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                Shartnoma qilish
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
