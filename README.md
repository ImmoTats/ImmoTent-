# HausPotenzial

Web-App für Immobilienbesitzer in Deutschland: ermittelt in ca. 60 Sekunden das
geschätzte Markt-, Energie- und Modernisierungspotenzial einer Immobilie.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Keine externe Datenbank — Berechnung läuft client-/serverseitig deterministisch
  auf Basis von Adresse, Immobilientyp, Baujahr und Wohnfläche (lib/potential.ts)

## Setup

```bash
npm install
npm run dev
```

App läuft unter http://localhost:3000

## Projektstruktur

```
app/
  layout.tsx          Root-Layout, Fonts (Fraunces, Inter, IBM Plex Mono)
  globals.css         Tailwind + globale Styles, Grain-Textur, Reduced-Motion
  page.tsx            Landingpage (Hero, Formular, Trust, How-it-works, CTA)
  ergebnis/
    page.tsx          Ergebnisseite (Server Component, liest ?d=... Query-Param)
  api/
    berechnen/route.ts  Server-seitige Validierung & Berechnung (optional genutzt)
    lead/route.ts       Lead-Capture Endpoint (Name + E-Mail)

components/
  Header.tsx           Sticky Header für Hero
  PotentialForm.tsx     Eingabeformular (Adresse, Typ, Baujahr, Wohnfläche)
  PotentialGauge.tsx    Signature-Element: animierter Radial-Gauge
  AnimatedNumber.tsx    Hochzählende Zahlen-Animation (Euro-Beträge)
  LeadForm.tsx          "Vollständigen Bericht erhalten"-Formular
  ShareSection.tsx       WhatsApp-Share + Link kopieren

lib/
  potential.ts          Kernlogik: Marktwert-, Energie- & Modernisierungsberechnung
```

## Funktionsweise

1. Nutzer gibt Adresse, Immobilientyp, Baujahr und Wohnfläche ein.
2. `encodeInput()` kodiert die Eingabe Base64 in den Query-Param `?d=`.
3. `/ergebnis` decodiert die Eingabe und berechnet serverseitig
   (Server Component) das Ergebnis über `berechnePotenzial()`.
4. Ergebnis wird mit animiertem Gauge, Cards und Fortschrittsbalken angezeigt.
5. Lead-Formular sendet Name/E-Mail an `/api/lead` (aktuell Logging —
   produktionsreif anbindbar an E-Mail-Provider / DB).

## Hinweis zur Berechnung

Die Berechnung basiert auf branchenüblichen Heuristiken (Preis/m² je
Immobilientyp, Altersfaktor für Energieklasse, etc.) und liefert
deterministische, aber illustrative Schätzwerte. Für den produktiven Einsatz
sollte die Logik in `lib/potential.ts` durch echte Marktdaten-APIs
(z. B. Bewertungsportale, Energieausweis-Datenbanken) ersetzt oder ergänzt
werden.

## Design

- Farben: Ink `#0B1F1A`, Cream `#F7F5F0`, Gold `#C9A66B`, Sage `#3D7068`
- Typografie: Fraunces (Display), Inter (Body), IBM Plex Mono (Zahlen/Daten)
- Signature-Element: animierter Potenzial-Gauge auf der Ergebnisseite
