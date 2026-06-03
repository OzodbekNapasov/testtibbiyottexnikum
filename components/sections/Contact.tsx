"use client";

import dynamic from "next/dynamic";
import { Phone, Send, MapPin, Clock, ArrowRight, Instagram } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/lib/site-config";
import { contactContent } from "@/lib/constants";

const ContactMap = dynamic(() => import("@/components/sections/ContactMap").then((m) => m.ContactMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-2xl glass">
      <p className="text-sm text-text-muted">Xarita yuklanmoqda...</p>
    </div>
  ),
});

const contactItems = [
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Send,
    label: "Telegram",
    value: siteConfig.telegram,
    href: siteConfig.telegramHref,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: siteConfig.instagram,
    href: siteConfig.instagramHref,
  },
  {
    icon: MapPin,
    label: "Manzil",
    value: siteConfig.address,
    href: siteConfig.mapsUrl,
  },
  {
    icon: Clock,
    label: "Ish vaqti",
    value: siteConfig.workingHours,
  },
];

export function Contact() {
  return (
    <section
      id="aloqa"
      className="section-anchor section-padding relative bg-bg-mid"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 mesh-bg opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading title="Aloqa" subtitle="Savollaringiz bormi? Biz bilan bog'laning" />
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="glass group h-full rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/5 hover:shadow-xl hover:shadow-black/20">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20 ring-1 ring-white/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-text-muted">{item.label}</p>
                    <p
                      id={index === 0 ? "contact-heading" : undefined}
                      className="mt-1 font-medium text-white drop-shadow-sm"
                    >
                      {item.value}
                    </p>
                  </div>
                );

                if (item.href) {
                  return (
                    <a key={item.label} href={item.href} className="block">
                      {content}
                    </a>
                  );
                }

                return <div key={item.label}>{content}</div>;
              })}
            </div>

            <div className="mt-8">
              <MagneticButton href={siteConfig.telegramHref} variant="primary">
                {contactContent.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20">
                <ContactMap />
              </div>

              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-blue-400"
              >
                Google Mapsda ko&apos;rish
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
