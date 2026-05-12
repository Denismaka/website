"use client"

import { Mail } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

// Composants Icones de marques
const GithubIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function Footer() {
    const tNav = useTranslations('nav');
    const tFooter = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border py-20 transition-colors duration-300">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">

                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-3 mb-8 group w-fit">
                            <div className="w-12 h-12 bg-primary rounded flex items-center justify-center font-mono font-bold text-primary-foreground text-xl italic leading-none rotate-3 group-hover:rotate-0 transition-transform">
                                CDC
                            </div>
                            <span className="font-display font-extrabold text-xl lg:text-2xl tracking-tighter text-foreground">
                                Congo Developer Club
                            </span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed text-sm">
                            {tFooter('description')}
                        </p>
                        <div className="flex space-x-6">
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <TwitterIcon className="w-5 h-5" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <GithubIcon className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <LinkedinIcon className="w-5 h-5" />
                            </a>
                            <a href="mailto:contact@congodeveloperclub.com" className="text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Colonne Navigation */}
                    <div>
                        <h4 className="font-mono text-[10px] font-bold text-foreground mb-8 uppercase tracking-[0.2em]">{tFooter('col_nav')}</h4>
                        <ul className="space-y-4">
                            {['home', 'about', 'activities', 'events', 'blog'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link === 'home' ? '' : link}` as any} className="text-muted-foreground hover:text-primary text-xs transition-colors uppercase tracking-widest font-semibold">
                                        {tNav(link)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne Légal */}
                    <div>
                        <h4 className="font-mono text-[10px] font-bold text-foreground mb-8 uppercase tracking-[0.2em]">{tFooter('col_legal')}</h4>
                        <ul className="space-y-4">
                            {[
                                { key: 'privacy', label: tFooter('privacy') },
                                { key: 'terms', label: tFooter('terms') },
                                { key: 'cookies', label: tFooter('cookies') }
                            ].map((item) => (
                                <li key={item.key}>
                                    <Link href={"#" as any} className="text-muted-foreground hover:text-primary text-xs transition-colors underline decoration-primary/30 underline-offset-4 decoration-2 hover:decoration-primary font-medium">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bas du Footer (Copyright & Crédits) */}
                <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] text-center md:text-left">
                        &copy; {currentYear} Congo Developer Club. {tFooter('rights')}
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
                        <div className="flex items-center space-x-2">
                            <span>{tFooter('built_by')}</span>
                            <a href="https://tacitewakilongoportfolio.vercel.app/" target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">
                                Tacite WAKILONGO
                            </a>
                        </div>
                        <div className="hidden md:block w-1 h-1 bg-border rounded-full"></div>
                        <div className="flex items-center space-x-2">
                            <span>{tFooter('made_in')}</span>
                            <span className="text-primary font-bold">DR Congo</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}