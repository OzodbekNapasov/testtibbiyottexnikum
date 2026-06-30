"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { missionContent } from "@/lib/constants";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Mission() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-bg-deep"
      aria-labelledby="mission-heading"
    >
      <MouseGlow />

      <motion.div
        style={reducedMotion ? undefined : { y: bgY }}
        className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        style={reducedMotion ? undefined : { y: bgY }}
        className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-accent-green/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="noise-overlay absolute inset-0" />

      <div className="relative mx-auto max-w-5xl text-center">
        <ScrollReveal>
          <div className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent-green shadow-xl shadow-primary/30">
            <Target className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>

          <h2
            id="mission-heading"
            className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {missionContent.title}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-text-soft md:text-xl lg:text-2xl">
            {missionContent.description}
          </p>

        </ScrollReveal>
      </div>
    </section>
  );
}
