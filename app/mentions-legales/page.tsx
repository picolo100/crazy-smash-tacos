import { Breadcrumbs } from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site de Crazy Smash & Tacos, 27 avenue de Mâcon, Bourg-en-Bresse.",
  path: "/mentions-legales",
  noindex: true,
});

export default function LegalPage() {
  return (
    <div className="legal">
      <Breadcrumbs items={[{ name: "Mentions légales", path: "/mentions-legales" }]} />
      <h1>Mentions légales.</h1>
      <div className="prose">
        <h2>Éditeur du site</h2>
        <p>
          {business.name} (enseigne {business.shortName})
          <br />
          {business.address.oneLine}
          <br />
          Téléphone&nbsp;: <a href={business.phone.href}>{business.phone.display}</a>
          <br />
          Raison sociale et forme juridique&nbsp;: <span className="todo">à compléter par l’établissement</span>
          <br />
          SIRET&nbsp;: <span className="todo">à compléter</span> · Courriel&nbsp;: <span className="todo">à compléter</span>
        </p>
        <h2>Responsable de la publication</h2>
        <p>
          <span className="todo">Nom du responsable à compléter</span>
        </p>
        <h2>Hébergement</h2>
        <p>
          Cloudflare, Inc. (service Cloudflare Pages), 101 Townsend Street, San Francisco, CA 94107, États-Unis.{" "}
          <span className="todo">À adapter si un autre hébergeur est retenu.</span>
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le logo, les textes et les photographies de ce site appartiennent à {business.name} ou sont utilisés avec son autorisation. Toute reproduction
          sans accord préalable est interdite.
        </p>
        <h2>Prix et informations</h2>
        <p>
          Les prix et compositions affichés sont indicatifs et peuvent évoluer&nbsp;; seuls les prix affichés au restaurant font foi. Les avis cités
          proviennent de la fiche Google de l’établissement. Pour toute question sur les allergènes, adressez-vous à l’équipe avant de commander.
        </p>
      </div>
    </div>
  );
}
