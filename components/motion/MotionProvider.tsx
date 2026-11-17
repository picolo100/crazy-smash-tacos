"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { idle, cancelIdle, loadLenis, loadMotion, prefersReducedMotion, useMotion } from "@/lib/motion";
import { Cursor } from "./Cursor";

declare global {
  interface Window {
    __crazyMotion?: boolean;
    __crazyLenis?: Lenis;
  }
}

let firstRender = true;

/**
 * Chorégraphie globale, pilotée par attributs déclaratifs :
 *  - data-split                titres révélés ligne par ligne (masque), découpés à l'approche
 *  - data-reveal[=fade|scale]  apparition au scroll (IntersectionObserver + CSS)
 *  - data-reveal-group         enfants révélés en cascade (IntersectionObserver + CSS)
 *  - data-clip                 image dévoilée par un masque vertical (IntersectionObserver + CSS)
 *  - data-parallax="n"         décalage vertical lié au scroll (en %)
 *  - data-rotate-scrub="a,b"   rotation liée au scroll
 *  - data-drift                mot géant qui glisse horizontalement
 *  - data-magnetic             bouton attiré par le pointeur (souris uniquement)
 * GSAP et Lenis sont chargés après le premier rendu ; tout est rattaché à un
 * gsap.context() annulé à chaque changement de page.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Défilement doux (Lenis), chargé à la volée et synchronisé avec le ticker GSAP.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let disposed = false;
    let teardown = () => {};
    const id = idle(async () => {
      const [LenisCtor, { gsap, ScrollTrigger }] = await Promise.all([loadLenis(), loadMotion()]);
      if (disposed) return;
      const lenis = new LenisCtor({ lerp: 0.11, anchors: { offset: -96 }, autoRaf: false });
      lenisRef.current = lenis;
      window.__crazyLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      const lock = () => lenis.stop();
      const unlock = () => lenis.start();
      window.addEventListener("crazy:lock", lock);
      window.addEventListener("crazy:unlock", unlock);
      teardown = () => {
        window.removeEventListener("crazy:lock", lock);
        window.removeEventListener("crazy:unlock", unlock);
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenisRef.current = null;
      };
    }, 1500);
    return () => {
      disposed = true;
      cancelIdle(id);
      teardown();
    };
  }, []);

  // Apparitions au scroll : IntersectionObserver + transitions CSS (styles/motion.css).
  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;
    const els = root.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group], [data-clip]");
    els.forEach((el) => {
      if (el.hasAttribute("data-reveal-group")) Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--gi", String(i)));
    });
    // Fin de transition : l'élément retrouve ses propres transitions (survol…).
    // Les groupes gardent la leur (leurs enfants n'ont pas d'effet de survol).
    const done = (e: TransitionEvent) => {
      const el = e.currentTarget as HTMLElement;
      if (e.target !== el) return;
      el.classList.add("is-done");
      el.removeEventListener("transitionend", done);
    };
    const io = new IntersectionObserver(
      (entries) => {
        // Les éléments entrés ensemble apparaissent en cascade.
        entries
          .filter((en) => en.isIntersecting)
          .forEach((en, i) => {
            const el = en.target as HTMLElement;
            if (!el.hasAttribute("data-reveal-group")) el.style.setProperty("--rd", `${Math.min(i, 5) * 90}ms`);
            if (!el.hasAttribute("data-reveal-group")) el.addEventListener("transitionend", done);
            el.classList.add("is-in");
            io.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => el.removeEventListener("transitionend", done));
    };
  }, [pathname]);

  // Retour en haut à chaque nouvelle page (sauf ancre).
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  useMotion(
    ({ gsap, ScrollTrigger, SplitText }, ctx) => {
      const root = scope.current;
      if (!root) return;
      const isFirst = firstRender;
      firstRender = false;

      // Entrée de page lors d'une navigation interne (pas au premier chargement).
      const main = root.querySelector("main");
      if (!isFirst && main) {
        gsap.fromTo(main, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity,visibility" });
      }

      const fine = window.matchMedia("(pointer: fine)").matches;
      const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root);
      const cleanups: (() => void)[] = [];

      const splitHeading = (el: HTMLElement) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { opacity: 1 });
            // Libellé accessible lisible (les <br> ne produisent pas d'espace dans textContent).
            el.setAttribute("aria-label", el.innerText.replace(/\s+/g, " ").trim());
            return gsap.from(self.lines, {
              yPercent: 112,
              rotate: 2,
              duration: 1.05,
              ease: "power4.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      };

      // Titres : découpés seulement à l'approche (évite de mesurer toute la page au chargement).
      q<HTMLElement>("[data-split]").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top bottom+=240", once: true, onEnter: () => ctx.add(() => splitHeading(el)) });
      });

      // Parallaxe, rotations et dérives liées au scroll.
      q<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 10;
        gsap.fromTo(el, { yPercent: -amount / 2 }, { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      q<HTMLElement>("[data-rotate-scrub]").forEach((el) => {
        const [from = -8, to = 4] = (el.dataset.rotateScrub ?? "").split(",").map(Number);
        gsap.fromTo(el, { rotate: from }, { rotate: to, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      q<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.fromTo(el, { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // Boutons magnétiques (souris uniquement).
      if (fine) {
        q<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.18);
            yTo((e.clientY - r.top - r.height / 2) * 0.24);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      // Polices et images peuvent décaler les positions : recalcul une fois tout chargé.
      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") requestAnimationFrame(refresh);
      else window.addEventListener("load", refresh, { once: true });

      return () => {
        window.removeEventListener("load", refresh);
        cleanups.forEach((off) => off());
      };
    },
    [pathname],
    { scope, idle: true },
  );

  return (
    <div ref={scope}>
      {children}
      <Cursor />
    </div>
  );
}
