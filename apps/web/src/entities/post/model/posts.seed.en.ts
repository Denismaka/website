import type { Post } from "@cdc/types";

/** English mirror of `posts.seed.ts` — same ids/dates/categories, translated copy. */
export const postsSeedEn: Post[] = [
    {
        id: "pourquoi-typescript-2026",
        title: "Why learn TypeScript in 2026",
        excerpt:
            "A look at what TypeScript brings to a Next.js project, and why we require it on every project.",
        date: "2026-06-28",
        category: "tutorials",
        readMinutes: 6,
    },
    {
        id: "retour-hackathon-national-2025",
        title: "Recap: Hackathon National 2025",
        excerpt: "300 participants, 45 solutions presented: what to remember from this edition.",
        date: "2026-06-10",
        category: "recaps",
        readMinutes: 4,
    },
    {
        id: "projets-open-source-congolais",
        title: "5 Congolese open source projects to follow",
        excerpt: "A selection of projects led by community members, open to contribution today.",
        date: "2026-05-22",
        category: "community",
        readMinutes: 5,
    },
    {
        id: "rejoindre-nos-bootcamps",
        title: "How to join our bootcamps",
        excerpt: "The schedule, requirements, and application process for the next session.",
        date: "2026-05-02",
        category: "news",
        readMinutes: 3,
    },
];
