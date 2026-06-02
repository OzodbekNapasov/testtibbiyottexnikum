"use client";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
}: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.25);
  const reducedMotion = useReducedMotion();

  const variants = {
    primary:
      "text-white shadow-lg shadow-blue-500/25 bg-gradient-to-r from-[#071a4d] via-[#1d4ed8] to-[#10b981] hover:shadow-xl",
    secondary:
      "glass border border-white/10 text-white hover:bg-white/10",
  };

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      data-cursor="button"
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-[box-shadow,background-color] duration-300",
        "font-[family-name:var(--font-ui)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variants[variant],
        className,
      )}
      style={{ transition: reducedMotion ? undefined : "transform 0.15s ease-out, box-shadow 0.3s" }}
    >
      {children}
    </a>
  );
}
