"use client";

import { useState } from "react";
import type { Post, PostCategory } from "@cdc/types";
import { PostCard } from "@/entities/post";
import { cn } from "@/shared/ui";
import { useTranslations } from "@/shared/i18n";

const categoryKeys: PostCategory[] = ["tutorials", "news", "recaps", "community"];

export function BlogGrid({ posts }: { posts: Post[] }) {
    const t = useTranslations();
    const [active, setActive] = useState<PostCategory | "all">("all");
    const filtered = active === "all" ? posts : posts.filter((post) => post.category === active);

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-2">
                {(["all", ...categoryKeys] as const).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActive(key)}
                        className={cn(
                            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                            active === key
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {t.blogPage.categories[key]}
                    </button>
                ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
