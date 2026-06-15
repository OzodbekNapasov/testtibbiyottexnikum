"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
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
            const titleToImage: Record<string, string> = {
              Feldsher: "feldshelik isi.png",
              "Hamshiralik ishi": "hamshiralik ishi.png",
              "Davolash ishi": "feldshelik isi.png",
              "Davolash ishi / Feldsher": "feldshelik isi.png",
              "Farmatsiya ishi": "farmatsiya ishi.png",
            };

            const imgFile = titleToImage[program.title] ?? `${program.title}.png`;
            const imgSrc = `/images/${imgFile}`;

            return (
              <ScrollReveal
                key={`${program.title}-${program.duration}`}
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard
                    gradientBorder
                    className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Compact image (main visual but balanced) */}
                    <div className="relative">
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br",
                          "mx-5 mt-5 w-[calc(100%-2.5rem)] aspect-[4/3]",
                          program.accent
                        )}
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0">
                          <Image
                            src={imgSrc}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 420px, (min-width: 768px) 340px, 88vw"
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                            quality={100}
                            unoptimized={false}
                            priority={index < 2}
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />
                      </div>
                    </div>

                    {/* Text below image */}
                    <div className="px-3 pb-7 pt-5">
                      <div className="flex items-start justify-between gap-6">
                        <h3
                          id={index === 0 ? "programs-heading" : undefined}
                          className="w-full text-left font-[family-name:var(--font-heading)] text-[20px] leading-[1.05] font-black tracking-tight text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:drop-shadow-[0_16px_36px_rgba(16,185,129,0.18)] sm:text-[30px] lg:text-[34px]"
                        >
                          {program.title}
                        </h3>

                        {/* Duration chip near title (does not overlap image) */}
                        <div className="shrink-0 rounded-full border border-white/65 bg-blue/100 px-4 py-2 shadow-lg shadow-black/10 backdrop-blur-sm">
                          <div className="text-center text-base font-extrabold leading-none text-white">
                            {program.duration}
                          </div>
                        </div>
                      </div>

                      <p className="mt-2 text-sm font-medium text-accent-green">
                        {program.subtitle}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
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
              onClick={() => window.location.assign("/ariza")}
              whileHover={{ y: -2 }}
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
