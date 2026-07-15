"use client";

import { useLocaleStore } from "@/shared/i18n";
import { postsSeed } from "./posts.seed";
import { postsSeedEn } from "./posts.seed.en";

/** Locale-aware seed data, until a real backend/CMS serves translated posts. */
export function useLocalizedPosts() {
    const locale = useLocaleStore((s) => s.locale);
    return locale === "en" ? postsSeedEn : postsSeed;
}
