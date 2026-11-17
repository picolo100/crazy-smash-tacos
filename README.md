# CRAZY — Smash & Tacos · site vitrine

Site de **Crazy Smash & Tacos** (enseigne « CRAZY »), snack de smash burgers et de tacos 100 % halal au **27 avenue de Mâcon, 01000 Bourg-en-Bresse**.

Next.js 16 (App Router) · React 19 · TypeScript strict · GSAP 3 (ScrollTrigger, SplitText) · Lenis · export statique déployé sur Cloudflare Pages.

---

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + build de production
npm run build      # génère le site statique dans ./out
npm start          # sert ./out en local (npx serve)
npm run images     # régénère les variantes AVIF/WebP après ajout d'une photo
```

Node ≥ 20.9 (fichier `.node-version` = 22).

## Déploiement Cloudflare Pages

| Réglage | Valeur |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` (ou `None`) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Variable d'environnement (optionnelle) | `NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr` |

`NEXT_PUBLIC_SITE_URL` alimente les URL canoniques, Open Graph, le sitemap, `robots.txt` et les données structurées. Valeur par défaut : `https://crazy-smash-tacos.pages.dev`.

Les fichiers `public/_headers` (sécurité + cache) et `public/_redirects` (alias courts, anciennes URL) sont copiés dans `out/` et appliqués par Cloudflare. Cloudflare sert `/la-carte` à partir de `la-carte.html` et redirige automatiquement les URL en `.html`.

## Architecture

```
app/                    Routes (une page = un dossier), layout racine, sitemap, robots, manifeste, 404
  page.tsx              Accueil
  la-carte/             Carte complète + JSON-LD Menu
  smash-burgers/ tacos/ Pages catégorie (recettes en photos, technique, FAQ)
  menu-etudiant/ halal/ commander/ le-concept/ infos-pratiques/ faq/ contact/
  guides/ [slug]/       Guides éditoriaux (SSG via generateStaticParams)
components/
  brand/Logo.tsx        Logo officiel vectorisé (SVG, currentColor)
  layout/               En-tête (menu mobile accessible), pied de page, appel mobile
  motion/               MotionProvider (chorégraphie GSAP déclarative), intro, curseur, marquee, aperçu photo
  sections/             Héros d'accueil, étapes épinglées, grille de recettes
  ui/                   Photo (AVIF/WebP), boutons, fil d'Ariane, FAQ, horaires, statut d'ouverture, plan à la demande
  seo/JsonLd.tsx        Données structurées
lib/                    Source unique des données : site.ts, hours.ts, menu.ts, reviews.ts, faq.ts, guides.ts, seo.ts
styles/                 tokens.css → base → layout → components → sections → motion
assets/photos/          Photos sources (non servies) → `npm run images` → public/img + lib/images.generated.ts
public/                 Images optimisées, icônes, image Open Graph, _headers, _redirects
```

### Modifier le contenu

- **Coordonnées, liens, note Google** : `lib/site.ts`
- **Horaires** : `lib/hours.ts` (minutes depuis minuit ; `27 * 60` = 3 h du matin le lendemain). Tableaux, statut « Ouvert maintenant » et JSON-LD se mettent à jour seuls.
- **Carte et prix** : `lib/menu.ts` (`menu: null` affiche « Sur place » à la place du prix en menu)
- **Avis** : `lib/reviews.ts` · **FAQ** : `lib/faq.ts` · **Guides** : `lib/guides.ts`
- **Photos** : déposer le fichier dans `assets/photos/` puis `npm run images`, et le référencer par son nom (typé) dans `<Photo name="…" />`.

### Animations

Les animations passent par `components/motion/MotionProvider.tsx`, piloté par attributs : `data-split` (titres ligne par ligne, GSAP SplitText), `data-reveal`, `data-reveal-group`, `data-clip` (IntersectionObserver + CSS), `data-parallax`, `data-rotate-scrub`, `data-drift` (ScrollTrigger), `data-magnetic`. Le hook `useMotion` (`lib/motion.ts`) charge GSAP à la volée, rattache les animations à un `gsap.context()` et les annule au démontage ou au changement de page.

