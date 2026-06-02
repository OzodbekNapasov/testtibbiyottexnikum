"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled ? "glass-strong py-3 shadow-lg shadow-black/20" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={siteConfig.name}>
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="font-[family-name:var(--font-heading)] text-sm font-bold leading-tight text-white">
            Shahrisabz
            <br />
            <span className="text-xs font-medium text-text-muted">Tibbiyot Texnikumi</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Asosiy navigatsiya">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-soft transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="hidden items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1.5 text-xs font-medium text-accent-green lg:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
          {siteConfig.admissionStatus}
        </span>

        <a
          href="#qabul"
          data-cursor="button"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-blue-500 md:inline-flex"
        >
          Qabul
        </a>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl glass lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-bg-dark/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Fullscreen Menu */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 top-0 z-[101] flex flex-col overflow-y-auto bg-gradient-to-b from-bg-dark via-bg-mid to-bg-deep"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/logo.png"
                    alt={siteConfig.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-white">
                    Shahrisabz
                    <br />
                    <span className="text-xs font-medium text-text-muted">Tibbiyot Texnikumi</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10"
                  aria-label="Menyuni yopish"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Content */}
              <nav className="flex flex-1 flex-col px-5 py-8" aria-label="Mobil navigatsiya">
                {/* Admission Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-4 py-2.5"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
                  <span className="text-sm font-semibold text-accent-green">
                    {siteConfig.admissionStatus}
                  </span>
                </motion.div>

                {/* Menu Links with Staggered Animation */}
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        if (link.href === '/teachers') return;
                      }}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                      className="group flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:bg-white/5"
                    >
                      <span className="text-lg font-semibold text-white group-hover:text-primary">
                        {link.label}
                      </span>
                      <svg
                        className="h-5 w-5 text-text-muted transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => {
                    setMobileOpen(false);
                    (window as any).openModal?.();
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <span className="relative flex items-center gap-2">
                    Qabulga ariza topshirish
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.button>
              </nav>

              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="border-t border-white/5 px-5 py-6"
              >
                <p className="text-xs text-text-muted">
                  {siteConfig.address}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {siteConfig.workingHours}
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
