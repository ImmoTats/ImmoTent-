import { NextRequest, NextResponse } from "next/server";
import { berechnePotenzial, BerechnungInput } from "@/lib/potential";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const adresse = String(body.adresse ?? "").trim();
    const immobilientyp = String(body.immobilientyp ?? "");
    const baujahr = Number(body.baujahr);
    const wohnflaeche = Number(body.wohnflaeche);

    if (!adresse || adresse.length < 3) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige Adresse ein." },
        { status: 400 }
      );
    }

    const validTypes = ["einfamilienhaus", "mehrfamilienhaus", "wohnung", "reihenhaus"];
    if (!validTypes.includes(immobilientyp)) {
      return NextResponse.json(
        { error: "Bitte wähle einen gültigen Immobilientyp." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(baujahr) || baujahr < 1800 || baujahr > new Date().getFullYear()) {
      return NextResponse.json(
        { error: "Bitte gib ein gültiges Baujahr ein." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(wohnflaeche) || wohnflaeche < 10 || wohnflaeche > 2000) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige Wohnfläche ein (10–2000 m²)." },
        { status: 400 }
      );
    }

    const input: BerechnungInput = {
      adresse,
      immobilientyp: immobilientyp as BerechnungInput["immobilientyp"],
      baujahr,
      wohnflaeche,
    };

    const result = berechnePotenzial(input);

    return NextResponse.json({ input, result });
  } catch (e) {
    return NextResponse.json(
      { error: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
