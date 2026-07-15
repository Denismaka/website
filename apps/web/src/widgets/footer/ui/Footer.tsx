"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/shared/icons/BrandIcons";
import { navLinks } from "@/shared/config/nav-links";
import { useJoinCommunity } from "@/features/join-community";
import { useTranslations } from "@/shared/i18n";

const communityLinkKeys = ["contact", "support"] as const;
const legalLinkKeys = ["privacy", "terms", "cookies"] as const;

export default function Footer() {
    const giantRef = useRef<HTMLSpanElement>(null);
    const [email, setEmail] = useState("");
    const joinCommunity = useJoinCommunity();
    const t = useTranslations();

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
                    {t.footer.ctaLine1}
                    <br />
                    <span className="accent">{t.footer.ctaLine2}</span>
                </h2>
                <p>{t.footer.ctaText}</p>
                <form
                    className="footer-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        joinCommunity.mutate(email, { onSuccess: () => setEmail("") });
                    }}
                >
                    <input
                        type="email"
                        placeholder={t.footer.emailPlaceholder}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={joinCommunity.isPending}
                    />
                    <button type="submit" disabled={joinCommunity.isPending}>
                        {joinCommunity.isPending ? t.footer.sending : t.footer.join}
                    </button>
                </form>
                {joinCommunity.isSuccess && <p className="form-feedback">{t.footer.success}</p>}
                {joinCommunity.isError && <p className="form-feedback form-feedback-error">{t.footer.error}</p>}
            </div>

            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-brand-lockup">
                        <span className="brand-mark">CDC</span>
                        <span className="footer-brand-name">Congo Developer Club</span>
                    </div>
                    <p>{t.footer.brandDescription}</p>
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
                    <h4>{t.footer.navigationHeading}</h4>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.key}>
                                <Link href={link.href}>{t.nav[link.key]}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{t.footer.communityHeading}</h4>
                    <ul>
                        {communityLinkKeys.map((key) => (
                            <li key={key}>
                                <Link href="#">{t.footer[key]}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{t.footer.legalHeading}</h4>
                    <ul>
                        {legalLinkKeys.map((key) => (
                            <li key={key}>
                                <Link href="#">{t.footer[key]}</Link>
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
                <span>{t.footer.copyright}</span>
                <span className="credit">
                    {t.footer.developedBy}
                    <a href="https://github.com/Denismaka" target="_blank" rel="noopener">
                        <GithubIcon width={14} height={14} style={{ verticalAlign: -2, marginRight: 2 }} />
                        Denis Maka
                    </a>
                    · {t.footer.madeIn}
                </span>
            </div>
        </footer>
    );
}
