"use client";

import { useEffect, useRef, useState } from "react";
import { loadMotion } from "@/lib/motion";

/**
 * Aperçu photo qui suit la souris au survol des lignes de la carte
 * ([data-preview="/img/xxx-550.webp"]). Souris uniquement : sur tactile,
 * les photos restent visibles dans les pages Smash et Tacos.
 */
export function HoverPreview({ scopeSelector }: { scopeSelector: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const box = ref.current;
    const scopeEl = document.querySelector<HTMLElement>(scopeSelector);
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!box || !scopeEl || !mq.matches) return;
    let off = () => {};
    let cancelled = false;

    loadMotion().then(({ gsap }) => {
      if (cancelled) return;
      const xTo = gsap.quickTo(box, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(box, "y", { duration: 0.6, ease: "power3.out" });
      const rTo = gsap.quickTo(box, "rotate", { duration: 0.8, ease: "power3.out" });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        xTo(e.clientX + 28);
        yTo(e.clientY - 140);
        rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      const over = (e: PointerEvent) => {
        const row = (e.target as Element).closest<HTMLElement>("[data-preview]");
        if (row) {
          setSrc(row.dataset.preview ?? null);
          gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        } else {
          gsap.to(box, { autoAlpha: 0, scale: 0.6, duration: 0.3, ease: "power2.in", overwrite: "auto" });
        }
      };
      const leave = () => gsap.to(box, { autoAlpha: 0, scale: 0.6, duration: 0.3 });
      scopeEl.addEventListener("pointermove", move);
      scopeEl.addEventListener("pointerover", over);
      scopeEl.addEventListener("pointerleave", leave);
      off = () => {
        scopeEl.removeEventListener("pointermove", move);
        scopeEl.removeEventListener("pointerover", over);
        scopeEl.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      cancelled = true;
      off();
    };
  }, [scopeSelector]);

  return (
    <div ref={ref} className="hover-preview" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- aperçu décoratif chargé à la volée */}
      {src ? <img src={src} alt="" /> : null}
    </div>
  );
}
