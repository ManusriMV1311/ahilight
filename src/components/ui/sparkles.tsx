"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const SparklesCore = ({
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
}: {
    id?: string;
    className?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleColor?: string;
    particleDensity?: number;
}) => {
    const [init, setInit] = useState(false);
    // Define particle type locally if needed, or just infer
    const [particles, setParticles] = useState<Array<{
        x: number;
        y: number;
        r: number;
        opacity: number;
        duration: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        const count = particleDensity || 20;
        const newParticles = Array.from({ length: count }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * (maxSize || 2) + (minSize || 0.5),
            opacity: Math.random(),
            duration: (Math.random() * 2 + 1) * (speed || 1),
            delay: Math.random() * 2
        }));
        setParticles(newParticles);
        setInit(true);
    }, [maxSize, minSize, particleDensity, speed]);

    return (
        <div className={cn("opacity-0 transition-opacity duration-1000", init && "opacity-100", className)} aria-hidden="true">
            {/* Simplified Sparkles implementation using CSS animations for reliability instead of heavy ts-particles */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <svg className="w-full h-full absolute inset-0 pointer-events-none">
                    <defs>
                        <radialGradient id={`sparkle-${id}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={particleColor || "#fff"} stopOpacity="1" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* Render particles from state */}
                    {particles.map((p, i) => (
                        <circle
                            key={i}
                            cx={`${p.x}%`}
                            cy={`${p.y}%`}
                            r={p.r}
                            fill={`url(#sparkle-${id})`}
                            opacity={p.opacity}
                            className="animate-pulse"
                            style={{
                                animationDuration: `${p.duration}s`,
                                animationDelay: `${p.delay}s`
                            }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
};
