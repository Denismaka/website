"use client";

import { useLocaleStore } from "./locale-store";
import { dictionaries } from "./dictionaries";

/** Returns the full dictionary for the currently selected locale. */
export function useTranslations() {
    const locale = useLocaleStore((s) => s.locale);
    return dictionaries[locale];
}