- `prefers-reduced-motion` : aucune animation, pas de défilement doux, contenu visible immédiatement.
- Sans JavaScript : contenu entièrement visible (les états initiaux ne s'appliquent que si `<html class="motion">`), avec un filet de sécurité à 4 s.
- L'intro (logo sur rouge) ne s'affiche qu'à la première visite de la session sur l'accueil.

## Qualité et performance

Contrôles réalisés sur le build de production (voir le compte rendu de livraison pour le détail) :

- `npm run typecheck` (TypeScript strict) et `npm run lint` (ESLint, règles Next « core web vitals ») : 0 erreur, 0 avertissement.
- `npm run build` : 21 routes générées en statique.
- **axe-core 4.10** (WCAG 2.0 / 2.1 / 2.2 A-AA + bonnes pratiques) sur 17 pages × ordinateur et mobile : 0 violation.
- **Liens** : 882 liens internes et ancres vérifiés, liens externes testés.
- **Modes dégradés** : sans JavaScript, avec `prefers-reduced-motion`, navigation clavier du menu mobile (piège de focus, Échap).
- **Lighthouse 12** : tableau ci-dessous (build servi avec compression gzip et 40 ms de latence, proche de Cloudflare Pages).

<!-- LIGHTHOUSE -->

Choix de performance :
- GSAP, ScrollTrigger, SplitText et Lenis sont **chargés après le premier rendu** (import dynamique) : le JS critique se limite au socle React/Next.
- Intro et entrée du héros en **CSS pur** (titre découpé en caractères côté serveur) ; apparitions au scroll par IntersectionObserver + transitions CSS ; bandeau défilant animé par le compositeur.
- Images AVIF/WebP responsives avec dimensions intrinsèques (CLS = 0), polices auto-hébergées, logo en sprite SVG mis en cache, plan Google chargé uniquement au clic.
- LCP réel mesuré dans le navigateur (CPU ralenti ×4) : ≈ 0,2 s. Sur un serveur local sans compression, la simulation Lighthouse surestime fortement le LCP mobile : mesurer sur l'URL Cloudflare (PageSpeed Insights) pour des chiffres de production.

Sécurité : `npm audit --omit=dev` → 0 vulnérabilité. Les alertes restantes (`picomatch`, ReDoS) ne concernent que l'outillage ESLint en développement ; aucune version corrigée n'est publiée à ce jour.

## Sources des informations (relevé du 17/11/2026)

- **Fiche Google Maps** : adresse, téléphone, horaires, services, description du gérant, publication « Menu Smash Campus 8 € », note 5,0 (12 avis), avis cités.
- **Carte Uber Eats « CRAZY »** : recettes, compositions, prix, photos des plats et visuel de marque (dont le logo, vectorisé pour le site).

Rien n'a été inventé : ni chiffre, ni certification, ni témoignage. Les avis sont de vrais avis Google, raccourcis (coupes signalées par […]) et signés prénom + initiale.

## À valider par le client avant mise en ligne

- [ ] **Prix** : relevés sur Uber Eats (souvent majorés par rapport au comptoir). Deux incohérences dans la source : *menu smash montagnard* (12,90 € < 15,90 € seul) et *menu smash poivre* (13,90 € = prix seul) → affichés « Sur place » en attendant.
- [ ] **Photos et logo** : autorisation d'utilisation ; photos plus grandes si disponibles (la plupart des plats font 550 px) ; photos de la salle / devanture.
- [ ] **Avis Google** : accord pour les citer.
- [ ] **Menu étudiant** : composition du Smash Campus, justificatif demandé ou non.
- [ ] **Halal** : souhaite-t-il mentionner un fournisseur ou un organisme de certification ?
- [ ] **Moyens de paiement** acceptés (non publiés, donc non affichés).
- [ ] **Mentions légales** : raison sociale, SIRET, courriel, responsable de publication (passages surlignés « à compléter »).
- [ ] **Nom de domaine** définitif → `NEXT_PUBLIC_SITE_URL`.
- [ ] Réseaux sociaux (Instagram, TikTok…) s'ils existent, à ajouter dans `lib/site.ts` et le pied de page.

## Crédits techniques

- [Next.js](https://nextjs.org) — MIT
- [GSAP](https://gsap.com) — licence standard GSAP « no charge » (gratuite, usage commercial autorisé)
- [Lenis](https://github.com/darkroomengineering/lenis) — MIT
- [sharp](https://sharp.pixelplumbing.com) — Apache-2.0 (génération des images, développement uniquement)
- Polices Anton et DM Sans (Google Fonts, SIL Open Font License), auto-hébergées via `next/font`.
