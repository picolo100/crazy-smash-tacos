"use client";

import { useEffect, useRef } from "react";

/**
 * Bandeau défilant du site d'origine, réactif au scroll : il accélère avec la vitesse
 * de défilement et change de sens avec lui.
 * Le défilement est une animation CSS (exécutée par le compositeur, hors thread principal) ;
 * le JS ne fait qu'ajuster sa vitesse via l'API Web Animations.
 * Mouvement réduit : bandeau immobile.
 */
export function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = el.getAnimations()[0];
    if (!anim) return;

    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) anim.play();
      else anim.pause();
    });
    if (root.current) io.observe(root.current);

    let lastY = window.scrollY;
    let lastT = performance.now();
    let rate = 1;
    let target = 1;
    let dir = 1;
    let raf = 0;
    const tick = () => {
      // Retour progressif vers la vitesse de croisière, dans le sens du dernier défilement.
      target += (dir - target) * 0.04;
      rate += (target - rate) * 0.18;
      anim.playbackRate = rate;
      raf = Math.abs(rate - dir) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      if (!visible) return;
      const now = performance.now();
      const y = window.scrollY;
      const v = (y - lastY) / Math.max(16, now - lastT); // px/ms
      lastY = y;
      lastT = now;
      if (Math.abs(v) < 0.02) return;
      dir = v > 0 ? 1 : -1;
      target = dir * Math.min(5, 1 + Math.abs(v) * 2.2);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const half = items.flatMap((t, i) => [<span key={`t${i}`}>{t}</span>, <b key={`b${i}`}>✹</b>]);
  return (
    <div ref={root} className="ticker" aria-hidden="true">
      <div ref={track} className="ticker-track">
        <div className="ticker-half">{half}</div>
        <div className="ticker-half">{half}</div>
      </div>
    </div>
  );
}
