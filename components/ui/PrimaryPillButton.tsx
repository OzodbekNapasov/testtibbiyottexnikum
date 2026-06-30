"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type PrimaryPillButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  variant?: "primary" | "glass";
};

export function PrimaryPillButton({
  href,
  onClick,
  children,
  className,
  showArrow = true,
  variant = "primary",
}: PrimaryPillButtonProps) {
  const shared =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  const primary =
    "text-white shadow-lg shadow-blue-500/25 bg-gradient-to-r from-[#071a4d] via-[#1d4ed8] to-[#10b981]";

  const glass =
    "text-white glass border border-white/10 bg-white/5";

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={cn(
            shared,
            variant === "primary" ? primary : glass,
            // hover glow + gradient shift
            "hover:scale-[1.05] hover:shadow-xl",
            className,
          )}
          data-cursor="button"
          onClick={onClick}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              variant === "primary"
                ? "bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.65),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.55),transparent_55%)]"
                : "bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_45%)]",
            )}
          />

          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#081f5c] via-[#14b8a6] to-[#10b981] opacity-0 transition-opacity duration-300 group-hover:opacity-20"
          />

          <span className="relative inline-flex items-center gap-2">
            {children}
            {showArrow && (
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            )}
          </span>

          {/* subtle outline glow */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              variant === "primary"
                ? "shadow-[0_0_0_1px_rgba(37,99,235,0.35),0_0_30px_rgba(16,185,129,0.25)]"
                : "shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_30px_rgba(37,99,235,0.18)]",
            )}
          />
        </Link>
      ) : (
        <button
          type="button"
          className={cn(
            shared,
            variant === "primary" ? primary : glass,
            "hover:scale-[1.05] hover:shadow-xl",
            className
          )}
          onClick={onClick}
          data-cursor="button"
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              variant === "primary"
                ? "bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.65),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.55),transparent_55%)]"
                : "bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_45%)]",
            )}
          />

          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#081f5c] via-[#14b8a6] to-[#10b981] opacity-0 transition-opacity duration-300 group-hover:opacity-20"
          />

          <span className="relative inline-flex items-center gap-2">
            {children}
            {showArrow && (
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            )}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              variant === "primary"
                ? "shadow-[0_0_0_1px_rgba(37,99,235,0.35),0_0_30px_rgba(16,185,129,0.25)]"
                : "shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_30px_rgba(37,99,235,0.18)]",
            )}
          />
        </button>
      )}
    </>
  );
}

