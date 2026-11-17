import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { Marquee } from "@/components/motion/Marquee";
import { Photo } from "@/components/ui/Photo";
import { Arrow, Button, H2, SectionLabel } from "@/components/ui/Primitives";
import { HoursTable } from "@/components/ui/HoursTable";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { MapFacade } from "@/components/ui/MapFacade";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { byCategory, dishes, price, sentence, studentMenu, topThree } from "@/lib/menu";
import { reviews } from "@/lib/reviews";

export const metadata = pageMetadata({
  title: "Crazy Smash & Tacos · Smash burgers & tacos halal à Bourg-en-Bresse",
  description:
    "Smash burgers écrasés minute et tacos généreux, 100 % halal, au 27 avenue de Mâcon à Bourg-en-Bresse. Menu étudiant 8 € le midi, ouvert jusqu’à 3 h le week-end.",
  path: "/",
});

const minPrice = (cat: "smash" | "tacos") => price(Math.min(...byCategory(cat).map((d) => d.solo)));
const smashCroissant = dishes.find((d) => d.slug === "smash-croissant")!;
const smashPoulet = dishes.find((d) => d.slug === "smash-poulet")!;

export default function HomePage() {
  return (
    <>
      <HomeHero
        photo={
          <Photo
            name="hero-smash-bleu"
            alt="Smash bleu : double steak smashé, cheddar fondant, bacon de bœuf, oignons caramélisés et sauce au bleu"
            sizes="(max-width: 920px) 84vw, 540px"
            priority
          />
        }
      />

      <Marquee items={["Smash minute", "100 % halal", "Tacos généreux", "Jusqu’à 3h le week-end", "Frites épices signature", "27 av. de Mâcon"]} />

      {/* 01 — Concept */}
      <section className="section" aria-labelledby="concept-title">
        <div className="concept">
          <div>
            <SectionLabel n="01">Le concept</SectionLabel>
            <H2 id="concept-title">
              Écrasé.
              <br />
              <em>Saisi.</em>
              <br />
              Servi.
            </H2>
            <p className="lead" data-reveal="">
              Chez CRAZY, la viande est smashée à la commande sur une plaque brûlante&nbsp;: une croûte caramélisée, un cœur juteux, et le cheddar qui fond
              dessus. Côté tacos, on charge sans compter et on nappe de sauce gruyère maison.
            </p>
            <ul className="points" data-reveal-group="">
              <li>
                <b>01</b>
                <div>
                  <h3>Préparé à la commande</h3>
                  <p>Chaque smash est écrasé et saisi au moment où vous commandez.</p>
                </div>
              </li>
              <li>
                <b>02</b>
                <div>
                  <h3>100&nbsp;% halal</h3>
                  <p>Toute la carte est halal, bacon de bœuf compris.</p>
                </div>
              </li>
              <li>
                <b>03</b>
                <div>
                  <h3>Sauces maison</h3>
                  <p>Gruyère, bleue, fumée, poivre, sauce verte et l’incontournable sauce Smash.</p>
                </div>
              </li>
            </ul>
            <p style={{ marginTop: 34 }} data-reveal="">
              <Link className="text-link" href="/le-concept">
                Le concept en détail <Arrow />
              </Link>
            </p>
          </div>
          <div className="photo-stack">
            <figure className="stack-card a" data-rotate-scrub="9,2">
              <Photo name="red-tacos" alt="Tacos grillé coupé en deux, garni de poulet mariné et de sauce gruyère" sizes="(max-width: 920px) 64vw, 420px" />
              <figcaption>Le tacos</figcaption>
            </figure>
            <figure className="stack-card b" data-rotate-scrub="-11,-3">
              <Photo name="red-smash-croissant" alt="Smash croissant : steaks smashés dans un croissant toasté, oignons caramélisés et sauce gruyère" sizes="(max-width: 920px) 54vw, 340px" />
              <figcaption>Le smash croissant</figcaption>
            </figure>
            <span className="sticker" data-reveal="scale">
              100&nbsp;%
              <br />
              halal
            </span>
          </div>
        </div>
      </section>

      {/* 02 — Top 3 */}
      <section className="section bg-paper" aria-labelledby="top-title">
        <div className="section-head">
          <div>
            <SectionLabel n="02">Les plus commandés</SectionLabel>
            <H2 id="top-title">
              Le top <em>3</em>
              <br />
              de la maison.
            </H2>
          </div>
          <p className="lead muted" data-reveal="">
            Les trois menus préférés des clients, servis avec nos frites assaisonnées aux épices signature et une boisson.
          </p>
        </div>
        <div className="product-grid">
          {topThree().map((d) => (
            <article className="product-card" key={d.slug} data-reveal="">
              <span className="badge ink rank">N°{d.rank}</span>
              <Photo name={d.menuPhoto ?? d.photo} alt={`Menu ${d.name} avec frites et boisson`} sizes="(max-width: 640px) 92vw, (max-width: 920px) 46vw, 30vw" />
              <div className="product-body">
                <h3>
                  <Link className="stretched" href={`/${d.category === "smash" ? "smash-burgers" : "tacos"}#${d.slug}`}>
                    Menu {d.name.toLowerCase()}
                  </Link>
                </h3>
                <p>{sentence(d.ingredients)}</p>
                <div className="product-foot">
                  <span className="tag">Frites + boisson</span>
                  {d.menu ? <span className="price-tag">{price(d.menu)}</span> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 54 }} data-reveal="">
          <Button href="/la-carte" variant="red">
            Toute la carte &amp; les prix <Arrow />
          </Button>
        </p>
      </section>

      {/* Aiguillage */}
      <section className="fork" aria-label="Choisir : smash burgers ou tacos">
        <article className="fork-item smash">
          <div>
            <SectionLabel>9 recettes · dès {minPrice("smash")}</SectionLabel>
            <h2>
              Smash
              <br />
              <em>burgers</em>
            </h2>
          </div>
          <div className="fork-photo" aria-hidden="true">
            <Photo name="bacon-smash" alt="" sizes="(max-width: 920px) 78vw, 560px" placeholder={false} />
          </div>
          <div className="fork-meta">
            <p>Viande écrasée minute, pain brioché, cheddar fondant. Du cheese smash au smash croissant.</p>
            <Link className="go stretched" href="/smash-burgers" aria-label="Découvrir les smash burgers">
              ↗
            </Link>
          </div>
        </article>
        <article className="fork-item tacos">
          <div>
            <SectionLabel>5 recettes · dès {minPrice("tacos")}</SectionLabel>
            <h2>
              Tacos
              <br />
              <em>chargés</em>
            </h2>
          </div>
          <div className="fork-photo" aria-hidden="true">
            <Photo name="tacos-mixte" alt="" sizes="(max-width: 920px) 56vw, 400px" />
          </div>
          <div className="fork-meta">
            <p>Galette grillée, frites à l’intérieur et sauce gruyère maison. Du classique au montagnard.</p>
            <Link className="go stretched" href="/tacos" aria-label="Découvrir les tacos">
              ↗
            </Link>
          </div>
        </article>
      </section>

      {/* 03 — Exclusivités */}
      <section className="section bg-ink" aria-labelledby="exclu-title">
        <div className="section-head">
          <div>
            <SectionLabel n="03">Exclusivités</SectionLabel>
            <H2 id="exclu-title">
              Introuvables
              <br />
              <em>ailleurs</em> à Bourg.
            </H2>
          </div>
          <p className="lead muted" data-reveal="">
            Deux recettes signées CRAZY, qu’on ne trouve nulle part ailleurs à Bourg-en-Bresse.
          </p>
        </div>
        <div className="exclu-grid">
          {[
            { d: smashCroissant, img: "red-smash-croissant" as const, alt: "Smash croissant garni de steaks smashés et d’oignons caramélisés" },
            { d: smashPoulet, img: "smash-poulet" as const, alt: "Smash poulet : filet de poulet mariné et smashé, salade et sauce verte dans un pain brioché" },
          ].map(({ d, img, alt }) => (
            <article className="exclu-card" key={d.slug}>
              <Photo name={img} alt={alt} sizes="(max-width: 920px) 92vw, 46vw" clip />
              <div className="exclu-copy">
                <span className="badge red">Exclu Bourg-en-Bresse</span>
                <h3>
                  <Link className="stretched" href={`/smash-burgers#${d.slug}`}>
                    {d.name}
                  </Link>
                </h3>
                <p>{sentence(d.ingredients)}</p>
                <span className="price-tag">{price(d.solo)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 04 — Menu étudiant */}
      <section className="section bg-cheddar" aria-labelledby="campus-title">
        <div className="campus">
          <figure className="campus-poster" data-rotate-scrub="-7,1">
            <Photo name="poster-menu-etudiant" alt="Affiche CRAZY : menu étudiant à 8 euros, Smash Campus, frites et boisson, du mardi au vendredi le midi" sizes="(max-width: 920px) 86vw, 460px" />
          </figure>
          <div>
            <SectionLabel n="04">Menu Smash Campus</SectionLabel>
            <p className="big-price" data-reveal="scale">
              {studentMenu.price}&nbsp;€
            </p>
            <H2 id="campus-title">
              Le midi,
              <br />
              pour les étudiants.
            </H2>
            <ul className="campus-list" data-reveal-group="">
              {studentMenu.contents.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="lead" data-reveal="">
              {studentMenu.when}, à deux pas du campus universitaire de Bourg-en-Bresse.
            </p>
            <p style={{ marginTop: 28 }} data-reveal="">
              <Button href="/menu-etudiant" variant="ink">
                Tout savoir sur le menu étudiant <Arrow />
              </Button>
            </p>
          </div>
        </div>
      </section>

      {/* 05 — Avis */}
      <section className="section" aria-labelledby="reviews-title">
        <div className="reviews">
          <div className="reviews-aside">
            <SectionLabel n="05">Ils en parlent</SectionLabel>
            <H2 id="reviews-title">
              Noté <em>5/5</em>
              <br />
              sur Google.
            </H2>
            <a className="score-big" href={business.links.reviews} target="_blank" rel="noopener noreferrer" data-reveal="">
              <b>{business.google.rating}</b>
              <span>
                <span className="stars" aria-hidden="true">
                  ★★★★★
                </span>
                <br />
                {business.google.count} avis Google ↗<span className="sr-only"> (nouvel onglet)</span>
              </span>
            </a>
          </div>
          <ul className="review-list">
            {reviews.slice(0, 5).map((r) => (
              <li key={r.author} data-reveal="">
                <blockquote>{r.quote}</blockquote>
                <span className="who">{r.author}</span>
                <span className="src">Avis Google · {new Date(r.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Venir */}
      <section className="section bg-ink" aria-labelledby="visit-title">
        <div className="visit">
          <div>
            <SectionLabel n="06">Venir</SectionLabel>
            <H2 id="visit-title">
              On vous attend
              <br />
              <em>avenue de Mâcon.</em>
            </H2>
            <OpenStatus />
            <div data-reveal="">
              <HoursTable />
            </div>
          </div>
          <div className="info-cards">
            <div className="info-card" data-reveal="">
              <small>Adresse</small>
              <strong>27 av. de Mâcon</strong>
              <p>01000 Bourg-en-Bresse · à proximité du campus universitaire</p>
              <div className="links">
                <Link className="text-link" href="/infos-pratiques">
                  Accès &amp; stationnement <Arrow />
                </Link>
              </div>
            </div>
            <div className="info-card" data-reveal="">
              <small>Commander</small>
              <strong>{business.phone.display}</strong>
              <p>Sur place, à emporter, ou en livraison via Uber Eats.</p>
              <div className="links">
                <a className="text-link" href={business.phone.href}>
                  Appeler
                </a>
                <Link className="text-link" href="/commander">
                  Toutes les options <Arrow />
                </Link>
              </div>
            </div>
            <div data-reveal="">
              <MapFacade />
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="final-cta" aria-labelledby="final-title">
        <span className="drift-word" aria-hidden="true" data-drift="">
          SMASH · TACOS · SMASH · TACOS · SMASH
        </span>
        <h2 className="big" id="final-title">
          T’as la dalle&nbsp;?
          <br />
          <span>On s’occupe du reste.</span>
        </h2>
        <div className="btn-row">
          <Button href={business.phone.href} variant="ink">
            Appeler · {business.phone.display}
          </Button>
          <Button href={business.links.uberEats}>
            Commander en livraison <Arrow />
          </Button>
        </div>
      </section>
    </>
  );
}
