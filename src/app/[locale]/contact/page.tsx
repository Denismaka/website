"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('contact');

    return (
        <div className="pt-20 pb-32 bg-background transition-colors duration-500">
            <div className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                    {/* Infos de Contact */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="font-mono text-[10px] font-bold text-primary mb-4 italic lowercase tracking-[0.3em]">&lt;{t('badge')}&gt;</div>
                        <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter text-foreground">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-16 leading-relaxed font-medium">
                            {t('desc')}
                        </p>

                        <div className="space-y-12">
                            <ContactInfo icon={Mail} label={t('email')} val="contact@congodevclub.com" />
                            <ContactInfo icon={MapPin} label={t('location')} val="Kinshasa, RD Congo" />
                        </div>
                    </motion.div>

                    {/* Formulaire */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-10 rounded-2xl bg-card border border-border shadow-2xl"
                    >
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label={t('name')} placeholder="Jean Dupont" />
                                <InputField label={t('email_field')} placeholder="jean@example.com" type="email" />
                            </div>
                            <InputField label={t('subject')} placeholder="Collaboration, Adhésion..." />
                            <InputField label={t('message')} placeholder="Votre message ici..." isTextarea />

                            <button type="submit" className="w-full py-5 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all flex items-center justify-center space-x-3">
                                <span>{t('submit')}</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Composants réutilisables (pour rester DRY)
function ContactInfo({ icon: Icon, label, val }: any) {
    return (
        <div className="flex items-start space-x-6">
            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 text-primary">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <div className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{label}</div>
                <div className="text-lg text-foreground font-semibold">{val}</div>
            </div>
        </div>
    );
}

function InputField({ label, placeholder, type = "text", isTextarea = false }: any) {
    const className = "w-full px-5 py-4 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all text-foreground text-sm font-medium";
    return (
        <div className="space-y-3">
            <label className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{label}</label>
            {isTextarea ? <textarea className={className} rows={5} placeholder={placeholder} /> : <input type={type} className={className} placeholder={placeholder} />}
        </div>
    );
}