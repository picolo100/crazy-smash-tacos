"use client";

import Link from "next/link";
import { business } from "@/lib/site";

/** Erreur d'exécution côté client : page de secours aux couleurs du site, avec les infos essentielles. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="not-found" aria-labelledby="err-title">
      <span className="code" aria-hidden="true">
        Oups
      </span>
      <p className="section-label">Erreur</p>
      <h1 id="err-title">
        Un souci <em>en cuisine.</em>
      </h1>
      <p className="lead">Cette page n’a pas pu s’afficher. Réessayez, ou appelez-nous directement.</p>
      <div className="btn-row" style={{ marginTop: 30 }}>
        <button type="button" className="btn btn-ink" onClick={() => reset()}>
          Réessayer
        </button>
        <a className="btn" href={business.phone.href}>
          Appeler · {business.phone.display}
        </a>
      </div>
      <p style={{ marginTop: 26 }}>
        <Link className="text-link" href="/">
          Retour à l’accueil
        </Link>
      </p>
    </section>
  );
}
