"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plus, Minus, Building2, GraduationCap, ImageIcon, MessageCircle, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Menu section structure
type MenuItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type MenuSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    id: "institution",
    title: "Texnikum",
    icon: <Building2 className="w-5 h-5" />,
    items: [
      { label: "Biz haqimizda", href: "#haqimizda" },
      { label: "Jamoamiz", href: "/teachers" },
      { label: "Litsenziya", href: "#litsenziya" },
    ],
  },
  {
    id: "education",
    title: "Ta'lim",
    icon: <GraduationCap className="w-5 h-5" />,
    items: [
      { label: "Yo'nalishlar", href: "#yonalishlar" },
      { label: "Qabul", href: "#qabul" },
      { label: "Ariza topshirish", href: "/ariza" },
    ],
  },
  {
    id: "media",
    title: "Media",
    icon: <ImageIcon className="w-5 h-5" />,
    items: [
      { label: "Galereya", href: "#galereya" },
    ],
  },
  {
    id: "contact",
    title: "Aloqa",
    icon: <MessageCircle className="w-5 h-5" />,
    items: [
      { label: "Biz bilan bog'lanish", href: "#aloqa" },
      { label: "Eng ko'p beriladigan savollar", href: "/faq" },
    ],
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [openDesktopSection, setOpenDesktopSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [showHeaderHome, setShowHeaderHome] = useState(true);

  // Check if a link is a hash link
  const isHashLink = (href: string) => href.startsWith("#");

  // Handle navigation
  const handleNavigation = useCallback((href: string) => {
    if (isHashLink(href)) {
      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If user is on another page, navigate to the homepage with the hash
        // so the target section (which lives on the home page) can be found.
        window.location.href = `/${href}`;
      }
    }
  }, [isHomePage]);

  // Toggle accordion section
  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Close menu and navigate
  const closeMenuAndNavigate = useCallback((href: string) => {
    setMobileOpen(false);
    setOpenSections([]);
    setTimeout(() => {
      handleNavigation(href);
    }, 150);
  }, [handleNavigation]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSections([]);
    setOpenDesktopSection(null);
    // Hide header-level home link if the current page provides its own back link
    try {
      const hasPageBack = Boolean(document.querySelector('[data-page-back]'));
      setShowHeaderHome(!hasPageBack);
    } catch {
      setShowHeaderHome(true);
    }

    // Also observe DOM mutations in case page-level back link is added after header mounts
    let timer: number | undefined;
    try {
      const observer = new MutationObserver(() => {
        const hasPageBack = Boolean(document.querySelector('[data-page-back]'));
        setShowHeaderHome(!hasPageBack);
      });
      observer.observe(document.body, { childList: true, subtree: true });

      // Also re-check shortly after mount to catch components that render slightly later
      timer = window.setTimeout(() => {
        const hasPageBack = Boolean(document.querySelector('[data-page-back]'));
        setShowHeaderHome(!hasPageBack);
      }, 120);

      return () => {
        observer.disconnect();
        if (timer) clearTimeout(timer);
      };
    } catch {
      // ignore
    }
  }, [pathname]);

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

        <nav
          className="hidden lg:flex items-center gap-2"
          aria-label="Desktop navigatsiya"
          onMouseLeave={() => setOpenDesktopSection(null)}
        >
          {/* Show a small 'Back to Home' link when not on homepage */}
          {!isHomePage && showHeaderHome && (
            <Link href="/" className="mr-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              Bosh sahifaga qaytish
            </Link>
          )}
          {menuSections.map((section) => (
            <div key={section.id} className="relative">
              <button
                type="button"
                onMouseEnter={() => setOpenDesktopSection(section.id)}
                onFocus={() => setOpenDesktopSection(section.id)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                aria-expanded={openDesktopSection === section.id}
                aria-haspopup="true"
              >
                {section.title}
              </button>

              <AnimatePresence>
                {openDesktopSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full z-[70] mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-bg-mid/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setOpenDesktopSection(null);
                          handleNavigation(item.href);
                        }}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-text-soft transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-text-muted" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <span className="hidden items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1.5 text-xs font-medium text-accent-green xl:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
          {siteConfig.admissionStatus}
        </span>

        {/* Mobile: show home link when not on homepage */}
        {!isHomePage && showHeaderHome && (
          <Link href="/" className="ml-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 md:hidden">
            Bosh sahifaga qaytish
          </Link>
        )}

        <a
          href="#aloqa"
          onClick={() => handleNavigation("#aloqa")}
          className="hidden group relative rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 bg-gradient-to-r from-[#071a4d] via-[#1d4ed8] to-[#10b981] transition-all duration-300 hover:scale-[1.05] hover:shadow-xl md:inline-flex"
        >
          <span className="relative inline-flex items-center gap-2">
            Aloqa
            <span className="text-white transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </a>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl glass lg:hidden relative z-[60]"
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
            {/* Backdrop */}
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
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 top-0 z-[101] flex flex-col overflow-y-auto bg-gradient-to-b from-bg-dark via-bg-mid to-bg-deep"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
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
              <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobil navigatsiya">
                {/* Admission Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-4 py-2.5"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
                  <span className="text-sm font-semibold text-accent-green">
                    {siteConfig.admissionStatus}
                  </span>
                </motion.div>

                {/* Accordion Sections */}
                <div className="space-y-2">
                  {menuSections.map((section, sectionIndex) => {
                    const isOpen = openSections.includes(section.id);
                    return (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + sectionIndex * 0.08 }}
                        className="overflow-hidden rounded-2xl border border-white/5 bg-white/[2%]"
                      >
                        {/* Section Header */}
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id)}
                          className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              {section.icon}
                            </span>
                            <span className="text-base font-semibold text-white">
                              {section.title}
                            </span>
                          </div>
                          {isOpen ? (
                            <Minus className="h-5 w-5 text-text-muted" />
                          ) : (
                            <Plus className="h-5 w-5 text-text-muted" />
                          )}
                        </button>

                        {/* Section Items */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 px-2 pb-3">
                                  {section.items.map((item) => (
                                  <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => closeMenuAndNavigate(item.href)}
                                    className="group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all hover:bg-white/5"
                                  >
                                    <span className="text-sm font-medium text-text-soft group-hover:text-white">
                                      {item.label}
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1" />
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Footer CTA */}
              <div className="border-t border-white/5 px-5 py-6">
                <motion.a
                  href="/ariza"
                  onClick={() => closeMenuAndNavigate("/ariza")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group relative flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-6 py-4.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]"
                >
                  <span className="relative flex items-center gap-2">
                    <span className="text-lg">🎓</span>
                    Qabulga ariza topshirish
                  </span>
                </motion.a>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 text-center text-xs text-text-muted"
                >
                  {siteConfig.address}
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
