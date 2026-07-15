"use client";

import type { Post } from "@cdc/types";
import { Card, CardContent, CardDescription, CardTitle, TiltCard } from "@/shared/ui";
import { useLocaleStore, useTranslations } from "@/shared/i18n";

export function PostCard({ post }: { post: Post }) {
    const t = useTranslations();
    const locale = useLocaleStore((s) => s.locale);
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <TiltCard strength={4}>
            <Card className="h-full border-border/80 transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col pt-6">
                    <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                        {t.blogPage.categories[post.category]}
                    </span>
                    <CardTitle className="mt-4 text-lg">{post.title}</CardTitle>
                    <CardDescription className="mt-2 flex-1">{post.excerpt}</CardDescription>
                    <p className="mt-4 font-mono text-xs text-muted-foreground">
                        {formatter.format(new Date(post.date))} · {post.readMinutes}{" "}
                        {t.blogPage.readMinutesSuffix}
                    </p>
                </CardContent>
            </Card>
        </TiltCard>
    );
}
