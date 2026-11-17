import Link from "next/link";
import { Arrow, Breadcrumbs, Button, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { FaqList } from "@/components/ui/FaqList";
import { RecipeGrid } from "@/components/sections/RecipeGrid";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { byCategory, price } from "@/lib/menu";
import { faqs } from "@/lib/faq";

export const metadata = pageMetadata({
  title: "Tacos halal à Bourg-en-Bresse · Tacos mixte, crazy, montagnard",
  description:
    "Les tacos de CRAZY à Bourg-en-Bresse : galette grillée, poulet mariné, kefta, frites et sauce gruyère maison. 5 recettes dès 10,90 €, en menu avec frites et boisson. 100 % halal.",
  path: "/tacos",
});

const tacos = byCategory("tacos");
const from = price(Math.min(...tacos.map((d) => d.solo)));

export default function TacosPage() {
  const faq = faqs.filter((f) => ["La viande est-elle halal ?", "Peut-on manger sur place, emporter ou se faire livrer ?", "Êtes-vous ouverts tard le soir ?", "Comment connaître les allergènes ?"].includes(f.q));
  return (
    <>
      <section className="page-hero ink">
        <div>
          <Breadcrumbs items={[{ name: "Tacos", path: "/tacos" }]} />
          <h1>
            Tacos
            <br />
            <em>chargés.</em>
          </h1>
          <p className="lead">
            Cinq tacos à Bourg-en-Bresse, dès {from}. Galette grillée, viande marinée, frites à l’intérieur et notre sauce gruyère maison pour napper le
            tout. 100&nbsp;% halal, généreux, sans demi-mesure.
          </p>
          <div className="btn-row">
            <Button href="#recettes" variant="cheddar" magnetic={false}>
              Voir les tacos
            </Button>
            <Button href={business.links.uberEats} variant="ink">
              Se faire livrer <Arrow />
            </Button>
          </div>
        </div>
        <figure className="hero-figure" data-rotate-scrub="6,0">
          <Photo name="red-tacos" alt="Tacos grillé coupé en deux, garni de poulet mariné et de sauce gruyère" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="anatomy-title">
        <div className="split">
          <div>
            <SectionLabel n="01">Anatomie</SectionLabel>
            <H2 id="anatomy-title">
              Garni, nappé,
              <br />
              <em>grillé.</em>
            </H2>
            <div className="lead" data-reveal="">
              <p>
                Le tacos à la française se plie autour de sa garniture puis passe sous la presse : la galette dore et croustille, la sauce fromagère fond
                avec les frites et la viande.
              </p>
              <p>
                Chez CRAZY, la base c’est du poulet mariné et de la sauce gruyère maison. Ensuite, on monte d’un cran : kefta épicée pour le mixte, œuf,
                lardons et rösti pour le crazy, raclette en hiver pour le montagnard.{" "}
                <Link className="text-link" href="/guides/tacos-francais">
                  L’histoire du tacos français
                </Link>
              </p>
            </div>
          </div>
          <div className="frame photo" data-reveal="scale">
            <Photo name="tacos-crazy" alt="Tacos crazy coupé : poulet mariné, œuf, lardons, rösti et sauce gruyère" sizes="(max-width: 920px) 88vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="section bg-paper" id="recettes" aria-labelledby="recipes-title">
        <div className="section-head">
          <div>
            <SectionLabel n="02">Les recettes</SectionLabel>
            <H2 id="recipes-title">
              Cinq tacos,
              <br />
              <em>zéro regret.</em>
            </H2>
          </div>
          <p className="lead muted" data-reveal="">
            Prix seul et en menu (frites aux épices signature + boisson). Le montagnard est la recette de saison.
          </p>
        </div>
        <RecipeGrid items={tacos} />
        <p style={{ marginTop: 50 }} data-reveal="">
          <Link className="text-link" href="/la-carte">
            Comparer toute la carte et les prix <Arrow />
          </Link>
        </p>
      </section>

      <section className="section bg-ink" aria-labelledby="night-title">
        <div className="split">
          <div>
            <SectionLabel n="03">Tard le soir</SectionLabel>
            <H2 id="night-title">
              Un tacos
              <br />
              <em>à 2 h ?</em>
            </H2>
          </div>
          <div className="lead muted" data-reveal="">
            <p>
              Le vendredi et le samedi, CRAZY reste ouvert jusqu’à 3 h du matin. Le dimanche jusqu’à minuit, et jusqu’à 23 h du mardi au jeudi.
            </p>
            <p>
              <Link className="text-link" href="/infos-pratiques">
                Tous les horaires <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="section-head">
          <div>
            <SectionLabel n="04">Questions</SectionLabel>
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
          { href: "/smash-burgers", kicker: "L’autre spécialité", title: "Les smash burgers", text: "Neuf recettes, dont deux exclusivités à Bourg." },
          { href: "/commander", kicker: "Commander", title: "Livraison & à emporter", text: "Uber Eats, téléphone ou comptoir." },
          { href: "/guides/tacos-francais", kicker: "Guide", title: "Le tacos français", text: "D’où il vient et ce qui le distingue." },
        ]}
      />
      <CtaStrip label="Envie d’un tacos ?" text="Commander en livraison" href={business.links.uberEats} />
    </>
  );
}
