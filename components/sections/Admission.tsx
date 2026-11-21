"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { admissionContent } from "@/lib/constants";
import { siteConfig } from "@/lib/site-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Admission() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="qabul"
      className="section-anchor section-padding relative overflow-hidden"
      aria-labelledby="admission-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary/80 to-accent-green/60 opacity-90" />
      <div className="absolute inset-0 mesh-bg opacity-20" aria-hidden="true" />
      <div className="noise-overlay absolute inset-0" />

      {!reducedMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute -right-10 bottom-10 h-60 w-60 rounded-full bg-accent-green/20 blur-3xl"
            animate={{ y: [0, -32, 0], x: [0, -16, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5"
            animate={{ rotate: [0, 90, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <div className="gradient-border rounded-3xl p-px">
            <div className="rounded-3xl bg-bg-deep/40 p-8 sm:p-10 backdrop-blur-xl ring-1 ring-white/10 md:p-16">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-200">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                {siteConfig.admissionStatus}
              </p>

              <h2
                id="admission-heading"
                className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white drop-shadow-sm md:text-5xl lg:text-6xl"
              >
                {admissionContent.title}
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base text-text-soft md:text-lg">
                {admissionContent.description}
              </p>

              <div className="mt-10">
                <Link
                  href="/#aloqa"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/50 active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative flex items-center gap-2">
                    {admissionContent.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
