"use client";

import { motion } from "framer-motion";
import { Target, Eye, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("about");

    const values = [
        { icon: <Target className="w-8 h-8 text-primary" />, title: t('val1_title'), desc: t('val1_desc') },
        { icon: <Eye className="w-8 h-8 text-primary" />, title: t('val2_title'), desc: t('val2_desc') },
        { icon: <Award className="w-8 h-8 text-primary" />, title: t('val3_title'), desc: t('val3_desc') }
    ];

    return (
        <div className="pt-20 pb-32">
            {/* Manifesto Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="font-mono text-[10px] font-bold text-primary mb-4 italic lowercase tracking-[0.3em]">&lt;{t('manifesto')}&gt;</div>
                        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                            {t('title_1')} <br /><span className="text-primary">{t('title_2')}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                            {t('desc')}
                        </p>
                        <div className="p-8 border-l-2 border-primary bg-card/50 font-mono text-sm text-foreground italic leading-relaxed">
                            &quot;{t('quote')}&quot;
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-border shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000"
                                alt="Community"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 px-10 py-6 bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.3em] rotate-3 shadow-2xl">
                            {t('founded')}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-card/30 py-32 px-4 border-y border-border">
                <div className="max-w-screen-2xl mx-auto text-center mb-20">
                    <div className="font-mono text-[10px] font-bold text-primary mb-4 uppercase tracking-[0.3em]">{t('principles')}</div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">{t('principles_title')}</h2>
                </div>

                <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-12 rounded-2xl bg-background border border-border hover:border-primary transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                {v.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">{v.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}