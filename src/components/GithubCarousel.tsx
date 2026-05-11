"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { ContributorCard } from './ContributorCard';
import Autoplay from 'embla-carousel-autoplay';

export function GithubCarousel({ contributors }: { contributors: any[] }) {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            dragFree: true,
            slidesToScroll: 1
        }, [
        Autoplay({
            delay: 2000,
            stopOnInteraction: false, // Continue de tourner même après un clic
            stopOnMouseEnter: true    // S'arrête quand on survole avec la souris
        })
    ]
    );

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
                {contributors.map((user, i) => (
                    <div
                        key={`${user.login}-${i}`}
                        className="flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_16.66%]"
                    >
                        <ContributorCard
                            user={user}
                            index={i}
                            tProfile="Profile"
                        />
                        <div className="mt-2 text-center text-xs font-mono text-primary">
                            {user.totalContributions} contributions
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}