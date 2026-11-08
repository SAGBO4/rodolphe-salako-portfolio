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

| F-17 | Galerie des Sommets & Événements Internationaux (SiGMA, SBWA+, iGaming Afrika) | F-01, F-02, F-07 | approved |
| F-18 | Système Universel de Téléversement Drag & Drop et Gestion Multi-Photos Galerie dans ZEKIHUB | F-11, F-17 | approved |
| F-19 | Stockage Média Supabase Dédié & Résolution Définitive des Erreurs de Sauvegarde et Service Worker | F-11, F-18 | approved |
| F-20 | Refonte Typographique des Réalisations selon le CV (Strictement 0 Image) | F-02, F-04, F-08 | approved |

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
  AC6 La barre de navigation publique flottante (`Nav`) est automatiquement masquée sur les routes d'administration `/ZEKIHUB` et `/HUBGUY` pour éliminer tout chevauchement avec l'en-tête du back-office, et l'en-tête affiche de manière compacte et épurée `R. SALAKO` sans retour à la ligne sur mobile
Scenarios: PS-01, PS-06, PS-11, PS-12, PS-15, PS-20
Data: `portfolio_content` sur Supabase, `data/portfolio.json`, `data/auth.json`
Out of scope: Création de comptes multi-utilisateurs
Status: approved

### F-12 Mise à jour du CV Officiel & Synchronisation Intégrale des Données du Résumé
Actor: Recruteurs, partenaires stratégiques et visiteurs téléchargeant le CV ou consultant le parcours
Acceptance:
  AC1 Le fichier CV officiel `/public/SALAKO_CV.pdf` est mis à jour à partir du nouveau document PDF source (`123SALAKO Rodolphe Resum @.pdf`, 1.6MB, 5 pages) avec en-tête PDF valide
  AC2 Les coordonnées de contact affichent le numéro de téléphone au format épuré sans le 01 (`+229 40 79 72 62` / `+22940797262`) et la localisation (`Porto-Novo, Bénin`), avec disponibilité "Remote, on site and international events", métrique révisée à 40+ Partenaires Stratégiques, et description de projet Block-Scholars précisant "to scale iGaming, Web3 and digital technology adoption"
  AC3 Le résumé professionnel et le tagline intègrent l'expertise élargie aux secteurs de l'immobilier (Real Estate) et des services financiers (Financial Services), ainsi que la vente B2B et la génération de leads
  AC4 Le catalogue des compétences comprend les 16 compétences officielles répertoriées dans le nouveau CV
  AC5 L'historique professionnel inclut l'intégralité des 11 expériences professionnelles réelles, intégrant le poste `Social Media Manager` chez `NDA` (2020 – 2023)
  AC6 (negative) Aucune régression sur le téléchargement du CV, les tests automatisés ou la compilation TypeScript
Scenarios: PS-01, PS-06, PS-11, PS-12, PS-15, PS-20
Data: `public/SALAKO_CV.pdf`, `data/portfolio.json`, `lib/portfolio-data.ts`, `lib/i18n/translations.ts`
Out of scope: Remplacement des assets visuels existants
Status: approved

