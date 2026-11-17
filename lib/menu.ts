import type { ImageName } from "./images.generated";

/**
 * Carte de CRAZY — intitulés, compositions et prix relevés sur la carte Uber Eats
 * de l'établissement (17/11/2026). Prix TTC indicatifs.
 * `menu: null` = prix « en menu » incohérent dans la source → affiché « Sur place » en attendant validation.
 */

export type Category = "smash" | "tacos";

export type Dish = {
  slug: string;
  name: string;
  category: Category;
  /** Accroche courte, reprise des formulations de l'établissement. */
  pitch: string;
  ingredients: string[];
  solo: number;
  menu: number | null;
  photo: ImageName;
  menuPhoto?: ImageName;
  /** Classement Uber Eats « le plus aimé » (menus). */
  rank?: 1 | 2 | 3;
  flags?: ("exclu" | "hiver" | "signature" | "populaire")[];
};

export const dishes: Dish[] = [
  {
    slug: "cheese-smash",
    name: "Cheese smash",
    category: "smash",
    pitch: "Le smash dans sa version la plus efficace.",
    ingredients: ["steak smashé minute", "cheddar fondant", "cornichons croquants", "sauce Smash"],
    solo: 9,
    menu: 11.5,
    photo: "cheese-smash",
    menuPhoto: "menu-cheese-smash",
    flags: ["populaire"],
  },
  {
    slug: "smash-double-cheese",
    name: "Smash double cheese",
    category: "smash",
    pitch: "Généreux, ultra gourmand et sans détour.",
    ingredients: ["deux steaks smashés", "double cheddar fondant", "cornichons croquants", "sauce Smash maison"],
    solo: 12.9,
    menu: 14.5,
    photo: "smash-double-cheese",
    menuPhoto: "menu-smash-double-cheese",
    rank: 3,
  },
  {
    slug: "smash-smoked",
    name: "Smash smoked",
    category: "smash",
    pitch: "Un burger au caractère bien affirmé.",
    ingredients: ["double smash", "cheddar fondant", "oignons crispy", "sauce fumée"],
    solo: 12.9,
    menu: 14.5,
    photo: "smash-smoked",
    menuPhoto: "menu-smash-smoked",
  },
  {
    slug: "smash-poivre",
    name: "Smash poivre",
    category: "smash",
    pitch: "Œuf coulant et sauce au poivre.",
    ingredients: ["double smash", "cheddar fondant", "œuf coulant", "sauce au poivre"],
    solo: 13.9,
    menu: null,
    photo: "smash-poivre",
    menuPhoto: "menu-smash-poivre",
  },
  {
    slug: "smash-poulet",
    name: "Smash poulet",
    category: "smash",
    pitch: "Une exclusivité à Bourg-en-Bresse.",
    ingredients: ["pain brioché", "filet de poulet mariné et smashé", "cheddar fondant", "cornichons croquants", "salade fraîche", "sauce verte"],
    solo: 13.9,
    menu: 14.9,
    photo: "smash-poulet",
    menuPhoto: "menu-smash-poulet",
    flags: ["exclu"],
  },
  {
    slug: "smash-croissant",
    name: "Smash croissant",
    category: "smash",
    pitch: "Une exclusivité à Bourg-en-Bresse, complètement régressive.",
    ingredients: ["deux steaks smashés", "croissants toastés et smashés", "cheddar fondant", "oignons caramélisés maison", "lardons", "sauce gruyère maison"],
    solo: 14,
    menu: 15.9,
    photo: "smash-croissant",
    menuPhoto: "menu-smash-croissant",
    flags: ["exclu"],
  },
  {
    slug: "bacon-smash",
    name: "Bacon smash",
    category: "smash",
    pitch: "Fumé, réconfortant, riche en goût du début à la fin.",
    ingredients: ["steak smashé minute", "cheddar fondant", "bacon de bœuf", "oignons caramélisés maison", "cornichons croquants", "sauce fumée"],
    solo: 14.5,
    menu: 15.9,
    photo: "bacon-smash",
    menuPhoto: "menu-bacon-smash",
    rank: 1,
    flags: ["populaire"],
  },
  {
    slug: "smash-bleu",
    name: "Smash bleu",
    category: "smash",
    pitch: "Le burger des vrais amateurs de fromage.",
    ingredients: ["double steak smashé", "cheddar fondant", "bacon de bœuf", "oignons caramélisés maison", "sauce au bleu maison"],
    solo: 14.9,
    menu: 16.9,
    photo: "smash-bleu",
    menuPhoto: "menu-smash-bleu",
  },
  {
    slug: "smash-montagnard",
    name: "Smash montagnard",
    category: "smash",
    pitch: "La version la plus réconfortante, pour l’hiver.",
    ingredients: ["deux steaks smashés", "raclette fondante", "cornichons croquants", "oignons caramélisés maison", "lardons", "sauce au poivre"],
    solo: 15.9,
    menu: null,
    photo: "smash-montagnard",
    menuPhoto: "menu-smash-montagnard",
    flags: ["hiver"],
  },
  {
    slug: "tacos-classique",
    name: "Tacos classique",
    category: "tacos",
    pitch: "Le tacos efficace : généreux, crémeux, plein de goût.",
    ingredients: ["poulet mariné", "cheddar fondant", "frites croustillantes", "sauce gruyère maison"],
    solo: 10.9,
    menu: 13.9,
    photo: "tacos-classique",
    menuPhoto: "menu-tacos-classique",
  },
  {
    slug: "tacos-crazy",
    name: "Tacos crazy",
    category: "tacos",
    pitch: "Le tacos qui ne fait rien à moitié.",
    ingredients: ["poulet mariné", "œuf", "lardons", "rösti croustillant", "oignons caramélisés", "sauce gruyère maison", "sauce algérienne"],
    solo: 11.5,
    menu: 15.9,
    photo: "tacos-crazy",
    menuPhoto: "menu-tacos-crazy",
    flags: ["signature"],
  },
  {
    slug: "tacos-bacon",
    name: "Tacos bacon",
    category: "tacos",
    pitch: "Le mélange parfait entre fumé et gourmand.",
    ingredients: ["poulet mariné", "bacon de bœuf", "oignons caramélisés maison", "frites croustillantes", "sauce barbecue", "sauce gruyère maison"],
    solo: 12.9,
    menu: 15.9,
    photo: "tacos-bacon",
    menuPhoto: "menu-tacos-bacon",
  },
  {
    slug: "tacos-mixte",
    name: "Tacos mixte",
    category: "tacos",
    pitch: "Le meilleur des deux mondes dans un seul tacos.",
    ingredients: ["poulet mariné", "kefta épicée", "cheddar fondant", "frites croustillantes", "sauce secrète", "sauce gruyère maison"],
    solo: 13.9,
    menu: 16.9,
    photo: "tacos-mixte",
    menuPhoto: "menu-tacos-mixte",
    rank: 2,
    flags: ["populaire"],
  },
  {
    slug: "tacos-montagnard",
    name: "Tacos montagnard",
    category: "tacos",
    pitch: "Le tacos gourmand de l’hiver.",
    ingredients: ["poulet mariné", "raclette", "lardons", "rösti de pomme de terre", "sauce gruyère maison", "sauce au poivre"],
    solo: 13.9,
    menu: 16.9,
    photo: "tacos-montagnard",
    menuPhoto: "menu-tacos-montagnard",
    flags: ["hiver"],
  },
];

