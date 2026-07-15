"use client";

import { Sparkles, GraduationCap, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle, TiltCard } from "@/shared/ui";
import { useTranslations } from "@/shared/i18n";

const icons = [Sparkles, GraduationCap, Star];
const colors = ["text-primary bg-primary/10", "text-secondary bg-secondary/10", "text-accent bg-accent/10"];

export function Impact() {
    const t = useTranslations();

    return (
        <section className="border-t border-border px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        {t.impact.eyebrow}
                    </p>
                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                        {t.impact.title}
                    </h2>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {t.impact.items.map((item, i) => {
                        const Icon = icons[i];
                        return (
                            <TiltCard key={item.title} strength={5}>
                                <Card className="h-full border-border/80 transition-shadow hover:shadow-lg">
                                    <CardContent className="pt-6">
                                        <span
                                            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors[i]}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <p className="mt-4 font-mono text-2xl font-bold">{item.metric}</p>
                                        <CardTitle className="mt-1 text-base">{item.title}</CardTitle>
                                        <CardDescription className="mt-2">{item.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </TiltCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
