"use client";

import { motion } from 'framer-motion';
import { FloatingClouds } from './FloatingClouds';

interface PageHeroProps {
    badge: string;
    title: string;
    description: string;
}

export default function PageHero({ badge, title, description }: PageHeroProps) {
    return (
        <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center py-20 overflow-hidden bg-background transition-colors duration-500">

            {/* Background Glows (plus large pour couvrir tout l'écran) */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />

            <FloatingClouds />

            {/* Conteneur principal : on enlève max-w-screen-2xl pour permettre au contenu de respirer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full px-4 sm:px-8 text-center"
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 mb-8 backdrop-blur-sm">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary italic">
                        &lt;{badge}&gt;
                    </span>
                </div>

                {/* Titre : très large */}
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter text-foreground font-display max-w-5xl mx-auto">
                    {title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                    {description}
                </p>
            </motion.div>
        </section>
    );
}