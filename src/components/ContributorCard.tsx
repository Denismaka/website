"use client";

import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';


export function ContributorCard({ user, index, tProfile }: { user: any, index: number, tProfile: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <a href={user.html_url} target="_blank" rel="noreferrer" className="block group bg-card border border-border rounded-xl p-6 hover:border-primary transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)] text-center">
                <div className="relative inline-block mb-4">
                    <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full border border-border grayscale group-hover:grayscale-0 transition-all duration-500 object-cover" />
                    <div className="absolute -bottom-2 -right-2 bg-background border border-border text-primary text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full">
                        {index + 1}
                    </div>
                </div>
                <h3 className="text-foreground font-bold text-sm truncate w-full mb-1 group-hover:text-primary transition-colors">@{user.login}</h3>
                <div className="flex items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    <FaGithub className="w-3 h-3 mr-1" /> {tProfile}
                </div>
            </a>
        </motion.div>
    );
}