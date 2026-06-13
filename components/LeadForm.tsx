"use client";

import { useState, FormEvent } from "react";

interface AnalyseDaten {
  adresse: string;
  immobilientyp: string;
  baujahr: number;
  wohnflaeche: number;
  marktwert: number;
  gesamtPotenzialEuro: number;
  energieklasseAktuell: string;
  energieklasseMoeglich: string;
  energieEinsparungMin: number;
  energieEinsparungMax: number;
  modernisierungWert: number;
}

interface LeadFormProps {
  analyseDaten?: AnalyseDaten;
}

export default function LeadForm({ analyseDaten }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || name.trim().length < 2) {
      setError("Bitte gib deinen Namen ein.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          analyse: analyseDaten,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(
          data.error ??
            "Der Bericht konnte gerade nicht versendet werden. Bitte versuche es erneut."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte versuche es erneut.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl2 border border-sage/30 bg-sageLight p-6 sm:p-8 text-center animate-fadeUp">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage text-cream">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-medium text-ink">
          Bericht ist auf dem Weg
        </h3>
        <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
          Wir senden deinen vollständigen Potenzialbericht in Kürze an{" "}
          <span className="font-medium text-ink">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-line bg-white p-6 sm:p-8 shadow-card">
      <h3 className="font-display text-xl sm:text-2xl font-medium text-ink">
        Vollständigen Potenzialbericht erhalten
      </h3>
      <p className="mt-2 text-sm text-ink/60 leading-relaxed">
        Erhalte eine detaillierte Aufschlüsselung deines Energie- und
        Modernisierungspotenzials inklusive konkreter Maßnahmen — kostenlos
        per E-Mail.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3.5" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink/80 mb-1.5">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Max Mustermann"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full rounded-lg border border-line bg-cream/40 px-4 py-3 text-ink placeholder:
