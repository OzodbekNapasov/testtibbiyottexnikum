"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { siteConfig } from "@/lib/site-config";

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [siteConfig.map.lat, siteConfig.map.lng],
      zoom: siteConfig.map.zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.divIcon({
      className: "custom-marker",
      html: `<div style="
        width: 24px; height: 24px;
        background: linear-gradient(135deg, #2563EB, #10B981);
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 20px rgba(37, 99, 235, 0.5);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker([siteConfig.map.lat, siteConfig.map.lng], { icon })
      .addTo(map)
      .bindPopup(
        `<strong>${siteConfig.name}</strong><br>${siteConfig.address}<br><a href="${siteConfig.mapsUrl}" target="_blank" rel="noopener noreferrer">Google Mapsda ochish</a>`,
      );

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/20"
      aria-label="Shahrisabz xaritasi"
    />
  );
}
