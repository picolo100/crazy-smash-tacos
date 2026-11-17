import { Arrow, Breadcrumbs, Button, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HoursTable } from "@/components/ui/HoursTable";
import { MapFacade } from "@/components/ui/MapFacade";
import { FaqList } from "@/components/ui/FaqList";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { faqs } from "@/lib/faq";

export const metadata = pageMetadata({
  title: "Horaires & accès · 27 avenue de Mâcon, Bourg-en-Bresse",
  description:
    "Horaires d’ouverture de Crazy Smash & Tacos (jusqu’à 3 h le week-end, fermé le lundi), adresse au 27 avenue de Mâcon à Bourg-en-Bresse, plan, stationnement et téléphone.",
  path: "/infos-pratiques",
});

export default function InfosPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <Breadcrumbs items={[{ name: "Infos pratiques", path: "/infos-pratiques" }]} />
          <h1>
            Infos
            <br />
            <em>pratiques.</em>
          </h1>
          <p className="lead">Horaires, adresse, accès et services&nbsp;: tout ce qu’il faut savoir avant de passer chez CRAZY.</p>
          <OpenStatus />
        </div>
        <figure className="hero-figure" data-rotate-scrub="6,0">
          <Photo name="menu-smash-croissant" alt="Menu smash croissant avec frites et boisson" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="hours-title">
        <div className="visit">
          <div>
            <SectionLabel n="01">Horaires</SectionLabel>
            <H2 id="hours-title">
              Quand
              <br />
              <em>passer ?</em>
            </H2>
            <div data-reveal="">
              <HoursTable />
            </div>
            <p className="menu-note">Menu étudiant&nbsp;: du mardi au vendredi, le midi uniquement. Jours fériés&nbsp;: un appel suffit pour vérifier.</p>
          </div>
          <div className="info-cards">
            <div className="info-card" data-reveal="">
              <small>Adresse</small>
              <strong>27 av. de Mâcon</strong>
              <p>01000 Bourg-en-Bresse, à proximité du campus universitaire.</p>
              <div className="links">
                <a className="text-link" href={business.links.directions} target="_blank" rel="noopener noreferrer">
                  Itinéraire Google Maps ↗<span className="sr-only"> (nouvel onglet)</span>
                </a>
              </div>
            </div>
            <div className="info-card" data-reveal="">
              <small>Téléphone</small>
              <strong>
                <a href={business.phone.href}>{business.phone.display}</a>
              </strong>
              <p>Pour commander à emporter ou poser une question.</p>
            </div>
            <div className="info-card" data-reveal="">
              <small>Services</small>
              <strong>Sur place · À emporter · Livraison</strong>
              <p>Livraison via Uber Eats, selon votre adresse.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ink" aria-labelledby="access-title">
        <div className="split">
          <div data-reveal="">
            <MapFacade />
          </div>
          <div>
            <SectionLabel n="02">Venir</SectionLabel>
            <H2 id="access-title">
              Accès &amp;
              <br />
              <em>stationnement.</em>
            </H2>
            <table className="hours" data-reveal="">
              <caption className="sr-only">Accès et informations utiles</caption>
              <tbody>
                <tr>
                  <th scope="row">En voiture</th>
                  <td>Stationnement gratuit dans la rue, parfois difficile aux heures de pointe.</td>
                </tr>
                <tr>
                  <th scope="row">À pied</th>
                  <td>À deux pas du campus universitaire de Bourg-en-Bresse.</td>
                </tr>
                <tr>
                  <th scope="row">Halal</th>
                  <td>Viande 100&nbsp;% halal sur toute la carte.</td>
                </tr>
                <tr>
                  <th scope="row">Budget</th>
                  <td>De 9&nbsp;€ (cheese smash) à 16,90&nbsp;€ (menu complet). Menu étudiant&nbsp;: 8&nbsp;€.</td>
                </tr>
              </tbody>
            </table>
            <div className="btn-row" style={{ marginTop: 30 }} data-reveal="">
              <Button href={business.phone.href}>Appeler</Button>
              <Button href="/la-carte" variant="red">
                La carte <Arrow />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <SectionLabel n="03">Avant de venir</SectionLabel>
        <H2 id="faq-title">
          Bon
          <br />
          <em>à savoir.</em>
        </H2>
        <FaqList items={faqs.filter((f) => f.topic === "pratique")} />
      </section>

      <Related
        items={[
          { href: "/commander", kicker: "Commander", title: "Livraison & à emporter", text: "Uber Eats, téléphone ou comptoir." },
          { href: "/la-carte", kicker: "Choisir", title: "La carte & les prix", text: "Smash, tacos, menus et dessert." },
          { href: "/contact", kicker: "Contact", title: "Nous joindre", text: "Téléphone, adresse, avis Google." },
        ]}
      />
      <CtaStrip label="On se voit bientôt ?" text={`Appeler · ${business.phone.display}`} href={business.phone.href} />
    </>
  );
}
