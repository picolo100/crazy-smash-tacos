import { Arrow, Breadcrumbs, Button, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { studentMenu } from "@/lib/menu";

export const metadata = pageMetadata({
  title: "Menu étudiant 8 € à Bourg-en-Bresse · Menu Smash Campus",
  description:
    "Menu Smash Campus à 8 € chez CRAZY : smash burger, frites et boisson, du mardi au vendredi le midi, à deux pas du campus universitaire de Bourg-en-Bresse. Viande halal.",
  path: "/menu-etudiant",
});

export default function StudentPage() {
  return (
    <>
      <section className="page-hero cheddar">
        <div>
          <Breadcrumbs items={[{ name: "Menu étudiant", path: "/menu-etudiant" }]} />
          <h1>
            Menu Smash
            <br />
            <em>Campus</em>
            <br />
            8&nbsp;€.
          </h1>
          <p className="lead">
            Étudiant à Bourg-en-Bresse&nbsp;? CRAZY pense à ton budget et à ta dalle&nbsp;: un Smash Campus, des frites et une boisson, le tout pour
            8&nbsp;€, à deux pas du campus.
          </p>
          <div className="btn-row">
            <Button href={business.links.directions} variant="ink">
              Itinéraire <Arrow />
            </Button>
            <Button href={business.phone.href}>Appeler · {business.phone.display}</Button>
          </div>
        </div>
        <figure className="hero-figure" style={{ aspectRatio: "4 / 5", rotate: "-3deg", transform: "none", background: "var(--ink)" }}>
          <Photo name="poster-menu-etudiant" alt="Affiche du menu étudiant CRAZY à 8 euros : Smash Campus, frites et boisson" sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section" aria-labelledby="inside-title">
        <SectionLabel n="01">Dans le menu</SectionLabel>
        <H2 id="inside-title">
          Trois choses,
          <br />
          <em>un prix.</em>
        </H2>
        <div className="facts">
          <div className="fact" data-reveal="">
            <b>01</b>
            <h3>{studentMenu.contents[0]}</h3>
            <p>Le smash spécial étudiants, préparé minute à la commande.</p>
          </div>
          <div className="fact" data-reveal="">
            <b>02</b>
            <h3>{studentMenu.contents[1]}</h3>
            <p>Assaisonnées aux épices signature, bien croustillantes.</p>
          </div>
          <div className="fact" data-reveal="">
            <b>03</b>
            <h3>{studentMenu.contents[2]}</h3>
            <p>Une boisson fraîche, à choisir au comptoir.</p>
          </div>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="when-title">
        <div className="split">
          <div>
            <SectionLabel n="02">Quand ?</SectionLabel>
            <H2 id="when-title">
              Du mardi
              <br />
              au vendredi,
              <br />
              <em>le midi.</em>
            </H2>
            <p className="lead muted" data-reveal="">
              Le Menu Smash Campus est servi de 12 h à 13 h 30, uniquement le midi. Il n’est pas proposé le soir ni le week-end. Pour les conditions
              (justificatif étudiant), renseignez-vous au comptoir.
            </p>
          </div>
          <div className="frame photo" data-reveal="scale" style={{ background: "#fff" }}>
            <Photo name="menu-cheese-smash" alt="Smash burger, frites et canette" sizes="(max-width: 920px) 88vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="section bg-ink" aria-labelledby="more-title">
        <SectionLabel n="03">Et le reste de la semaine</SectionLabel>
        <H2 id="more-title">
          La dalle
          <br />
          <em>à toute heure.</em>
        </H2>
        <div className="facts">
          <div className="fact" data-reveal="">
            <b>3 h</b>
            <h3>Ouvert tard</h3>
            <p>Le vendredi et le samedi, CRAZY reste ouvert jusqu’à 3 h du matin.</p>
          </div>
          <div className="fact" data-reveal="">
            <b>6/7</b>
            <h3>Du mardi au dimanche</h3>
            <p>Seul jour de repos&nbsp;: le lundi.</p>
          </div>
          <div className="fact" data-reveal="">
            <b>Livré</b>
            <h3>Uber Eats</h3>
            <p>Pas envie de bouger&nbsp;? La carte est disponible en livraison.</p>
          </div>
        </div>
      </section>

      <Related
        items={[
          { href: "/la-carte", kicker: "La carte", title: "Tous les prix", text: "Smash, tacos, menus, dessert et boissons." },
          { href: "/infos-pratiques", kicker: "Venir", title: "Accès depuis le campus", text: "Adresse, plan et stationnement." },
          { href: "/smash-burgers", kicker: "Monter en gamme", title: "Les smash burgers", text: "Neuf recettes, du cheese smash au croissant." },
        ]}
      />
      <CtaStrip label="Pas envie de te déplacer ?" text="Commander en livraison" href={business.links.uberEats} />
    </>
  );
}
