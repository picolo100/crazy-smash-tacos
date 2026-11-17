"use client";

import { useRef } from "react";
import { useMotion } from "@/lib/motion";

export type Step = { n: string; title: string; text: string; visual: "ball" | "press" | "cheese" };

/**
 * Procédé en 3 temps. Desktop : la section est épinglée et les étapes s'allument
 * une à une au fil du scroll (explication séquentielle). Mobile / mouvement réduit :
 * simple pile lisible.
 */
export function PinnedSteps({ steps, title, label }: { steps: Step[]; title: React.ReactNode; label: string }) {
  const root = useRef<HTMLElement>(null);

  useMotion(
    ({ gsap, ScrollTrigger }) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 921px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".step", root.current);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        cards.forEach((card, i) => {
          tl.fromTo(card, { y: 120, opacity: 0.15, rotate: i % 2 ? 3 : -3 }, { y: 0, opacity: 1, rotate: 0, duration: 1, ease: "power2.out" }, i * 0.8);
          tl.fromTo(card.querySelector(".visual"), { scale: 0.6 }, { scale: 1, duration: 0.8, ease: "back.out(2)" }, i * 0.8 + 0.3);
        });
        // L'épinglage ajoute un espace dans la page : recalcul des autres déclencheurs.
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      mm.add("(max-width: 920px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".step", root.current).forEach((card) => {
          gsap.from(card, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
      });
      return () => mm.revert();
    },
    [],
    { scope: root, idle: true },
  );

  return (
    <section ref={root} className="section bg-ink steps-section" aria-label={label}>
      <div className="section-head" style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
        <div>
          <p className="section-label">{label}</p>
          <h2 className="h2" style={{ marginBottom: 0 }}>
            {title}
          </h2>
        </div>
      </div>
      <ol className="steps" style={{ listStyle: "none" }}>
        {steps.map((s) => (
          <li key={s.n} className={`step step-${s.visual}`}>
            <span className="n" aria-hidden="true">
              {s.n}
            </span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="visual" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  );
}
