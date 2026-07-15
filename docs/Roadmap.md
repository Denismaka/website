# Roadmap

## Fait

- Monorepo npm workspaces (`apps/web`, `packages/{ui,types,api-client,config-eslint,config-typescript}`)
- Architecture Feature-Sliced Design dans `apps/web/src`
- Palette de marque appliquée (blanc / bleu `#3C7EA9` / vert `#50AA79` / orange `#F5A623`)
- Navbar, Footer, bouton retour en haut (widgets FSD)
- Shadcn/UI amorcé dans `packages/ui` (`Button`, `Card`) + Storybook
- TanStack Query et Zustand installés et branchés (exemple : `entities/event`)
- Convention Server Actions / BFF posée (`@cdc/api-client`)
- Docker de développement (`docker-compose.yml`, `Dockerfile.dev`)

## À faire

- [ ] Premier vrai backend branché sur `@cdc/api-client` (URL réelle dans `CDC_BACKEND_URL`)
- [ ] Vraies pages (`views/`) pour Accueil, À propos, Activités, Événements, Blog, Contact
- [ ] i18n réel FR/EN (le sélecteur de la navbar n'est pour l'instant qu'un état visuel)
- [ ] Étendre `packages/ui` : Input, Dialog/Modal, Badge, Avatar — via `npx shadcn@latest add`
- [ ] Stories Storybook pour chaque nouveau composant ajouté à `packages/ui`
- [ ] Authentification (si nécessaire pour "Nous rejoindre" / espace membre)
- [ ] Tests (unitaires sur `packages/ui`, e2e sur `apps/web`)
- [ ] CI (lint + typecheck + build + Storybook) avant tout merge
- [ ] Décider de l'infra de prod définitive (Node/Postgres sans Docker au départ, PHP à intégrer progressivement selon le brief) et écrire le pipeline de déploiement correspondant
- [ ] `apps/admin` et/ou `apps/mobile-web` le jour où ils deviennent nécessaires, réutilisant `packages/ui` / `packages/types` / `packages/api-client`
