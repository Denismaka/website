import type { CommunityEvent } from "@cdc/types";

/**
 * Placeholder events used until a real backend is wired to `useEvents`
 * (see `api/getEvents.action.ts`). Dates are illustrative, not real bookings.
 */
export const eventsSeed: CommunityEvent[] = [
    {
        id: "hackathon-national-2026",
        title: "Hackathon National 2026",
        date: "2026-08-15",
        location: "Kinshasa",
    },
    {
        id: "bootcamp-react-nextjs",
        title: "Bootcamp React & Next.js",
        date: "2026-08-02",
        location: "En ligne",
    },
    {
        id: "meetup-lubumbashi",
        title: "Meetup Développeurs Lubumbashi",
        date: "2026-07-26",
        location: "Lubumbashi",
    },
    {
        id: "atelier-git-github",
        title: "Atelier Git & GitHub pour débutants",
        date: "2026-07-20",
        location: "En ligne",
    },
];
