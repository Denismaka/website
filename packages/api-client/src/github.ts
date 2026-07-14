/**
 * Real GitHub org contributor stats — server-only (uses GITHUB_TOKEN).
 * Aggregates commit counts per person across every public repo of an org.
 */

const GITHUB_API = "https://api.github.com";
const ONE_HOUR = 3600;

function githubHeaders(): Record<string, string> {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
}

interface GithubRepo {
    name: string;
    fork: boolean;
    archived: boolean;
}

interface GithubContributorStat {
    author: { login: string } | null;
    total: number;
}

export interface OrgContributor {
    handle: string;
    contributions: number;
}

async function fetchOrgRepos(org: string): Promise<GithubRepo[]> {
    const res = await fetch(`${GITHUB_API}/orgs/${org}/repos?per_page=100&type=public`, {
        headers: githubHeaders(),
        next: { revalidate: ONE_HOUR },
    });
    if (!res.ok) {
        throw new Error(`GitHub repos fetch failed for org "${org}": ${res.status}`);
    }
    return res.json();
}

/**
 * GitHub computes these stats asynchronously the first time they're
 * requested and answers 202 with an empty body while it works — retry a
 * few times with a short delay before giving up on that repo.
 */
async function fetchRepoContributorStats(
    org: string,
    repo: string,
    attempt = 0
): Promise<GithubContributorStat[]> {
    const res = await fetch(`${GITHUB_API}/repos/${org}/${repo}/stats/contributors`, {
        headers: githubHeaders(),
        next: { revalidate: ONE_HOUR },
    });
    if (res.status === 202 && attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return fetchRepoContributorStats(org, repo, attempt + 1);
    }
    if (!res.ok) return [];
    // A repo with no commits yet (or still "computing") can answer 200 with
    // an empty body rather than `[]` — guard against that before parsing.
    const text = await res.text();
    if (!text) return [];
    return JSON.parse(text);
}

/** Total real commits per person, across every public (non-fork, non-archived) repo of the org. */
export async function getOrgContributors(org: string): Promise<OrgContributor[]> {
    const repos = await fetchOrgRepos(org);
    const totals = new Map<string, number>();

    await Promise.all(
        repos
            .filter((repo) => !repo.fork && !repo.archived)
            .map(async (repo) => {
                const stats = await fetchRepoContributorStats(org, repo.name);
                for (const stat of stats) {
                    if (!stat.author?.login) continue;
                    totals.set(stat.author.login, (totals.get(stat.author.login) ?? 0) + stat.total);
                }
            })
    );

    return Array.from(totals.entries())
        .map(([handle, contributions]) => ({ handle, contributions }))
        .sort((a, b) => b.contributions - a.contributions);
}
