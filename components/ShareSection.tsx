"use client";

import { useState } from "react";

export default function ShareSection() {
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://hauspotenzial.de";
  const shareText = "Ich habe gerade herausgefunden, wie viel Potenzial in meiner Immobilie steckt. Finde es auch kostenlos heraus:";

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${siteUrl}`)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <div className="rounded-xl2 border border-line bg-cream/40 p-6 sm:p-7">
      <h3 className="font-display text-lg font-medium text-ink">
        Kennst du jemanden, dem das auch helfen könnte?
      </h3>
      <p className="mt-2 text-sm text-ink/60 leading-relaxed">
        Teile HausPotenzial mit Familie oder Freunden — die Analyse ist
        komplett kostenlos.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] text-white font-medium text-sm px-5 py-3 transition-all hover:brightness-105 hover:shadow-lg hover:-translate-y-0.5"
        >
          <WhatsAppIcon />
          Per WhatsApp teilen
        </a>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-white text-ink font-medium text-sm px-5 py-3 transition-all hover:shadow-card hover:-translate-y-0.5"
        >
          {copied ? (
            <>
              <CheckIcon />
              Link kopiert
            </>
          ) : (
            <>
              <LinkIcon />
              Link kopieren
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.6-2.4-1.5-3.2-2.8-.1-.2-.1-.4.1-.6.2-.2.5-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4-.1 0-.4 0-.6 0-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.4 4.6 2.7 1 2.7.7 3.2.6.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z"/>
      <path d="M12 2C6.5 2 2 6.4 2 12c0 1.9.5 3.7 1.5 5.2L2 22l4.9-1.3C8.4 21.5 10.1 22 12 22c5.5 0 10-4.4 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.6-1.3l-.3-.2-3 .8.8-2.9-.2-.3C3.9 14.9 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z"/>
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 12a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 12a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
