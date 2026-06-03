"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Lightbox, { type RenderSlideProps } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn, FileCheck, X } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { licenseItems } from "@/lib/constants";

const DRAG_CLOSE_THRESHOLD = 120;

export function License() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef<number | null>(null);

  const slides = licenseItems.map((item) => ({ src: item.src, alt: item.alt }));

  const dragProgress = useMemo(
    () => Math.min(Math.max(dragY / DRAG_CLOSE_THRESHOLD, 0), 1),
    [dragY],
  );
  const slideScale = 1 - dragProgress * 0.06;
  const slideOpacity = 1 - dragProgress * 0.18;

  const resetDrag = () => {
    setIsDragging(false);
    setDragY(0);
    startYRef.current = null;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startYRef.current = event.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startYRef.current === null) return;
    const delta = event.clientY - startYRef.current;
    setDragY(delta > 0 ? delta : 0);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    if (dragY >= DRAG_CLOSE_THRESHOLD) {
      setLightboxOpen(false);
    }
    resetDrag();
  };

  const renderSlide = ({ slide }: RenderSlideProps) => (
    <div
      className="flex h-full w-full items-center justify-center p-4 md:p-8"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={resetDrag}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="relative max-h-full max-w-full touch-pan-y"
        style={{
          transform: `translateY(${dragY}px) scale(${slideScale})`,
          opacity: slideOpacity,
          transition: isDragging ? "none" : "transform 220ms ease, opacity 220ms ease",
          willChange: "transform, opacity",
        }}
      >
        <img
          src={slide.src}
          alt={slide.alt ?? "License preview"}
          className="max-h-[88vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  );

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
        close={() => {
          setLightboxOpen(false);
          resetDrag();
        }}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        render={{
          slide: renderSlide,
          buttonClose: () => (
            <button
              type="button"
              aria-label="Yopish"
              onClick={() => {
                setLightboxOpen(false);
                resetDrag();
              }}
              className="absolute right-4 top-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30 transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              <X className="h-5 w-5" />
            </button>
          ),
        }}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        styles={{
          container: {
            backgroundColor: "rgba(15, 23, 42, 0.28)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          },
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </section>
  );
}
