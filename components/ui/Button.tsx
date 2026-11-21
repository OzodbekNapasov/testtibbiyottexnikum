import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "closed" | "back" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-[family-name:var(--font-ui)] font-semibold tracking-tight transition-all duration-300 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 via-primary to-cyan-500 text-white shadow-lg shadow-blue-600/25 ring-1 ring-white/15 hover:brightness-110 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5",
  secondary:
    "bg-white/[0.06] text-white border border-white/15 backdrop-blur-md shadow-md shadow-black/15 hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5",
  closed:
    "bg-rose-500/15 text-rose-200 border border-rose-400/35 backdrop-blur-md hover:bg-rose-500/25 hover:border-rose-400/50 hover:-translate-y-0.5",
  back:
    "bg-white/[0.05] text-text-soft border border-white/10 backdrop-blur-md hover:bg-white/[0.10] hover:border-white/20 hover:text-white",
  ghost:
    "text-text-soft hover:text-white hover:bg-white/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-sm sm:text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
