"use client";

import { Calendar, MapPin } from "lucide-react";
import type { CommunityEvent } from "@cdc/types";
import { Card, CardContent, CardDescription, CardTitle, TiltCard, buttonVariants } from "@/shared/ui";
import { useLocaleStore, useTranslations } from "@/shared/i18n";

export function EventCard({ event }: { event: CommunityEvent }) {
    const t = useTranslations();
    const locale = useLocaleStore((s) => s.locale);
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <TiltCard strength={4}>
            <Card className="h-full border-border/80 transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col pt-6">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="mt-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatter.format(new Date(event.date))}
                    </CardDescription>
                    <CardDescription className="mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                    </CardDescription>
                    <a href="#" className={`${buttonVariants({ size: "sm" })} mt-6 self-start`}>
                        {t.eventsPage.register}
                    </a>
                </CardContent>
            </Card>
        </TiltCard>
    );
}
