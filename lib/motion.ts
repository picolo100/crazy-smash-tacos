"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextType } from "gsap/SplitText";

/**
 * Chargement différé de GSAP (+ ScrollTrigger, SplitText) et de Lenis.
 * Ces bibliothèques ne font pas partie du JS critique : elles sont téléchargées
 * après le premier rendu, ce qui préserve le LCP et l'interactivité.
 */
export type Motion = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType; SplitText: typeof SplitTextType };
export type MotionContext = ReturnType<typeof GsapType.context>;

let motionPromise: Promise<Motion> | null = null;

export function loadMotion(): Promise<Motion> {
  motionPromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(([g, st, sp]) => {
    const gsap = g.gsap;
    gsap.registerPlugin(st.ScrollTrigger, sp.SplitText);
    // Signale au script de démarrage que les animations sont prêtes (sinon filet de sécurité à 4 s).
    window.__crazyMotion = true;
    return { gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText };
  });
  // Échec réseau : on rend tout le contenu visible plutôt que de le laisser masqué.
  motionPromise.catch(() => document.documentElement.classList.remove("motion"));
  return motionPromise;
}

export const loadLenis = () => import("lenis").then((m) => m.default);

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// requestIdleCallback n'existe pas sur Safari < 18 : repli sur setTimeout.
const win = (): Window => window;
export const idle = (cb: () => void, timeout = 900): number =>
  typeof win().requestIdleCallback === "function" ? win().requestIdleCallback(cb, { timeout }) : win().setTimeout(cb, 120);
export const cancelIdle = (id: number) => (typeof win().cancelIdleCallback === "function" ? win().cancelIdleCallback(id) : win().clearTimeout(id));

type Setup = (m: Motion, ctx: MotionContext) => void | (() => void);

/**
 * Équivalent de useGSAP avec chargement différé : les animations créées dans `setup`
 * sont rattachées à un gsap.context() et annulées au démontage ou au changement de dépendances.
 * Rien n'est exécuté si l'utilisateur préfère réduire les animations.
 */
export function useMotion(setup: Setup, deps: DependencyList, opts: { scope?: RefObject<Element | null>; idle?: boolean } = {}) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let ctx: MotionContext | undefined;
    let cleanup: void | (() => void);
    const run = () =>
      loadMotion().then((m) => {
        if (cancelled) return;
        ctx = m.gsap.context((self) => {
          cleanup = setup(m, self);
        }, opts.scope?.current ?? undefined);
      });
    const id = opts.idle ? idle(run) : (run(), 0);
    return () => {
      cancelled = true;
      if (opts.idle) cancelIdle(id);
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // Les dépendances sont fournies par l'appelant (même contrat que useEffect).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
