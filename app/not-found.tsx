import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Button } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="nf-title">
      <span className="code" aria-hidden="true">
        404
      </span>
      <p className="section-label">Erreur 404</p>
      <h1 id="nf-title">
        Cette page a été <em>smashée.</em>
      </h1>
      <p className="lead">Elle n’existe pas ou plus. Le reste de la carte, lui, est bien là.</p>
      <div className="btn-row" style={{ marginTop: 30 }}>
        <Button href="/" variant="ink">
          Retour à l’accueil
        </Button>
        <Button href="/la-carte">
          Voir la carte <Arrow />
        </Button>
      </div>
      <p style={{ marginTop: 26 }}>
        <Link className="text-link" href="/infos-pratiques">
          Horaires &amp; accès
        </Link>
      </p>
    </section>
  );
}
