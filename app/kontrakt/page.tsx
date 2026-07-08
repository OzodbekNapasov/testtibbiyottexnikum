"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Award, Clock, BookOpen, Layers, Globe, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

interface Direction {
  code: string;
  name: string;
  duration: string;
  type: string;
  qualification: string;
  language: string;
  form: string;
  description: string;
  price: string;
  additionalCertificates: string[];
  accentColor: string;
  icon: React.ReactNode;
}

const directions: Direction[] = [
  {
    code: "50910203",
    name: "Hamshiralik ishi (3 yillik)",
    duration: "3 yil",
    type: "Professional ta'lim",
    qualification: "Umumiy amaliyot hamshirasi",
    language: "o'zbek",
    form: "kunduzgi",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan shakllantirilgan guruhlarda, tanlangan kvalifikatsiyalar sonidan kelib chiqib o'qish muddati 3 yil etib belgilanadi. Bu guruhlarda kasb doirasida tanlangan kvalifikatsiyalarni muvaffaqiyatli o'zlashtirgan shaxslarga belgilangan namunadagi diplom beriladi.",
    price: "8.500.000 so'm",
    additionalCertificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    accentColor: "from-indigo-500/20 to-blue-500/20",
    icon: <GraduationCap className="h-6 w-6 text-indigo-400" />,
  },
  {
    code: "40910203",
    name: "Hamshiralik ishi (2 yillik)",
    duration: "2 yil",
    type: "Professional ta'lim",
    qualification: "Tibbiyot hamshirasi, Maktab va maktabgacha ta'lim tashkiloti hamshirasi, Fizioterapiya (massaj) xonasi hamshirasi",
    language: "o'zbek",
    form: "kunduzgi",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan shakllantirilgan guruhlarda, tanlangan kvalifikatsiyalar sonidan kelib chiqib o'qish muddati 2 yil etib belgilanadi. Bu guruhlarda kasb doirasida tanlangan kvalifikatsiyalarni muvaffaqiyatli o'zlashtirgan shaxslarga belgilangan namunadagi diplom beriladi.",
    price: "8.500.000 so'm",
    additionalCertificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    accentColor: "from-blue-500/20 to-emerald-500/20",
    icon: <Clock className="h-6 w-6 text-emerald-400" />,
  },
  {
    code: "50910401",
    name: "Farmatsiya ishi",
    duration: "3 yil",
    type: "Professional ta'lim",
    qualification: "Farmatsevt assistenti",
    language: "o'zbek",
    form: "kunduzgi",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan shakllantirilgan guruhlarda, tanlangan kvalifikatsiyalar sonidan kelib chiqib o'qish muddati 3 yil etib belgilanadi. Bu guruhlarda kasb doirasida tanlangan kvalifikatsiyalarni muvaffaqiyatli o'zlashtirgan shaxslarga belgilangan namunadagi diplom beriladi.",
    price: "8.500.000 so'm",
    additionalCertificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    accentColor: "from-emerald-500/20 to-teal-500/20",
    icon: <BookOpen className="h-6 w-6 text-teal-400" />,
  },
  {
    code: "50910204",
    name: "Davolash ishi / Feldsher",
    duration: "3 yil",
    type: "Professional ta'lim",
    qualification: "Feldsher",
    language: "o'zbek",
    form: "kunduzgi",
    description:
      "Kamida umumiy o'rta ma'lumotga ega bo'lgan shaxslar hisobidan tashkil etilgan guruhlarda, shoshilinch tibbiy yordam, birlamchi sanitariya-tibbiy yordam ko'rsatish va profilaktika choralari bo'yicha chuqur bilimlar beriladi. Bitiruvchilar tibbiy punktlar va tez yordam tizimida ishlash huquqini qo'lga kiritadilar.",
    price: "8.500.000 so'm",
    additionalCertificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    accentColor: "from-rose-500/20 to-orange-500/20",
    icon: <Layers className="h-6 w-6 text-rose-400" />,
  },
];

export default function KontraktPage() {
  return (
    <main className="min-h-screen bg-bg-dark pt-28 pb-20 text-white selection:bg-emerald-500/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* Back Button */}
        <ScrollReveal>
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-text-soft transition-all hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal>
          <SectionHeading
            title="Yo'nalishlar va Kontrakt narxlari"
            subtitle="Mutaxassislik bo'yicha to'liq jadval ma'lumotlari va yillik o'qish to'lovlari"
          />
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {directions.map((dir, index) => (
            <ScrollReveal key={dir.code} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GlassCard
                  gradientBorder
                  className="group relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02]"
                >
                  
                  {/* Decorative glowing card accent */}
                  <div className={`absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-gradient-to-br ${dir.accentColor} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`} />

                  {/* Card Header (Title & Code) */}
                  <div className="border-b border-white/10 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                        {dir.icon}
                      </div>
                      <span className="rounded-full bg-white/5 px-3.5 py-1 text-xs font-semibold text-text-soft tracking-wider ring-1 ring-white/10">
                        KOD: {dir.code}
                      </span>
                    </div>

                    <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-black tracking-tight text-white sm:text-3xl">
                      {dir.name}
                    </h3>
                  </div>

                  {/* Specifications Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Ta&apos;lim turi</p>
                      <p className="mt-1 text-sm font-semibold text-white/90">{dir.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Ta&apos;lim shakli</p>
                      <p className="mt-1 text-sm font-semibold text-white/90 capitalize">{dir.form}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">O&apos;qish davomiyligi</p>
                      <p className="mt-1 text-sm font-semibold text-white/90">{dir.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Ta&apos;lim tili</p>
                      <p className="mt-1 text-sm font-semibold text-white/90 capitalize">{dir.language}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6 flex-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Mutaxassislik haqida</h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-soft">{dir.description}</p>
                    
                    <div className="mt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Kvalifikatsiya: </span>
                      <span className="text-sm font-semibold text-white/95">{dir.qualification}</span>
                    </div>
                  </div>

                  {/* Additional Certificates Section */}
                  <div className="mt-6 rounded-2xl bg-emerald-500/5 p-5 ring-1 ring-emerald-500/10">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <Award className="h-4 w-4" />
                      Qo&apos;shimcha sertifikatlar
                    </h4>
                    <p className="mt-1 text-[11px] leading-relaxed text-emerald-200/80">
                      Muvaffaqiyatli bitirganlarga quyidagi yo&lsquo;nalishlar bo&lsquo;yicha qo&lsquo;shimcha sertifikatlar beriladi:
                    </p>
                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {dir.additionalCertificates.map((cert) => (
                        <li key={cert} className="flex items-center gap-2 text-xs text-white/90">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA Section */}
                  <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Yillik to&apos;lov narxi</p>
                      <p className="mt-1 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                        {dir.price}
                      </p>
                    </div>

                    <Link
                      href="/ariza"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/35 active:scale-98"
                    >
                      Ro&apos;yxatdan o&apos;tish
                      <Check className="h-4 w-4" />
                    </Link>
                  </div>

                </GlassCard>
              </motion.div>
            </ScrollReveal>
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
    </main>
  );
}
