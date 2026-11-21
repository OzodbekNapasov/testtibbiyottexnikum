"use client";

import { useCounter } from "@/hooks/useCounter";

type CounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

function formatStatNumber(num: number): string {
  // Keep 4-digit years like 2023 without a thousands separator
  if (num >= 1900 && num <= 2100) {
    return String(num);
  }
  return num.toLocaleString("en-US").replace(/,/g, " ");
}

export function Counter({ value, suffix = "", label }: CounterProps) {
  const { count, ref } = useCounter(value);

  return (
    <div ref={ref} className="text-center">
      <div className="font-[family-name:var(--font-heading)] text-4xl font-bold text-gradient md:text-5xl lg:text-6xl">
        {formatStatNumber(count)}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-text-muted md:text-base">{label}</p>
    </div>
  );
}
