"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';

export default function BlogPage() {
    const t = useTranslations('blog');

    const posts = t.raw('posts') as Array<{
        title: string;
        excerpt: string;
        category: string;
        author: string;
        date: string;
        image: string;
        featured?: boolean;
    }>;

    // Séparation : le premier article est "Featured"
    const featuredPost = posts.find(p => p.featured) || posts[0];
    const otherPosts = posts.filter(p => p !== featuredPost);

    return (
        <div className="bg-background min-h-screen">
            <PageHero
                badge={t('badge')}
                title={t('title')}
                description={t('subtitle')}
            />

            <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-24">

                {/* ARTICLE MIS EN AVANT (Featured) */}
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center bg-card rounded-3xl p-8 border border-border group"
                >
                    <div className="relative aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden">
                        <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div>
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">{featuredPost.category}</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">{featuredPost.title}</h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">{featuredPost.excerpt}</p>
                        <Link href="/blog/1" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            {t('read_more')} <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </motion.article>

                {/* GRILLE DES AUTRES ARTICLES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all duration-300"
                        >
                            <div className="aspect-video relative rounded-xl overflow-hidden mb-6">
                                <Image src={post.image} alt={post.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-3">
                                    {post.date} • {post.author}
                                </div>
                                <h3 className="text-xl font-bold mb-4 line-clamp-2">{post.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{post.excerpt}</p>
                            </div>
                            <Link href="/blog/1" className="text-primary font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                {t('read_more')} <ArrowRight className="w-3 h-3" />
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
}