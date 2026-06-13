"use client";

import { useState, FormEvent } from "react";

export default function LeadForm() {
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
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
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
            className="w-full rounded-lg border border-line bg-cream/40 px-4 py-3 text-ink placeholder:text-ink/35 text-[15px] focus:ring-2 focus:ring-sage/40 focus:border-sage/50 transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-1.5">
            E-Mail-Adresse
          </label>
          <input
            id="email"
            type="email"
            placeholder="max@beispiel.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-lg border border-line bg-cream/40 px-4 py-3 text-ink placeholder:text-ink/35 text-[15px] focus:ring-2 focus:ring-sage/40 focus:border-sage/50 transition"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-ink text-cream font-semibold text-[15px] py-3.5 transition-all hover:bg-ink/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-cream/30 border-t-cream animate-spin" />
              Wird gesendet …
            </>
          ) : (
            "Vollständigen Potenzialbericht erhalten"
          )}
        </button>

        <p className="text-center text-xs text-ink/40">
          Kein Spam. Abmeldung jederzeit möglich.
        </p>
      </form>
    </div>
  );
}
