"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const slides = galleryItems.map((item) => ({ src: item.src, alt: item.alt }));

  return (
    <section
      id="galereya"
      className="section-anchor section-padding relative bg-bg-mid"
      aria-labelledby="gallery-heading"
    >
      <div className="absolute inset-0 mesh-bg opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            id="gallery-heading"
            title="Galereya"
            subtitle="Zamonaviy auditoriyalar, laboratoriyalar va amaliyot jarayonlari"
          />
        </ScrollReveal>

        <div
          className={cn(
            "mx-auto grid gap-5",
            galleryItems.length === 1
              ? "max-w-xl grid-cols-1"
              : "max-w-6xl sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {galleryItems.map((item, index) => {
            const isPhoto = item.variant === "photo";
            return (
              <ScrollReveal key={item.src} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-zoom-in"
                  aria-label={`${item.alt} — kattalashtirish`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      quality={85}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={cn(
                        "transition-transform duration-700 group-hover:scale-[1.08]",
                        isPhoto
                          ? "object-cover object-center"
                          : "bg-bg-deep object-contain p-4",
                      )}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/20 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-95" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <span className="inline-block rounded-full bg-primary/25 border border-primary/30 px-3 py-1 text-xs font-medium text-blue-200 backdrop-blur-sm">
                      {item.category}
                    </span>
                    <p className="mt-2 text-sm font-medium text-white drop-shadow-sm">
                      {item.alt}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={lightboxIndex}
          plugins={[Zoom]}
          carousel={{ finite: true }}
          controller={{ closeOnBackdropClick: true }}
          zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 2, doubleClickDelay: 300 }}
        />
      </div>
    </section>
  );
}
