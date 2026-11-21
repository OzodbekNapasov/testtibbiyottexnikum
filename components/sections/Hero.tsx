"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, List } from "lucide-react";

import { heroContent } from "@/lib/constants";
import { siteConfig } from "@/lib/site-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { buttonVariants } from "@/components/ui/Button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh items-center overflow-hidden bg-gradient-to-b from-[#071a4d] via-[#0f2d6b] to-[#0a5c4a]"
      aria-label="Asosiy bo'lim"
    >
      {/* Building background image with smooth parallax */}
      <div className="pointer-events-none absolute inset-0">
        <div className="relative h-full w-full">
          <motion.div
            className="absolute inset-0"
            style={reducedMotion ? undefined : { y: bgY }}
            initial={reducedMotion ? undefined : { scale: 1.05 }}
            animate={reducedMotion ? undefined : { scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/main building.jpg"
              alt="Shahrisabz Tibbiyot Texnikumi"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          {/* Stronger dark overlay for crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />
        </div>
      </div>

      {/* Subtle ambient glow layers */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 bottom-1/4 h-60 w-60 rounded-full bg-purple-400/8 blur-3xl" />

      {/* Bottom decorative pattern */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden">
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <pattern id="heroGrid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#1e3a5f" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
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

      <motion.div style={reducedMotion ? undefined : { y: textY, opacity }} className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:pt-36 md:pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left max-w-2xl"
          >
            {/* Admission closed status badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-950/60 backdrop-blur-md px-4 py-2 text-xs font-semibold text-rose-100 shadow-lg"
            >
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              {siteConfig.admissionStatus}
            </motion.span>

            {/* Main Title */}
            <motion.h1
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-left font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Shahrisabz Tibbiyot Texnikumi
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/95 text-left drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] md:text-lg"
            >
              {heroContent.subtitle}
            </motion.p>

            {/* Primary & Secondary Unified Action Buttons */}
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
            >
              <Link
                href="/ariza"
                className={buttonVariants({ variant: "primary", size: "lg", className: "group" })}
              >
                <span>Qabul haqida ma&apos;lumot</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#yonalishlar"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <List className="h-4 w-4 text-cyan-300" />
                <span>Yo&rsquo;nalishlar</span>
              </a>

              <a
                href="#aloqa"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>Aloqa</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
