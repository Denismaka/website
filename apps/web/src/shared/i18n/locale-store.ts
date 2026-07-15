import { create } from "zustand";

export type Locale = "fr" | "en";

interface LocaleState {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

/** UI-only preference (which language to display) — Zustand, not TanStack Query. */
export const useLocaleStore = create<LocaleState>((set) => ({
    locale: "fr",
    setLocale: (locale) => set({ locale }),
}));
