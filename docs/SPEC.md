# Specification - Portfolio Rodolphe Salako (Business Development, Sales & Strategic Partnerships)

Source: Brief utilisateur, Manifesto client, `/home/lesaint/Downloads/rodolf` (CV + Assets photos/bannières/certificats), profils LinkedIn & X
Last change: 2026-11-05

## Features

| Id | Feature | Depends on | Status |
|---|---|---|---|
| F-01 | Pipeline d'Assets & Médias Client (Portraits, Bannières, CV PDF) | - | approved |
| F-02 | Synchronisation Données & Métadonnées (Data Store, Supabase & SEO) | F-01 | approved |
| F-03 | Hero Section BD & Préservation PortraitMorph OGL Shader | F-01, F-02 | approved |
| F-04 | Réalisations BD/Partenariats & Menu 3D WebGL (InfiniteMenu) | F-01, F-02 | approved |
| F-05 | Expérience (Postes clés BD en premier), Compétences & Stack Physique Matter.js (About) | F-02 | approved |
| F-06 | Prise de Contact Partenariats, Réseaux Sociaux & Téléchargement CV | F-01, F-02 | approved |
| F-07 | Sélecteur de Langue & Internationalisation (i18n FR / EN) | F-02, F-03, F-04, F-05, F-06 | approved |
| F-08 | Remplacement de la sphère par DriftWall (React Bits) & Modal Détails Projets | F-01, F-04, F-07 | approved |

Status values: proposed, approved, in-progress, done, partial, blocked.

## Piliers stratégiques client

1. **Business Development & Strategic Partnerships** : Identification d'opportunités d'affaires, alliances stratégiques B2B avec opérateurs et studios (BetConstruct AI, etc.).
2. **Affiliate Management & Team Leadership** : Direction d'équipes d'affiliation, recrutement de media buyers et acquisition joueurs pour 1win & 1xBet.
3. **International Industry Summits & Event Coordination** : Accréditation Speaker et coordinateur à SiGMA Africa Cape Town, SBWA+ Dakar, iGaming AFRIKA Nairobi.
4. **Exploring New Markets & Regional Representation** : Développement de nouveaux marchés (Block-Scholars Africa au Bénin), formation tech et réseau d'ambassadeurs.
5. **Marketing Management & Growth Strategy** : Direction marketing pour CJC Race et Les chainmakers (campagnes multi-canaux, acquisition joueurs).
6. **Social Media, Community Management & Video Production** : Gestion des communautés Telegram, Discord, X, AMAs et vidéos courtes (Onlyplay Club).
7. **Bilingual Localization & Operations** : Traduction anglais–français et support utilisateur sur Tapbit Exchange.

## Feature details

### F-01 Pipeline d'Assets & Médias Client (Portraits, Bannières, CV PDF)
Actor: Visiteur du portfolio / Recruteur
Acceptance:
  AC1 Le CV `SALAKO CV.pdf` est copié et accessible dans `/public/SALAKO_CV.pdf` avec téléchargement fonctionnel
  AC2 Les photos haute résolution de Rodolphe sont converties et disponibles dans `/public/rodolphe.webp` et `/public/rodolphe_hover.webp`
  AC3 Les bannières d'événements et de projets (BetConstruct, SiGMA Africa, 1xBet, Block-Scholars, Onlyplay AMA) sont optimisées dans `/public/uploads/`
  AC4 (negative) Aucune image corrompue ou introuvable (404) dans les cartes de projets ou les portraits
Scenarios: PS-11, PS-15
Data: Fichiers statiques ajoutés à `public/` et `public/uploads/`
Out of scope: Modification des polices
Status: approved

### F-02 Synchronisation Données & Métadonnées (Data Store, Supabase & SEO)
Actor: Navigateur / Moteur de recherche / Système
Acceptance:
  AC1 `lib/metadata.ts`, `app/manifest.ts`, `public/manifest.json` reflètent l'identité de Rodolphe Salako ("Business Development & Strategic Partnerships")
  AC2 `data/portfolio.json` et `lib/portfolio-data.ts` contiennent l'intégralité du profil, stats, projets, expériences et compétences de Rodolphe
  AC3 La base de données Supabase (`portfolio_content` id='main') est synchronisée avec les nouvelles données
  AC4 (negative) Aucune mention résiduelle de "Guy Tibro" dans les métadonnées SEO ou les données de base
