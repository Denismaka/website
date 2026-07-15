"use client";

import { GraduationCap, Trophy, Users, HeartHandshake, GitBranch } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle, TiltCard, buttonVariants } from "@/shared/ui";
import { useTranslations } from "@/shared/i18n";

const programIcons = [GraduationCap, Trophy, Users, HeartHandshake, GitBranch];
const programColors = [
    "text-primary bg-primary/10",
    "text-accent bg-accent/10",
    "text-secondary bg-secondary/10",
    "text-primary bg-primary/10",
    "text-accent bg-accent/10",
];

export function ActivitiesView() {
    const t = useTranslations();

    return (
        <main className="flex-1">
            <section className="px-6 pt-40 pb-16 sm:pt-48">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        {t.activities.eyebrow}
                    </p>
                    <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
                        {t.activities.title}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground text-balance">
                        {t.activities.subtitle}
                    </p>
                </div>
            </section>

            <section className="px-6 pb-20">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {t.activities.programs.map((program, i) => {
                            const Icon = programIcons[i];
                            return (
                                <TiltCard key={program.title} strength={5}>
                                    <Card className="h-full border-border/80 transition-shadow hover:shadow-lg">
                                        <CardContent className="flex h-full flex-col pt-6">
                                            <span
                                                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${programColors[i]}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <CardTitle className="mt-4 text-base">{program.title}</CardTitle>
                                            <CardDescription className="mt-2 flex-1">
                                                {program.description}
                                            </CardDescription>
                                            <dl className="mt-5 space-y-1 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
                                                <div className="flex justify-between gap-2">
                                                    <dt>{t.activities.cadenceLabel}</dt>
                                                    <dd>{program.cadence}</dd>
                                                </div>
                                                <div className="flex justify-between gap-2">
                                                    <dt>{t.activities.audienceLabel}</dt>
                                                    <dd>{program.audience}</dd>
                                                </div>
                                            </dl>
                                        </CardContent>
                                    </Card>
                                </TiltCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-t border-border px-6 py-20">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
                        {t.activities.howToJoinTitle}
                    </h2>
                    <ol className="mt-12 space-y-10">
                        {t.activities.steps.map((step, i) => (
                            <li key={step.title} className="flex gap-5">
                                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">
                                    {i + 1}
                                </span>
                                <div>
                                    <p className="text-lg font-semibold">{step.title}</p>
                                    <p className="mt-1 text-muted-foreground">{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-12 text-center">
                        <a href="#" className={buttonVariants({ size: "lg" })}>
                            {t.activities.ctaJoin}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
