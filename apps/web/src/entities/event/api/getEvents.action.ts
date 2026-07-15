"use server";

import { getEvents as fetchEvents } from "@cdc/api-client";
import type { CommunityEvent } from "@cdc/types";

/**
 * Server Action — the only place allowed to talk to the backend (BFF).
 * Client code must call this action through TanStack Query, never
 * `@cdc/api-client` directly.
 */
export async function getEventsAction(): Promise<CommunityEvent[]> {
    return fetchEvents();
}
