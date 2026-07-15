"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
}
function getSnapshot() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
// The server has no notion of this OS preference, so it must always report
// `false` here — matching that on the client's first paint avoids a
// hydration mismatch (same pattern as the theme toggle).
function getServerSnapshot() {
    return false;
}

export function usePrefersReducedMotion() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