Scenarios: PS-01, PS-06, PS-11, PS-12
Data: Mise à jour de `data/portfolio.json` et enregistrement Supabase `portfolio_content`
Out of scope: Refonte du schéma SQL de base de données
Status: approved

### F-03 Hero Section BD & Préservation PortraitMorph OGL Shader
Actor: Visiteur arrivant sur la page d'accueil
Acceptance:
  AC1 Le Hero affiche le nom Rodolphe Salako, son rôle "Business Development & Sales Professional", titres "Business Development & Strategic Partnerships", et son manifesto "Connecting People. Building Partnerships. Driving Growth."
  AC2 Le composant `PortraitMorph` fonctionne avec ses shaders OGL intacts (transition fluide et onde de distorsion au survol souris)
  AC3 Les boutons CTA ("Prendre contact / Copier email", "Voir les projets", "Télécharger le CV") pointent vers les actions de Rodolphe
  AC4 (negative) La police de caractères d'origine n'est pas modifiée ; le canvas WebGL ne produit aucune erreur console
  AC5 Le titre principal du Hero est strictement contraint sur exactement deux lignes ("Business Development &" et "Strategic Partnerships") via whitespace-nowrap et typographie fluide clamp sans saut de ligne intempestif
Scenarios: PS-11, PS-20
Data: Consommation des champs `profile` de Rodolphe Salako
Out of scope: Remplacement du moteur OGL
Status: approved

### F-04 Réalisations BD/Partenariats & Menu 3D WebGL (InfiniteMenu)
Actor: Visiteur explorant les réalisations
Acceptance:
  AC1 Le composant `InfiniteMenu` 3D (WebGL) tourne et présente les 6 réalisations clés prioritaires (Partenariats B2B BetConstruct, Direction Affiliation 1win/1xBet, Sommets SiGMA/SBWA, Block-Scholars Bénin, Marketing CJC Race, Onlyplay Club)
  AC2 La page `/projects` affiche la grille complète des réalisations avec métadonnées B2B, descriptions détaillées et photos officielles
  AC3 Les animations d'orbite 3D et les shaders de disque restent 100% intacts et fonctionnels
  AC4 (negative) Aucun projet vide ou cassé en cas de défilement rapide ou d'interaction tactile/souris
Scenarios: PS-11, PS-14
Data: Liste `projects` dans `data/portfolio.json`
Out of scope: Altération des shaders `discVertShaderSource` / `discFragShaderSource`
Status: approved

### F-05 Expérience (Postes clés BD en premier), Compétences & Stack Physique Matter.js (About)
Actor: Recruteur ou prospect consultant la page `/about`
Acceptance:
  AC1 La section Experience liste les 10 postes réels de Rodolphe en priorisant en tête les postes de Business Development, Représentation pays (Block-Scholars), Affiliate Team Lead (1win), Ambassador Lead (Onlyplay), et Marketing Manager, reléguant les postes de CM en fin de parcours
  AC2 L'animation de pliage/dépliage Framer Motion de la liste d'expériences reste opérationnelle
  AC3 La section What I Do liste en priorité le Business Development & B2B Sales, les partenariats stratégiques, l'affiliation et les sommets internationaux
  AC4 La section Education mentionne sa Licence en Anglais (Traduction EN-FR), son diplôme en Informatique Administrative et ses distinctions speaker
  AC5 Le module `Stack` avec moteur physique 2D Matter.js fait chuter et rebondir les puces d'outils sans altération du moteur physique
  AC6 (negative) Aucune régression sur le canvas physique Matter.js
  AC7 L'intégralité des 12 outils de la stack dispose d'icônes vectorielles SVG locales et valides dans public/icons/ (LinkedIn, Telegram, X, Discord, Onlyplay, 1xBet/1win, Google Analytics, Notion, CapCut, Premiere Pro, Canva, Tapbit) avec repli visuel anti-erreur 404
Scenarios: PS-11, PS-12
Data: Tableaux `experiences`, `skills`, `education`, `stack`
Out of scope: Remplacement de Matter.js
Status: approved

