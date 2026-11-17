import { Breadcrumbs, CtaStrip, H2, Related, SectionLabel } from "@/components/ui/Primitives";
import { FaqList } from "@/components/ui/FaqList";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { faqByTopic, faqs } from "@/lib/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ : halal, horaires, livraison, prix",
  description:
    "Les réponses sur CRAZY à Bourg-en-Bresse : carte halal, horaires jusqu’à 3 h, livraison Uber Eats, menu étudiant 8 €, prix, allergènes, parking.",
  path: "/faq",
});

const groups = [
  { id: "pratique", title: "Infos pratiques", items: faqByTopic("pratique") },
  { id: "commande", title: "Commander", items: faqByTopic("commande") },
  { id: "carte", title: "La carte", items: faqByTopic("carte") },
  { id: "halal", title: "Halal", items: faqByTopic("halal") },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="page-hero cheddar">
        <div>
          <Breadcrumbs items={[{ name: "Questions fréquentes", path: "/faq" }]} />
          <h1>
            Vos
            <br />
            <em>questions.</em>
          </h1>
          <p className="lead">Halal, horaires, livraison, prix, allergènes&nbsp;: les réponses aux questions qu’on nous pose le plus souvent.</p>
        </div>
        <nav aria-label="Thèmes" className="btn-row" style={{ alignSelf: "end" }}>
          {groups.map((g) => (
            <a key={g.id} className="btn" href={`#${g.id}`}>
              {g.title}
            </a>
          ))}
        </nav>
      </section>

      {groups.map((g, i) => (
        <section key={g.id} id={g.id} className={`section${i % 2 ? " bg-paper" : ""}`} aria-labelledby={`t-${g.id}`}>
          <div className="section-head" style={{ marginBottom: 30 }}>
            <div>
              <SectionLabel n={String(i + 1).padStart(2, "0")}>{`${g.items.length} question${g.items.length > 1 ? "s" : ""}`}</SectionLabel>
              <H2 id={`t-${g.id}`}>{g.title}.</H2>
            </div>
          </div>
          <FaqList items={g.items} openFirst={false} />
        </section>
      ))}

      <Related
        items={[
          { href: "/la-carte", kicker: "La carte", title: "Tous les prix", text: "Smash, tacos, menus, dessert." },
          { href: "/infos-pratiques", kicker: "Venir", title: "Horaires & accès", text: "Plan et stationnement." },
          { href: "/contact", kicker: "Une autre question ?", title: "Contact", text: "Le plus simple : appeler." },
        ]}
      />
      <CtaStrip label="Pas trouvé votre réponse ?" text={`Appeler · ${business.phone.display}`} href={business.phone.href} />
    </>
  );
}
