import Link from "next/link";
import { Arrow, Breadcrumbs, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { FaqList } from "@/components/ui/FaqList";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { faqs } from "@/lib/faq";

export const metadata = pageMetadata({
  title: "Burger & tacos halal à Bourg-en-Bresse · Carte 100 % halal",
  description:
    "CRAZY, restaurant halal à Bourg-en-Bresse : toute la carte est 100 % halal, du smash burger au tacos, bacon de bœuf compris. 27 avenue de Mâcon, sur place, à emporter, livraison.",
  path: "/halal",
});

const meats = [
  { name: "Steak haché smashé", where: "Tous les smash burgers" },
  { name: "Bacon de bœuf", where: "Bacon smash, smash bleu, tacos bacon" },
  { name: "Poulet mariné", where: "Tous les tacos, smash poulet" },
  { name: "Kefta épicée", where: "Tacos mixte" },
  { name: "Lardons", where: "Smash croissant, smash montagnard, tacos crazy, tacos montagnard" },
];

export default function HalalPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <Breadcrumbs items={[{ name: "100 % halal", path: "/halal" }]} />
          <h1>
            100&nbsp;%
            <br />
            <em>halal.</em>
          </h1>
          <p className="lead">
            Chez CRAZY, toute la carte est halal. Pas une sélection, pas une option&nbsp;: chaque smash burger et chaque tacos, bacon de bœuf et lardons
            compris.
          </p>
        </div>
        <figure className="hero-figure" data-rotate-scrub="6,0">
          <Photo name="smash-croissant" alt="Smash croissant : steaks smashés, cheddar, oignons caramélisés, lardons et sauce gruyère" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="meats-title">
        <div className="section-head">
          <div>
            <SectionLabel n="01">Les viandes</SectionLabel>
            <H2 id="meats-title">
              Ce qu’il y a
              <br />
              <em>dans la carte.</em>
            </H2>
          </div>
          <p className="lead muted" data-reveal="">
            Toutes les viandes servies chez CRAZY sont halal. Pour toute question sur l’approvisionnement, adressez-vous à l’équipe, au comptoir
            ou par téléphone.
          </p>
        </div>
        <table className="menu-table">
          <caption className="sr-only">Viandes et charcuteries halal utilisées dans la carte</caption>
          <thead>
            <tr>
              <th scope="col">Viande</th>
              <th scope="col">Dans quelles recettes</th>
            </tr>
          </thead>
          <tbody>
            {meats.map((m) => (
              <tr key={m.name} data-reveal="fade">
                <td className="dish">
                  <h3>{m.name}</h3>
                </td>
                <td style={{ textAlign: "right", color: "var(--muted)" }}>{m.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section bg-ink" aria-labelledby="bacon-title">
        <div className="split">
          <div className="frame photo" data-reveal="scale">
            <Photo name="smash-bleu" alt="Smash bleu au bacon de bœuf et oignons caramélisés" sizes="(max-width: 920px) 88vw, 45vw" />
          </div>
          <div>
            <SectionLabel n="02">Bacon de bœuf</SectionLabel>
            <H2 id="bacon-title">
              Le goût fumé,
              <br />
              <em>en halal.</em>
            </H2>
            <p className="lead muted" data-reveal="">
              Le bacon de nos recettes est un bacon de bœuf&nbsp;: il apporte le côté fumé et croustillant attendu dans un bacon smash ou un tacos bacon,
              tout en restant dans une carte entièrement halal.
            </p>
            <p data-reveal="">
              <Link className="text-link" href="/smash-burgers#bacon-smash">
                Le bacon smash <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <SectionLabel n="03">Questions</SectionLabel>
        <H2 id="faq-title">
          Halal :
          <br />
          <em>vos questions.</em>
        </H2>
        <FaqList items={faqs.filter((f) => ["La viande est-elle halal ?", "Comment connaître les allergènes ?", "Y a-t-il des options végétariennes ?"].includes(f.q))} />
      </section>

      <Related
        items={[
          { href: "/smash-burgers", kicker: "Halal", title: "Smash burgers", text: "Neuf recettes, viande smashée minute." },
          { href: "/tacos", kicker: "Halal", title: "Tacos", text: "Poulet mariné, kefta, sauce gruyère maison." },
          { href: "/infos-pratiques", kicker: "Venir", title: "Horaires & accès", text: "27 avenue de Mâcon, Bourg-en-Bresse." },
        ]}
      />
      <CtaStrip label="Une question sur la carte ?" text={`Appeler · ${business.phone.display}`} href={business.phone.href} />
    </>
  );
}
