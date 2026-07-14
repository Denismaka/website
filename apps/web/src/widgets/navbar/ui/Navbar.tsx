"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X as CloseIcon } from "lucide-react";
import { navLinks } from "@/shared/config/nav-links";
import { useThemeStore, type Theme } from "@/shared/store/useThemeStore";
import { useMobileMenuStore } from "@/shared/store/useMobileMenuStore";
import { useLocaleStore, useTranslations } from "@/shared/i18n";

function subscribeToColorScheme(callback: () => void) {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
}
function getSystemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
// The server has no concept of the visitor's OS theme, so it must always
// report "light" here — matching that on the client's first paint is what
// keeps hydration from mismatching.
function getServerSnapshot() {
    return false;
}

export default function Navbar() {
    const pathname = usePathname();
    const locale = useLocaleStore((s) => s.locale);
    const setLocale = useLocaleStore((s) => s.setLocale);
    const t = useTranslations();
    const theme = useThemeStore((s) => s.theme);
    const setTheme = useThemeStore((s) => s.setTheme);
    const [scrolled, setScrolled] = useState(false);
    const mobileOpen = useMobileMenuStore((s) => s.open);
    const toggleMobileMenu = useMobileMenuStore((s) => s.toggle);
    const closeMobileMenu = useMobileMenuStore((s) => s.close);
    const systemPrefersDark = useSyncExternalStore(
        subscribeToColorScheme,
        getSystemPrefersDark,
        getServerSnapshot
    );

    const linksRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const isDark = theme === "dark" || (theme === null && systemPrefersDark);

    function toggleTheme() {
        const next: Theme = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        setTheme(next);
    }

    function moveIndicator(el: HTMLElement) {
        const container = linksRef.current;
        const indicator = indicatorRef.current;
        if (!container || !indicator) return;
        const cRect = container.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        indicator.style.width = `${r.width}px`;
        indicator.style.transform = `translateX(${r.left - cRect.left}px)`;
        indicator.style.opacity = "1";
    }

    function hideIndicator() {
        if (indicatorRef.current) indicatorRef.current.style.opacity = "0";
    }

    return (
        <header className="nav-wrap">
            <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto" }}>
                <nav className={`nav-pill${scrolled ? " scrolled" : ""}`} aria-label="Navigation principale">
                    <Link className="brand" href="/">
                        <span className="brand-mark">CDC</span>
                        <span className="brand-name">Congo Developer Club</span>
                    </Link>

                    <div className="nav-links" ref={linksRef} onMouseLeave={hideIndicator}>
                        <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
                        {navLinks.map((link) => {
                            const active =
                                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className={active ? "active" : undefined}
                                    onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                                >
                                    {t.nav[link.key]}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="nav-utility">
                        <div className="lang-toggle" role="group" aria-label="Langue">
                            <button aria-pressed={locale === "fr"} onClick={() => setLocale("fr")}>
                                FR
                            </button>
                            <button aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
                                EN
                            </button>
                        </div>
                        <button className="icon-btn" aria-label={t.nav.themeToggle} onClick={toggleTheme}>
                            {isDark ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            className="icon-btn menu-btn"
                            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
                            aria-expanded={mobileOpen}
                            onClick={toggleMobileMenu}
                        >
                            {mobileOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
                        </button>
                        <Link href="#" className="cta">
                            {t.nav.join}
                        </Link>
                    </div>
                </nav>

                {mobileOpen && (
                    <div className="mobile-panel">
                        {navLinks.map((link) => (
                            <Link key={link.key} href={link.href} onClick={closeMobileMenu}>
                                {t.nav[link.key]}
                            </Link>
                        ))}
                        <div className="mobile-panel-footer">
                            <div className="lang-toggle" role="group" aria-label="Langue">
                                <button aria-pressed={locale === "fr"} onClick={() => setLocale("fr")}>
                                    FR
                                </button>
                                <button aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
                                    EN
                                </button>
                            </div>
                            <Link href="#" className="cta" onClick={closeMobileMenu}>
                                {t.nav.join}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
