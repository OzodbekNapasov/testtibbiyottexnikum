"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Newspaper, 
  ArrowRight, 
  X, 
  Play, 
  Video, 
  Search, 
  Tag, 
  Clock,
  BookOpen
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";

type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  videoUrl?: string;
  category?: string;
};

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNewsList(data);
        }
      } catch (error) {
        console.error("News fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Get unique categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    newsList.forEach((item) => {
      if (item.category) {
        cats.add(item.category.trim());
      }
    });
    return ["Barchasi", ...Array.from(cats)];
  }, [newsList]);

  // Filter and search logic
  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesCategory = 
        selectedCategory === "Barchasi" || 
        item.category?.trim() === selectedCategory;

      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [newsList, selectedCategory, searchQuery]);

  // Split featured post and remaining posts
  const { featuredPost, regularPosts } = useMemo(() => {
    if (filteredNews.length === 0) return { featuredPost: null, regularPosts: [] };
    
    // Only make the first post "Featured" if there is no active search/category filter,
    // to keep search results clean and uniform.
    if (searchQuery !== "" || selectedCategory !== "Barchasi") {
      return { featuredPost: null, regularPosts: filteredNews };
    }

    return {
      featuredPost: filteredNews[0],
      regularPosts: filteredNews.slice(1)
    };
  }, [filteredNews, searchQuery, selectedCategory]);

  // Related posts logic inside modal
  const relatedPosts = useMemo(() => {
    if (!selectedNews) return [];
    return newsList
      .filter((item) => item.id !== selectedNews.id)
      .slice(0, 3); // show top 3 other news
  }, [selectedNews, newsList]);

  return (
    <main className="min-h-screen bg-bg-dark pt-24 pb-16 text-white selection:bg-primary selection:text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* Back Button */}
        <ScrollReveal>
          <div className="mb-8" data-page-back="true">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-text-soft transition-all hover:text-white hover:bg-white/10 hover:border-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </div>
        </ScrollReveal>

        {/* Header & Section Title */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-3">
                <Newspaper className="h-3.5 w-3.5" />
                Matbuot xizmati
              </span>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Yangiliklar va E&apos;lonlar
              </h1>
              <p className="mt-3 text-base sm:text-lg text-text-soft leading-relaxed">
                Texnikum faoliyatiga oid so&apos;nggi voqealar, rasmiy e&apos;lonlar va tibbiy ta&apos;lim yutuqlari bilan tanishing.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Search and Category Filters */}
        {!loading && newsList.length > 0 && (
          <ScrollReveal delay={0.05}>
            <div className="mb-10 space-y-6">
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                
                {/* Dynamic Category Tabs */}
                <div className="flex flex-wrap gap-2 items-center">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                          : "bg-white/5 border-white/10 text-text-soft hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted">
                    <Search className="h-4.5 w-4.5" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Yangiliklardan qidirish..."
                    className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-sm text-text-muted">Yangiliklar yuklanmoqda...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          /* Empty State */
          <ScrollReveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center justify-center text-center">
              <GlassCard gradientBorder className="max-w-md p-8 md:p-12 flex flex-col items-center" hover={false}>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-text-muted mb-6">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">
                  Hech narsa topilmadi
                </h3>
                <p className="text-sm text-text-soft leading-relaxed">
                  {searchQuery 
                    ? `"${searchQuery}" so'roviga mos keladigan yangilik topilmadi. Boshqa kalit so'zlardan foydalanib ko'ring.` 
                    : "Hozircha ushbu bo'limda hech qanday yangilik yoki e'lon joylashtirilmagan."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Barchasi");
                    }}
                    className="mt-6 rounded-full bg-primary px-5 py-2 text-xs font-bold text-white transition-all hover:bg-blue-500"
                  >
                    Barchasini ko&apos;rish
                  </button>
                )}
              </GlassCard>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-12">
            
            {/* 1. FEATURED POST (Latest news with bold horizontal layout) */}
            {featuredPost && (
              <ScrollReveal delay={0.1}>
                <div 
                  onClick={() => setSelectedNews(featuredPost)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 shadow-2xl"
                >
                  <div className="grid gap-6 lg:grid-cols-12 items-center">
                    
                    {/* Media content */}
                    <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent-green/20">
                      {featuredPost.image ? (
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-bg-mid">
                          <Newspaper className="h-16 w-16 text-text-muted/30" />
                        </div>
                      )}
                      
                      {featuredPost.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 fill-white ml-0.5" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Text content */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs">
                          {featuredPost.category && (
                            <span className="rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-primary font-bold uppercase tracking-wider text-[10px]">
                              {featuredPost.category}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-text-muted font-medium">
                            <Calendar className="h-3.5 w-3.5" />
                            {featuredPost.date}
                          </span>
                        </div>

                        <h2 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight group-hover:text-primary transition-colors duration-300">
                          {featuredPost.title}
                        </h2>

                        <p className="text-sm sm:text-base text-text-soft leading-relaxed line-clamp-4">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-all duration-300">
                        <span>Batafsil o&apos;qish</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                      </div>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* 2. REGULAR POSTS GRID */}
            {regularPosts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {regularPosts.map((item, index) => {
                  const isYouTube = !!item.videoUrl && !!getYouTubeId(item.videoUrl);
                  const isLocalVideo = !!item.videoUrl && (item.videoUrl.startsWith("/uploads/") || item.videoUrl.endsWith(".mp4") || item.videoUrl.endsWith(".webm") || item.videoUrl.endsWith(".ogg"));
                  const hasVideo = isYouTube || isLocalVideo;

                  return (
                    <ScrollReveal key={item.id} delay={index * 0.05} className="h-full">
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full flex flex-col cursor-pointer"
                        onClick={() => setSelectedNews(item)}
                      >
                        <GlassCard 
                          gradientBorder 
                          className="group h-full overflow-hidden flex flex-col hover:border-primary/20 bg-white/5"
                        >
                          {item.image ? (
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent-green/20">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                              />
                              {hasVideo && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/95 text-white shadow-lg">
                                    <Play className="h-5 w-5 fill-white ml-0.5" />
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            hasVideo && (
                              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-blue-900/40 flex items-center justify-center">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl">
                                  <Video className="h-6 w-6" />
                                </span>
                              </div>
                            )
                          )}

                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-[11px] text-text-muted">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {item.date}
                                </span>
                                {item.category && (
                                  <>
                                    <span className="h-1 w-1 rounded-full bg-white/20" />
                                    <span className="text-primary font-bold uppercase tracking-wider text-[9px]">{item.category}</span>
                                  </>
                                )}
                              </div>

                              <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                {item.title}
                              </h3>

                              <p className="text-xs sm:text-sm text-text-soft leading-relaxed line-clamp-3">
                                {item.excerpt}
                              </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs sm:text-sm font-semibold text-white group-hover:text-primary transition-colors">
                              <span>Batafsil o&apos;qish</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* DETAILS MODAL (Fully immersive details page simulation) */}
        <AnimatePresence>
          {selectedNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/85 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-bg-mid shadow-2xl flex flex-col"
              >
                
                {/* Sticky Header with title & close button */}
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-bg-mid/90 p-4 md:px-8 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="font-semibold text-primary uppercase tracking-wider">{selectedNews.category || "Yangilik"}</span>
                    <span>·</span>
                    <span>{selectedNews.date}</span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-text-soft hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                  
                  {/* Article Title */}
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-4xl font-extrabold text-white leading-tight">
                    {selectedNews.title}
                  </h2>

                  {/* Meta Details Row (moved above image/video) */}
                  <div className="flex flex-wrap gap-4 items-center border-y border-white/5 py-4 text-xs sm:text-sm text-text-soft">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Sana: <strong>{selectedNews.date}</strong></span>
                    </div>
                    {selectedNews.category && (
                      <div className="flex items-center gap-1.5">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>Mavzu: <strong>{selectedNews.category}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>O&apos;qish vaqti: <strong>2 daqiqa</strong></span>
                    </div>
                  </div>

                  {/* Main Image at the top of the body if present */}
                  {selectedNews.image && (
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary/10 to-accent-green/10 shadow-lg">
                      <Image
                        src={selectedNews.image}
                        alt={selectedNews.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Full Article Content text */}
                  <div className="text-text-soft text-sm sm:text-base leading-relaxed whitespace-pre-wrap space-y-4 max-w-none font-medium">
                    {selectedNews.content}
                  </div>

                  {/* Embedded Video (Youtube or Local) at the end of the text */}
                  {selectedNews.videoUrl && (
                    <div className="mt-8 border-t border-white/5 pt-8 space-y-4">
                      <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                        <Video className="h-4 w-4 text-primary" />
                        Biriktirilgan video:
                      </h4>
                      {getYouTubeId(selectedNews.videoUrl) ? (
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-lg">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${getYouTubeId(selectedNews.videoUrl)}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (selectedNews.videoUrl.startsWith("/uploads/") || selectedNews.videoUrl.endsWith(".mp4") || selectedNews.videoUrl.endsWith(".webm") || selectedNews.videoUrl.endsWith(".ogg")) ? (
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-lg">
                          <video
                            src={selectedNews.videoUrl}
                            controls
                            className="absolute inset-0 w-full h-full bg-black"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* 3. RELATED POSTS SECTION (Allows continuous browsing) */}
                  {relatedPosts.length > 0 && (
                    <div className="border-t border-white/5 pt-8 mt-12 space-y-6">
                      <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Tavsiya etiladigan boshqa yangiliklar
                      </h4>

                      <div className="grid gap-4 sm:grid-cols-3">
                        {relatedPosts.map((post) => (
                          <div
                            key={post.id}
                            onClick={() => {
                              setSelectedNews(post);
                              // Scroll details modal container to top
                              const container = document.querySelector(".max-h-\\[90vh\\]");
                              if (container) container.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="group p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer space-y-3"
                          >
                            {post.image ? (
                              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-bg-dark border border-white/5">
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            ) : (
                              <div className="relative aspect-[16/10] w-full rounded-lg bg-white/5 flex items-center justify-center text-text-muted">
                                <Newspaper className="h-5 w-5" />
                              </div>
                            )}

                            <div className="space-y-1">
                              <h5 className="font-semibold text-xs sm:text-sm text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                {post.title}
                              </h5>
                              <span className="text-[10px] text-text-muted">{post.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
