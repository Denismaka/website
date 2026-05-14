"use client";

import { motion } from 'framer-motion';

const CloudSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10h-.3C16.4 7.2 13.9 5 11 5 7.7 5 5 7.7 5 11v.7C2.8 12.1 1 14.3 1 17c0 3.3 2.7 6 6 6h10.5z" />
    </svg>
);

export const FloatingClouds = () => (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Nuage 1 */}
        <motion.div
            animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-100 text-primary/10 dark:text-white/2 blur-sm drop-shadow-2xl"
        >
            <CloudSVG className="w-full h-auto" />
        </motion.div>

        {/* Nuage 2 */}
        <motion.div
            animate={{ y: [0, 20, 0], x:[0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[5%] w-87.5] text-primary/10 dark:text-white/2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
        >
            <CloudSVG className="w-full h-auto" />
        </motion.div>
    </div>
);