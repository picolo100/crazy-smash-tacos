"use client";

import { formatTime, getOpenState } from "@/lib/hours";
import { useParisClock } from "@/lib/use-paris-clock";

/** Pastille « Ouvert maintenant / Fermé » calculée à l'heure de Paris. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const now = useParisClock();
  if (!now) {
    return <p className={`open-status ${className}`}>Horaires d’ouverture</p>;
  }
  const s = getOpenState(now.day, now.minute);
  return (
    <p className={`open-status ${s.open ? "is-open" : "is-closed"} ${className}`} role="status">
      {s.open
        ? `Ouvert maintenant · jusqu’à ${formatTime(s.closesAt)}`
        : `Fermé pour le moment${s.next ? ` · ouvre ${s.next.label} à ${formatTime(s.next.at)}` : ""}`}
    </p>
  );
}
