"use client";

export function TestModeBanner() {
  const text = "⚠ SAYT TEST REJMIDA ISHLAYAPTI ⚠";
  const repeated = Array(14).fill(text).join("   •   ");

  return (
    <div
      className="fixed top-0 left-0 right-0 w-full overflow-hidden bg-red-600/90 backdrop-blur-sm py-0.5"
      aria-label="Test rejimi ogohlantirishsi"
      role="banner"
      style={{ zIndex: 99999 }}
    >
      <div className="flex whitespace-nowrap">
        <span
          className="inline-block animate-ticker text-[10px] font-bold uppercase tracking-widest text-white/95"
          style={{ animationDuration: "24s" }}
        >
          {repeated}&nbsp;&nbsp;&nbsp;
        </span>
        <span
          className="inline-block animate-ticker text-[10px] font-bold uppercase tracking-widest text-white/95"
          style={{ animationDuration: "24s" }}
          aria-hidden="true"
        >
          {repeated}&nbsp;&nbsp;&nbsp;
        </span>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-red-600 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-red-600 to-transparent" />
    </div>
  );
}
