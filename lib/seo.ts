import type { Metadata } from "next";
import { SITE_URL, business } from "./site";
import { openingHoursSchema } from "./hours";
import { dishes, dessert, drinks, DRINK_PRICE, studentMenu } from "./menu";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Image Open Graph spécifique (chemin public), sinon l'image par défaut. */
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
};

export const OG_DEFAULT = "/og/crazy-smash-tacos.jpg";

/** Métadonnées complètes et cohérentes pour une page (canonical, OG, Twitter). */
export function pageMetadata({ title, description, path, image = OG_DEFAULT, noindex, type = "website" }: PageMeta): Metadata {
  const url = path === "/" ? "/" : path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: business.name,
      locale: "fr_FR",
      images: [{ url: image, width: 1200, height: 630, alt: `${business.name} — ${business.tagline}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

const abs = (p: string) => `${SITE_URL}${p}`;

export const restaurantId = `${SITE_URL}/#restaurant`;

/** Entité principale : établissement de restauration rapide. */
export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    "@id": restaurantId,
    name: business.name,
    alternateName: business.shortName,
    description:
      "Smash burgers préparés à la commande et tacos généreux, carte 100 % halal, à Bourg-en-Bresse, près du campus. Sur place, à emporter ou en livraison.",
    url: abs("/"),
    logo: abs("/brand/crazy-logo.png"),
    image: [abs(OG_DEFAULT), abs("/img/hero-smash-bleu-1560.webp")],
    telephone: business.phone.e164,
    servesCuisine: ["Burger", "Tacos", "Halal", "Fast-food"],
    priceRange: "€",
    currenciesAccepted: "EUR",
    acceptsReservations: false,
    hasMenu: abs("/la-carte"),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.links.maps,
    openingHoursSpecification: openingHoursSchema(),
    potentialAction: {
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: business.links.uberEats, actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModePickUp", "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: abs("/"),
    name: business.name,
    inLanguage: "fr-FR",
    publisher: { "@id": restaurantId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
}

const offer = (p: number) => ({ "@type": "Offer", price: p.toFixed(2), priceCurrency: "EUR" });

/** Carte complète au format schema.org Menu. */
export function menuSchema() {
  const section = (name: string, cat: "smash" | "tacos") => ({
    "@type": "MenuSection",
    name,
    hasMenuItem: dishes
      .filter((d) => d.category === cat)
      .map((d) => ({
        "@type": "MenuItem",
        name: d.name,
        description: `${d.pitch} ${d.ingredients.join(", ")}.`,
        image: abs(`/img/${d.photo}-550.webp`),
        offers: offer(d.solo),
        suitableForDiet: "https://schema.org/HalalDiet",
      })),
  });
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/la-carte#menu`,
    name: `Carte ${business.name}`,
    inLanguage: "fr-FR",
    url: abs("/la-carte"),
    hasMenuSection: [
      section("Smash burgers", "smash"),
      section("Tacos", "tacos"),
      {
        "@type": "MenuSection",
        name: "Formule étudiante",
        hasMenuItem: [{ "@type": "MenuItem", name: studentMenu.name, description: `${studentMenu.contents.join(" + ")}. ${studentMenu.when}.`, offers: offer(studentMenu.price) }],
      },
      { "@type": "MenuSection", name: "Desserts", hasMenuItem: [{ "@type": "MenuItem", name: dessert.name, description: dessert.pitch, offers: offer(dessert.price) }] },
      { "@type": "MenuSection", name: "Boissons", hasMenuItem: drinks.map((d) => ({ "@type": "MenuItem", name: d, offers: offer(DRINK_PRICE) })) },
    ],
  };
}

export function articleSchema(a: { title: string; description: string; path: string; image: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: abs(a.image),
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: abs(a.path),
    author: { "@type": "Organization", name: business.name, url: abs("/") },
    publisher: { "@id": restaurantId },
  };
}
