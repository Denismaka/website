"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Send, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function EventsPage() {
    const t = useTranslations('events_page');

    // Mock données (à remplacer par une API plus tard)
    const events = [
        { id: 1, title: 'DevConf Congo 2026', date: '15 Juin 2026', location: 'Kinshasa', attendees: '300+', image: 'https://images.unsplash.com/photo-1540575861501-7ad05823c95b', category: 'Conference' },
    ];

    return (
        <div className="pt-20 pb-32 bg-background min-h-screen">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
                    <div className="font-mono text-[10px] font-bold text-primary mb-4 italic uppercase tracking-[0.3em]">&lt;upcoming_events&gt;</div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{t('title')}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">{t('subtitle')}</p>
                </motion.div>

                {/* Grille d'événements */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary transition-all"
                        >
                            <Link href={`/events/${event.id}` as any}>
                                <div className="aspect-video relative overflow-hidden">
                                    <Image src={event.image} alt={event.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest">
                                        {event.category}
                                    </div>
                                </div>
                            </Link>
                            <div className="p-8">
                                <div className="flex items-center space-x-4 mb-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                    <span className="flex items-center text-primary"><Calendar className="w-3 h-3 mr-1" />{event.date}</span>
                                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{event.location.split(',')[0]}</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                                    {event.title}
                                </h3>

                                <div className="flex items-center text-muted-foreground text-xs mb-8">
                                    <Users className="w-4 h-4 mr-2" />
                                    <span>{event.attendees} participants</span>
                                </div>

                                <Link href={`/events/${event.id}` as any} className="w-full px-6 py-4 rounded-xl border border-border bg-background text-foreground font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center space-x-2">
                                    <span>{t('register')}</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick Registration */}
            <section className="mt-32 bg-card/50 py-32 border-y border-border">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="font-mono text-[10px] font-bold text-primary mb-6 italic lowercase tracking-[0.3em]">&lt;quick_register&gt;</div>
                        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter text-foreground">
                            {t('quick_reg_title')}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('quick_reg_desc')}
                        </p>
                    </div>

                    <div className="p-8 md:p-10 rounded-2xl bg-background border border-border shadow-2xl relative">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label={t('form_name')} placeholder="Jean" />
                                <InputField label={t('form_email')} placeholder="jean@dev.cd" type="email" />
                            </div>
                            <InputField label={t('form_msg')} placeholder="..." isTextarea />
                            <button type="submit" className="w-full py-5 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all flex items-center justify-center space-x-3">
                                <span>{t('submit')}</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

function InputField({ label, placeholder, type = "text", isTextarea = false }: any) {
    const className = "w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary outline-none transition-all text-foreground text-sm";
    return (
        <div className="space-y-2">
            <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{label}</label>
            {isTextarea ? <textarea className={className} rows={3} placeholder={placeholder} /> : <input type={type} className={className} placeholder={placeholder} />}
        </div>
    );
}