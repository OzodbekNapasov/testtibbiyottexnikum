"use client";

import { ShieldCheck } from "lucide-react";

export default function OnlineApplicationPage() {

  return (
    <main className="min-h-screen bg-bg-dark pt-24 pb-16" id="main-content">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        {/* Back button */}
        <button
          type="button"
          onClick={() => window.location.assign('/')}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-text-soft transition-colors hover:text-white hover:bg-white/5"
        >
          <span aria-hidden>←</span>
          Bosh sahifaga qaytish
        </button>

        {/* Top banner */}

        <section
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/25 via-indigo-600/15 to-cyan-500/10 px-6 py-8 md:px-10 md:py-10"
          aria-label="Onlayn ariza topshirish banner"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-white md:text-5xl">
              Onlayn ariza topshirish
            </h1>

            <p className="mt-4 max-w-2xl text-base text-text-soft md:text-lg">
              Ariza shakli rasmiy hujjatlar bilan ishlash uchun mo'ljallangan.
            </p>
            <p className="mt-3 max-w-2xl text-base text-text-soft md:text-lg">
              Barcha maydonlarni aniq va ishonchli ma'lumotlar bilan to'ldiring.
            </p>

            <div className="mt-8 rounded-2xl border border-blue-200/30 bg-blue-950/20 px-5 py-4 md:px-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-indigo-500/30">
                  <ShieldCheck className="h-5 w-5 text-accent-green" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white md:text-base">
                    Hujjatlar xavfsizligi
                  </p>
                  <p className="mt-1 text-sm text-text-soft md:text-[15px]">
                    Shaxsiy ma'lumotlar qabul komissiyasi tomonidan ko'rib chiqiladi va uchinchi tomonga berilmaydi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Online application submission (documents list) */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white md:text-2xl">
              Arizani topshirish
            </h2>

            <div className="rounded-2xl border border-white/50 bg-black/10 px-5 py-2 md:px-1">
              <p className="text-x font-semibold tracking-wide text-text-soft md:text-md">
                Kerakli hujjatlar
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm text-text-soft md:text-base">
            
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-bg-deep/30 p-5 md:p-6">
            <ul className="list-none space-y-4">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-green/15 text-accent-green ring-1 ring-accent-green/30">
                  1
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Pasport yoki ID karta nusxasi PDF yoki rasm shaklida;
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-green/15 text-accent-green ring-1 ring-accent-green/30">
                  2
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Attestat yoki diplom skaneri PDF yoki rasm shaklida
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-green/15 text-accent-green ring-1 ring-accent-green/30">
                  3
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Telefon raqamlari va JSHSHIR to'liq kiritilishi
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-green/15 text-accent-green ring-1 ring-accent-green/30">
                  4
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                  Yo'nalish tanlovi bo'yicha aniq ma'lumot
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-green/15 text-accent-green ring-1 ring-accent-green/30">
                  !
                </span>
                <div className="text-sm leading-relaxed text-text-soft md:text-[15px]">
                     Ariza yuborishdan oldin kontrakt jadvali va hujjatlar ro'yxatini tekshirib chiqing.
                </div>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => window.openModal?.()}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-primary/50 md:w-auto"
          >
            Onlayn ariza formasi
          </button>
        </section>
      </div>
    </main>
  );
}