### F-06 Prise de Contact Partenariats, Réseaux Sociaux & Téléchargement CV
Actor: Prospect souhaitant contacter Rodolphe
Acceptance:
  AC1 Le composant `ContactCard` affiche le fond animé `ShaderFlow` sans altération avec l'appel "Let's Build Strategic Partnerships"
  AC2 Les liens de contact pointent vers le profil LinkedIn (`rodolphe-salako-578885334`), X (`@ZekiZeki40`), Email (`rodolphesalako8@gmail.com`)
  AC3 Le bouton interactif de copie d'email fonctionne avec son animation Framer Motion
  AC4 Le bouton de téléchargement délivre `SALAKO_CV.pdf`
  AC5 (negative) Aucun lien brisé ou mort vers les réseaux sociaux du client
Scenarios: PS-11, PS-19
Data: Champs de contact de `profile`
Out of scope: Formulaire avec backend SMTP
Status: approved

### F-07 Sélecteur de Langue & Internationalisation (i18n FR / EN)
Actor: Visiteur international ou francophone
Acceptance:
  AC1 Un sélecteur interactif de langue (FR / EN) est intégré dans la barre de navigation
  AC2 Le basculement de langue traduit instantanément l'ensemble des textes clés (Hero, Projets, Expériences, Compétences, Contact, Navigation) sans rechargement de page
  AC3 La préférence de langue est conservée dans `localStorage` et synchronisée avec `document.documentElement.lang`
  AC4 (negative) Aucune altération des polices d'origine ni rupture des animations WebGL/Matter.js
Scenarios: PS-06, PS-11, PS-19
Data: Dictionnaire bilingue FR/EN dans `lib/i18n/` et injection dans `PortfolioContext`
Out of scope: Traduction d'autres langues que le français et l'anglais
Status: approved

### F-08 Remplacement de la sphère par DriftWall (React Bits) & Modal Détails Projets
Actor: Visiteur découvrant les projets sur la page d'accueil ou la page projets
Acceptance:
  AC1 Le composant `DriftWall` de React Bits remplace la sphère 3D de disques dans la section projets de la page d'accueil
  AC2 Le mur 3D en perspective anime de multiples colonnes de tuiles dérivantes (projets et réalisations de Rodolphe) avec effets de parallaxe, de survol (`lift`, `dim`, `fade`), et prise en compte de `prefers-reduced-motion`
  AC3 Au clic sur n'importe quelle tuile de projet, une fenêtre modale accessible s'ouvre pour afficher les détails complets (image HD, catégorie, titre, métadonnées, description complète et lien externe B2B)
  AC4 La modale se ferme par touche Echap, clic sur le bouton de fermeture ou clic sur le fond, et s'adapte à la langue active (FR / EN)
  AC5 (negative) Aucune altération des polices d'origine et aucun freeze ou leak dans la boucle requestAnimationFrame
Scenarios: PS-11, PS-14, PS-19
Data: Tableau des projets enrichi avec images de `public/uploads/`
Out of scope: Remplacement du composant Hero
Status: approved

### F-09 Intégration d'AccordionGallery (React Bits) & Galerie Interactive Complète
Actor: Visiteur explorant les réalisations et souhaitant accéder aux détails précis
Acceptance:
  AC1 Le composant `AccordionGallery` (React Bits + GSAP) est intégré en haut de la section projets avec accordéon horizontal fluide, rotation 3D tilt, parallaxe et révélation des libellés au survol/focus
  AC2 Les cartes complètes de détails de projets (`ProjectCard`) sont affichées juste en dessous de l'accordéon pour une consultation exhaustive et structurée
  AC3 Au clic sur un panneau actif de l'accordéon (ou le bouton 'Détails ↗') ou au clic sur une carte, la modale de détails précis (`ProjectDetailModal`) s'ouvre immédiatement avec toutes les informations
  AC4 (negative) La navigation clavier (flèches gauche/droite/haut/bas, Entrée, Espace) et `prefers-reduced-motion` sont pleinement supportées sans erreur d'hydratation
Scenarios: PS-11, PS-14, PS-19
Data: Données `projects` et items d'événements officiels
Out of scope: Altération de la police ou des composants Hero
Status: approved