### F-13 Optimisation Complète de la Responsivité Multi-Écrans (Mobile 320px - Desktop)
Actor: Visiteur ou recruteur naviguant sur mobile (320px à 480px), tablette (640px à 1024px) ou grand écran (>1024px)
Acceptance:
  AC1 La barre de navigation (`Nav`) s'ajuste dynamiquement avec un positionnement supérieur compact (`top-3 sm:top-6`), largeur maximale bordée (`max-w-[calc(100vw-1.5rem)]`), espacement compact et liens protégés contre le wrapping ou rognage sur écrans étroits
  AC2 La section `Hero` et la carte holographique `ProfileCard` s'adaptent avec typographie fluide `clamp`, conteneur réactif (`max-w-[310px] sm:max-w-[360px]`), paddings compacts, et requêtes CSS pour écrans <= 380px évitant tout débordement
  AC3 Le mur 3D `DriftWall` adapte dynamiquement le nombre de colonnes (3 sur mobile, 4 sur tablette, 5 sur desktop), la dimension des tuiles et la perspective pour une consultation fluide au toucher sans clipping
  AC4 L'accordéon interactif `AccordionGallery` bascule élégamment en colonne sur mobile avec libellés lisibles, déclenchement tactile direct (`trigger: "click"`), et espacements réduits
  AC5 Le header de la page projets (`ProjectsHeader`) corrige l'ancien espacement excessif (`sm:pt-100`) par un padding harmonisé (`sm:pt-48 pt-28 pb-10 sm:pb-16`) et une typographie fluide
  AC6 La page `About` et ses composants (`Experience`, `Education`, `Skills`, `Stack` physique Matter.js) adaptent leurs paddings (`p-4 sm:p-8`), tailles de logos, disposition des boutons d'actions et dimensions du conteneur de simulation
  AC7 La carte de contact (`ContactCard`) et la modale de détails (`ProjectDetailModal`) adaptent leurs icônes avec retour à la ligne (`flex-wrap`) et leurs boutons d'actions avec inversion de flux sur mobile (`flex-col-reverse sm:flex-row`)
  AC8 (negative) Aucun défilement horizontal parasite (`overflow-x: hidden`), aucun chevauchement de texte, et préservation totale des 49 tests automatisés
Scenarios: PS-01, PS-06, PS-11, PS-14, PS-19, PS-20
Data: Composants de présentation, styles CSS et layouts
Out of scope: Altération de la palette de couleurs
Status: approved

### F-17 Galerie des Sommets & Événements Internationaux (SiGMA, SBWA+, iGaming Afrika)
Actor: Visiteur, recruteur ou partenaire stratégique consultant les participations et prises de parole internationales de Rodolphe Salako
Acceptance:
  AC1 Tous les visuels des sommets sont convertis et optimisés en WebP dans `/public/events/` répartis entre `sigma-africa/`, `sbwa-dakar/` et `igaming-nairobi/`
  AC2 L'événement SBWA+ Dakar présente le badge officiel "Speaker" avec photos d'intervention et captures des posts de l'événement
  AC3 Les événements SiGMA Africa (Cape Town) et iGaming Afrika (Nairobi) sont intégrés avec dates, lieux et résumés B2B dédiés
  AC4 La barre de navigation `Nav` intègre l'onglet "Événements" (`/events`) et la page dédiée propose des filtres interactifs par sommet avec compteur dynamique
  AC5 La page d'accueil intègre un spotlight `EventsSpotlight` avec aperçu des sommets récents et lien direct vers `/events`, et le dashboard ZEKIHUB dispose du gestionnaire `EventsEditor` complet
  AC6 (negative) Aucune régression sur le build Turbopack, la suite de tests ou les shaders existants
Scenarios: PS-01, PS-06, PS-11, PS-15, PS-19, PS-20
Data: `data/portfolio.json`, `lib/portfolio-data.ts`, `lib/i18n/translations.ts`
Out of scope: Intégration de billetterie ou flux vidéo en direct
Status: approved

### F-18 Système Universel de Téléversement Drag & Drop et Gestion Multi-Photos Galerie dans ZEKIHUB
Actor: Administrateur (Rodolphe Salako) gérant ses contenus visuels, sommets, projets et documents depuis le tableau de bord ZEKIHUB
Acceptance:
  AC1 Zone de glisser-déposer universelle `DropzoneImageUploader` avec aperçu temps réel, compression WebP automatique côté client et téléversement sécurisé
  AC2 Téléverseur multi-photos `DropzoneMultiPhotoUploader` permettant d'ajouter par lot des photos directement dans la galerie d'un sommet avec sélecteur de tag (Photo / Speaker / Post), réordonnancement et suppression
  AC3 Zone de glisser-déposer dédiée `DropzoneFileUploader` pour le CV officiel en PDF avec vérification du type de fichier et prévisualisation
  AC4 Section "Portraits Officiels & Carte 3D Hero" intégrée dans ProfileEditor pour configurer directement le portrait principal et le portrait au survol de la carte interactive
  AC5 Remplacement des anciens sélecteurs textuels dans ProjectsEditor et SkillsStackEditor pour permettre l'ajout direct d'images et d'icônes par glisser-déposer
  AC6 (negative) Aucune régression sur les tests unitaires (56 tests verts), la compilation TypeScript ou le build Turbopack
