# CRAZY — Smash & Tacos · site vitrine

Site vitrine multipage pour **Crazy Smash & Tacos** (enseigne « CRAZY »), snack de smash burgers et tacos 100 % halal situé au **27 avenue de Mâcon, 01000 Bourg-en-Bresse**.

Adapté à partir du modèle « Le 69 — La Pizzeria au Bout du Monde » (même architecture statique, mêmes principes d’animation), refondu pour l’identité CRAZY : rouge / noir / jaune cheddar, typographie Anton + DM Sans.

## Pages

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil : hero, concept, top 3, exclusivités, menu étudiant, avis Google, horaires + plan, CTA |
| `la-carte.html` | Carte complète : smash burgers, tacos (prix seul / en menu), menu étudiant, desserts, boissons |
| `le-concept.html` | La technique du smash, halal, sauces maison, FAQ |
| `menu-etudiant.html` | Menu Smash Campus à 8 €, late night, livraison |
| `infos-pratiques.html` | Horaires, adresse, services, accès et stationnement, FAQ |
| `contact.html` | Téléphone, Uber Eats, itinéraire, avis Google |
| `mentions-legales.html`, `confidentialite.html`, `404.html` | Pages légales et erreur |

## Technique

- HTML / CSS / JS statiques, **sans étape de compilation** : déployable tel quel sur Cloudflare Pages (`_headers` inclus), Netlify, GitHub Pages…
- `styles.css` : feuille unique ; couleurs et polices dans `:root`.
- `app.js` : loader, apparitions au scroll (IntersectionObserver), menu mobile, curseur, boutons magnétiques, parallaxe, **statut « ouvert / fermé » en direct** (heure de Paris) et surlignage du jour dans les horaires.
- Respect de `prefers-reduced-motion`, navigation clavier, contenu lisible sans JavaScript.
- SEO : balises meta / Open Graph, URL canoniques, données structurées `Restaurant` (schema.org) sur l’accueil, `sitemap.xml`, `robots.txt`.

Pour modifier les horaires : le tableau HTML de chaque page **et** l’objet `HOURS` dans `app.js` (minutes depuis minuit ; 1620 = 3h du matin le lendemain).

## Sources des informations (relevées le 17/11/2026)

- Fiche Google Maps de l’établissement : adresse, téléphone (06 25 82 49 67), horaires, services (sur place, à emporter, livraison), description du propriétaire, publication « Menu Smash Campus 8 € », note 5,0 / 12 avis.
- Carte Uber Eats « CRAZY » (27 avenue de Mâcon) : intitulés, descriptions et prix des recettes.
- Photos : visuels publiés par l’établissement sur sa fiche Google / sa carte de livraison.

## À faire valider par le client avant mise en ligne

- [ ] **Prix** : relevés sur Uber Eats (souvent plus élevés qu’au comptoir). Deux anomalies dans la source : *menu smash montagnard* (12,90 € en menu < 15,90 € seul) et *menu smash poivre* (13,90 €, identique au prix seul) — leur prix en menu est affiché « Sur place » en attendant confirmation.
- [ ] Composition exacte du **Smash Campus** et conditions du menu étudiant (justificatif ?).
- [ ] Horaires des jours fériés, fermetures annuelles.
- [ ] **Autorisation d’utiliser les photos** et, si possible, photos HD (la plupart font 550 × 550 px) + photos de la salle / devanture.
- [ ] Citations d’avis Google : accord pour les afficher (signées prénom + initiale).
- [ ] Mentions légales : raison sociale, SIRET, courriel, responsable de publication, hébergeur (passages surlignés « à compléter »).
- [ ] Nom de domaine définitif : remplacer `https://crazy-smash-tacos.pages.dev` dans les pages (`canonical`, `og:url`), `sitemap.xml` et `robots.txt`.
- [ ] Liens réseaux sociaux (Instagram, TikTok…) s’ils existent.
