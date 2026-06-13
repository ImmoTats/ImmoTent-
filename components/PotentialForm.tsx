"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { encodeInput, PropertyType } from "@/lib/potential";

const currentYear = new Date().getFullYear();

export default function PotentialForm() {
  const router = useRouter();
  const [adresse, setAdresse] = useState("");
  const [immobilientyp, setImmobilientyp] = useState<PropertyType | "">("");
  const [baujahr, setBaujahr] = useState("");
  const [wohnflaeche, setWohnflaeche] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!adresse.trim() || adresse.trim().length < 3) {
      setError("Bitte gib deine vollständige Adresse ein.");
      return;
    }
    if (!immobilientyp) {
      setError("Bitte wähle deinen Immobilientyp aus.");
      return;
    }
    const baujahrNum = Number(baujahr);
    if (!baujahrNum || baujahrNum < 1800 || baujahrNum > currentYear) {
      setError("Bitte gib ein gültiges Baujahr ein.");
      return;
    }
    const flaecheNum = Number(wohnflaeche);
    if (!flaecheNum || flaecheNum < 10 || flaecheNum > 2000) {
      setError("Bitte gib eine gültige Wohnfläche ein (10–2000 m²).");
      return;
    }

    setLoading(true);

    const input = {
      adresse: adresse.trim(),
      immobilientyp,
      baujahr: baujahrNum,
      wohnflaeche: flaecheNum,
    };

    await new Promise((r) => setTimeout(r, 900));

    const encoded = encodeInput(input);
    router.push(`/ergebnis?d=${encoded}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-xl2 border border-cream/10 bg-white/[0.06] backdrop-blur-xl p-5 sm:p-7 shadow-2xl"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="adresse" className="block text-sm font-medium text-cream/90 mb-1.5">
            Adresse der Immobilie
          </label>
          <input
            id="adresse"
            type="text"
            placeholder="Musterstraße 12, 80331 München"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="w-full rounded-lg border border-cream/15 bg-cream/95 px-4 py-3 text-ink placeholder:text-ink/40 text-[15px] focus:ring-2 focus:ring-gold/60 focus:border-gold/60 transition"
            autoComplete="street-address"
          />
        </div>

        <div>
          <label htmlFor="typ" className="block text-sm font-medium text-cream/90 mb-1.5">
            Immobilientyp
          </label>
          <select
            id="typ"
            value={immobilientyp}
            onChange={(e) => setImmobilientyp(e.target.value as PropertyType)}
            className="w-full rounded-lg border border-cream/15 bg-cream/95 px-4 py-3 text-ink text-[15px] focus:ring-2 focus:ring-gold/60 focus:border-gold/60 transition"
          >
            <option value="">Bitte wählen</option>
            <option value="einfamilienhaus">Einfamilienhaus</option>
            <option value="mehrfamilienhaus">Mehrfamilienhaus</option>
            <option value="reihenhaus">Reihenhaus</option>
            <option value="wohnung">Wohnung</option>
          </select>
        </div>

        <div>
          <label htmlFor="baujahr" className="block text-sm font-medium text-cream/90 mb-1.5">
            Baujahr
          </label>
          <input
            id="baujahr"
            type="number"
            inputMode="numeric"
            placeholder="z. B. 1985"
            min={1800}
            max={currentYear}
            value={baujahr}
            onChange={(e) => setBaujahr(e.target.value)}
            className="w-full rounded-lg border border-cream/15 bg-cream/95 px-4 py-3 text-ink placeholder:text-ink/40 text-[15px] focus:ring-2 focus:ring-gold/60 focus:border-gold/60 transition tabular"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="wohnflaeche" className="block text-sm font-medium text-cream/90 mb-1.5">
            Wohnfläche (m²)
          </label>
          <input
            id="wohnflaeche"
            type="number"
            inputMode="numeric"
            placeholder="z. B. 140"
            min={10}
            max={2000}
            value={wohnflaeche}
            onChange={(e) => setWohnflaeche(e.target.value)}
            className="w-full rounded-lg border border-cream/15 bg-cream/95 px-4 py-3 text-ink placeholder:text-ink/40 text-[15px] focus:ring-2 focus:ring-gold/60 focus:border-gold/60 transition tabular"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-gold text-ink font-semibold text-[15px] py-3.5 transition-all hover:bg-gold/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-ink/30 border-t-ink animate-spin" />
            Analysiere Immobilie …
          </>
        ) : (
          <>
            Potenzial berechnen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-cream/50">
        Dauert ca. 60 Sekunden · Keine Anmeldung erforderlich
      </p>
    </form>
  );
}
