"use client";

import { Code2, HeartHandshake, Rocket, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle, TiltCard } from "@/shared/ui";
import { useTranslations } from "@/shared/i18n";

const valueIcons = [Code2, Users, HeartHandshake, Rocket];
const valueColors = [
    "text-primary bg-primary/10",
    "text-secondary bg-secondary/10",
    "text-accent bg-accent/10",
    "text-primary bg-primary/10",
];

export function AboutView() {
    const t = useTranslations();

    return (
        <main className="flex-1">
            <section className="px-6 pt-40 pb-20 sm:pt-48">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        {t.about.eyebrow}
                    </p>
                    <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
                        {t.about.title}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground text-balance">
                        {t.about.intro}
                    </p>
                </div>
            </section>

            <section className="border-t border-border px-6 py-20">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t.about.whyTitle}</h2>
                    <p className="mt-5 text-lg text-muted-foreground">{t.about.whyText}</p>
                </div>
            </section>

            <section className="border-t border-border px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {t.about.valuesTitle}
                        </h2>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {t.about.values.map((value, i) => {
                            const Icon = valueIcons[i];
                            return (
                                <TiltCard key={value.title} strength={5}>
                                    <Card className="h-full border-border/80 transition-shadow hover:shadow-lg">
                                        <CardContent className="pt-6">
                                            <span
                                                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${valueColors[i]}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <CardTitle className="mt-4 text-base">{value.title}</CardTitle>
                                            <CardDescription className="mt-2">
                                                {value.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </TiltCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-t border-border px-6 py-20">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
                        {t.about.milestonesTitle}
                    </h2>
                    <ol className="mt-12 space-y-8 border-l border-border pl-8">
                        {t.about.milestones.map((milestone) => (
                            <li key={milestone.year} className="relative">
                                <span className="absolute top-1.5 -left-9.25 h-2.5 w-2.5 rounded-full bg-primary" />
                                <p className="font-mono text-sm text-primary">{milestone.year}</p>
                                <p className="mt-1 text-lg">{milestone.title}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </main>
    );
}
