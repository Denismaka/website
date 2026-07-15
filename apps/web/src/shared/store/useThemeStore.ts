import { create } from "zustand";

export type Theme = "light" | "dark";

interface ThemeState {
    /** Explicit user override. `null` means "follow the OS preference". */
    theme: Theme | null;
    setTheme: (theme: Theme) => void;
}

/**
 * UI-only state — not server data, so it belongs in Zustand rather than
 * TanStack Query. Applying the value to `<html data-theme>` is left to the
 * consumer (see Navbar) so this store stays framework-agnostic.
 */
export const useThemeStore = create<ThemeState>((set) => ({
    theme: null,
    setTheme: (theme) => set({ theme }),
}));
