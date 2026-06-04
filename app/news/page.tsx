"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { news } from "@/lib/constants";

export default function NewsPage() {
  return (
    <main className="min-h-screen mesh-bg pt-24 pb-16">
      <div className="page-container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white mb-4">
            Yangiliklar
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Shahrisabz Tibbiyot Texnikumi yangiliklari va voqealarini kuzating
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/news/${item.slug}`} className="group block h-full">
                <article className="glass rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/30 border border-white/5">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(item.date).toLocaleDateString("uz-UZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-text-muted text-sm line-clamp-3 mb-4">
                      {item.previewText}
                    </p>

                    {/* Read More Button */}
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                      Davomini o&apos;qish
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-4">
              <svg
                className="h-8 w-8 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Yangiliklar hali mavjud emas
            </h3>
            <p className="text-text-muted">
              Tez kunda yangi yangiliklar bilan qaytamiz!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
