"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

const recentNews = [
    {
        id: 1,
        title: 'Ouverture des candidatures au programme Dev Leaders 2026',
        date: '14 Jan 2026',
        tag: 'Annonce',
        excerpt: 'Les inscriptions sont désormais ouvertes pour accompagner les jeunes développeurs et entrepreneurs tech de la RDC.'
    },
    {
        id: 2,
        title: 'Retour sur le Hackathon “Build For Africa” à Goma',
        date: '02 Fév 2026',
        tag: 'Événement',
        excerpt: 'Plus de 120 participants ont collaboré pendant 48h pour concevoir des solutions numériques locales innovantes.'
    },
    {
        id: 3,
        title: 'Tutoriel : Déployer une application Next.js avec Docker',
        date: '18 Fév 2026',
        tag: 'Tutoriel',
        excerpt: 'Découvrez comment containeriser et déployer rapidement vos applications web modernes en production.'
    },
    {
        id: 4,
        title: 'Lancement de notre communauté Open Source RDC',
        date: '05 Mar 2026',
        tag: 'Communauté',
        excerpt: 'Une nouvelle initiative pour connecter les développeurs passionnés d’open source à travers le pays.'
    },
    {
        id: 5,
        title: 'Top 5 des technologies à apprendre en 2026',
        date: '16 Mar 2026',
        tag: 'Article',
        excerpt: 'IA, cybersécurité, cloud, mobile et data engineering figurent parmi les compétences les plus recherchées.'
    },
    {
        id: 6,
        title: 'Workshop gratuit : Initiation à l’Intelligence Artificielle',
        date: '28 Mar 2026',
        tag: 'Formation',
        excerpt: 'Une session pratique dédiée aux étudiants et développeurs souhaitant découvrir les bases du machine learning.'
    },
    {
        id: 7,
        title: 'Retour en images sur la conférence Congo Tech Summit',
        date: '09 Avr 2026',
        tag: 'Événement',
        excerpt: 'Revivez les meilleurs moments, interventions et échanges de la plus grande conférence tech locale.'
    },
    {
        id: 8,
        title: 'Guide complet : Créer une API sécurisée avec Node.js',
        date: '21 Avr 2026',
        tag: 'Tutoriel',
        excerpt: 'Authentification JWT, validation des données et bonnes pratiques backend expliquées étape par étape.'
    },
    {
        id: 9,
        title: 'Notre plateforme atteint les 10 000 membres',
        date: '30 Avr 2026',
        tag: 'Annonce',
        excerpt: 'Merci à notre communauté grandissante de développeurs, designers et passionnés du numérique.'
    },
    {
        id: 10,
        title: 'Pourquoi les startups africaines misent sur Flutter',
        date: '07 Mai 2026',
        tag: 'Article',
        excerpt: 'Le framework mobile de Google séduit de plus en plus grâce à ses performances et sa rapidité de développement.'
    }
];

export default function NewsSection() {
    const t = useTranslations('news');

    // Pagination
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(recentNews.length / ITEMS_PER_PAGE);

    const paginatedNews = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return recentNews.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage]);

    return (
        <section className="py-24 bg-background border-t border-border transition-colors duration-500">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 italic">
                            /insights
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                            {t('title')}
                        </h2>
                    </div>
                </div>

                {/* NEWS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedNews.map((news, i) => (
                        <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group flex flex-col p-8 bg-card border border-border rounded-xl hover:border-primary transition-all h-full"
                        >
                            <div className="mb-8">
                                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                                    {news.date}
                                </div>

                                <div className="font-mono text-[9px] text-primary uppercase tracking-widest mt-2 px-3 py-1 border border-primary/30 inline-block rounded bg-primary/5">
                                    {news.tag}
                                </div>
                            </div>

                            <div className="grow">
                                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {news.title}
                                </h3>

                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {news.excerpt}
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-border">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                                >
                                    <span>{t('read')}</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex items-center justify-center gap-3 mt-14 flex-wrap">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-11 h-11 flex items-center justify-center rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                        const page = index + 1;

                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-11 h-11 rounded-xl text-sm font-bold transition-all border ${
                                    currentPage === page
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'border-border bg-card hover:border-primary hover:text-primary'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="w-11 h-11 flex items-center justify-center rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* VIEW ALL */}
                <div className="mt-16 text-center">
                    <Link
                        href="/blog"
                        className="px-8 py-4 rounded-xl border border-border bg-card text-foreground font-bold uppercase tracking-[0.2em] text-[10px] hover:text-primary hover:border-primary transition-all inline-block"
                    >
                        {t('view_all')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
