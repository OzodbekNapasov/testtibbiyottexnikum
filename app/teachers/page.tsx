"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

type Teacher = {
  id: string;
  name: string;
  position: string;
  photo: string;
  specialty?: string;
  experience?: string;
  description?: string;
};

export default function TeachersPage() {
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`/api/teachers?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setTeachersList(data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <main className="min-h-screen bg-bg-dark pt-28 pb-16" id="main-content">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Back Button */}
        <ScrollReveal>
          <div className="mb-8" data-page-back="true">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-text-soft transition-all hover:text-white hover:bg-white/5 hover:border-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <SectionHeading
            title="Bizning jamoa"
            subtitle="Tajribali va malakali pedagoglar jamoasi bilan tanishing"
          />
        </ScrollReveal>

        {/* Loading State */}
        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <GlassCard hover={false} className="h-full overflow-hidden flex flex-col p-0">
                  <div className="relative aspect-square w-full bg-white/5 rounded-t-2xl" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-2/3 bg-white/10 rounded" />
                    <div className="h-4 w-1/2 bg-white/5 rounded" />
                    <div className="h-3 w-1/3 bg-white/5 rounded" />
                    <div className="h-12 w-full bg-white/5 rounded mt-4" />
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        ) : teachersList.length === 0 ? (
          /* Empty State */
          <div className="mt-12 text-center py-16 rounded-2xl border border-white/5 bg-white/5">
            <User className="h-12 w-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-soft">Pedagoglar ro&apos;yxati bo&apos;sh.</p>
          </div>
        ) : (
          /* Teachers Grid */
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
            {teachersList.map((teacher, index) => {
              const showPhoto = Boolean(teacher.photo) && !failedImages[teacher.id];
              return (
                <ScrollReveal key={teacher.id} delay={index * 0.05} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full flex flex-col"
                  >
                    <GlassCard
                      gradientBorder
                      hover={false}
                      className="group h-full overflow-hidden flex flex-col p-4 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
                    >
                      {/* Photo */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent-green/20">
                        {showPhoto ? (
                          <Image
                            src={teacher.photo}
                            alt={teacher.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                            onError={() =>
                              setFailedImages((prev) => ({ ...prev, [teacher.id]: true }))
                            }
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <User className="h-16 w-16 text-white/30" />
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* Info */}
                      <div className="pt-5 px-1 pb-1 flex-1 flex flex-col">
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                          {teacher.name}
                        </h3>
                        <p className="mt-1.5 text-sm font-semibold text-primary">
                          {teacher.position}
                        </p>
                        {teacher.specialty && (
                          <p className="mt-1.5 text-xs text-text-muted">
                            Mutaxassisligi: <strong className="text-text-soft">{teacher.specialty}</strong>
                          </p>
                        )}
                        {teacher.experience && (
                          <p className="mt-1 text-xs text-text-muted">
                            Ish staji: <strong className="text-text-soft">{teacher.experience}</strong>
                          </p>
                        )}
                        {teacher.description && (
                          <p className="mt-2.5 text-sm text-text-soft leading-relaxed">
                            {teacher.description}
                          </p>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16">
            <GlassCard gradientBorder hover={false} className="text-center">
              <div className="p-6 md:p-10">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white md:text-3xl">
                  Bizning jamoamizga qo&apos;shiling
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-base text-text-soft md:text-lg">
                  Zamonaviy tibbiyot ta&apos;limi sohasida faoliyat yuritishni xohlaysizmi? Biz
                  bilan bog&apos;laning va imkoniyatlarni kashf eting.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/#qabul"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-500/35 bg-rose-500/15 px-8 py-4 text-sm font-semibold text-rose-200 transition-all hover:bg-rose-500/20"
                  >
                    Qabul holati (Yopilgan)
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
