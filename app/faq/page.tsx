import { SectionHeading } from "@/components/ui/SectionHeading";

export default function FaqPage() {
  return (
    <main id="main-content">
      <section className="section-anchor section-padding relative bg-bg-mid">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            title="Eng ko'p beriladigan savollar"
            subtitle="Savollar va javoblar tez orada bu yerga qo'shiladi."
            align="left"
          />

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-text-muted">
            <p className="text-base leading-relaxed">
              FAQ bo&apos;limi hozircha tayyorlanmoqda. Savollar va javoblar kelajakda shu yerda namoyish etiladi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
