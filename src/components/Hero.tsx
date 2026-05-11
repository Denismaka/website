"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

// Création d'un composant Nuage SVG réutilisable et paramétrable
// Ce SVG crée une forme de nuage très douce, similaire à vos images.
const CloudSVG = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.1 0-.2 0-.3.1C16.4 7.2 13.9 5 11 5 7.7 5 5 7.7 5 11c0 .2 0 .5.1.7C2.8 12.1 1 14.3 1 17c0 3.3 2.7 6 6 6h10.5z" />
    </svg>
);

const technologies = [
    'TypeScript', 'React', 'Next.js', 'Tailwind', 'Redux',
    'Node.js', 'Python', 'Go', 'Framer Motion', 'PostgreSQL',
    'Docker', 'Kubernetes', 'Firebase', 'GraphQL'
];

export default function Hero() {
    const t = useTranslations('hero');

    return (
        <section className="relative min-h-[90vh] flex items-center pt-16 pb-12 overflow-hidden border-b border-border transition-colors duration-500">

            {/* --- BACKGROUND LAYER (Glows & Nuages) --- */}
            {/* Fond avec léger dégradé pour la profondeur */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_80%)] pointer-events-none" />

            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Glows de fond (Halo vert) */}
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-primary/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 blur-[120px] rounded-full" />

                {/* --- ANIMATIONS DES NUAGES --- */}
                {/* Effet de profondeur (Parallaxe) grâce aux tailles, flous et vitesses différentes */}

                {/* Nuage 1 : Gros, en arrière-plan (Légèrement flou) */}
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[5%] w-100 text-white/40 dark:text-white/5 blur-sm drop-shadow-2xl"
                >
                    <CloudSVG className="w-full h-auto" />
                </motion.div>

                {/* Nuage 2 : Net, au centre-droit, belle ombre portée (Style Image 2) */}
                <motion.div
                    animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[20%] right-[5%] w-87.5 text-white dark:text-[#111111] drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_30px_rgba(16,185,129,0.1)]"
                >
                    <CloudSVG className="w-full h-auto" />
                </motion.div>

                {/* Nuage 3 : Petit, en bas à gauche */}
                <motion.div
                    animate={{ y: [0, -15, 0], x: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[15%] left-[25%] w-50 text-white/80 dark:text-white/10 drop-shadow-xl"
                >
                    <CloudSVG className="w-full h-auto" />
                </motion.div>

                {/* Nuage 4 : Très lointain, en bas à droite */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-[25%] right-[20%] w-37.5 text-white/30 dark:text-primary/5 blur-[2px]"
                >
                    <CloudSVG className="w-full h-auto" />
                </motion.div>
            </div>

            {/* --- CONTENT LAYER (Textes & Boutons) --- */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-8"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 mb-8 bg-background/80 dark:bg-primary/10 border border-primary/20 px-4 py-2 rounded-full backdrop-blur-md shadow-sm">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-primary font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">
                                {t('badge')}
                            </span>
                        </div>

                        {/* Titre */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-[0.9] text-foreground font-display">
                            <span className="block pb-2">{t('title_1')}</span>
                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">
                                {t('title_2')}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-semibold">
                            {t('description')}
                        </p>

                        {/* Boutons d'action */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link
                                href={"/join" as any}
                                className="w-full sm:w-auto px-10 py-5 rounded bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all shadow-[0_20px_40px_-15px_rgba(16,185,129,0.4)] flex items-center justify-center space-x-3 group"
                            >
                                <span>{t('cta_join')}</span>
                                <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>

                            <Link
                                href={"/events" as any}
                                className="w-full sm:w-auto px-10 py-5 rounded border border-border bg-background/50 backdrop-blur-md text-foreground font-black uppercase tracking-[0.2em] text-xs hover:border-primary hover:text-primary transition-all flex items-center justify-center shadow-sm"
                            >
                                {t('cta_actions')}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Tech Stack flottant */}
                    {/* Tech Stack Carousel */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-4 hidden lg:flex flex-col items-end"
                    >
                        {/* Conteneur masquant le débordement pour créer l'effet de défilement */}
                        <div className="h-100 w-full overflow-hidden relative border-r-2 border-primary/20">
                            <motion.div
                                className="flex flex-col gap-8 pr-6"
                                animate={{ y: ["0%", "-50%"] }} // Défilement infini
                                transition={{
                                    duration: 25, // Vitesse du défilement
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                            >
                                {/* On duplique la liste pour la continuité du défilement */}
                                {[...technologies, ...technologies].map((tech, i) => (
                                    <div
                                        key={`${tech}-${i}`}
                                        className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-default font-bold text-right whitespace-nowrap"
                                    >
                                        {tech}
                                    </div>
                                ))}
                            </motion.div>

                            {/* Effet de fondu en haut et en bas pour une finition propre */}
                            {/* <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-background to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" /> */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}