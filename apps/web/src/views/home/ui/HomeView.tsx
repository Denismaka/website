import { Hero } from "./Hero";
import { WhatWeDo } from "./WhatWeDo";
import { Impact } from "./Impact";
import { TopContributors } from "./TopContributors";
import { UpcomingEvents } from "./UpcomingEvents";
import { BlogPreview } from "./BlogPreview";

export function HomeView() {
    return (
        <main className="flex-1">
            <Hero />
            <WhatWeDo />
            <Impact />
            <TopContributors />
            <UpcomingEvents />
            <BlogPreview />
        </main>
    );
}
