"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function CTASection() {
    const t = useTranslations('cta');
    const [isClicked, setIsClicked] = useState(false);

    // Effet visuel au clic : déclenche une onde qui disparait
    const handleTriggerEffect = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 800);
    };

    return (
        <section className="py-32 bg-background relative overflow-hidden flex items-center justify-center border-t border-border transition-colors duration-500">
            {/* Éléments décoratifs : Glows */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-150 h-150 bg-primary/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                {/* Badge animé */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-block mb-8 px-5 py-2 border border-primary/20 bg-primary/5 rounded-full font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
                >
                    {t('label')}
                </motion.div>

                {/* Titre avec animation de apparition */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter leading-[0.9]"
                >
                    {t('title_1')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">{t('title_2')}</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                >
                    {t('description')}
                </motion.p>

                {/* Bouton avec effet d'onde */}
                <div className="relative flex items-center justify-center">
                    <Link
                        href={"/join" as any}
                        onClick={handleTriggerEffect}
                        className="relative inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] group z-10"
                    >
                        {t('button')}
                        <MoveRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />

                        {/* Effet boule d'ambiance au clic */}
                        <AnimatePresence>
                            {isClicked && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0.8 }}
                                    animate={{ scale: 3, opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 bg-primary rounded-full pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                    </Link>
                </div>
            </div>
        </section>
    );
}