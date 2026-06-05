"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Lightbox, { type RenderSlideProps } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { X } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { aboutContent, statistics } from "@/lib/constants";

const DRAG_CLOSE_THRESHOLD = 120;

export function About() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef<number | null>(null);

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
          alt={slide.alt ?? "Preview image"}
          className="max-h-[88vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  );

  return (
    <section
      id="haqimizda"
      className="section-anchor section-padding relative bg-bg-mid"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center">
              <h2
                className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-center text-gradient"
              >
                Shahrisabz Tibbiyot Texnikumi haqida
              </h2>
              <div className="mt-6 mx-auto w-full max-w-3xl text-center">
                <p
                  id="about-heading"
                  className="text-base font-medium leading-relaxed text-text-soft md:text-lg lg:text-xl"
                >
                  {aboutContent.description}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Premium About image presentation */}
          <ScrollReveal delay={0.1}>
            <div className="relative w-full max-w-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" aria-hidden="true" />
              <div className="relative mx-auto h-[420px] w-full px-4 md:h-[560px] lg:h-[600px]">
                <div className="absolute inset-0 rounded-3xl bg-white/5 shadow-2xl shadow-black/20 ring-1 ring-white/10" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-0 overflow-hidden rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                  aria-label="Rasmni kattalashtirib ko'rish"
                >
                  <div className="h-full w-full origin-center transition-transform duration-[900ms] ease-out hover:scale-[1.02]">
                    <Image
                      src="/images/building.png"
                      alt="Shahrisabz Tibbiyot Texnikumi"
                      width={1920}
                      height={900}
                      priority
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-accent-green/10 pointer-events-none" aria-hidden="true" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-6">
              {statistics.slice(0, 2).map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-5">
                  <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-gradient md:text-3xl">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
<Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
          resetDrag();
        }}
        slides={[{ src: "/images/building.png", alt: "Shahrisabz Tibbiyot Texnikumi" }]}
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
          buttonZoom: () => null,
          buttonNext: () => null,
          buttonPrev: () => null,
        }}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: {
            backgroundColor: "rgba(15, 23, 42, 0.28)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          slide: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
