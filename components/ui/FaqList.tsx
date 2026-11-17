import type { Faq } from "@/lib/faq";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

/** Accordéon natif (details/summary : clavier et lecteurs d'écran sans JS). */
export function FaqList({ items, schema = false, center = false, openFirst = true }: { items: Faq[]; schema?: boolean; center?: boolean; openFirst?: boolean }) {
  return (
    <div className={`faq${center ? " center" : ""}`}>
      {items.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0}>
          <summary>{f.q}</summary>
          {/* Contenu éditorial interne (lib/faq.ts), aucune donnée utilisateur. */}
          <div className="answer" dangerouslySetInnerHTML={{ __html: f.html ?? f.a }} />
        </details>
      ))}
      {schema ? <JsonLd data={faqSchema(items)} /> : null}
    </div>
  );
}
