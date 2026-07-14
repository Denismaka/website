"use client";

import { useRef } from "react";
import { cn } from "../lib/utils";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Max rotation in degrees. Smaller for dense grids, larger for a single hero panel. */
    strength?: number;
}

/**
 * Wraps its children with a subtle mouse-tracked 3D tilt (CSS transform only —
 * no WebGL/3D scene). Disabled under `prefers-reduced-motion`.
 */
export function TiltCard({ children, className, strength = 6, ...props }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        if (cardRef.current) {
            cardRef.current.style.transform = `perspective(800px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg)`;
        }
    }

    function onMouseLeave() {
        if (cardRef.current) {
            cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
        }
    }

    return (
        <div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="cursor-pointer perspective-midrange"
            {...props}
        >
            <div
                ref={cardRef}
                className={cn("transition-transform duration-150 ease-out will-change-transform", className)}
            >
                {children}
            </div>
        </div>
    );
}
