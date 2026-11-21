"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { buttonVariants, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  target?: string;
  rel?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  target,
  rel,
}: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  const reducedMotion = useReducedMotion();

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
      className={buttonVariants({
        variant,
        size,
        className: `group will-change-transform ${className ?? ""}`,
      })}
    >
      {children}
    </a>
  );
}
