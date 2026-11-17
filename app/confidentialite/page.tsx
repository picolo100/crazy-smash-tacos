import { Breadcrumbs } from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Confidentialité & cookies",
  description: "Politique de confidentialité du site de Crazy Smash & Tacos : aucun cookie de mesure d’audience, plan Google Maps chargé uniquement sur demande.",
  path: "/confidentialite",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <div className="legal">
      <Breadcrumbs items={[{ name: "Confidentialité", path: "/confidentialite" }]} />
      <h1>Confiden&shy;tialité.</h1>
      <div className="prose">
        <h2>En bref</h2>
        <p>
          Ce site vitrine ne contient ni formulaire, ni compte client, ni outil de mesure d’audience, ni publicité. {business.name} ne collecte aucune
          donnée personnelle par son intermédiaire.
        </p>
        <h2>Cookies et stockage local</h2>
        <p>
          Le site ne dépose aucun cookie. Il enregistre seulement, dans le stockage de session de votre navigateur, une valeur technique
          (<code>crazy-intro</code>) qui évite de rejouer l’animation d’accueil pendant votre visite&nbsp;; elle est effacée à la fermeture de l’onglet et ne
          vous identifie pas.
        </p>
        <h2>Services tiers</h2>
        <ul>
          <li>
            <strong>Google Maps&nbsp;:</strong> le plan n’est chargé que si vous cliquez sur «&nbsp;Afficher le plan&nbsp;». Google peut alors déposer des cookies
            et recevoir votre adresse IP, selon sa propre politique de confidentialité.
          </li>
          <li>
            <strong>Uber Eats et Google&nbsp;:</strong> les liens de commande, d’itinéraire et d’avis ouvrent ces services, soumis à leurs propres conditions.
          </li>
          <li>
            <strong>Polices de caractères&nbsp;:</strong> elles sont hébergées avec le site&nbsp;; aucune requête n’est envoyée à un service de polices externe.
          </li>
        </ul>
        <h2>Hébergement</h2>
        <p>
          Comme tout hébergeur, Cloudflare traite les données techniques nécessaires à l’affichage des pages (adresse IP, journaux de connexion) pour des
          raisons de sécurité et de fonctionnement.
        </p>
        <h2>Contact</h2>
        <p>
          Pour toute question&nbsp;: <a href={business.phone.href}>{business.phone.display}</a> · <span className="todo">courriel à compléter</span>.
        </p>
      </div>
    </div>
  );
}
