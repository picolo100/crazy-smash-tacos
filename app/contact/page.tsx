import { Breadcrumbs, CtaStrip, H2, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HoursTable } from "@/components/ui/HoursTable";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact · Téléphone, adresse et avis",
  description:
    "Contacter Crazy Smash & Tacos à Bourg-en-Bresse : 06 25 82 49 67, 27 avenue de Mâcon. Commande à emporter par téléphone, livraison Uber Eats, avis Google.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="page-hero red">
        <div>
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <h1>
            Une petite
            <br />
            <em>faim&nbsp;?</em>
          </h1>
          <p className="lead">Un appel pour commander à emporter, l’appli pour vous faire livrer, ou directement au comptoir avenue de Mâcon.</p>
        </div>
        <figure className="hero-figure" data-rotate-scrub="6,0">
          <Photo name="menu-smash-poulet" alt="Menu smash poulet avec frites et boisson" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="contact-title">
        <div className="contact-grid">
          <div>
            <SectionLabel n="01">Nous joindre</SectionLabel>
            <H2 id="contact-title">
              Le plus simple,
              <br />
              <em>c’est d’appeler.</em>
            </H2>
            <p className="lead muted" data-reveal="">
              Pour une commande à emporter, précisez vos recettes, seules ou en menu, et l’heure à laquelle vous passez. Pour un groupe ou une grosse
              commande, appelez un peu à l’avance.
            </p>
            <OpenStatus />
          </div>
          <address className="contact-card" style={{ fontStyle: "normal" }} data-reveal="">
            <small>Téléphone</small>
            <a className="big" href={business.phone.href}>
              {business.phone.display} <span aria-hidden="true">↗</span>
            </a>
            <small>Livraison</small>
            <a className="big" href={business.links.uberEats} target="_blank" rel="noopener noreferrer">
              Uber Eats <span aria-hidden="true">↗</span>
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            <small>Sur place</small>
            <a className="big" href={business.links.directions} target="_blank" rel="noopener noreferrer">
              Itinéraire <span aria-hidden="true">↗</span>
              <span className="sr-only"> (Google Maps, nouvel onglet)</span>
            </a>
            <p>{business.address.oneLine}</p>
            <small>Votre avis compte</small>
            <a className="big" href={business.links.writeReview} target="_blank" rel="noopener noreferrer">
              Laisser un avis <span aria-hidden="true">↗</span>
              <span className="sr-only"> (Google, nouvel onglet)</span>
            </a>
          </address>
        </div>
      </section>

      <section className="section bg-ink" aria-labelledby="hours-title">
        <div className="visit">
          <div>
            <SectionLabel n="02">Horaires</SectionLabel>
            <H2 id="hours-title">
              On est là
              <br />
              <em>quand ?</em>
            </H2>
          </div>
          <div data-reveal="">
            <HoursTable />
          </div>
        </div>
      </section>
      <CtaStrip label="Direct au comptoir" text="Voir la carte" href="/la-carte" />
    </>
  );
}
