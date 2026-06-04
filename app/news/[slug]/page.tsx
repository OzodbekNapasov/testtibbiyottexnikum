"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { news } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [newsItem, setNewsItem] = useState(news[0]);

  useEffect(() => {
    const slug = params?.slug as string;
    const found = news.find((n) => n.slug === slug);
    if (found) {
      setNewsItem(found);
    }
  }, [params?.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!newsItem) {
    return (
      <main className="min-h-screen mesh-bg pt-24 pb-16">
        <div className="page-container section-padding text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Yangilik topilmadi
          </h1>
          <button
            onClick={() => router.push("/news")}
            className="text-primary hover:underline"
          >
            Orqaga qaytish
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen mesh-bg pt-24 pb-16">
      <div className="page-container section-padding">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <button
            onClick={() => router.push("/news")}
            className="inline-flex items-center gap-2 text-text-soft hover:text-white transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Yangiliklar ro&apos;yxatiga qaytish
          </button>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-text-muted text-sm mb-4">
              <span className="inline-flex items-center gap-2">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(newsItem.date)}
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {newsItem.title}
            </h1>
          </header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8"
          >
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/30 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-text-soft whitespace-pre-line leading-relaxed text-lg">
              {newsItem.fullText}
            </div>
          </div>

          {/* Video Embed */}
          {newsItem.videoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white mb-4">
                Video materiallar
              </h2>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass">
                <iframe
                  src={newsItem.videoUrl}
                  title={newsItem.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}

          {/* Share / Back */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => router.push("/news")}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Barcha yangiliklar
            </button>
          </motion.div>
        </motion.article>
      </div>
    </main>
  );
}
