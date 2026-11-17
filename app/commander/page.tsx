import { Arrow, Breadcrumbs, Button, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HoursTable } from "@/components/ui/HoursTable";
import { FaqList } from "@/components/ui/FaqList";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { faqs } from "@/lib/faq";

export const metadata = pageMetadata({
  title: "Commander : livraison, à emporter ou sur place à Bourg-en-Bresse",
  description:
    "Commander chez CRAZY à Bourg-en-Bresse : livraison via Uber Eats, à emporter par téléphone au 06 25 82 49 67, ou sur place au 27 avenue de Mâcon. Ouvert jusqu’à 3 h le week-end.",
  path: "/commander",
});

const modes = [
  {
    n: "01",
    title: "Sur place",
    text: "Installez-vous au 27 avenue de Mâcon. Tout est préparé à la commande, servi chaud.",
    cta: { href: business.links.directions, label: "Itinéraire" },
    photo: "menu-smash-poulet" as const,
  },
  {
    n: "02",
    title: "À emporter",
    text: `Appelez le ${business.phone.display} pour passer commande, puis récupérez-la au comptoir.`,
    cta: { href: business.phone.href, label: "Appeler" },
    photo: "menu-tacos-classique" as const,
  },
  {
    n: "03",
    title: "En livraison",
    text: "Toute la carte est disponible sur Uber Eats, selon votre adresse et les horaires d’ouverture.",
    cta: { href: business.links.uberEats, label: "Ouvrir Uber Eats" },
    photo: "menu-smash-croissant" as const,
  },
];

export default function OrderPage() {
  return (
    <>
      <section className="page-hero red">
        <div>
          <Breadcrumbs items={[{ name: "Commander", path: "/commander" }]} />
          <h1>
            Sur place,
            <br />
            emporté
            <br />
            <em>ou livré.</em>
          </h1>
          <p className="lead">Trois façons de commander chez CRAZY à Bourg-en-Bresse. Choisissez la vôtre&nbsp;: on s’occupe du reste.</p>
          <OpenStatus />
        </div>
        <figure className="hero-figure" data-rotate-scrub="6,0">
          <Photo name="menu-bacon-smash" alt="Menu bacon smash avec frites et boisson" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="modes-title">
        <SectionLabel n="01">Les options</SectionLabel>
        <H2 id="modes-title">
          Comment
          <br />
          <em>commander ?</em>
        </H2>
        <div className="product-grid" style={{ marginTop: 40 }}>
          {modes.map((m) => (
            <article key={m.n} className="product-card" data-reveal="">
              <span className="badge ink rank">{m.n}</span>
              <Photo name={m.photo} alt="" sizes="(max-width: 640px) 92vw, (max-width: 920px) 46vw, 30vw" />
              <div className="product-body">
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <div className="product-foot">
                  <Button href={m.cta.href} variant="red" magnetic={false}>
                    {m.cta.label} <Arrow />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-ink" aria-labelledby="hours-title">
        <div className="visit">
          <div>
            <SectionLabel n="02">Quand commander</SectionLabel>
            <H2 id="hours-title">
              Ouvert
              <br />
              <em>jusqu’à 3 h.</em>
            </H2>
            <p className="lead muted" data-reveal="">
              Le vendredi et le samedi, CRAZY reste ouvert jusqu’à 3 h du matin&nbsp;: de quoi finir la soirée sur un tacos ou un smash.
            </p>
          </div>
          <div data-reveal="">
            <OpenStatus />
            <HoursTable />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <SectionLabel n="03">Questions</SectionLabel>
        <H2 id="faq-title">
          Bon
          <br />
          <em>à savoir.</em>
        </H2>
        <FaqList items={faqs.filter((f) => f.topic === "commande")} />
      </section>

      <Related
        items={[
          { href: "/la-carte", kicker: "Choisir", title: "La carte & les prix", text: "Smash, tacos, menus et dessert." },
          { href: "/infos-pratiques", kicker: "Venir", title: "Accès & stationnement", text: "Plan, horaires et conseils." },
          { href: "/menu-etudiant", kicker: "Le midi", title: "Menu étudiant 8 €", text: "Du mardi au vendredi." },
        ]}
      />
      <CtaStrip label="Prêt ?" text={`Appeler · ${business.phone.display}`} href={business.phone.href} />
    </>
  );
}
