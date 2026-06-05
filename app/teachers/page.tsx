"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { teachers } from "@/lib/constants";

export default function TeachersPage() {
  return (
    <main className="min-h-screen bg-bg-dark pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Back Button */}
        <ScrollReveal>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-soft transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifaga qaytish
          </Link>
        </ScrollReveal>


        {/* Header */}
        <ScrollReveal>
          <SectionHeading
            title="Bizning jamoa"
            subtitle="Tajribali va malakali pedagoglar jamoasi bilan tanishing"
          />
        </ScrollReveal>

        {/* Teachers Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teachers.map((teacher, index) => (
            <ScrollReveal key={teacher.name} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
<GlassCard gradientBorder className="group h-full overflow-hidden">
                  {/* Photo - Square format with soft rounded corners */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent-green/20">
                    <Image
                      src={teacher.photo}
                      alt={teacher.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'absolute inset-0 flex items-center justify-center';
                          placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user text-white/50"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

{/* Info */}
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                      {teacher.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-primary">
                      {teacher.position}
                    </p>
                    {teacher.specialty && (
                      <p className="mt-1 text-xs text-text-muted">
                        {teacher.specialty}
                      </p>
                    )}
                    {teacher.experience && (
                      <p className="mt-1 text-xs text-text-muted">
                        {teacher.experience}
                      </p>
                    )}
                    {teacher.description && (
                      <p className="mt-2 text-sm text-text-soft">
                        {teacher.description}
                      </p>
                    )}
                    {/* Fallback placeholder icon */}
                    {!teacher.photo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User className="h-16 w-16 text-white/50" />
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Section */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16">
            <GlassCard gradientBorder className="text-center">
              <div className="p-8 md:p-12">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white md:text-3xl">
                  Bizning jamoamizga qo&apos;shiling
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-base text-text-soft md:text-lg">
                  Zamonaviy tibbiyot ta&apos;limi sohasida faoliyat yuritishni xohlaysizmi? 
                  Biz bilan bog&apos;laning va imkoniyatlarni kashf eting.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/#qabul"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-primary/50"
                  >
                    Qabulga ariza topshirish
                  </Link>
                  <Link
                    href="/#aloqa"
                    className="inline-flex items-center justify-center gap-2 rounded-full glass border border-white/10 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Biz bilan bog&apos;laning
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
