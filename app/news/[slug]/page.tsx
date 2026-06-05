import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryPillButton } from "@/components/ui/PrimaryPillButton";
import { newsItems } from "@/lib/constants";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-bg-mid">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeading
              title={article.title}
              subtitle={article.date}
              align="left"
            />
            <PrimaryPillButton href="/news">Barcha yangiliklar</PrimaryPillButton>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl shadow-black/20">
            <div className="relative h-[420px] w-full sm:h-[480px]">
              <Image
                src={article.photo}
                alt={article.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent" />
            </div>

            <div className="p-8 sm:p-10">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 text-base leading-relaxed text-text-muted md:text-lg">
                  {paragraph}
                </p>
              ))}

              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/news" className="text-sm font-semibold text-emerald-200 hover:text-white">
                  ← Yangiliklar ro&apos;yxatiga qaytish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
