"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Clock,
  BookOpen,
  Layers,
  Award,
  ShieldCheck,
  FileText,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Send,
  PhoneCall,
  UserCheck,
  Building2,
  MapPin,
  Check,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CampusSection } from "@/components/sections/CampusSection";
import { siteConfig } from "@/lib/site-config";

interface Specialty {
  code: string;
  name: string;
  duration: string;
  qualification: string;
  requirement: string;
  certificates: string[];
  gradient: string;
  icon: React.ReactNode;
}

const specialties: Specialty[] = [
  {
    code: "50910203",
    name: "Hamshiralik ishi (3 yillik)",
    duration: "3 yil (Kunduzgi)",
    qualification: "Umumiy amaliyot hamshirasi",
    requirement: "11-sinf attestati yoki kollej/litsey diplomi negizida",
    certificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    gradient: "from-blue-600/20 to-indigo-600/20",
    icon: <GraduationCap className="h-6 w-6 text-blue-400" />,
  },
  {
    code: "40910203",
    name: "Hamshiralik ishi (2 yillik)",
    duration: "2 yil (Kunduzgi)",
    qualification: "Tibbiyot hamshirasi, fizioterapiya hamshirasi",
    requirement: "11-sinf attestati yoki kollej/litsey diplomi negizida",
    certificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    gradient: "from-emerald-600/20 to-teal-600/20",
    icon: <Clock className="h-6 w-6 text-emerald-400" />,
  },
  {
    code: "50910401",
    name: "Farmatsiya ishi",
    duration: "3 yil (Kunduzgi)",
    qualification: "Farmatsevt assistenti",
    requirement: "11-sinf attestati yoki kollej/litsey diplomi negizida",
    certificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    gradient: "from-cyan-600/20 to-blue-600/20",
    icon: <BookOpen className="h-6 w-6 text-cyan-400" />,
  },
  {
    code: "50910204",
    name: "Davolash ishi / Feldsher",
    duration: "3 yil (Kunduzgi)",
    qualification: "Feldsher (Shoshilinch yordam va profilaktika)",
    requirement: "11-sinf attestati yoki kollej/litsey diplomi negizida",
    certificates: ["Farmatsevtika", "Logopediya", "Fizioterapiya va Massaj"],
    gradient: "from-rose-600/20 to-orange-600/20",
    icon: <Layers className="h-6 w-6 text-rose-400" />,
  },
];

const admissionSteps = [
  {
    step: "01",
    title: "Onlayn ariza topshirish",
    desc: "Veb-saytimiz orqali yoki rasmiy Telegram botimiz orqali bir necha daqiqada ariza yuboring.",
    icon: <Send className="h-5 w-5 text-blue-400" />,
  },
  {
    step: "02",
    title: "Hujjatlarni taqdim etish",
    desc: "Pasport/ID karta, attestat yoki diplom hamda 3x4 rasmlarni onlayn yoki bevosita qabul komissiyasiga topshiring.",
    icon: <FileText className="h-5 w-5 text-emerald-400" />,
  },
  {
    step: "03",
    title: "Suhbat jarayoni",
    desc: "Abituriyentlar bilan o'tkaziladigan qisqa suhbat jarayonidan muvaffaqiyatli o'ting.",
    icon: <UserCheck className="h-5 w-5 text-cyan-400" />,
  },
  {
    step: "04",
    title: "Shartnoma va O'qishni boshlash",
    desc: "Shartnomani rasmiylashtiring va darslarni shinam o'quv binolarida boshlang.",
    icon: <GraduationCap className="h-5 w-5 text-purple-400" />,
  },
];

const faqs = [
  {
    q: "Qabul jarayoni qachongacha davom etadi?",
    a: "2026/2027 o'quv yili uchun qabul kampaniyasi belgilangan kvotalar to'lgunga qadar davom etadi. O'rinlar chegaralanganligi sababli arizani ertaroq topshirish tavsiya etiladi.",
  },
  {
    q: "O'qishga kirish uchun imtihon topshiriladimi?",
    a: "Qabul abituriyentlar bilan shaffof suhbat asosida amalga oshiriladi. Murakkab sinov imtihonlarisiz bilimlaringiz va intilishlaringiz baholanadi.",
  },
  {
    q: "Qabul qilish uchun qanday hujjat talab etiladi?",
    a: "Barcha yo'nalishlarga 11-sinf attestati yoki kollej/litsey diplomi negizida suhbat asosida qabul qilinadi.",
  },
  {
    q: "O'qish yakunida qanday diplom beriladi?",
    a: "Bitiruvchilarga O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi tomonidan tasdiqlangan davlat namunasidagi rasmiy diplom hamda 3 ta yo'nalish bo'yicha qo'shimcha sertifikatlar topshiriladi.",
  },
];

