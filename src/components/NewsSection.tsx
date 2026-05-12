"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const recentNews =[
  { id: 1, title: 'Lancement de notre programme de mentorat 2026', date: '12 Avr 2026', tag: 'Annonce', excerpt: 'Nous sommes fiers d\'ouvrir les candidatures pour la nouvelle cohorte.' },
  { id: 2, title: 'Retour sur le Hackathon "Tech for Congo"', date: '5 Mar 2026', tag: 'Événement', excerpt: 'Découvrez les projets gagnants de notre dernier hackathon.' },
  { id: 3, title: 'Guide: Déployer une API GraphQL', date: '28 Fév 2026', tag: 'Tutoriel', excerpt: 'Un pas-à-pas détaillé pour mettre en place votre architecture serverless.' }
];

export default function NewsSection() {
  const t = useTranslations('news');

  return (
    <section className="py-24 bg-background border-t border-border transition-colors duration-500">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 italic">/insights</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">{t('title')}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col p-8 bg-card border border-border rounded-xl hover:border-primary transition-all h-full"
            >
              <div className="mb-8">
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{news.date}</div>
                <div className="font-mono text-[9px] text-primary uppercase tracking-widest mt-2 px-3 py-1 border border-primary/30 inline-block rounded bg-primary/5">
                    {t('tag')}
                </div>
              </div>
              
              <div className="grow">
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{news.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{news.excerpt}</p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <Link href="/blog" className="inline-flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  <span>{t('read')}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

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