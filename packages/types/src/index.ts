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
