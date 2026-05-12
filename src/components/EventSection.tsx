"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ArrowUpRight, CalendarOff } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function EventSection({ events = [] }: { events?: any[] }) {
    const t = useTranslations('events');
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

    const mainEvents = events.slice(0, 2);
    const carouselEvents = events.slice(2);

    if (events.length === 0) return <EmptyState t={t} />;

    return (
        <section className="py-24 bg-card/50 border-y border-border">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 italic">/agenda</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">{t('title')}</h2>
                    </div>
                    <Link href="/events" className="hidden md:flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest group">
                        <span>{t('view_all')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grille des 2 premiers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {mainEvents.map((event, i) => <EventCard key={event.id} event={event} index={i} t={t} />)}
                </div>

                {/* Carrousel pour les restants */}
                {carouselEvents.length > 0 && (
                    <div className="relative">
                        <h3 className="text-xl font-bold mb-8">{t('more_events')}</h3>
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex gap-6">
                                {carouselEvents.map((event) => (
                                    <div key={event.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%]">
                                        <EventCard event={event} index={0} t={t} isSmall />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function EventCard({ event, t, isSmall = false }: { event: any, index: number, t: any, isSmall?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-primary"
        >
            <div className={`aspect-video relative overflow-hidden`}>
                <Image src={event.image} alt={event.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground font-black text-[10px] uppercase">
                    {t('category')}
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-[10px] font-mono text-muted-foreground uppercase">
                    <span className="flex items-center text-primary"><Calendar className="w-3 h-3 mr-1" />{event.date}</span>
                </div>
                <h3 className={`font-bold text-foreground mb-4 ${isSmall ? 'text-lg' : 'text-2xl'}`}>{event.title}</h3>
                <Link href={`/events/${event.id}` as any} className="inline-flex items-center space-x-2 text-[10px] font-black uppercase text-foreground hover:text-primary transition-colors">
                    <span>{t('register')}</span> <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>
        </motion.div>
    );
}

function EmptyState({ t }: { t: any }) {
    return (
        <section className="py-24 text-center">
            <CalendarOff className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold">{t('no_events')}</h3>
            <p className="text-muted-foreground mt-2">{t('check_back')}</p>
        </section>
    );
}