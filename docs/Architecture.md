# CDC Frontend Architecture

Ce document reflète l'architecture cible définie dans le brief "CDC Frontend
architecture" (voir le board tldraw associé) et son état d'implémentation
réel dans ce dépôt.

## Stack technique

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | SSR, SSG, routing intégré, optimisations auto, Server Actions natifs |
| Langage | **TypeScript** partout | erreurs détectées au développement, autocomplétion, code maintenable |
| UI Kit | **Shadcn/UI** (dans `packages/ui`) | composants accessibles, personnalisables, basés sur Tailwind CSS |
| Style | **Tailwind CSS v4** | config CSS-first (`@theme`), tokens partagés entre apps |
| Documentation UI | **Storybook** (`packages/ui`) | isolation des composants, états visuels, sandbox sans backend |
| Données serveur | **TanStack Query** | cache, synchronisation, mutations, états loading/error |
| État UI local | **Zustand** | thème clair/sombre, menu mobile — jamais pour des données API |
| Communication backend | **Server Actions (BFF)** | le navigateur ne parle jamais directement au backend |
| Monorepo | **npm workspaces** | `apps/*` + `packages/*` dans un seul dépôt |
| Architecture de code | **Feature-Sliced Design** | par app, dans `src/` |
| Conteneurisation | **Docker** (dev uniquement) | même environnement pour tous ; la prod tourne sans Docker pour l'instant |

## Arborescence du monorepo

```
apps/
  web/                 → l'application Next.js publique (ce qui était "congo-developer-club")
packages/
  ui/                  → composants Shadcn/UI partagés + Storybook
  types/               → types TypeScript partagés entre apps et packages
  api-client/          → client HTTP "server-only", consommé uniquement par les Server Actions
  config-eslint/       → preset ESLint partagé (Next.js core-web-vitals + typescript)
  config-typescript/   → tsconfig de base partagé
docs/                  → Architecture.md (ce fichier), Roadmap.md
Dockerfile.dev          → image de développement
docker-compose.yml      → stack de dev (web + Postgres)
```

De futures apps (`apps/admin`, `apps/mobile-web`, etc.) suivront le même
schéma et pourront réutiliser `packages/ui`, `packages/types` et
`packages/api-client` sans dupliquer de code.

## Feature-Sliced Design — `apps/web/src`

```
src/
  app/          Next.js App Router (routing, layout, providers, globals.css) — reste fin
  views/        Couche "pages" de FSD, renommée pour ne pas entrer en conflit
                avec le dossier `pages/` historique de Next.js. Chaque route
                sous app/ importe une vue et se contente de la rendre.
  widgets/      Blocs d'UI autonomes composés de plusieurs features/entities
                (navbar, footer, back-to-top)
  features/     Actions utilisateur à valeur métier propre (ex. features/join-community :
                Server Action + useMutation, branché sur le formulaire du footer)
  entities/     Modèles du domaine (ex. entities/event : Server Action + hook
                TanStack Query prêts à brancher sur un vrai backend)
  shared/       Code réutilisable sans logique métier : shared/ui (ré-export de
                @cdc/ui), store Zustand, config statique (nav-links), icônes de marque
  processes/    Couche historique FSD v1 pour des flux multi-pages. Laissée
                vide à dessein — FSD v2 recommande features/widgets à la place.
```

Chaque slice (`widgets/navbar`, `entities/event`, …) expose son contenu via
un `index.ts` — le reste du code importe seulement ce barrel, jamais les
fichiers internes (`ui/`, `model/`, `api/`).

### Pourquoi `views/` et pas `pages/` ?

