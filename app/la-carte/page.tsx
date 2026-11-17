import Link from "next/link";
import { Breadcrumbs, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { MenuNav } from "@/components/ui/MenuNav";
import { HoverPreview } from "@/components/motion/HoverPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { menuSchema, pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { DRINK_PRICE, byCategory, dessert, drinks, flagLabel, price, sentence, studentMenu, type Dish } from "@/lib/menu";

export const metadata = pageMetadata({
  title: "La carte & les prix · Smash burgers, tacos, menu étudiant",
  description:
    "Carte complète de Crazy Smash & Tacos à Bourg-en-Bresse : 9 smash burgers dès 9 €, 5 tacos dès 10,90 €, menus avec frites et boisson, menu étudiant 8 €, desserts. 100 % halal.",
  path: "/la-carte",
});

const sections = [
  { id: "smash", label: "Smash burgers" },
  { id: "tacos", label: "Tacos" },
  { id: "etudiant", label: "Menu étudiant" },
  { id: "desserts", label: "Dessert" },
  { id: "boissons", label: "Boissons" },
];

function DishRows({ items, base }: { items: Dish[]; base: string }) {
  return (
    <tbody>
      {items.map((d) => (
        <tr key={d.slug} className="dish-row" data-preview={`/img/${d.photo}-550.webp`} data-reveal="fade">
          <td className="dish">
            <h3>
              <Link href={`${base}#${d.slug}`}>{d.name}</Link>
              {d.rank ? <span className="badge ink">N°{d.rank} des ventes</span> : null}
              {d.flags?.filter((f) => f !== "populaire").map((f) => (
                <span key={f} className={`badge${f === "exclu" ? " red" : ""}`}>
                  {flagLabel[f]}
                </span>
              ))}
            </h3>
            <p>{sentence(d.ingredients)}</p>
          </td>
          <td className="p">{price(d.solo)}</td>
          <td className="p alt">{d.menu ? price(d.menu) : <small>Sur place</small>}</td>
        </tr>
      ))}
    </tbody>
  );
}

const thead = (
  <thead>
    <tr>
      <th scope="col">Recette</th>
      <th scope="col">Seul</th>
      <th scope="col">
        En menu<span className="sr-only"> (frites + boisson)</span>
      </th>
    </tr>
  </thead>
);

export default function CartePage() {
  return (
    <>
      <JsonLd data={menuSchema()} />
      <section className="page-hero">
        <div>
          <Breadcrumbs items={[{ name: "La carte", path: "/la-carte" }]} />
          <h1>
            Smash.
            <br />
            <em>Tacos.</em>
            <br />
            Point.
          </h1>
          <p className="lead">
            Une carte courte, 100&nbsp;% halal, où tout est préparé à la commande. Chaque recette existe seule ou en menu, avec nos frites assaisonnées aux
            épices signature et une boisson.
          </p>
        </div>
        <figure className="hero-figure" data-rotate-scrub="5,0">
          <Photo name="studio-smash-bleu" alt="Smash bleu en studio : double steak, cheddar fondant, oignons caramélisés et sauce au bleu" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <MenuNav items={sections} />

      <div id="carte-tables">
        <section className="menu-block" id="smash" aria-labelledby="t-smash">
          <div className="section-head">
            <div>
              <SectionLabel n="01">Crazy smash</SectionLabel>
              <H2 id="t-smash">
                Smash
                <br />
                <em>burgers.</em>
              </H2>
            </div>
            <p className="lead muted">
              Viande écrasée minute sur la plaque pour une croûte caramélisée et un cœur juteux. Pain brioché, sauces maison.{" "}
              <Link className="text-link" href="/smash-burgers">
                Les recettes en photos
              </Link>
            </p>
          </div>
          <table className="menu-table">
            <caption className="sr-only">Smash burgers : prix seul et en menu</caption>
            {thead}
            <DishRows items={byCategory("smash")} base="/smash-burgers" />
          </table>
        </section>

        <section className="menu-block bg-ink" id="tacos" aria-labelledby="t-tacos">
          <div className="section-head">
            <div>
              <SectionLabel n="02">Crazy tacos</SectionLabel>
              <H2 id="t-tacos">
                Tacos
                <br />
                <em>chargés.</em>
              </H2>
            </div>
            <p className="lead muted">
              Galette grillée, frites à l’intérieur et sauce gruyère maison pour napper le tout.{" "}
              <Link className="text-link" href="/tacos">
                Les recettes en photos
              </Link>
            </p>
          </div>
          <table className="menu-table">
            <caption className="sr-only">Tacos : prix seul et en menu</caption>
            {thead}
            <DishRows items={byCategory("tacos")} base="/tacos" />
          </table>
        </section>
      </div>

      <section className="menu-block bg-cheddar" id="etudiant" aria-labelledby="t-etu">
        <div className="section-head">
          <div>
            <SectionLabel n="03">Formule</SectionLabel>
            <H2 id="t-etu">
              Menu Smash
              <br />
              Campus.
            </H2>
          </div>
          <div>
            <p className="big-price" style={{ fontSize: "clamp(5rem, 2rem + 8vw, 9rem)" }}>
              {studentMenu.price}&nbsp;€
            </p>
            <p className="lead">
              {studentMenu.contents.join(" + ")}, pour les étudiants. {studentMenu.when}.{" "}
              <Link className="text-link" href="/menu-etudiant">
                Détails
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="menu-block bg-paper" id="desserts" aria-labelledby="t-dessert">
        <div className="split">
          <div>
            <SectionLabel n="04">Dessert</SectionLabel>
            <H2 id="t-dessert">
              Pour
              <br />
              <em>finir.</em>
            </H2>
            <table className="menu-table">
              <tbody>
                <tr>
                  <td className="dish">
                    <h3>{dessert.name}</h3>
                    <p>{dessert.pitch}</p>
                  </td>
                  <td className="p alt">{price(dessert.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="frame photo" style={{ maxWidth: 420, justifySelf: "center", width: "100%" }}>
            <Photo name={dessert.photo} alt="Tiramisu artisanal en verrine" sizes="(max-width: 920px) 88vw, 420px" />
          </div>
        </div>
      </section>

      <section className="menu-block" id="boissons" aria-labelledby="t-boissons">
        <div className="section-head">
          <div>
            <SectionLabel n="05">Boissons</SectionLabel>
            <H2 id="t-boissons">
              Bien
              <br />
              <em>fraîches.</em>
            </H2>
          </div>
          <p className="lead muted">Canettes et bouteilles à {price(DRINK_PRICE)} à l’unité, et une boisson incluse dans chaque menu.</p>
        </div>
        <ul className="drinks" data-reveal-group="">
          {drinks.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <p className="menu-note">
          Prix TTC indicatifs relevés sur la carte de l’établissement, susceptibles d’évoluer : seuls les prix affichés au restaurant font foi. Recettes «&nbsp;Hiver&nbsp;»
          selon la saison. Allergies : parlez-en à l’équipe avant de commander.
        </p>
      </section>

      <HoverPreview scopeSelector="#carte-tables" />
      <Related
        items={[
          { href: "/smash-burgers", kicker: "En photos", title: "Les smash burgers", text: "9 recettes, de la technique au smash croissant." },
          { href: "/tacos", kicker: "En photos", title: "Les tacos", text: "5 tacos généreux, sauce gruyère maison." },
          { href: "/commander", kicker: "Commander", title: "Sur place, à emporter, livré", text: "Téléphone, comptoir ou Uber Eats." },
        ]}
      />
      <CtaStrip label="Une envie ? On s’en occupe" text="Commander en livraison" href={business.links.uberEats} />
    </>
  );
}
