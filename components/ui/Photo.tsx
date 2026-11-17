import { images, type ImageName } from "@/lib/images.generated";

type Props = {
  name: ImageName;
  alt: string;
  /** Attribut `sizes` : largeur d'affichage réelle, pour choisir la bonne variante. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Fond flou pendant le chargement (désactivé pour les photos détourées sur crème). */
  placeholder?: boolean;
  contain?: boolean;
  /** Dévoilement par masque au scroll (voir MotionProvider). */
  clip?: boolean;
};

const srcset = (name: string, widths: readonly number[], ext: "avif" | "webp") =>
  widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

/**
 * Image responsive pré-optimisée (AVIF + WebP), dimensions intrinsèques pour éviter le CLS.
 * Équivalent statique de next/image (dont l'optimiseur n'existe pas en export statique).
 */
export function Photo({ name, alt, sizes, className = "", imgClassName, priority = false, placeholder = true, contain = false, clip = false }: Props) {
  const img = images[name];
  const widths = img.widths;
  const fallback = widths.find((w) => w >= 550) ?? widths[widths.length - 1];
  return (
    <div
      className={`photo${contain ? " contain" : ""} ${className}`}
      style={placeholder ? { backgroundImage: `url(${img.blur})` } : undefined}
      {...(clip ? { "data-clip": "" } : {})}
    >
      <picture>
        <source type="image/avif" srcSet={srcset(name, widths, "avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcset(name, widths, "webp")} sizes={sizes} />
        <img
          src={`/img/${name}-${fallback}.webp`}
          alt={alt}
          width={img.width}
          height={img.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          className={imgClassName}
        />
      </picture>
    </div>
  );
}
