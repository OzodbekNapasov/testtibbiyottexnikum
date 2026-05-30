"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn, FileCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { licenseItems } from "@/lib/constants";

export function License() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = licenseItems.map((item) => ({ src: item.src, alt: item.alt }));

  return (
    <section
      id="litsenziya"
      className="section-anchor section-padding relative"
      aria-labelledby="license-heading"
    >
      <div className="absolute inset-0 mesh-bg opacity-40" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            title="Litsenziya"
            subtitle="Ta'lim faoliyatini amalga oshirish uchun berilgan rasmiy litsenziya"
          />
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
          {licenseItems.map((item, index) => (
            <ScrollReveal key={item.src} delay={index * 0.1}>
              <button
                type="button"
                className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-bg-surface/50 text-left shadow-xl shadow-black/20 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                aria-label={`${item.alt} — kattalashtirish`}
              >
                <div className="relative aspect-[3/4] w-full bg-white/5 sm:aspect-[4/5]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-bg-deep/0 opacity-0 transition-all duration-300 group-hover:bg-bg-deep/40 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full glass px-4 py-2">
                      <ZoomIn className="h-5 w-5 text-white" />
                      <span className="text-sm font-medium text-white">Kattalashtirish</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-white/10 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p
                      id={index === 0 ? "license-heading" : undefined}
                      className="font-[family-name:var(--font-heading)] font-semibold text-white"
                    >
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">{item.caption}</p>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-muted">
            Litsenziya raqami: <span className="font-medium text-text-soft">№273087</span> ·
            Holati: <span className="font-medium text-accent-green">Faol</span>
          </p>
        </ScrollReveal>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </section>
  );
}
