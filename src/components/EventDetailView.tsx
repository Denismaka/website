"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowLeft, Send, CheckCircle, Share2, X, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function EventDetail({ id }: { id: string }) {
    const t = useTranslations('event_detail');
    const [isRegistered, setIsRegistered] = useState(false);

    // Simulation de données (à remplacer par un appel API dans une Server Action)
    const event = {
        title: 'DevConf Congo 2026',
        date: '15 Juin 2026',
        location: 'Kinshasa, Pullman Hotel',
        attendees: '300+',
        image: 'https://images.unsplash.com/photo-1540575861501-7ad05823c95b',
        category: 'Conference',
        description: "La plus grande conférence de développeurs en RDC...",
        speakers: [
            { name: 'Tacite Iragi', role: 'Fullstack Dev', image: 'https://i.pravatar.cc/150?u=tacite' },
            { name: 'Sarah Kalanga', role: 'AI Engineering Lead', image: 'https://i.pravatar.cc/150?u=sarah' }
        ]
    };

    return (
        <div className="pt-32 pb-32 bg-background text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <Link href="/events" className="inline-flex items-center space-x-2 text-primary font-mono text-xs uppercase tracking-widest group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{t('back')}</span>
                </Link>
            </div>

            <article className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Colonne Gauche */}
                    <div className="lg:col-span-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="font-mono text-[10px] text-primary mb-4 italic uppercase tracking-[0.3em]">{event.category}</div>
                            <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">
                                {event.title}
                            </h1>

                            <div className="aspect-video rounded-3xl overflow-hidden mb-12 border border-border">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="prose prose-invert max-w-none mb-16">
                                <h2 className="text-3xl font-bold mb-6 text-foreground">{t('about')}</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">{event.description}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Colonne Droite: Inscription */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 p-8 rounded-2xl bg-card border border-border shadow-2xl">
                            <div className="space-y-6 mb-10">
                                <InfoItem icon={Calendar} label="Date" value={event.date} />
                                <InfoItem icon={MapPin} label="Lieu" value={event.location} />
                                <InfoItem icon={Users} label="Capacité" value={`${event.attendees} Places`} />
                            </div>

                            {isRegistered ? (
                                <SuccessMessage t={t} />
                            ) : (
                                <RegistrationForm t={t} onRegister={() => setIsRegistered(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

// Sous-composants pour alléger le code
function InfoItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-center text-foreground">
            <Icon className="w-5 h-5 mr-4 text-primary" />
            <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
                <div className="font-bold">{value}</div>
            </div>
        </div>
    );
}

function RegistrationForm({ t, onRegister }: any) {
    const fields = [
        { key: 'name' },
        { key: 'email' }
    ];

    return (
        <form onSubmit={(e) => { e.preventDefault(); onRegister(); }} className="space-y-6">
            <h3 className="text-xl font-bold mb-6">{t('register_title')}</h3>
            {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                    <label
                        className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                    >
                        {t(field.key)}
                    </label>
                    <input
                        required
                        type={field.key === 'email' ? 'email' : 'text'}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none text-foreground text-sm"
                    />
                </div>
            ))}
            <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-all">
                {t('submit')}
            </button>
        </form>
    );
}

function SuccessMessage({ t }: { t: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center"
        >
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-foreground mb-2">{t('success_title')}</h4>
            <p className="text-sm text-muted-foreground">{t('success_desc')}</p>
        </motion.div>
    );
}