"use client";

import { useEffect, useRef, useState } from "react";

/** Navigation des rubriques de la carte : la rubrique active suit le scroll. */
export function MenuNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Garde le lien actif visible quand la barre défile horizontalement (mobile).
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (nav && link && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: link.offsetLeft - nav.clientWidth / 2 + link.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav ref={navRef} className="menu-nav" aria-label="Rubriques de la carte">
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={active === it.id ? "is-active" : undefined} aria-current={active === it.id ? "true" : undefined}>
          {it.label}
        </a>
      ))}
    </nav>
  );
}
