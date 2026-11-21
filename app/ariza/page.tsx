import Link from "next/link";
import { ArrowLeft, AlertTriangle, Send, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/Button";

export default function OnlineApplicationPage() {
  return (
    <main className="min-h-screen bg-bg-dark pt-28 pb-16" id="main-content">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        {/* Back button */}
        <div className="mb-6" data-page-back="true">
          <Link
            href="/"
            className={buttonVariants({ variant: "back", size: "sm" })}
          >
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifaga qaytish
          </Link>
        </div>

        {/* Admission Closed Banner */}
        <section
          className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-600/20 via-indigo-600/15 to-blue-600/15 px-6 py-8 md:px-10 md:py-10"
          aria-label="Qabul holati"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-200">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              {siteConfig.admissionStatus}
            </div>

            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-white md:text-5xl">
              Qabul yakunlandi
            </h1>

            <p className="mt-4 max-w-2xl text-base text-text-soft md:text-lg">
              2026/2027 o&apos;quv yili uchun onlayn ariza topshirish va hujjatlar qabuli yopilgan.
              Keyingi qabul mavsumi boshlanish sanasi rasmiy Telegram kanalimizda e&apos;lon
              qilinadi.
            </p>

            <div className="mt-8 rounded-2xl border border-rose-300/25 bg-rose-950/30 px-5 py-4 md:px-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20">
                  <AlertTriangle className="h-5 w-5 text-rose-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white md:text-base">
                    Hozirda yangi arizalar qabul qilinmayapti
                  </p>
                  <p className="mt-1 text-sm text-text-soft md:text-[15px]">
                    Qo&apos;shimcha savollar yoki keyingi qabul haqida ma&apos;lumot olish uchun
                    qabul komissiyasiga murojaat qilishingiz mumkin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reference Documents & Contact Options */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white md:text-2xl">
              Keyingi qabul uchun kerakli hujjatlar
            </h2>

            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-text-soft uppercase">
              Ma&apos;lumot uchun
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-bg-deep/40 p-5 md:p-6">
            <ul className="list-none space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-blue-300 ring-1 ring-primary/30">
                  1
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Pasport yoki ID karta nusxasi (PDF yoki rasm shaklida);
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-blue-300 ring-1 ring-primary/30">
                  2
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Attestat yoki kollej/litsey diplomi skaneri (PDF yoki rasm shaklida);
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-blue-300 ring-1 ring-primary/30">
                  3
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Telefon raqamlari va 14 xonali JSHSHIR ma&apos;lumoti;
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-blue-300 ring-1 ring-primary/30">
                  4
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Ta&apos;lim yo&apos;nalishi va{" "}
                  <Link href="/kontrakt" className="text-blue-400 underline hover:text-blue-300">
                    kontrakt jadvali
                  </Link>{" "}
                  bilan oldindan tanishish.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={siteConfig.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}
            >
              <Send className="h-4 w-4" />
              <span>Telegram kanalimizni kuzatish</span>
            </a>

            <a
              href={siteConfig.phoneHref}
              className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full" })}
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              <span>{siteConfig.phone}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
