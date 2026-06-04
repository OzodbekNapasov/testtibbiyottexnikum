"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Gallery() {
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
            title="Galereya"
            subtitle="Zamonaviy auditoriyalar, laboratoriyalar va amaliyot jarayonlari"
          />
        </ScrollReveal>

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {galleryItems.map((item, index) => {
            const isPhoto = item.variant === "photo";
            return (
              <ScrollReveal key={item.src} delay={index * 0.05}>
<div className="group relative block overflow-hidden rounded-none border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    quality={100}
                    priority={index < 2}
                    unoptimized={false}
                    className={cn(
                      "w-full transition-transform duration-700 group-hover:scale-[1.02] rounded-none",
                      isPhoto
                        ? "aspect-square object-cover object-center"
                        : "aspect-square bg-bg-deep object-contain p-4",
                    )}
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm ring-1 ring-white/10">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-blue-200">
                      {item.category}
                    </span>
                    <p
                      id={index === 0 ? "gallery-heading" : undefined}
                      className="mt-2 text-left text-sm font-medium text-white drop-shadow-sm"
                    >
                      {item.alt}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
