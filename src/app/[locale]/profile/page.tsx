"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Globe, Code, Briefcase, Settings, Camera, CheckCircle, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface DiscordProfile {
    user: any;
    roles: string[];
    serverNickname: string | null;
}

export default function ProfilePage() {
    const t = useTranslations('profile');
    const [isSaved, setIsSaved] = useState(false);
    const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js']);
    const [newSkill, setNewSkill] = useState('');
    const [discordData, setDiscordData] = useState<DiscordProfile | null>(null);
    const [isDiscordLoading, setIsDiscordLoading] = useState(true); // On simule le chargement

    // Simulation API Call
    useEffect(() => {
        // Remplacer par un vrai fetch plus tard
        setTimeout(() => {
            setIsDiscordLoading(false);
        }, 1000);
    }, []);

    const [formData, setFormData] = useState({
        name: 'Lumumba Tech',
        bio: 'Développeur Full-stack passionné par l\'open source et l\'impact social en RDC.',
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/in/',
        twitter: 'https://twitter.com/',
        portfolio: 'https://',
        experience: 'mid',
        availableMentoring: true,
        availableOpportunities: true
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: target.checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            e.preventDefault();
            if (!skills.includes(newSkill.trim())) {
                setSkills([...skills, newSkill.trim()]);
            }
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="pt-32 pb-32 min-h-screen bg-background text-foreground transition-colors duration-500">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Profil */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter font-display">
                        {t('title')} <span className="text-primary">{t('title_highlight')}</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Avatar & Basic Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center border-b border-border pb-4">
                            <User className="w-5 h-5 mr-3 text-primary" /> {t('basic_info')}
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-full border-4 border-primary/20 bg-background flex items-center justify-center relative overflow-hidden group">
                                    <User className="w-12 h-12 text-muted-foreground opacity-50" />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('avatar')}</span>
                            </div>

                            <div className="flex-1 w-full space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-widest">{t('full_name')}</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm font-medium" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-widest">{t('bio')}</label>
                                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={3} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm font-medium resize-none" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Discord Connection */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#5865F2]/5 border border-[#5865F2]/20 rounded-3xl p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold mb-3 flex items-center text-[#5865F2]">
                                    <MessageSquare className="w-5 h-5 mr-3" /> {t('discord_title')}
                                </h2>
                                <p className="text-sm text-muted-foreground max-w-xl mb-6">
                                    {t('discord_desc')}
                                </p>

                                {isDiscordLoading ? (
                                    <div className="text-xs font-mono text-muted-foreground uppercase">{t('discord_loading')}</div>
                                ) : discordData && discordData.user ? (
                                    <div className="flex flex-col gap-4">
                                        {/* Affichage Discord mocké pour l'exemple */}
                                    </div>
                                ) : (
                                    <button type="button" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-colors text-xs uppercase tracking-widest">
                                        <MessageSquare className="w-4 h-4" /> {t('discord_link')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center border-b border-border pb-4">
                            <Globe className="w-5 h-5 mr-3 text-primary" /> {t('links_title')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SocialInput icon={<FaGithub />} label="GitHub" name="github" value={formData.github} onChange={handleInputChange} />
                            <SocialInput icon={<FaLinkedin />} label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleInputChange} />
                            <SocialInput icon={<FaTwitter />} label="Twitter / X" name="twitter" value={formData.twitter} onChange={handleInputChange} />
                            <SocialInput icon={<Globe className="w-4 h-4" />} label={t('portfolio')} name="portfolio" value={formData.portfolio} onChange={handleInputChange} />
                        </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center border-b border-border pb-4">
                            <Code className="w-5 h-5 mr-3 text-primary" /> {t('skills_title')}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6">{t('skills_desc')}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {skills.map(skill => (
                                <div key={skill} className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    {skill}
                                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-foreground transition-colors ml-1">&times;</button>
                                </div>
                            ))}
                        </div>

                        <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={handleAddSkill} placeholder={t('skills_placeholder')} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm font-medium" />
                    </motion.div>

                    {/* Preferences */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center border-b border-border pb-4">
                            <Settings className="w-5 h-5 mr-3 text-primary" /> {t('pref_title')}
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-bold text-muted-foreground mb-3 uppercase tracking-widest flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> {t('exp_level')}
                                </label>
                                <select name="experience" value={formData.experience} onChange={handleInputChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm font-medium appearance-none">
                                    <option value="junior">{t('exp_junior')}</option>
                                    <option value="mid">{t('exp_mid')}</option>
                                    <option value="senior">{t('exp_senior')}</option>
                                    <option value="expert">{t('exp_expert')}</option>
                                </select>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-border border-dashed">
                                <CheckboxOption name="availableOpportunities" checked={formData.availableOpportunities} onChange={handleInputChange} label={t('open_to_work')} />
                                <CheckboxOption name="availableMentoring" checked={formData.availableMentoring} onChange={handleInputChange} label={t('open_to_mentor')} />
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex justify-end gap-4 pt-6">
                        <button type="button" className="px-6 py-3 border border-border bg-background text-foreground font-black uppercase tracking-widest text-[10px] rounded-xl hover:border-primary hover:text-primary transition-colors">
                            {t('cancel')}
                        </button>
                        <button type="submit" className="px-8 py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
                            {isSaved ? <><CheckCircle className="w-4 h-4" /> {t('saved')}</> : t('save')}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

// Composants utilitaires pour un code plus propre
function SocialInput({ icon, label, name, value, onChange }: any) {
    return (
        <div>
            <label className="block text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-widest flex items-center gap-2">
                <span className="text-primary">{icon}</span> {label}
            </label>
            <input type="url" name={name} value={value} onChange={onChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-mono text-xs" />
        </div>
    );
}

function CheckboxOption({ name, checked, onChange, label }: any) {
    return (
        <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative flex items-center justify-center">
                <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only" />
                <div className={`w-6 h-6 border-2 rounded-md transition-colors ${checked ? 'bg-primary border-primary' : 'bg-background border-border group-hover:border-primary'}`}>
                    {checked && <CheckCircle className="w-4 h-4 text-primary-foreground mx-auto mt-0.5" />}
                </div>
            </div>
            <span className="text-sm font-medium text-foreground">{label}</span>
        </label>
    );
}