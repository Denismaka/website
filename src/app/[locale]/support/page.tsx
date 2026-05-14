"use client";

import { motion } from 'framer-motion';
import { Building, Users, HandHeart, Coffee, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import { Link } from '@/i18n/routing';

export default function SupportPage() {
  const t = useTranslations('support');

  return (
    <div className="bg-background min-h-screen pb-32">
        <PageHero 
            badge={t('badge')} 
            title={t('title')} 
            description={t('subtitle')} 
        />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-16">
        
        {/* Grille des 3 Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Donate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border p-10 rounded-3xl flex flex-col items-center text-center hover:border-primary transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 font-display">{t('donate_title')}</h3>
            <p className="text-muted-foreground mb-10 grow text-sm leading-relaxed font-medium">
              {t('donate_desc')}
            </p>
            <button className="w-full py-5 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:opacity-90 transition-opacity">
              {t('donate_btn')}
            </button>
          </motion.div>

          {/* Card 2: Sponsor (Mise en avant) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border p-10 rounded-3xl flex flex-col items-center text-center hover:border-primary transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <Building className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10 font-display">{t('sponsor_title')}</h3>
            <p className="text-muted-foreground mb-10 grow relative z-10 text-sm leading-relaxed font-medium">
              {t('sponsor_desc')}
            </p>
            <a href="mailto:contact@congodevclub.com" className="w-full py-5 border border-primary text-primary font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors block relative z-10">
              {t('sponsor_btn')}
            </a>
          </motion.div>

          {/* Card 3: Volunteer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border p-10 rounded-3xl flex flex-col items-center text-center hover:border-primary transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <HandHeart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 font-display">{t('volunteer_title')}</h3>
            <p className="text-muted-foreground mb-10 grow text-sm leading-relaxed font-medium">
              {t('volunteer_desc')}
            </p>
            <Link href={"/join" as any} className="w-full py-5 border border-border text-foreground bg-background font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:border-primary transition-colors block">
              {t('volunteer_btn')}
            </Link>
          </motion.div>
        </div>

        {/* Highlight Banner (Pourquoi nous soutenir) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-0.5 bg-linear-to-r from-primary/50 via-emerald-400/50 to-primary/50 rounded-4xl"
        >
          <div className="bg-card p-10 md:p-16 rounded-[calc(2rem-2px)] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 border border-background">
            <div className="max-w-3xl">
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-6 flex items-center gap-4 font-display">
                <Sparkles className="w-8 h-8 text-primary" />
                {t('why_title')}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {t('why_desc')}
              </p>
            </div>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-card bg-background flex items-center justify-center relative overflow-hidden">
                   <div className="w-full h-full bg-linear-to-br from-primary/20 to-transparent absolute" />
                   <Users className="w-6 h-6 text-primary/60" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}