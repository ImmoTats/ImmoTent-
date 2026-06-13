import Header from "@/components/Header";
import PotentialForm from "@/components/PotentialForm";

export default function HomePage() {
  return (
    <main id="top" className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink bg-grain">
        <div className="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-sage/20 blur-3xl animate-floatSlow" />
        <div className="pointer-events-none absolute top-1/2 -left-40 h-[24rem] w-[24rem] rounded-full bg-gold/10 blur-3xl animate-floatSlow" style={{ animationDelay: "2s" }} />

        <Header />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 sm:pb-28" style={{ paddingTop: "calc(env(safe-area-inset-top) + 7rem)" }}>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="animate-fadeUp">
              <div className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5 text-xs font-medium text-cream/80 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Für Immobilienbesitzer in Deutschland
              </div>

              <h1 className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] tracking-tight text-cream font-medium">
                Wie viel ungenutztes Vermögen steckt in{" "}
                <span className="italic text-gold">deiner Immobilie?</span>
              </h1>

              <p className="mt-6 text-lg text-cream/70 leading-relaxed max-w-xl">
                Finde kostenlos heraus, welches Energie-, Modernisierungs- und
                Wertsteigerungspotenzial in deinem Haus steckt — in nur 60 Sekunden,
                basierend auf Adresse, Baujahr und Wohnfläche.
              </p>

              <div className="mt-8 hidden lg:flex items-center gap-6 text-sm text-cream/60">
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  100% kostenlos
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  Keine Verpflichtung
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  In 60 Sekunden
                </div>
              </div>
            </div>

            <div className="animate-fadeUp" style={{ animationDelay: "0.15s" }}>
              <PotentialForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "12.400+", label: "Analysen durchgeführt" },
            { value: "Ø 38.000 €", label: "ermitteltes Potenzial" },
            { value: "60 Sek.", label: "bis zum Ergebnis" },
            { value: "0 €", label: "für die Erstanalyse" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl sm:text-3xl font-medium text-ink tabular">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-ink/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-medium text-sage uppercase tracking-wider">
            So funktioniert&apos;s
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-ink tracking-tight">
            Drei Daten. Eine Analyse. Volle Klarheit.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <StepCard
            icon={<HomeIcon />}
            title="Eckdaten eingeben"
            text="Adresse, Immobilientyp, Baujahr und Wohnfläche — das genügt für eine fundierte erste Einschätzung."
          />
          <StepCard
            icon={<GaugeIcon />}
            title="Potenzial berechnen lassen"
            text="Unsere Analyse vergleicht deine Angaben mit regionalen Marktdaten, Energiestandards und Modernisierungstrends."
          />
          <StepCard
            icon={<ReportIcon />}
            title="Ergebnis erhalten"
            text="Marktwert, Energie- und Modernisierungspotenzial auf einen Blick — plus die Option auf einen vollständigen Bericht."
          />
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-sm font-medium text-sage uppercase tracking-wider">
                Warum HausPotenzial
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-ink tracking-tight leading-tight">
                Die meisten Eigentümer kennen ihr eigenes Potenzial nicht.
              </h2>
              <p className="mt-5 text-ink/60 leading-relaxed max-w-lg">
                Energiepreise steigen, Förderprogramme ändern sich, und der Immobilienmarkt
                entwickelt sich ständig weiter. Ohne eine aktuelle Einschätzung bleibt
                wertvolles Potenzial häufig ungenutzt — sei es durch Modernisierung,
                energetische Sanierung oder eine realistische Markteinschätzung.
              </p>
            </div>

            <div className="space-y-4">
              <ValueRow
                title="Marktwert-Einschätzung"
                text="Realistische Spanne basierend auf Lage, Größe und Zustand deiner Immobilie."
              />
              <ValueRow
                title="Energiepotenzial"
                text="Erfahre, wie viel du durch energetische Sanierung jährlich sparen könntest."
              />
              <ValueRow
                title="Modernisierungspotenzial"
                text="Sieh, welche Wertsteigerung durch gezielte Modernisierung realistisch ist."
              />
              <ValueRow
                title="Vollständiger Bericht"
                text="Auf Wunsch erhältst du eine detaillierte Aufschlüsselung per E-Mail."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-ink bg-grain">
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-cream tracking-tight">
            Finde es jetzt heraus — kostenlos und in 60 Sekunden.
          </h2>
          <p className="mt-4 text-cream/60 max-w-xl mx-auto">
            Keine Anmeldung, keine versteckten Kosten. Nur Klarheit über das, was in
            deiner Immobilie steckt.
          </p>
          <a
            href="#top"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold text-ink font-semibold text-[15px] px-7 py-3.5 transition-all hover:bg-gold/90 hover:shadow-lg hover:-translate-y-0.5"
          >
            Potenzial berechnen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream/40" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 2.5rem)" }}>

          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/90 text-ink font-display font-semibold text-xs">
              H
            </span>
            <span className="font-display text-cream/70">HausPotenzial</span>
          </div>
          <p>
            Alle Angaben sind unverbindliche Schätzungen und ersetzen keine
            professionelle Immobilienbewertung.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-cream/70 transition cursor-pointer">Impressum</span>
            <span className="hover:text-cream/70 transition cursor-pointer">Datenschutz</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StepCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl2 border border-line bg-cream/40 p-6 transition-all hover:shadow-card hover:-translate-y-0.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sageLight text-sage mb-5">
        {icon}
      </div>
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink/60 leading-relaxed">{text}</p>
    </div>
  );
}

function ValueRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-line bg-cream/40 p-5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-goldLight text-gold">
        <CheckIcon />
      </div>
      <div>
        <h3 className="font-medium text-ink">{title}</h3>
        <p className="mt-1 text-sm text-ink/60 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11.5L12 4l9 7.5M5.5 10v9a1 1 0 001 1H9.5a1 1 0 001-1v-4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 13a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 13l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3.5h9l3 3V19a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 015 19V5A1.5 1.5 0 016 3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 11h6M9 14.5h6M9 17.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
