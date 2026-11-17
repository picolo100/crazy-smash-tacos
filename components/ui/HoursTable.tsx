"use client";

import { DAY_NAMES, DISPLAY_ORDER, WEEK, formatDay } from "@/lib/hours";
import { useParisClock } from "@/lib/use-paris-clock";

/** Tableau des horaires ; la ligne du jour est mise en avant côté client. */
export function HoursTable({ className = "" }: { className?: string }) {
  const now = useParisClock();
  return (
    <table className={`hours ${className}`}>
      <caption className="sr-only">Horaires d’ouverture de Crazy Smash &amp; Tacos</caption>
      <tbody>
        {DISPLAY_ORDER.map((d) => {
          const closed = !(WEEK[d] ?? []).length;
          const cls = [closed ? "closed" : "", now?.day === d ? "today" : ""].filter(Boolean).join(" ");
          return (
            <tr key={d} className={cls || undefined} aria-current={now?.day === d ? "date" : undefined}>
              <th scope="row">{DAY_NAMES[d]}</th>
              <td>{formatDay(d)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
