import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2
        id={title.toLowerCase().replace(/\s+/g, "-")}
        className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
