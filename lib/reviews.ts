/**
 * Extraits d'avis Google réels (fiche de l'établissement, relevé du 17/11/2026),
 * signés prénom + initiale. Citations raccourcies (coupes) et coquilles corrigées, jamais reformulées.
 * Accord de l'établissement à confirmer avant mise en ligne (voir README).
 */
export type Review = { quote: string; author: string; date: string; dish?: string };

export const reviews: Review[] = [
  {
    quote: "Les meilleurs smash burgers ! Pain moelleux, viande savoureuse et cuisson parfaite. Un vrai régal du début à la fin !",
    author: "O. D.",
    date: "2026-10-18",
  },
  {
    quote: "Les smash burgers et les tacos sont vraiment excellents, bien garnis et super généreux […] L’accueil est au top, toujours avec le sourire et la bonne humeur.",
    author: "Moussa",
    date: "2026-10-25",
  },
  {
    quote: "J’ai goûté le Smash poivre et il était excellent ! Je recommande fortement.",
    author: "Solenn M.",
    date: "2026-09-23",
    dish: "smash-poivre",
  },
  {
    quote: "Les burgers smash sont vraiment délicieux, bien généreux et surtout avec une viande parfaitement cuite. Le pain est moelleux, les ingrédients sont frais.",
    author: "Miryam J.",
    date: "2026-09-23",
  },
  {
    quote: "Ce nouveau snack est exactement ce qu’il manquait dans le coin. Les burgers sont tout simplement délicieux […] L’équipe est super accueillante, souriante et le service est rapide.",
    author: "Cheïma K.",
    date: "2026-09-21",
  },
  {
    quote: "Les burgers et les tacos sont vraiment bons, bien garnis et les portions sont généreuses. L’équipe est super sympa.",
    author: "Othman D.",
    date: "2026-09-21",
  },
  {
    quote: "Très bon tacos. Je recommande.",
    author: "Alexandre S.",
    date: "2026-11-11",
  },
];
