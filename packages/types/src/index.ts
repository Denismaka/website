export interface NavLink {
    label: string;
    href: string;
}

export interface CommunityEvent {
    id: string;
    title: string;
    date: string;
    location: string;
}

export interface Member {
    id: string;
    name: string;
    githubHandle: string;
    avatarUrl?: string;
}

/** Canonical, locale-independent category keys — look up the display label via a dictionary. */
export type PostCategory = "tutorials" | "news" | "recaps" | "community";

export interface Post {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: PostCategory;
    readMinutes: number;
}
