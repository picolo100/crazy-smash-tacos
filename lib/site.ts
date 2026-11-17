/**
 * Source unique des informations de l'établissement.
 * Toutes les données ci-dessous proviennent de la fiche Google Maps et de la carte Uber Eats
 * de l'établissement (relevé du 17/11/2026). Voir README → « Sources ».
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://crazy-smash-tacos.pages.dev").replace(/\/$/, "");

export const business = {
  name: "Crazy Smash & Tacos",
  shortName: "CRAZY",
  tagline: "Smash burgers & tacos 100 % halal à Bourg-en-Bresse",
  phone: { display: "06 25 82 49 67", href: "tel:+33625824967", e164: "+33625824967" },
  address: {
    street: "27 avenue de Mâcon",
    postalCode: "01000",
    city: "Bourg-en-Bresse",
    region: "Ain",
    country: "FR",
    oneLine: "27 avenue de Mâcon, 01000 Bourg-en-Bresse",
  },
  geo: { lat: 46.2095153, lng: 5.219801 },
  links: {
    maps: "https://www.google.com/maps/search/?api=1&query=Crazy%20Smash%20%26%20Tacos&query_place_id=ChIJu1zCR5tT80cR17bpz5wwaao",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Crazy%20Smash%20%26%20Tacos&destination_place_id=ChIJu1zCR5tT80cR17bpz5wwaao",
    mapEmbed: "https://www.google.com/maps?q=Crazy+Smash+%26+Tacos,+27+Av.+de+M%C3%A2con,+01000+Bourg-en-Bresse&output=embed",
    /** Fiche Google Maps (avis visibles sur la fiche). */
    reviews: "https://www.google.com/maps/search/?api=1&query=Crazy%20Smash%20%26%20Tacos&query_place_id=ChIJu1zCR5tT80cR17bpz5wwaao",
    writeReview: "https://search.google.com/local/writereview?placeid=ChIJu1zCR5tT80cR17bpz5wwaao",
    uberEats: "https://www.ubereats.com/fr/store/crazy/ZYeaJujJRc2LDSC-r4NIrw",
  },
  services: ["Sur place", "À emporter", "Livraison"] as const,
  /** Note Google affichée à titre informatif (relevé du 17/11/2026). */
  google: { rating: "5,0", count: 12 },
  /** Fourchette constatée dans les avis Google (« Prix par personne »). */
  pricePerPerson: "10–20 €",
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/la-carte", label: "La carte" },
  { href: "/smash-burgers", label: "Smash" },
  { href: "/tacos", label: "Tacos" },
  { href: "/menu-etudiant", label: "Menu étudiant" },
  { href: "/infos-pratiques", label: "Infos" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Manger",
    items: [
      { href: "/la-carte", label: "La carte & les prix" },
      { href: "/smash-burgers", label: "Smash burgers" },
      { href: "/tacos", label: "Tacos" },
      { href: "/menu-etudiant", label: "Menu étudiant 8 €" },
    ],
  },
  {
    title: "Venir",
    items: [
      { href: "/infos-pratiques", label: "Horaires & accès" },
      { href: "/commander", label: "Commander / livraison" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "Questions fréquentes" },
    ],
  },
  {
    title: "CRAZY",
    items: [
      { href: "/le-concept", label: "Le concept" },
      { href: "/halal", label: "100 % halal" },
      { href: "/guides", label: "Guides" },
    ],
  },
];
