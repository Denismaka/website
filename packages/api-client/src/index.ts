import type { CommunityEvent, Member } from "@cdc/types";

/**
 * Server-only HTTP client. Only Server Actions should import this package —
 * it holds the internal backend URL and must never reach the browser bundle.
 */

const BASE_URL = process.env.CDC_BACKEND_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: { "Content-Type": "application/json", ...init?.headers },
    });
    if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText} (${path})`);
    }
    return res.json() as Promise<T>;
}

export function getEvents() {
    return request<CommunityEvent[]>("/events");
}

export function getMembers() {
    return request<Member[]>("/members");
}

export function joinCommunity(email: string) {
    return request<{ success: boolean }>("/members/join", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export { getOrgContributors, type OrgContributor } from "./github";
