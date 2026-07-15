"use client";

import Link from "next/link";
import { EventCard, useLocalizedEvents } from "@/entities/event";
import { buttonVariants } from "@/shared/ui";
import { useTranslations } from "@/shared/i18n";

export function UpcomingEvents() {
    const t = useTranslations();
    const events = useLocalizedEvents();
    const next3 = events.slice(0, 3);

    return (
        <section className="border-t border-border px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                            {t.upcomingEvents.eyebrow}
                        </p>
                        <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                            {t.upcomingEvents.title}
                        </h2>
                    </div>
                    <Link href="/evenements" className={buttonVariants({ variant: "outline" })}>
                        {t.upcomingEvents.viewAll}
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {next3.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
}
