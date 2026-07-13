"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/shared/icons/BrandIcons";
import { navLinks } from "@/shared/config/nav-links";
import { useJoinCommunity } from "@/features/join-community";

const communityLinks = [
    { label: "Contact", href: "#" },
    { label: "Nous soutenir", href: "#" },
];

const legalLinks = [
    { label: "Confidentialité", href: "#" },
    { label: "Mentions légales", href: "#" },
    { label: "Cookies", href: "#" },
];

export default function Footer() {
    const giantRef = useRef<HTMLSpanElement>(null);
    const [email, setEmail] = useState("");
    const joinCommunity = useJoinCommunity();

    useEffect(() => {
        const giant = giantRef.current;
        const wrap = giant?.parentElement;
        if (!giant || !wrap) return;

        function fit() {
            if (!giant || !wrap) return;
            giant.style.fontSize = "6rem";
            const naturalWidth = giant.getBoundingClientRect().width;
            const targetWidth = wrap.clientWidth;
            const safety = 0.93; // keeps the last glyph ("b" in Club) from touching the clipped edge
            const scale = (targetWidth / naturalWidth) * safety;
            giant.style.fontSize = `${6 * scale}rem`;
        }

        fit();
        window.addEventListener("resize", fit);
        document.fonts?.ready.then(fit);
        return () => window.removeEventListener("resize", fit);
    }, []);

    return (
        <footer className="site-footer">
            <div className="footer-cta">
                <h2>
                    On construit la suite,
                    <br />
                    <span className="accent">ensemble.</span>
                </h2>
                <p>Rejoins plus de 10K+ développeurs qui font grandir la tech congolaise, un commit à la fois.</p>
                <form
                    className="footer-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        joinCommunity.mutate(email, { onSuccess: () => setEmail("") });
                    }}
                >
                    <input
                        type="email"
                        placeholder="ton@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={joinCommunity.isPending}
                    />
                    <button type="submit" disabled={joinCommunity.isPending}>
                        {joinCommunity.isPending ? "Envoi…" : "Rejoindre"}
                    </button>
                </form>
                {joinCommunity.isSuccess && <p className="form-feedback">Bienvenue dans la communauté 🎉</p>}
                {joinCommunity.isError && (
                    <p className="form-feedback form-feedback-error">
                        Une erreur est survenue, réessaie dans un instant.
                    </p>
                )}
            </div>

            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-brand-lockup">
                        <span className="brand-mark">CDC</span>
                        <span className="footer-brand-name">Congo Developer Club</span>
                    </div>
                    <p>
                        La communauté de référence pour les développeurs en République Démocratique du Congo.
                        Ensemble, bâtissons l&apos;écosystème tech de demain.
                    </p>
                    <div className="social-row">
                        <a href="https://github.com/Denismaka" target="_blank" rel="noopener" aria-label="GitHub">
                            <GithubIcon width={17} height={17} />
                        </a>
                        <a href="#" aria-label="X / Twitter">
                            <XIcon width={17} height={17} />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <LinkedinIcon width={17} height={17} />
                        </a>
                        <a href="mailto:contact@congodeveloperclub.com" aria-label="Email">
                            <Mail size={17} />
                        </a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Navigation</h4>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Communauté</h4>
                    <ul>
                        {communityLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Légal</h4>
                    <ul>
                        {legalLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer-giant-wrap">
                <span className="footer-giant" ref={giantRef}>
                    Congo Developer Club
                </span>
            </div>

            <div className="footer-bottom">
                <span>© 2026 Congo Developer Club. Tous droits réservés.</span>
                <span className="credit">
                    Développé par
                    <a href="https://github.com/Denismaka" target="_blank" rel="noopener">
                        <GithubIcon width={14} height={14} style={{ verticalAlign: -2, marginRight: 2 }} />
                        Denis Maka
                    </a>
                    · Fait en RDC
                </span>
            </div>
        </footer>
    );
}
