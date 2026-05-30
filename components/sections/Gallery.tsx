"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/lib/constants";

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
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            title="Galereya"
            subtitle="Zamonaviy auditoriyalar, laboratoriyalar va amaliyot jarayonlari"
          />
        </ScrollReveal>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6">
          {galleryItems.map((item, index) => (
            <ScrollReveal key={item.src} delay={index * 0.05}>
              <button
                type="button"
                className="group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                aria-label={`${item.alt} — kattalashtirish`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full glass">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-blue-200">
                    {item.category}
                  </span>
                  <p
                    id={index === 0 ? "gallery-heading" : undefined}
                    className="mt-2 text-left text-sm font-medium text-white"
                  >
                    {item.alt}
                  </p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
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
