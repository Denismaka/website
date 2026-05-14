"use client"

import React, { useState } from 'react';
import { useRouter, Link, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { useTranslations, useLocale } from 'next-intl';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Avec next-intl, pathname renvoie automatiquement le chemin SANS la langue
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('nav');

    const navLinks = [
        { name: t('home'), path: '/' },
        { name: t('about'), path: '/about' },
        { name: t('activities'), path: '/activities' },
        { name: t('events'), path: '/events' },
        { name: t('blog'), path: '/blog' },
        { name: t('contact'), path: '/contact' },
        {name: t('support'), path: '/support' },
    ];

    // Fonction de changement de langue optimisée avec le routeur next-intl
    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'fr' : 'en';

        // router.replace est préféré à push pour ne pas polluer l'historique de navigation.
        // next-intl comprend automatiquement qu'il doit conserver la route actuelle (pathname) 
        // mais avec la nouvelle langue.
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Le Link de next-intl ajoute automatiquement la bonne locale */}
                    <Link href='/' className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-primary rounded flex items-center justify-center font-mono font-bold text-primary-foreground text-xl italic leading-none rotate-3 group-hover:rotate-0 transition-transform">
                            CDC
                        </div>
                        <span className="font-display font-extrabold text-xl lg:text-2xl tracking-tighter text-foreground">
                            Congo Developer Club
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path as any}
                                className={cn(
                                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-foreground",
                                    pathname === link.path ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center space-x-4 border-l border-border pl-6 ml-2">
                            {/* Bouton de Langue */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center space-x-1 text-xs font-semibold uppercase text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{locale === 'en' ? 'FR' : 'EN'}</span>
                            </button>

                            <ThemeToggle />

                            {/* Plus besoin de `/${locale}/join`, next-intl gère cela */}
                            <Link href={"/join" as any}>
                                <button className="bg-primary hover:bg-foreground text-primary-foreground hover:text-background px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]">
                                    {t('join')}
                                </button>
                            </Link>

                            <Link href={"/profile" as any} className="flex items-center justify-center p-2 rounded border border-border bg-card hover:border-primary text-muted-foreground transition-colors">
                                <User className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button onClick={toggleLanguage} className="text-xs font-semibold uppercase">{locale === 'en' ? 'FR' : 'EN'}</button>
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-muted-foreground">
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden bg-background border-b border-border p-6 space-y-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path as any}
                                onClick={() => setIsOpen(false)}
                                className="block text-base font-semibold uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}