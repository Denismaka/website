# Congo Developer Club — Plateforme

Monorepo de la plateforme web du **Congo Developer Club (CDC)**, la
communauté de référence pour les développeurs en République Démocratique du
Congo.

Architecture détaillée : [docs/Architecture.md](docs/Architecture.md) ·
Suite des travaux : [docs/Roadmap.md](docs/Roadmap.md)

## Stack technique

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Shadcn/UI ·
Storybook · TanStack Query · Zustand · Server Actions (BFF) · npm workspaces ·
Feature-Sliced Design · Docker (dev uniquement).

Palette de marque : blanc `#FFFFFF` · bleu `#3C7EA9` · vert `#50AA79` ·
orange `#F5A623`.

## Structure du dépôt

```
apps/
  web/                 l'application publique Next.js
packages/
  ui/                  composants Shadcn/UI partagés + Storybook
  types/               types TypeScript partagés
  api-client/          client HTTP server-only (consommé par les Server Actions)
  config-eslint/       preset ESLint partagé
  config-typescript/   tsconfig de base partagé
docs/                  Architecture.md, Roadmap.md
```

Détail de la Feature-Sliced Design (`apps/web/src/{app,views,widgets,
features,entities,shared,processes}`) : voir
[docs/Architecture.md](docs/Architecture.md).

## Lancer le projet

```
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

```
npm run storybook        # catalogue de composants (packages/ui) sur :6006
npm run lint              # lint de tous les workspaces
npm run build              # build de production de l'app web
```

### Avec Docker (dev)

```
docker compose up
```

Démarre l'app web (port 3000) et Postgres (port 5432). Docker n'est utilisé
qu'en développement — voir [docs/Architecture.md](docs/Architecture.md#docker-développement-uniquement)
pour le raisonnement sur la prod.

## Contribution — navbar, footer & bouton retour en haut

**Auteur : Denis Maka ([@Denismaka](https://github.com/Denismaka))**

Avant la mise en place du monorepo, une première refonte de l'identité
visuelle du site (alors un simple projet Next.js, sans le reste de la stack
ci-dessus) a posé la navbar, le footer et le bouton "retour en haut"
actuels :

- **Navbar** : barre flottante fixe, capsule translucide avec flou, liens
  réduits à l'essentiel (Accueil, À propos, Activités, Événements, Blog),
  pilule animée qui suit le lien survolé, sélecteur FR/EN, thème
  clair/sombre, repli mobile.
- **Footer** : bandeau CTA newsletter, grille de liens sur 4 colonnes,
  wordmark "Congo Developer Club" en très grand format qui s'étire
  dynamiquement (mesuré en JS) sur toute la largeur de la grille.
- **Bouton retour en haut** : anneau de progression de scroll (SVG) avec la
  marque CDC au centre plutôt qu'un bouton carré/rond avec flèche.

Décisions de design conservées telles quelles :

- **Pas d'icône devant chaque lien texte du footer** — les libellés sont
  déjà auto-explicites ; les icônes restent réservées aux réseaux sociaux et,
  le cas échéant, à un indicateur de lien externe.
- **Lucide ne fournit pas de logos de marque** (GitHub, X, LinkedIn) : ces
  icônes sont des SVG dessinés à la main
  (`apps/web/src/shared/icons/BrandIcons.tsx`) ; le reste de l'interface
  utilise Lucide.
- **Polices** : Geist Sans / Geist Mono via `next/font/google`,
  auto-hébergées par Next.js.
- La palette et la charte visuelle du site public (fond noir + émeraude) ont
  depuis été remplacées par la palette de marque officielle ci-dessus, définie
  dans le brief d'architecture.
