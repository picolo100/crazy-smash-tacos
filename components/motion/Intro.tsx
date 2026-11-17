import { LogoFull } from "@/components/brand/Logo";

/**
 * Écran d'intro (logo CRAZY sur rouge), hérité du loader d'origine.
 * Animation 100 % CSS : elle démarre au premier rendu, sans attendre le JavaScript.
 * Affichée uniquement à la première visite de la session sur l'accueil, jamais si le
 * mouvement est réduit (décision prise avant le rendu par le script de démarrage).
 */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-logo">
        <LogoFull title="" />
      </div>
      <div className="bar">
        <i />
      </div>
    </div>
  );
}
