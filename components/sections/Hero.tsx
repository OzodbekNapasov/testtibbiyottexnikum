"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Phone, List } from "lucide-react";

import { heroContent } from "@/lib/constants";
import { siteConfig } from "@/lib/site-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh items-center overflow-hidden bg-gradient-to-b from-[#071a4d] via-[#0f2d6b] to-[#0a5c4a]"
      aria-label="Asosiy bo'lim"
    >
      {/* Building background image with light overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="relative h-full w-full">
          <motion.div
            className="absolute inset-0"
            style={reducedMotion ? undefined : { y }}
            initial={reducedMotion ? undefined : { scale: 1.05 }}
            animate={reducedMotion ? undefined : { scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/building.png"
              alt="Shahrisabz Tibbiyot Texnikumi"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/30" />
        </div>
      </div>

      {/* Rainbow gradient diffusions */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 bottom-1/4 h-60 w-60 rounded-full bg-purple-400/8 blur-3xl" />

      {/* Bottom grid pattern with waveform */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden">
        {/* Grid lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <pattern id="heroGrid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#1e3a5f" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
        {/* Energy waveform */}
        <svg
          className="absolute bottom-0 h-20 w-full opacity-[0.06]"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40 Q100 10 200 35 T400 30 T600 45 T800 20 T1000 40 T1200 25 L1200 60 L0 60Z"
            fill="#2563eb"
            opacity="0.5"
          />
          <path
            d="M0 50 Q150 20 300 45 T600 35 T900 50 T1200 30 L1200 60 L0 60Z"
            fill="#10b981"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Corner emblem */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 opacity-[0.08]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-lg">
          <span className="text-2xl font-black tracking-tighter text-white">STT</span>
        </div>
      </div>

      <motion.div style={reducedMotion ? undefined : { y, opacity }} className="relative z-10 w-full">
        <div className="mx-auto max-w-lg px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Glowing green pill status badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {siteConfig.admissionStatus}
            </motion.span>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)] md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Shahrisabz Tibbiyot Texnikumi
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/90 text-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] md:text-lg"
            >
              {heroContent.subtitle}
            </motion.p>

            {/* Single large glassmorphism CTA button - split in two halves */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 w-full max-w-md"
            >
              <button
                onClick={() => window.location.assign("/ariza")}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/25 via-cyan-400/20 to-blue-600/25 backdrop-blur-xl shadow-2xl shadow-blue-500/25 ring-1 ring-white/25 transition-all duration-300 hover:shadow-blue-500/35 hover:from-blue-500/30 hover:via-cyan-400/25 hover:to-blue-600/30"
              >
                {/* Liquid glass shine layers */}
                <div className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.3),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.25),transparent_50%),radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_50%)]" />
                </div>
                {/* Liquid ripple border */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/30 via-blue-500/25 to-cyan-300/30 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                <div className="relative flex items-center justify-center gap-3 px-6 py-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30 transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="text-base font-semibold text-white transition-colors group-hover:text-cyan-200">Online ariza topshirish</span>
                </div>
              </button>
            </motion.div>

            {/* Two circular card modules side by side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 flex w-full max-w-md gap-3"
            >
              {/* Left: Aloqa */}
              <a
                href="#aloqa"
                className="group relative flex flex-1 flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-blue-600/20 backdrop-blur-xl px-4 py-5 shadow-lg shadow-blue-500/15 ring-1 ring-white/20 transition-all duration-300 hover:from-blue-500/25 hover:via-cyan-400/20 hover:to-blue-600/25 hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                {/* Liquid glass glow behind */}
                <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-cyan-300/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/20">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="relative text-sm font-semibold text-white">Aloqa</span>
                <span className="relative text-[10px] text-white/60">{siteConfig.phone}</span>
              </a>

              {/* Right: Yo'nalishlar */}
              <a
                href="#yonalishlar"
                className="group relative flex flex-1 flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-blue-600/20 backdrop-blur-xl px-4 py-5 shadow-lg shadow-blue-500/15 ring-1 ring-white/20 transition-all duration-300 hover:from-blue-500/25 hover:via-cyan-400/20 hover:to-blue-600/25 hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-cyan-300/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shadow-lg shadow-blue-500/20">
                  <List className="h-5 w-5 text-white" />
                </div>
                <span className="relative text-sm font-semibold text-white">Yo&rsquo;nalishlar</span>
                <span className="relative text-[10px] text-white/60">4 ta yo&rsquo;nalish</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}