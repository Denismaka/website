"use client";

import { useEffect, useRef, useState } from "react";

const COMMAND = "npx join-congo-developer-club";
const RESULTS = [
    "10 234 développeurs",
    "267 projets actifs",
    "42 événements organisés",
];

export function TerminalPanel() {
    const [typed, setTyped] = useState(0);
    const [revealedResults, setRevealedResults] = useState(0);
    const [done, setDone] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const timers: ReturnType<typeof setTimeout>[] = [];

        if (reduced) {
            timers.push(
                setTimeout(() => {
                    setTyped(COMMAND.length);
                    setRevealedResults(RESULTS.length);
                    setDone(true);
                }, 0),
            );
            return () => timers.forEach(clearTimeout);
        }

        for (let i = 1; i <= COMMAND.length; i++) {
            timers.push(setTimeout(() => setTyped(i), 500 + i * 35));
        }
        const typingEnd = 500 + COMMAND.length * 35;
        RESULTS.forEach((_, i) => {
            timers.push(
                setTimeout(
                    () => setRevealedResults(i + 1),
                    typingEnd + 350 + i * 260,
                ),
            );
        });
        timers.push(
            setTimeout(
                () => setDone(true),
                typingEnd + 350 + RESULTS.length * 260,
            ),
        );

        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        const wrap = wrapRef.current;
        const card = cardRef.current;
        if (!wrap || !card) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        function onMove(e: MouseEvent) {
            const rect = wrap!.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            card!.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
        }
        function onLeave() {
            card!.style.transform =
                "perspective(900px) rotateY(0deg) rotateX(0deg)";
        }
        wrap.addEventListener("mousemove", onMove);
        wrap.addEventListener("mouseleave", onLeave);
        return () => {
            wrap.removeEventListener("mousemove", onMove);
            wrap.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div ref={wrapRef} className="relative w-full max-w-2xl">
            <div
                aria-hidden
                className="absolute -inset-14 -z-10 rounded-full opacity-60 blur-3xl"
                style={{
                    background:
                        "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 35%, transparent), color-mix(in srgb, var(--accent) 25%, transparent) 70%, transparent)",
                }}
            />
            <div
                ref={cardRef}
                className="overflow-hidden rounded-2xl border border-white/15 bg-[#141a21] shadow-2xl transition-transform duration-150 ease-out will-change-transform"
            >
                <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    <span className="h-3 w-3 rounded-full bg-secondary" />
                    <span className="h-3 w-3 rounded-full bg-accent" />
                    <span className="ml-3 font-mono text-sm text-white/40">
                        cdc.sh
                    </span>
                </div>
                <div className="min-h-56 space-y-4 px-8 py-10 font-mono text-lg">
                    <p className="text-white">
                        <span className="text-secondary">$</span>{" "}
                        {COMMAND.slice(0, typed)}
                        {!done && (
                            <span className="animate-pulse text-white/60">
                                ▊
                            </span>
                        )}
                    </p>
                    {RESULTS.slice(0, revealedResults).map((line) => (
                        <p
                            key={line}
                            className="text-white/70 animate-terminal-line"
                        >
                            <span className="text-secondary">✓</span> {line}
                        </p>
                    ))}
                    {done && (
                        <p className="text-white">
                            <span className="text-secondary">$</span>{" "}
                            <span className="animate-pulse text-white/60 motion-reduce:animate-none">
                                ▊
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
