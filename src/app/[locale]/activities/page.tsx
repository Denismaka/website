"use client";

import { motion } from 'framer-motion';
import { Terminal, Lightbulb, Cpu, Globe, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';

export default function ActivitiesPage() {
    const t = useTranslations('activities');

    const programs = [
        { title: t('programs.0.title'), desc: t('programs.0.desc'), icon: <Terminal /> },
        { title: t('programs.1.title'), desc: t('programs.1.desc'), icon: <Lightbulb /> },
        { title: t('programs.2.title'), desc: t('programs.2.desc'), icon: <Cpu /> },
        { title: t('programs.3.title'), desc: t('programs.3.desc'), icon: <Globe /> }
    ];

    return (
        <div className="pb-32">
            {/* Hero Section Activités */}
            <PageHero
                badge={t('badge')}
                title={t('title')}
                description={t('subtitle')}
            />
            <section className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
                {/* Grille Premium */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {programs.map((program, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-100 rounded-3xl overflow-hidden border border-border bg-card hover:border-primary transition-all duration-500"
                        >
                            {/* Effet de fond lumineux au survol */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative h-full p-10 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="p-4 rounded-2xl bg-background border border-border group-hover:border-primary text-primary transition-colors">
                                        {program.icon}
                                    </div>
                                    <div className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase opacity-50">0{i + 1}</div>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold mb-4 tracking-tight text-foreground group-hover:text-primary transition-colors">
                                        {program.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                                        {program.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Indicateur "En savoir plus" */}
                            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                <div className="font-mono text-primary text-xs flex items-center space-x-2 font-bold uppercase tracking-widest">
                                    <span>{t('learn_more')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}