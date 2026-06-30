"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Testimonials() {
  const reducedMotion = useReducedMotion();
  const plugins = reducedMotion
    ? []
    : [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, plugins);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-padding relative bg-bg-deep" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            title="Talabalar fikrlari"
            subtitle="Bitiruvchilarimiz va talabalarimiz tajribalarini baham ko'rishmoqda"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_80%] lg:flex-[0_0_60%]"
                  >
                    <div className="glass-strong relative rounded-3xl p-8 md:p-10">
                      <Quote
                        className="absolute right-8 top-8 h-10 w-10 text-primary/20"
                        aria-hidden="true"
                      />

                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-full object-cover object-top ring-2 ring-primary/30"
                        />
                        <div>
                          <p
                            id={index === 0 ? "testimonials-heading" : undefined}
                            className="font-[family-name:var(--font-heading)] font-bold text-white"
                          >
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-text-muted">{testimonial.program}</p>
                          <div className="mt-1 flex gap-0.5" aria-label={`${testimonial.rating} yulduz`}>
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-accent-green text-accent-green"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="mt-6 text-base leading-relaxed text-text-soft md:text-lg">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                type="button"
                onClick={scrollPrev}
                className="flex h-12 w-12 items-center justify-center rounded-full glass transition-colors hover:bg-white/10"
                aria-label="Oldingi sharh"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="flex h-12 w-12 items-center justify-center rounded-full glass transition-colors hover:bg-white/10"
                aria-label="Keyingi sharh"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
