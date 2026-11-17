/**
 * Logo officiel CRAZY — vectorisé depuis le visuel de marque publié par l'établissement.
 * Servi en sprite SVG externe (public/brand/logo.svg) : mis en cache, non dupliqué dans le HTML.
 * `currentColor` : la couleur suit le contexte (rouge dans l'en-tête, blanc sur fond rouge…).
 */
type Props = { className?: string; title?: string };

const SPRITE = "/brand/logo.svg";

function Mark({ id, viewBox, className, title }: Props & { id: "full" | "word"; viewBox: string }) {
  const label = title ?? "";
  return (
    <svg className={className} viewBox={viewBox} role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} focusable="false">
      <use href={`${SPRITE}#${id}`} />
    </svg>
  );
}

/** « CRAZY » + « Smash & tacos » manuscrit. */
export function LogoFull(props: Props) {
  return <Mark id="full" viewBox="20 20 2316 736" title="Crazy Smash & Tacos" {...props} />;
}

/** Mot « CRAZY » seul (formats compacts). */
export function LogoWord(props: Props) {
  return <Mark id="word" viewBox="20 20 2316 375" title="Crazy Smash & Tacos" {...props} />;
}
