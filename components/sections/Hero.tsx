"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, HeartPulse, Activity, Plus } from "lucide-react";
import { heroContent, statistics } from "@/lib/constants";
import { siteConfig } from "@/lib/site-config";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { FloatingIcons } from "@/components/effects/FloatingIcons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function MedicalIllustration() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-emerald-500/10 to-transparent blur-3xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex h-full items-center justify-center">
        <motion.div
          className="glass-strong relative flex h-72 w-72 items-center justify-center rounded-full md:h-80 md:w-80"
          animate={reducedMotion ? undefined : { y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-4 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-dashed border-primary/30" />

          <motion.div
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-12 rounded-full border border-emerald-500/20"
          />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 shadow-2xl shadow-primary/40">
              <HeartPulse className="h-10 w-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex gap-3">
              <div className="glass flex h-10 w-10 items-center justify-center rounded-xl">
                <Plus className="h-5 w-5 text-accent-red" />
              </div>
              <div className="glass flex h-10 w-10 items-center justify-center rounded-xl">
                <Activity className="h-5 w-5 text-accent-green" />
              </div>
            </div>
          </div>

          {/* DNA helix motif */}
          <svg
            className="absolute inset-0 h-full w-full opacity-20"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              d="M100 20 Q130 60 100 100 Q70 140 100 180"
              fill="none"
              stroke="url(#dnaGrad)"
              strokeWidth="2"
            />
            <path
              d="M100 20 Q70 60 100 100 Q130 140 100 180"
              fill="none"
              stroke="url(#dnaGrad)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {statistics.slice(0, 2).map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass absolute hidden rounded-2xl px-4 py-3 lg:block"
            style={{
              top: i === 0 ? "10%" : "auto",
              bottom: i === 1 ? "15%" : "auto",
              right: i === 0 ? "-5%" : "auto",
              left: i === 1 ? "-5%" : "auto",
            }}
            animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-white">
              {stat.value}
              {stat.suffix}
            </p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh items-center overflow-hidden pt-20"
      aria-label="Asosiy bo'lim"
    >
      <div className="absolute inset-0 mesh-bg" />
      <div className="noise-overlay absolute inset-0" />
      <MouseGlow />

      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        animate={reducedMotion ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent-green/15 blur-3xl"
        animate={reducedMotion ? undefined : { x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <FloatingIcons />

      <motion.div style={reducedMotion ? undefined : { y, opacity }} className="relative z-10 w-full">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-text-soft">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
              {siteConfig.admissionStatus}
            </span>

            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-gradient">{heroContent.title.split(" ").slice(0, 2).join(" ")}</span>
              <br />
              <span className="text-white">
                {heroContent.title.split(" ").slice(2).join(" ")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              {heroContent.subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <motion.button
                onClick={() => (window as any).openModal?.()}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/50"
              >
                <span className="absolute inset-0 bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  {heroContent.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
              <MagneticButton href="#yonalishlar" variant="secondary">
                {heroContent.secondaryCta}
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <MedicalIllustration />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
