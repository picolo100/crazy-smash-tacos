"use client";

import { useSyncExternalStore } from "react";
import { parisNow } from "./hours";

/**
 * Heure de Paris côté client, rafraîchie chaque minute.
 * Renvoie `null` pendant le rendu serveur/statique pour éviter tout écart d'hydratation.
 */
let cache: { key: string; value: { day: number; minute: number } } | null = null;

function getSnapshot() {
  const now = parisNow();
  const key = `${now.day}-${now.minute}`;
  if (!cache || cache.key !== key) cache = { key, value: now };
  return cache.value;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function useParisClock() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
