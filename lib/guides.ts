import type { ImageName } from "./images.generated";

export type GuideSection = { id: string; title: string; html: string };
export type Guide = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  excerpt: string;
  image: ImageName;
  imageAlt: string;
  date: string;
  readingMinutes: number;
  sections: GuideSection[];
  cta: { title: string; text: string; href: string; label: string };
};

/**
 * Guides éditoriaux. Contenu de culture générale culinaire, sans chiffre ni
 * affirmation invérifiable ; les informations sur CRAZY renvoient aux pages dédiées.
 */
export const guides: Guide[] = [
  {
    slug: "smash-burger",
    title: "Smash burger : définition, technique et différences",
    h1: "Le smash burger, expliqué.",
    description:
      "Qu’est-ce qu’un smash burger ? Pourquoi écraser la viande, quelle différence avec un burger classique, simple ou double : le guide de CRAZY.",
    excerpt: "Pourquoi on écrase la viande, ce que ça change au goût, et comment le reconnaître.",
    image: "smash-double-cheese",
    imageAlt: "Smash double cheese : deux steaks fins à la croûte caramélisée, cheddar fondu et cornichons",
    date: "2026-11-17",
    readingMinutes: 4,
    sections: [
      {
        id: "definition",
        title: "Qu’est-ce qu’un smash burger ?",
        html: `<p>Un smash burger est un burger dont la viande n’est pas façonnée en steak épais à l’avance&nbsp;: on dépose une <strong>boule de viande hachée</strong> sur une plaque très chaude, puis on l’<strong>écrase</strong> fermement («&nbsp;to smash&nbsp;» en anglais) avec une presse ou une spatule rigide.</p>
<p>Le résultat&nbsp;: un steak fin, aux bords irréguliers et dentelés, avec une surface brune et croustillante. C’est une technique de cuisson sur plaque issue de la tradition des diners américains, devenue l’une des façons les plus appréciées de faire un burger.</p>`,
      },
      {
        id: "pourquoi",
        title: "Pourquoi écraser la viande ?",
        html: `<p>Tout se joue au contact du métal. En écrasant la boule de viande, on multiplie la surface en contact direct avec la plaque brûlante. Cette surface brunit très vite&nbsp;: c’est la <strong>réaction de Maillard</strong>, celle qui donne aussi sa croûte au pain ou sa couleur à une viande grillée.</p>
<p>Plus de surface saisie, c’est plus de croûte, donc plus de goût. Et comme le steak est fin, il cuit en peu de temps, ce qui permet de garder un intérieur juteux.</p>
<blockquote>Le geste compte&nbsp;: il faut écraser une seule fois, fort, au tout début de la cuisson. Ensuite, on ne touche plus.</blockquote>`,
      },
      {
        id: "difference",
        title: "Smash burger ou burger classique : les différences",
        html: `<ul>
<li><strong>Le steak&nbsp;:</strong> fin et large pour le smash, épais et régulier pour le burger classique.</li>
<li><strong>La cuisson&nbsp;:</strong> très rapide et très chaude sur plaque pour le smash&nbsp;; plus longue, sur grill ou à la poêle, pour le classique, que l’on peut servir rosé à cœur.</li>
<li><strong>La texture&nbsp;:</strong> croûte croustillante et bords dentelés d’un côté, mâche plus tendre et uniforme de l’autre.</li>
<li><strong>Le fromage&nbsp;:</strong> sur un smash, le cheddar se pose directement sur le steak chaud et fond aussitôt.</li>
</ul>
<p>Aucun n’est «&nbsp;meilleur&nbsp;» dans l’absolu&nbsp;: ce sont deux styles. Le smash privilégie la croûte et l’intensité, le classique la mâche et le moelleux.</p>`,
      },
      {
        id: "double",
        title: "Simple, double ou plus ?",
        html: `<p>Un steak smashé étant fin, on le sert souvent <strong>en double</strong>&nbsp;: deux steaks, c’est deux fois plus de croûte, et deux couches de cheddar fondu. C’est la version la plus répandue dans les adresses spécialisées.</p>
<p>Le simple reste parfait pour une faim raisonnable ou pour apprécier la viande seule&nbsp;; le double donne ce côté généreux qui fait la réputation du smash.</p>`,
      },
      {
        id: "garnitures",
        title: "Les garnitures qui vont avec",
        html: `<p>Le smash aime les accompagnements simples qui équilibrent sa richesse&nbsp;: <strong>cheddar fondant</strong>, <strong>cornichons</strong> pour l’acidité, <strong>oignons</strong> (caramélisés ou croustillants), et une sauce qui a du caractère, fumée, au poivre ou au fromage.</p>
<p>Le pain compte aussi&nbsp;: un pain brioché moelleux absorbe les jus sans se défaire.</p>`,
      },
      {
        id: "bourg-en-bresse",
        title: "Où manger un smash burger à Bourg-en-Bresse ?",
        html: `<p>Chez CRAZY, au 27 avenue de Mâcon, chaque steak est smashé à la commande. La carte compte neuf recettes, du <a href="/smash-burgers#cheese-smash">cheese smash</a> au <a href="/smash-burgers#smash-croissant">smash croissant</a>, une exclusivité à Bourg-en-Bresse, le tout 100&nbsp;% halal.</p>
<p>Les prix et les compositions sont détaillés sur <a href="/la-carte">la carte</a>&nbsp;; les étudiants ont droit au <a href="/menu-etudiant">menu Smash Campus à 8&nbsp;€</a> le midi.</p>`,
      },
    ],
    cta: { title: "Goûter un vrai smash", text: "Neuf recettes, viande smashée minute, 100 % halal.", href: "/smash-burgers", label: "Voir les smash burgers" },
  },
  {
    slug: "tacos-francais",
    title: "Tacos français : origine, composition, différences",
    h1: "Le tacos français, de A à Z.",
    description:
      "D’où vient le tacos français, comment il se compose (galette, viande, frites, sauce fromagère) et ce qui le distingue du taco mexicain.",
    excerpt: "Galette pliée, frites dedans, sauce fromagère : l’histoire d’un classique né près de chez nous.",
    image: "tacos-mixte",
    imageAlt: "Tacos mixte coupé en deux : galette grillée, poulet mariné, kefta, frites et sauce gruyère",
    date: "2026-11-17",
    readingMinutes: 4,
    sections: [
      {
        id: "mexicain",
        title: "Rien à voir avec le taco mexicain",
        html: `<p>Malgré son nom, le tacos français n’a presque rien en commun avec le taco mexicain. Le taco mexicain est une petite <strong>tortilla, souvent de maïs</strong>, garnie et servie ouverte. Le tacos français est une grande <strong>galette de blé</strong> pliée autour d’une garniture copieuse, puis <strong>grillée sous une presse</strong>.</p>
<p>Le «&nbsp;s&nbsp;» final, même au singulier, est devenu sa signature.</p>`,
      },
      {
        id: "origine",
        title: "Né dans la région lyonnaise",
        html: `<p>Selon l’histoire la plus souvent racontée, le tacos français est apparu au début des années 2000 dans des snacks de l’agglomération lyonnaise, avant de gagner toute la France puis d’autres pays.</p>
<p>Bourg-en-Bresse étant à environ une heure de Lyon, on peut dire qu’il joue ici presque à domicile.</p>`,
      },
      {
        id: "composition",
        title: "Comment se compose un tacos ?",
        html: `<ul>
<li><strong>La galette&nbsp;:</strong> une grande tortilla de blé, assez souple pour être pliée en carré ou en rectangle.</li>
<li><strong>La viande&nbsp;:</strong> poulet mariné, viande hachée ou kefta, cordon bleu… seule ou en mélange.</li>
<li><strong>Les frites&nbsp;:</strong> elles sont <em>à l’intérieur</em>, c’est l’une des particularités du tacos.</li>
<li><strong>La sauce fromagère&nbsp;:</strong> crémeuse, souvent appelée «&nbsp;sauce gruyère&nbsp;», elle lie l’ensemble.</li>
<li><strong>La presse&nbsp;:</strong> plié, le tacos est grillé jusqu’à ce que la galette dore et marque.</li>
</ul>`,
      },
      {
        id: "sauce",
        title: "La sauce fromagère, cœur du tacos",
        html: `<p>C’est elle qui fait la différence entre un tacos sec et un tacos réussi. En fondant avec les frites et la viande sous la presse, elle rend l’intérieur moelleux pendant que la galette croustille. Chaque adresse a sa recette&nbsp;; on y ajoute souvent une seconde sauce plus relevée, algérienne, barbecue ou au poivre.</p>`,
      },
      {
        id: "crazy",
        title: "Les tacos de CRAZY",
        html: `<p>Chez CRAZY, à Bourg-en-Bresse, la base est du poulet mariné et une sauce gruyère maison. Cinq recettes en partent&nbsp;: le <a href="/tacos#tacos-classique">classique</a>, le <a href="/tacos#tacos-mixte">mixte</a> avec kefta épicée, le <a href="/tacos#tacos-crazy">crazy</a> avec œuf, lardons et rösti, le <a href="/tacos#tacos-bacon">bacon</a> et, en hiver, le <a href="/tacos#tacos-montagnard">montagnard</a> à la raclette.</p>
<p>Tous sont halal et existent en menu avec frites et boisson. Prix et détails sur <a href="/la-carte#tacos">la carte</a>.</p>`,
      },
    ],
    cta: { title: "Un tacos ce soir ?", text: "Cinq recettes, sauce gruyère maison, jusqu’à 3 h le week-end.", href: "/tacos", label: "Voir les tacos" },
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
