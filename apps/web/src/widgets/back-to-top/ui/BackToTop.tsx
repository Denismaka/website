"use client";

import { useEffect, useRef, useState } from "react";

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
    const [scrolledEnough, setScrolledEnough] = useState(false);
    // The footer's bottom bar shares the same bottom-right corner as this
    // button, so it must step aside once that corner scrolls into view.
    const [nearFooter, setNearFooter] = useState(false);
    const ringRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        function update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
            if (ringRef.current) {
                ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
            }
            setScrolledEnough(scrollTop > window.innerHeight * 0.6);
        }
        update();
        window.addEventListener("scroll", update);
        return () => window.removeEventListener("scroll", update);
    }, []);

    useEffect(() => {
        const footerBottom = document.querySelector(".footer-bottom");
        if (!footerBottom) return;
        const io = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
            rootMargin: "0px 0px -20% 0px",
        });
        io.observe(footerBottom);
        return () => io.disconnect();
    }, []);

    const visible = scrolledEnough && !nearFooter;

    function scrollToTop() {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }

    return (
        <button
            className={`back-to-top${visible ? " visible" : ""}`}
            aria-label="Retour en haut de page"
            onClick={scrollToTop}
        >
            <span className="progress-ring-wrap">
                <svg className="progress-ring" viewBox="0 0 36 36">
                    <circle className="progress-ring-track" cx="18" cy="18" r={RADIUS} />
                    <circle
                        ref={ringRef}
                        className="progress-ring-value"
                        cx="18"
                        cy="18"
                        r={RADIUS}
                        style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE }}
                    />
                </svg>
                <span className="mark">CDC</span>
            </span>
            <span className="label">Haut de page</span>
        </button>
    );
}
