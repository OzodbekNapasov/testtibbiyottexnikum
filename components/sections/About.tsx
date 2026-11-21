"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Lightbox, { type RenderSlideProps } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { X, ZoomIn, ShieldCheck, Stethoscope, Award, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { aboutContent } from "@/lib/constants";

const DRAG_CLOSE_THRESHOLD = 120;

const highlights = [
  {
    icon: ShieldCheck,
    title: "Rasmiy litsenziya",
    desc: "Davlat namunasidagi diplom va №273087 faol litsenziya",
  },
  {
    icon: Stethoscope,
    title: "100% amaliyot",
    desc: "Shahrisabzdagi yetakchi shifoxona va klinikalarda amaliyot",
  },
  {
    icon: Award,
    title: "3 ta bepul sertifikat",
    desc: "Farmatsevtika, Logopediya, Fizioterapiya va Massaj",
  },
  {
    icon: Building2,
    title: "Zamonaviy kampus",
    desc: "Simulyatorlar, laboratoriyalar va shinam auditoriyalar",
  },
];

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
              id="about-heading"
              className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-center text-gradient"
            >
              Shahrisabz Tibbiyot Texnikumi haqida
            </h2>
            <div className="mt-5 mx-auto w-full max-w-3xl text-center">
              <p className="text-base font-medium leading-relaxed text-text-soft md:text-lg lg:text-xl">
                {aboutContent.description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Building image presentation */}
        <ScrollReveal delay={0.1}>
          <div className="relative mt-10 w-full overflow-hidden rounded-3xl">
            <div className="relative mx-auto h-[320px] w-full sm:h-[440px] md:h-[520px] lg:h-[580px]">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-2xl shadow-black/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 cursor-zoom-in"
                aria-label="Rasmni kattalashtirib ko'rish"
              >
                <Image
                  src="/images/building.png"
                  alt="Shahrisabz Tibbiyot Texnikumi binosi"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-bg-dark/70 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md border border-white/15 opacity-90 transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4 text-cyan-300" />
                  <span>Kattalashtirish</span>
                </div>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Balanced 4-column Highlights Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={0.12 + idx * 0.06} className="h-full">
                <div className="glass flex h-full flex-col rounded-2xl p-5 transition-colors hover:border-white/15 hover:bg-white/[0.06]">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
          resetDrag();
        }}
        slides={[{ src: "/images/building.png", alt: "Shahrisabz Tibbiyot Texnikumi binosi" }]}
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
              className="absolute right-4 top-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30 transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer"
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
            backgroundColor: "rgba(5, 8, 22, 0.78)",
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
