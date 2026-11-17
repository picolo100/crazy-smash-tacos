import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs, Button, CtaStrip, Related } from "@/components/ui/Primitives";
import { Photo } from "@/components/ui/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { getGuide, guides } from "@/lib/guides";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}`, type: "article" });
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const other = guides.find((x) => x.slug !== g.slug);
  const path = `/guides/${g.slug}`;

  return (
    <>
      <JsonLd data={articleSchema({ title: g.title, description: g.description, path, image: `/img/${g.image}-550.webp`, date: g.date })} />
      <section className="page-hero">
        <div>
          <Breadcrumbs
            items={[
              { name: "Guides", path: "/guides" },
              { name: g.h1.replace(/\.$/, ""), path },
            ]}
          />
          <h1>{g.h1}</h1>
          <p className="lead">{g.excerpt}</p>
          <p className="section-label" style={{ marginTop: 22 }}>
            {g.readingMinutes} min de lecture · mis à jour le {new Date(g.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <figure className="hero-figure">
          <Photo name={g.image} alt={g.imageAlt} sizes="(max-width: 920px) 88vw, 40vw" priority />
        </figure>
      </section>

      <section className="section">
        <div className="article">
          <article className="prose">
            {g.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`h-${s.id}`}>
                <h2 id={`h-${s.id}`}>{s.title}</h2>
                {/* Contenu éditorial interne (lib/guides.ts). */}
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              </section>
            ))}
          </article>
          <aside className="article-aside" aria-label="Sommaire et commande">
            <nav className="toc" aria-labelledby="toc-title">
              <h2 id="toc-title">Sommaire</h2>
              <ol>
                {g.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="aside-cta">
              <strong>{g.cta.title}</strong>
              <p>{g.cta.text}</p>
              <Button href={g.cta.href} variant="ink" magnetic={false}>
                {g.cta.label}
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <Related
        items={[
          ...(other ? [{ href: `/guides/${other.slug}`, kicker: "Autre guide", title: other.h1, text: other.excerpt }] : []),
          { href: "/la-carte", kicker: "La carte", title: "Tous les prix", text: "Smash, tacos, menus, dessert." },
          { href: "/infos-pratiques", kicker: "Venir", title: "Horaires & accès", text: "27 avenue de Mâcon, Bourg-en-Bresse." },
        ]}
      />
      <CtaStrip label="Passer à la pratique" text={`Appeler · ${business.phone.display}`} href={business.phone.href} />
    </>
  );
}
