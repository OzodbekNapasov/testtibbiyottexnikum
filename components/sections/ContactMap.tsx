"use client";

import { siteConfig } from "@/lib/site-config";

export function ContactMap() {
  const { lat, lng, zoom } = siteConfig.map;
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/20" aria-label="Shahrisabz xaritasi">
      <iframe
        src={src}
        title={`Google Maps — ${siteConfig.name}`}
        allowFullScreen
        loading="lazy"
        className="h-full w-full border-0"
      />
    </div>
  );
}
