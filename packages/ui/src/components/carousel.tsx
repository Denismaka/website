"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselContextValue {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: CarouselApi;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    scrollPrev: () => void;
    scrollNext: () => void;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);
    if (!context) throw new Error("Carousel.* must be used within <Carousel>");
    return context;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    opts?: EmblaOptionsType;
    plugins?: EmblaPluginType[];
}

export function Carousel({ opts, plugins, className, children, ...props }: CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(opts, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: NonNullable<CarouselApi>) => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    React.useEffect(() => {
        if (!api) return;
        onSelect(api);
        api.on("select", onSelect);
        api.on("reInit", onSelect);
        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, onSelect]);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    return (
        <CarouselContext.Provider value={{ carouselRef, api, canScrollPrev, canScrollNext, scrollPrev, scrollNext }}>
            <div className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    );
}

export function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { carouselRef } = useCarousel();
    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div className={cn("flex", className)} {...props} />
        </div>
    );
}

export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            role="group"
            aria-roledescription="slide"
            className={cn("min-w-0 shrink-0 grow-0", className)}
            {...props}
        />
    );
}

export function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { scrollPrev, canScrollPrev } = useCarousel();
    return (
        <button
            type="button"
            aria-label="Previous slide"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary disabled:pointer-events-none disabled:opacity-40",
                className
            )}
            {...props}
        >
            <ArrowLeft className="h-4 w-4" />
        </button>
    );
}

export function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { scrollNext, canScrollNext } = useCarousel();
    return (
        <button
            type="button"
            aria-label="Next slide"
            disabled={!canScrollNext}
            onClick={scrollNext}
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary disabled:pointer-events-none disabled:opacity-40",
                className
            )}
            {...props}
        >
            <ArrowRight className="h-4 w-4" />
        </button>
    );
}