Scenarios: PS-01, PS-06, PS-11, PS-15, PS-19, PS-20
Data: `app/ZEKIHUB/page.tsx`, `components/hero/hero.tsx`, `lib/portfolio-data.ts`, `data/portfolio.json`
Out of scope: Traitement vidéo lourd côté client
Status: approved

### F-19 Stockage Média Supabase Dédié & Résolution Définitive des Erreurs de Sauvegarde et Service Worker
Actor: Administrateur enregistrant des photos et données sans limitation de taille de payload ni erreur réseau
Acceptance:
  AC1 Route de diffusion média `/api/content/media/[id]` servant les images stockées dans Supabase avec mise en cache CDN permanente `max-age=31536000, immutable`
  AC2 Persistance découplée dans `/api/admin/upload` enregistrant chaque image dans une ligne dédiée de `portfolio_content` et renvoyant une URL propre courte `/api/content/media/${mediaId}`
  AC3 Migration des anciennes chaînes base64 volumineuses réduisant la charge utile principale de 4,25 Mo à 232 Ko (-95%)
  AC4 Gestion sécurisée des erreurs de parsing dans `handleSave` (`app/ZEKIHUB/page.tsx`) protégeant contre les erreurs 413 et affichant des messages clairs
  AC5 Service Worker `public/sw.js` mis à jour en v3 avec gestion propre des ressources hors ligne et exclusion des erreurs d'interception
  AC6 (negative) 56 tests unitaires au vert, 0 erreur TypeScript, 0 erreur documentaire docs_check
Scenarios: PS-01, PS-06, PS-11, PS-15, PS-20
Data: `app/api/content/media/[id]/route.ts`, `app/api/admin/upload/route.ts`, `app/ZEKIHUB/page.tsx`, `public/sw.js`
Out of scope: Migration vers un bucket S3 tiers payant
Status: approved

### F-20 Refonte Typographique des Réalisations selon le CV (Strictement 0 Image)
Actor: Visiteur ou recruteur consultant les réalisations et postes professionnels de Rodolphe Salako
Acceptance:
  AC1 Suppression impérative et totale de toutes les images dans la section des projets/réalisations (aucun rendu d'image, aucun aspect ratio média)
  AC2 Affichage précis et vérifié des 11 postes du CV avec intitulé exact, entreprise, période et brève description claire et concise
  AC3 Données dérivées EXCLUSIVEMENT du CV officiel (`SALAKO_CV.pdf`) sans aucune invention ni extrapolation
  AC4 Modale de détails `ProjectDetailModal` repensée en design typographique élégant avec badges d'entreprise, période, tags de compétences et liens sans image
  AC5 Synchronisation bilatérale des 11 réalisations dans `data/portfolio.json`, `lib/portfolio-data.ts`, `lib/i18n/translations.ts` et Supabase `portfolio_content` row `main`
  AC6 (negative) 56 tests unitaires au vert, 0 régression TypeScript, 0 erreur Turbopack build
Scenarios: PS-01, PS-06, PS-11, PS-12, PS-20
Data: `data/portfolio.json`, `lib/portfolio-data.ts`, `components/projects/projects.tsx`, `components/projects/project-detail-modal.tsx`, `lib/i18n/translations.ts`
Out of scope: Ajout d'images ou d'expériences non mentionnées dans le CV
Status: approved
