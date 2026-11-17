import Link from "next/link";
import { Breadcrumbs, CtaStrip, SectionLabel } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { pageMetadata } from "@/lib/seo";
import { guides } from "@/lib/guides";

export const metadata = pageMetadata({
  title: "Guides · Smash burger et tacos français expliqués",
  description:
    "Les guides de CRAZY : tout savoir sur le smash burger (technique, différences) et le tacos français (origine, composition). Par un snack spécialisé à Bourg-en-Bresse.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} />
          <h1>
            Smash &amp; tacos,
            <br />
            <em>expliqués.</em>
          </h1>
          <p className="lead">Deux spécialités, deux guides&nbsp;: comment elles sont nées, comment elles se préparent, et comment les reconnaître.</p>
        </div>
      </section>
      <section className="section" aria-label="Liste des guides">
        <SectionLabel>{guides.length} guides</SectionLabel>
        <div className="guide-list">
          {guides.map((g) => (
            <article key={g.slug} className="guide-card" data-reveal="">
              <Photo name={g.image} alt={g.imageAlt} sizes="(max-width: 920px) 92vw, 46vw" />
              <div className="body">
                <span className="meta">Guide · {g.readingMinutes} min de lecture</span>
                <h2>
                  <Link className="stretched" href={`/guides/${g.slug}`}>
                    {g.h1}
                  </Link>
                </h2>
                <p>{g.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaStrip label="La théorie, c’est bien" text="Voir la carte" href="/la-carte" />
    </>
  );
}
