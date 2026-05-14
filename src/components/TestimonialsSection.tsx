"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
    const t = useTranslations('testimonials');

    // Dans un cas réel, ces données viendraient d'une BDD ou d'un CMS
    const testimonials = [
        { name: "John Doe", role: "Fullstack Dev", quote: "CDC changed my career path completely." },
        { name: "Sarah K.", role: "UI/UX Designer", quote: "The most active community in DRC!" },
        { name: "Jean M.", role: "Mobile Dev", quote: "Incredible networking opportunities here." }
    ];

    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="mb-16">
                    <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 italic">/testimonials</div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">{t('title')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all group"
                        >
                            <Quote className="w-8 h-8 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />
                            <p className="text-foreground italic mb-8 leading-relaxed">"{item.quote}"</p>
                            <div className="flex items-center gap-4 border-t border-border pt-6">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}