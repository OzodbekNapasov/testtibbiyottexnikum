"use client";

export function TestModeBanner() {
  const text = "⚠ SAYT TEST REJMIDA ISHLAYAPTI ⚠";
  // Repeat enough times to fill wide screens with seamless loop
  const repeated = Array(12).fill(text).join("   •   ");

  return (
    <div
      className="relative w-full overflow-hidden bg-red-600 py-1.5"
      aria-label="Test rejimi ogohlantirishsi"
      role="banner"
      style={{ zIndex: 9999 }}
    >
      {/* Scrolling ticker */}
      <div className="flex whitespace-nowrap">
        <span
          className="inline-block animate-ticker text-xs font-bold uppercase tracking-widest text-white"
          style={{ animationDuration: "22s" }}
        >
          {repeated}&nbsp;&nbsp;&nbsp;
        </span>
        {/* Duplicate for seamless loop */}
        <span
          className="inline-block animate-ticker text-xs font-bold uppercase tracking-widest text-white"
          style={{ animationDuration: "22s" }}
          aria-hidden="true"
        >
          {repeated}&nbsp;&nbsp;&nbsp;
        </span>
      </div>

      {/* Left/right edge fade-out masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-red-600 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-red-600 to-transparent" />
    </div>
  );
}
