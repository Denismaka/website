"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    MoveRight,
    Sparkles,
    ArrowUpRight,
    ShieldCheck,
    Globe,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const CloudSVG = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.1 0-.2 0-.3.1C16.4 7.2 13.9 5 11 5 7.7 5 5 7.7 5 11c0 .2 0 .5.1.7C2.8 12.1 1 14.3 1 17c0 3.3 2.7 6 6 6h10.5z" />
    </svg>
);

const technologies = [
    'TypeScript',
    'Next.js',
    'React',
    'Node.js',
    'GraphQL',
    'Docker',
    'PostgreSQL',
    'Kubernetes',
    'Framer Motion',
    'Tailwind CSS',
    'Firebase',
    'Python',
];

export default function Hero() {
    const t = useTranslations('hero');

    return (
        <section className="relative min-h-screen overflow-hidden border-b border-border bg-background">
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_45%)]" />

            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            {/* Glow Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[45rem] h-[45rem] bg-primary/20 blur-[140px] rounded-full" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[40rem] h-[40rem] bg-emerald-500/10 blur-[140px] rounded-full" />

            {/* Floating Clouds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-[10%] left-[5%] text-white/50 dark:text-white/[0.03]"
                >
                    <CloudSVG className="w-80 blur-sm" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-[18%] right-[8%] text-white dark:text-white/[0.03]"
                >
                    <CloudSVG className="w-[26rem]" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute bottom-[12%] left-[20%] text-white/40 dark:text-primary/[0.05]"
                >
                    <CloudSVG className="w-60 blur-[1px]" />
                </motion.div>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 max-w-screen-2xl mx-auto px-4 md:px-8 pt-36 pb-24">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-3 mb-8 px-5 py-3 rounded-full border border-primary/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>

                            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-primary">
                                {t('badge')}
                            </span>
                        </div>

                        {/* HEADING */}
                        <div className="space-y-3">
                            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black leading-[0.9] tracking-[-0.06em] text-foreground">
                                <span className="block">
                                    {t('title_1')}
                                </span>

                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-300">
                                    {t('title_2')}
                                </span>
                            </h1>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground font-medium">
                            {t('description')}
                        </p>

                        {/* STATS */}
                        <div className="mt-10 flex flex-wrap gap-5">
                            {[
                                {
                                    label: 'Developers',
                                    value: '10K+',
                                    icon: Globe,
                                },
                                {
                                    label: 'Projects',
                                    value: '250+',
                                    icon: ShieldCheck,
                                },
                                {
                                    label: 'Events',
                                    value: '40+',
                                    icon: Sparkles,
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="group min-w-[140px] rounded-2xl border border-border bg-card/70 backdrop-blur-xl px-5 py-4 hover:border-primary/40 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <item.icon className="w-4 h-4 text-primary" />

                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>

                                    <div className="text-2xl font-black text-foreground">
                                        {item.value}
                                    </div>

                                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                                        {item.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-12 flex flex-col sm:flex-row gap-5">
                            <Link
                                href={"/join" as any}
                                className="group inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs shadow-[0_20px_50px_-15px_rgba(16,185,129,0.5)] hover:scale-[1.02] transition-all"
                            >
                                <span>{t('cta_join')}</span>

                                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href={"/events" as any}
                                className="inline-flex items-center justify-center px-8 py-5 rounded-2xl border border-border bg-background/70 backdrop-blur-xl font-black uppercase tracking-[0.2em] text-xs hover:border-primary hover:text-primary transition-all"
                            >
                                {t('cta_actions')}
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="lg:col-span-5 hidden lg:block"
                    >
                        <div className="relative">
                            {/* Premium Card */}
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
                                {/* Card Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

                                {/* Top Bar */}
                                <div className="flex items-center justify-between px-8 py-6 border-b border-border">
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.3em] text-primary font-black">
                                            Tech Ecosystem
                                        </div>

                                        <div className="text-sm text-muted-foreground mt-2">
                                            Modern tools & infrastructure
                                        </div>
                                    </div>

                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="relative h-[500px] overflow-hidden px-8 py-8">
                                    <motion.div
                                        className="flex flex-col gap-5"
                                        animate={{ y: ['0%', '-50%'] }}
                                        transition={{
                                            duration: 22,
                                            ease: 'linear',
                                            repeat: Infinity,
                                        }}
                                    >
                                        {[...technologies, ...technologies].map(
                                            (tech, i) => (
                                                <div
                                                    key={`${tech}-${i}`}
                                                    className="group flex items-center justify-between rounded-2xl border border-border bg-background/40 px-5 py-4 hover:border-primary/40 hover:bg-primary/[0.03] transition-all"
                                                >
                                                    <span className="font-mono text-sm uppercase tracking-[0.25em] text-foreground font-bold">
                                                        {tech}
                                                    </span>

                                                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                                                </div>
                                            )
                                        )}
                                    </motion.div>

                                    {/* Gradient Fade */}
                                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />

                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Floating Mini Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="absolute -bottom-8 -left-8 rounded-3xl border border-border bg-card/80 backdrop-blur-2xl p-6 shadow-2xl"
                            >
                                <div className="text-3xl font-black text-foreground">
                                    +98%
                                </div>

                                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
                                    Community Growth
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
