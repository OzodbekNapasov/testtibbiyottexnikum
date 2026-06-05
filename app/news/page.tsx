import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newsItems } from "@/lib/constants";

export default function NewsPage() {
  return (
    <main className="bg-bg-mid">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            title="Yangiliklar"
            subtitle="So'nggi yangiliklar va e'lonlarni bitta sahifada ko'ring"
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((news) => (
              <Link
                key={news.slug}
                href={`/news/${news.slug}`}
                className="group"
              >
                <GlassCard className="h-full overflow-hidden p-0">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={news.photo}
                      alt={news.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-blue-200">
                      Yangiliklar
                    </span>
                    <h2 className="mt-4 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-emerald-200">
                      {news.title}
                    </h2>
                    <p className="mt-3 text-sm text-text-muted">{news.date}</p>
                    <p className="mt-4 text-sm leading-relaxed text-text-soft">
                      {news.preview}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-300 group-hover:text-emerald-200">
                      <span>Batafsil</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
