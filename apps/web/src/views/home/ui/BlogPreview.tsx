"use client";

import Link from "next/link";
import { PostCard, useLocalizedPosts } from "@/entities/post";
import { buttonVariants } from "@/shared/ui";
import { useTranslations } from "@/shared/i18n";

export function BlogPreview() {
    const t = useTranslations();
    const posts = useLocalizedPosts();
    const latest3 = posts.slice(0, 3);

    return (
        <section className="border-t border-border px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                            {t.blogPreview.eyebrow}
                        </p>
                        <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                            {t.blogPreview.title}
                        </h2>
                    </div>
                    <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
                        {t.blogPreview.viewAll}
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {latest3.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
