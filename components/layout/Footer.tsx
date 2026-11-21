import { Instagram, Send, Facebook, Youtube } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-bg-deep text-white py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Qabul Komissiyasi & Manzillarimiz */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold uppercase tracking-wider text-white">
              QABUL KOMISSIYASI:
            </h3>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-purple-400">
                MANZILLARIMIZ:
              </p>
              <p className="mt-2 text-sm sm:text-base text-text-soft leading-relaxed">
                <strong className="text-white">1-KAMPUS:</strong> {siteConfig.address}.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Ish Vaqti & Barcha Savollar Uchun */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-extrabold uppercase tracking-wider text-white">
                ISH VAQTI:
              </h3>
              <p className="mt-2 text-sm sm:text-base text-text-soft">
                {siteConfig.workingHours}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-white">
                BARCHA SAVOLLAR UCHUN:
              </h3>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base sm:text-lg font-black text-purple-300">
                {siteConfig.admissionPhones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={phone.href}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {phone.display}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© {year} {siteConfig.name}. Barcha huquqlar himoyalangan.</p>
          <p>{siteConfig.address}</p>
        </div>
      </div>
    </footer>
  );
}
