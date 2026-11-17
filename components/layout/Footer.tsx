import Link from "next/link";
import { LogoFull } from "@/components/brand/Logo";
import { business, footerNav } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="brand-mark" aria-label="Crazy Smash & Tacos, accueil">
            <LogoFull title="" />
          </Link>
          <p>Smash burgers préparés à la commande, tacos généreux et frites aux épices signature. Carte 100&nbsp;% halal, avenue de Mâcon.</p>
        </div>
        {footerNav.map((col) => (
          <nav className="footer-col" key={col.title} aria-label={col.title}>
            <h2>{col.title}</h2>
            <ul>
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href}>{it.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-contact">
        <div>
          <small>Adresse</small>
          <a href={business.links.directions} target="_blank" rel="noopener noreferrer">
            27 av. de Mâcon, Bourg-en-Bresse
            <span className="sr-only"> (itinéraire, nouvel onglet)</span>
          </a>
        </div>
        <div>
          <small>Téléphone</small>
          <a href={business.phone.href}>{business.phone.display}</a>
        </div>
        <div>
          <small>Livraison</small>
          <a href={business.links.uberEats} target="_blank" rel="noopener noreferrer">
            Uber Eats ↗<span className="sr-only"> (nouvel onglet)</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} {business.name} · Viande 100&nbsp;% halal
        </span>
        <span>
          <Link href="/mentions-legales">Mentions légales</Link> · <Link href="/confidentialite">Confidentialité</Link>
        </span>
      </div>
      <p className="footer-giant" aria-hidden="true">
        CRAZY
      </p>
    </footer>
  );
}
