"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/shared/lib";

/**
 * A soft radial glow that follows the cursor across the whole page, like a
 * flashlight over the background — CSS-driven, JS only updates two custom
 * properties (rAF-throttled), never re-renders React.
 */
export function CursorSpotlight() {
    const ref = useRef<HTMLDivElement>(null);
    const reducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const el = ref.current;
        if (!el) return;

        let raf = 0;
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 3;

        function paint() {
            el!.style.setProperty("--spot-x", `${x}px`);
            el!.style.setProperty("--spot-y", `${y}px`);
            raf = 0;
        }
        function onMove(e: MouseEvent) {
            x = e.clientX;
            y = e.clientY;
            if (!raf) raf = requestAnimationFrame(paint);
        }
        function onEnter() {
            el!.style.setProperty("--spot-opacity", "1");
        }
        function onLeave() {
            el!.style.setProperty("--spot-opacity", "0");
        }

        window.addEventListener("mousemove", onMove);
        document.documentElement.addEventListener("mouseenter", onEnter);
        document.documentElement.addEventListener("mouseleave", onLeave);
        return () => {
            window.removeEventListener("mousemove", onMove);
            document.documentElement.removeEventListener("mouseenter", onEnter);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [reducedMotion]);

    if (reducedMotion) return null;

    return <div ref={ref} aria-hidden className="cursor-spotlight" />;
}
