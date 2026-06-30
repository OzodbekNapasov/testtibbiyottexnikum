"use client";

import { useCounter } from "@/hooks/useCounter";

type CounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function Counter({ value, suffix = "", label }: CounterProps) {
  const { count, ref } = useCounter(value);

  return (
    <div ref={ref} className="text-center">
      <div className="font-[family-name:var(--font-heading)] text-4xl font-bold text-gradient md:text-5xl lg:text-6xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-text-muted md:text-base">{label}</p>
    </div>
  );
}
