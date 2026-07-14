import type { Post } from "@cdc/types";

/** Placeholder articles until a real CMS/backend is wired up. */
export const postsSeed: Post[] = [
    {
        id: "pourquoi-typescript-2026",
        title: "Pourquoi apprendre TypeScript en 2026",
        excerpt:
            "Un tour d'horizon de ce que TypeScript apporte à un projet Next.js, et pourquoi on l'impose sur tous nos projets.",
        date: "2026-06-28",
        category: "tutorials",
        readMinutes: 6,
    },
    {
        id: "retour-hackathon-national-2025",
        title: "Retour sur le Hackathon National 2025",
        excerpt: "300 participants, 45 solutions présentées : ce qu'il faut retenir de cette édition.",
        date: "2026-06-10",
        category: "recaps",
        readMinutes: 4,
    },
    {
        id: "projets-open-source-congolais",
        title: "5 projets open source congolais à suivre",
        excerpt: "Une sélection de projets portés par des membres de la communauté, à contribuer dès aujourd'hui.",
        date: "2026-05-22",
        category: "community",
        readMinutes: 5,
    },
    {
        id: "rejoindre-nos-bootcamps",
        title: "Comment rejoindre nos bootcamps",
        excerpt: "Le calendrier, les prérequis et le processus de candidature pour la prochaine session.",
        date: "2026-05-02",
        category: "news",
        readMinutes: 3,
    },
];
