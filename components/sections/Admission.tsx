"use client";

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
            className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -right-10 bottom-10 h-60 w-60 rounded-full bg-accent-green/20 blur-3xl"
            animate={{ y: [0, -32, 0], x: [0, -16, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5"
            animate={{ rotate: [0, 90, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <div className="gradient-border rounded-3xl p-px">
            <div className="rounded-3xl bg-bg-deep/40 p-10 backdrop-blur-xl ring-1 ring-white/10 md:p-16">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-green/40 bg-accent-green/15 px-4 py-2 text-sm font-semibold text-accent-green">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
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
                <motion.button
                  onClick={() => window.location.assign("/ariza")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/50"
                >
                  <span className="absolute inset-0 bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative flex items-center gap-2">
                    {admissionContent.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
