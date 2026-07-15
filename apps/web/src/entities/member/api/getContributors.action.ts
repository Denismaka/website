"use server";

import { getOrgContributors } from "@cdc/api-client";
import { contributors as fallbackContributors, type Contributor } from "../model/contributors";

/** The real Congo Developer Club GitHub organization. */
const ORG = "congodevelopersclub";

const MAINTAINER_HANDLE = "Denismaka";

/**
 * Real commit counts aggregated across every public repo of the org. Falls
 * back to the last known-good snapshot (`model/contributors.ts`) if GitHub
 * is unreachable or rate-limited, so this section never breaks.
 */
export async function getContributorsAction(): Promise<Contributor[]> {
    try {
        const real = await getOrgContributors(ORG);
        if (real.length === 0) return fallbackContributors;

        const ranked: Contributor[] = real.map((c) => ({ handle: c.handle, contributions: c.contributions }));

        const hasMaintainer = ranked.some((c) => c.handle.toLowerCase() === MAINTAINER_HANDLE.toLowerCase());
        if (!hasMaintainer) {
            ranked.splice(1, 0, { handle: MAINTAINER_HANDLE, contributions: null, role: "Mainteneur" });
        }

        return ranked.slice(0, 12);
    } catch {
        return fallbackContributors;
    }
}
