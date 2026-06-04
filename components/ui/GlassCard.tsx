import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradientBorder?: boolean;
};

export function GlassCard({
  children,
  className,
  hover = true,
  gradientBorder = false,
}: GlassCardProps) {
return (
    <div
      className={cn(
        "glass p-6 rounded-none",
        gradientBorder && "gradient-border",
        hover && "transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
