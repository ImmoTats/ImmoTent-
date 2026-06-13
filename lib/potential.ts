export type PropertyType = "einfamilienhaus" | "mehrfamilienhaus" | "wohnung" | "reihenhaus";

export interface BerechnungInput {
  adresse: string;
  immobilientyp: PropertyType;
  baujahr: number;
  wohnflaeche: number;
}

export interface BerechnungResult {
  marktwert: number;
  marktwertSpanneMin: number;
  marktwertSpanneMax: number;
  energiePotenzial: number;
  energieEinsparungMin: number;
  energieEinsparungMax: number;
  modernisierungPotenzial: number;
  modernisierungWert: number;
  gesamtPotenzial: number;
  gesamtPotenzialEuro: number;
  energieklasseAktuell: string;
  energieklasseMoeglich: string;
}

const BASE_PRICE_PER_SQM: Record<PropertyType, number> = {
  einfamilienhaus: 3200,
  mehrfamilienhaus: 2900,
  wohnung: 3600,
  reihenhaus: 3100,
};

const TYPE_LABEL: Record<PropertyType, string> = {
  einfamilienhaus: "Einfamilienhaus",
  mehrfamilienhaus: "Mehrfamilienhaus",
  wohnung: "Wohnung",
  reihenhaus: "Reihenhaus",
};

export function typeLabel(t: PropertyType): string {
  return TYPE_LABEL[t] ?? t;
}

const ENERGY_ORDER = ["H", "G", "F", "E", "D", "C", "B", "A", "A+"];

function energyClassForAge(age: number): string {
  if (age > 50) return "H";
  if (age > 40) return "G";
  if (age > 30) return "F";
  if (age > 20) return "E";
  if (age > 10) return "D";
  return "C";
}

function improvedEnergyClass(current: string, steps: number): string {
  const idx = ENERGY_ORDER.indexOf(current);
  const safeIdx = idx === -1 ? 0 : idx;
  const newIdx = Math.min(ENERGY_ORDER.length - 1, safeIdx + steps);
  return ENERGY_ORDER[newIdx];
}

function seedFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function berechnePotenzial(input: BerechnungInput): BerechnungResult {
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - input.baujahr);
  const seed = seedFromString(input.adresse.toLowerCase().trim() || "default");
  const variance = 0.9 + (seed % 21) / 100;

  const pricePerSqm = BASE_PRICE_PER_SQM[input.immobilientyp] ?? 3000;
  const baseValue = pricePerSqm * input.wohnflaeche * variance;

  const ageDiscount = Math.max(0.78, 1 - age * 0.003);
  const marktwert = Math.round((baseValue * ageDiscount) / 1000) * 1000;

  const energiePotenzial = Math.min(95, Math.max(15, Math.round(age * 1.6 + 10)));
  const energieklasseAktuell = energyClassForAge(age);

  const improvementSteps = Math.max(2, Math.min(4, Math.round(energiePotenzial / 30) + 2));
  const energieklasseMoeglich = improvedEnergyClass(energieklasseAktuell, improvementSteps);

  const baseSavingPerSqm = 8 + (energiePotenzial / 100) * 14;
  const einsparungMittel = input.wohnflaeche * baseSavingPerSqm;
  const energieEinsparungMin = Math.max(300, Math.round((einsparungMittel * 0.75) / 50) * 50);
  const energieEinsparungMax = Math.max(
    energieEinsparungMin + 200,
    Math.round((einsparungMittel * 1.4) / 50) * 50
  );

  const energieEinsparungMid = (energieEinsparungMin + energieEinsparungMax) / 2;

  const modernisierungPotenzial = Math.min(
    95,
    Math.max(20, Math.round(age * 1.3 + 15 + (seed % 10)))
  );

  const upliftPct = 0.08 + (modernisierungPotenzial / 100) * 0.22;
  const modernisierungWert = Math.round((marktwert * upliftPct) / 1000) * 1000;

  const gesamtPotenzial = Math.min(
    99,
    Math.round(energiePotenzial * 0.45 + modernisierungPotenzial * 0.55)
  );

  const gesamtPotenzialEuro = modernisierungWert + Math.round(energieEinsparungMid) * 10;

  return {
    marktwert,
    marktwertSpanneMin: Math.round((marktwert * 0.94) / 1000) * 1000,
    marktwertSpanneMax: Math.round((marktwert * 1.08) / 1000) * 1000,
    energiePotenzial,
    energieEinsparungMin,
    energieEinsparungMax,
    modernisierungPotenzial,
    modernisierungWert,
    gesamtPotenzial,
    gesamtPotenzialEuro,
    energieklasseAktuell,
    energieklasseMoeglich,
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function encodeInput(input: BerechnungInput): string {
  return encodeURIComponent(btoa(JSON.stringify(input)));
}

export function decodeInput(encoded: string): BerechnungInput | null {
  try {
    const json = atob(decodeURIComponent(encoded));
    const parsed = JSON.parse(json);
    if (
      typeof parsed.adresse === "string" &&
      typeof parsed.immobilientyp === "string" &&
      typeof parsed.baujahr === "number" &&
      typeof parsed.wohnflaeche === "number"
    ) {
      return parsed as BerechnungInput;
    }
    return null;
  } catch {
    return null;
  }
}
