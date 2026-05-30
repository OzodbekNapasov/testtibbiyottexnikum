import Link from "next/link";
import Image from "next/image";
import { Instagram, Send } from "lucide-react";
import { footerLinks } from "@/lib/constants";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-mid">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-[family-name:var(--font-heading)] font-bold text-white">
                  {siteConfig.name}
                </p>
                <p className="mt-1 text-sm text-text-muted">{siteConfig.description}</p>
              </div>
            </Link>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Tezkor havolalar
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-soft transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Ijtimoiy tarmoqlar
            </h3>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-xl glass transition-colors hover:bg-primary/20"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl glass transition-colors hover:bg-primary/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-text-muted">
            © {year} {siteConfig.name}. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-sm text-text-muted">{siteConfig.address}</p>
        </div>
      </div>
    </footer>
  );
}
