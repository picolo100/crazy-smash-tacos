"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { Button, Arrow } from "@/components/ui/Primitives";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { business } from "@/lib/site";
import { useMotion } from "@/lib/motion";

/** Titre découpé en caractères au rendu (statique) : l'entrée est animée en CSS, sans JS. */
const TITLE: { text: string; cls?: string }[][] = [[{ text: "Crazy" }], [{ text: "Smash", cls: "outline" }, { text: " " }, { text: "&", cls: "amp" }], [{ text: "Tacos" }]];

function SplitTitle() {
  let i = 0;
  return (
    <span className="title" aria-hidden="true">
      {TITLE.map((line, l) => (
        <span className="line" key={l}>
          {line.map((part, p) =>
            part.text === " " ? (
              " "
            ) : (
              <span className={part.cls} key={p}>
                {[...part.text].map((ch) => (
                  <span className="char" key={i} style={{ "--i": i++ } as CSSProperties}>
                    {ch}
                  </span>
                ))}
              </span>
            ),
          )}
        </span>
      ))}
    </span>
  );
}

/**
 * Héros de l'accueil (composition d'origine : grand titre empilé, photo inclinée,
 * pastille d'avis tournante, sticker prix). Entrée en CSS (styles/motion.css),
 * profondeur au scroll et inclinaison au survol ajoutées ensuite par GSAP.
 */
export function HomeHero({ photo }: { photo: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useMotion(
    ({ gsap }) => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      gsap.to(q(".hero-visual"), { yPercent: -10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".hero-bg-word"), { xPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

      const card = q(".hero-photo")[0] as HTMLElement | undefined;
      if (!card || !window.matchMedia("(pointer: fine)").matches) return;
      gsap.set(card, { transformPerspective: 900 });
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      };
    },
    [],
    { idle: true },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <span className="hero-bg-word" aria-hidden="true">
        CRAZY
      </span>
      <div className="hero-copy">
        <h1 id="hero-title">
          <span className="kicker">Smash burgers &amp; tacos halal · Bourg-en-Bresse</span>
          <span className="sr-only">Crazy Smash &amp; Tacos</span>
          <SplitTitle />
        </h1>
        <p className="hero-sub">
          Des smash burgers écrasés minute sur la plaque, des tacos bien chargés et des frites aux épices signature. 100&nbsp;% halal, à deux pas du
          campus.
        </p>
        <div className="btn-row hero-actions">
          <Button href="/la-carte" variant="ink">
            Voir la carte <Arrow />
          </Button>
          <Button href={business.phone.href}>Appeler · {business.phone.display}</Button>
        </div>
        <ul className="hero-tags" aria-label="Services">
          <li>100&nbsp;% halal</li>
          <li>Sur place</li>
          <li>À emporter</li>
          <li>Livraison</li>
        </ul>
        <OpenStatus />
      </div>

      <div className="hero-visual">
        <div className="hero-visual-in">
          <a className="rating-badge" href={business.links.reviews} target="_blank" rel="noopener noreferrer">
            <span className="disc" aria-hidden="true" />
            <svg viewBox="0 0 156 156" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M78,78 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
              </defs>
              <text>
                <textPath href="#badge-circle">avis google · avis google · avis google ·</textPath>
              </text>
            </svg>
            <span className="score">
              <b>{business.google.rating}</b>
              <span aria-hidden="true">★★★★★</span>
              <span className="sr-only">
                {" "}
                sur 5, {business.google.count} avis Google (nouvel onglet)
              </span>
            </span>
          </a>
          <figure className="hero-photo" style={{ margin: 0, position: "relative", overflow: "hidden" }}>
            {photo}
            <figcaption>Smash bleu</figcaption>
          </figure>
          <div className="price-sticker">
            Menu étudiant<b>8&nbsp;€</b>le midi
          </div>
        </div>
      </div>
    </section>
  );
}
