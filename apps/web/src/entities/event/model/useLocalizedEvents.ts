"use client";

import { useLocaleStore } from "@/shared/i18n";
import { eventsSeed } from "./events.seed";
import { eventsSeedEn } from "./events.seed.en";

/** Locale-aware seed data, until a real backend serves translated events. */
export function useLocalizedEvents() {
    const locale = useLocaleStore((s) => s.locale);
    return locale === "en" ? eventsSeedEn : eventsSeed;
}
