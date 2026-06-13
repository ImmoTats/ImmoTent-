import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HausPotenzial — Wie viel ungenutztes Vermögen steckt in deiner Immobilie?",
  description:
    "Finde in 60 Sekunden kostenlos heraus, welches Energie-, Modernisierungs- und Wertsteigerungspotenzial in deinem Haus steckt.",
  openGraph: {
    title: "HausPotenzial",
    description:
      "Finde kostenlos heraus, welches Potenzial in deiner Immobilie steckt.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F1A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
