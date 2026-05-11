"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ImpactSection() {
    const t = useTranslations('impact');

    const stats = [
        { title: t('stat1_title'), desc: t('stat1_desc') },
        { title: t('stat2_title'), desc: t('stat2_desc') },
        { title: t('stat3_title'), desc: t('stat3_desc') },
    ];

    return (
        <section className="py-24 bg-background transition-colors duration-500 border-t border-border">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Texte et Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 italic">
                            &lt;our_impact&gt;
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[0.9] text-foreground">
                            {t('title_part1')} <br />
                            <span className="text-primary">{t('title_part2')}</span>
                        </h2>

                        <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-medium">
                            {t('description')}
                        </p>

                        <div className="space-y-8 pl-6 border-l-2 border-primary/20">
                            {stats.map((stat, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-8.75 w-4 h-4 bg-background border-2 border-primary rounded-full mt-1 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                    <h4 className="text-xl font-bold text-foreground mb-2">{stat.title}</h4>
                                    <p className="text-muted-foreground text-sm">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image et Stat Floating */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-4/5 rounded-3xl overflow-hidden bg-card border border-border shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
                                alt="Hackathon Event"
                                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            />
                        </div>

                        {/* Stat flottant stylisé */}
                        <div className="absolute -bottom-8 -left-8 md:-left-8 p-8 bg-card/80 border border-border rounded-2xl shadow-xl backdrop-blur-xl">
                            <div className="text-5xl font-black text-foreground mb-1">12K+</div>
                            <div className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
                                {t('members_count')}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}