import { Photo } from "@/components/ui/Photo";
import { flagLabel, price, type Dish } from "@/lib/menu";

/** Recettes en photos (fond blanc fondu sur crème), avec ancres pour le maillage. */
export function RecipeGrid({ items }: { items: Dish[] }) {
  return (
    <div className="recipe-grid">
      {items.map((d) => (
        <article key={d.slug} id={d.slug} className="recipe" data-reveal="">
          <Photo name={d.photo} alt={`${d.name} : ${d.ingredients.join(", ")}`} sizes="(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 30vw" placeholder={false} />
          <div className="recipe-head">
            <div>
              {d.flags?.length || d.rank ? (
                <div className="flags">
                  {d.rank ? <span className="badge ink">Menu n°{d.rank} des ventes</span> : null}
                  {d.flags?.map((f) => (
                    <span key={f} className={`badge${f === "exclu" ? " red" : ""}`}>
                      {flagLabel[f]}
                    </span>
                  ))}
                </div>
              ) : null}
              <h3 style={{ marginTop: d.flags?.length || d.rank ? 10 : 0 }}>{d.name}</h3>
            </div>
            <p className="prices">
              {price(d.solo)}
              <small>{d.menu ? `Menu ${price(d.menu)}` : "Menu : sur place"}</small>
            </p>
          </div>
          <p className="pitch">{d.pitch}</p>
          <ul className="chips" aria-label={`Composition du ${d.name}`}>
            {d.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
