"use client";

import { Calendar, MapPin } from "lucide-react";
import { EventCard, useLocalizedEvents } from "@/entities/event";
import { buttonVariants } from "@/shared/ui";
import { useLocaleStore, useTranslations } from "@/shared/i18n";

export function EventsView() {
    const t = useTranslations();
    const locale = useLocaleStore((s) => s.locale);
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const events = useLocalizedEvents();
    const [featured, ...rest] = events;

    return (
        <main className="flex-1">
            <section className="px-6 pt-40 pb-16 sm:pt-48">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        {t.eventsPage.eyebrow}
                    </p>
                    <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
                        {t.eventsPage.title}
                    </h1>
                </div>
            </section>

            {featured && (
                <section className="px-6 pb-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-primary/5 p-8 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 font-mono text-xs text-primary-foreground">
                                    {t.eventsPage.nextEventBadge}
                                </span>
                                <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
                                    {featured.title}
                                </h2>
                                <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {formatter.format(new Date(featured.date))}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {featured.location}
                                    </span>
                                </div>
                            </div>
                            <a href="#" className={buttonVariants({ size: "lg" })}>
                                {t.eventsPage.register}
                            </a>
                        </div>
                    </div>
                </section>
            )}

            <section className="border-t border-border px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-2xl font-extrabold tracking-tight">{t.eventsPage.upcomingTitle}</h2>
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
