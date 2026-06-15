"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqsJgHjs0pHx6_Du3l_NKnsKz8gqAbS7vEzCW5qDteJVr_LCLD4wM3BMhyQY1fny7cvg/exec';

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
  const [status, setStatus] = useState<{ type: "error" | "success" | "info"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!fish || !yosh || !jshshir || !yonalish || !tel1 || !attestat || !idkarta) {
      setStatus({ type: "error", text: "Iltimos, barcha majburiy maydonlarni to'ldiring." });
      return false;
    }
    if (jshshir.length !== 14 || !/^[0-9]+$/.test(jshshir)) {
      setStatus({ type: "error", text: "JSHSHIR 14 ta raqamdan iborat bo'lishi kerak." });
      return false;
    }
    if (!roziman) {
      setStatus({ type: "error", text: "Shaxsiy ma'lumotlaringiz ko'rib chiqilishiga rozi bo'lishingiz kerak." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setLoading(true);
    setStatus({ type: "info", text: "Arizangiz yuborilmoqda..." });

    try {
      const attestatData = attestat ? await toBase64(attestat) : "";
      const idkartaData = idkarta ? await toBase64(idkarta) : "";

      const attestatPayload = attestat ? { data: attestatData, type: attestat.type, name: attestat.name } : null;
      const idkartaPayload = idkarta ? { data: idkartaData, type: idkarta.type, name: idkarta.name } : null;

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ fish, yosh, jshshir, yonalish, tel1, tel2, attestat: attestatPayload, idkarta: idkartaPayload }),
      });

      // Try to parse server response for success/failure and show error if any
      try {
        const txt = await res.text();
        const json = txt ? JSON.parse(txt) : null;
        if (json && json.success === false) {
          throw new Error(json.error || "Server returned an error");
        }
      } catch (err) {
        if (err instanceof Error) throw err;
      }

      setStatus({ type: "success", text: "Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz." });
      setSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Noma'lum xatolik yuz berdi.";
      setStatus({ type: "error", text: `Xatolik: ${message}` });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-bg-dark pt-24 pb-16" id="main-content">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">Arizangiz qabul qilindi</h1>
            <p className="mt-4 text-base text-text-soft">
              Sizning ma'lumotlaringiz qabul qilindi va qabul komissiyasi tez orada siz bilan bog'lanadi.
            </p>
            <div className="mt-8" data-page-back="true">
              <GlassCard gradientBorder className="inline-block">
                <Link href="/" className="flex px-4 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-blue-500">
                  Bosh sahifaga qaytish
                </Link>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-dark pt-24 pb-16" id="main-content">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="mb-6 flex items-center gap-3 text-sm font-semibold text-text-soft" data-page-back="true">
          <div>
            <Link href="/ariza" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-2 py-1.5 text-sm font-medium text-text-soft hover:text-white">
                <ArrowLeft className="mr-2 inline-block h-4 w-4" />
                Orqaga
              </Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/25 via-indigo-600/15 to-cyan-500/10 px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="relative">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-white md:text-5xl">
              Onlayn ariza formasi
            </h1>
            <p className="mt-4 max-w-2xl text-base text-text-soft md:text-lg">
              Iltimos, barcha majburiy maydonlarni to'liq to'ldiring va kerakli hujjatlarni yuklang.
            </p>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="grid gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">F.I.Sh <span className="text-red-400">*</span></label>
              <input
                value={fish}
                onChange={(e) => setFish(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                placeholder="Familiya Ism Sharif"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Yoshi <span className="text-red-400">*</span></label>
                <input
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
                <label className="mb-2 block text-sm font-medium text-white">JSHSHIR <span className="text-red-400">*</span></label>
                <input
                  value={jshshir}
                  onChange={(e) => setJshshir(e.target.value)}
                  maxLength={14}
                  className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                  placeholder="14 ta raqam"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Yo'nalish <span className="text-red-400">*</span></label>
              <select
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
                <label className="mb-2 block text-sm font-medium text-white">Telefon 1 <span className="text-red-400">*</span></label>
                <input
                  type="tel"
                  value={tel1}
                  onChange={(e) => setTel1(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white outline-none transition focus:border-primary"
                  placeholder="+998 90 000 00 00"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Qo'shimcha telefon</label>
                <input
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
                <label className="mb-2 block text-sm font-medium text-white">Attestat <span className="text-red-400">*</span></label>
                <label htmlFor="attestat" className="flex items-center justify-between rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white transition hover:border-primary cursor-pointer">
                  <span>{attestatName}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">Yuklash</span>
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
                <label className="mb-2 block text-sm font-medium text-white">ID karta <span className="text-red-400">*</span></label>
                <label htmlFor="idkarta" className="flex items-center justify-between rounded-2xl border border-white/10 bg-bg-mid px-4 py-3 text-white transition hover:border-primary cursor-pointer">
                  <span>{idkartaName}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">Yuklash</span>
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

            <label className="inline-flex items-center gap-3 text-sm text-text-soft">
              <input
                type="checkbox"
                checked={roziman}
                onChange={(e) => setRoziman(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-bg-mid text-primary focus:ring-primary"
              />
              Shaxsiy ma'lumotlarim qabul komissiyasi tomonidan ko'rib chiqilishiga roziman.
            </label>

            {status && (
              <div className={`rounded-2xl border p-4 ${status.type === "error" ? "border-red-500 bg-red-500/10 text-red-200" : status.type === "success" ? "border-emerald-500 bg-emerald-500/10 text-emerald-200" : "border-blue-500 bg-blue-500/10 text-blue-200"}`}>
                {status.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Yuborilmoqda..." : "✅ Ariza yuborish"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
