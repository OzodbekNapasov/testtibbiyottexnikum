"use client";

import { MapPin, ExternalLink, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CampusSection() {
  return (
    <section id="kampus" className="py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="O'uq Binosi va Kampus Manzili"
            subtitle="Shahrisabz Tibbiyot Texnikumi zamonaviy o'quv korpusi va joylashuv xaritasi"
          />
        </ScrollReveal>

        <div className="mt-12 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
 
              <div className="flex items-center justify-center gap-2 mb-8">
                <Building2 className="h-6 w-6 text-blue-400" />
                <h3 className="font-bold text-lg sm:text-xl uppercase tracking-widest text-white text-center">
                  ASOSIY O&apos;QUV KAMPUSI
                </h3>
              </div>
 
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl group">
                <img
                  src="/images/main building.jpg"
                  alt="Shahrisabz Tibbiyot Texnikumi Asosiy O'quv Kampusi"
                  className="w-full h-[300px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block rounded-full bg-blue-600/80 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-2">
                    Bosh Bino
                  </span>
                  <h4 className="font-bold text-xl sm:text-2xl text-white">Shahrisabz Tibbiyot Texnikumi</h4>
                  <p className="text-xs sm:text-sm text-text-soft flex items-center gap-1.5 mt-1">
                    <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Qashqadaryo viloyati, Shahrisabz sh., Ipak Yuli ko&apos;chasi, 36A-uy</span>
                  </p>
                </div>
              </div>
 
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-xl h-[260px] sm:h-[320px] relative">
                <iframe
                  title="Shahrisabz Tibbiyot Texnikumi Joylashuv Xaritasi"
                  src="https://maps.google.com/maps?q=39.08578,66.839256&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://maps.app.goo.gl/UzvQDQf1e9fVqMHbA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 hover:from-purple-800 hover:to-blue-700 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-purple-900/30 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Batafsil xaritada ochish</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
