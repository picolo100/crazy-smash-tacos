/**
 * Horaires d'ouverture (fiche Google, relevé du 17/11/2026).
 * Minutes depuis minuit ; une fin > 1440 déborde sur le lendemain (1620 = 3 h).
 * Index des jours : 0 = dimanche … 6 = samedi (convention JavaScript).
 */
export type Slot = readonly [open: number, close: number];

export const WEEK: Record<number, readonly Slot[]> = {
  0: [[19 * 60, 24 * 60]],
  1: [],
  2: [[12 * 60, 13 * 60 + 30], [19 * 60, 23 * 60]],
  3: [[12 * 60, 13 * 60 + 30], [19 * 60, 23 * 60]],
  4: [[12 * 60, 13 * 60 + 30], [19 * 60, 23 * 60]],
  5: [[12 * 60, 13 * 60 + 30], [19 * 60, 27 * 60]],
  6: [[19 * 60, 27 * 60]],
};

export const DAY_NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"] as const;
const SCHEMA_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

/** Ordre d'affichage : la semaine commence le mardi (lundi = fermeture). */
export const DISPLAY_ORDER = [2, 3, 4, 5, 6, 0, 1] as const;

export function formatTime(minutes: number): string {
  const m = minutes % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (minutes === 1440) return "minuit";
  return `${h}h${min ? String(min).padStart(2, "0") : ""}`;
}

export function formatDay(day: number): string {
  const slots = WEEK[day] ?? [];
  if (!slots.length) return "Fermé";
  return slots.map(([o, c]) => `${formatTime(o)} – ${formatTime(c)}`).join(" · ");
}

export type OpenState =
  | { open: true; closesAt: number }
  | { open: false; next?: { label: string; at: number } };

/** Statut à un instant donné (jour 0-6, minutes depuis minuit, heure de Paris). */
export function getOpenState(day: number, minute: number): OpenState {
  for (const [o, c] of WEEK[day] ?? []) if (minute >= o && minute < c) return { open: true, closesAt: c };
  const prev = (day + 6) % 7;
  for (const [o, c] of WEEK[prev] ?? []) {
    if (c > 1440 && minute + 1440 >= o && minute + 1440 < c) return { open: true, closesAt: c };
  }
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const slot = (WEEK[d] ?? []).find(([o]) => i > 0 || o > minute);
    if (slot) {
      const label = i === 0 ? "aujourd’hui" : i === 1 ? "demain" : (DAY_NAMES[d] ?? "");
      return { open: false, next: { label, at: slot[0] } };
    }
  }
  return { open: false };
}

/** Jour + minute courants à Paris, indépendamment du fuseau du visiteur. */
export function parisNow(date = new Date()): { day: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minute: Number(get("hour")) * 60 + Number(get("minute")) };
}

const hhmm = (m: number) => {
  const v = m >= 1440 ? (m === 1440 ? 1439 : m - 1440) : m;
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
};

/** openingHoursSpecification schema.org (une entrée par créneau). */
export function openingHoursSchema() {
  return Object.entries(WEEK).flatMap(([d, slots]) =>
    slots.map(([o, c]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[Number(d)]}`,
      opens: hhmm(o),
      closes: hhmm(c),
    })),
  );
}