export default function QabulLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-bg-dark pt-28 pb-20 text-white selection:bg-blue-500/30">
      
      {/* Ambient Lighting Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[550px] w-[700px] rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-emerald-500/10 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Hero Section (Matching reference style cleanly) */}
        <section className="pt-6 pb-12">
          
          {/* Top Status Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider text-amber-300 uppercase">
              <span className="h-2 w-2 rounded-sm bg-amber-400" />
              QABUL 2026 — 2027 OCHIQ
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-center font-[family-name:var(--font-heading)] text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Shahrisabz{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 drop-shadow-sm">
              Tibbiyot Texnikumi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-center text-base sm:text-lg text-text-soft leading-relaxed max-w-2xl mx-auto">
            Hamshiralik, Farmatsiya va Feldsherlik yo&apos;nalishlari. 11-sinf attestati yoki kollej/litsey diplomi negizida suhbat asosida qabul.
          </p>

          {/* Action Pill Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ariza"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-98"
            >
              Ariza qoldirish
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href="#yonalishlar"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-base font-semibold text-white transition-all hover:scale-[1.02]"
            >
              Yo&apos;nalishlar
            </a>
          </div>

          {/* 4 Large Stat Cards */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 text-center shadow-xl hover:border-white/20 transition-all">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white">690+</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-text-muted">O&apos;QIGAN TALABALAR</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 text-center shadow-xl hover:border-white/20 transition-all">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white">318+</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-text-muted">BITIRGAN TALABALAR</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 text-center shadow-xl hover:border-white/20 transition-all">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white">4</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-text-muted">TA&apos;LIM YO&apos;NALISHLARI</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 text-center shadow-xl hover:border-white/20 transition-all">
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white">100%</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-text-muted">AMALIYOT BAZALARI</p>
            </div>
          </div>

        </section>

        {/* Specializations Section */}
        <section id="yonalishlar" className="mt-20">
          <ScrollReveal>
            <SectionHeading
              title="Ta'lim Yo'nalishlari va Mutaxassisliklar"
              subtitle="2026/2027 o'quv yili uchun qabul amalga oshiriladigan yo'nalishlar ro'yxati"
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialties.map((spec, index) => (
              <ScrollReveal key={spec.code} delay={index * 0.1}>
                <GlassCard gradientBorder className="flex flex-col h-full p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                      {spec.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-text-soft border border-white/10">
                      KOD: {spec.code}
                    </span>
                  </div>

                  <h3 className="mt-5 font-[family-name:var(--font-heading)] text-2xl font-bold text-white">
                    {spec.name}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-text-soft">
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400 shrink-0" />
                      <span><strong>Davomiyligi:</strong> {spec.duration}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <UserCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Qabul talabi:</strong> {spec.requirement}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-400 shrink-0" />
                      <span><strong>Kvalifikatsiya:</strong> {spec.qualification}</span>
                    </p>
                  </div>

                  {/* Certificate badge */}
                  <div className="mt-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Qo&apos;shimcha bepul sertifikatlar:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {spec.certificates.map((cert) => (
                        <span key={cert} className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          <Check className="h-3 w-3" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Full width centered CTA Button */}
                  <div className="mt-8 pt-6 border-t border-white/10 mt-auto">
                    <Link
                      href="/ariza"
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/35 active:scale-98"
                    >
                      Qabulga ariza topshirish
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Nega Aynan Biz? (Marketing Section) */}
        <section className="mt-24">
          <ScrollReveal>
            <SectionHeading
              title="Nega aynan biz?"
              subtitle="Shahrisabz Tibbiyot Texnikumida ta'lim olishning 7 ta asosiy afzalligi"
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Zamonaviy o‘quv xonalari",
                desc: "Interaktiv proyektorlar hamda shinam o'quv xonalari bilan ta'minlangan qulay ta'lim muhiti.",
                icon: <Building2 className="h-6 w-6 text-blue-400" />,
              },
              {
                title: "Amaliy mashg‘ulotlar",
                desc: "Nazariy bilimlarni birinchi kundan boshlab amaliy mashg'ulotlar orqali mustahkamlash.",
                icon: <Clock className="h-6 w-6 text-emerald-400" />,
              },
              {
                title: "Tajribali o‘qituvchilar",
                desc: "Yuqori malakali vrachlar, tibbiyot fanlari nomzodlari hamda amaliyotchi mutaxassislar.",
                icon: <Award className="h-6 w-6 text-purple-400" />,
              },
              {
                title: "Tibbiy simulyatorlar",
                desc: "Zamonaviy tibbiy manekenlar hamda simulyatsiya jihozlari yordamida amaliy ko'nikmalar.",
                icon: <Sparkles className="h-6 w-6 text-cyan-400" />,
              },
              {
                title: "Amaliyot bazalari",
                desc: "Shahrisabz shahridagi yetakchi shifoxonalar va klinikalarda 100% amaliyot o'tash imkoniyati.",
                icon: <Layers className="h-6 w-6 text-rose-400" />,
              },
              {
                title: "Sertifikat va qo‘shimcha kurslar",
                desc: "Farmatsevtika, Logopediya hamda Fizioterapiya va Massaj bo'yicha bepul qo'shimcha sertifikatlar.",
                icon: <GraduationCap className="h-6 w-6 text-amber-400" />,
              },
              {
                title: "Talabalar uchun qulay sharoitlar",
                desc: "Boy kutubxona fondu, Wi-Fi hududi hamda har bir talabaga individual yondashuv.",
                icon: <ShieldCheck className="h-6 w-6 text-teal-400" />,
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <GlassCard gradientBorder className="p-6 h-full flex flex-col bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-text-soft leading-relaxed">{item.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Step by Step Process */}
        <section className="mt-24">
          <ScrollReveal>
            <SectionHeading
              title="Qabul Bosqichlari"
              subtitle="O'qishga kirish va hujjat topshirish jarayoni 4 ta oddiy qadamdan iborat"
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((s, idx) => (
              <ScrollReveal key={s.step} delay={idx * 0.1}>
                <GlassCard className="p-6 relative flex flex-col h-full bg-white/[0.03]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-black text-white/20">{s.step}</span>
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      {s.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white">{s.title}</h4>
                  <p className="mt-2 text-sm text-text-soft leading-relaxed">{s.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Documents Required */}
        <section className="mt-24 max-w-3xl mx-auto">
          <ScrollReveal>
            <GlassCard className="p-8 md:p-10 bg-gradient-to-br from-blue-950/20 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Kerakli Hujjatlar Ro&apos;yxati</h3>
                  <p className="text-xs text-text-soft">Ariza topshirish va ro&apos;yxatdan o&apos;tish uchun</p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "11-sinf attestati yoki kollej/litsey diplomi (ilovasi bilan)",
                  "Pasport yoki ID karta nusxasi (PDF yoki sifatli rasm shaklida)",
                  "3x4 o'lchamdagi elektron rasm (oq fonda)",
                  "Abituriyentning telefon raqami va JSHSHIR ma'lumoti",
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-text-soft">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/ariza"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 py-4 text-base font-bold text-white transition-all shadow-lg shadow-blue-600/20"
                >
                  Qabulga ariza topshirish
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        </section>

        {/* Campus & Map Section */}
        <CampusSection />

        {/* FAQ Section */}
        <section className="mt-24">
          <ScrollReveal>
            <SectionHeading
              title="Ko'p Beriladigan Savollar"
              subtitle="Qabul va o'qish tartibi haqidagi savollaringizga javoblar"
            />
          </ScrollReveal>

          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollReveal key={idx} delay={idx * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-base font-semibold text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-blue-400 shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-text-muted transition-transform ${isOpen ? "rotate-180 text-white" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-5 pt-1 text-sm text-text-soft leading-relaxed border-t border-white/5"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="mt-24">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-14 text-center shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
              <h2 className="relative z-10 font-[family-name:var(--font-heading)] text-2xl sm:text-4xl font-extrabold text-white">
                Kelajagingizni Shahrisabz Tibbiyot Texnikumi Bilan Quring!
              </h2>
              <p className="relative z-10 mt-4 text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
                Onlayn arizani hoziroq yuboring. Qabul komissiyasi siz bilan tez fursatda bog&apos;lanadi.
              </p>

              <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/ariza"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-900 shadow-xl hover:bg-blue-50 transition-all active:scale-98"
                >
                  Qabulga ariza topshirish
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Qabul Komissiyasi Telefon Nomerlari */}
              <div className="relative z-10 mt-8 pt-8 border-t border-white/20">
                <p className="text-sm font-semibold text-blue-100 uppercase tracking-wider mb-4">
                  Qabul komissiyasi aloqa raqamlari:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                  {siteConfig.admissionPhones.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.href}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-black/20 hover:bg-white/20 px-4 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                      <PhoneCall className="h-4 w-4 text-emerald-300 shrink-0" />
                      <span>{p.display}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </main>
  );
}
