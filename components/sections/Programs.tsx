"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Check, Award } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { programs } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProgramType {
  title: string;
  duration: string;
  subtitle: string;
  description: string;
  professionCode: string;
  qualifications: string[];
  admissionRequirements: string;
  accent: string;
}

function ProgramCard({ program, index }: { program: ProgramType; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
      className="w-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="w-full flex flex-col"
      >
        <GlassCard
          gradientBorder
          className="group w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
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
          <div className="px-3 pb-7 pt-5 flex-1 flex flex-col justify-between">
            <div>
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
            </div>

            {/* Expand / Collapse Button & Content */}
            <div className="mt-auto w-full">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 border backdrop-blur-md shadow-md cursor-pointer",
                  isExpanded 
                    ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 hover:border-rose-500/50 shadow-rose-500/5"
                    : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:border-emerald-500/50 shadow-emerald-500/5"
                )}
              >
                <span>{isExpanded ? "Yopish" : "Batafsil ma'lumot"}</span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover/btn:scale-110">
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      isExpanded ? "rotate-180 text-rose-400" : "text-emerald-400"
                    )}
                  />
                </div>
              </button>

              {/* Collapsible Area */}
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Specifications Grid */}
                <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">KOD / Mutaxassislik</p>
                    <p className="mt-1 text-xs font-semibold text-white/90">{program.professionCode}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Ta&apos;lim shakli</p>
                    <p className="mt-1 text-xs font-semibold text-white/90 capitalize">kunduzgi</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">O&apos;qish davomiyligi</p>
                    <p className="mt-1 text-xs font-semibold text-white/90">{program.duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Ta&apos;lim tili</p>
                    <p className="mt-1 text-xs font-semibold text-white/90 capitalize">o&apos;zbek</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-text-soft">
                  {program.description}
                </p>

                <div className="mt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Kvalifikatsiya: </span>
                  <span className="text-sm font-semibold text-white/95">
                    {program.qualifications.join(", ")}
                  </span>
                </div>

                {/* Additional Certificates */}
                <div className="mt-5 rounded-2xl bg-emerald-500/5 p-4 ring-1 ring-emerald-500/10">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <Award className="h-4 w-4" />
                    Qo&apos;shimcha sertifikatlar
                  </h4>
                  <p className="mt-1 text-[11px] leading-relaxed text-emerald-200/80">
                    Muvaffaqiyatli bitirganlarga quyidagi yo&lsquo;nalishlar bo&lsquo;yicha qo&lsquo;shimcha sertifikatlar beriladi:
                  </p>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"].map((cert) => (
                      <li key={cert} className="flex items-center gap-2 text-xs text-white/90">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Box */}
                <div className="mt-6 border-t border-white/10 pt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Kontrakt narxi</p>
                    <p className="mt-1 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                      8.500.000 so&apos;m / yil
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </ScrollReveal>
  );
}

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

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-start">
          {programs.map((program, index) => (
            <ProgramCard
              key={`${program.title}-${program.duration}`}
              program={program}
              index={index}
            />
          ))}
        </div>

        {/* Payment Installments Section */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 max-w-3xl mx-auto">
            <GlassCard gradientBorder className="p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/[0.02]">
              <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold text-white leading-relaxed">
                To&apos;lovni 1 kurs davomida 5 ta qismga bo&apos;lib to&apos;lash imkoniyati mavjud.
              </h3>
              
              <div className="mt-6">
                <p className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">Namuna:</p>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-xs uppercase font-bold text-text-muted">
                        <th className="px-6 py-4">To&apos;lov miqdori (so&apos;m)</th>
                        <th className="px-6 py-4">To&apos;lov muddati</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium text-white/90">
                      <tr className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">1 275 000</td>
                        <td className="px-6 py-4">2026 yilning 10-sentabriga qadar</td>
                      </tr>
                      <tr className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">1 806 250</td>
                        <td className="px-6 py-4">2026 yilning 10-noyabriga qadar</td>
                      </tr>
                      <tr className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">1 806 250</td>
                        <td className="px-6 py-4">2027 yilning 10-yanvariga qadar</td>
                      </tr>
                      <tr className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">1 806 250</td>
                        <td className="px-6 py-4">2027 yilning 10-martiga qadar</td>
                      </tr>
                      <tr className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-mono text-emerald-400 font-bold">1 806 250</td>
                        <td className="px-6 py-4">2027 yilning 10-mayiga qadar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
