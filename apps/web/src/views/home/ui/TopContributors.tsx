"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useContributors } from "@/entities/member";
import {
    buttonVariants,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui";
import { useLocaleStore, useTranslations } from "@/shared/i18n";
import { usePrefersReducedMotion } from "@/shared/lib";

export function TopContributors() {
    const t = useTranslations();
    const locale = useLocaleStore((s) => s.locale);
    const numberLocale = locale === "fr" ? "fr-FR" : "en-US";
    const reducedMotion = usePrefersReducedMotion();
    const { data: contributors } = useContributors();

    return (
        <section className="border-t border-border px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        {t.contributors.eyebrow}
                    </p>
                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                        {t.contributors.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground text-balance">{t.contributors.subtitle}</p>
                </div>

                <Carousel
                    className="mt-14"
                    opts={{ align: "start", loop: true }}
                    plugins={reducedMotion ? [] : [Autoplay({ delay: 2800, stopOnMouseEnter: true, stopOnInteraction: false })]}
                >
                    <CarouselContent className="-ml-4">
                        {contributors.map((contributor) => (
                            <CarouselItem
                                key={contributor.handle}
                                className="basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/5"
                            >
                                <a
                                    href={`https://github.com/${contributor.handle}`}
                                    target="_blank"
                                    rel="noopener"
                                    className="flex h-full flex-col items-center gap-3 rounded-xl border border-border/80 p-5 text-center transition-colors hover:border-primary"
                                >
                                    <Image
                                        src={`https://github.com/${contributor.handle}.png`}
                                        alt={contributor.handle}
                                        width={56}
                                        height={56}
                                        className="rounded-full"
                                        draggable={false}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">@{contributor.handle}</p>
                                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                                            {contributor.contributions !== null
                                                ? `${contributor.contributions.toLocaleString(numberLocale)} ${t.contributors.contributions}`
                                                : t.contributors.maintainer}
                                        </p>
                                    </div>
                                </a>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <CarouselPrevious className="static translate-x-0 translate-y-0" />
                        <CarouselNext className="static translate-x-0 translate-y-0" />
                    </div>
                </Carousel>

                <div className="mt-8 text-center">
                    <a
                        href="https://github.com/orgs/congodevelopersclub/people"
                        target="_blank"
                        rel="noopener"
                        className={buttonVariants({ variant: "outline" })}
                    >
                        {t.contributors.viewAll}
                    </a>
                </div>
            </div>
        </section>
    );
}
