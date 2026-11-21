"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, HelpCircle, PhoneCall, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

const faqList = [
  {
    q: "Qabul jarayoni qachongacha davom etadi?",
    a: "2026/2027 o'quv yili uchun hujjatlar qabuli yakunlandi (yopilgan). Keyingi o'quv yili qabuli boshlanish sanasi haqida rasmiy Telegram kanalimiz (@shahrisabz_t_t_uz) va veb-saytimizda e'lon qilinadi.",
  },
  {
    q: "O'qishga kirish uchun imtihon topshiriladimi?",
    a: "Yo'q, murakkab test sinovlarisiz abituriyentlar bilan shaffof suhbat asosida qabul amalga oshiriladi.",
  },
  {
    q: "Qabul uchun qanday hujjatlar talab qilinadi?",
    a: "11-sinf attestati yoki kollej/litsey diplomi (ilovasi bilan), pasport yoki ID karta nusxasi, 3x4 rasm hamda telefon raqami va JSHSHIR ma'lumotlari talab etiladi.",
  },
  {
    q: "Qaysi ta'lim yo'nalishlari mavjud va o'qish muddati qancha?",
    a: "Texnikumda 4 ta yo'nalish mavjud: Hamshiralik ishi (3 yillik), Hamshiralik ishi (2 yillik), Farmatsiya ishi (3 yillik) va Davolash ishi / Feldsher (3 yillik). Barcha yo'nalishlar kunduzgi shaklda o'zbek tilida olib boriladi.",
  },
  {
    q: "Kontrakt narxi qancha va bo'lib to'lash mumkinmi?",
    a: "Yillik kontrakt to'lovi 8 500 000 so'm. To'lovni 1 o'quv yili davomida 5 ta qismga bo'lib to'lash imkoniyati mavjud.",
  },
  {
    q: "O'qish yakunida qanday diplom va sertifikatlar beriladi?",
    a: "Bitiruvchilarga O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi tomonidan tasdiqlangan davlat namunasidagi rasmiy diplom (litsenziya №273087) hamda Farmatsevtika, Logopediya va Fizioterapiya va Massaj yo'nalishlari bo'yicha qo'shimcha sertifikatlar beriladi.",
  },
  {
    q: "Amaliy mashg'ulotlar qayerda o'tkaziladi?",
    a: "Nazariy darslar zamonaviy simulyatorlar va laboratoriyalarda, amaliyot esa Shahrisabz shahridagi yetakchi shifoxona va tibbiyot muassasalarida o'tkaziladi.",
  },
  {
    q: "Texnikum manzili va ish vaqti qanday?",
    a: `${siteConfig.address}. Qabul komissiyasi ish vaqti: ${siteConfig.workingHours}.`,
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-bg-dark pt-28 pb-20 text-white" id="main-content">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <ScrollReveal>
          <div className="mb-8" data-page-back="true">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-text-soft transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <SectionHeading
            title="Eng ko'p beriladigan savollar"
            subtitle="Qabul, ta'lim yo'nalishlari, kontrakt to'lovi va diplom haqida batafsil javoblar"
          />
        </ScrollReveal>

        <div className="mt-10 space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={item.q} delay={idx * 0.04}>
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors hover:border-white/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-white transition-colors hover:bg-white/5 cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 text-blue-400" />
                      <span>{item.q}</span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-text-soft sm:text-base">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Contact CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-emerald-500/10 p-6 sm:p-8 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-white">
              Savolingizga javob topa olmadingizmi?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-soft">
              2026/2027 o&apos;quv yili qabuli yopilgan. Qo&apos;shimcha ma&apos;lumot uchun qabul komissiyasiga qo&apos;ng&apos;iroq qiling yoki Telegram kanalimizni kuzating.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteConfig.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-500"
              >
                <span>Telegram kanalimiz</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
