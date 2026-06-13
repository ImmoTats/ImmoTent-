import Link from "next/link";
import { redirect } from "next/navigation";
import {
  berechnePotenzial,
  decodeInput,
  formatEuro,
  typeLabel,
} from "@/lib/potential";
import PotentialGauge from "@/components/PotentialGauge";
import AnimatedNumber from "@/components/AnimatedNumber";
import LeadForm from "@/components/LeadForm";
import ShareSection from "@/components/ShareSection";

export default function ErgebnisPage({
  searchParams,
}: {
  searchParams: { d?: string };
}) {
  const encoded = searchParams.d;
  const input = encoded ? decodeInput(encoded) : null;

  if (!input) {
    redirect("/");
  }

  const result = berechnePotenzial(input!);
  const {
    marktwert,
    marktwertSpanneMin,
    marktwertSpanneMax,
    energiePotenzial,
    energieEinsparungMin,
    energieEinsparungMax,
    modernisierungPotenzial,
    modernisierungWert,
    gesamtPotenzial,
    gesamtPotenzialEuro,
    energieklasseAktuell,
    energieklasseMoeglich,
  } = result;

  return (
    <main className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="bg-ink bg-grain" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/90 text-ink font-display font-semibold text-sm transition-transform group-hover:scale-105">
              H
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-cream">
              HausPotenzial
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-cream/60 hover:text-cream/90 transition"
          >
            Neue Analyse
          </Link>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-10 sm:pb-14">
          <div className="animate-fadeUp">
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              Deine Analyse ist fertig
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-cream tracking-tight">
              {typeLabel(input!.immobilientyp)} · Baujahr {input!.baujahr}
            </h1>
            <p className="mt-2 text-cream/60">{input!.adresse}</p>
          </div>
        </div>
      </div>

      {/* Headline insight */}
      <section className="mx-auto max-w-6xl px-6 -mt-6 sm:-mt-8 relative z-10">
        <div className="rounded-xl2 border border-line bg-white shadow-cardHover p-6 sm:p-8 animate-fadeUp" style={{ animationDelay: "0.1s" }}>
          <div className="grid lg:grid-cols-[auto,1fr] gap-8 items-center">
            <div className="flex justify-center">
              <PotentialGauge value={gesamtPotenzial} label="Gesamtpotenzial" size={180} />
            </div>
            <div>
              <span className="text-sm font-medium text-sage uppercase tracking-wider">
                Gesamtpotenzial
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-ink">
                Bis zu{" "}
                <span className="text-gold">
                  <AnimatedNumber value={gesamtPotenzialEuro} format="euro" />
                </span>{" "}
                ungenutztes Potenzial
              </h2>
              <p className="mt-3 text-ink/60 leading-relaxed max-w-xl">
                Diese Zahl setzt sich aus möglicher Wertsteigerung durch
                Modernisierung und geschätzten Energiekosten-Einsparungen über
                10 Jahre zusammen.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-goldLight px-4 py-2 text-sm text-ink/70">
                <span className="text-base">💡</span>
                Die meisten Eigentümer kennen dieses Potenzial nicht.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Marktwert */}
          <div className="rounded-xl2 border border-line bg-white p-6 shadow-card transition-all hover:shadow-cardHover hover:-translate-y-0.5 animate-fadeUp" style={{ animationDelay: "0.15s" }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sageLight text-sage mb-4">
              <MarketIcon />
            </div>
            <h3 className="font-display text-lg font-medium text-ink">
              Geschätzter Marktwert
            </h3>
            <p className="mt-3 font-display text-3xl font-medium text-ink tabular">
              <AnimatedNumber value={marktwert} format="euro" />
            </p>
            <p className="mt-1.5 text-sm text-ink/50">
              Spanne: {formatEuro(marktwertSpanneMin)} – {formatEuro(marktwertSpanneMax)}
            </p>
            <p className="mt-4 text-sm text-ink/60 leading-relaxed">
              Basierend auf Lage, Wohnfläche ({input!.wohnflaeche} m²) und
              Immobilientyp.
            </p>
          </div>

          {/* Energiepotenzial */}
          <div className="rounded-xl2 border border-line bg-white p-6 shadow-card transition-all hover:shadow-cardHover hover:-translate-y-0.5 animate-fadeUp" style={{ animationDelay: "0.22s" }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sageLight text-sage mb-4">
              <EnergyIcon />
            </div>
            <h3 className="font-display text-lg font-medium text-ink">
              Energiepotenzial
            </h3>
            <div className="mt-4 flex items-center justify-between text-sm text-ink/60 mb-1.5">
              <span>Score</span>
              <span className="font-medium text-ink tabular">{energiePotenzial} / 100</span>
            </div>
            <ProgressBar value={energiePotenzial} />
            <div className="mt-4 flex items-center gap-2 text-sm flex-wrap">
              <span className="text-ink/50 text-xs">Ist-Klasse:</span>
              <span className="rounded-md bg-red-50 text-red-600 font-semibold px-2 py-0.5 tabular">
                {energieklasseAktuell}
              </span>
              <span className="text-ink/40">→</span>
              <span className="text-ink/50 text-xs">Zielklasse:</span>
              <span className="rounded-md bg-sageLight text-sage font-semibold px-2 py-0.5 tabular">
                {energieklasseMoeglich}
              </span>
            </div>
            <p className="mt-4 text-sm text-ink/60 leading-relaxed">
              Mögliche Einsparung: rund{" "}
              <span className="font-medium text-ink">
                {formatEuro(energieEinsparungMin)} – {formatEuro(energieEinsparungMax)} / Jahr
              </span>{" "}
              durch energetische Sanierung.
            </p>
          </div>

          {/* Modernisierungspotenzial */}
          <div className="rounded-xl2 border border-line bg-white p-6 shadow-card transition-all hover:shadow-cardHover hover:-translate-y-0.5 animate-fadeUp" style={{ animationDelay: "0.29s" }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-goldLight text-gold mb-4">
              <ToolsIcon />
            </div>
            <h3 className="font-display text-lg font-medium text-ink">
              Modernisierungspotenzial
            </h3>
            <div className="mt-4 flex items-center justify-between text-sm text-ink/60 mb-1.5">
              <span>Score</span>
              <span className="font-medium text-ink tabular">{modernisierungPotenzial} / 100</span>
            </div>
            <ProgressBar value={modernisierungPotenzial} color="gold" />
            <p className="mt-4 text-sm text-ink/60 leading-relaxed">
              Mögliche Wertsteigerung von rund{" "}
              <span className="font-medium text-ink">
                {formatEuro(modernisierungWert)}
              </span>{" "}
              durch gezielte Modernisierungsmaßnahmen.
            </p>
          </div>
        </div>
      </section>

      {/* Lead capture + Share */}
      <section
        className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 3rem)" }}
      >
        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6 items-start">
          <div className="animate-fadeUp" style={{ animationDelay: "0.35s" }}>
            <LeadForm
              analyseDaten={{
                adresse: input!.adresse,
                immobilientyp: typeLabel(input!.immobilientyp),
                baujahr: input!.baujahr,
                wohnflaeche: input!.wohnflaeche,
                marktwert,
                gesamtPotenzialEuro,
                energieklasseAktuell,
                energieklasseMoeglich,
                energieEinsparungMin,
                energieEinsparungMax,
                modernisierungWert,
              }}
            />
          </div>
          <div className="animate-fadeUp" style={{ animationDelay: "0.4s" }}>
            <ShareSection />

            <div className="mt-5 rounded-xl2 border border-line bg-cream/40 p-6">
              <h3 className="font-display text-lg font-medium text-ink">
                Wichtiger Hinweis
              </h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                Diese Analyse basiert auf statistischen Durchschnittswerten
                und allgemeinen Markttrends. Sie dient der ersten Orientierung
                und ersetzt keine professionelle Immobilienbewertung oder
                Energieberatung vor Ort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-cream/10">
        <div
          className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream/40"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 2.5rem)" }}
        >
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

function ProgressBar({ value, color = "sage" }: { value: number; color?: "sage" | "gold" }) {
  const bg = color === "gold" ? "bg-gold" : "bg-sage";
  return (
    <div className="h-2 w-full rounded-full bg-line overflow-hidden">
      <div
        className={`h-full rounded-full ${bg} transition-all duration-1000 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function MarketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11.5L12 4l9 7.5M5.5 10v9a1 1 0 001 1H9.5a1 1 0 001-1v-4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EnergyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.5 6.5l3 3L19 8 16 5l-1.5 1.5zM5 19l4.5-4.5M9 9L6 12l1.5 1.5L10.5 10.5 9 9zM12 12l6.5 6.5a1.5 1.5 0 002-2.2L14 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
