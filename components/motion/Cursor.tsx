"use client";

import { useEffect, useRef } from "react";
import { loadMotion } from "@/lib/motion";

/** Pastille cheddar qui suit la souris (reprise du site d'origine), lissée par GSAP. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!el || !mq.matches) return;
    let off = () => {};
    let cancelled = false;

    loadMotion().then(({ gsap }) => {
      if (cancelled) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      const interactive = "a, button, summary, [data-cursor]";
      const move = (e: PointerEvent) => {
        el.classList.add("is-visible");
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const over = (e: PointerEvent) => {
        el.classList.toggle("is-active", !!(e.target as Element | null)?.closest?.(interactive));
      };
      const leave = () => el.classList.remove("is-visible");
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      off = () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.documentElement.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      cancelled = true;
      off();
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
