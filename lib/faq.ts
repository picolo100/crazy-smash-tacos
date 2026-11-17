/**
 * Questions fréquentes. Réponses fondées uniquement sur les informations vérifiées
 * (fiche Google, carte Uber Eats, avis). Ce qui n'est pas connu n'est pas affirmé.
 * `a` = texte brut (JSON-LD) ; `html` optionnel = version avec liens internes.
 */
export type Faq = { q: string; a: string; html?: string; topic: "pratique" | "carte" | "halal" | "commande" };

export const faqs: Faq[] = [
  {
    topic: "halal",
    q: "La viande est-elle halal ?",
    a: "Oui. Toute la carte de CRAZY est 100 % halal, bacon de bœuf et lardons compris. Pour toute question sur l’approvisionnement, l’équipe vous répond au comptoir ou par téléphone.",
    html: "Oui. Toute la carte de CRAZY est 100&nbsp;% halal, bacon de bœuf et lardons compris. Pour toute question sur l’approvisionnement, l’équipe vous répond au comptoir ou par téléphone. <a href=\"/halal\">En savoir plus</a>.",
  },
  {
    topic: "pratique",
    q: "Où se trouve CRAZY à Bourg-en-Bresse ?",
    a: "Au 27 avenue de Mâcon, 01000 Bourg-en-Bresse, à proximité du campus universitaire.",
    html: "Au 27 avenue de Mâcon, 01000 Bourg-en-Bresse, à proximité du campus universitaire. <a href=\"/infos-pratiques\">Plan, accès et stationnement</a>.",
  },
  {
    topic: "pratique",
    q: "Quels sont les horaires d’ouverture ?",
    a: "Du mardi au jeudi de 12 h à 13 h 30 et de 19 h à 23 h ; le vendredi de 12 h à 13 h 30 et de 19 h à 3 h ; le samedi de 19 h à 3 h ; le dimanche de 19 h à minuit. Fermé le lundi.",
  },
  {
    topic: "pratique",
    q: "Êtes-vous ouverts tard le soir ?",
    a: "Oui : jusqu’à 3 h du matin le vendredi et le samedi, jusqu’à minuit le dimanche et jusqu’à 23 h du mardi au jeudi.",
  },
  {
    topic: "commande",
    q: "Peut-on manger sur place, emporter ou se faire livrer ?",
    a: "Les trois : sur place au 27 avenue de Mâcon, à emporter (commande au comptoir ou par téléphone au 06 25 82 49 67) ou en livraison via Uber Eats.",
    html: "Les trois&nbsp;: sur place au 27 avenue de Mâcon, à emporter (commande au comptoir ou par téléphone au <a href=\"tel:+33625824967\">06 25 82 49 67</a>) ou en livraison via Uber Eats. <a href=\"/commander\">Toutes les façons de commander</a>.",
  },
  {
    topic: "commande",
    q: "Faut-il réserver ?",
    a: "Il n’y a pas de réservation en ligne. Venez directement, ou appelez pour préparer une commande à emporter.",
  },
  {
    topic: "carte",
    q: "Combien coûte un repas chez CRAZY ?",
    a: "Les smash burgers sont à partir de 9 €, les tacos à partir de 10,90 €, et les menus (avec frites et boisson) de 11,50 € à 16,90 €. Le menu étudiant est à 8 € le midi. Les prix sont indicatifs.",
    html: "Les smash burgers sont à partir de 9&nbsp;€, les tacos à partir de 10,90&nbsp;€, et les menus (avec frites et boisson) de 11,50&nbsp;€ à 16,90&nbsp;€. Le menu étudiant est à 8&nbsp;€ le midi. <a href=\"/la-carte\">Voir la carte et les prix</a>.",
  },
  {
    topic: "carte",
    q: "Comment fonctionne le menu étudiant ?",
    a: "Le Menu Smash Campus à 8 € comprend un Smash Campus, des frites et une boisson. Il est proposé du mardi au vendredi, uniquement le midi.",
    html: "Le Menu Smash Campus à 8&nbsp;€ comprend un Smash Campus, des frites et une boisson. Il est proposé du mardi au vendredi, uniquement le midi. <a href=\"/menu-etudiant\">Détails du menu étudiant</a>.",
  },
  {
    topic: "carte",
    q: "Qu’est-ce qu’un smash burger ?",
    a: "Un burger dont la viande est écrasée sur une plaque très chaude au moment de la cuisson : elle forme une croûte caramélisée tout en restant juteuse.",
    html: "Un burger dont la viande est écrasée sur une plaque très chaude au moment de la cuisson&nbsp;: elle forme une croûte caramélisée tout en restant juteuse. <a href=\"/guides/smash-burger\">Notre guide du smash burger</a>.",
  },
  {
    topic: "carte",
    q: "Que contiennent les menus ?",
    a: "Chaque menu comprend la recette choisie, une portion de frites assaisonnées aux épices signature et une boisson (canette ou bouteille).",
  },
  {
    topic: "carte",
    q: "Y a-t-il des desserts ?",
    a: "Oui : un tiramisu artisanal préparé par la maison partenaire Na Délice, à 6 €.",
  },
  {
    topic: "carte",
    q: "Y a-t-il des options végétariennes ?",
    a: "La carte est centrée sur la viande et le poulet et n’affiche pas de recette végétarienne. Demandez à l’équipe les adaptations possibles.",
  },
  {
    topic: "carte",
    q: "Comment connaître les allergènes ?",
    a: "La plupart des recettes contiennent du gluten (pain, croissant, galette) et des produits laitiers (fromages, sauces) ; certaines contiennent de l’œuf. Signalez toute allergie à l’équipe avant de commander.",
  },
  {
    topic: "pratique",
    q: "Où se garer ?",
    a: "Le stationnement est gratuit dans la rue, mais une place peut être difficile à trouver aux heures de pointe.",
  },
  {
    topic: "commande",
    q: "Combien de temps faut-il attendre ?",
    a: "Tout est préparé à la commande, l’attente dépend donc de l’affluence. Pour gagner du temps, appelez avant de passer.",
  },
];

export const faqByTopic = (t: Faq["topic"]) => faqs.filter((f) => f.topic === t);
