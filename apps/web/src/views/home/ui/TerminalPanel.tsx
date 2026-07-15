"use client";

import { useEffect, useState } from "react";
import { TiltCard } from "@/shared/ui";
import { useTranslations } from "@/shared/i18n";

const COMMAND = "npx join-congo-developer-club";

export function TerminalPanel() {
    const t = useTranslations();
    const RESULTS = t.terminal.results;
    const [typed, setTyped] = useState(0);
    const [revealedResults, setRevealedResults] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        // Replay the typing animation (in the new language) whenever the
        // locale changes, instead of swapping the text mid-animation. The 0ms
        // timeout (rather than a direct call) keeps this an effect callback,
        // not a synchronous render-phase state update.
        timers.push(
            setTimeout(() => {
                setTyped(0);
                setRevealedResults(0);
                setDone(false);
            }, 0),
        );

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduced) {
            timers.push(
                setTimeout(() => {
                    setTyped(COMMAND.length);
                    setRevealedResults(RESULTS.length);
                    setDone(true);
                }, 10),
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
    }, [RESULTS]);

    return (
        <div className="relative w-full max-w-2xl">
            <div
                aria-hidden
                className="absolute -inset-14 -z-10 rounded-full opacity-60 blur-3xl"
                style={{
                    background:
                        "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 35%, transparent), color-mix(in srgb, var(--accent) 25%, transparent) 70%, transparent)",
                }}
            />
            <TiltCard
                strength={8}
                className="overflow-hidden rounded-2xl border border-white/15 bg-[#141a21] shadow-2xl"
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
            </TiltCard>
        </div>
    );
}