### F-10 Carte Holographique 3D ProfileCard (React Bits) dans le Hero
Actor: Visiteur découvrant le portrait et l'identité de Rodolphe dans le Hero
Acceptance:
  AC1 Le composant `ProfileCard` (React Bits + `@hugeicons`) remplace le conteneur de portrait statique par une carte interactive holographique 3D avec film irisé (`holo`), faisceau lumineux suiveur (`glare`), rotation (`tilt`), parallaxe de profondeur et grain photoréaliste
  AC2 La carte affiche le portrait haute résolution de Rodolphe Salako, son rôle "Business Development & Sales Professional", son identifiant X `@ZekiZeki40`, son statut d'activité "Available for Partnerships", et un bouton d'action directe "Contact"
  AC3 Au clic sur le bouton "Contact", l'utilisateur est guidé directement vers la section contact ou l'envoi d'email
  AC4 (negative) Le composant gère gracieusement `prefers-reduced-motion`, l'absence de capteur gyroscope sur mobile, et les interactions tactiles sans crash
Scenarios: PS-11, PS-14, PS-19
Data: Portraits `public/rodolphe.webp`, `public/rodolphe_hover.webp`, données de profil de Rodolphe
Out of scope: Altération des polices d'origine
Status: approved

### F-11 Tableau de Bord Administrateur /ZEKIHUB & Gestion Complète du CRUD
Actor: Rodolphe Salako ou gestionnaire administrant le portfolio
Acceptance:
  AC1 Le tableau de bord d'administration est accessible via la route `/ZEKIHUB` avec page de connexion dédiée `/ZEKIHUB/login`
  AC2 L'ancienne route `/HUBGUY` est redirigée automatiquement en redirection permanente (308) vers `/ZEKIHUB`
  AC3 La gestion complète du CRUD est opérationnelle pour l'ensemble des entités : Projets (création, édition, suppression, réordonnancement haut/bas), Expériences, Piliers d'expertise, Compétences/Stack physique et Profil
  AC4 Le téléversement de fichiers prend en charge les formats d'images (PNG, JPG, WEBP, GIF, SVG) ainsi que les documents PDF pour la mise à jour directe du CV
  AC5 Le système d'authentification fournit des jetons de session sécurisés avec persistance et supporte les identifiants d'environnement configurables via `.env`
Scenarios: PS-01, PS-06, PS-11, PS-12, PS-15, PS-20
Data: `portfolio_content` sur Supabase, `data/portfolio.json`, `data/auth.json`
Out of scope: Création de comptes multi-utilisateurs
Status: approved

### F-12 Mise à jour du CV Officiel & Synchronisation Intégrale des Données du Résumé
Actor: Recruteurs, partenaires stratégiques et visiteurs téléchargeant le CV ou consultant le parcours
Acceptance:
  AC1 Le fichier CV officiel `/public/SALAKO_CV.pdf` est mis à jour à partir du nouveau document PDF source (`123SALAKO Rodolphe Resum @.pdf`, 1.6MB, 5 pages) avec en-tête PDF valide
  AC2 Les coordonnées de contact sont complétées avec le numéro de téléphone officiel (`+229 01 40 79 72 62` / `+2290140797262`) et la localisation (`Porto-Novo, Bénin`), accessibles en appel et WhatsApp direct
  AC3 Le résumé professionnel et le tagline intègrent l'expertise élargie aux secteurs de l'immobilier (Real Estate) et des services financiers (Financial Services), ainsi que la vente B2B et la génération de leads
  AC4 Le catalogue des compétences comprend les 16 compétences officielles répertoriées dans le nouveau CV
  AC5 L'historique professionnel inclut l'intégralité des 11 expériences professionnelles réelles, intégrant le poste `Social Media Manager` chez `NDA` (2020 – 2023)
  AC6 (negative) Aucune régression sur le téléchargement du CV, les tests automatisés ou la compilation TypeScript
Scenarios: PS-01, PS-06, PS-11, PS-12, PS-15, PS-20
Data: `public/SALAKO_CV.pdf`, `data/portfolio.json`, `lib/portfolio-data.ts`, `lib/i18n/translations.ts`
Out of scope: Remplacement des assets visuels existants
Status: approved
