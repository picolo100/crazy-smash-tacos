"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoFull, LogoWord } from "@/components/brand/Logo";
import { business, mainNav } from "@/lib/site";
import { getOpenState } from "@/lib/hours";
import { useParisClock } from "@/lib/use-paris-clock";

const mobileExtra = [
  { href: "/le-concept", label: "Le concept" },
  { href: "/commander", label: "Commander" },
  { href: "/contact", label: "Contact" },
];

/**
 * En-tête flottant : se masque au défilement vers le bas, réapparaît vers le haut.
 * Menu mobile plein écran : focus géré, Échap pour fermer, reste de la page rendu inerte.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const now = useParisClock();
  const isOpenNow = now ? getOpenState(now.day, now.minute).open : false;

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Fermeture du menu lors d'un changement de page (pas de reprise du focus).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Masquage au scroll.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY + 4;
        const goingUp = y < lastY - 4;
        if (y < 120 || goingUp) setHidden(false);
        else if (goingDown) setHidden(true);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("header-hidden", hidden && !open);
  }, [hidden, open]);

  // Menu ouvert : page inerte, défilement bloqué, Échap pour fermer.
  useEffect(() => {
    const main = document.getElementById("contenu");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const call = document.querySelector<HTMLElement>(".mobile-call");
    [main, footer, call].forEach((el) => el?.toggleAttribute("inert", open));
    document.documentElement.classList.toggle("menu-open", open);
    window.dispatchEvent(new CustomEvent(open ? "crazy:lock" : "crazy:unlock"));
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        // Piège de focus entre le bouton du menu et les liens du panneau.
        const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const isCurrent = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <>
      <header className={`site-header${hidden && !open ? " is-hidden" : ""}`}>
        <div className="nav-bar">
          <Link className="brand" href="/" aria-label="Crazy Smash & Tacos, retour à l’accueil">
            <LogoFull className="brand-full" title="" />
            <LogoWord className="brand-word" title="" />
          </Link>
          <nav aria-label="Navigation principale">
            <ul className="nav-links">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-actions">
            <a className="nav-cta" href={business.phone.href} data-magnetic="">
              <span className={`dot${isOpenNow ? " is-open" : ""}`} aria-hidden="true" />
              <svg className="phone" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
              </svg>
              <span className="label">Appeler</span>
              <span className="sr-only"> Crazy Smash &amp; Tacos au {business.phone.display}</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="bars" aria-hidden="true" />
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={panelRef}
        className={`mobile-nav${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <nav aria-label="Menu mobile">
          <ul>
            {[{ href: "/", label: "Accueil" }, ...mainNav, ...mobileExtra].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href)}
                  tabIndex={open ? 0 : -1}
                  style={{ transitionDelay: open ? `${0.12 + i * 0.04}s` : "0s" }}
                  onClick={() => close(false)}
                >
                  <small aria-hidden="true">{String(i + 1).padStart(2, "0")}</small>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-nav-foot">
          <p>
            {business.address.oneLine}
            <br />
            Viande 100&nbsp;% halal · Sur place, à emporter, livraison
          </p>
          <a className="btn btn-ink" href={business.phone.href} tabIndex={open ? 0 : -1}>
            Appeler · {business.phone.display}
          </a>
        </div>
      </div>
    </>
  );
}