export const dessert = {
  name: "Tiramisu",
  pitch: "Un véritable tiramisu artisanal, préparé par notre partenaire Na Délice.",
  price: 6,
  photo: "tiramisu" as ImageName,
};

export const drinks = ["Pepsi", "Pepsi Max", "Perrier", "Orangina", "Oasis tropical", "Oasis fruits rouges", "Lipton Ice Tea", "Hawaï", "Eau 50 cl"];
export const DRINK_PRICE = 2;

export const studentMenu = {
  name: "Menu Smash Campus",
  price: 8,
  contents: ["Smash Campus", "Frites", "Boisson"],
  when: "Du mardi au vendredi, uniquement le midi",
};

export const sauces = ["Sauce Smash", "Gruyère", "Bleue", "Fumée", "Poivre", "Sauce verte", "Algérienne", "Barbecue", "Sauce secrète"];

export const byCategory = (c: Category) => dishes.filter((d) => d.category === c);
export const topThree = () =>
  dishes.filter((d) => d.rank).sort((a, b) => (a.rank ?? 9) - (b.rank ?? 9));

const fmt = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
/** 14.5 → « 14,50 € » (espace insécable fine gérée par Intl). */
export const price = (n: number) => fmt.format(n);

export const flagLabel: Record<NonNullable<Dish["flags"]>[number], string> = {
  exclu: "Exclu Bourg",
  hiver: "Hiver",
  signature: "Signature",
  populaire: "Populaire",
};

/** ["steak smashé", "cheddar"] → « Steak smashé, cheddar. » */
export const sentence = (items: string[]) => {
  const s = items.join(", ");
  return `${s.charAt(0).toUpperCase()}${s.slice(1)}.`;
};
