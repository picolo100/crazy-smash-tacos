import Link from "next/link";
import { Arrow, Breadcrumbs, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { pageMetadata } from "@/lib/seo";
import { sauces } from "@/lib/menu";

export const metadata = pageMetadata({
  title: "Le concept : smash burgers & tacos faits minute",
  description:
    "CRAZY, snack de smash burgers et tacos à Bourg-en-Bresse : viande smashée à la commande, sauces maison, deux recettes exclusives, carte 100 % halal.",
  path: "/le-concept",
});

export default function ConceptPage() {
  return (
    <>
      <section className="page-hero red">
        <div>
          <Breadcrumbs items={[{ name: "Le concept", path: "/le-concept" }]} />
          <h1>
            Le smash,
            <br />
            <em>version</em>
            <br />
            CRAZY.
          </h1>
          <p className="lead">
            Un snack de quartier avenue de Mâcon, avec une obsession&nbsp;: la gourmandise. Smash burgers préparés à la commande, tacos généreux, recettes
            qui ne font rien à moitié, et une carte 100&nbsp;% halal pensée pour toutes les faims.
          </p>
        </div>
        <figure className="hero-figure" data-rotate-scrub="6,0">
          <Photo name="smash-poulet" alt="Smash poulet dans un pain brioché, salade et sauce verte" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="idea-title">
        <div className="split">
          <div>
            <SectionLabel n="01">L’idée</SectionLabel>
            <H2 id="idea-title">
              Deux classiques,
              <br />
              <em>sans compromis.</em>
            </H2>
          </div>
          <div className="lead" data-reveal="">
            <p>
              Le smash burger et le tacos ont un point commun&nbsp;: ils ne pardonnent pas l’à-peu-près. Un smash doit être écrasé au dernier moment pour
              garder sa croûte&nbsp;; un tacos doit être bien garni et passé à la presse pour rester croustillant.
            </p>
            <p>CRAZY s’est construit sur ces deux spécialités, et seulement elles, avec des frites assaisonnées aux épices signature pour les accompagner.</p>
          </div>
        </div>
        <div className="facts">
          <div className="fact" data-reveal="">
            <b>100&nbsp;%</b>
            <h3>Halal</h3>
            <p>Toute la carte, sans exception&nbsp;: bacon de bœuf, kefta, poulet mariné.</p>
          </div>
          <div className="fact" data-reveal="">
            <b>Minute</b>
            <h3>À la commande</h3>
            <p>Chaque smash est écrasé et saisi au moment où vous commandez.</p>
          </div>
          <div className="fact" data-reveal="">
            <b>2</b>
            <h3>Exclus à Bourg</h3>
            <p>Le smash croissant et le smash poulet, qu’on ne trouve que chez CRAZY.</p>
          </div>
        </div>
      </section>

      <section className="section bg-ink" aria-labelledby="exclu-title">
        <div className="split">
          <div className="frame photo" data-reveal="scale">
            <Photo name="red-smash-croissant" alt="Smash croissant : croissant toasté et smashé, steaks, oignons caramélisés" sizes="(max-width: 920px) 88vw, 45vw" />
          </div>
          <div>
            <SectionLabel n="02">Les exclusivités</SectionLabel>
            <H2 id="exclu-title">
              Un croissant,
              <br />
              <em>deux steaks.</em>
            </H2>
            <p className="lead muted" data-reveal="">
              Le smash croissant remplace le pain par des croissants toastés et smashés, garnis de deux steaks, de cheddar, d’oignons caramélisés maison,
              de lardons et de sauce gruyère. Son voisin, le smash poulet, applique la technique du smash à un filet de poulet mariné.
            </p>
            <p data-reveal="">
              <Link className="text-link" href="/smash-burgers#smash-croissant">
                Voir les exclusivités <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sauces-title">
        <SectionLabel n="03">Les sauces maison</SectionLabel>
        <H2 id="sauces-title">
          Le goût
          <br />
          <em>CRAZY.</em>
        </H2>
        <p className="lead muted" data-reveal="">
          Ce sont elles qui font la différence. Préparées chez nous, elles donnent son caractère à chaque recette.
        </p>
        <ul className="sauce-list" data-reveal-group="">
          {sauces.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="section bg-cheddar" aria-labelledby="campus-title">
        <div className="split">
          <div>
            <SectionLabel n="04">Le quartier</SectionLabel>
            <H2 id="campus-title">
              À deux pas
              <br />
              <em>du campus.</em>
            </H2>
          </div>
          <div className="lead" data-reveal="">
            <p>
              Installé au 27 avenue de Mâcon, CRAZY est voisin du campus universitaire de Bourg-en-Bresse. D’où le Menu Smash Campus à 8&nbsp;€ le midi,
              et des horaires qui suivent la vie étudiante&nbsp;: jusqu’à 3&nbsp;h le vendredi et le samedi.
            </p>
            <p>
              <Link className="text-link" href="/menu-etudiant">
                Le menu étudiant <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Related
        items={[
          { href: "/la-carte", kicker: "La carte", title: "Tous les prix", text: "Smash, tacos, menus, dessert, boissons." },
          { href: "/halal", kicker: "Engagement", title: "100 % halal", text: "Ce qu’il y a dans la carte." },
          { href: "/guides", kicker: "Guides", title: "Smash & tacos expliqués", text: "Technique, origine, différences." },
        ]}
      />
      <CtaStrip label="Prêt à goûter ?" text="Voir la carte" href="/la-carte" />
    </>
  );
}
