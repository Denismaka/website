export interface Contributor {
    handle: string;
    contributions: number | null;
    role?: string;
}

/**
 * Seed data mirroring the real GitHub contributors listed on the current
 * production site, plus the maintainer who was missing from it. Replace with
 * a live GitHub API call (via a Server Action) once one is wired up.
 */
export const contributors: Contributor[] = [
    { handle: "guillainbisimwa", contributions: 11708 },
    { handle: "Denismaka", contributions: null, role: "Mainteneur" },
    { handle: "Cedric921", contributions: 3216 },
    { handle: "RobertKule", contributions: 2951 },
    { handle: "DoddyMatabaro", contributions: 2647 },
    { handle: "barakadanny", contributions: 1440 },
    { handle: "JackMutobu", contributions: 1346 },
    { handle: "AshDest", contributions: 1290 },
    { handle: "Tacite243", contributions: 891 },
];
