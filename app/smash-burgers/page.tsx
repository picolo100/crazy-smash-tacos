import Link from "next/link";
import { Arrow, Breadcrumbs, Button, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { FaqList } from "@/components/ui/FaqList";
import { PinnedSteps } from "@/components/sections/PinnedSteps";
import { RecipeGrid } from "@/components/sections/RecipeGrid";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { byCategory, price, sauces } from "@/lib/menu";
import { faqs } from "@/lib/faq";

export const metadata = pageMetadata({
  title: "Smash burgers halal à Bourg-en-Bresse dès 9 €",
  description:
    "Smash burgers à Bourg-en-Bresse : viande écrasée minute, cheddar fondant, sauces maison. Du cheese smash au smash croissant exclusif. 100 % halal.",
  path: "/smash-burgers",
});

const smash = byCategory("smash");
const from = price(Math.min(...smash.map((d) => d.solo)));

export default function SmashPage() {
  const faq = faqs.filter((f) => ["Qu’est-ce qu’un smash burger ?", "La viande est-elle halal ?", "Que contiennent les menus ?", "Comment connaître les allergènes ?"].includes(f.q));
  return (
    <>
      <section className="page-hero red">
        <div>
          <Breadcrumbs items={[{ name: "Smash burgers", path: "/smash-burgers" }]} />
          <h1>
            Smash
            <br />
            <em>burgers.</em>
          </h1>
          <p className="lead">
            Neuf recettes de smash burgers à Bourg-en-Bresse, dès {from}. Viande écrasée minute sur la plaque, cheddar fondant, pain brioché et sauces
            maison, le tout 100&nbsp;% halal.
          </p>
          <div className="btn-row">
            <Button href="#recettes" variant="ink" magnetic={false}>
              Voir les recettes
            </Button>
            <Button href={business.phone.href}>Commander · {business.phone.display}</Button>
          </div>
        </div>
        <figure className="hero-figure" data-rotate-scrub="6,0">
          <Photo name="bacon-smash" alt="Bacon smash : steak smashé, cheddar fondant, bacon de bœuf et oignons caramélisés" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="split">
          <div>
            <SectionLabel n="01">La différence</SectionLabel>
            <H2 id="why-title">
              Fin, saisi,
              <br />
              <em>croustillant.</em>
            </H2>
          </div>
          <div className="lead" data-reveal="">
            <p>
              Un smash burger, c’est une boule de viande hachée écrasée d’un geste sur une plaque très chaude. Le steak devient fin, sa surface caramélise
              au contact du métal et forme une croûte croustillante, pendant que l’intérieur reste juteux.
            </p>
            <p>
              Chez CRAZY, chaque steak est smashé à la commande, jamais à l’avance. On le double quand la recette le demande, pour plus de croûte et plus
              de goût, et le cheddar fond directement dessus.{" "}
              <Link className="text-link" href="/guides/smash-burger">
                Le guide du smash burger
              </Link>
            </p>
          </div>
        </div>
      </section>

      <PinnedSteps
        label="02 / La technique en 3 temps"
        title={
          <>
            Boule, plaque,
            <br />
            <em>smash.</em>
          </>
        }
        steps={[
          { n: "01", visual: "ball", title: "La boule", text: "Une portion de viande hachée, façonnée en boule, part directement sur la plaque brûlante." },
          { n: "02", visual: "press", title: "Le smash", text: "On l’écrase d’un coup sec : la viande s’étale, la surface saisit et caramélise en quelques secondes." },
          { n: "03", visual: "cheese", title: "Le cheddar", text: "Retourné, le steak reçoit son cheddar qui fond aussitôt, avant de rejoindre le pain brioché." },
        ]}
      />

      <section className="section" id="recettes" aria-labelledby="recipes-title">
        <div className="section-head">
          <div>
            <SectionLabel n="03">Les recettes</SectionLabel>
            <H2 id="recipes-title">
              Neuf façons
              <br />
              <em>de smasher.</em>
            </H2>
          </div>
          <p className="lead muted" data-reveal="">
            Prix seul et en menu (frites aux épices signature + boisson). Les recettes « Hiver » sont proposées selon la saison.
          </p>
        </div>
        <RecipeGrid items={smash} />
        <p style={{ marginTop: 50 }} data-reveal="">
          <Link className="text-link" href="/la-carte">
            Comparer toute la carte et les prix <Arrow />
          </Link>
        </p>
      </section>

      <section className="section bg-cheddar" aria-labelledby="sauces-title">
        <SectionLabel n="04">Les sauces maison</SectionLabel>
        <H2 id="sauces-title">
          Le goût
          <br />
          <em>CRAZY.</em>
        </H2>
        <p className="lead" data-reveal="">
          Ce sont elles qui donnent son caractère à chaque recette. Sauce Smash pour les classiques, gruyère pour le croissant, bleue pour les amateurs de
          fromage, fumée ou poivre pour les burgers les plus affirmés.
        </p>
        <ul className="sauce-list" data-reveal-group="">
          {sauces.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="section-head">
          <div>
            <SectionLabel n="05">Questions</SectionLabel>
            <H2 id="faq-title">
              Avant de
              <br />
              <em>commander.</em>
            </H2>
          </div>
        </div>
        <FaqList items={faq} />
      </section>

      <Related
        items={[
          { href: "/tacos", kicker: "L’autre spécialité", title: "Les tacos", text: "Galette grillée, frites et sauce gruyère maison." },
          { href: "/menu-etudiant", kicker: "Le midi", title: "Menu étudiant 8 €", text: "Smash Campus, frites et boisson." },
          { href: "/guides/smash-burger", kicker: "Guide", title: "C’est quoi un smash ?", text: "Technique, origine et différences avec un burger classique." },
        ]}
      />
      <CtaStrip label="Faim de smash ?" text={`Appeler · ${business.phone.display}`} href={business.phone.href} />
    </>
  );
}
