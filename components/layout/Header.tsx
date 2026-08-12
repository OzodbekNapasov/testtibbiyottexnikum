"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
      { label: "Kontrakt narxlari", href: "/kontrakt" },
      { label: "Qabul", href: "#qabul" },
      { label: "Ariza topshirish", href: "/ariza" },
    ],
  },
  {
    id: "media",
    title: "Media",
    icon: <ImageIcon className="w-5 h-5" />,
    items: [
      { label: "Yangiliklar", href: "/news" },
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

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openSectionWithDelay = (sectionId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDesktopSection(sectionId);
  };

  const closeSectionWithDelay = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDesktopSection(null);
    }, 1000); // 1-second delay
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const MAIN_SITE_URL = "https://shahrisabz-tibbiyot-texnikumi.uz";

  // Check if a link is a hash link
  const isHashLink = (href: string) => href.startsWith("#");

  // Dynamically resolve link href depending on domain and current page elements
  const getLinkHref = (href: string) => {
    if (typeof window === "undefined") return href;
    const isSubdomain = window.location.hostname.startsWith("qabul.") || window.location.hostname.startsWith("www.qabul.");

    if (isHashLink(href)) {
      const element = document.querySelector(href);
      if (element) return href;
      return isSubdomain ? `${MAIN_SITE_URL}/${href}` : `/${href}`;
    }

    if (href.startsWith("/")) {
      return isSubdomain ? `${MAIN_SITE_URL}${href}` : href;
    }

    return href;
  };

  // Handle navigation click
  const handleNavigation = useCallback((href: string, e?: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const isSubdomain = window.location.hostname.startsWith("qabul.") || window.location.hostname.startsWith("www.qabul.");

    if (isHashLink(href)) {
      const element = document.querySelector(href);
      if (element) {
        if (e) e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    if (isSubdomain) {
      if (e) e.preventDefault();
      if (href.startsWith("#")) {
        window.location.href = `${MAIN_SITE_URL}/${href}`;
      } else if (href.startsWith("/")) {
        window.location.href = `${MAIN_SITE_URL}${href}`;
      } else {
        window.location.href = href;
      }
    } else if (isHashLink(href) && !isHomePage) {
      if (e) e.preventDefault();
      window.location.href = `/${href}`;
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
  const closeMenuAndNavigate = useCallback((href: string, e?: React.MouseEvent) => {
    setMobileOpen(false);
    setOpenSections([]);
    handleNavigation(href, e);
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
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const logoHref = typeof window !== "undefined" && (window.location.hostname.startsWith("qabul.") || window.location.hostname.startsWith("www.qabul."))
    ? MAIN_SITE_URL
    : "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled ? "glass-strong py-3 shadow-lg shadow-black/20" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href={logoHref} className="flex items-center gap-3" aria-label={siteConfig.name}>
          <Image
            src="/Logo+name.png"
            alt={siteConfig.name}
            width={200}
            height={50}
            className="h-10 sm:h-12 w-auto object-contain"
            priority
          />
        </a>

        <nav
          className="hidden lg:flex items-center gap-2"
          aria-label="Desktop navigatsiya"
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onMouseLeave={closeSectionWithDelay}
        >
          {menuSections.map((section) => (
            <div key={section.id} className="relative">
              <button
                type="button"
                onMouseEnter={() => openSectionWithDelay(section.id)}
                onFocus={() => openSectionWithDelay(section.id)}
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
                    {/* Hover bridge to prevent menu from closing when moving cursor over the gap */}
                    <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent" />
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={getLinkHref(item.href)}
                        onClick={(e) => {
                          setOpenDesktopSection(null);
                          handleNavigation(item.href, e);
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


        <a
          href="https://qabul.shahrisabz-tibbiyot-texnikumi.uz/"
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
        >
          <span>Qabul - 2026</span>
          <span>→</span>
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
                <a href={logoHref} onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                  <Image
                    src="/Logo+name.png"
                    alt={siteConfig.name}
                    width={180}
                    height={44}
                    className="h-9 w-auto object-contain"
                  />
                </a>
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
                                    href={getLinkHref(item.href)}
                                    onClick={(e) => closeMenuAndNavigate(item.href, e)}
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
                  href="https://qabul.shahrisabz-tibbiyot-texnikumi.uz/"
                  onClick={() => closeMenuAndNavigate("https://qabul.shahrisabz-tibbiyot-texnikumi.uz/")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl active:scale-98"
                >
                  <span className="relative flex items-center gap-2">
                    🎓 Qabul - 2026
                    <span className="transition-transform group-hover:translate-x-1">→</span>
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
