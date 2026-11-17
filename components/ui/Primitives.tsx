import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

/** Libellé numéroté des sections (« 01 / Le concept »), signature du site. */
export function SectionLabel({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="section-label" data-reveal="fade">
      {n ? <span className="num">{n}</span> : null}
      <span>{children}</span>
    </p>
  );
}

/** Titre de section avec révélation ligne par ligne. */
export function H2({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2 className={`h2 ${className}`} id={id} data-split>
      {children}
    </h2>
  );
}

export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "default" | "red" | "ink" | "cheddar";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Bouton-lien du design system (interne via next/link, externe en nouvel onglet). */
export function Button({ href, children, variant = "default", external, magnetic = true, className = "", ariaLabel }: BtnProps) {
  const cls = `btn${variant !== "default" ? ` btn-${variant}` : ""} ${className}`;
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  const data = magnetic ? { "data-magnetic": "" } : {};
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a
        className={cls}
        href={href}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={ariaLabel}
        {...data}
      >
        {children}
        {newTab ? <span className="sr-only"> (nouvel onglet)</span> : null}
      </a>
    );
  }
  return (
    <Link className={cls} href={href} aria-label={ariaLabel} {...data}>
      {children}
    </Link>
  );
}

/** Fil d'Ariane visible + BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Fil d’Ariane">
      <ol>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        {items.map((it, i) =>
          i === items.length - 1 ? (
            <li key={it.path} aria-current="page">
              {it.name}
            </li>
          ) : (
            <li key={it.path}>
              <Link href={it.path}>{it.name}</Link>
            </li>
          ),
        )}
      </ol>
      <JsonLd data={breadcrumbSchema(items)} />
    </nav>
  );
}

/** Bandeau rouge d'appel à l'action en bas de page. */
export function CtaStrip({ label, text, href }: { label: string; text: string; href: string }) {
  const ext = href.startsWith("http");
  const inner = (
    <>
      {text} <Arrow />
    </>
  );
  return (
    <section className="cta-strip" aria-label={label}>
      <small>{label}</small>
      {ext || href.startsWith("tel:") ? (
        <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      ) : (
        <Link href={href}>{inner}</Link>
      )}
    </section>
  );
}

/** Maillage interne : trois pages liées en fin de contenu. */
export function Related({ items }: { items: { href: string; kicker: string; title: string; text: string }[] }) {
  return (
    <section className="section tight bg-paper" aria-labelledby="related-title">
      <h2 id="related-title" className="section-label">
        À voir aussi
      </h2>
      <div className="related">
        {items.map((it) => (
          <Link key={it.href} href={it.href}>
            <small>{it.kicker}</small>
            <strong>{it.title}</strong>
            <span>{it.text}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
