import { NextRequest, NextResponse } from "next/server";

// ============================================================
// ENV VARS REQUIRED IN VERCEL (Project Settings → Environment Variables):
//
//   RESEND_API_KEY      - API key from https://resend.com/api-keys
//   LEAD_RECEIVER_EMAIL - Email address that receives lead notifications
//   RESEND_FROM_EMAIL   - Verified sender address (e.g. noreply@yourdomain.com)
//
// If RESEND_API_KEY or LEAD_RECEIVER_EMAIL are missing, this route returns
// a clear error instead of pretending the email was sent.
// ============================================================

interface AnalyseDaten {
  adresse?: string;
  immobilientyp?: string;
  baujahr?: number;
  wohnflaeche?: number;
  marktwert?: number;
  gesamtPotenzialEuro?: number;
  energieklasseAktuell?: string;
  energieklasseMoeglich?: string;
  energieEinsparungMin?: number;
  energieEinsparungMax?: number;
  modernisierungWert?: number;
}

function formatEuroServer(value?: number): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildOwnerEmailHtml(name: string, email: string, analyse?: AnalyseDaten): string {
  const rows: string[] = [];

  if (analyse) {
    rows.push(`<tr><td><strong>Adresse</strong></td><td>${analyse.adresse ?? "–"}</td></tr>`);
    rows.push(`<tr><td><strong>Immobilientyp</strong></td><td>${analyse.immobilientyp ?? "–"}</td></tr>`);
    rows.push(`<tr><td><strong>Baujahr</strong></td><td>${analyse.baujahr ?? "–"}</td></tr>`);
    rows.push(`<tr><td><strong>Wohnfläche</strong></td><td>${analyse.wohnflaeche ?? "–"} m²</td></tr>`);
    rows.push(`<tr><td><strong>Marktwert</strong></td><td>${formatEuroServer(analyse.marktwert)}</td></tr>`);
    rows.push(`<tr><td><strong>Gesamtpotenzial</strong></td><td>${formatEuroServer(analyse.gesamtPotenzialEuro)}</td></tr>`);
    rows.push(`<tr><td><strong>Energieklasse</strong></td><td>${analyse.energieklasseAktuell ?? "–"} → ${analyse.energieklasseMoeglich ?? "–"}</td></tr>`);
    rows.push(`<tr><td><strong>Energie-Einsparung/Jahr</strong></td><td>${formatEuroServer(analyse.energieEinsparungMin)} – ${formatEuroServer(analyse.energieEinsparungMax)
