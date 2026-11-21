"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Plus,
  Minus,
  Building2,
  GraduationCap,
  ImageIcon,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
      { label: "Kampus manzili", href: "#kampus" },
      { label: "Eng ko'p beriladigan savollar", href: "/faq" },
    ],
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubdomain, setIsSubdomain] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [openDesktopSection, setOpenDesktopSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const headerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const MAIN_SITE_URL = siteConfig.url;

  useEffect(() => {
    const host = window.location.hostname;
    setIsSubdomain(host.startsWith("qabul.") || host.startsWith("www.qabul."));
  }, []);

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
    }, 260);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDesktopSection(null);
        setMobileOpen(false);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDesktopSection(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  const isHashLink = (href: string) => href.startsWith("#");

  // Deterministic SSR-safe href resolution (prevents hydration mismatch)
  const getLinkHref = (href: string) => {
    if (isHashLink(href)) {
      if (isSubdomain) return `${MAIN_SITE_URL}/${href}`;
      return isHomePage ? href : `/${href}`;
    }

    if (href.startsWith("/")) {
      return isSubdomain ? `${MAIN_SITE_URL}${href}` : href;
    }

    return href;
  };

  const handleNavigation = useCallback(
    (href: string, e?: React.MouseEvent) => {
      if (typeof window === "undefined") return;

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
    },
    [isHomePage, isSubdomain, MAIN_SITE_URL],
  );

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const closeMenuAndNavigate = useCallback(
    (href: string, e?: React.MouseEvent) => {
      setMobileOpen(false);
      setOpenSections([]);
      handleNavigation(href, e);
    },
    [handleNavigation],
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
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

  const logoHref = isSubdomain ? MAIN_SITE_URL : "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8",
        isScrolled ? "pt-2 sm:pt-2.5 pb-2" : "pt-3 sm:pt-4 pb-3",
      )}
    >
      <div ref={headerRef} className="mx-auto max-w-7xl relative">
        {/* Main Floating Dark Glass Bar */}
        <div
          className={cn(
            "relative flex items-center rounded-2xl border text-white backdrop-blur-xl px-4 py-2.5 sm:px-5 transition-all duration-300",
            isScrolled
              ? "border-white/20 bg-bg-dark/95 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              : "border-white/15 bg-bg-dark/85 shadow-2xl",
          )}
          onMouseLeave={closeSectionWithDelay}
        >
          {/* LEFT: Logo + Institution Name (Desktop) */}
          <a
            href={logoHref}
            className="hidden lg:flex items-center gap-3 flex-shrink-0 group"
            aria-label={siteConfig.name}
          >
            <Image
              src="/Logo+name.png"
              alt={siteConfig.name}
              width={48}
              height={48}
              className="h-12 w-12 object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_18px_rgba(96,165,250,0.8)] transition-all duration-300"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-extrabold text-sm tracking-wide uppercase">
                Shahrisabz
              </span>
              <span className="text-blue-300 text-xs font-medium">
                Tibbiyot Texnikumi
              </span>
            </div>
          </a>

          {/* Separator (Desktop) */}
          <div className="hidden lg:block h-8 w-px bg-white/15 mx-4 flex-shrink-0" />

          {/* CENTER: All Nav Links (Desktop) */}
          <nav
            className="hidden lg:flex flex-1 items-center justify-center gap-1"
            aria-label="Asosiy navigatsiya"
          >
            {menuSections.map((section) => {
              const isOpen = openDesktopSection === section.id;
              return (
                <div
                  key={section.id}
                  className="relative"
                  onMouseEnter={() => openSectionWithDelay(section.id)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDesktopSection((prev) =>
                        prev === section.id ? null : section.id,
                      )
                    }
                    onFocus={() => openSectionWithDelay(section.id)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
                      isOpen
                        ? "bg-white/15 text-white"
                        : "text-white/90 hover:bg-white/10 hover:text-white",
                    )}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span>{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-white/60 transition-transform duration-200",
                        isOpen && "rotate-180 text-white",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full z-[70] mt-3 w-64 rounded-2xl border border-white/15 bg-bg-dark/95 p-2 shadow-2xl backdrop-blur-xl"
                      >
                        {/* Seamless hover bridge */}
                        <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />
                        {section.items.map((item) => (
                          <a
                            key={item.href}
                            href={getLinkHref(item.href)}
                            onClick={(e) => {
                              setOpenDesktopSection(null);
                              handleNavigation(item.href, e);
                            }}
                            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-soft transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="h-4 w-4 text-text-muted" />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Direct Manzil Link */}
            <a
              href={getLinkHref("#kampus")}
              onClick={(e) => handleNavigation("#kampus", e)}
              className="rounded-full px-3.5 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider text-white/90 hover:bg-white/10 hover:text-white transition-colors"
            >
              MANZIL
            </a>
          </nav>

          {/* MOBILE LOGO */}
          <a
            href={logoHref}
            className="flex lg:hidden items-center gap-2.5"
            aria-label={siteConfig.name}
          >
            <Image
              src="/Logo+name.png"
              alt={siteConfig.name}
              width={40}
              height={40}
              className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-extrabold text-sm tracking-wide uppercase">
                Shahrisabz
              </span>
              <span className="text-blue-300 text-[11px] font-medium">
                Tibbiyot Texnikumi
              </span>
            </div>
          </a>

          {/* RIGHT: QABUL CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5 flex-shrink-0 ml-auto lg:ml-4">
            {/* QABUL CTA Button (Desktop) */}
            <a
              href={siteConfig.qabulUrl}
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-rose-400/35 bg-rose-500/15 hover:bg-rose-500/25 px-4 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider text-rose-200 transition-all"
            >
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              QABUL YOPILDI
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white lg:hidden relative z-[60] cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menyuni yopish" : "Menyuni ochish"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-bg-dark/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Fullscreen Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 top-0 z-[101] flex flex-col overflow-y-auto bg-gradient-to-b from-bg-dark via-bg-mid to-bg-deep"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
                <a
                  href={logoHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <Image
                    src="/Logo+name.png"
                    alt={siteConfig.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-white font-extrabold text-sm tracking-wide uppercase">
                      Shahrisabz
                    </span>
                    <span className="text-blue-300 text-[11px] font-medium">
                      Tibbiyot Texnikumi
                    </span>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10 cursor-pointer"
                  aria-label="Menyuni yopish"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Content */}
              <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobil navigatsiya">
                {/* Admission Status */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/35 bg-rose-500/15 px-4 py-2.5"
                >
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <span className="text-sm font-semibold text-rose-300">
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
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + sectionIndex * 0.06 }}
                        className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
                      >
                        {/* Section Header */}
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-white/5 cursor-pointer"
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
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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

                  {/* Direct Manzil link in mobile menu */}
                  <motion.a
                    href={getLinkHref("#kampus")}
                    onClick={(e) => closeMenuAndNavigate("#kampus", e)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36 }}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <MapPin className="w-5 h-5" />
                      </span>
                      <span className="text-base font-semibold text-white">Manzil va xarita</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-text-muted" />
                  </motion.a>
                </div>
              </nav>

              {/* Footer CTA */}
              <div className="border-t border-white/5 px-5 py-6">
                <motion.a
                  href={siteConfig.qabulUrl}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-400/35 bg-rose-500/15 hover:bg-rose-500/25 px-6 py-4 text-base font-bold text-rose-200 transition-all active:scale-[0.98]"
                >
                  <span className="relative flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-rose-300 shrink-0" />
                    Qabul - 2026 (Yopilgan)
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </motion.a>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
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
