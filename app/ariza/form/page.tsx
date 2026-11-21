"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2, Loader2, Lock, Send, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/Button";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqsJgHjs0pHx6_Du3l_NKnsKz8gqAbS7vEzCW5qDteJVr_LCLD4wM3BMhyQY1fny7cvg/exec";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const programs = [
  "Hamshiralik ishi (2 yillik)",
  "Hamshiralik ishi (3 yillik)",
  "Farmatsiya ishi (3 yillik)",
  "Davolash ishi / Feldsher (3 yillik)",
];

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ArizaFormPage() {
  const [fish, setFish] = useState("");
  const [yosh, setYosh] = useState("");
  const [jshshir, setJshshir] = useState("");
  const [yonalish, setYonalish] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [attestat, setAttestat] = useState<File | null>(null);
  const [attestatName, setAttestatName] = useState("Fayl tanlanmagan");
  const [idkarta, setIdkarta] = useState<File | null>(null);
  const [idkartaName, setIdkartaName] = useState("Fayl tanlanmagan");
  const [roziman, setRoziman] = useState(false);
  const [status, setStatus] = useState<{
    type: "error" | "success" | "info";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!fish.trim() || !yosh || !jshshir.trim() || !yonalish || !tel1.trim() || !attestat || !idkarta) {
      setStatus({ type: "error", text: "Iltimos, barcha majburiy (*) maydonlarni to'ldiring." });
      return false;
    }
    const ageNum = Number(yosh);
    if (Number.isNaN(ageNum) || ageNum < 14 || ageNum > 60) {
      setStatus({ type: "error", text: "Yosh 14 dan 60 gacha bo'lishi kerak." });
      return false;
    }
    if (jshshir.trim().length !== 14 || !/^[0-9]+$/.test(jshshir.trim())) {
      setStatus({ type: "error", text: "JSHSHIR 14 ta raqamdan iborat bo'lishi kerak." });
      return false;
    }
    if (attestat.size > MAX_FILE_SIZE_BYTES || idkarta.size > MAX_FILE_SIZE_BYTES) {
      setStatus({ type: "error", text: "Har bir yuklanadigan fayl hajmi 5 MB dan oshmasligi kerak." });
      return false;
    }
    if (!roziman) {
      setStatus({
        type: "error",
        text: "Shaxsiy ma'lumotlaringiz ko'rib chiqilishiga rozi bo'lishingiz kerak.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setLoading(true);
    setStatus({ type: "info", text: "Arizangiz va hujjatlar yuborilmoqda, iltimos kuting..." });

    try {
      const attestatData = attestat ? await toBase64(attestat) : "";
      const idkartaData = idkarta ? await toBase64(idkarta) : "";

      const attestatPayload = attestat
        ? { data: attestatData, type: attestat.type, name: attestat.name }
        : null;
      const idkartaPayload = idkarta
        ? { data: idkartaData, type: idkarta.type, name: idkarta.name }
        : null;

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          fish: fish.trim(),
          yosh,
          jshshir: jshshir.trim(),
          yonalish,
          tel1: tel1.trim(),
          tel2: tel2.trim(),
          attestat: attestatPayload,
          idkarta: idkartaPayload,
          idKarta: idkartaPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server xatosi (${res.status}). Qayta urinib ko'ring.`);
      }

      try {
        const txt = await res.text();
        const json = txt ? JSON.parse(txt) : null;
        if (json && json.success === false) {
          throw new Error(json.error || "Server xatolik qaytardi.");
        }
      } catch (err) {
        if (err instanceof Error && !(err instanceof SyntaxError)) {
          throw err;
        }
      }

      setStatus({
        type: "success",
        text: "Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
      });
      setSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Noma'lum xatolik yuz berdi.";
      setStatus({ type: "error", text: `Xatolik: ${message}` });
    } finally {
      setLoading(false);
    }
  };

  if (!siteConfig.admissionOpen) {
    return (
      <main className="min-h-screen bg-bg-dark pt-28 pb-16" id="main-content">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="mb-6" data-page-back="true">
            <Link
              href="/ariza"
              className={buttonVariants({ variant: "back", size: "sm" })}
            >
              <ArrowLeft className="h-4 w-4" />
              Orqaga
            </Link>
          </div>

          <div className="rounded-3xl border border-rose-500/30 bg-white/5 p-8 md:p-10 text-center">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30">
              <Lock className="h-9 w-9" />
            </div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300">
              {siteConfig.admissionStatus}
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-4xl">
              Onlayn ariza formasi yopiq
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-text-soft">
              2026/2027 o&apos;quv yili uchun hujjatlar qabuli yakunlandi. Keyingi qabul boshlanishi
              haqida ma&apos;lumot olish uchun rasmiy Telegram kanalimizni kuzating yoki qabul
              komissiyasiga qo&apos;ng&apos;iroq qiling.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteConfig.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                <Send className="h-4 w-4" />
                Telegram kanalimiz
              </a>
              <a
                href={siteConfig.phoneHref}
                className={buttonVariants({ variant: "secondary", size: "md" })}
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-bg-dark pt-28 pb-16" id="main-content">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">Arizangiz qabul qilindi</h1>
            <p className="mt-4 text-base text-text-soft">
              Sizning ma&apos;lumotlaringiz qabul qilindi va qabul komissiyasi tez orada siz bilan
              bog&apos;lanadi.
            </p>
            <div className="mt-8" data-page-back="true">
              <Link
                href="/"
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-dark pt-28 pb-16" id="main-content">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="mb-6" data-page-back="true">
          <Link
            href="/ariza"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-text-soft transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Orqaga
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/25 via-indigo-600/15 to-cyan-500/10 px-6 py-8 md:px-10 md:py-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="relative">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-white md:text-5xl">
              Onlayn ariza formasi
            </h1>
            <p className="mt-4 max-w-2xl text-base text-text-soft md:text-lg">
              Iltimos, barcha majburiy maydonlarni to&apos;liq to&apos;ldiring va kerakli
              hujjatlarni yuklang (maks. 5 MB).
            </p>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
        >
          <div className="grid gap-6">
            <div>
              <label htmlFor="fish" className="mb-2 block text-sm font-medium text-white">
                F.I.Sh <span className="text-red-400">*</span>
              </label>
              <input
                id="fish"
                value={fish}
                onChange={(e) => setFish(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                placeholder="Familiya Ism Sharif"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="yosh" className="mb-2 block text-sm font-medium text-white">
                  Yoshi <span className="text-red-400">*</span>
                </label>
                <input
                  id="yosh"
                  type="number"
                  value={yosh}
                  onChange={(e) => setYosh(e.target.value)}
                  min={14}
                  max={60}
                  className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                  placeholder="18"
                />
              </div>
              <div>
                <label htmlFor="jshshir" className="mb-2 block text-sm font-medium text-white">
                  JSHSHIR <span className="text-red-400">*</span>
                </label>
                <input
                  id="jshshir"
                  inputMode="numeric"
                  value={jshshir}
                  onChange={(e) => setJshshir(e.target.value.replace(/\D/g, "").slice(0, 14))}
                  maxLength={14}
                  className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                  placeholder="14 ta raqam"
                />
              </div>
            </div>

            <div>
              <label htmlFor="yonalish" className="mb-2 block text-sm font-medium text-white">
                Yo&apos;nalish <span className="text-red-400">*</span>
              </label>
              <select
                id="yonalish"
                value={yonalish}
                onChange={(e) => setYonalish(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
              >
                <option value="">— Tanlang —</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="tel1" className="mb-2 block text-sm font-medium text-white">
                  Telefon 1 <span className="text-red-400">*</span>
                </label>
                <input
                  id="tel1"
                  type="tel"
                  value={tel1}
                  onChange={(e) => setTel1(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                  placeholder="+998 90 000 00 00"
                />
              </div>
              <div>
                <label htmlFor="tel2" className="mb-2 block text-sm font-medium text-white">
                  Qo&apos;shimcha telefon
                </label>
                <input
                  id="tel2"
                  type="tel"
                  value={tel2}
                  onChange={(e) => setTel2(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                  placeholder="+998 90 000 00 00"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Attestat <span className="text-red-400">*</span>
                </label>
                <label
                  htmlFor="attestat"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white transition hover:border-primary cursor-pointer"
                >
                  <span className="truncate text-sm text-text-soft">{attestatName}</span>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Yuklash
                  </span>
                </label>
                <input
                  id="attestat"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setAttestat(file);
                    setAttestatName(file ? file.name : "Fayl tanlanmagan");
                  }}
                  className="sr-only"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  ID karta <span className="text-red-400">*</span>
                </label>
                <label
                  htmlFor="idkarta"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white transition hover:border-primary cursor-pointer"
                >
                  <span className="truncate text-sm text-text-soft">{idkartaName}</span>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Yuklash
                  </span>
                </label>
                <input
                  id="idkarta"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setIdkarta(file);
                    setIdkartaName(file ? file.name : "Fayl tanlanmagan");
                  }}
                  className="sr-only"
                />
              </div>
            </div>

            <label className="inline-flex items-start gap-3 text-sm text-text-soft cursor-pointer">
              <input
                type="checkbox"
                checked={roziman}
                onChange={(e) => setRoziman(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/10 bg-bg-mid text-primary focus:ring-primary"
              />
              <span>
                Shaxsiy ma&apos;lumotlarim qabul komissiyasi tomonidan ko&apos;rib chiqilishiga
                roziman.
              </span>
            </label>

            {/* Visible Status / Validation Feedback */}
            {status && (
              <div
                role="alert"
                className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium ${
                  status.type === "error"
                    ? "border-red-500/30 bg-red-500/10 text-red-300"
                    : status.type === "success"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-blue-500/30 bg-blue-500/10 text-blue-200"
                }`}
              >
                {status.type === "error" ? (
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                ) : status.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                ) : (
                  <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" />
                )}
                <span>{status.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{loading ? "Yuborilmoqda..." : "Ariza yuborish"}</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