Next.js App Router route automatiquement tout ce qui se trouve dans
`src/pages/` s'il existe (mode de migration incrémentale Pages Router). Un
dossier `src/pages/` FSD serait donc silencieusement transformé en vraies
routes. `views/` évite ce conflit tout en gardant exactement le même rôle
(composer les widgets/features d'un écran complet).

## Shadcn/UI dans un monorepo

Les composants vivent dans `packages/ui/src/components` (actuellement
`button.tsx` et `card.tsx`, écrits à la main selon les conventions exactes de
Shadcn — `cva` pour les variants, `cn()` pour merger les classes). `apps/web`
les consomme via l'alias `@cdc/ui`.

`packages/ui/components.json` est déjà configuré pour que
`npx shadcn@latest add <composant>` fonctionne directement dans ce package
pour ajouter de nouveaux composants au catalogue partagé.

Les tokens de couleur Shadcn (`--color-primary`, `--color-secondary`, …) sont
définis une seule fois dans `apps/web/src/app/globals.css` et dérivés de la
palette de marque :

- Blanc `#FFFFFF` → fond (`background`)
- Bleu `#3C7EA9` → `primary`
- Vert `#50AA79` → `secondary`
- Orange `#F5A623` → `accent`

Tailwind v4 scanne aussi `packages/ui/src` grâce à la directive
`@source "../../../../packages/ui/src";` dans `globals.css`, donc les classes
utilisées uniquement dans les composants partagés sont bien générées.

## Storybook

```
npm run storybook          # démarre Storybook sur http://localhost:6006
npm run build-storybook     # build statique de vérification
```

Basé sur `@storybook/react-vite` (Vite, pas de dépendance à Next.js pour ce
package). Chaque composant important de `packages/ui` doit avoir son fichier
`*.stories.tsx` avec au minimum les états `Default`, `Loading`, `Disabled`,
`With Icon` — voir `button.stories.tsx` comme référence.

Limite connue : Storybook importe `globals.css` mais pas les variables de
police injectées par `next/font` (qui ne s'applique qu'à l'app Next.js) — les
composants s'y affichent donc avec la police système, pas Geist.

## TanStack Query + Zustand

- **TanStack Query** : toute donnée qui vient d'une API (événements, membres,
  projets…) passe par un hook `useXxx` dans `entities/*/model`, lui-même
  appelant une Server Action.
  - Lecture (`useQuery`) : `entities/event` (`getEvents.action.ts` + `useEvents.ts`),
    prêt à être branché dès qu'un vrai backend existe (`CDC_BACKEND_URL`).
  - Écriture (`useMutation`) : `features/join-community` (`join.action.ts` +
    `useJoinCommunity.ts`), déjà branché sur le formulaire "Rejoindre" du
    footer — échoue proprement (message d'erreur, pas de crash) tant qu'aucun
    backend ne répond sur `/members/join`.
- **Zustand** : uniquement de l'état d'interface qui ne vient jamais d'une
  API — `shared/store/useThemeStore.ts` (clair/sombre) et
  `useMobileMenuStore.ts` (menu mobile ouvert/fermé) en sont les deux
  exemples actuels. Ne jamais y stocker une liste d'événements, de membres,
  etc. — ça, c'est TanStack Query.

## Internationalisation (FR/EN)

Le sélecteur FR/EN de la navbar change réellement la langue affichée,
instantanément, sans recharger la page ni changer d'URL — c'est un choix de
confort volontaire, pas une limitation technique.

- `shared/i18n/locale-store.ts` : la locale courante, dans un store **Zustand**
  (état d'interface, même logique que le thème clair/sombre).
- `shared/i18n/dictionaries.ts` : toutes les chaînes d'UI, `fr` et `en` en
  miroir.
- `shared/i18n/useTranslations()` : hook qui retourne le dictionnaire de la
  locale active.
- Contenu de démonstration bilingue : `entities/event/model/events.seed.en.ts`
  et `entities/post/model/posts.seed.en.ts`, sélectionnés via
  `useLocalizedEvents()` / `useLocalizedPosts()`.

**Compromis assumé** : les composants qui affichent du texte traduit sont des
Client Components (`"use client"`), puisqu'ils doivent réagir instantanément
au changement de locale. C'est un renoncement volontaire à un rendu 100% SSR
sur ces sections, en échange d'un changement de langue immédiat sans
rechargement — cohérent avec l'expérience attendue d'un sélecteur de langue
en pilule dans la navbar plutôt qu'une route `/en/...` séparée.

## Server Actions (BFF)

Toute communication avec un backend passe par une Server Action
(`"use server"`), qui elle-même appelle `@cdc/api-client` (package
server-only : ses clés/URLs internes ne quittent jamais le serveur). Le
navigateur n'appelle jamais une API externe directement.

```
Composant client → hook TanStack Query → Server Action → @cdc/api-client → Backend
```

`@cdc/api-client` lit l'URL du backend depuis `CDC_BACKEND_URL` (variable
d'environnement serveur uniquement).

## Docker (développement uniquement)

```
docker compose up
```

démarre `web` (Next.js, port 3000) et `db` (Postgres 16, port 5432). Comme
précisé dans le brief, Docker n'est **pas obligatoire en production** — le
premier déploiement tournera directement avec Node (et Postgres, puis
éventuellement PHP) sur le serveur, sans conteneurs, pour éviter la
surcharge ; Docker pourra être réintroduit en prod plus tard selon
l'infrastructure retenue.

## Ce qui reste à faire

Voir `docs/Roadmap.md`.
