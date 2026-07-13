import { create } from "zustand";

interface MobileMenuState {
    open: boolean;
    toggle: () => void;
    close: () => void;
}

/** UI-only state (is the mobile nav panel open) — Zustand, not TanStack Query. */
export const useMobileMenuStore = create<MobileMenuState>((set) => ({
    open: false,
    toggle: () => set((s) => ({ open: !s.open })),
    close: () => set({ open: false }),
}));
