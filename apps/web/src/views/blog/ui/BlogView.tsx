"use client";

import { useLocalizedPosts } from "@/entities/post";
import { Card, CardContent, CardDescription, CardTitle, TiltCard } from "@/shared/ui";
import { useLocaleStore, useTranslations } from "@/shared/i18n";
import { BlogGrid } from "./BlogGrid";

export function BlogView() {
    const t = useTranslations();
    const locale = useLocaleStore((s) => s.locale);
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const posts = useLocalizedPosts();
    const [featured, ...rest] = posts;

    return (
        <main className="flex-1">
            <section className="px-6 pt-40 pb-16 sm:pt-48">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        {t.blogPage.eyebrow}
                    </p>
                    <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
                        {t.blogPage.title}
                    </h1>
                </div>
            </section>

            {featured && (
                <section className="px-6 pb-16">
                    <div className="mx-auto max-w-6xl">
                        <TiltCard strength={3}>
                            <Card className="border-border/80 transition-shadow hover:shadow-lg">
                                <CardContent className="pt-8">
                                    <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                                        {t.blogPage.featuredBadge} · {t.blogPage.categories[featured.category]}
                                    </span>
                                    <CardTitle className="mt-4 text-3xl">{featured.title}</CardTitle>
                                    <CardDescription className="mt-3 max-w-2xl text-base">
                                        {featured.excerpt}
                                    </CardDescription>
                                    <p className="mt-5 font-mono text-xs text-muted-foreground">
                                        {formatter.format(new Date(featured.date))} · {featured.readMinutes}{" "}
                                        {t.blogPage.readMinutesSuffix}
                                    </p>
                                </CardContent>
                            </Card>
                        </TiltCard>
                    </div>
                </section>
            )}

            <section className="border-t border-border px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <BlogGrid posts={rest} />
                </div>
            </section>
        </main>
    );
}
