"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { admissionContent } from "@/lib/constants";
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
      <div className="noise-overlay absolute inset-0" />

      {!reducedMotion && (
        <>
          <motion.div
            className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -right-10 bottom-10 h-60 w-60 rounded-full bg-accent-green/20 blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5"
            animate={{ rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <div className="gradient-border rounded-3xl p-px">
            <div className="rounded-3xl bg-bg-deep/40 p-10 backdrop-blur-xl md:p-16">
              <h2
                id="admission-heading"
                className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white md:text-5xl lg:text-6xl"
              >
                {admissionContent.title}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base text-text-soft md:text-lg">
                {admissionContent.description}
              </p>
              <div className="mt-10">
                <MagneticButton href="#aloqa" variant="primary">
                  {admissionContent.cta}
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
